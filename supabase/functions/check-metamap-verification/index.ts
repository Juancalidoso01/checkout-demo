// Supabase Edge Function: consulta el estado de verificación en Metamap
// y lo guarda en la tabla kyc_verifications para que el frontend lea desde Supabase
// Requiere secrets: METAMAP_CLIENT_ID, METAMAP_CLIENT_SECRET

import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { verificationId, applicationId } = body;
    if (!verificationId) {
      return new Response(
        JSON.stringify({ error: 'verificationId requerido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const clientId = Deno.env.get('METAMAP_CLIENT_ID');
    const clientSecret = Deno.env.get('METAMAP_CLIENT_SECRET');
    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ error: 'Configura METAMAP_CLIENT_ID y METAMAP_CLIENT_SECRET en Supabase secrets' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const tokenRes = await fetch('https://api.prod.metamap.com/oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('Metamap OAuth error:', errText);
      return new Response(
        JSON.stringify({ error: 'Error de autenticación con Metamap', detail: errText }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const verificationRes = await fetch(
      `https://api.prod.metamap.com/v2/verifications/${verificationId}`,
      {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      }
    );

    if (!verificationRes.ok) {
      const errText = await verificationRes.text();
      return new Response(
        JSON.stringify({ error: 'No se pudo obtener la verificación', detail: errText }),
        { status: verificationRes.status >= 500 ? 502 : 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const verification = await verificationRes.json();
    const rawStatus = verification?.identity?.status || verification?.identityStatus || verification?.status || 'unknown';
    const status = String(rawStatus).toLowerCase().replace(/\s+/g, '');

    const result: Record<string, unknown> = {
      status: status.toLowerCase(),
      verificationId,
      applicationId: applicationId || null,
    };

    if (status.toLowerCase() === 'rejected' && verification?.documents?.[0]?.steps) {
      const stepWithError = verification.documents[0].steps.find(
        (s: { error?: { message?: string; code?: string; type?: string } }) => s.error
      );
      if (stepWithError?.error) {
        result.error = {
          message: stepWithError.error.message,
          code: stepWithError.error.code,
          type: stepWithError.error.type,
        };
      }
    }

    // Guardar en Supabase para que el frontend lea desde ahí
    const mappedStatus = status === 'verified' ? 'approved' : status === 'rejected' ? 'rejected' : status === 'reviewneeded' ? 'reviewNeeded' : 'pending_review';
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    let savedToSupabase = false;
    if (applicationId && supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const identityId = verification?.identity?.id || verification?.identityId || null;
        const row = {
          application_id: applicationId,
          verification_id: verificationId,
          identity_id: identityId,
          status: mappedStatus,
          error_message: (result.error as { message?: string })?.message || null,
          error_code: (result.error as { code?: string })?.code || null,
          error_type: (result.error as { type?: string })?.type || null,
          completed_at: ['approved', 'rejected'].includes(mappedStatus) ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        };
        const { error: upsertError } = await supabase.from('kyc_verifications').upsert(row, {
          onConflict: 'application_id',
          ignoreDuplicates: false,
        });
        if (upsertError) {
          console.error('Supabase upsert error:', upsertError.message, upsertError.details);
          (result as Record<string, unknown>).supabaseError = upsertError.message;
          (result as Record<string, unknown>).supabaseDetails = upsertError.details;
        } else {
          savedToSupabase = true;
        }
      } catch (dbErr) {
        console.error('Error guardando en Supabase:', dbErr);
        (result as Record<string, unknown>).supabaseError = String(dbErr);
      }
    } else if (!supabaseUrl || !supabaseKey) {
      console.error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
      (result as Record<string, unknown>).supabaseError = 'Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en secrets';
    }

    (result as Record<string, unknown>).savedToSupabase = savedToSupabase;

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Error interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
