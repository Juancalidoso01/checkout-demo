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

- Portal oculto de credenciales: abrir directamente `admin/credentials.html`
- Entrada dedicada para admin: `admin-login.html`
- Entrada discreta para compartir por GitHub Pages: `pp-admin-entry.html`
- Requiere iniciar sesión como `superadmin`

Si publicas este repo con GitHub Pages, las rutas quedarían así:

- `https://juancalidoso01.github.io/checkout-demo/admin-login.html`
- `https://juancalidoso01.github.io/checkout-demo/pp-admin-entry.html`
- `https://juancalidoso01.github.io/checkout-demo/admin/credentials.html`

Licencia: uso para demostración y pruebas.
