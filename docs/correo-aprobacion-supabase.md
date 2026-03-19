# Correo al cliente tras aprobar la solicitud (Supabase)

## Sí, puedes usar Supabase

El flujo actual del portal llama a la Edge Function **`invite-agent-credentials`**, que usa **`supabase.auth.admin.inviteUserByEmail`**. Ese método **dispara el correo de invitación de Supabase Auth** (plantilla configurable en el panel).

### Qué configurar

1. **Desplegar** la función `invite-agent-credentials` y definir en el proyecto:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - Opcional: `ADMIN_ACTION_TOKEN` y enviar el header `x-admin-action-token` desde el cliente (si lo añades en `supabase-applications.js` al invocar la función).

2. En el frontend (`PPSupabaseConfig` / `supabase-config.js`):
   - **`enableCredentialInvites: true`** para que `inviteApprovedApplication` invoque la función.
   - **`agentInviteRedirectTo`** (o `redirectTo`) si quieres que el enlace del correo lleve a una URL concreta (p. ej. onboarding).

3. **Personalizar el texto del correo**: en Supabase Dashboard → **Authentication → Email Templates** → plantilla de **Invite user** (o la que use tu proyecto).

### Si necesitas un correo distinto (“Tu solicitud fue aprobada” + datos propios)

- **Opción A**: Ajustar las plantillas de Auth (rápido, limitado al formato de Supabase).
- **Opción B**: En la misma Edge Function (u otra), integrar **Resend / SendGrid / SMTP** y enviar un segundo correo transaccional con el copy que quieras.
- **Nota de seguridad**: Las **contraseñas demo** del listado del portal (`portalDemoPassword`) son solo para el prototipo en `localStorage` / `credentials_payload`. En producción no guardes contraseñas en claro en la base; usa invitación Auth, reset de contraseña o flujos seguros.
