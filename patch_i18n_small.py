import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    i18n_content = f.read()

es_keys = [
    '"checkout_ph_name": "Nombre Apellido",',
    '"checkout_ph_phone": "+593 9XXXXXXXX",',
    '"checkout_ph_id": "Cédula / ID",',
    '"checkout_ph_tg": "@usuario",',
    '"checkout_ph_email": "tu@correo.com",',
    '"checkout_pay_now": "Pagar ahora",',
    '"checkout_processing": "Procesando\\u2026",',
    '"checkout_back_agent": "Volver al agente",',
    '"checkout_err_method": "Selecciona un método de pago antes de continuar.",',
    '"common_confirm": "Confirmar",',
    '"common_close": "Cerrar",',
    '"setup_btn_apply": "Aplicar",',
    '"setup_btn_reset": "Resetear",',
    '"setup_btn_import": "Importar",',
    '"setup_btn_clear": "Borrar Locales",',
    '"setup_msg_success": "Datos de cuenta guardados con éxito.",',
    '"cashout_ph_name": "Nombre completo",',
    '"cashout_btn_max": "MAX",'
]

zh_keys = [
    '"checkout_ph_name": "名字 姓氏",',
    '"checkout_ph_phone": "+593 9XXXXXXXX",',
    '"checkout_ph_id": "身份证 / ID",',
    '"checkout_ph_tg": "@用户",',
    '"checkout_ph_email": "your@email.com",',
    '"checkout_pay_now": "现在付款",',
    '"checkout_processing": "处理中...",',
    '"checkout_back_agent": "返回代理",',
    '"checkout_err_method": "在继续之前选择一种付款方式。",',
    '"common_confirm": "确认",',
    '"common_close": "关闭",',
    '"setup_btn_apply": "应用",',
    '"setup_btn_reset": "重置",',
    '"setup_btn_import": "进口",',
    '"setup_btn_clear": "清楚的本地",',
    '"setup_msg_success": "帐户数据已成功保存。",',
    '"cashout_ph_name": "全名",',
    '"cashout_btn_max": "最大",'
]

def insert_lang(code, keys):
    global i18n_content
    pattern = r'("' + code + r'": \{)'
    match = re.search(pattern, i18n_content)
    if match:
        idx = match.end()
        extra = "\n    " + "\n    ".join(keys) + "\n"
        i18n_content = i18n_content[:idx] + extra + i18n_content[idx:]

insert_lang('es', es_keys)
insert_lang('zh', zh_keys)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n_content)

print("Added missing strings to i18n.js")
