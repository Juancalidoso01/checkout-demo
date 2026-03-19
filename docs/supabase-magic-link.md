# Magic link en `onboarding-access.html` (Supabase Auth)

Si aparece **“No se pudo enviar el enlace”** o un error al pedir el magic link, revisa en el proyecto Supabase:

## 1. Redirect URL permitida

**Authentication → URL Configuration → Redirect URLs**

Debe incluirse **exactamente** la URL configurada en `supabase-config.js` → `redirectTo`, por ejemplo:

`https://juancalidoso01.github.io/checkout-demo/onboarding-access.html`

(Sin `#` ni query string; si usas otra rama o dominio, actualiza ambos sitios.)

## 2. Email habilitado

**Authentication → Providers → Email**  
- Proveedor activo.  
- Si las altas están deshabilitadas, `signInWithOtp` con usuario nuevo puede fallar.

## 3. Límites de envío

Supabase limita correos por hora en planes gratuitos. Si probaste muchas veces seguidas, espera 1–2 minutos.

## 4. SMTP / plantillas

**Project Settings → Auth**  
Si usas SMTP propio, verifica credenciales. Si usas el envío por defecto de Supabase, revisa cuotas y la bandeja de spam del destinatario.

## 5. Mismo correo que invitación previa

Si ese email ya fue invitado con **Invite user** desde el admin, puede haber mensajes del tipo “already registered”. En ese caso use **login** u otro correo para una solicitud nueva de onboarding.

Tras un fallo, la pantalla muestra el **mensaje devuelto por Supabase** y la **URL de redirect** usada, para facilitar el ajuste en el dashboard.
