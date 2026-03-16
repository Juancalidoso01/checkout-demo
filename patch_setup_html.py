import re

with open('setup.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add placeholders in setup.html
content = content.replace(">Información personal<", " data-i18n=\\'setup_info_personal\\'>Información personal<")
content = content.replace(">Nombre, teléfono, email, ID<", " data-i18n=\\'setup_info_sub\\'>Nombre, teléfono, email, ID<")
content = content.replace(">Nombre completo<", " data-i18n=\\'setup_fullname\\'>Nombre completo<")
content = content.replace(">Cédula / ID<", " data-i18n=\\'setup_id\\'>Cédula / ID<")
content = content.replace(">Correo electrónico<", " data-i18n=\\'setup_email\\'>Correo electrónico<")
content = content.replace(">Teléfono<", " data-i18n=\\'setup_phone\\'>Teléfono<")
content = content.replace(">Guardar datos<", " data-i18n=\\'setup_save\\'>Guardar datos<")

content = content.replace(">Documento de identidad / verificación<", " data-i18n=\\'setup_doc_verify\\'>Documento de identidad / verificación<")
content = content.replace(">Dirección registrada<", " data-i18n=\\'setup_address\\'>Dirección registrada<")
content = content.replace(">Método de contacto preferido<", " data-i18n=\\'setup_contact_method\\'>Método de contacto preferido<")

content = content.replace(">Cambiar contraseña<", " data-i18n=\\'setup_change_pwd\\'>Cambiar contraseña<")
content = content.replace(">Autenticación en dos factores (2FA)<", " data-i18n=\\'setup_2fa\\'>Autenticación en dos factores (2FA)<")
content = content.replace(">Biometría (Face ID / Huella)<", " data-i18n=\\'setup_biometrics\\'>Biometría (Face ID / Huella)<")
content = content.replace(">Actividad e historial de seguridad<", " data-i18n=\\'setup_security_history\\'>Actividad e historial de seguridad<")
content = content.replace(">Cerrar sesiones activas<", " data-i18n=\\'setup_close_sessions\\'>Cerrar sesiones activas<")

content = content.replace(">Idioma<", " data-i18n=\\'setup_language\\'>Idioma<")
content = content.replace(">Moneda<", " data-i18n=\\'setup_currency\\'>Moneda<")
content = content.replace(">Tema (Modo oscuro / claro)<", " data-i18n=\\'setup_theme\\'>Tema (Modo oscuro / claro)<")
content = content.replace(">Sistema<", " data-i18n=\\'setup_theme_system\\'>Sistema<")
content = content.replace(">Región o país<", " data-i18n=\\'setup_region\\'>Región o país<")
content = content.replace(">Panamá<", " data-i18n=\\'setup_region_panama\\'>Panamá<")
content = content.replace(">4. Almacenamiento<", " data-i18n=\\'setup_storage\\'>4. Almacenamiento<")
content = content.replace(">Datos guardados (Sandbox)<", " data-i18n=\\'setup_storage_sandbox\\'>Datos guardados (Sandbox)<")
content = content.replace(">Restablecer y borrar todo<", " data-i18n=\\'setup_storage_reset\\'>Restablecer y borrar todo<")

content = content.replace("Se han borrado los datos del sandbox agente.", "window.I18N ? window.I18N.getDict().setup_reset_msg : 'Se han borrado los datos del sandbox agente.'")
content = content.replace("¿Seguro que deseas borrar tus datos locales? Esto reiniciará tus saldos y configuraciones.", "window.I18N ? window.I18N.getDict().setup_reset_confirm : '¿Seguro que deseas borrar tus datos locales? Esto reiniciará tus saldos y configuraciones.'")

with open('setup.html', 'w', encoding='utf-8') as f:
    f.write(content)

