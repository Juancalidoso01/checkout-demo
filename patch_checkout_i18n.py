import re

with open('checkout.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Buscamos placeholders en checkout.html
phs = {
    'placeholder="Nombre Apellido"': 'data-i18n-ph="checkout_ph_name"',
    'placeholder="4242 4242 4242 4242"': '', # it's fine
    'placeholder="04/26"': '',
    'placeholder="123"': '',
    'placeholder="+593 9XXXXXXXX"': 'data-i18n-ph="checkout_ph_phone"',
    'placeholder="Cédula / ID"': 'data-i18n-ph="checkout_ph_id"',
    'placeholder="******"': '',
    'placeholder="@usuario"': 'data-i18n-ph="checkout_ph_tg"',
    'placeholder="tu@correo.com"': 'data-i18n-ph="checkout_ph_email"',
}

# Buscamos botones quemados en checkout.html
# "Pagar ahora" -> data-i18n="checkout_pay_now"
# "Procesando pago…" -> JS variable mapping (can handle later)
# "Volver al agente" -> data-i18n="checkout_back_agent"
# "Confirmar" -> data-i18n="common_confirm"
# "Cerrar" -> data-i18n="common_close"
