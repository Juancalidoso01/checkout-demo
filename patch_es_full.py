import re
with open('i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()
es_vars = [
    '"login_header": "Acceso",',
    '"login_demo_badge": "Demo de banca en línea (roles)",',
    '"login_title": "Iniciar sesión",',
    '"login_subtitle": "Ingresa tus credenciales para continuar.",',
    '"login_lbl_user": "Usuario",',
    '"login_lbl_pwd": "Contraseña",',
    '"login_btn_enter": "Entrar",',
    '"login_demo_users": "Usuarios demo",',
    '"login_err_invalid": "Usuario o contraseña inválidos.",',
    '"login_err_disabled": "Usuario deshabilitado.",',
    '"login_err_generic": "No fue posible iniciar sesión.",',

    '"entry_header": "Inicia tu pago",',
    '"entry_desc": "Elige el tipo de flujo desde donde se inicia el pago. Esto es solo un selector conceptual; al elegir se abrirá el checkout.",',
    '"entry_kiosk": "Kioscos / Punto físico",',
    '"entry_kiosk_desc": "Flujos iniciados desde terminales, kioscos o puntos de venta.",',
    '"entry_qr": "Recarga / QR",',
    '"entry_qr_desc": "Recargas rápidas y flujos desde un QR o lectura de tarjeta.",',
    '"entry_web": "E-commerce / Web",',
    '"entry_web_desc": "Checkout integrado en tiendas online o páginas web.",',
    '"entry_agent": "Módulo Agente",',
    '"entry_agent_desc": "Ver saldo, cobrar servicios, ver ganancias y el histórico transaccional.",',
    '"entry_footer": "Puedes volver al checkout principal directamente en ",',

    '"index_redirect": "Si no eres redirigido automáticamente, ",',
    '"index_click_here": "haz clic aquí para abrir el demo",',

    '"agent_module": "Módulo Agente",',
    '"agent_module_desc": "Panel de pruebas: saldo, cobros, ganancias y historial. Este demo usa almacenamiento local para simular estado.",',
    '"agent_module_desc_dev": "Esta versión es la copia de trabajo del módulo de agente para desarrollo.",',
    '"agent_balance": "Saldo",',
    '"agent_balance_desc": "Saldo disponible para pagar servicios o retirar",',
    '"agent_btn_recharge": "Recargar saldo (demo)",',
    '"agent_btn_recharge_portal": "Recargar",',
    '"agent_services": "Servicios disponibles",',
    '"agent_dashboard": "Dashboard",',
    '"agent_dash_desc": "Ganancias acumuladas y métricas rápidas",',
    '"agent_total_gain": "Ganancia total (demo)",',
    '"agent_tx_count": "Transacciones",',
    '"agent_history": "Histórico",',
    '"agent_history_desc": "Últimas transacciones",',
    '"agent_th_date": "Fecha",',
    '"agent_th_type": "Tipo",',
    '"agent_th_details": "Detalles",',
    '"agent_th_amount": "Monto",',
    '"agent_btn_pay": "Pagar",'
]
pattern = r'("es": \{)'
match = re.search(pattern, content)
if match:
    idx = match.end()
    extra = "\n    " + "\n    ".join(es_vars) + "\n"
    content = content[:idx] + extra + content[idx:]
    with open('i18n.js', 'w', encoding='utf-8') as f:
        f.write(content)
