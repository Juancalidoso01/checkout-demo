import json

with open('i18n.js', 'r') as f:
    content = f.read()

# I will just write a python string replacement for agents/cashout.html
with open('agents/cashout.html', 'r') as f:
    html = f.read()

# Add i18n tags
html = html.replace('Ganancias por comisiones (Mes):', '<span data-i18n="cashout_profit_label">Ganancias por comisiones (Mes):</span>')
html = html.replace('<h2 class="text-lg font-bold">Cuenta de destino</h2>', '<h2 class="text-lg font-bold" data-i18n="cashout_target_account">Cuenta de destino</h2>')
html = html.replace('Elige un método para retirar tus ganancias y saldo a favor.', '<span data-i18n="cashout_choose_method">Elige un método para retirar tus ganancias y saldo a favor.</span>')
html = html.replace(' Tarjeta Punto Pago', ' <span data-i18n="cashout_pp_card">Tarjeta Punto Pago</span>')
html = html.replace('>Cambiar<', ' data-i18n="cashout_change_method">Cambiar<')
html = html.replace('Retiros ACH toman de 24 a 48 hs hábiles.', '<span data-i18n="cashout_ach_info">Retiros ACH toman de 24 a 48 hs hábiles.</span>')
html = html.replace('<h3 class="text-xl font-extrabold">Datos Bancarios</h3>', '<h3 class="text-xl font-extrabold" data-i18n="cashout_bank_data">Datos Bancarios</h3>')
html = html.replace('Seleccione banco...', '<option value="" data-i18n="cashout_select_bank">Seleccione banco...</option>')
html = html.replace('<label class="block text-sm font-bold text-gray-700 mb-1.5">Tipo de cuenta</label>', '<label class="block text-sm font-bold text-gray-700 mb-1.5" data-i18n="cashout_account_type">Tipo de cuenta</label>')
html = html.replace('<span class="font-semibold text-gray-700">Ahorros</span>', '<span class="font-semibold text-gray-700" data-i18n="cashout_savings">Ahorros</span>')
html = html.replace('<span class="font-semibold text-gray-700">Corriente</span>', '<span class="font-semibold text-gray-700" data-i18n="cashout_checking">Corriente</span>')
html = html.replace('<label class="block text-sm font-bold text-gray-700 mb-1.5">Número de cuenta</label>', '<label class="block text-sm font-bold text-gray-700 mb-1.5" data-i18n="cashout_account_number">Número de cuenta</label>')
html = html.replace('<label class="block text-sm font-bold text-gray-700 mb-1.5">Titular de la cuenta</label>', '<label class="block text-sm font-bold text-gray-700 mb-1.5" data-i18n="cashout_account_owner">Titular de la cuenta</label>')
html = html.replace('Guardar cuenta', '<span data-i18n="cashout_save_account">Guardar cuenta</span>')
html = html.replace('<label class="block text-sm font-bold text-gray-700 mb-1.5">Número de tarjeta</label>', '<label class="block text-sm font-bold text-gray-700 mb-1.5" data-i18n="cashout_card_number">Número de tarjeta</label>')
html = html.replace('<label class="block text-sm font-bold text-gray-700 mb-1.5">Nombre en la tarjeta</label>', '<label class="block text-sm font-bold text-gray-700 mb-1.5" data-i18n="cashout_card_name">Nombre en la tarjeta</label>')
html = html.replace('<label class="block text-sm font-bold text-gray-700 mb-1.5">Vencimiento', '<label class="block text-sm font-bold text-gray-700 mb-1.5" data-i18n="cashout_card_expiry">Vencimiento')
html = html.replace('Vincular tarjeta', '<span data-i18n="cashout_link_card">Vincular tarjeta</span>')

with open('agents/cashout.html', 'w') as f:
    f.write(html)

