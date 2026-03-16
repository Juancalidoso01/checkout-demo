import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

es_vars = [
    '"setup_info_personal": "Información personal",', '"setup_info_sub": "Nombre, teléfono, email, ID",',
    '"setup_fullname": "Nombre completo",', '"setup_id": "Cédula / ID",', '"setup_email": "Correo electrónico",',
    '"setup_phone": "Teléfono",', '"setup_save": "Guardar datos",', '"setup_doc_verify": "Documento de identidad / verificación",',
    '"setup_address": "Dirección registrada",', '"setup_contact_method": "Método de contacto preferido",',
    '"setup_change_pwd": "Cambiar contraseña",', '"setup_2fa": "Autenticación en dos factores (2FA)",',
    '"setup_biometrics": "Biometría (Face ID / Huella)",', '"setup_security_history": "Actividad e historial de seguridad",',
    '"setup_close_sessions": "Cerrar sesiones activas",', '"setup_language": "Idioma",', '"setup_currency": "Moneda",',
    '"setup_theme": "Tema (Modo oscuro / claro)",', '"setup_theme_system": "Sistema",', '"setup_region": "Región o país",',
    '"setup_region_panama": "Panamá",', '"setup_storage": "4. Almacenamiento",', '"setup_storage_sandbox": "Datos guardados (Sandbox)",',
    '"setup_storage_reset": "Restablecer y borrar todo",', '"setup_reset_msg": "Se han borrado los datos del sandbox agente.",',
    '"setup_reset_confirm": "¿Seguro que deseas borrar tus datos locales? Esto reiniciará tus saldos y configuraciones.",'
]

en_vars = [
    '"setup_info_personal": "Personal information",', '"setup_info_sub": "Name, phone, email, ID",',
    '"setup_fullname": "Full name",', '"setup_id": "ID Document",', '"setup_email": "Email",',
    '"setup_phone": "Phone",', '"setup_save": "Save data",', '"setup_doc_verify": "Identity document / verification",',
    '"setup_address": "Registered address",', '"setup_contact_method": "Preferred contact method",',
    '"setup_change_pwd": "Change password",', '"setup_2fa": "Two-factor authentication (2FA)",',
    '"setup_biometrics": "Biometrics (Face ID / Fingerprint)",', '"setup_security_history": "Activity and security history",',
    '"setup_close_sessions": "Close active sessions",', '"setup_language": "Language",', '"setup_currency": "Currency",',
    '"setup_theme": "Theme (Dark / Light mode)",', '"setup_theme_system": "System",', '"setup_region": "Region or country",',
    '"setup_region_panama": "Panama",', '"setup_storage": "4. Storage",', '"setup_storage_sandbox": "Saved data (Sandbox)",',
    '"setup_storage_reset": "Reset and clear all",', '"setup_reset_msg": "Agent sandbox data has been cleared.",',
    '"setup_reset_confirm": "Are you sure you want to clear your local data? This will reset your balances and settings.",'
]

zh_vars = [
    '"setup_info_personal": "个人信息",', '"setup_info_sub": "姓名，电话，电子邮件，ID",',
    '"setup_fullname": "全名",', '"setup_id": "身份证",', '"setup_email": "电子邮件",',
    '"setup_phone": "电话",', '"setup_save": "保存数据",', '"setup_doc_verify": "身份证明/验证",',
    '"setup_address": "注册地址",', '"setup_contact_method": "首选联系方式",',
    '"setup_change_pwd": "更改密码",', '"setup_2fa": "双因素身份验证 (2FA)",',
    '"setup_biometrics": "生物识别 (Face ID / 指纹)",', '"setup_security_history": "活动和安全历史",',
    '"setup_close_sessions": "关闭活动会话",', '"setup_language": "语言",', '"setup_currency": "货币",',
    '"setup_theme": "主题 (深色 / 浅色模式)",', '"setup_theme_system": "系统",', '"setup_region": "地区或国家",',
    '"setup_region_panama": "巴拿马",', '"setup_storage": "4. 存储",', '"setup_storage_sandbox": "保存的数据 (Sandbox)",',
    '"setup_storage_reset": "重置并清除所有内容",', '"setup_reset_msg": "代理沙盒数据已被清除。",',
    '"setup_reset_confirm": "您确定要清除本地数据吗？这将重置您的余额和设置。",'
]

ru_vars = [
    '"setup_info_personal": "Личная информация",', '"setup_info_sub": "Имя, телефон, эл. почта, ID",',
    '"setup_fullname": "Полное имя",', '"setup_id": "Удостоверение личности",', '"setup_email": "Электронная почта",',
    '"setup_phone": "Телефон",', '"setup_save": "Сохранить данные",', '"setup_doc_verify": "Документ, удостоверяющий личность / проверка",',
    '"setup_address": "Зарегистрированный адрес",', '"setup_contact_method": "Предпочтительный способ связи",',
    '"setup_change_pwd": "Изменить пароль",', '"setup_2fa": "Двухфакторная аутентификация (2FA)",',
    '"setup_biometrics": "Биометрия (Face ID / Отпечаток пальца)",', '"setup_security_history": "История активности и безопасности",',
    '"setup_close_sessions": "Закрыть активные сеансы",', '"setup_language": "Язык",', '"setup_currency": "Валюта",',
    '"setup_theme": "Тема (Темный / Светлый режим)",', '"setup_theme_system": "Система",', '"setup_region": "Регион или страна",',
    '"setup_region_panama": "Панама",', '"setup_storage": "4. Хранилище",', '"setup_storage_sandbox": "Сохраненные данные (Sandbox)",',
    '"setup_storage_reset": "Сбросить и очистить все",', '"setup_reset_msg": "Данные песочницы агента были очищены.",',
    '"setup_reset_confirm": "Вы уверены, что хотите очистить локальные данные? Это сбросит ваши балансы и настройки.",'
]

def insert_lang(code, block):
    global content
    lang_match = re.search(r'' + code + ':\s*\{([^}]*)\}', content)
    if lang_match:
        inner = lang_match.group(1)
        newlines = "\\n      " + "\\n      ".join(block) + "\\n      "
        new_inner = newlines + inner.strip()
        replaced = "  " + code + ": {\n      " + new_inner + "\n    }"
        content = content[:lang_match.start()] + replaced + content[lang_match.end():]

insert_lang('es', es_vars)
insert_lang('en', en_vars)
insert_lang('zh', zh_vars)
insert_lang('ru', ru_vars)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)

