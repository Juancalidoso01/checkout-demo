import re

with open('checkout.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Make sure window.I18N gets loaded before we use it early, or better just use data attributes where possible properly.
# `updateSimSteps` and other generic strings in JS:
c = c.replace("' ERROR: ' + ", "(window.I18N && window.I18N.getDict() ? window.I18N.getDict().common_error : 'ERROR: ') + ")
c = c.replace("'Comprobante enviado. Gracias por tu pago.'", "window.I18N && window.I18N.getDict() ? window.I18N.getDict().checkout_receipt_sent : 'Comprobante enviado. Gracias por tu pago.'")

with open('checkout.html', 'w', encoding='utf-8') as f:
    f.write(c)

with open('i18n.js', 'r', encoding='utf-8') as f:
    i18n_c = f.read()
def insert_lang2(code, keys):
    global i18n_c
    import re
    pattern = r'("' + code + r'": \{)'
    match = re.search(pattern, i18n_c)
    if match:
        idx = match.end()
        extra = "\n    " + "\n    ".join(keys) + "\n"
        i18n_c = i18n_c[:idx] + extra + i18n_c[idx:]

insert_lang2('es', [
    '"common_error": "ERROR: ",',
    '"checkout_receipt_sent": "Comprobante enviado. Gracias por tu pago.",'
])
insert_lang2('zh', [
    '"common_error": "错误： ",',
    '"checkout_receipt_sent": "凭证已发送。感谢您的付款。",'
])

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n_c)

print("Add generic error handlers.")
