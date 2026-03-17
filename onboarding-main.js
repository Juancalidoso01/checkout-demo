!function(){
  function init(){
  const APPLICATIONS_KEY = 'pp_onboarding_applications_v1';
  const ACCESS_KEY = 'pp_onboarding_access_v1';
  const RECOVERY_KEY = 'pp_onboarding_recovery_v1';
  const steps = [
    { title: 'Comercio', desc: 'Estructura, empresa y aviso de operaciones (PDF)' },
    { title: 'Contactos', desc: 'Representante, teléfono empresa y celular' },
    { title: 'Dirección', desc: 'Provincia, distrito, mapa y ubicación exacta' },
    { title: 'Compliance', desc: 'Cuenta bancaria y validaciones' },
    { title: 'Resumen', desc: 'Confirmación para revisión' }
  ];

  const stepEls = Array.from(document.querySelectorAll('.form-step'));
  const indicator = document.getElementById('stepIndicator');
  const form = document.getElementById('onboardingForm');
  const formMsg = document.getElementById('formMsg');
  const summaryList = document.getElementById('summaryList');
  const applicationCodeEl = document.getElementById('applicationCode');
  const draftStatusEl = document.getElementById('draftStatus');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const submitBtn = document.getElementById('submitBtn');
  const pdfInput = document.getElementById('businessDescriptionPdf');
  const pdfDropzone = document.getElementById('pdf-dropzone');
  const pdfInfo = document.getElementById('pdf-file-info');
  const pdfError = document.getElementById('pdf-file-error');
  const obProgressLabel = document.getElementById('obProgressLabel');
  const obProgressFill = document.getElementById('obProgressFill');
  const obProgressFillFull = document.getElementById('obProgressFillFull');
  const obProgressBarFull = document.querySelector('.ob-progress-bar[role="progressbar"]');
  let currentStep = 0;
  let applicationId = `oba_${Math.random().toString(16).slice(2,8)}_${Date.now().toString(16)}`;

  function now(){ return Date.now(); }
  function esc(v){ return (v || '').toString().replace(/[&<>\"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c] || c; }); }
  function readApplications(){
    try {
      const raw = localStorage.getItem(APPLICATIONS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }
  function writeApplications(items){
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(items || []));
  }
  function readAccessContext(){
    try {
      const raw = localStorage.getItem(ACCESS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  function readFormData(){
    var data = {};
    var els = form.elements;
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var name = el.name;
      if (!name) continue;
      if (el.type === 'checkbox') { data[name] = el.checked; continue; }
      if (el.type === 'radio') { if (el.checked) data[name] = el.value; continue; }
      if (el.type === 'file' || el.type === 'submit' || el.type === 'button') continue;
      if (el.value !== undefined && el.value !== null) data[name] = el.value;
    }
    var acc = form.elements.acceptTerms;
    data.acceptTerms = acc ? acc.checked : false;
    var needApi = form.elements.needsApiIntegration;
    data.needsApiIntegration = needApi ? needApi.checked : false;
    var conf = form.elements.confirmPhoneOwnership;
    data.confirmPhoneOwnership = (conf && conf.checked) || false;
    if (pdfInput && pdfInput.files && pdfInput.files[0]) {
      data.businessDescriptionPdfName = pdfInput.files[0].name;
    }
    return data;
  }
  const IDB_NAME = 'pp_onboarding_recovery';
  const IDB_STORE = 'files';
  function savePdfToIndexedDB(file, cb){ if (!file) { if (cb) cb(); return; }
    try {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = function(){ req.result.createObjectStore(IDB_STORE); };
      req.onsuccess = function(){
        const tx = req.result.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put({ blob: file, name: file.name }, 'pdf');
        tx.oncomplete = function(){ if (cb) cb(); };
      };
      req.onerror = function(){ if (cb) cb(); };
    } catch(e){ if (cb) cb(); }
  }
  function clearPdfFromIndexedDB(cb){ try {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = function(){ req.result.createObjectStore(IDB_STORE); };
    req.onsuccess = function(){
      const tx = req.result.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete('pdf');
      tx.oncomplete = function(){ if (cb) cb(); };
    };
    req.onerror = function(){ if (cb) cb(); };
  } catch(e){ if (cb) cb(); }
  function restorePdfFromIndexedDB(cb){
    try {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = function(){ req.result.createObjectStore(IDB_STORE); };
      req.onsuccess = function(){
        const tx = req.result.transaction(IDB_STORE, 'readonly');
        const getReq = tx.objectStore(IDB_STORE).get('pdf');
        getReq.onsuccess = function(){
          var row = getReq.result;
          if (!row || !row.blob || !pdfInput) { if (cb) cb(); return; }
          try {
            var file = row.blob instanceof File ? row.blob : new File([row.blob], row.name || 'aviso.pdf', { type: row.blob.type || 'application/pdf' });
            var dt = new DataTransfer();
            dt.items.add(file);
            pdfInput.files = dt.files;
            if (pdfInfo) { pdfInfo.textContent = 'Restaurado: ' + file.name + ' (' + (file.size / (1024 * 1024)).toFixed(2) + ' MB)'; pdfInfo.classList.remove('hidden'); }
          } catch(e2) {}
          if (cb) cb();
        };
        getReq.onerror = function(){ if (cb) cb(); };
      };
      req.onerror = function(){ if (cb) cb(); };
    } catch(e) { if (cb) cb(); }
  }
  let saveRecoveryTimer = null;
  function saveRecovery(){
    clearTimeout(saveRecoveryTimer);
    saveRecoveryTimer = setTimeout(function(){
      try {
        const data = readFormData();
        sessionStorage.setItem(RECOVERY_KEY, JSON.stringify({
          applicationId,
          currentStep,
          formData: data,
          savedAt: Date.now()
        }));
        if (pdfInput && pdfInput.files && pdfInput.files[0]) {
          savePdfToIndexedDB(pdfInput.files[0]);
        } else {
          clearPdfFromIndexedDB();
        }
      } catch (e) {}
    }, 800);
  }
  function restoreRecovery(){
    try {
      const raw = sessionStorage.getItem(RECOVERY_KEY);
      if (!raw) return false;
      const r = JSON.parse(raw);
      if (!r.applicationId || !r.formData) return false;
      if (Date.now() - (r.savedAt || 0) > 24 * 60 * 60 * 1000) { sessionStorage.removeItem(RECOVERY_KEY); clearPdfFromIndexedDB(function(){}); return false; }
      applicationId = r.applicationId;
      currentStep = Math.min(Math.max(0, r.currentStep || 0), stepEls.length - 1);
      const d = r.formData;
      for (const k in d) {
        const el = form.elements[k];
        if (!el) continue;
        if (el.type === 'checkbox') el.checked = !!d[k];
        else if (el.type === 'radio') el.checked = (el.value === d[k]);
        else if (el.value !== d[k]) el.value = d[k] || '';
      }
      applicationCodeEl.textContent = applicationId;
      renderSteps();
      setMsg('Progreso restaurado. Puede continuar donde lo dejó.', false);
      restorePdfFromIndexedDB(function(){});
      return true;
    } catch (e) { return false; }
  }
  function setMsg(msg, isError){
    if (formMsg) {
      formMsg.textContent = msg || '';
      formMsg.className = 'text-sm min-h-[20px] mt-2 ' + (isError ? 'text-red-600 font-semibold p-3 rounded-lg bg-red-50 border border-red-200' : 'text-slate-600');
      formMsg.setAttribute('role', isError ? 'alert' : 'status');
    }
    var banner = document.getElementById('ob-step-error-banner');
    if (banner) {
      banner.textContent = msg || '';
      banner.classList.toggle('hidden', !(msg && isError));
      if (msg && isError) {
        try {
          if (document.body) banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (e) {}
      }
    }
    if (msg && isError && formMsg) {
      try {
        if (document.body) formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (e) {}
    }
  }
  function goToStep(idx){
    if (idx < 0 || idx >= stepEls.length || idx === currentStep) return;
    if (metamapModalOpen) return;
    currentStep = idx;
    renderSteps();
    setMsg('');
    saveRecovery();
  }
  window.__obGoToStep = goToStep;
  if (indicator) {
    indicator.addEventListener('click', function(e) {
      var el = e.target;
      while (el && el !== indicator) {
        if (el.classList && el.classList.contains('ob-step')) break;
        el = el.parentNode;
      }
      if (!el || el === indicator) return;
      var idxAttr = el.getAttribute('data-step-idx');
      if (idxAttr == null) return;
      var idx = parseInt(idxAttr, 10);
      if (!isNaN(idx) && idx >= 0) goToStep(idx);
    });
  }
  function renderIndicator(){
    if (!indicator) return;
    var html = steps.map(function(step, idx) { return `
      <div class="ob-step ${idx === currentStep ? '-active' : ''} cursor-pointer" data-step-idx="${idx}" role="button" tabindex="0" onclick="if(window.__obGoToStep)window.__obGoToStep(${idx});return false;">
        <div class="ob-step-index">${idx + 1}</div>
        <div>
          <div class="font-extrabold text-sm">${esc(step.title)}</div>
          <div class="text-xs text-slate-500 mt-1">${esc(step.desc)}</div>
        </div>
      </div>`; }).join('');
    if (!html) return;
    indicator.innerHTML = html;
    indicator.querySelectorAll('.ob-step[data-step-idx]').forEach(function(el) {
      var idx = parseInt(el.getAttribute('data-step-idx'), 10);
      el.addEventListener('click', function() { goToStep(idx); });
      el.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToStep(idx); } });
    });
  }
  function updateProgress(){
    const total = stepEls.length;
    const percent = total ? Math.round(((currentStep + 1) / total) * 100) : 0;
    const percentStr = percent + '%';
    if (obProgressLabel) obProgressLabel.textContent = percentStr;
    if (obProgressFill) obProgressFill.style.width = percentStr;
    if (obProgressFillFull) obProgressFillFull.style.width = percentStr;
    if (obProgressBarFull) {
      obProgressBarFull.setAttribute('aria-valuenow', percent);
    }
  }
  const KYC_STATUS_KEY = 'pp_kyc_status';
  let metamapModalOpen = false;
  function getKycStatus(){
    try {
      const raw = localStorage.getItem(KYC_STATUS_KEY);
      const all = raw ? JSON.parse(raw) : {};
      return all[applicationId] || null;
    } catch (e) { return null; }
  }
  function setKycStatus(data){
    try {
      const raw = localStorage.getItem(KYC_STATUS_KEY);
      const all = raw ? JSON.parse(raw) : {};
      if (data == null) { delete all[applicationId]; }
      else { var o = {}; for (var kk in data) o[kk] = data[kk]; o.updatedAt = Date.now(); all[applicationId] = o; }
      localStorage.setItem(KYC_STATUS_KEY, JSON.stringify(all));
    } catch (e) {}
  }
  window.setKycResult = function(appId, payload){
    try {
      const raw = localStorage.getItem(KYC_STATUS_KEY);
      const all = raw ? JSON.parse(raw) : {};
      var cur = all[appId] || {};
      for (var pk in payload) { cur[pk] = payload[pk]; }
      cur.updatedAt = Date.now();
      all[appId] = cur;
      localStorage.setItem(KYC_STATUS_KEY, JSON.stringify(all));
      if (appId === applicationId) renderKycStatus();
    } catch (e) {}
  };
  function isKycCompleted(){ const k = getKycStatus(); return !!(k && k.verificationId); }
  window.getKycVerificationsForSupabase = function(){
    try {
      const raw = localStorage.getItem(KYC_STATUS_KEY);
      const all = raw ? JSON.parse(raw) : {};
      var arr = [];
      for (var ak in all) { arr.push([ak, all[ak]]); }
      return arr.map(function(kv) { var appId = kv[0]; var kyc = kv[1]; return {
        application_id: appId,
        identity_id: kyc.identityId || null,
        verification_id: kyc.verificationId || null,
        status: kyc.status || 'pending_review',
        error_message: (kyc.error && kyc.error.message) || null,
        error_code: (kyc.error && kyc.error.code) || null,
        error_type: (kyc.error && kyc.error.type) || null,
        completed_at: kyc.completedAt || null,
        updated_at: kyc.updatedAt || null
      }; });
    } catch (e) { return []; }
  };
  function renderKycStatus(){
    const completed = isKycCompleted();
    const panelEl = document.getElementById('kyc-status-panel');
    const pendingWrap = document.getElementById('kyc-pending-wrap');
    if (panelEl) panelEl.classList.toggle('hidden', !completed);
    if (pendingWrap) pendingWrap.classList.toggle('hidden', !!completed);
  }
  function updateMetamapMetadata(){
    const btn = document.getElementById('metamap-btn');
    if (!btn) return;
    const repEmail = (form.elements.repEmail && form.elements.repEmail.value) || '';
    const meta = {
      onboardingId: applicationId,
      email: repEmail
    };
    btn.setAttribute('metadata', JSON.stringify(meta));
  }
  function setMetamapModalOpen(open){
    metamapModalOpen = open;
    window.__metamapModalOpen = open;
    const sidebar = document.querySelector('.ob-sidebar');
    if (sidebar) sidebar.style.pointerEvents = open ? 'none' : '';
    if (prevBtn) prevBtn.disabled = open ? true : (currentStep === 0);
    if (nextBtn) nextBtn.disabled = open;
  }
  function renderSteps(){
    // Si estamos en el último paso, verificar que todos los anteriores estén completos. Si no, volver al primer paso incompleto.
    if (currentStep === stepEls.length - 1) {
      for (let i = 0; i < stepEls.length - 1; i++) {
        if (!validateStepSilent(i)) {
          currentStep = i;
          setMsg('Completa los campos obligatorios antes de enviar.', true);
          break;
        }
      }
    }
    stepEls.forEach(function(el, idx) { el.classList.toggle('is-hidden', idx !== currentStep); });
    prevBtn.disabled = currentStep === 0;
    nextBtn.classList.toggle('is-hidden', currentStep === stepEls.length - 1);
    var canShowSubmit = (currentStep === stepEls.length - 1) && [0,1,2,3].every(function(i){ return validateStepSilent(i); });
    submitBtn.classList.toggle('is-hidden', !canShowSubmit);
    submitBtn.setAttribute('aria-hidden', canShowSubmit ? 'false' : 'true');
    if (currentStep === stepEls.length - 1) renderSummary();
    if (currentStep === 1) { updateMetamapMetadata(); renderKycStatus(); }
    if (currentStep === 2) { setTimeout(initAddressMapIfNeeded, 100); }
    renderIndicator();
    updateProgress();
    updateFieldChecks();
  }
  function setupPdfUpload(){
    if (!pdfInput || !pdfDropzone) return;
    function clearError(){
      if (pdfError) {
        pdfError.textContent = '';
        pdfError.classList.add('hidden');
      }
    }
    function showError(msg){
      if (!pdfError) return;
      pdfError.textContent = msg;
      pdfError.classList.remove('hidden');
    }
    function showInfo(msg){
      if (!pdfInfo) return;
      pdfInfo.textContent = msg;
      pdfInfo.classList.remove('hidden');
    }
    function updatePdfCheck() {
      var pdfChk = document.getElementById('pdf-check');
      if (pdfChk) pdfChk.classList.toggle('-ok', !!(pdfInput && pdfInput.files && pdfInput.files[0]));
    }
    function handleFiles(files){
      clearError();
      if (!files || !files[0]) { updatePdfCheck(); return; }
      var file = files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        pdfInput.value = '';
        showError('Solo se permiten archivos en formato PDF.');
        updatePdfCheck();
        return;
      }
      var mb = (file.size / (1024 * 1024)).toFixed(2);
      showInfo('Seleccionado: ' + file.name + ' (' + mb + ' MB)');
      updatePdfCheck();
      updateFieldChecks();
    }
    pdfDropzone.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
      pdfDropzone.classList.add('bg-blue-50');
    });
    pdfDropzone.addEventListener('dragleave', function(e) {
      e.preventDefault();
      e.stopPropagation();
      pdfDropzone.classList.remove('bg-blue-50');
    });
    pdfDropzone.addEventListener('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      pdfDropzone.classList.remove('bg-blue-50');
      var files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files[0]) return;
      var file = files[0];
      try {
        var dt = new DataTransfer();
        dt.items.add(file);
        pdfInput.files = dt.files;
      } catch (err) {}
      handleFiles(files);
    });
    pdfInput.addEventListener('change', function(e) {
      handleFiles(e.target.files);
    });
    updatePdfCheck();
  }
  function getStepFields(stepIndex){
    const stepEl = stepEls[stepIndex];
    if (!stepEl) return [];
    return Array.from(stepEl.querySelectorAll('input, select, textarea')).filter(function(el){ return el.type !== 'button' && el.type !== 'submit' && !el.disabled; });
  }
  function isValidPanamaMobile(v){
    const digits = (v||'').replace(/\D/g,'');
    if (!digits.length) return { valid: false, message: 'Ingrese el número.' };
    let local = digits;
    if (digits.startsWith('507') && digits.length === 11) local = digits.slice(3);
    else if (digits.length === 8) local = digits;
    else if (digits.length === 11 && digits.startsWith('507')) local = digits.slice(3);
    else return { valid: false, message: 'Formato: +507 6XXX XXXX (8 dígitos, código de país +507, celular comienza por 6).' };
    if (local.length !== 8 || local[0] !== '6') return { valid: false, message: 'Celular Panamá: 8 dígitos comenzando por 6 (ej. 6123 4567).' };
    return { valid: true };
  }
  function showPhoneError(fieldName, msg){
    const el = document.getElementById(fieldName + 'Error');
    if (el) { el.textContent = msg || ''; el.classList.toggle('hidden', !msg); }
  }
  /** Validación silenciosa (sin reportValidity) para comprobar si un paso está completo */
  function validateStepSilent(stepIndex){
    var fields = getStepFields(stepIndex);
    for (var fi = 0; fi < fields.length; fi++) {
      if (!fields[fi].checkValidity()) return false;
    }
    if (stepIndex === 0) {
      if (!pdfInput || !pdfInput.files || !pdfInput.files[0]) return false;
    }
    if (stepIndex === 2) {
      var elLat = form.elements.addressLat;
      var elLng = form.elements.addressLng;
      var lat = (elLat && elLat.value) ? String(elLat.value).trim() : '';
      var lng = (elLng && elLng.value) ? String(elLng.value).trim() : '';
      if (!lat || !lng) return false;
    }
    if (stepIndex === 1) {
      var elCp = form.elements.companyPhone;
      var elCell = form.elements.repCellPhone;
      var elConfirm = form.elements.confirmPhoneOwnership;
      var companyVal = (elCp && elCp.value) ? String(elCp.value).trim() : '';
      if (!companyVal) return false;
      var cellRes = isValidPanamaMobile(elCell ? elCell.value : '');
      if (!cellRes.valid) return false;
      if (!isKycCompleted()) return false;
      if (!elConfirm || !elConfirm.checked) return false;
    }
    return true;
  }
  function getFieldLabel(field){
    const id = field.id;
    if (id) {
      const label = document.querySelector('label[for="' + id + '"]');
      if (label) return label.textContent.replace(/\s*\*$/, '').trim();
    }
    const parent = field.closest('div');
    if (parent) {
      const label = parent.querySelector('label');
      if (label) return label.textContent.replace(/\s*\*$/, '').trim();
    }
    const name = field.name;
    const labels = { businessLegalName: 'Razón social', businessTradeName: 'Nombre comercial', taxId: 'RUT / NIT', businessType: 'Tipo de empresa', industry: 'Industria / rubro', yearsOperating: 'Años operando', businessDescriptionPdf: 'Aviso de operaciones (PDF)' };
    return labels[name] || name || 'campo';
  }
  function validateStep(stepIndex){
    var fields = getStepFields(stepIndex);
    for (var fi = 0; fi < fields.length; fi++) {
      var field = fields[fi];
      if (!field.checkValidity()) {
        var label = getFieldLabel(field);
        var customMsg = (field.validationMessage && field.validationMessage.trim()) ? field.validationMessage.trim() : '';
        var msg = customMsg || ('Falta completar: ' + label + '.');
        setMsg(msg, true);
        field.focus();
        try {
          if (document.body) field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {}
        field.reportValidity();
        return false;
      }
    }
    if (stepIndex === 0) {
      if (!pdfInput || !pdfInput.files || !pdfInput.files[0]) {
        setMsg('Falta completar: Aviso de operaciones (PDF). Debe cargar el documento PDF.', true);
        if (pdfInput) pdfInput.focus();
        try {
          if (document.body && pdfDropzone) pdfDropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {}
        return false;
      }
    }
        if (stepIndex === 2) {
          var elLat2 = form.elements.addressLat;
          var elLng2 = form.elements.addressLng;
          var lat2 = (elLat2 && elLat2.value) ? String(elLat2.value).trim() : '';
          var lng2 = (elLng2 && elLng2.value) ? String(elLng2.value).trim() : '';
          if (!lat2 || !lng2) {
            setMsg('Debe marcar la ubicación en el mapa moviendo el pin o usando "Usar mi ubicación".', true);
            return false;
          }
        }
        if (stepIndex === 1) {
          var elCp2 = form.elements.companyPhone;
          var elCell2 = form.elements.repCellPhone;
          var elConfirm2 = form.elements.confirmPhoneOwnership;
          var companyVal2 = (elCp2 && elCp2.value) ? String(elCp2.value).trim() : '';
          if (!companyVal2) { showPhoneError('companyPhone', 'Ingrese el teléfono de atención a clientes.'); setMsg('Ingrese el teléfono de atención a clientes.', true); return false; }
          showPhoneError('companyPhone', '');
          var cellRes2 = isValidPanamaMobile(elCell2 ? elCell2.value : '');
          if (!cellRes2.valid) { showPhoneError('repCellPhone', cellRes2.message); setMsg(cellRes2.message, true); return false; }
          showPhoneError('repCellPhone', '');
          if (!isKycCompleted()) { setMsg('Debe completar la verificación de identidad para continuar.', true); return false; }
          if (!elConfirm2 || !elConfirm2.checked) { setMsg('Debe confirmar que el número de celular es correcto.', true); return false; }
        }
    return true;
  }
  function goNext(){
    if (!validateStep(currentStep)) {
      return;
    }
    currentStep = Math.min(currentStep + 1, stepEls.length - 1);
    renderSteps();
    setMsg('');
    saveRecovery();
  }
  function goPrev(){
    currentStep = Math.max(currentStep - 1, 0);
    renderSteps();
    setMsg('');
    saveRecovery();
  }
  function renderSummary(){
    const data = readFormData();
    const items = [
      ['Razón social', data.businessLegalName],
      ['Nombre comercial', data.businessTradeName],
      ['RUT / NIT', data.taxId],
      ['Industria', data.industry],
      ['Descripción del negocio', data.businessDescriptionPdfName ? `Archivo: ${data.businessDescriptionPdfName}` : 'No adjuntado'],
      ['Representante', `${data.repName || ''} · ${data.repEmail || ''}`],
      ['Tel. atención clientes', data.companyPhone || '—'],
      ['Celular representante', data.repCellPhone || '—'],
      ['Ocupación rep. legal', data.repOcupacion || '—'],
      ['Actividad rep. legal', data.repActividad || '—'],
      ['Ubicación', [data.province, data.district, data.corregimiento].filter(Boolean).join(' / ')],
      ['Dirección', data.businessAddress || '—'],
      ['Coordenadas', (data.addressLat && data.addressLng) ? `${data.addressLat}, ${data.addressLng}` : '—'],
      ['Canal principal', data.channelType],
      ['Ventas estimadas', data.estimatedMonthlySales],
      ['Banco / cuenta', [data.bankName, data.bankAccountType, data.bankAccountNumber].filter(Boolean).join(' · ')],
      ['Integración API', data.needsApiIntegration ? 'Sí' : 'No'],
      ['Notas', data.additionalNotes || '—']
    ];
    summaryList.innerHTML = items.map(function(it){ return '<dt>' + esc(it[0]) + '</dt><dd>' + esc(it[1] || '—') + '</dd>'; }).join('');
  }
  function buildApplication(status){
    const data = readFormData();
    const kyc = getKycStatus();
    return {
      id: applicationId,
      type: 'agent_onboarding',
      status: status || 'draft',
      submittedAt: status === 'pending_review' ? now() : null,
      updatedAt: now(),
      createdAt: now(),
      review: {
        state: status === 'pending_review' ? 'pending' : 'draft',
        approvedBy: null,
        approvedAt: null,
        rejectionReason: ''
      },
      credentials: {
        username: '',
        temporaryPassword: '',
        linkedAgentId: null,
        linkedUserId: null
      },
      onboarding: data,
      kycVerification: kyc ? {
        identityId: kyc.identityId,
        verificationId: kyc.verificationId,
        status: kyc.status,
        error: kyc.error || null,
        completedAt: kyc.completedAt,
        updatedAt: kyc.updatedAt
      } : null
    };
  }
  function persist(status){
    const items = readApplications();
    const payload = buildApplication(status);
    var idx = items.findIndex(function(item){ return item.id === applicationId; });
    if (idx >= 0) {
      payload.createdAt = items[idx].createdAt || payload.createdAt;
      payload.credentials = items[idx].credentials || payload.credentials;
      items[idx] = payload;
    } else {
      items.unshift(payload);
    }
    writeApplications(items);
    applicationCodeEl.textContent = applicationId;
    draftStatusEl.textContent = status === 'pending_review' ? 'Enviado a revisión' : 'Borrador guardado';
    draftStatusEl.classList.remove('ob-status-unsaved');
    draftStatusEl.classList.add('ob-status-saved');
    return payload;
  }
  function resetFormAfterSubmit(){
    try { sessionStorage.removeItem(RECOVERY_KEY); } catch(_){}
    clearPdfFromIndexedDB(function(){});
    form.reset();
    currentStep = 0;
    applicationId = `oba_${Math.random().toString(16).slice(2,8)}_${Date.now().toString(16)}`;
    applicationCodeEl.textContent = applicationId;
    draftStatusEl.textContent = 'Sin guardar';
    draftStatusEl.classList.remove('ob-status-saved');
    draftStatusEl.classList.add('ob-status-unsaved');
    prefillFromAccess();
    renderSteps();
  }

  function prefillFromAccess(){
    const ctx = readAccessContext();
    if (!ctx) return false;
    if (form.elements.repEmail && !form.elements.repEmail.value) form.elements.repEmail.value = ctx.email || '';
    if (form.elements.repCellPhone && !form.elements.repCellPhone.value) form.elements.repCellPhone.value = ctx.phone || '';
    if (form.elements.businessTradeName && !form.elements.businessTradeName.value) form.elements.businessTradeName.value = ctx.businessName || '';
    if (form.elements.businessLegalName && !form.elements.businessLegalName.value) form.elements.businessLegalName.value = ctx.businessName || '';
    return true;
  }

  if (prevBtn) prevBtn.addEventListener('click', function(e) { e.preventDefault(); goPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (!form) { setMsg('Error de configuración: formulario no encontrado.', true); return; }
      goNext();
    } catch (err) {
      console.error('goNext error:', err);
      setMsg('Error al avanzar. Abra la consola (F12) para más detalles.', true);
    }
  });
  saveDraftBtn.addEventListener('click', function() {
    try {
      persist('draft');
      window.__metamapModalOpen = false;
      window.__formSavedAfterDraft = true;
      setMsg('Borrador guardado. Puede recargar sin perder datos.', false);
    } catch (err) {
      setMsg('Error al guardar. Revise la consola (F12).', true);
      console.error('persist error:', err);
    }
  });
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    for (let i = 0; i < stepEls.length - 1; i += 1) {
      if (!validateStep(i)) {
        currentStep = i;
        renderSteps();
        setMsg('Completa los campos obligatorios antes de enviar.', true);
        return;
      }
    }
    persist('pending_review');
    setMsg('Solicitud enviada a revisión. Las credenciales se asignarán solo después de aprobación.');
    resetFormAfterSubmit();
  });

  const accessContext = readAccessContext();
  if (!accessContext) {
    location.href = 'onboarding-access.html';
    return;
  }

  if (!accessContext.emailVerified) {
    location.href = 'onboarding-access.html';
    return;
  }

  applicationCodeEl.textContent = applicationId;
  if (!restoreRecovery()) {
    prefillFromAccess();
    renderSteps();
  }
  form.addEventListener('input', function(){ saveRecovery(); updateFieldChecks(); });
  form.addEventListener('change', function(){ saveRecovery(); updateFieldChecks(); });

  function updateFieldChecks() {
    var stepEl = stepEls[currentStep];
    if (!stepEl) return;
    var fields = getStepFields(currentStep);
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var wrap = field.closest('.ob-field-wrap');
      if (!wrap) continue;
      var check = wrap.querySelector('.ob-field-check');
      if (!check) continue;
      var valid = field.checkValidity();
      if (currentStep === 1 && field.name === 'repCellPhone') {
        valid = valid && isValidPanamaMobile(field.value || '').valid;
      }
      if (currentStep === 1 && field.name === 'confirmPhoneOwnership') {
        var elCell = form.elements.repCellPhone;
        valid = valid && elCell && isValidPanamaMobile(elCell.value).valid && field.checked;
      }
      check.classList.toggle('-ok', !!valid);
    }
  }
  function setupFieldChecks() {
    for (var s = 0; s < stepEls.length; s++) {
      var stepEl = stepEls[s];
      var fields = stepEl.querySelectorAll('input, select, textarea');
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (field.type === 'button' || field.type === 'submit' || field.type === 'file' || field.disabled) continue;
        var wrap = field.closest('.ob-field-wrap');
        if (!wrap) {
          wrap = document.createElement('div');
          wrap.className = 'ob-field-wrap';
          field.parentNode.insertBefore(wrap, field);
          wrap.appendChild(field);
          var check = document.createElement('span');
          check.className = 'ob-field-check';
          check.setAttribute('aria-hidden', 'true');
          check.innerHTML = '&#10003;';
          wrap.appendChild(check);
        }
      }
    }
  }
  setupFieldChecks();
  var elPhone = form.elements.companyPhone;
  if (elPhone) elPhone.addEventListener('blur', function(){ if ((this.value||'').trim()) showPhoneError('companyPhone', ''); });
  var elCell = form.elements.repCellPhone;
  if (elCell) { elCell.addEventListener('blur', function(){ var r = isValidPanamaMobile(this.value); showPhoneError('repCellPhone', r.valid ? '' : r.message); }); elCell.addEventListener('input', function(){ if (isValidPanamaMobile(this.value).valid) showPhoneError('repCellPhone', ''); }); }
  setupPdfUpload();
  let addressMapInstance = null;
  let addressMarker = null;
  const PANAMA_CENTER = [8.9945, -79.5199];
  function initAddressMapIfNeeded(){
    var addrInput = document.getElementById('addressSearch');
    var addrHidden = document.getElementById('businessAddress');
    if (addrInput && addrHidden && addrHidden.value && !addrInput.value) addrInput.value = addrHidden.value;
    const mapEl = document.getElementById('addressMap');
    const latEl = document.getElementById('addressLat');
    const lngEl = document.getElementById('addressLng');
    const coordsDisplay = document.getElementById('mapCoordsDisplay');
    if (!mapEl) return;
    if (!window.L) { setTimeout(initAddressMapIfNeeded, 300); return; }
    if (addressMapInstance) {
      addressMapInstance.invalidateSize();
      return;
    }
    var savedLat = parseFloat(latEl && latEl.value ? latEl.value : '');
    var savedLng = parseFloat(lngEl && lngEl.value ? lngEl.value : '');
    const startCenter = (!isNaN(savedLat) && !isNaN(savedLng)) ? [savedLat, savedLng] : PANAMA_CENTER;
    addressMapInstance = L.map('addressMap').setView(startCenter, 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(addressMapInstance);
    const markerIcon = L.divIcon({ className: 'ob-marker', html: '<div style="width:32px;height:32px;background:#5462e6;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 10px rgba(0,0,0,.3);"></div>', iconSize: [32,32], iconAnchor: [16,16] });
    addressMarker = L.marker(startCenter, { draggable: true, icon: markerIcon }).addTo(addressMapInstance);
    if (!isNaN(savedLat) && !isNaN(savedLng)) {
      addressMarker.setLatLng([savedLat, savedLng]);
      addressMapInstance.setView([savedLat, savedLng], 14);
    }
    function updateCoords(latLng){
      const lat = latLng.lat.toFixed(6);
      const lng = latLng.lng.toFixed(6);
      if (latEl) latEl.value = lat;
      if (lngEl) lngEl.value = lng;
      if (coordsDisplay) coordsDisplay.textContent = lat + ', ' + lng;
    }
    addressMarker.on('dragend', function(e){ updateCoords(e.target.getLatLng()); saveRecovery(); });
    updateCoords(addressMarker.getLatLng());
    setTimeout(function(){ if (addressMapInstance) addressMapInstance.invalidateSize(); }, 200);
    window.__obSetAddressFromGeocode = function(lat, lng){
      var latEl = document.getElementById('addressLat');
      var lngEl = document.getElementById('addressLng');
      var cd = document.getElementById('mapCoordsDisplay');
      if (latEl) latEl.value = lat; if (lngEl) lngEl.value = lng;
      if (cd) cd.textContent = lat + ', ' + lng;
      if (addressMarker) addressMarker.setLatLng([lat, lng]);
      if (addressMapInstance) addressMapInstance.setView([lat, lng], 17);
      saveRecovery();
    };
    var btnLoc = document.getElementById('btnUseMyLocation');
    if (btnLoc) btnLoc.addEventListener('click', function(){
      if (!navigator.geolocation) { setMsg('Su navegador no admite geolocalización.', true); return; }
      this.disabled = true;
      navigator.geolocation.getCurrentPosition(
        function(pos){
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          addressMarker.setLatLng([lat, lng]);
          addressMapInstance.setView([lat, lng], 17);
          updateCoords({ lat, lng });
          saveRecovery();
          document.getElementById('btnUseMyLocation').disabled = false;
          setMsg('Ubicación actualizada.', false);
        },
        function(){ setMsg('No se pudo obtener la ubicación. Verifique los permisos.', true); document.getElementById('btnUseMyLocation').disabled = false; }
      );
    });
  }
  var elRepEmail = form.elements.repEmail;
  if (elRepEmail) { elRepEmail.addEventListener('input', function(){ if (currentStep === 1) updateMetamapMetadata(); }); elRepEmail.addEventListener('change', function(){ if (currentStep === 1) updateMetamapMetadata(); }); }
  window.addEventListener('beforeunload', function(e) {
    if (window.__metamapModalOpen) e.preventDefault();
  });
  var portalLink = document.getElementById('portalLink');
  if (portalLink) portalLink.addEventListener('click', function(e) {
    if (window.__metamapModalOpen) {
      e.preventDefault();
      e.stopPropagation();
      setMsg('Complete o cancele la verificación de identidad antes de salir.', true);
    }
  }, true);
  const metamapBtn = document.getElementById('metamap-btn');
  if (metamapBtn) {
    metamapBtn.addEventListener('metamap:userStartedSdk', function() {
      setMetamapModalOpen(true);
      setMsg('Complete la verificación. No cierre ni actualice la página.', false);
    });
    metamapBtn.addEventListener('metamap:userFinishedSdk', function(e) {
      setMetamapModalOpen(false);
      var d = e.detail || {};
      var identityId = d.identityId || d.identity_id;
      var verificationId = d.verificationId || d.verification_id;
      if (!verificationId) {
        console.warn('Metamap userFinishedSdk: sin verificationId. detail=', d);
        setMsg('No se recibió el ID de verificación. Intente de nuevo.', true);
        return;
      }
      setKycStatus({
        status: 'completed',
        identityId: identityId,
        verificationId: verificationId,
        completedAt: Date.now()
      });
      renderKycStatus();
      setMsg('Tu verificación fue enviada con éxito. Puede continuar.', false);
    });
    metamapBtn.addEventListener('metamap:exitedSdk', function() {
      setMetamapModalOpen(false);
      setMsg('', false);
    });
  }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}();
