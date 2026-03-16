import re

with open('i18n.js', 'r') as f:
    js = f.read()

def inject(lang, additions):
    # match the end of the dictionary for a language
    # find `  },` followed by the next language or end of object
    import re
    # naive replacement: finding the specific end of the block for that lang
    pass

# safer replace:
new_es = """
    "checkout_secure": "Pago seguro y rápido",
    "cashout_profit_label": "Ganancias por comisiones (Mes):",
    "cashout_target_account": "Cuenta de destino",
    "cashout_choose_method": "Elige un método para retirar tus ganancias y saldo a favor.",
    "cashout_pp_card": "Tarjeta Punto Pago",
    "cashout_change_method": "Cambiar",
    "cashout_ach_info": "Retiros ACH toman de 24 a 48 hs hábiles.",
    "cashout_bank_data": "Datos Bancarios",
    "cashout_select_bank": "Seleccione banco...",
    "cashout_account_type": "Tipo de cuenta",
    "cashout_savings": "Ahorros",
    "cashout_checking": "Corriente",
    "cashout_account_number": "Número de cuenta",
    "cashout_account_owner": "Titular de la cuenta",
    "cashout_save_account": "Guardar cuenta",
    "cashout_card_number": "Número de tarjeta",
    "cashout_card_name": "Nombre en la tarjeta",
    "cashout_card_expiry": "Vencimiento",
    "cashout_link_card": "Vincular tarjeta"
"""

new_en = """
    "checkout_secure": "Secure and fast payment",
    "cashout_profit_label": "Commission earnings (Month):",
    "cashout_target_account": "Destination account",
    "cashout_choose_method": "Choose a method to withdraw your earnings and balance.",
    "cashout_pp_card": "Punto Pago Card",
    "cashout_change_method": "Change",
    "cashout_ach_info": "ACH withdrawals take 24 to 48 business hours.",
    "cashout_bank_data": "Bank Information",
    "cashout_select_bank": "Select bank...",
    "cashout_account_type": "Account type",
    "cashout_savings": "Savings",
    "cashout_checking": "Checking",
    "cashout_account_number": "Account number",
    "cashout_account_owner": "Account holder",
    "cashout_save_account": "Save account",
    "cashout_card_number": "Card number",
    "cashout_card_name": "Name on card",
    "cashout_card_expiry": "Expiry",
    "cashout_link_card": "Link card"
"""

new_ru = """
    "checkout_secure": "Безопасная и быстрая оплата",
    "cashout_profit_label": "Комиссионные (Месяц):",
    "cashout_target_account": "Счет назначения",
    "cashout_choose_method": "Выберите метод для вывода ваших заработков и баланса.",
    "cashout_pp_card": "Карта Punto Pago",
    "cashout_change_method": "Изменить",
    "cashout_ach_info": "Вывод средств ACH занимает от 24 до 48 рабочих часов.",
    "cashout_bank_data": "Банковские данные",
    "cashout_select_bank": "Выберите банк...",
    "cashout_account_type": "Тип счета",
    "cashout_savings": "Сберегательный",
    "cashout_checking": "Текущий",
    "cashout_account_number": "Номер счета",
    "cashout_account_owner": "Владелец счета",
    "cashout_save_account": "Сохранить счет",
    "cashout_card_number": "Номер карты",
    "cashout_card_name": "Имя на карте",
    "cashout_card_expiry": "Срок действия",
    "cashout_link_card": "Привязать карту"
"""

new_zh = """
    "checkout_secure": "安全快捷的支付",
    "cashout_profit_label": "佣金收益（月）：",
    "cashout_target_account": "目标账户",
    "cashout_choose_method": "选择一种方式提取您的收益和余额。",
    "cashout_pp_card": "Punto Pago卡",
    "cashout_change_method": "更改",
    "cashout_ach_info": "ACH提款需要24到48个工作小时。",
    "cashout_bank_data": "银行信息",
    "cashout_select_bank": "选择银行...",
    "cashout_account_type": "账户类型",
    "cashout_savings": "储蓄账户",
    "cashout_checking": "支票账户",
    "cashout_account_number": "账号",
    "cashout_account_owner": "账户持有人",
    "cashout_save_account": "保存账户",
    "cashout_card_number": "卡号",
    "cashout_card_name": "卡上的名字",
    "cashout_card_expiry": "到期",
    "cashout_link_card": "绑定卡"
"""

js = js.replace('"checkout_secure": "Pago seguro y rápido" ', new_es)
js = js.replace('"checkout_secure": "Secure and fast payment" ', new_en)
js = js.replace('"checkout_secure": "Безопасная и быстрая оплата" ', new_ru)
js = js.replace('"checkout_secure": "安全快捷的支付" ', new_zh)

with open('i18n.js', 'w') as f:
    f.write(js)
