# Demo Checkout - Botón

Demo local con varios flujos de pago en HTML/CSS/JS.

Archivos clave:

- `checkout.html` — página principal del demo.
- `styles.css` — estilos del demo.
- `entry.html` — selector conceptual (opcional).

Cómo ver localmente:

- Abrir `checkout.html` en el navegador o arrancar un servidor estático:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# y abrir http://localhost:8080/checkout.html
```

Acceso interno del prototipo:

- Entrada oficial para admin por GitHub Pages: `pp-admin-entry.html` (login y gestión de credenciales en una sola URL)
- Nueva validación previa al onboarding: `onboarding-access.html`
- Nuevo formulario de onboarding exhaustivo: `onboarding.html`
- Requiere iniciar sesión como `superadmin`

Si publicas este repo con GitHub Pages, las rutas quedarían así:

- `https://juancalidoso01.github.io/checkout-demo/pp-admin-entry.html`
- `https://juancalidoso01.github.io/checkout-demo/onboarding-access.html`
- `https://juancalidoso01.github.io/checkout-demo/onboarding.html`

Flujo recomendado:

1. Abrir `https://juancalidoso01.github.io/checkout-demo/pp-admin-entry.html`
2. Iniciar sesión como `superadmin`
3. Revisar y administrar las credenciales de agentes en la misma página, sin depender de rutas adicionales

Flujo de onboarding propuesto:

1. Abrir `https://juancalidoso01.github.io/checkout-demo/onboarding-access.html`
2. Validar correo, teléfono y nombre base del comercio
3. Si no existe cuenta ni solicitud activa, continuar a `onboarding.html`
4. Completar el formulario exhaustivo del comercio
5. Guardar la solicitud como `pending_review` en la cola local del prototipo
6. Aprobar luego desde el portal admin y recién entonces asignar/pegar credenciales definitivas

## Configuración sugerida: Supabase para confirmar correo

Se dejó preparado `onboarding-access.html` para usar Supabase Auth con magic link sin romper el fallback local del prototipo.

### Archivos preparados

- `supabase-config.js` — activa/desactiva Supabase y guarda URL / anon key
- `onboarding-access.html` — usa Supabase si está habilitado; si no, sigue usando la validación local actual

### Lo que debes hacer en Supabase

1. Crear un proyecto en Supabase
2. Ir a **Authentication > URL Configuration**
3. Configurar estas URLs:
   - **Site URL**: `https://juancalidoso01.github.io/checkout-demo/`
   - **Redirect URLs**:
     - `https://juancalidoso01.github.io/checkout-demo/onboarding-access.html`
     - opcional para pruebas locales: `http://127.0.0.1:8080/onboarding-access.html`
4. En **Authentication > Providers > Email**, dejar activo Email / Magic Link
5. En **Project Settings > API**, copiar:
   - `Project URL`
   - `anon public key`

### Lo que debes editar en este repo

Abrir `supabase-config.js` y reemplazar:

- `enabled: false` -> `enabled: true`
- `url: ''` -> tu `Project URL`
- `anonKey: ''` -> tu `anon public key`
- `redirectTo` -> mantener la URL pública de `onboarding-access.html`

Ejemplo:

```js
window.PPSupabaseConfig = {
  enabled: true,
  url: 'https://TU-PROYECTO.supabase.co',
  anonKey: 'TU_ANON_KEY',
  redirectTo: 'https://juancalidoso01.github.io/checkout-demo/onboarding-access.html',
  provider: 'magic_link'
};
```

### Qué pasa después de configurarlo

1. El usuario escribe correo, teléfono y comercio en `onboarding-access.html`
2. Si no existe cuenta ni solicitud activa, se envía un magic link real por correo
3. El usuario abre el enlace y vuelve a `onboarding-access.html`
4. La página detecta la sesión confirmada y lo deja pasar a `onboarding.html`

### Nota importante

Mientras `enabled` siga en `false`, el prototipo seguirá funcionando con la validación local actual.

Licencia: uso para demostración y pruebas.
