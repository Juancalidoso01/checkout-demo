import re

with open('agents/team.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace innerHTML assignments that contain strings with text
content = content.replace("Aún no tienes empleados registrados.", '<span data-i18n=\\\'team_no_emp\\\'>Aún no tienes empleados registrados.</span>')
content = content.replace(">ACTIVO<", " data-i18n=\\'team_active\\'>ACTIVO<")
content = content.replace(">OFF<", " data-i18n=\\'team_off\\'>OFF<")
content = content.replace(">Editar<", " data-i18n=\\'team_edit\\'>Editar<")

# For the toggle button, it's dynamic
content = content.replace("${u.active ? 'Deshabilitar' : 'Habilitar'}", "<span data-i18n=\\'${u.active ? 'team_disable' : 'team_enable'}\\'>${u.active ? 'Deshabilitar' : 'Habilitar'}</span>")

# For alerts/messages
content = content.replace("'Usuario requerido.'", "window.I18N ? window.I18N.getDict().team_err_user : 'Usuario requerido.'")
content = content.replace("'Contraseña requerida.'", "window.I18N ? window.I18N.getDict().team_err_pwd : 'Contraseña requerida.'")
content = content.replace("'Ese usuario ya existe.'", "window.I18N ? window.I18N.getDict().team_err_exists : 'Ese usuario ya existe.'")
content = content.replace("'Empleado creado.'", "window.I18N ? window.I18N.getDict().team_created : 'Empleado creado.'")
content = content.replace("'No existe el empleado.'", "window.I18N ? window.I18N.getDict().team_not_exist : 'No existe el empleado.'")
content = content.replace("'No autorizado.'", "window.I18N ? window.I18N.getDict().team_not_auth : 'No autorizado.'")
content = content.replace("'Empleado actualizado.'", "window.I18N ? window.I18N.getDict().team_updated : 'Empleado actualizado.'")

# Also add the customEvent listener in team.html so the innerHTML updates re-run translate!
js_listener = """
      document.addEventListener('languageChanged', (e) => {
        render(); // re-render table to translate pure JS strings
      });
"""
if "document.addEventListener('languageChanged'" not in content:
    content = content.replace("resetForm();\n      render();", js_listener + "\n      resetForm();\n      render();")

with open('agents/team.html', 'w', encoding='utf-8') as f:
    f.write(content)

