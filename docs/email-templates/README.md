# Plantillas de correo (Supabase Auth)

## Magic link al cliente (`magic-link-punto-pago.html`)

Diseño con **banner en gradiente** (colores Punto Pago), texto claro en español y botón **“Confirmar mi correo y continuar”**.

### Cómo aplicarlo en Supabase

1. Entra al proyecto en [Supabase Dashboard](https://supabase.com/dashboard).
2. **Authentication** → **Email Templates**.
3. Abre la plantilla **Magic Link** (a veces el envío por `signInWithOtp` usa esta u otra similar según versión; si no ves “Magic Link”, revisa también **Confirm signup**).
4. **Subject** (asunto), por ejemplo:
   - `Confirma tu correo para continuar con Punto Pago`
5. En el cuerpo del mensaje:
   - Si el editor tiene modo **HTML / Source**, pega el contenido del archivo `magic-link-punto-pago.html`.
   - Algunas versiones solo aceptan fragmento: copia desde `<table role="presentation" width="100%"` del primer bloque grande hasta el cierre de esa tabla exterior (o prueba pegando el `<body>` completo sin las etiquetas `<body>` externas).
6. **No elimines** las variables `{{ .ConfirmationURL }}` ni `{{ .Email }}` (y `{{ .SiteURL }}` si las usas en otro bloque).

### Variables útiles (Go templates de Supabase)

| Variable | Uso |
|----------|-----|
| `{{ .ConfirmationURL }}` | Enlace mágico (obligatorio en el botón y enlace alternativo) |
| `{{ .Email }}` | Correo del destinatario |
| `{{ .SiteURL }}` | URL base del proyecto Auth |

### SMTP propio

Si configuras **SMTP** en *Project Settings → Auth*, el mismo HTML se envía por tu proveedor; revisa que no recorte estilos (SendGrid, Resend, etc. suelen aceptar tablas + estilos inline como en la plantilla).

### Vista previa

Tras guardar, usa **Send test** en el dashboard o pide un magic link desde `onboarding-access.html` y revisa el correo en bandeja de entrada y spam.
