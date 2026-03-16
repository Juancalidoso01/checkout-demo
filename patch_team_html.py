import re

with open('agents/team.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add script src for i18n
if 'i18n.js' not in content:
    content = content.replace('</body>', '  <script src="../i18n.js?v=6"></script>\n</body>')

# Add data-i18n to tags
content = content.replace('Mi equipo — Empleados', '<span data-i18n="team_title">Mi equipo — Empleados</span>')
content = content.replace('<span class="text-lg md:text-xl font-extrabold tracking-wide uppercase whitespace-nowrap">Mi equipo</span>', '<span class="text-lg md:text-xl font-extrabold tracking-wide uppercase whitespace-nowrap" data-i18n="team_title">Mi equipo</span>')
content = content.replace('>Volver<', ' data-i18n="btn_back">Volver<')
content = content.replace('>Salir<', ' data-i18n="logout">Salir<')
content = content.replace('>Empleados<', ' data-i18n="team_employees">Empleados<')
content = content.replace('Crea y administra empleados asociados a tu cuenta de agente.', '<span data-i18n="team_desc">Crea y administra empleados asociados a tu cuenta de agente.</span>')

content = content.replace('<th class="text-left py-2">Usuario</th>', '<th class="text-left py-2" data-i18n="team_th_user">Usuario</th>')
content = content.replace('<th class="text-left py-2">Nombre</th>', '<th class="text-left py-2" data-i18n="team_th_name">Nombre</th>')
content = content.replace('<th class="text-left py-2">Estado</th>', '<th class="text-left py-2" data-i18n="team_th_status">Estado</th>')
content = content.replace('<th class="text-right py-2">Acciones</th>', '<th class="text-right py-2" data-i18n="team_th_actions">Acciones</th>')

content = content.replace('Nota: demo con', '<span data-i18n="team_note">Nota: demo con</span>')
content = content.replace('Los cambios se reflejan al instante.', '<span data-i18n="team_note_desc">Los cambios se reflejan al instante.</span>')

content = content.replace('Crear / Editar empleado', '<span data-i18n="team_form_title">Crear / Editar empleado</span>')
content = content.replace('Solo usuarios con rol', '<span data-i18n="team_form_desc">Solo usuarios con rol</span>')

content = content.replace('<label class="pp-label">Usuario</label>', '<label class="pp-label" data-i18n="team_lbl_user">Usuario</label>')
content = content.replace('<label class="pp-label">Nombre</label>', '<label class="pp-label" data-i18n="team_lbl_name">Nombre</label>')
content = content.replace('<label class="pp-label">Contraseña</label>', '<label class="pp-label" data-i18n="team_lbl_pwd">Contraseña</label>')

content = content.replace('>Guardar<', ' data-i18n="btn_save">Guardar<')
content = content.replace('>Limpiar<', ' data-i18n="btn_clear">Limpiar<')

with open('agents/team.html', 'w', encoding='utf-8') as f:
    f.write(content)
