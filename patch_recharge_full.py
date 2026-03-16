import re
import json

with open('i18n.js', 'r', encoding='utf-8') as f:
    i18n_content = f.read()

# The keys we want to inject for Spanish and Chinese translations
es_keys = [
    '"recharge_digital_desc": "Agrega fondos a tu balance usando tarjeta, Yappy u otros métodos digitales.",',
    '"recharge_cashin_amount": "Monto USD",',
    '"recharge_cashin_net": "Valor real a recargar (neto)",',
    '"recharge_cashin_net_hint": "Neto = Monto - Comisión - ITBMS",',
    '"recharge_cashin_summary_title": "Resumen de recarga digital",',
    '"recharge_cashin_account": "Cuenta (agente):",',
    '"recharge_cashin_redirect_msg": "Serás redirigido al checkout para completar el pago con métodos digitales.",',
    '"recharge_cashin_amount_to_recharge": "Monto a recargar:",',
    '"recharge_cashin_real_value": "Valor real a recargar:",',
    '"recharge_cashin_correct": "Corregir",',
    '"recharge_cashin_go_checkout": "Ir al checkout",',
    '"recharge_cashin_success_title": "¡Depósito Exitoso!",',
    '"recharge_cashin_success_msg": "El saldo se ha acreditado instantáneamente.",',
    '"recharge_cashin_another": "Realizar otro depósito",',
    '"recharge_ach_title": "Alertar Pago por ACH",',
    '"recharge_ach_desc": "Notifica tu transferencia de otros bancos para fondear tu saldo.",',
    '"recharge_ach_bank": "Tu Banco (Emisor)",',
    '"recharge_ach_bank_ph": "Seleccione banco",',
    '"recharge_ach_bank_gen": "Banco General",',
    '"recharge_ach_bank_ban": "Banistmo",',
    '"recharge_ach_bank_bac": "BAC Credomatic",',
    '"recharge_ach_bank_oth": "Otros bancos",',
    '"recharge_ach_ref": "Número de Referencia",',
    '"recharge_ach_ref_ph": "Ej: 0012345",',
    '"recharge_ach_amount": "Monto de la Transferencia",',
    '"recharge_ach_proof": "Cargar Comprobante",',
    '"recharge_ach_upload": "Subir foto o PDF",',
    '"recharge_ach_notice_title": "Aviso:",',
    '"recharge_ach_notice_desc": "Las transferencias ACH de otros bancos pueden demorar en ser procesadas por el sistema bancario. Al alertar aquí, nuestro equipo financiero verificará su depósito prioritariamente.",',
    '"recharge_ach_btn_send": "NOTIFICAR TRANSFERENCIA",',
    '"recharge_ach_history_title": "Estado de recargas enviadas",',
    '"recharge_ach_history_date": "Fecha",',
    '"recharge_ach_history_ref": "Referencia",',
    '"recharge_ach_history_amount": "Monto",',
    '"recharge_ach_history_status": "Estado",',
    '"recharge_ach_status_recharged": "RECARGADO",',
    '"pay_services_title": "Pago de servicios",',
    '"pay_services_desc": "Busca al cliente por cédula, pasaporte o número de servicio para ver su portafolio y saldos.",',
    '"pay_services_search_label": "Cédula / Pasaporte / Nº de servicio",',
    '"pay_services_search_ph": "Ej: 8-123-4567 | P1234567 | 001234567",',
    '"pay_services_search_btn": "Buscar Cliente",',
    '"pay_services_searching": "Buscando cliente...",',
    '"pay_services_search_error": "Error al buscar cliente.",',
    '"pay_services_search_empty": "No se encontraron coincidencias para el cliente.",',
    '"pay_services_status_paid": "PAGADO",',
    '"pay_services_btn_collect": "Cobrar",',
    '"pay_services_lbl_services": "servicios",',
    '"pay_services_lbl_id": "ID: "'
]

zh_keys = [
    '"recharge_digital_desc": "使用卡、Yappy 或其他数字方法为您的余额添加资金。",',
    '"recharge_cashin_amount": "美元金额",',
    '"recharge_cashin_net": "实际充值金额（净额）",',
    '"recharge_cashin_net_hint": "净额 = 金额 - 佣金 - ITBMS",',
    '"recharge_cashin_summary_title": "数字充值摘要",',
    '"recharge_cashin_account": "账户（代理）：",',
    '"recharge_cashin_redirect_msg": "您将被重定向到结账页面以完成数字支付。",',
    '"recharge_cashin_amount_to_recharge": "充值金额：",',
    '"recharge_cashin_real_value": "实际充值金额：",',
    '"recharge_cashin_correct": "更正",',
    '"recharge_cashin_go_checkout": "去结账",',
    '"recharge_cashin_success_title": "存款成功！",',
    '"recharge_cashin_success_msg": "余额已立即到账。",',
    '"recharge_cashin_another": "再进行一次存款",',
    '"recharge_ach_title": "ACH付款提醒",',
    '"recharge_ach_desc": "通知来自其他银行的转账以为您的余额提供资金。",',
    '"recharge_ach_bank": "您的银行（汇款人）",',
    '"recharge_ach_bank_ph": "选择银行",',
    '"recharge_ach_bank_gen": "Banco General",',
    '"recharge_ach_bank_ban": "Banistmo",',
    '"recharge_ach_bank_bac": "BAC Credomatic",',
    '"recharge_ach_bank_oth": "其他银行",',
    '"recharge_ach_ref": "参考号",',
    '"recharge_ach_ref_ph": "例：0012345",',
    '"recharge_ach_amount": "转账金额",',
    '"recharge_ach_proof": "上传凭证",',
    '"recharge_ach_upload": "上传照片或PDF",',
    '"recharge_ach_notice_title": "注意：",',
    '"recharge_ach_notice_desc": "来自其他银行的ACH转账可能需要时间进行处理。通过在此处提醒，我们的财务团队将优先验证您的存款。",',
    '"recharge_ach_btn_send": "通知转账",',
    '"recharge_ach_history_title": "发送的充值状态",',
    '"recharge_ach_history_date": "日期",',
    '"recharge_ach_history_ref": "参考",',
    '"recharge_ach_history_amount": "金额",',
    '"recharge_ach_history_status": "状态",',
    '"recharge_ach_status_recharged": "已充值",',
    '"pay_services_title": "支付服务",',
    '"pay_services_desc": "通过身份证、护照或服务编号搜索客户以查看其投资组合和余额。",',
    '"pay_services_search_label": "身份证 / 护照 / 服务编号",',
    '"pay_services_search_ph": "例：8-123-4567 | P1234567 | 001234567",',
    '"pay_services_search_btn": "搜索客户",',
    '"pay_services_searching": "寻找客户...",',
    '"pay_services_search_error": "未找到搜索结果。",',
    '"pay_services_search_empty": "未找到客户匹配项。",',
    '"pay_services_status_paid": "已付款",',
    '"pay_services_btn_collect": "收取",',
    '"pay_services_lbl_services": "服务",',
    '"pay_services_lbl_id": "ID: "'
]

def insert_lang(code, keys):
    global i18n_content
    pattern = r'("' + code + r'": \{)'
    match = re.search(pattern, i18n_content)
    if match:
        idx = match.end()
        extra = "\n    " + "\n    ".join(keys) + "\n"
        i18n_content = i18n_content[:idx] + extra + i18n_content[idx:]

insert_lang('es', es_keys)
insert_lang('zh', zh_keys)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(i18n_content)

print("Updated i18n.js with extended vocabulary")

