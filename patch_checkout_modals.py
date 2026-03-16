import re

with open('checkout.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Setup recurrent payment modal
content = content.replace("Configurar cobro recurrente", "<span data-i18n=\\'config_recurring\\'>Configurar cobro recurrente</span>")
content = content.replace("Puedes autorizar cobros mensuales o", "<span data-i18n=\\'config_recurring_desc\\'>Puedes autorizar cobros mensuales o permitir que PuntoPago cobre cuando el operador facture.</span>")
content = content.replace("Cobro mensual", "<span data-i18n=\\'recurring_monthly\\'>Cobro mensual</span>")
content = content.replace("— elegir día del mes", "<span data-i18n=\\'recurring_monthly_desc\\'>— elegir día del mes</span>")
content = content.replace("Día del mes:", "<span data-i18n=\\'recurring_day\\'>Día del mes:</span>")
content = content.replace("Autorizar en factura", "<span data-i18n=\\'recurring_invoice\\'>Autorizar en factura</span>")
content = content.replace("— PuntoPago podrá cobrar cuando el operador facture", "<span data-i18n=\\'recurring_invoice_desc\\'>— PuntoPago podrá cobrar cuando el operador facture</span>")
content = content.replace("Autorizo a PuntoPago a cobrar en mi nombre cuando el operador facture.", "<span data-i18n=\\'recurring_auth_desc\\'>Autorizo a PuntoPago a cobrar en mi nombre cuando el operador facture.</span>")
content = content.replace(">Cancelar<", " data-i18n=\\'checkout_cancel\\'>Cancelar<")

# Delivery method modal
content = content.replace("¿Cómo quieres recibir el comprobante?", "<span data-i18n=\\'delivery_title\\'>¿Cómo quieres recibir el comprobante?</span>")
content = content.replace("Elige uno de los canales disponibles y completa la información.", "<span data-i18n=\\'delivery_desc\\'>Elige uno de los canales disponibles y completa la información.</span>")

# Confirm modal
content = content.replace("Pago confirmado", "<span data-i18n=\\'confirm_title\\'>Pago confirmado</span>")
content = content.replace("Gracias por tu pago de", "<span data-i18n=\\'confirm_thanks\\'>Gracias por tu pago de</span>")
content = content.replace("Se envió el comprobante vía", "<span data-i18n=\\'confirm_sent_via\\'>Se envió el comprobante vía</span>")
content = content.replace(">Compartir<", " data-i18n=\\'confirm_share\\'>Compartir<")
content = content.replace(">Listo<", " data-i18n=\\'confirm_done\\'>Listo<")
content = content.replace("Desde tu teléfono puedes usar el botón \\\"Compartir\\' para enviar el comprobante por otra app.", "<span data-i18n=\\'confirm_share_hint\\'>Desde tu teléfono puedes usar el botón \\\"Compartir\\\" para enviar el comprobante por otra app.</span>")

with open('checkout.html', 'w', encoding='utf-8') as f:
    f.write(content)

