# Guía paso a paso: desplegar la Edge Function

---

## Paso 1: Ir a Edge Functions

1. Entra a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto (**nsrzlwetutrzvfwhvpas**)
3. En el menú izquierdo haz clic en **Edge Functions**

---

## Paso 2: Crear o editar la función

- **Si NO tienes la función:** Haz clic en **"Deploy a new function"** → **"Via Editor"** → ponle nombre `check-metamap-verification`
- **Si YA tienes la función:** Haz clic en `check-metamap-verification` para editarla

---

## Paso 3: Pegar el código

1. Borra todo lo que haya en el editor
2. Copia y pega exactamente este código (desde `import` hasta el final):

```typescript
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
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
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

    const mappedStatus = status === 'verified' ? 'approved' : status === 'rejected' ? 'rejected' : status === 'reviewneeded' ? 'reviewNeeded' : 'pending_review';
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
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
        await supabase.from('kyc_verifications').upsert(row, {
          onConflict: 'application_id',
          ignoreDuplicates: false,
        });
      } catch (dbErr) {
        console.error('Error guardando en Supabase:', dbErr);
      }
    }

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
```

3. Haz clic en **"Deploy"** o **"Save"** (abajo a la derecha)

---

## Paso 4: Configurar los Secrets (obligatorio)

1. En el menú izquierdo, dentro de **Edge Functions**, busca **Secrets** (o **Manage secrets**)
2. O entra a: [https://supabase.com/dashboard/project/nsrzlwetutrzvfwhvpas/settings/functions](https://supabase.com/dashboard/project/nsrzlwetutrzvfwhvpas/settings/functions) y revisa la pestaña **Secrets**
3. Haz clic en **"Add new secret"**
4. Crea estos dos:

| Nombre | Valor |
|--------|-------|
| `METAMAP_CLIENT_ID` | `612566a0a0be80001b035915` |
| `METAMAP_CLIENT_SECRET` | *(tu Client Secret de Metamap – lo encuentras en [Metamap Dashboard](https://dashboard.getmati.com) → Integration)* |

5. Guarda cada uno

---

## Paso 5: Comprobar que funciona

1. En **Edge Functions** → selecciona `check-metamap-verification`
2. Busca la pestaña **"Logs"** o **"Test"**
3. Para probar: después de completar una verificación en el onboarding, haz clic en **"Verificar estado"** en la página

Si todo está bien, verás "Identidad verificada" o el estado correspondiente.

---

## Resumen

| Paso | Acción |
|------|--------|
| 1 | Ir a Edge Functions en Supabase |
| 2 | Crear o editar `check-metamap-verification` |
| 3 | Pegar el código y hacer Deploy |
| 4 | Añadir secrets: METAMAP_CLIENT_ID y METAMAP_CLIENT_SECRET |
| 5 | Probar con "Verificar estado" en el onboarding |
