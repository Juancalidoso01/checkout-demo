import re

with open('agents/recharge.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Charge modal
content = content.replace("Cobrar servicio", "<span data-i18n=\\'charge_title\\'>Cobrar servicio</span>")
content = content.replace("Cliente:", "<span data-i18n=\\'charge_client\\'>Cliente:</span>")
content = content.replace("Servicio:", "<span data-i18n=\\'charge_service\\'>Servicio:</span>")
content = content.replace("Saldo:", "<span data-i18n=\\'charge_balance\\'>Saldo:</span>")
content = content.replace("Monto a cobrar", "<span data-i18n=\\'charge_amount_label\\'>Monto a cobrar</span>")
content = content.replace("Confirmar cobro", "<span data-i18n=\\'charge_confirm\\'>Confirmar cobro</span>")

# Payment Method Modal
content = content.replace("Método de pago", "<span data-i18n=\\'pay_method_title\\'>Método de pago</span>")
content = content.replace("¿Cómo recibiste el pago?", "<span data-i18n=\\'pay_method_subtitle\\'>¿Cómo recibiste el pago?</span>")
content = content.replace(">Efectivo (recibí dinero)<", " data-i18n=\\'pay_method_cash\\'>Efectivo (recibí dinero)<")
content = content.replace(">Otro medio (tarjeta, Yappy, etc.)<", " data-i18n=\\'pay_method_other\\'>Otro medio (tarjeta, Yappy, etc.)<")

# Receipt Modal
content = content.replace("<h3>Recibo</h3>", "<h3><span data-i18n=\\'receipt_title\\'>Recibo</span></h3>")
content = content.replace(">Imprimir<", " data-i18n=\\'receipt_print\\'>Imprimir<")
content = content.replace("Recibo generado por Punto Pago", "<span data-i18n=\\'receipt_footer\\'>Recibo generado por Punto Pago</span>")

# Comercios Modal
content = content.replace("Menú", "<span data-i18n=\\'menu_title\\'>Menú</span>")
content = content.replace("Personaliza tu terminal y equipo", "<span data-i18n=\\'menu_subtitle\\'>Personaliza tu terminal y equipo</span>")
content = content.replace("Retirar fondos", "<span data-i18n=\\'menu_cashout\\'>Retirar fondos</span>")
content = content.replace("Bancos y ganancias", "<span data-i18n=\\'menu_banks\\'>Bancos y ganancias</span>")
content = content.replace("Setup", "<span data-i18n=\\'menu_setup\\'>Setup</span>")
content = content.replace("Ajustes del comercio", "<span data-i18n=\\'menu_setup_desc\\'>Ajustes del comercio</span>")
content = content.replace("Mi equipo", "<span data-i18n=\\'menu_team\\'>Mi equipo</span>")
content = content.replace("Accesos y roles", "<span data-i18n=\\'menu_team_desc\\'>Accesos y roles</span>")
content = content.replace("Usuarios", "<span data-i18n=\\'menu_team_users\\'>Usuarios</span>")
content = content.replace("Gestiona accesos al portal", "<span data-i18n=\\'menu_team_users_desc\\'>Gestiona accesos al portal</span>")


with open('agents/recharge.html', 'w', encoding='utf-8') as f:
    f.write(content)

