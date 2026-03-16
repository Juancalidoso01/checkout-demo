import re

with open('i18n.js', 'r') as f:
    js = f.read()

# Sets of strings
new_es = """,
    "tab_invoice": "Factura",
    "tab_history": "Histórico",
    "tab_payments": "Pago de servicios",
    "tab_fund": "Fondear",
    "tab_ach": "Notificar ACH",
    "recharge_history_title": "Histórico de transacciones",
    "invoice_send_btn": "Enviar comprobante",
    "invoice_op": "Operación",
    "invoice_amount": "Monto",
    "invoice_ref": "Referencia",
    "invoice_print": "Punto Pago — Comprobante",
    "checkout_total": "Total a pagar",
    "checkout_select_method": "Selecciona un método de pago para continuar.",
    "checkout_pay_button": "Pagar pedido",
    "checkout_cancel": "Cancelar",
    "common_continue": "Continuar",
    "checkout_secure": "Pago seguro y rápido" """

new_en = """,
    "tab_invoice": "Invoice",
    "tab_history": "History",
    "tab_payments": "Pay Services",
    "tab_fund": "Fund Account",
    "tab_ach": "Notify ACH",
    "recharge_history_title": "Transaction History",
    "invoice_send_btn": "Send receipt",
    "invoice_op": "Operation",
    "invoice_amount": "Amount",
    "invoice_ref": "Reference",
    "invoice_print": "Punto Pago — Receipt",
    "checkout_total": "Total to pay",
    "checkout_select_method": "Select a payment method to continue.",
    "checkout_pay_button": "Pay order",
    "checkout_cancel": "Cancel",
    "common_continue": "Continue",
    "checkout_secure": "Secure and fast payment" """

new_ru = """,
    "tab_invoice": "Счет",
    "tab_history": "История",
    "tab_payments": "Оплата услуг",
    "tab_fund": "Пополнить",
    "tab_ach": "Уведомить ACH",
    "recharge_history_title": "История транзакций",
    "invoice_send_btn": "Отправить чек",
    "invoice_op": "Операция",
    "invoice_amount": "Сумма",
    "invoice_ref": "Справочный номер",
    "invoice_print": "Punto Pago — Чек",
    "checkout_total": "К оплате",
    "checkout_select_method": "Выберите способ оплаты для продолжения.",
    "checkout_pay_button": "Оплатить заказ",
    "checkout_cancel": "Отмена",
    "common_continue": "Продолжить",
    "checkout_secure": "Безопасная и быстрая оплата" """

new_zh = """,
    "tab_invoice": "发票",
    "tab_history": "历史",
    "tab_payments": "支付服务",
    "tab_fund": "资金账户",
    "tab_ach": "通知 ACH",
    "recharge_history_title": "交易记录",
    "invoice_send_btn": "发送收据",
    "invoice_op": "操作",
    "invoice_amount": "金额",
    "invoice_ref": "参考号",
    "invoice_print": "Punto Pago — 收据",
    "checkout_total": "总付款",
    "checkout_select_method": "选择付款方式继续.",
    "checkout_pay_button": "支付订单",
    "checkout_cancel": "取消",
    "common_continue": "继续",
    "checkout_secure": "安全快捷的支付" """

js = js.replace('"recharge_digital": "Recarga digital"', '"recharge_digital": "Recarga digital"' + new_es)
js = js.replace('"recharge_digital": "Digital Recharge"', '"recharge_digital": "Digital Recharge"' + new_en)
js = js.replace('"recharge_digital": "Цифровой Перезарядка"', '"recharge_digital": "Цифровой Перезарядка"' + new_ru)
js = js.replace('"recharge_digital": "数字充值"', '"recharge_digital": "数字充值"' + new_zh)

with open('i18n.js', 'w') as f:
    f.write(js)

