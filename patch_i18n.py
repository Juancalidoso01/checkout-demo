import re

with open('i18n.js', 'r') as f:
    content = f.read()

new_es = """    "lang_zh": "Chino",
    "settings_title": "Ajustes",
    "settings_account": "Cuenta",
    "settings_security": "Seguridad",
    "settings_preferences": "Preferencias",
    "settings_legal": "Legal",
    "cashout_title": "Retiro de fondos",
    "cashout_available_funds": "Fondos Disponibles",
    "cashout_withdraw": "Monto a retirar",
    "cashout_transfer_funds": "Transferir fondos a mi cuenta",
    "cashout_origin_account": "Cuenta de origen",
    "cashout_destination_account": "Cuenta de destino",
    "recharge_title": "Recargas y Pagos",
    "recharge_digital": "Recarga digital"
"""

new_en = """    "lang_zh": "Chinese",
    "settings_title": "Settings",
    "settings_account": "Account",
    "settings_security": "Security",
    "settings_preferences": "Preferences",
    "settings_legal": "Legal",
    "cashout_title": "Withdraw funds",
    "cashout_available_funds": "Available Funds",
    "cashout_withdraw": "Amount to withdraw",
    "cashout_transfer_funds": "Transfer funds to my account",
    "cashout_origin_account": "Origin account",
    "cashout_destination_account": "Destination account",
    "recharge_title": "Top-ups & Payments",
    "recharge_digital": "Digital Recharge"
"""

new_ru = """    "lang_zh": "Китайский",
    "settings_title": "Настройки",
    "settings_account": "Аккаунт",
    "settings_security": "Безопасность",
    "settings_preferences": "Настройки",
    "settings_legal": "Правовая информация",
    "cashout_title": "Вывод средств",
    "cashout_available_funds": "Доступные средства",
    "cashout_withdraw": "Сумма для вывода",
    "cashout_transfer_funds": "Перевести средства на мой счет",
    "cashout_origin_account": "Очередной счет",
    "cashout_destination_account": "Счет назначения",
    "recharge_title": "Пополнения и Платежи",
    "recharge_digital": "Цифровой Перезарядка"
"""

new_zh = """    "lang_zh": "中文 (Chino)",
    "settings_title": "设置",
    "settings_account": "账户",
    "settings_security": "安全",
    "settings_preferences": "偏好设置",
    "settings_legal": "法律",
    "cashout_title": "提取资金",
    "cashout_available_funds": "可用资金",
    "cashout_withdraw": "提取金额",
    "cashout_transfer_funds": "将资金转入我的账户",
    "cashout_origin_account": "原账户",
    "cashout_destination_account": "目标账户",
    "recharge_title": "充值和付款",
    "recharge_digital": "数字充值"
"""

content = re.sub(r'    "lang_zh": "Chino",\s*"settings_title": "Ajustes",\s*"settings_account": "Cuenta",\s*"settings_security": "Seguridad",\s*"settings_preferences": "Preferencias",\s*"settings_legal": "Legal"', new_es.strip(), content)
content = re.sub(r'    "lang_zh": "Chinese",\s*"settings_title": "Settings",\s*"settings_account": "Account",\s*"settings_security": "Security",\s*"settings_preferences": "Preferences",\s*"settings_legal": "Legal"', new_en.strip(), content)
content = re.sub(r'    "lang_zh": "Китайский",\s*"settings_title": "Настройки",\s*"settings_account": "Аккаунт",\s*"settings_security": "Безопасность",\s*"settings_preferences": "Настройки",\s*"settings_legal": "Правовая информация"', new_ru.strip(), content)
content = re.sub(r'    "lang_zh": "中文 \(Chino\)",\s*"settings_title": "设置",\s*"settings_account": "账户",\s*"settings_security": "安全",\s*"settings_preferences": "偏好设置",\s*"settings_legal": "法律"', new_zh.strip(), content)

with open('i18n.js', 'w') as f:
    f.write(content)
