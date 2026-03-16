import json
import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Need to parse the translations dictionary. To make it easier we'll use regex.
team_es = [
    '"team_title": "Mi equipo — Empleados",',
    '"btn_back": "Volver",',
    '"logout": "Salir",',
    '"team_employees": "Empleados",',
    '"team_desc": "Crea y administra empleados asociados a tu cuenta de agente.",',
    '"team_th_user": "Usuario",',
    '"team_th_name": "Nombre",',
    '"team_th_status": "Estado",',
    '"team_th_actions": "Acciones",',
    '"team_note": "Nota: demo con",',
    '"team_note_desc": "Los cambios se reflejan al instante.",',
    '"team_form_title": "Crear / Editar empleado",',
    '"team_form_desc": "Solo usuarios con rol",',
    '"team_lbl_user": "Usuario",',
    '"team_lbl_name": "Nombre",',
    '"team_lbl_pwd": "Contraseña",',
    '"btn_save": "Guardar",',
    '"btn_clear": "Limpiar",'
]
team_en = [
    '"team_title": "My Team — Employees",',
    '"btn_back": "Back",',
    '"logout": "Logout",',
    '"team_employees": "Employees",',
    '"team_desc": "Create and manage employees associated with your agent account.",',
    '"team_th_user": "User",',
    '"team_th_name": "Name",',
    '"team_th_status": "Status",',
    '"team_th_actions": "Actions",',
    '"team_note": "Note: demo with",',
    '"team_note_desc": "Changes reflect instantly.",',
    '"team_form_title": "Create / Edit Employee",',
    '"team_form_desc": "Only users with role",',
    '"team_lbl_user": "User",',
    '"team_lbl_name": "Name",',
    '"team_lbl_pwd": "Password",',
    '"btn_save": "Save",',
    '"btn_clear": "Clear",'
]
team_zh = [
    '"team_title": "我的团队 — 员工",',
    '"btn_back": "返回",',
    '"logout": "登出",',
    '"team_employees": "员工",',
    '"team_desc": "创建和管理与代理帐户关联的员工。",',
    '"team_th_user": "用户",',
    '"team_th_name": "名称",',
    '"team_th_status": "状态",',
    '"team_th_actions": "动作",',
    '"team_note": "注意：演示使用",',
    '"team_note_desc": "更改立即生效。",',
    '"team_form_title": "创建/编辑员工",',
    '"team_form_desc": "仅限具有角色的用户",',
    '"team_lbl_user": "用户",',
    '"team_lbl_name": "名称",',
    '"team_lbl_pwd": "密码",',
    '"btn_save": "保存",',
    '"btn_clear": "清除",'
]
team_ru = [
    '"team_title": "Моя команда — Сотрудники",',
    '"btn_back": "Назад",',
    '"logout": "Выйти",',
    '"team_employees": "Сотрудники",',
    '"team_desc": "Создавайте и управляйте сотрудниками, связанными с вашей учетной записью агента.",',
    '"team_th_user": "Пользователь",',
    '"team_th_name": "Имя",',
    '"team_th_status": "Статус",',
    '"team_th_actions": "Действия",',
    '"team_note": "Примечание: демо с",',
    '"team_note_desc": "Изменения отражаются мгновенно.",',
    '"team_form_title": "Создать / Изменить сотрудника",',
    '"team_form_desc": "Только пользователи с ролью",',
    '"team_lbl_user": "Пользователь",',
    '"team_lbl_name": "Имя",',
    '"team_lbl_pwd": "Пароль",',
    '"btn_save": "Сохранить",',
    '"btn_clear": "Очистить",'
]

def insert_lang(code, block):
    global content
    lang_match = re.search(r'' + code + ':\s*\{([^}]*)\}', content)
    if lang_match:
        inner = lang_match.group(1)
        newlines = "\\n      " + "\\n      ".join(block) + "\\n      "
        # append at beginning of block
        new_inner = newlines + inner.strip()
        replaced = "  " + code + ": {\n      " + new_inner + "\n    }"
        content = content[:lang_match.start()] + replaced + content[lang_match.end():]

insert_lang('es', team_es)
insert_lang('en', team_en)
insert_lang('zh', team_zh)
insert_lang('ru', team_ru)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)

