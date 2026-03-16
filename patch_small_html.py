import re

def update_file(filename, replacements):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = re.sub(old, new, content)
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

checkout_reps = [
    (r'>Volver al agente<', r' data-i18n="checkout_back_agent">Volver al agente<'),
    (r'<span id="btnLabel">Pagar ahora</span>', r'<span id="btnLabel" data-i18n="checkout_pay_now">Pagar ahora</span>'),
    (r'<button type="button" class="btn" id="recConfirm">Confirmar</button>', r'<button type="button" class="btn" id="recConfirm" data-i18n="common_confirm">Confirmar</button>'),
    (r'<button id="closeDelivery" class="btn secondary ml-8">Cerrar</button>', r'<button id="closeDelivery" class="btn secondary ml-8" data-i18n="common_close">Cerrar</button>'),
    (r'placeholder="Nombre Apellido"', r'placeholder="Nombre Apellido" data-i18n="checkout_ph_name"'),
    (r'placeholder="\+593 9XXXXXXXX"', r'placeholder="+593 9XXXXXXXX" data-i18n="checkout_ph_phone"'),
    (r'placeholder="Cédula / ID"', r'placeholder="Cédula / ID" data-i18n="checkout_ph_id"'),
    (r'btnLabel\.textContent = \'Pagar ahora\';', r'btnLabel.textContent = window.I18N && window.I18N.getDict() ? window.I18N.getDict().checkout_pay_now : "Pagar ahora";'),
    (r'text\.textContent = \'Procesando…\';', r'text.textContent = window.I18N && window.I18N.getDict() ? window.I18N.getDict().checkout_processing : "Procesando…";'),
    (r'> Procesando<', r' data-i18n="checkout_processing"> Procesando<'),
    (r"showMessage\(\{ type: 'error', text: 'Selecciona un método de pago antes de continuar\.' \}\);", 
     r"showMessage({ type: 'error', text: window.I18N && window.I18N.getDict() ? window.I18N.getDict().checkout_err_method : 'Selecciona un método de pago antes de continuar.' });")
]

update_file('checkout.html', checkout_reps)

setup_reps = [
    (r'>Aplicar<', r' data-i18n="setup_btn_apply">Aplicar<'),
    (r'>Resetear<', r' data-i18n="setup_btn_reset">Resetear<'),
    (r'>Importar<', r' data-i18n="setup_btn_import">Importar<'),
    (r'>Borrar Locales<', r' data-i18n="setup_btn_clear">Borrar Locales<'),
    (r"alert\('Datos de cuenta guardados con éxito'\);", r"alert(window.I18N && window.I18N.getDict() ? window.I18N.getDict().setup_msg_success : 'Datos de cuenta guardados con éxito');")
]

update_file('setup.html', setup_reps)

cashout_reps = [
    (r'placeholder="Nombre completo"', r'placeholder="Nombre completo" data-i18n="cashout_ph_name"'),
    (r'>MAX<', r' data-i18n="cashout_btn_max">MAX<')
]

update_file('agents/cashout.html', cashout_reps)

print("Applied quick HTML patches.")
