# Correo de bienvenida al agente (credenciales + valor)

## ¿Qué es esto?

No es una plantilla que venga lista en **Supabase Auth** como el magic link. El correo de **bienvenida con usuario y contraseña** lo debes enviar tú, por ejemplo:

- **Gratis, sin APIs** (ya en el admin): al aprobar en `pp-admin-entry.html` aparece un aviso con **Copiar mensaje** y **Borrador de correo**. El segundo abre tu cliente de correo (Gmail, Outlook, Apple Mail…) con el **Para**, **Asunto** y **cuerpo** ya armados; solo pulsas Enviar. No pagas nada ni necesitas Resend/SendGrid.
- **Manual con HTML**: copias la plantilla, reemplazas los marcadores y lo envías desde tu correo (solo pruebas).
- **Automático (recomendado en serio a escala)**: una **Edge Function** o servicio (Resend, SendGrid, etc.) que, al aprobar al aliado, arme el HTML y envíe el mensaje. Muchos tienen **capa gratuita** con límite mensual si más adelante quieres que salga sin abrir tu correo.

En el repo tienes el HTML listo en:

**[`docs/email-templates/bienvenida-agente-PEGA-AQUI.html`](./email-templates/bienvenida-agente-PEGA-AQUI.html)**

Mismo estilo visual que el magic link (banner, animaciones opcionales, Montserrat).

## Marcadores a reemplazar

| Marcador | Ejemplo | Descripción |
|----------|---------|-------------|
| `{{DISPLAY_NAME}}` | `Comercio La Esquina` | Nombre visible / comercio |
| `{{PORTAL_USERNAME}}` | `lae squina` o email | Usuario del portal demo |
| `{{PORTAL_PASSWORD}}` | `tmp-abc123xy` | Contraseña temporal |
| `{{LOGIN_URL}}` | `https://juancalidoso01.github.io/checkout-demo/login.html` | Página de inicio de sesión |
| `{{PORTAL_HOME_URL}}` | `https://juancalidoso01.github.io/checkout-demo/agents/recharge.html` | Portal tras entrar (ajusta dominio si cambias el sitio) |

En código (Node/Deno), algo como:

```javascript
let html = await Deno.readTextFile('bienvenida-agente-PEGA-AQUI.html');
html = html
  .replaceAll('{{DISPLAY_NAME}}', displayName)
  .replaceAll('{{PORTAL_USERNAME}}', username)
  .replaceAll('{{PORTAL_PASSWORD}}', password)
  .replaceAll('{{LOGIN_URL}}', loginUrl)
  .replaceAll('{{PORTAL_HOME_URL}}', portalHomeUrl);
```

## Asunto sugerido

- `Bienvenido a Punto Pago — tus credenciales del portal de agentes`
- `Tu acceso al portal Punto Pago ya está listo`

## Seguridad (importante)

- Mandar **contraseña en claro por correo** es un riesgo (interceptación, reenvíos, buzón compartido).
- En **producción** suele ser mejor: **solo magic link / invitación** o contraseña temporal + **obligar cambio** al primer login.
- El texto amarillo en la plantilla recuerda no reenviar el correo; puedes endurecer el mensaje según tu política.

## Relación con lo que ya tienes en el demo

En `pp-admin-entry.html`, al aprobar, el sistema genera usuario/contraseña demo (`ensureAgentUserFromApproval`) y muestra el aviso para **copiar** o abrir **borrador de correo** (`mailto:`). Eso **no** envía el HTML bonito de `bienvenida-agente-PEGA-AQUI.html` solo: si quieres ese diseño automático, habría que **llamar a tu función de correo** pasando `username` y `password`.

Si quieres el siguiente paso en código (Edge Function `send-agent-welcome` + Resend u otro), se puede añadir en otro cambio.
