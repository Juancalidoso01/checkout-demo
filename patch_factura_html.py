import re

with open('factura.html', 'r') as f:
    html = f.read()

# Replace targets with `data-i18n` tags
replacements = [
    (r'>Factura</span>', r' data-i18n="tab_invoice">Factura</span>'),
    (r'>Volver</a>', r' data-i18n="common_back">Volver</a>'),
    (r'>Salir</a>', r' data-i18n="common_logout">Salir</a>'),
    (r'>Sesión</div>', r' data-i18n="common_session">Sesión</div>'),
    (r'<span class="title">Cargar última operación</span>', r'<span class="title" data-i18n="invoice_load_last">Cargar última operación</span>'),
    (r'<span class="title">Limpiar</span>', r'<span class="title" data-i18n="invoice_clear">Limpiar</span>'),
    (r'>Confirma los datos del cliente para compartir el recibo.</p>', r' data-i18n="invoice_subtitle">Confirma los datos del cliente para compartir el recibo.</p>'),
    (r'>Nombre \(opcional\)</label>', r' data-i18n="invoice_label_name">Nombre (opcional)</label>'),
    (r'placeholder="Ej: Juan Pérez"', r'placeholder="Ej: Juan Pérez" data-i18n="invoice_ph_name"'),
    (r'>Documento / ID \(opcional\)</label>', r' data-i18n="invoice_label_id">Documento / ID (opcional)</label>'),
    (r'placeholder="Ej: 8-888-888"', r'placeholder="Ej: 8-888-888" data-i18n="invoice_ph_id"'),
    (r'>WhatsApp \(tel con país\)</label>', r' data-i18n="invoice_label_wa">WhatsApp (tel con país)</label>'),
    (r'placeholder="50760000000"', r'placeholder="50760000000" data-i18n="invoice_ph_wa"'),
    (r'>Formato sin espacios\. Ej: 50760000000</p>', r' data-i18n="invoice_help_wa">Formato sin espacios. Ej: 50760000000</p>'),
    (r'>Correo electrónico</label>', r' data-i18n="invoice_label_email">Correo electrónico</label>'),
    (r'placeholder="cliente@correo\.com"', r'placeholder="cliente@correo.com" data-i18n="invoice_ph_email"'),
    (r'>Telegram \(usuario o número\)</label>', r' data-i18n="invoice_label_tg">Telegram (usuario o número)</label>'),
    (r'placeholder="@usuario o 50760000000"', r'placeholder="@usuario o 50760000000" data-i18n="invoice_ph_tg"'),
    (r'>Mensaje \(editable\)</label>', r' data-i18n="invoice_label_msg">Mensaje (editable)</label>'),
    (r'placeholder="Mensaje para el cliente\.\.\."', r'placeholder="Mensaje para el cliente..." data-i18n="invoice_ph_msg"'),
    (r'>Vista previa</h2>', r' data-i18n="invoice_preview_title">Vista previa</h2>'),
    (r'>Así verá el recibo el cliente \(texto\)\.</p>', r' data-i18n="invoice_preview_desc">Así verá el recibo el cliente (texto).</p>'),
    (r'>Este demo abre apps/enlaces para compartir\. En producción, esto saldría de un backend con envío real\.</div', r' data-i18n="invoice_preview_disclaimer">Este demo abre apps/enlaces para compartir. En producción, esto saldría de un backend con envío real.</div'),
    (r'Demo — Los datos se guardan en <code>localStorage</code>\. Fuente de operaciones: sandbox <code>pp_agent_sandbox_v1</code>\.', r'<span data-i18n="invoice_demo_footer">Demo — Los datos se guardan en <code>localStorage</code>. Fuente de operaciones: sandbox <code>pp_agent_sandbox_v1</code>.</span>')
]

for pat, repl in replacements:
    html = re.sub(pat, repl, html)

with open('factura.html', 'w') as f:
    f.write(html)

