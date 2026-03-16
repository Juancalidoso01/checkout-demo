import re

def rewrite(path):
    with open(path, 'r') as f:
        html = f.read()

    # agents/recharge.html
    html = re.sub(r'(>)\s*Factura\s*(<)', r'\1Factura\2', html)
    html = html.replace('<span class="title">Factura</span>', '<span class="title" data-i18n="tab_invoice">Factura</span>')
    html = html.replace('<h2 class="text-2xl font-bold pp-type">Factura</h2>', '<h2 class="text-2xl font-bold pp-type" data-i18n="tab_invoice">Factura</h2>')

    html = re.sub(r'(>)\s*Histórico\s*(<)', r'\1Histórico\2', html)
    html = html.replace('<span class="title">Histórico</span>', '<span class="title" data-i18n="tab_history">Histórico</span>')
    html = html.replace('<h2 class="text-2xl font-bold pp-type">Histórico de transacciones</h2>', '<h2 class="text-2xl font-bold pp-type" data-i18n="recharge_history_title">Histórico de transacciones</h2>')

    html = re.sub(r'(>)\s*Pago de servicios\s*(<)', r'\1Pago de servicios\2', html)
    html = html.replace('<span class="title">Pago de servicios</span>', '<span class="title" data-i18n="tab_payments">Pago de servicios</span>')
    
    html = re.sub(r'(>)\s*Fondear\s*(<)', r'\1Fondear\2', html)
    html = html.replace('<span class="title">Fondear</span>', '<span class="title" data-i18n="tab_fund">Fondear</span>')

    html = re.sub(r'(>)\s*Notificar ACH\s*(<)', r'\1Notificar ACH\2', html)
    html = html.replace('<span class="title">Notificar ACH</span>', '<span class="title" data-i18n="tab_ach">Notificar ACH</span>')

    html = html.replace('>Continuar<', ' data-i18n="common_continue">Continuar<')

    # Factura specifics
    html = html.replace('>Punto Pago — Comprobante<', ' data-i18n="invoice_print">Punto Pago — Comprobante<')
    html = html.replace('>Operación<', ' data-i18n="invoice_op">Operación<')
    html = html.replace('span class="text-gray-500">Monto<', 'span class="text-gray-500" data-i18n="invoice_amount">Monto<')
    html = html.replace('span class="text-gray-500">Referencia<', 'span class="text-gray-500" data-i18n="invoice_ref">Referencia<')
    html = html.replace('">Enviar comprobante<', '" data-i18n="invoice_send_btn">Enviar comprobante<')

    # Checkout specifics
    html = html.replace('<div class="small">Total a pagar</div>', '<div class="small" data-i18n="checkout_total">Total a pagar</div>')
    html = html.replace('Selecciona un método de pago para continuar.', '<span data-i18n="checkout_select_method">Selecciona un método de pago para continuar.</span>')
    html = html.replace('Pagar pedido</button>', '<span data-i18n="checkout_pay_button">Pagar pedido</span></button>')
    html = html.replace('">Cancelar</button>', '" data-i18n="checkout_cancel">Cancelar</button>')
    html = html.replace('>Pago seguro y rápido<', ' data-i18n="checkout_secure">Pago seguro y rápido<')

    # Inject script if missing in checkout or factura
    if 'factura.html' in path or 'checkout.html' in path:
        if 'i18n.js' not in html:
            html = html.replace('</body>', '  <script src="i18n.js?v=2"></script>\n</body>')
        if 'chat-widget.js' not in html:
            html = html.replace('</body>', '  <script src="chat-widget.js"></script>\n</body>')

    with open(path, 'w') as f:
        f.write(html)

rewrite('agents/recharge.html')
rewrite('checkout.html')
rewrite('factura.html')
