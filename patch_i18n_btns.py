with open('i18n.js', 'r') as f:
    js = f.read()

# Add a comma and new entries just before the closing bracket of each lang
# Since I know the last element is "invoice_demo_footer", I will replace it in each language

es = '"invoice_demo_footer": "Demo — Los datos se guardan en localStorage. Fuente de operaciones: sandbox pp_agent_sandbox_v1.",\n    "invoice_btn_wa": "WhatsApp",\n    "invoice_btn_tg": "Telegram",\n    "invoice_btn_email": "Correo"'
en = '"invoice_demo_footer": "Demo — Data is saved in localStorage. Operations source: sandbox pp_agent_sandbox_v1.",\n    "invoice_btn_wa": "WhatsApp",\n    "invoice_btn_tg": "Telegram",\n    "invoice_btn_email": "Email"'
ru = '"invoice_demo_footer": "Демо — Данные сохраняются в localStorage. Источник операций: песочница pp_agent_sandbox_v1.",\n    "invoice_btn_wa": "WhatsApp",\n    "invoice_btn_tg": "Telegram",\n    "invoice_btn_email": "Эл. почта"'
zh = '"invoice_demo_footer": "演示 — 数据保存在 localStorage 中。操作来源：沙盒 pp_agent_sandbox_v1。",\n    "invoice_btn_wa": "WhatsApp",\n    "invoice_btn_tg": "Telegram",\n    "invoice_btn_email": "电邮"'

js = js.replace('"invoice_demo_footer": "Demo — Los datos se guardan en localStorage. Fuente de operaciones: sandbox pp_agent_sandbox_v1."', es)
js = js.replace('"invoice_demo_footer": "Demo — Data is saved in localStorage. Operations source: sandbox pp_agent_sandbox_v1."', en)
js = js.replace('"invoice_demo_footer": "Демо — Данные сохраняются в localStorage. Источник операций: песочница pp_agent_sandbox_v1."', ru)
js = js.replace('"invoice_demo_footer": "演示 — 数据保存在 localStorage 中。操作来源：沙盒 pp_agent_sandbox_v1。"', zh)

with open('i18n.js', 'w') as f:
    f.write(js)
