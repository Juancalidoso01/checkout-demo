# Guía: Configurar Supabase para verificar estado en Metamap

Esta guía te lleva paso a paso para que el botón **"Verificar estado"** del onboarding funcione y consulte el resultado real de Metamap.

---

## Qué necesitas antes de empezar

1. **Cuenta en [Supabase](https://supabase.com)** (ya tienes el proyecto: `nsrzlwetutrzvfwhvpas`)
2. **Client ID y Client Secret de Metamap** (para que nuestra Edge Function consulte la API)
3. **Tabla `kyc_verifications`** (el estado se guarda aquí para que el frontend lo lea desde Supabase)

---

### Diferencia: Webhook vs credenciales API

En el [Metamap Dashboard](https://dashboard.getmati.com) → **Integration** verás varias secciones:

| Configuración | Para qué sirve | ¿Lo necesitamos ahora? |
|---------------|----------------|------------------------|
| **Webhook URL** + **Webhook secret** | Metamap envía notificaciones a tu servidor cuando aprueba/rechaza | Opcional. El botón "Verificar estado" usa la API en su lugar |
| **Client ID** + **Client Secret** | Para que tu servidor llame a la API de Metamap (consultar estado, etc.) | **Sí, imprescindible** |

El **Client ID** ya lo tienes: `612566a0a0be80001b035915`.

**Client Secret:** suele estar en la misma pestaña Integration, en la sección de credenciales API o "Developer" (a veces hay que hacer scroll o abrir una sección colapsada). Si solo ves Webhook URL/secret, busca otra sección como "API credentials", "Client credentials" o "Credentials".

> **Webhook (opcional):** Si quieres que Metamap te avise automáticamente cuando termine una verificación, configúralo más adelante. Para el flujo actual con el botón "Verificar estado" no es necesario.

**Si Metamap te pide Webhook URL y Webhook secret:** puedes dejarlos vacíos por ahora o usar una URL temporal. Nuestro flujo funciona con el botón "Verificar estado", que consulta la API directamente.

---

## Paso 0: Crear la tabla kyc_verifications

La Edge Function guarda el estado de verificación en Supabase. Crea la tabla:

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard) → tu proyecto → **SQL Editor**
2. Ejecuta el contenido de `supabase/migrations/20250316000000_create_kyc_verifications.sql`
3. O copia y pega:

```sql
CREATE TABLE IF NOT EXISTS public.kyc_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id text NOT NULL UNIQUE,
  verification_id text NOT NULL,
  identity_id text,
  status text NOT NULL DEFAULT 'pending_review',
  error_message text,
  error_code text,
  error_type text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_kyc_verifications_application_id ON public.kyc_verifications (application_id);
ALTER TABLE public.kyc_verifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.kyc_verifications FOR SELECT USING (true);
```

---

## Método 1: Desde el Dashboard de Supabase (sin instalar nada)

### Paso 1: Ir a Edge Functions

1. Entra a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. En el menú de la izquierda, haz clic en **Edge Functions**

### Paso 2: Crear la función

1. Haz clic en **"Deploy a new function"**
2. Elige **"Via Editor"**
3. Si te pide plantilla, elige **"Start from scratch"** o ignora las plantillas
4. **Nombre de la función:** escribe `check-metamap-verification`

### Paso 3: Pegar el código

Borra todo lo que haya en el editor y pega este código:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { verificationId, applicationId } = await req.json();
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

    const result = {
      status,
      verificationId,
      applicationId: applicationId || null,
    };

    if (status === 'rejected' && verification?.documents?.[0]?.steps) {
      const stepWithError = verification.documents[0].steps.find((s) => s.error);
      if (stepWithError?.error) {
        result.error = {
          message: stepWithError.error.message,
          code: stepWithError.error.code,
          type: stepWithError.error.type,
        };
      }
    }

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
```

### Paso 4: Configurar los secrets (variables de entorno)

**Opción A – Desde el Dashboard (recomendado):**

1. Ve a [Edge Function Secrets](https://supabase.com/dashboard/project/nsrzlwetutrzvfwhvpas/functions/secrets)
   - O: Dashboard → **Edge Functions** → pestaña **Secrets** (o enlace "Manage secrets")
2. Haz clic en **Add new secret**
3. Añade estos dos:
   - **Nombre:** `METAMAP_CLIENT_ID` → **Valor:** `612566a0a0be80001b035915`
   - **Nombre:** `METAMAP_CLIENT_SECRET` → **Valor:** tu client secret de Metamap
4. Guarda cada uno

**Opción B – Desde la terminal (si no ves secrets en el Dashboard):**

1. Instala Supabase CLI:  
   - Mac: `brew install supabase/tap/supabase`  
   - O desde: https://supabase.com/docs/guides/cli

2. Inicia sesión: `supabase login`

3. Configura los secrets:

```bash
supabase secrets set METAMAP_CLIENT_ID=612566a0a0be80001b035915 --project-ref nsrzlwetutrzvfwhvpas
supabase secrets set METAMAP_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI --project-ref nsrzlwetutrzvfwhvpas
```

(Sustituye `TU_CLIENT_SECRET_AQUI` por el valor real de Metamap.)

### Paso 5: Desplegar

1. Haz clic en **"Deploy function"** abajo del editor
2. Espera 10–30 segundos hasta que termine

---

## Método 2: Usando la terminal (Supabase CLI)

Si prefieres usar la terminal:

```bash
# 1. Instalar Supabase CLI (si no lo tienes)
brew install supabase/tap/supabase   # Mac

# 2. Ir a la carpeta del proyecto
cd "/Users/juanpabloobregonjacome/Desktop/Checkout boton"

# 3. Configurar secrets
supabase secrets set METAMAP_CLIENT_ID=612566a0a0be80001b035915 --project-ref nsrzlwetutrzvfwhvpas
supabase secrets set METAMAP_CLIENT_SECRET=TU_CLIENT_SECRET --project-ref nsrzlwetutrzvfwhvpas

# 4. Desplegar la función
supabase functions deploy check-metamap-verification --project-ref nsrzlwetutrzvfwhvpas
```

---

## Verificar que funciona

1. En Supabase Dashboard → Edge Functions → `check-metamap-verification`
2. Abre la pestaña **Test**
3. Método: **POST**
4. Body:

```json
{
  "verificationId": "UN_VERIFICATION_ID_REAL",
  "applicationId": "oba_test_123"
}
```

(Sustituye `UN_VERIFICATION_ID_REAL` por un ID de verificación que hayas completado en Metamap.)

5. Haz clic en **Send** o **Test**

Si responde algo como `{"status":"verified",...}` o `{"status":"rejected",...}`, la función está bien configurada.

---

## Tu `supabase-config.js`

Asegúrate de que incluye la URL correcta:

```javascript
window.PPSupabaseConfig = {
  enabled: true,
  url: 'https://nsrzlwetutrzvfwhvpas.supabase.co',
  anonKey: 'tu_anon_key_aqui',
  // ...
};
```

La `anonKey` la encuentras en Supabase: **Settings → API → anon public**.

---

## Preguntas frecuentes

### Metamap me pide Webhook URL y Webhook secret, ¿qué pongo?

Son para recibir notificaciones automáticas. **Para nuestro flujo no son obligatorios**. Opciones:

- **Dejarlos vacíos** si el formulario lo permite
- **Webhook URL temporal:** `https://example.com/webhook` (no funcionará pero puede dejar guardar)
- **Más adelante** puedes crear una Edge Function que reciba el webhook y actualice el estado

Lo que sí necesitas es el **Client Secret** (credenciales API), que suele estar en otra parte del Integration.

### ¿Dónde está el Client Secret?

En [Metamap Dashboard](https://dashboard.getmati.com/dev) → **Integration**. Busca una sección de "Credentials", "API" o "Developer". A veces está junto al Client ID en un mismo bloque. El Client Secret suele ser una cadena larga que puedes revelar con un clic (show/copy).

---

## Si algo no funciona

1. **"Configura METAMAP_CLIENT_ID y METAMAP_CLIENT_SECRET"**  
   → Revisa que hayas creado ambos secrets en Supabase.

2. **"Error de autenticación con Metamap"**  
   → Comprueba que el Client Secret sea el correcto en el [Metamap Dashboard](https://dashboard.getmati.com).

3. **Probar sin Supabase**  
   En la consola del navegador (en la página de onboarding), puedes simular:

```javascript
setKycResult('oba_TU_CODIGO', { status: 'approved' });
```

Reemplaza `oba_TU_CODIGO` por el código de solicitud que ves en la interfaz.
