import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

zh_vars = [
    '"login_header": "访问",',
    '"login_demo_badge": "在线银行演示（角色）",',
    '"login_title": "登录",',
    '"login_subtitle": "输入您的凭据以继续。",',
    '"login_lbl_user": "用户",',
    '"login_lbl_pwd": "密码",',
    '"login_btn_enter": "进入",',
    '"login_demo_users": "演示用户",',
    '"login_err_invalid": "用户名或密码无效。",',
    '"login_err_disabled": "用户已禁用。",',

    '"entry_header": "开始您的付款",',
    '"entry_desc": "选择发起付款的流程类型。这只是一个概念选择器；选择将打开结帐。",',
    '"entry_kiosk": "售货亭 / 物理点",',
    '"entry_kiosk_desc": "从终端、售货亭或销售点发起的流程。",',
    '"entry_qr": "充值 / QR",',
    '"entry_qr_desc": "从QR或读卡器进行快速充值和流程。",',
    '"entry_web": "电子商务 / Web",',
    '"entry_web_desc": "在线商店或网页中的集成结帐。",',
    '"entry_agent": "代理模块",',
    '"entry_agent_desc": "查看余额、收取服务费、查看收益和交易历史。",',
    '"entry_footer": "您可以直接返回主结帐，在 ",',

    '"index_redirect": "如果您没有自动重定向，",',
    '"index_click_here": "点击这里打开演示",',

    '"agent_module": "代理模块",',
    '"agent_module_desc": "测试面板：余额、收款、收益和历史记录。此演示使用本地存储来模拟状态。",',
    '"agent_module_desc_dev": "此版本是用于开发的代理模块的工作副本。",',
    '"agent_balance": "余额",',
    '"agent_balance_desc": "可用余额以支付服务或提取",',
    '"agent_btn_recharge": "充值余额（演示）",',
    '"agent_btn_recharge_portal": "充值",',
    '"agent_services": "可用服务",',
    '"agent_dashboard": "仪表板",',
    '"agent_dash_desc": "累计收益和快速指标",',
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

# Insert only into zh
pattern = r'("zh": \{)'
match = re.search(pattern, content)
if match:
    idx = match.end()
    extra = "\n    " + "\n    ".join(zh_vars) + "\n"
    content = content[:idx] + extra + content[idx:]
    with open('i18n.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Success: added zh variations")
else:
    print("Error finding zh index")

