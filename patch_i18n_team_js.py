import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

es_vars = [
    '"team_no_emp": "Aún no tienes empleados registrados.",', '"team_active": "ACTIVO",', '"team_off": "OFF",',
    '"team_edit": "Editar",', '"team_disable": "Deshabilitar",', '"team_enable": "Habilitar",',
    '"team_err_user": "Usuario requerido.",', '"team_err_pwd": "Contraseña requerida.",',
    '"team_err_exists": "Ese usuario ya existe.",', '"team_created": "Empleado creado.",',
    '"team_not_exist": "No existe el empleado.",', '"team_not_auth": "No autorizado.",',
    '"team_updated": "Empleado actualizado.",'
]
en_vars = [
    '"team_no_emp": "You have no registered employees yet.",', '"team_active": "ACTIVE",', '"team_off": "OFF",',
    '"team_edit": "Edit",', '"team_disable": "Disable",', '"team_enable": "Enable",',
    '"team_err_user": "User required.",', '"team_err_pwd": "Password required.",',
    '"team_err_exists": "User already exists.",', '"team_created": "Employee created.",',
    '"team_not_exist": "Employee does not exist.",', '"team_not_auth": "Unauthorized.",',
    '"team_updated": "Employee updated.",'
]
zh_vars = [
    '"team_no_emp": "您还没有注册员工。",', '"team_active": "积极",', '"team_off": "关闭",',
    '"team_edit": "编辑",', '"team_disable": "停用",', '"team_enable": "启用",',
    '"team_err_user": "需要用户。",', '"team_err_pwd": "需要密码。",',
    '"team_err_exists": "用户已存在。",', '"team_created": "员工已创建。",',
    '"team_not_exist": "员工不存在。",', '"team_not_auth": "未授权。",',
    '"team_updated": "员工已更新。",'
]
ru_vars = [
    '"team_no_emp": "У вас пока нет зарегистрированных сотрудников.",', '"team_active": "АКТИВНЫЙ",', '"team_off": "ВЫКЛ",',
    '"team_edit": "Редактировать",', '"team_disable": "Отключить",', '"team_enable": "Включить",',
    '"team_err_user": "Требуется пользователь.",', '"team_err_pwd": "Требуется пароль.",',
    '"team_err_exists": "Пользователь уже существует.",', '"team_created": "Сотрудник создан.",',
    '"team_not_exist": "Сотрудник не существует.",', '"team_not_auth": "Не авторизован.",',
    '"team_updated": "Сотрудник обновлен.",'
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
