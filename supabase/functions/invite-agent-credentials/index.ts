import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-action-token',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Prototipo: permitir invocacion directa desde el portal admin frontend.
    // En produccion esto debe volver a protegerse con auth administrativa real.
    const expectedToken = Deno.env.get('ADMIN_ACTION_TOKEN');
    const providedToken = req.headers.get('x-admin-action-token');
    if (expectedToken && providedToken !== expectedToken) {
      return new Response(
        JSON.stringify({ error: 'No autorizado para enviar invitaciones.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const applicationId = String(body.applicationId || '').trim();
    const inviteEmail = String(body.inviteEmail || '').trim().toLowerCase();
    const displayName = String(body.displayName || '').trim();
    const redirectTo = body.redirectTo ? String(body.redirectTo) : undefined;

    if (!applicationId || !inviteEmail) {
      return new Response(
        JSON.stringify({ error: 'applicationId e inviteEmail son requeridos.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: application, error: appError } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .maybeSingle();

    if (appError) {
      return new Response(
        JSON.stringify({ error: appError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!application) {
      return new Response(
        JSON.stringify({ error: 'Solicitud no encontrada.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (String(application.status || '') !== 'approved') {
      return new Response(
        JSON.stringify({ error: 'Solo se pueden invitar solicitudes aprobadas.' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const inviteOptions: Record<string, unknown> = {
      data: {
        role: 'agent',
        application_id: applicationId,
        display_name: displayName || application.business_trade_name || application.business_legal_name || inviteEmail,
      },
    };
    if (redirectTo) inviteOptions.redirectTo = redirectTo;

    const { data: invited, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(inviteEmail, inviteOptions);
    if (inviteError) {
      return new Response(
        JSON.stringify({ error: inviteError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = invited?.user?.id || null;
    const credentialsPayload = {
      ...(application.credentials_payload || {}),
      inviteEmail,
      displayName: displayName || application.business_trade_name || application.business_legal_name || inviteEmail,
      invitationStatus: 'invited',
      invitedAt: Date.now(),
      authUserId: userId,
    };

    const nowIso = new Date().toISOString();
    const { error: updateError } = await supabase
      .from('applications')
      .update({
        auth_user_id: userId,
        credential_status: 'invited',
        invited_at: nowIso,
        credentials_payload: credentialsPayload,
        updated_at: nowIso,
      })
      .eq('id', applicationId);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (userId) {
      await supabase.from('profiles').upsert({
        id: userId,
        email: inviteEmail,
        role: 'agent',
        display_name: credentialsPayload.displayName,
        application_id: applicationId,
        updated_at: nowIso,
      });

      await supabase.from('agent_accounts').upsert({
        application_id: applicationId,
        auth_user_id: userId,
        email: inviteEmail,
        display_name: credentialsPayload.displayName,
        status: 'invited',
        updated_at: nowIso,
      }, {
        onConflict: 'application_id',
        ignoreDuplicates: false,
      });
    }

    await supabase.from('application_reviews').insert({
      application_id: applicationId,
      action: 'invite_sent',
      actor: 'edge_function',
      notes: 'Invitación enviada mediante Edge Function segura.',
      payload: {
        inviteEmail,
        authUserId: userId,
      },
    });

    return new Response(
      JSON.stringify({
        ok: true,
        applicationId,
        inviteEmail,
        authUserId: userId,
        invitationStatus: 'invited',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
