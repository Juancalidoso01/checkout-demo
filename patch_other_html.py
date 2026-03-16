import re

def update_file(filename, replacements, needs_script=True):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        if new is not None:
            content = content.replace(old, new)
        
    if needs_script and 'i18n.js' not in content:
        script_tag = '  <script src="i18n.js?v=7"></script>\n</body>'
        if 'agents/' in filename:
            script_tag = '  <script src="../i18n.js?v=7"></script>\n</body>'
                
        content = content.replace('</body>', script_tag)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

login_replacements = [
    ('>Acceso<', ' data-i18n="login_header">Acceso<'),
    ('>Demo de banca en línea (roles)<', ' data-i18n="login_demo_badge">Demo de banca en línea (roles)<'),
    ('Iniciar sesión</h1>', 'Iniciar sesión</h1>'),
    ('<h1 class="text-2xl font-extrabold pp-type">Iniciar sesión</h1>', '<h1 class="text-2xl font-extrabold pp-type" data-i18n="login_title">Iniciar sesión</h1>'),
    ('>Ingresa tus credenciales para continuar.<', ' data-i18n="login_subtitle">Ingresa tus credenciales para continuar.<'),
    ('<label class="pp-label">Usuario</label>', '<label class="pp-label" data-i18n="login_lbl_user">Usuario</label>'),
    ('<label class="pp-label">Contraseña</label>', '<label class="pp-label" data-i18n="login_lbl_pwd">Contraseña</label>'),
    ('>Entrar<', ' data-i18n="login_btn_enter">Entrar<'),
    ('>Usuarios demo<', ' data-i18n="login_demo_users">Usuarios demo<'),
    ("'No fue posible iniciar sesión.'", "window.I18N ? window.I18N.getDict().login_err_generic : 'No fue posible iniciar sesión.'")
]
update_file('login.html', login_replacements)

entry_replacements = [
    ('<h1>Inicia tu pago</h1>', '<h1 data-i18n="entry_header">Inicia tu pago</h1>'),
    ('>Elige el tipo de flujo desde donde se inicia el pago. Esto es solo un selector conceptual; al elegir se abrirá el checkout.<', ' data-i18n="entry_desc">Elige el tipo de flujo desde donde se inicia el pago. Esto es solo un selector conceptual; al elegir se abrirá el checkout.<'),
    ('<div class="title">Kioscos / Punto físico</div>', '<div class="title" data-i18n="entry_kiosk">Kioscos / Punto físico</div>'),
    ('>Flujos iniciados desde terminales, kioscos o puntos de venta.<', ' data-i18n="entry_kiosk_desc">Flujos iniciados desde terminales, kioscos o puntos de venta.<'),
    ('<div class="title">Recarga / QR</div>', '<div class="title" data-i18n="entry_qr">Recarga / QR</div>'),
    ('>Recargas rápidas y flujos desde un QR o lectura de tarjeta.<', ' data-i18n="entry_qr_desc">Recargas rápidas y flujos desde un QR o lectura de tarjeta.<'),
    ('<div class="title">E-commerce / Web</div>', '<div class="title" data-i18n="entry_web">E-commerce / Web</div>'),
    ('>Checkout integrado en tiendas online o páginas web.<', ' data-i18n="entry_web_desc">Checkout integrado en tiendas online o páginas web.<'),
    ('<div class="title">Módulo Agente</div>', '<div class="title" data-i18n="entry_agent">Módulo Agente</div>'),
    ('>Ver saldo, cobrar servicios, ver ganancias y el histórico transaccional.<', ' data-i18n="entry_agent_desc">Ver saldo, cobrar servicios, ver ganancias y el histórico transaccional.<'),
    ('>Puedes volver al checkout principal directamente en ', ' data-i18n="entry_footer">Puedes volver al checkout principal directamente en ')
]
update_file('entry.html', entry_replacements)

agent_replacements = [
    ('<h1>Módulo Agente</h1>', '<h1 data-i18n="agent_module">Módulo Agente</h1>'),
    ('<h1>Sandbox Agente</h1>', '<h1 data-i18n="agent_module">Sandbox Agente</h1>'),
    ('>Panel de pruebas: saldo, cobros, ganancias y historial. Este demo usa almacenamiento local para simular estado.<', ' data-i18n="agent_module_desc">Panel de pruebas: saldo, cobros, ganancias y historial. Este demo usa almacenamiento local para simular estado.<'),
    ('>Esta versión es la copia de trabajo del módulo de agente para desarrollo. Puedes editar este archivo y ver cambios directamente en /agents/.<', ' data-i18n="agent_module_desc_dev">Esta versión es la copia de trabajo del módulo de agente para desarrollo. Puedes editar este archivo y ver cambios directamente en /agents/.<'),
    ('<h3>Saldo</h3>', '<h3 data-i18n="agent_balance">Saldo</h3>'),
    ('>Saldo disponible para pagar servicios o retirar<', ' data-i18n="agent_balance_desc">Saldo disponible para pagar servicios o retirar<'),
    ('>Recargar saldo (demo)<', ' data-i18n="agent_btn_recharge">Recargar saldo (demo)<'),
    ('>Recargar<', ' data-i18n="agent_btn_recharge_portal">Recargar<'),
    ('<h3>Servicios disponibles</h3>', '<h3 data-i18n="agent_services">Servicios disponibles</h3>'),
    ('<h3>Dashboard</h3>', '<h3 data-i18n="agent_dashboard">Dashboard</h3>'),
    ('>Ganancias acumuladas y métricas rápidas<', ' data-i18n="agent_dash_desc">Ganancias acumuladas y métricas rápidas<'),
    ('>Ganancia total (demo)<', ' data-i18n="agent_total_gain">Ganancia total (demo)<'),
    ('>Transacciones<', ' data-i18n="agent_tx_count">Transacciones<'),
    ('<h3>Histórico</h3>', '<h3 data-i18n="agent_history">Histórico</h3>'),
    ('>Últimas transacciones<', ' data-i18n="agent_history_desc">Últimas transacciones<'),
    ('<th>Fecha</th>', '<th data-i18n="agent_th_date">Fecha</th>'),
    ('<th>Tipo</th>', '<th data-i18n="agent_th_type">Tipo</th>'),
    ('<th>Detalles</th>', '<th data-i18n="agent_th_details">Detalles</th>'),
    ('<th>Monto</th>', '<th data-i18n="agent_th_amount">Monto</th>'),
    ('>Pagar</button>', ' data-i18n="agent_btn_pay">Pagar</button>')
]
update_file('agent.html', agent_replacements)
update_file('agents/index.html', agent_replacements)

index_replacements = [
    ('>Si no eres redirigido automáticamente, ', ' data-i18n="index_redirect">Si no eres redirigido automáticamente, '),
    ('>haz clic aquí para abrir el demo<', ' data-i18n="index_click_here">haz clic aquí para abrir el demo<')
]
update_file('index.html', index_replacements, needs_script=True)

