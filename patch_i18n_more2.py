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
    '"login_err_generic": "No fue posible iniciar sesión.",',

    '"entry_header": "Inicia tu pago",',
    '"entry_desc": "Elige el tipo de flujo desde donde se inicia el pago. Esto es solo un selector conceptual.",',
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
    '"agent_balance_desc": "Saldo disponible para pagar o retirar",',
    '"agent_btn_recharge": "Recargar saldo (demo)",',
    '"agent_btn_recharge_portal": "Recargar",',
    '"agent_services": "Servicios disponibles",',
    '"agent_dashboard": "Dashboard",',
    '"agent_dash_desc": "Ganancias acumuladas",',
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

en_vars = [
    '"login_header": "Access",',
    '"login_demo_badge": "Online Banking Demo (roles)",',
    '"login_title": "Login",',
    '"login_subtitle": "Enter your credentials to continue.",',
    '"login_lbl_user": "User",',
    '"login_lbl_pwd": "Password",',
    '"login_btn_enter": "Enter",',
    '"login_demo_users": "Demo users",',
    '"login_err_generic": "Unable to login.",',

    '"entry_header": "Start your payment",',
    '"entry_desc": "Choose the flow type from which the payment is initiated.",',
    '"entry_kiosk": "Kiosks / Physical Point",',
    '"entry_kiosk_desc": "Flows initiated from terminals, kiosks, or point of sale.",',
    '"entry_qr": "Recharge / QR",',
    '"entry_qr_desc": "Quick recharges and flows from a QR.",',
    '"entry_web": "E-commerce / Web",',
    '"entry_web_desc": "Integrated checkout in online stores.",',
    '"entry_agent": "Agent Module",',
    '"entry_agent_desc": "View balance, collect services, view earnings.",',
    '"entry_footer": "You can return to the main checkout directly in ",',

    '"index_redirect": "If you are not redirected automatically, ",',
    '"index_click_here": "click here to open the demo",',

    '"agent_module": "Agent Module",',
    '"agent_module_desc": "Test panel: balance, collections, earnings, and history.",',
    '"agent_module_desc_dev": "This version is the working copy of the agent module for development.",',
    '"agent_balance": "Balance",',
    '"agent_balance_desc": "Available balance to pay or withdraw",',
    '"agent_btn_recharge": "Recharge balance (demo)",',
    '"agent_btn_recharge_portal": "Recharge",',
    '"agent_services": "Available Services",',
    '"agent_dashboard": "Dashboard",',
    '"agent_dash_desc": "Accumulated earnings",',
    '"agent_total_gain": "Total gain (demo)",',
    '"agent_tx_count": "Transactions",',
    '"agent_history": "History",',
    '"agent_history_desc": "Latest transactions",',
    '"agent_th_date": "Date",',
    '"agent_th_type": "Type",',
    '"agent_th_details": "Details",',
    '"agent_th_amount": "Amount",',
    '"agent_btn_pay": "Pay",'
]

zh_vars = [
    '"login_header": "访问",',
    '"login_demo_badge": "在线银行演示（角色）",',
    '"login_title": "登录",',
    '"login_subtitle": "输入您的凭据以继续。",',
    '"login_lbl_user": "用户",',
    '"login_lbl_pwd": "密码",',
    '"login_btn_enter": "进入",',
    '"login_demo_users": "演示用户",',
    '"login_err_generic": "无法登录。",',

    '"entry_header": "开始您的付款",',
    '"entry_desc": "选择发起付款的流程类型。",',
    '"entry_kiosk": "售货亭 / 物理点",',
    '"entry_kiosk_desc": "从终端、售货亭或销售点发起的流程。",',
    '"entry_qr": "充值 / QR",',
    '"entry_qr_desc": "从QR或读卡器进行快速充值。",',
    '"entry_web": "电子商务 / Web",',
    '"entry_web_desc": "在线商店或网页中的集成结帐。",',
    '"entry_agent": "代理模块",',
    '"entry_agent_desc": "查看余额、收取服务费、查看收益。",',
    '"entry_footer": "您可以直接返回主结帐，在 ",',

    '"index_redirect": "如果您没有自动重定向，",',
    '"index_click_here": "点击这里打开演示",',

    '"agent_module": "代理模块",',
    '"agent_module_desc": "测试面板：余额、收款、收益和历史记录。",',
    '"agent_module_desc_dev": "此版本是用于开发的代理模块的工作副本。",',
    '"agent_balance": "余额",',
    '"agent_balance_desc": "可用余额",',
    '"agent_btn_recharge": "充值余额（演示）",',
    '"agent_btn_recharge_portal": "充值",',
    '"agent_services": "可用服务",',
    '"agent_dashboard": "仪表板",',
    '"agent_dash_desc": "累计收益",',
    '"agent_total_gain": "总收益（演示）",',
    '"agent_tx_count": "交易",',
    '"agent_history": "历史记录",',
    '"agent_history_desc": "最新交易",',
    '"agent_th_date": "日期",',
    '"agent_th_type": "类型",',
    '"agent_th_details": "详细信息",',
    '"agent_th_amount": "金额",',
    '"agent_btn_pay": "支付",'
]

ru_vars = [
    '"login_header": "Доступ",',
    '"login_demo_badge": "Демонстрация (роли)",',
    '"login_title": "Войти",',
    '"login_subtitle": "Введите свои учетные данные для продолжения.",',
    '"login_lbl_user": "Пользователь",',
    '"login_lbl_pwd": "Пароль",',
    '"login_btn_enter": "Войти",',
    '"login_demo_users": "Демонстрационные пользователи",',
    '"login_err_generic": "Не удалось войти.",',

    '"entry_header": "Начните свой платеж",',
    '"entry_desc": "Выберите тип процесса, с которого начинается платеж.",',
    '"entry_kiosk": "Киоски / Физическая точка",',
    '"entry_kiosk_desc": "Процессы, инициируемые с терминалов, киосков или точек продаж.",',
    '"entry_qr": "Пополнение / QR",',
    '"entry_qr_desc": "Быстрые пополнения и процессы с QR-кода.",',
    '"entry_web": "Электронная коммерция / Web",',
    '"entry_web_desc": "Интегрированная касса в интернет-магазинах.",',
    '"entry_agent": "Модуль агента",',
    '"entry_agent_desc": "Просмотр баланса, сбор услуг, просмотр доходов.",',
    '"entry_footer": "Вы можете вернуться к основной кассе напрямую в ",',

    '"index_redirect": "Если вы не были перенаправлены автоматически, ",',
    '"index_click_here": "нажмите здесь, чтобы открыть демо",',

    '"agent_module": "Модуль агента",',
    '"agent_module_desc": "Тестовая панель: баланс, сборы, доходы и история.",',
    '"agent_module_desc_dev": "Эта версия является рабочей копией модуля агента.",',
    '"agent_balance": "Баланс",',
    '"agent_balance_desc": "Доступный баланс",',
    '"agent_btn_recharge": "Пополнить баланс (демо)",',
    '"agent_btn_recharge_portal": "Пополнить",',
    '"agent_services": "Доступные ус?   '"entry_footer": "Вы можете вернуться к основной кассе напНакопленные доходы",',
    '"agent_total_gain": "Общий доход (демо)",',
    '"agent_tx_count": "Транзакции",',
    '"agent_history": "История",',
    '"agent_history_desc": "Последние транзакции",',
    '"agent_th_date": "Дата",',
    '"agent_th_type": "Тип",',
    '"agent_th_details": "Детали",',
    '"agent_th_amount": "Сумма",',
    '"agent_btn_pay": "Оплатить",'
]

def insert_lang(code, block):
    global content
    lang_match = re.search(r'"?' + code + '"?:\s*\{([^}]*)\}', content)
    if lang_match:
        inner = lang_match.group(1)
        newlines = "\n    " + "\n    ".join(block) + "\n    "
        # append at beginning of block
        new_inner = newlines + inner.strip()
        replaced = '  "' + code + '": {\n    ' + new_inner + '\n  }'
        content = content[:lang_match.start()] + replaced + content[lang_match.end():]
        print(f"Patched {code}")

insert_lang('es', es_vars)
insert_lang('en', en_vars)
insert_lang('zh', zh_vars)
insert_lang('ru', ru_vars)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)
