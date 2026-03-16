import re
with open('factura.html', 'r') as f:
    text = f.read()

text = text.replace('<i class="fab fa-whatsapp"></i> WhatsApp', '<i class="fab fa-whatsapp"></i> <span data-i18n="invoice_btn_wa">WhatsApp</span>')
text = text.replace('<i class="fab fa-telegram"></i> Telegram', '<i class="fab fa-telegram"></i> <span data-i18n="invoice_btn_tg">Telegram</span>')
text = text.replace('<i class="fas fa-envelope"></i> Correo', '<i class="fas fa-envelope"></i> <span data-i18n="invoice_btn_email">Correo</span>')
with open('factura.html', 'w') as f:
    f.write(text)
