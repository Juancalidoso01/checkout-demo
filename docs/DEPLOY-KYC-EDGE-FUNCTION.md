# Desplegar Edge Function para verificar estado en Metamap

La función `check-metamap-verification` consulta la API de Metamap para obtener el estado real de una verificación (aprobada, rechazada, en revisión) **y lo guarda en la tabla `kyc_verifications`**. El frontend lee el estado desde Supabase.

## Requisitos

1. **Tabla `kyc_verifications`** creada en Supabase (SQL en `supabase/migrations/20250316000000_create_kyc_verifications.sql` o en la guía principal)
2. **Supabase CLI** instalado (opcional, si despliegas desde terminal)
3. **Client Secret de Metamap** (desde [Metamap Dashboard](https://dashboard.getmati.com) → Integration)
   - Ya tienes `client_id`: `612566a0a0be80001b035915`
   - Necesitas el `client_secret`

## Despliegue

```bash
# Desde la raíz del proyecto
cd supabase
supabase functions deploy check-metamap-verification --project-ref nsrzlwetutrzvfwhvpas
```

## Configurar secrets

```bash
supabase secrets set METAMAP_CLIENT_ID=612566a0a0be80001b035915 --project-ref nsrzlwetutrzvfwhvpas
supabase secrets set METAMAP_CLIENT_SECRET=tu_client_secret_aqui --project-ref nsrzlwetutrzvfwhvpas
```

## Flujo

1. El usuario completa el flujo de Metamap → `userFinishedSdk` devuelve `verificationId`
2. Estado local: `pending_review` (spinner "Validando…")
3. Al cargar la página: el frontend **lee el estado desde Supabase** (`kyc_verifications`)
4. El usuario hace clic en **"Verificar estado"** → el frontend llama a la Edge Function
5. La Edge Function consulta Metamap, **guarda el resultado en `kyc_verifications`** y lo devuelve
6. Si `status === "approved"` → se muestra "Identidad verificada" y el usuario puede continuar

## URL de la función

```
https://nsrzlwetutrzvfwhvpas.supabase.co/functions/v1/check-metamap-verification
```

El frontend usa `PPSupabaseConfig.url` + `/functions/v1/check-metamap-verification`.

## Prueba sin Edge Function

Si la función aún no está desplegada, puedes simular aprobación desde la consola del navegador (en la página de onboarding):

```javascript
setKycResult('TU_APPLICATION_ID', { status: 'approved' });
```

Reemplaza `TU_APPLICATION_ID` por el código que ves en "Código de solicitud" (ej. `oba_abc123_1234567890`).
