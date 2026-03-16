import os

with open('i18n.js', 'r') as f:
    js = f.read()

new_es = """
    "cashout_link_card": "Vincular tarjeta",
    "common_back": "Volver",
    "common_logout": "Salir", 
    "common_session": "Sesión",
    "invoice_load_last": "Cargar última operación",
    "invoice_clear": "Limpiar",
    "invoice_subtitle": "Confirma los datos del cliente para compartir el recibo.",
    "invoice_label_name": "Nombre (opcional)",
    "invoice_ph_name": "Ej: Juan Pérez",
    "invoice_label_id": "Documento / ID (opcional)",
    "invoice_ph_id": "Ej: 8-888-888",
    "invoice_label_wa": "WhatsApp (tel con país)",
    "invoice_ph_wa": "50760000000",
    "invoice_help_wa": "Formato sin espacios. Ej: 50760000000",
    "invoice_label_email": "Correo electrónico",
    "invoice_ph_email": "cliente@correo.com",
    "invoice_label_tg": "Telegram (usuario o número)",
    "invoice_ph_tg": "@usuario o 50760000000",
    "invoice_label_msg": "Mensaje (editable)",
    "invoice_ph_msg": "Mensaje para el cliente...",
    "invoice_preview_title": "Vista previa",
    "invoice_preview_desc": "Así verá el recibo el cliente (texto).",
    "invoice_preview_disclaimer": "Este demo abre apps/enlaces para compartir. En producción, esto saldría de un backend con envío real.",
    "invoice_demo_footer": "Demo — Los datos se guardan en localStorage. Fuente de operaciones: sandbox pp_agent_sandbox_v1."
"""

new_en = """
    "cashout_link_card": "Link card",
    "common_back": "Back",
    "common_logout": "Logout",
    "common_session": "Session",
    "invoice_load_last": "Load last operation",
    "invoice_clear": "Clear",
    "invoice_subtitle": "Confirm customer details to share the receipt.",
    "invoice_label_name": "Name (optional)",
    "invoice_ph_name": "Ex: John Doe",
    "invoice_label_id": "Document / ID (optional)",
    "invoice_ph_id": "Ex: 8-888-888",
    "invoice_label_wa": "WhatsApp (phone with code)",
    "invoice_ph_wa": "50760000000",
    "invoice_help_wa": "Format without spaces. Ex: 50760000000",
    "invoice_label_email": "Email",
    "invoice_ph_email": "customer@email.com",
    "invoice_label_tg": "Telegram (user or number)",
    "invoice_ph_tg": "@user or 50760000000",
    "invoice_label_msg": "Message (editable)",
    "invoice_ph_msg": "Message for the customer...",
    "invoice_preview_title": "Preview",
    "invoice_preview_desc": "This is how the customer will see the receipt (text).",
    "invoice_preview_disclaimer": "This demo opens apps/links to share. In production, this would come from a backend with real delivery.",
    "invoice_demo_footer": "Demo — Data is saved in localStorage. Operations source: sandbox pp_agent_sandbox_v1."
"""

new_ru = """
    "cashout_link_card": "Привязать карту",
    "common_back": "Назад",
    "common_logout": "Выйти",
    "common_session": "Сессия",
    "invoice_load_last": "Загрузить последнюю операцию",
    "invoice_clear": "Очистить",
    "invoice_subtitle": "Подтвердите данные клиента для отправки чека.",
    "invoice_label_name": "Имя (необязательно)",
    "invoice_ph_name": "Напр: Иван Иванов",
    "invoice_label_id": "Документ / ID (необязательно)",
    "invoice_ph_id": "Напр: 8-888-888",
    "invoice_label_wa": "WhatsApp (номер с кодом)",
    "invoice_ph_wa": "50760000000",
    "invoice_help_wa": "Формат без пробелов. Напр: 50760000000",
    "invoice_label_email": "Электронная почта",
    "invoice_ph_email": "client@email.com",
    "invoice_label_tg": "Telegram (имя пользователя или номер)",
    "invoice_ph_tg": "@user или 50760000000",
    "invoice_label_msg": "Сообщение (редактируемое)",
    "invoice_ph_msg": "Сообщение для клиента...",
    "invoice_preview_title": "Предпросмотр",
    "invoice_preview_desc": "Так клиент увидит чек (текст).",
    "invoice_preview_disclaimer": "Это демо-версия открывает приложения/ссылки для обмена. В реальной среде это будет отправляться с сервера.",
    "invoice_demo_footer": "Демо — Данные сохраняются в localStorage. Источник операций: песочница pp_agent_sandbox_v1."
"""

new_zh = """
    "cashout_link_card": "绑定卡",
    "common_back": "返回",
    "common_logout": "退出",
    "common_session": "会话",
    "invoice_load_last": "加载最后一次操作",
    "invoice_clear": "清除",
    "invoice_subtitle": "确认客户详细信息以分享收据。",
    "invoice_label_name": "姓名（可选）",
    "invoice_ph_name": "例：John Doe",
    "invoice_label_id": "证件 / ID（可选）",
    "invoice_ph_id": "例：8-888-888",
    "invoice_label_wa": "WhatsApp（带区号的电话）",
    "invoice_ph_wa": "50760000000",
    "invoice_help_wa": "无空格格式。例：50760000000",
    "invoice_label_email": "电子邮件",
    "invoice_ph_email": "customer@email.com",
    "invoice_label_tg": "Telegram（用户名或号码）",
    "invoice_ph_tg": "@user 或 50760000000",
    "invoice_label_msg": "消息（可编辑）",
    "invoice_ph_msg": "给客户的消息...",
    "invoice_preview_title": "预览",
    "invoice_preview_desc": "这是客户将看到的收据（文本）。",
    "invoice_preview_disclaimer": "此演示会打开应用/链接进行分享。在生产环境中，这会来自后端的真实发送。",
    "invoice_demo_footer": "演示 — 数据保存在 localStorage 中。操作来源：沙盒 pp_agent_sandbox_v1。"
"""

js = js.replace('"cashout_link_card": "Vincular tarjeta"', new_es)
js = js.replace('"cashout_link_card": "Link card"', new_en)
js = js.replace('"cashout_link_card": "Привязать карту"', new_ru)
js = js.replace('"cashout_link_card": "绑定卡"', new_zh)

with open('i18n.js', 'w') as f:
    f.write(js)

