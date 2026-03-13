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

- Entrada oficial para admin por GitHub Pages: `pp-admin-entry.html`
- Entrada alternativa para admin: `admin-login.html`
- `pp-admin-entry.html` ahora contiene el login admin y la gestión de credenciales en una sola URL estable
- `admin/credentials.html` se mantiene solo como compatibilidad y redirige a la entrada oficial
- Nuevo formulario de onboarding exhaustivo: `onboarding.html`
- Requiere iniciar sesión como `superadmin`

Si publicas este repo con GitHub Pages, las rutas quedarían así:

- `https://juancalidoso01.github.io/checkout-demo/pp-admin-entry.html`
- `https://juancalidoso01.github.io/checkout-demo/admin-login.html`
- `https://juancalidoso01.github.io/checkout-demo/admin/credentials.html` (redirige a la entrada oficial)
- `https://juancalidoso01.github.io/checkout-demo/onboarding.html`

Flujo recomendado:

1. Abrir `https://juancalidoso01.github.io/checkout-demo/pp-admin-entry.html`
2. Iniciar sesión como `superadmin`
3. Revisar y administrar las credenciales de agentes en la misma página, sin depender de rutas adicionales

Flujo de onboarding propuesto:

1. Abrir `https://juancalidoso01.github.io/checkout-demo/onboarding.html`
2. Completar el formulario exhaustivo del comercio
3. Guardar la solicitud como `pending_review` en la cola local del prototipo
4. Aprobar luego desde el portal admin y recién entonces asignar/pegar credenciales definitivas

Licencia: uso para demostración y pruebas.
