import re

def update_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Add script if not there
    if '../i18n.js' not in content:
        content = content.replace('</body>', '  <script src="../i18n.js"></script>\n</body>')

    # Replacements for cashout
    content = content.replace('<h1 class="text-2xl font-extrabold pp-type text-gray-900 tracking-tight">Retiro de fondos</h1>',
                              '<h1 class="text-2xl font-extrabold pp-type text-gray-900 tracking-tight" data-i18n="cashout_title">Retiro de fondos</h1>')
    content = content.replace('<span class="text-gray-500 font-medium">Fondos Disponibles</span>',
                              '<span class="text-gray-500 font-medium" data-i18n="cashout_available_funds">Fondos Disponibles</span>')
    content = content.replace('<h2 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Monto a retirar</h2>',
                              '<h2 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3" data-i18n="cashout_withdraw">Monto a retirar</h2>')
    content = content.replace('<button type="button" class="w-full btn-primary font-bold py-4 rounded-xl shadow-lg mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">',
                              '<button type="button" class="w-full btn-primary font-bold py-4 rounded-xl shadow-lg mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0" data-i18n="cashout_transfer_funds">')
    content = content.replace('<h2 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Cuenta de destino</h2>',
                              '<h2 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3" data-i18n="cashout_destination_account">Cuenta de destino</h2>')


    # Replacements for recharge
    content = content.replace('<h1 class="text-2xl font-extrabold pp-type text-gray-900 tracking-tight">Recargas y Pagos</h1>',
                              '<h1 class="text-2xl font-extrabold pp-type text-gray-900 tracking-tight" data-i18n="recharge_title">Recargas y Pagos</h1>')
    content = content.replace('<h2 class="text-lg font-bold pp-type mb-1 text-gray-900">Recarga digital</h2>',
                              '<h2 class="text-lg font-bold pp-type mb-1 text-gray-900" data-i18n="recharge_digital">Recarga digital</h2>')

    with open(filename, 'w') as f:
        f.write(content)

update_file('agents/cashout.html')
update_file('agents/recharge.html')
