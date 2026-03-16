import re

with open('factura.html', 'r') as f:
    js = f.read()

# Replace hardcoded messages to use I18N.getDict()
js = js.replace("const greet = name ? `Hola ${name},` : 'Hola,';", "const dict = window.I18N ? window.I18N.getDict() : {};\n      const greetText = dict['invoice_greet'] || 'Hola';\n      const greet = name ? `${greetText} ${name},` : `${greetText},`;")
js = js.replace("'Te compartimos tu comprobante de pago:'", "dict['invoice_msg_body'] || 'Te compartimos tu comprobante de pago:'")
js = js.replace("`Monto: ${receipt.amount}`", "`${dict['invoice_amount'] || 'Monto'}: ${receipt.amount}`")
js = js.replace("`Referencia: ${receipt.ref}`", "`${dict['invoice_ref'] || 'Referencia'}: ${receipt.ref}`")
js = js.replace("'Gracias por usar Punto Pago.'", "dict['invoice_msg_footer'] || 'Gracias por usar Punto Pago.'")

js = js.replace("const blank = { title: 'Operación',", "const dict = window.I18N ? window.I18N.getDict() : {};\n        const blank = { title: dict['invoice_op'] || 'Operación',")

js = js.replace("setStatus('Ingresa el número de WhatsApp (con código de país, sin +).');", "setStatus((window.I18N ? window.I18N.getDict()['invoice_err_wa'] : null) || 'Ingresa el número de WhatsApp (con código de país, sin +).');")
js = js.replace("setStatus('Abriendo WhatsApp…');", "setStatus((window.I18N ? window.I18N.getDict()['invoice_status_wa'] : null) || 'Abriendo WhatsApp…');")
js = js.replace("setStatus('Ingresa un correo del cliente.');", "setStatus((window.I18N ? window.I18N.getDict()['invoice_err_email'] : null) || 'Ingresa un correo del cliente.');")
js = js.replace("setStatus('Abriendo correo…');", "setStatus((window.I18N ? window.I18N.getDict()['invoice_status_email'] : null) || 'Abriendo correo…');")
js = js.replace("setStatus('Abriendo Telegram (compartir)…');", "setStatus((window.I18N ? window.I18N.getDict()['invoice_status_tg_share'] : null) || 'Abriendo Telegram (compartir)…');")
js = js.replace("setStatus('Abriendo Telegram… (luego pega el mensaje)');", "setStatus((window.I18N ? window.I18N.getDict()['invoice_status_tg'] : null) || 'Abriendo Telegram… (luego pega el mensaje)');")
js = js.replace("setStatus('No hay transacciones en el sandbox todavía. Realiza un Cash In o un pago primero.');", "setStatus((window.I18N ? window.I18N.getDict()['invoice_err_no_tx'] : null) || 'No hay transacciones en el sandbox todavía. Realiza un Cash In o un pago primero.');")
js = js.replace("setStatus('Última operación cargada. Completa los datos del cliente y elige el canal.');", "setStatus((window.I18N ? window.I18N.getDict()['invoice_status_loaded'] : null) || 'Última operación cargada. Completa los datos del cliente y elige el canal.');")

with open('factura.html', 'w') as f:
    f.write(js)
