# Plantillas de correo (Supabase Auth)

## Magic link al cliente (`magic-link-punto-pago.html`)

Diseño con **banner en gradiente** (colores Punto Pago), texto claro en español y botón **“Confirmar mi correo y continuar”**.

### Cómo aplicarlo en Supabase

1. Entra al proyecto en [Supabase Dashboard](https://supabase.com/dashboard).
2. **Authentication** → **Email Templates**.
3. Abre la plantilla **Magic Link** (a veces el envío por `signInWithOtp` usa esta u otra similar según versión; si no ves “Magic Link”, revisa también **Confirm signup**).
4. **Subject** (asunto), por ejemplo:
   - `Confirma tu correo para continuar con Punto Pago`
5. En el cuerpo del mensaje (**Body**), sigue el **[paso 6 detallado](#paso-6-pegar-el-html-en-supabase)** abajo.
6. **No elimines** las variables `{{ .ConfirmationURL }}` ni `{{ .Email }}` (y `{{ .SiteURL }}` si las usas en otro bloque).

---

## Paso 6: pegar el HTML en Supabase (paso a paso)

### A) Abrir el texto para copiar

En tu computadora, abre el archivo del proyecto:

**`docs/email-templates/PARA-PEGAR-EN-SUPABASE.html`**

(En GitHub: entra al repo → carpeta `docs/email-templates` → abre ese archivo → botón **Raw** para ver solo el código.)

### B) Qué copiar

1. Baja hasta la línea que empieza con **`<table role="presentation"`** (la primera `<table` grande).
2. Selecciona desde ahí hasta el **último `</table>`** del archivo (todo el bloque del correo).
3. **Copiar** (Ctrl+C o Cmd+C).  
   *No copies el comentario `<!--` de arriba si te resulta más fácil; lo importante es el bloque `<table>...</table>`.*

### C) Dónde pegarlo en Supabase

1. En el Dashboard: **Authentication** → **Email templates**.
2. Haz clic en **Magic link** en la lista (nombre exacto puede ser *Magic Link*).
3. Verás algo como:
   - **Subject** → ahí va solo el asunto (texto plano).
   - **Body** / **Message** / **Email body** → ahí va el HTML.

4. **Cómo pegar según lo que veas:**
   - Si ves un recuadro grande de texto y al lado o arriba dice **Source**, **HTML**, **`</>`** o **Edit as HTML**: haz clic ahí y **pega** el bloque que copiaste.
   - Si solo ves un editor tipo Word (negritas, listas): busca en la esquina un icono **`</>`** o menú **⋮** → *Edit HTML* / *Source* y pega ahí.
   - Si al pegar se ve código raro con etiquetas `<table`: está bien; Supabase envía eso como HTML al correo.

5. Pulsa **Save** (Guardar) abajo o arriba de la plantilla.

### D) Probar

Pide un magic link otra vez desde tu página de acceso. El correo nuevo debería verse con el banner morado y el botón.

### Si algo falla

- Si al guardar Supabase muestra error, prueba pegando **menos**: solo desde la primera `<table` hasta la última `</table>` sin líneas vacías al final.
- Si el correo llega sin diseño (solo texto), tu cliente de correo a veces simplifica la vista; abre el correo en **“ver en navegador”** o en otro cliente (Gmail web suele respetar tablas e inline styles).

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

### Animaciones (PEGAR-EN-SUPABASE-SOLO-ESTO)

La plantilla incluye un bloque `<style>` con animaciones suaves (entrada de la tarjeta, brillo del banner, pulso del botón, punto verde tipo “estamos listos”) inspiradas en la landing de validación. **Gmail y algunos clientes pueden quitar `<style>`**: el correo se ve igual de cuidado, solo sin movimiento. En **Apple Mail** y otros suelen verse las animaciones.
