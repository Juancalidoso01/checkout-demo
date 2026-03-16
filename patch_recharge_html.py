import re

with open('agents/recharge.html', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    # Recarga digital
    (r'<p class="text-gray-500 pp-type">Agrega fondos a tu balance usando tarjeta, Yappy u otros métodos digitales.</p>',
     r'<p class="text-gray-500 pp-type" data-i18n="recharge_digital_desc">Agrega fondos a tu balance usando tarjeta, Yappy u otros métodos digitales.</p>'),
    
    (r'<label class="pp-label">Monto USD</label>',
     r'<label class="pp-label" data-i18n="recharge_cashin_amount">Monto USD</label>'),
    
    (r'<div class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Valor real a recargar \(neto\)</div>',
     r'<div class="text-xs text-gray-500 uppercase tracking-wider font-semibold" data-i18n="recharge_cashin_net">Valor real a recargar (neto)</div>'),
    
    (r'<div class="mt-1 text-\[11px\] text-gray-500" id="cashin-net-hint">Neto = Monto - Comisión - ITBMS</div>',
     r'<div class="mt-1 text-[11px] text-gray-500" id="cashin-net-hint" data-i18n="recharge_cashin_net_hint">Neto = Monto - Comisión - ITBMS</div>'),
    
    (r'<h3 class="font-bold text-blue-800 mb-4 uppercase text-xs tracking-widest">Resumen de recarga digital</h3>',
     r'<h3 class="font-bold text-blue-800 mb-4 uppercase text-xs tracking-widest" data-i18n="recharge_cashin_summary_title">Resumen de recarga digital</h3>'),
     
    (r'<span class="text-gray-600">Cuenta \(agente\):</span>',
     r'<span class="text-gray-600" data-i18n="recharge_cashin_account">Cuenta (agente):</span>'),
     
    (r'<div class="text-sm text-gray-600 mb-4">Serás redirigido al checkout para completar el pago con métodos digitales.</div>',
     r'<div class="text-sm text-gray-600 mb-4" data-i18n="recharge_cashin_redirect_msg">Serás redirigido al checkout para completar el pago con métodos digitales.</div>'),
     
    (r'<span class="font-bold text-lg text-gray-800">Monto a recargar:</span>',
     r'<span class="font-bold text-lg text-gray-800" data-i18n="recharge_cashin_amount_to_recharge">Monto a recargar:</span>'),
     
    (r'<span class="font-bold text-gray-800">Valor real a recargar:</span>',
     r'<span class="font-bold text-gray-800" data-i18n="recharge_cashin_real_value">Valor real a recargar:</span>'),
     
    (r'<button type="button" onclick="nextStep\(1\)" class="w-1/3 pp-btn pp-btn-secondary">Corregir</button>',
     r'<button type="button" onclick="nextStep(1)" class="w-1/3 pp-btn pp-btn-secondary" data-i18n="recharge_cashin_correct">Corregir</button>'),
     
    (r'<button type="button" id="cashin-go-checkout" class="w-2/3 pp-btn pp-btn-primary">Ir al checkout</button>',
     r'<button type="button" id="cashin-go-checkout" class="w-2/3 pp-btn pp-btn-primary" data-i18n="recharge_cashin_go_checkout">Ir al checkout</button>'),
     
    (r'<h3 class="text-3xl font-bold text-gray-800 mb-2">¡Depósito Exitoso!</h3>',
     r'<h3 class="text-3xl font-bold text-gray-800 mb-2" data-i18n="recharge_cashin_success_title">¡Depósito Exitoso!</h3>'),
     
    (r'<p class="text-gray-500">El saldo se ha acreditado instantáneamente.</p>',
     r'<p class="text-gray-500" data-i18n="recharge_cashin_success_msg">El saldo se ha acreditado instantáneamente.</p>'),
     
    (r'<button type="button" onclick="resetFlow\(\)" class="mt-8 text-blue-600 font-bold underline hover:text-blue-800">Realizar otro depósito</button>',
     r'<button type="button" onclick="resetFlow()" class="mt-8 text-blue-600 font-bold underline hover:text-blue-800" data-i18n="recharge_cashin_another">Realizar otro depósito</button>'),

    # ACH Note
    (r'<h2 class="text-2xl font-bold text-gray-800">Alertar Pago por ACH</h2>',
     r'<h2 class="text-2xl font-bold text-gray-800" data-i18n="recharge_ach_title">Alertar Pago por ACH</h2>'),

    (r'<p class="text-gray-500 text-sm">Notifica tu transferencia de otros bancos para fondear tu saldo.</p>',
     r'<p class="text-gray-500 text-sm" data-i18n="recharge_ach_desc">Notifica tu transferencia de otros bancos para fondear tu saldo.</p>'),

    (r'<label class="block text-sm font-bold text-gray-700 mb-2">Tu Banco \(Emisor\)</label>',
     r'<label class="block text-sm font-bold text-gray-700 mb-2" data-i18n="recharge_ach_bank">Tu Banco (Emisor)</label>'),

    (r'<option value="">Seleccione banco</option>',
     r'<option value="" data-i18n="recharge_ach_bank_ph">Seleccione banco</option>'),

    (r'<option value="general">Banco General</option>',
     r'<option value="general" data-i18n="recharge_ach_bank_gen">Banco General</option>'),

    (r'<option value="banistmo">Banistmo</option>',
     r'<option value="banistmo" data-i18n="recharge_ach_bank_ban">Banistmo</option>'),

    (r'<option value="bac">BAC Credomatic</option>',
     r'<option value="bac" data-i18n="recharge_ach_bank_bac">BAC Credomatic</option>'),

    (r'<option value="otros">Otros bancos</option>',
     r'<option value="otros" data-i18n="recharge_ach_bank_oth">Otros bancos</option>'),

    (r'<label class="block text-sm font-bold text-gray-700 mb-2">Número de Referencia</label>',
     r'<label class="block text-sm font-bold text-gray-700 mb-2" data-i18n="recharge_ach_ref">Número de Referencia</label>'),

    (r'placeholder="Ej: 0012345"',
     r'placeholder="Ej: 0012345" data-i18n-ph="recharge_ach_ref_ph"'),

    (r'<label class="block text-sm font-bold text-gray-700 mb-2">Monto de la Transferencia</label>',
     r'<label class="block text-sm font-bold text-gray-700 mb-2" data-i18n="recharge_ach_amount">Monto de la Transferencia</label>'),

    (r'<label class="block text-sm font-bold text-gray-700 mb-2">Cargar Comprobante</label>',
     r'<label class="block text-sm font-bold text-gray-700 mb-2" data-i18n="recharge_ach_proof">Cargar Comprobante</label>'),

    (r'<span class="text-xs text-gray-500">Subir foto o PDF</span>',
     r'<span class="text-xs text-gray-500" data-i18n="recharge_ach_upload">Subir foto o PDF</span>'),

    (r'<strong>Aviso:</strong>',
     r'<strong data-i18n="recharge_ach_notice_title">Aviso:</strong>'),

    (r'Las transferencias ACH de otros bancos pueden demorar en ser procesadas por el sistema bancario\. Al alertar aquí, nuestro equipo financiero verificará su depósito prioritariamente\.',
     r'<span data-i18n="recharge_ach_notice_desc">Las transferencias ACH de otros bancos pueden demorar en ser procesadas por el sistema bancario. Al alertar aquí, nuestro equipo financiero verificará su depósito prioritariamente.</span>'),

    (r'<span>NOTIFICAR TRANSFERENCIA</span>',
     r'<span data-i18n="recharge_ach_btn_send">NOTIFICAR TRANSFERENCIA</span>'),
     
    (r'<h3 class="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider border-b pb-2">Estado de recargas enviadas</h3>',
     r'<h3 class="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider border-b pb-2" data-i18n="recharge_ach_history_title">Estado de recargas enviadas</h3>'),

    (r'<th class="pb-4">Fecha</th>',
     r'<th class="pb-4" data-i18n="recharge_ach_history_date">Fecha</th>'),
     
    (r'<th class="pb-4">Referencia</th>',
     r'<th class="pb-4" data-i18n="recharge_ach_history_ref">Referencia</th>'),

    (r'<th class="pb-4 text-center">Monto</th>',
     r'<th class="pb-4 text-center" data-i18n="recharge_ach_history_amount">Monto</th>'),

    (r'<th class="pb-4 text-right">Estado</th>',
     r'<th class="pb-4 text-right" data-i18n="recharge_ach_history_status">Estado</th>'),

    (r'<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-\[10px\] font-bold">RECARGADO</span>',
     r'<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold" data-i18n="recharge_ach_status_recharged">RECARGADO</span>'),

    # Pago servicios
    (r'<h2 class="text-2xl font-bold text-gray-800 mb-2">Pago de servicios</h2>',
     r'<h2 class="text-2xl font-bold text-gray-800 mb-2" data-i18n="pay_services_title">Pago de servicios</h2>'),

    (r'<p class="text-gray-500 mb-4">Busca al cliente por cédula, pasaporte o número de servicio para ver su portafolio y saldos.</p>',
     r'<p class="text-gray-500 mb-4" data-i18n="pay_services_desc">Busca al cliente por cédula, pasaporte o número de servicio para ver su portafolio y saldos.</p>'),

    (r'<label class="block text-sm font-bold text-gray-700 mb-2">Cédula / Pasaporte / Nº de servicio</label>',
     r'<label class="block text-sm font-bold text-gray-700 mb-2" data-i18n="pay_services_search_label">Cédula / Pasaporte / Nº de servicio</label>'),

    (r'placeholder="Ej: 8-123-4567 \| P1234567 \| 001234567"',
     r'placeholder="Ej: 8-123-4567 | P1234567 | 001234567" data-i18n-ph="pay_services_search_ph"'),

    (r'<button id="customer-search-btn" type="button" class="btn-primary w-full py-3 rounded-lg text-white">Buscar Cliente</button>',
     r'<button id="customer-search-btn" type="button" class="btn-primary w-full py-3 rounded-lg text-white" data-i18n="pay_services_search_btn">Buscar Cliente</button>')
]

for old, new in replacements:
    content = re.sub(old, new, content)

# Now handle the JS parts dynamically:
content = content.replace(
    r'<div class="text-sm text-gray-500">Buscando cliente&hellip;</div>',
    r'<div class="text-sm text-gray-500">${window.I18N && window.I18N.getDict() ? window.I18N.getDict().pay_services_searching : "Buscando cliente&hellip;"}</div>'
)

content = content.replace(
    r'<div class="p-4 bg-red-50 border border-red-100 rounded">Error al buscar cliente.</div>',
    r'<div class="p-4 bg-red-50 border border-red-100 rounded">${window.I18N && window.I18N.getDict() ? window.I18N.getDict().pay_services_search_error : "Error al buscar cliente."}</div>'
)

content = content.replace(
    r'<div class="p-4 bg-yellow-50 border border-yellow-100 rounded">No se encontraron coincidencias para el cliente.</div>',
    r'<div class="p-4 bg-yellow-50 border border-yellow-100 rounded">${window.I18N && window.I18N.getDict() ? window.I18N.getDict().pay_services_search_empty : "No se encontraron coincidencias para el cliente."}</div>'
)

content = content.replace(
    r'<span class="px-3 py-1 text-[12px] bg-green-100 text-green-700 rounded-full font-bold">PAGADO</span>',
    r'<span class="px-3 py-1 text-[12px] bg-green-100 text-green-700 rounded-full font-bold">${window.I18N && window.I18N.getDict() ? window.I18N.getDict().pay_services_status_paid : "PAGADO"}</span>'
)

content = content.replace(
    r'<button type="button" data-cid="${c.cid}" data-cname="${encodeURIComponent(c.name)}" data-svc="${p.svcId}" data-svcname="${encodeURIComponent(p.name)}" data-amt="${p.balance}" class="btn secondary collect-btn">Cobrar</button>',
    r'<button type="button" data-cid="${c.cid}" data-cname="${encodeURIComponent(c.name)}" data-svc="${p.svcId}" data-svcname="${encodeURIComponent(p.name)}" data-amt="${p.balance}" class="btn secondary collect-btn">${window.I18N && window.I18N.getDict() ? window.I18N.getDict().pay_services_btn_collect : "Cobrar"}</button>'
)

content = content.replace(
    r'<div class="text-xs text-gray-500">ID: ${c.cid}</div></div><div class="text-sm text-gray-500">${c.portfolio.length} servicios</div>',
    r'<div class="text-xs text-gray-500">${window.I18N && window.I18N.getDict() ? window.I18N.getDict().pay_services_lbl_id : "ID: "}${c.cid}</div></div><div class="text-sm text-gray-500">${c.portfolio.length} ${window.I18N && window.I18N.getDict() ? window.I18N.getDict().pay_services_lbl_services : "servicios"}</div>'
)

# Fix placeholder behavior in I18N context. Check if translatePage or translate UI exists, if they don't natively do placeholders we must do it.
# Actually, our earlier update to i18n logic might support placeholders if we added it, let's keep `data-i18n-ph` and we'll check it later.

with open('agents/recharge.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("agents/recharge.html updated successfully")

