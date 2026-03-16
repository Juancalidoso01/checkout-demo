import re

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
    '"agent_services": "Доступные услуги",',
    '"agent_dashboard": "Панель приборов",',
    '"agent_dash_desc": "Накопленные доходы",',
    '"agent_total_gain": "Общий доход (демо)",',
    '"agent_tx_count": "Транзакции",',
    '"agent_history": "История",',
    '"agent_history_desc": "Последние транзакции",',
    '"agent_th_date": "Дата",',
    '"agent_th_type": "Тип",',
    '"agent_th_details": "Детали",',
    '"agent_th_am    '"agent_module_desc_dev": "Эта версия является рабочей копиmore2.py', 'r', encoding='utf    '"agent_balance": f.read()

text = re.sub(r'ru_vars = \[.*?\]\n', 'ru_vars = ' + str(ru_vars).replace("'", "'''") + '\n', text, flags=re.DOTALL)
text = text.replace("''''", "'")

with open('patch_i18n_more2.py', 'w', encoding='utf-8') as f:
    f.write(text)
