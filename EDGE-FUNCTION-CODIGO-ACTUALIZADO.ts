// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
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
      return new Response(
        JSON.stringify({ error: 'Error de autenticación con Metamap', detail: errText }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const verificationRes = await fetch(
      `https://api.prod.metamap.com/v2/verifications/${verificationId}`,
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );

    if (!verificationRes.ok) {
      return new Response(
        JSON.stringify({ error: 'No se pudo obtener la verificación' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const verification = await verificationRes.json();
    const rawStatus = verification?.identity?.status || verification?.identityStatus || verification?.status || 'unknown';
    const status = String(rawStatus).toLowerCase().replace(/\s+/g, '');

    const result: Record<string, unknown> = {
      status,
      verificationId,
      applicationId: applicationId || null,
    };

    if (status === 'rejected' && verification?.documents?.[0]?.steps) {
      const stepWithError = verification.documents[0].steps.find((s: { error?: unknown }) => s.error);
      if (stepWithError?.error) {
        const err = stepWithError.error as { message?: string; code?: string; type?: string };
        result.error = {
          message: err.message,
          code: err.code,
          type: err.type,
        };
      }
    }

    // Guardar en Supabase
    const mappedStatus = status === 'verified' ? 'approved' : status === 'rejected' ? 'rejected' : status === 'reviewneeded' ? 'reviewNeeded' : 'pending_review';
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    let savedToSupabase = false;

    if (applicationId && supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const identityId = verification?.identity?.id || verification?.identityId || null;
        const { error: upsertError } = await supabase.from('kyc_verifications').upsert({
          application_id: applicationId,
          verification_id: verificationId,
          identity_id: identityId,
          status: mappedStatus,
          error_message: (result.error as { message?: string })?.message || null,
          error_code: (result.error as { code?: string })?.code || null,
          error_type: (result.error as { type?: string })?.type || null,
          completed_at: ['approved', 'rejected'].includes(mappedStatus) ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'application_id',
          ignoreDuplicates: false,
        });
        if (upsertError) {
          result.supabaseError = upsertError.message;
          result.supabaseDetails = upsertError.details;
        } else {
          savedToSupabase = true;
        }
      } catch (dbErr) {
        result.supabaseError = String(dbErr);
      }
    } else if (!supabaseUrl || !supabaseKey) {
      result.supabaseError = 'Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY';
    }

    result.savedToSupabase = savedToSupabase;

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
