(function(){
  function init(){
  const APPLICATIONS_KEY = 'pp_onboarding_applications_v1';
  const ACCESS_KEY = 'pp_onboarding_access_v1';
  const RECOVERY_KEY = 'pp_onboarding_recovery_v1';
  const CURRENT_APPLICATION_KEY = 'pp_onboarding_current_app_v1';
  const steps = [
    { title: 'Comercio', desc: 'Estructura, empresa y aviso de operaciones (PDF)' },
    { title: 'Contactos', desc: 'Representante, teléfono empresa y celular' },
    { title: 'Dirección', desc: 'Provincia, distrito, mapa y ubicación exacta' },
    { title: 'Cuenta para liquidación', desc: 'Banco o fintech donde recibirá sus comisiones' },
    { title: 'Conocimiento del cliente', desc: 'Ingresos, montos, origen y procedencia de fondos' }
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
  function getCurrentApplicationId(){
    try { return localStorage.getItem(CURRENT_APPLICATION_KEY) || ''; }
    catch (e) { return ''; }
  }
  function setCurrentApplicationId(id){
    try {
      if (!id) localStorage.removeItem(CURRENT_APPLICATION_KEY);
      else localStorage.setItem(CURRENT_APPLICATION_KEY, id);
    } catch (e) {}
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
  }
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
      syncAddressFieldFromStoredValue();
      applicationCodeEl.textContent = applicationId;
      renderSteps();
      setMsg('Progreso restaurado. Puede continuar donde lo dejó.', false);
      restorePdfFromIndexedDB(function(){});
      return true;
    } catch (e) { return false; }
  }
  function applySavedApplication(saved){
    if (!saved || !saved.onboarding) return false;
    applicationId = saved.id || applicationId;
    currentStep = Math.min(Math.max(0, saved.currentStep || 0), stepEls.length - 1);
    const d = saved.onboarding || {};
    for (const k in d) {
      const el = form.elements[k];
      if (!el) continue;
      if (el.type === 'checkbox') el.checked = !!d[k];
      else if (el.type === 'radio') el.checked = (el.value === d[k]);
      else if (el.type !== 'file' && el.value !== d[k]) el.value = d[k] || '';
    }
    syncAddressFieldFromStoredValue();
    if (saved.kycVerification) {
      setKycStatus(saved.kycVerification);
    }
    applicationCodeEl.textContent = applicationId;
    draftStatusEl.textContent = saved.status === 'pending_review' ? 'Enviado a revisión' : 'Guardado';
    draftStatusEl.classList.remove('ob-status-unsaved');
    draftStatusEl.classList.add('ob-status-saved');
    setCurrentApplicationId(applicationId);
    renderSteps();
    restorePdfFromIndexedDB(function(){});
    updateFieldChecks();
    setMsg('Borrador guardado restaurado. Puede continuar donde lo dejó.', false);
    return true;
  }
  function restoreSavedApplication(){
    try {
      const items = readApplications();
      if (!items.length) return false;
      const currentId = getCurrentApplicationId();
      var saved = null;
      if (currentId) {
        saved = items.find(function(item){
          return item && item.type === 'agent_onboarding' && item.id === currentId;
        }) || null;
      }
      if (!saved) {
        saved = items.find(function(item){
          return item && item.type === 'agent_onboarding' && (item.status === 'draft' || item.status === 'pending_review');
        }) || null;
      }
      return applySavedApplication(saved);
    } catch (e) { return false; }
  }
  function setMsg(msg, isError){
    var banner = document.getElementById('ob-step-error-banner');
    if (banner) {
      banner.textContent = msg || '';
      banner.classList.toggle('hidden', !(msg && isError));
      if (msg && isError) {
        try { if (document.body) banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (e) {}
      }
    }
    if (formMsg) {
      if (isError) {
        formMsg.textContent = '';
        formMsg.classList.add('hidden');
      } else {
        formMsg.textContent = msg || '';
        formMsg.className = 'text-sm min-h-[20px] mt-2 text-slate-600';
        formMsg.classList.remove('hidden');
      }
    }
  }
  function syncAddressFieldFromStoredValue(){
    var addrInput = document.getElementById('addressSearch');
    var addrHidden = document.getElementById('businessAddress');
    if (!addrInput || !addrHidden) return;
    var savedValue = (addrHidden.value || '').trim();
    addrInput.value = savedValue;
    addrInput.dataset.addressSelected = savedValue ? 'true' : 'false';
  }
  function getFirstIncompleteStepBefore(targetIdx){
    for (var i = 0; i < targetIdx; i++) {
      if (!validateStepSilent(i)) return i;
    }
    return -1;
  }
  function goToStep(idx){
    if (idx < 0 || idx >= stepEls.length || idx === currentStep) return;
    if (metamapModalOpen) return;
    var firstIncomplete = getFirstIncompleteStepBefore(idx);
    if (firstIncomplete >= 0) {
      currentStep = firstIncomplete;
      renderSteps();
      setMsg('No puede entrar a "' + steps[idx].title + '" todavía. Complete antes la etapa "' + steps[firstIncomplete].title + '".', true);
      return;
    }
    currentStep = idx;
    renderSteps();
    setMsg('', false);
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
  function markKycAsSent(identityId, verificationId){
    setKycStatus({
      status: 'enviado',
      identityId: identityId || null,
      verificationId: verificationId || null,
      completedAt: Date.now()
    });
    renderKycStatus();
    setMsg('Tu verificación fue enviada. Puede continuar con el proceso.', false);
  }
  function markKycAsPending(){
    setKycStatus(null);
    renderKycStatus();
    setMsg('La verificación no fue completada. Puede intentarlo nuevamente.', true);
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
  function isKycCompleted(){
    if (/[?&]modo_prueba=1/i.test(window.location.search || '')) return true;
    const k = getKycStatus();
    return !!(k && (k.verificationId || k.status === 'enviado' || k.status === 'submitted' || k.status === 'completed'));
  }
  function renderKycSentPanel(panelEl){
    if (!panelEl) return;
    panelEl.innerHTML = [
      '<div class="kyc-status-loading kyc-status-approved flex items-center gap-3 p-4 rounded-xl">',
      '  <i class="fa-solid fa-circle-check text-emerald-600 text-2xl"></i>',
      '  <div>',
      '    <div class="font-semibold text-emerald-800">Verificación enviada</div>',
      '    <div class="text-sm text-emerald-700 mt-0.5">Su verificación fue enviada correctamente. Puede continuar con el proceso.</div>',
      '  </div>',
      '</div>'
    ].join('');
  }
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
    if (completed) renderKycSentPanel(panelEl);
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
    if (prevBtn) { prevBtn.disabled = open ? true : (currentStep === 0); prevBtn.classList.toggle('is-hidden', currentStep === 0); prevBtn.style.display = (currentStep === 0) ? 'none' : ''; prevBtn.setAttribute('aria-hidden', currentStep === 0 ? 'true' : 'false'); }
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
    if (prevBtn) {
      prevBtn.disabled = currentStep === 0;
      prevBtn.classList.toggle('is-hidden', currentStep === 0);
      prevBtn.style.display = currentStep === 0 ? 'none' : '';
      prevBtn.setAttribute('aria-hidden', currentStep === 0 ? 'true' : 'false');
    }
    nextBtn.classList.toggle('is-hidden', currentStep === stepEls.length - 1);
    var canShowSubmit = (currentStep === stepEls.length - 1) && [0,1,2,3,4].every(function(i){ return validateStepSilent(i); });
    submitBtn.classList.toggle('is-hidden', !canShowSubmit);
    submitBtn.setAttribute('aria-hidden', canShowSubmit ? 'false' : 'true');
    if (currentStep === stepEls.length - 1) renderSummary();
    if (currentStep === 1) { updateMetamapMetadata(); renderKycStatus(); }
    if (currentStep === 2) {
      var latEl = form.elements.addressLat, lngEl = form.elements.addressLng;
      var box = document.getElementById('mapCoordsBox');
      var cd = document.getElementById('mapCoordsDisplay');
      if (box && cd && latEl && lngEl && latEl.value && lngEl.value) {
        cd.textContent = latEl.value + ', ' + lngEl.value;
        box.style.display = 'flex';
        box.classList.remove('hidden');
      }
    }
    if (currentStep === 3) updateBankFintechFields();
    if (currentStep === 4) updateKycOtroFields();
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
      if (pdfDropzone) pdfDropzone.classList.remove('ob-field-invalid');
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
  function isValidEmail(v) {
    var s = (v || '').toString().trim();
    if (!s) return { valid: false, message: 'Ingrese un correo válido.' };
    var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(s)) return { valid: false, message: 'Formato de correo inválido (ej: nombre@dominio.com).' };
    return { valid: true };
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
    if (stepIndex === 3) {
      var elSett = form.elements.settlementEmail;
      if (!isValidEmail(elSett ? elSett.value : '').valid) return false;
    }
    if (stepIndex === 4) {
      if (form.elements.fundsSource && form.elements.fundsSource.value === 'otro') {
        var otherSource = (form.elements.fundsSourceOther && form.elements.fundsSourceOther.value) ? String(form.elements.fundsSourceOther.value).trim() : '';
        if (!otherSource) return false;
      }
      if (form.elements.fundsCountry && form.elements.fundsCountry.value === 'Otro') {
        var otherCountry = (form.elements.fundsCountryOther && form.elements.fundsCountryOther.value) ? String(form.elements.fundsCountryOther.value).trim() : '';
        if (!otherCountry) return false;
      }
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
    const labels = { businessLegalName: 'Razón social', businessTradeName: 'Nombre comercial', taxId: 'RUT / NIT', businessType: 'Tipo de empresa', industry: 'Industria / rubro', yearsOperating: 'Años operando', businessDescriptionPdf: 'Aviso de operaciones (PDF)', monthlyIncome: 'Ingresos mensuales', monthlyTransfersAmount: 'Montos de envíos o movimientos mensuales', fundsSource: 'De dónde proviene el dinero', fundsOrigin: 'Origen de los fondos', fundsCountry: 'Procedencia de los fondos (país)' };
    return labels[name] || name || 'campo';
  }
  function clearFieldInvalidClass() {
    document.querySelectorAll('.ob-field-invalid').forEach(function(el) { el.classList.remove('ob-field-invalid'); });
    if (pdfDropzone) pdfDropzone.classList.remove('ob-field-invalid');
  }
  function validateStep(stepIndex){
    clearFieldInvalidClass();
    var fields = getStepFields(stepIndex);
    for (var fi = 0; fi < fields.length; fi++) {
      var field = fields[fi];
      if (!field.checkValidity()) {
        var label = getFieldLabel(field);
        var customMsg = (field.validationMessage && field.validationMessage.trim()) ? field.validationMessage.trim() : '';
        var msg = '\u26A0\uFE0F Falta completar: ' + label + '.';
        if (customMsg) msg += ' ' + customMsg;
        setMsg(msg, true);
        var wrap = field.closest('.ob-field-wrap') || field.parentElement;
        if (wrap) wrap.classList.add('ob-field-invalid');
        else field.classList.add('ob-field-invalid');
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
        setMsg('\u26A0\uFE0F Falta completar: Aviso de operaciones (PDF). Debe cargar el documento PDF.', true);
        if (pdfDropzone) pdfDropzone.classList.add('ob-field-invalid');
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
            setMsg('\u26A0\uFE0F Falta completar: Ubicación en mapa. Marque la ubicación moviendo el pin o usando "Leer mi ubicación".', true);
            var mapWrap = document.getElementById('addressMap') || document.querySelector('.ob-map-section');
            if (mapWrap) mapWrap.classList.add('ob-field-invalid');
            return false;
          }
        }
        if (stepIndex === 1) {
          var elCp2 = form.elements.companyPhone;
          var elCell2 = form.elements.repCellPhone;
          var elConfirm2 = form.elements.confirmPhoneOwnership;
          var companyVal2 = (elCp2 && elCp2.value) ? String(elCp2.value).trim() : '';
          if (!companyVal2) { showPhoneError('companyPhone', 'Ingrese el teléfono de atención a clientes.'); setMsg('\u26A0\uFE0F Falta completar: Teléfono de atención a clientes.', true); var w=elCp2.closest('.ob-field-wrap');if(w)w.classList.add('ob-field-invalid');else if(elCp2)elCp2.classList.add('ob-field-invalid'); return false; }
          showPhoneError('companyPhone', '');
          var cellRes2 = isValidPanamaMobile(elCell2 ? elCell2.value : '');
          if (!cellRes2.valid) { showPhoneError('repCellPhone', cellRes2.message); setMsg('\u26A0\uFE0F ' + cellRes2.message, true); var w2=elCell2.closest('.ob-field-wrap');if(w2)w2.classList.add('ob-field-invalid');else if(elCell2)elCell2.classList.add('ob-field-invalid'); return false; }
          showPhoneError('repCellPhone', '');
          if (!isKycCompleted()) { setMsg('\u26A0\uFE0F Falta completar: Verificación de identidad (KYC).', true); return false; }
          if (!elConfirm2 || !elConfirm2.checked) { setMsg('\u26A0\uFE0F Falta completar: Debe confirmar que el número de celular es correcto.', true); return false; }
        }
        if (stepIndex === 3) {
          var elSett2 = form.elements.settlementEmail;
          var emailRes = isValidEmail(elSett2 ? elSett2.value : '');
          if (!emailRes.valid) {
            var errEl = document.getElementById('settlementEmailError');
            if (errEl) { errEl.textContent = emailRes.message; errEl.classList.remove('hidden'); }
            setMsg('\u26A0\uFE0F Falta completar: Correo para liquidaciones. ' + emailRes.message, true);
            var w3 = elSett2 ? elSett2.closest('.ob-field-wrap') : null;
            if (w3) w3.classList.add('ob-field-invalid'); else if (elSett2) elSett2.classList.add('ob-field-invalid');
            if (elSett2) elSett2.focus();
            return false;
          }
          var errEl2 = document.getElementById('settlementEmailError');
          if (errEl2) { errEl2.textContent = ''; errEl2.classList.add('hidden'); }
        }
        if (stepIndex === 4) {
          if (form.elements.fundsSource && form.elements.fundsSource.value === 'otro') {
            var otherSource2 = (form.elements.fundsSourceOther && form.elements.fundsSourceOther.value) ? String(form.elements.fundsSourceOther.value).trim() : '';
            if (!otherSource2) {
              setMsg('\u26A0\uFE0F Falta completar: Especifique a qué se refiere en "De dónde proviene el dinero".', true);
              var elOther = form.elements.fundsSourceOther;
              if (elOther) { elOther.focus(); elOther.reportValidity(); var wo=elOther.closest('.ob-field-wrap');if(wo)wo.classList.add('ob-field-invalid'); }
              return false;
            }
          }
          if (form.elements.fundsCountry && form.elements.fundsCountry.value === 'Otro') {
            var otherCountry2 = (form.elements.fundsCountryOther && form.elements.fundsCountryOther.value) ? String(form.elements.fundsCountryOther.value).trim() : '';
            if (!otherCountry2) {
              setMsg('\u26A0\uFE0F Falta completar: Especifique el país de procedencia de los fondos.', true);
              var elOtherC = form.elements.fundsCountryOther;
              if (elOtherC) { elOtherC.focus(); elOtherC.reportValidity(); var woc=elOtherC.closest('.ob-field-wrap');if(woc)woc.classList.add('ob-field-invalid'); }
              return false;
            }
          }
        }
    return true;
  }
  function goNext(){
    if (!validateStep(currentStep)) {
      return;
    }
    clearFieldInvalidClass();
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
  window.__obAdvanceToNext = function(){
    try { goNext(); }
    catch(e){ console.error('goNext error:',e); if(window.__obMinimalAdvance)window.__obMinimalAdvance(); }
  };
  window.__obAdvanceToPrev = function(){
    try { goPrev(); }
    catch(e){ console.error('goPrev error:',e); if(window.__obMinimalPrev)window.__obMinimalPrev(); }
  };
  window.__obGoNext = window.__obAdvanceToNext;
  window.__obGoPrev = window.__obAdvanceToPrev;
  var KYC_LABELS = {
    monthlyIncome: { menos_500: 'Menos de $500', '500_1000': '$500 – $1,000', '1000_2500': '$1,000 – $2,500', '2500_5000': '$2,500 – $5,000', '5000_10000': '$5,000 – $10,000', mas_10000: 'Más de $10,000' },
    fundsSource: { salario: 'Salario', familiares: 'Familiares', negocio_propio: 'Negocio propio', inversiones: 'Inversiones', herencia: 'Herencia', otro: 'Otro' },
    fundsOrigin: { panama: 'Panamá', extranjero: 'Extranjero' }
  };
  function formatKycValue(field, val) {
    if (!val) return '—';
    var map = KYC_LABELS[field];
    return (map && map[val]) ? map[val] : val;
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
      ['Banco / fintech', (FINTECHS.indexOf(data.bankName) >= 0 ? [data.bankName, 'Tel: ' + (data.bankAccountNumber || '')] : [data.bankName, data.bankAccountType, data.bankAccountNumber]).filter(Boolean).join(' · ')],
      ['Correo liquidaciones', data.settlementEmail || '—'],
      ['Autorización APC', data.needsApiIntegration ? 'Sí' : 'No'],
      ['Ingresos mensuales', formatKycValue('monthlyIncome', data.monthlyIncome)],
      ['Montos de envíos/movimientos mensuales', formatKycValue('monthlyIncome', data.monthlyTransfersAmount)],
      ['Origen del dinero', (data.fundsSource === 'otro' && data.fundsSourceOther) ? 'Otro: ' + data.fundsSourceOther : formatKycValue('fundsSource', data.fundsSource)],
      ['Origen de fondos', formatKycValue('fundsOrigin', data.fundsOrigin)],
      ['Procedencia (país)', (data.fundsCountry === 'Otro' && data.fundsCountryOther) ? 'Otro: ' + data.fundsCountryOther : (data.fundsCountry || '—')]
    ];
    summaryList.innerHTML = items.map(function(it){ return '<dt>' + esc(it[0]) + '</dt><dd>' + esc(it[1] || '—') + '</dd>'; }).join('');
  }
  function buildApplication(status, opts){
    const data = readFormData();
    const kyc = getKycStatus();
    var onboardingData = Object.assign({}, data);
    if (opts && (opts.signatureDataUrl || opts.consentAccepted !== undefined)) {
      onboardingData.signatureDataUrl = opts.signatureDataUrl || null;
      onboardingData.consentAccepted = !!opts.consentAccepted;
      onboardingData.consentedAt = opts.consentedAt || null;
    }
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
      onboarding: onboardingData,
      currentStep: currentStep,
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
  function persist(status, opts){
    const items = readApplications();
    const payload = buildApplication(status, opts);
    var idx = items.findIndex(function(item){ return item.id === applicationId; });
    if (idx >= 0) {
      payload.createdAt = items[idx].createdAt || payload.createdAt;
      payload.credentials = items[idx].credentials || payload.credentials;
      items[idx] = payload;
    } else {
      items.unshift(payload);
    }
    writeApplications(items);
    setCurrentApplicationId(applicationId);
    applicationCodeEl.textContent = applicationId;
    draftStatusEl.textContent = status === 'pending_review' ? 'Enviado a revisión' : 'Guardado';
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
    setCurrentApplicationId(applicationId);
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

  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) { e.preventDefault(); goPrev(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
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
  }
  if (saveDraftBtn) saveDraftBtn.addEventListener('click', function() {
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
  function triggerSignatureFlow() {
    var preview = /[?&]preview=firma/i.test(window.location.search || '');
    if (!preview) {
      for (let i = 0; i < stepEls.length; i += 1) {
        if (!validateStep(i)) {
          currentStep = i;
          renderSteps();
          setMsg('No se puede abrir la firma: debe completar Comercio, Contactos, Dirección, Cuenta para liquidación y Conocimiento del cliente con los datos obligatorios.', true);
          return;
        }
      }
    }
    renderSummary();
    openSignatureModal();
  }
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    triggerSignatureFlow();
  });
  var btnOpenSig = document.getElementById('btnOpenSignatureModal');
  if (btnOpenSig) btnOpenSig.addEventListener('click', function(e) {
    e.preventDefault();
    triggerSignatureFlow();
  });

  function openSignatureModal() {
    var modal = document.getElementById('signatureModal');
    var summaryTarget = document.getElementById('signatureModalSummary');
    if (summaryTarget && summaryList) summaryTarget.innerHTML = summaryList.innerHTML;
    var consentChk = document.getElementById('signatureConsentCheck');
    var submitBtn = document.getElementById('signatureModalSubmit');
    var canvas = document.getElementById('signatureCanvas');
    if (consentChk) consentChk.checked = false;
    if (submitBtn) submitBtn.disabled = true;
    if (canvas) {
      var ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.__signatureHasStroke = false;
    }
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    }
    updateSignatureSubmitState();
  }
  function closeSignatureModal() {
    var modal = document.getElementById('signatureModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  function updateSignatureSubmitState() {
    var consentChk = document.getElementById('signatureConsentCheck');
    var submitBtn = document.getElementById('signatureModalSubmit');
    var canSubmit = consentChk && consentChk.checked && (window.__signatureHasStroke === true);
    if (submitBtn) submitBtn.disabled = !canSubmit;
  }
  function captureSignatureDataUrl() {
    var canvas = document.getElementById('signatureCanvas');
    if (!canvas || !window.__signatureHasStroke) return null;
    try { return canvas.toDataURL('image/png'); } catch (e) { return null; }
  }

  (function setupSignaturePad() {
    var canvas = document.getElementById('signatureCanvas');
    var consentChk = document.getElementById('signatureConsentCheck');
    var clearBtn = document.getElementById('signatureClearBtn');
    var cancelBtn = document.getElementById('signatureModalCancel');
    var submitBtn = document.getElementById('signatureModalSubmit');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    var drawing = false;
    var lastX = 0, lastY = 0;
    function getPos(e) {
      var r = canvas.getBoundingClientRect();
      var scaleX = canvas.width / r.width, scaleY = canvas.height / r.height;
      if (e.touches && e.touches[0]) {
        return { x: (e.touches[0].clientX - r.left) * scaleX, y: (e.touches[0].clientY - r.top) * scaleY };
      }
      return { x: (e.clientX - r.left) * scaleX, y: (e.clientY - r.top) * scaleY };
    }
    function startDraw(e) { e.preventDefault(); drawing = true; var p = getPos(e); lastX = p.x; lastY = p.y; }
    function draw(e) {
      e.preventDefault();
      if (!drawing) return;
      var p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastX = p.x; lastY = p.y;
      window.__signatureHasStroke = true;
      updateSignatureSubmitState();
    }
    function endDraw(e) { e.preventDefault(); drawing = false; }
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseout', endDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', endDraw, { passive: false });
    if (clearBtn) clearBtn.addEventListener('click', function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.__signatureHasStroke = false;
      updateSignatureSubmitState();
    });
    if (consentChk) consentChk.addEventListener('change', updateSignatureSubmitState);
    if (cancelBtn) cancelBtn.addEventListener('click', closeSignatureModal);
    if (submitBtn) submitBtn.addEventListener('click', function() {
      var dataUrl = captureSignatureDataUrl();
      if (!dataUrl) { setMsg('Debe firmar antes de enviar.', true); return; }
      closeSignatureModal();
      persist('pending_review', { signatureDataUrl: dataUrl, consentAccepted: true, consentedAt: now() });
      setMsg('Solicitud enviada a revisión. Las credenciales se asignarán solo después de aprobación.');
      resetFormAfterSubmit();
    });
  })();

  var FINTECHS = ['Kali', 'Punto Pago APP', 'Wally', 'Zinli'];
  function updateBankFintechFields() {
    var bankEl = document.getElementById('bankName') || form.elements.bankName;
    var typeWrap = document.getElementById('bankAccountTypeWrap');
    var numLabel = document.getElementById('bankAccountNumberLabel');
    var numInput = document.getElementById('bankAccountNumber') || form.elements.bankAccountNumber;
    var typeEl = form.elements.bankAccountType;
    var val = bankEl ? (bankEl.value || '').trim() : '';
    var isFintech = FINTECHS.indexOf(val) >= 0;
    if (typeWrap) {
      typeWrap.style.display = isFintech ? 'none' : 'block';
      typeWrap.classList.toggle('hidden', !!isFintech);
      typeWrap.setAttribute('aria-hidden', isFintech ? 'true' : 'false');
    }
    if (numLabel) numLabel.textContent = isFintech ? 'Número de teléfono *' : 'Número de cuenta *';
    if (numInput) {
      numInput.type = isFintech ? 'tel' : 'text';
      numInput.placeholder = isFintech ? '+507 6XXX XXXX' : '';
      numInput.setAttribute('inputmode', isFintech ? 'tel' : 'text');
      numInput.setAttribute('aria-label', isFintech ? 'Número de teléfono' : 'Número de cuenta');
    }
    if (typeEl) {
      typeEl.required = !isFintech;
      if (isFintech) typeEl.value = '';
    }
  }
  window.__obUpdateBankFintechFields = updateBankFintechFields;

  function updateKycOtroFields() {
    var fundsSourceEl = document.getElementById('fundsSource') || form.elements.fundsSource;
    var fundsCountryEl = document.getElementById('fundsCountry') || form.elements.fundsCountry;
    var wrapSource = document.getElementById('fundsSourceOtherWrap');
    var wrapCountry = document.getElementById('fundsCountryOtherWrap');
    var inputSource = document.getElementById('fundsSourceOther') || form.elements.fundsSourceOther;
    var inputCountry = document.getElementById('fundsCountryOther') || form.elements.fundsCountryOther;
    var showSource = (fundsSourceEl && String(fundsSourceEl.value) === 'otro');
    var showCountry = (fundsCountryEl && String(fundsCountryEl.value) === 'Otro');
    if (wrapSource) {
      wrapSource.classList.toggle('hidden', !showSource);
      wrapSource.style.display = showSource ? 'block' : 'none';
    }
    if (wrapCountry) {
      wrapCountry.classList.toggle('hidden', !showCountry);
      wrapCountry.style.display = showCountry ? 'block' : 'none';
    }
    if (inputSource) {
      inputSource.required = !!showSource;
      if (!showSource) inputSource.value = '';
    }
    if (inputCountry) {
      inputCountry.required = !!showCountry;
      if (!showCountry) inputCountry.value = '';
    }
  }
  window.__obUpdateKycOtroFields = updateKycOtroFields;

  var accessContext = readAccessContext();
  var modoPrueba = /[?&]modo_prueba=1/i.test(window.location.search || '') || (location.protocol === 'file:') || (location.hostname === 'localhost' || location.hostname === '127.0.0.1');
  if (!accessContext) {
    if (modoPrueba) {
      accessContext = { email: 'test@ejemplo.com', emailVerified: true, businessName: 'Test', phone: '+50761234567' };
      try { localStorage.setItem(ACCESS_KEY, JSON.stringify(accessContext)); } catch(e){}
    } else {
      location.href = 'onboarding-access.html';
      return;
    }
  }

  if (!accessContext.emailVerified && !modoPrueba) {
    location.href = 'onboarding-access.html';
    return;
  }

  applicationCodeEl.textContent = applicationId;
  if (!restoreRecovery() && !restoreSavedApplication()) {
    prefillFromAccess();
    renderSteps();
  }
  form.addEventListener('input', function(){ saveRecovery(); updateFieldChecks(); });
  form.addEventListener('change', function(e){
    saveRecovery();
    updateFieldChecks();
    if (e.target && e.target.name === 'bankName') updateBankFintechFields();
    if (e.target && (e.target.name === 'fundsSource' || e.target.name === 'fundsCountry')) updateKycOtroFields();
  });
  var elFundsSource = document.getElementById('fundsSource');
  var elFundsCountry = document.getElementById('fundsCountry');
  if (elFundsSource) elFundsSource.addEventListener('change', updateKycOtroFields);
  if (elFundsCountry) elFundsCountry.addEventListener('change', updateKycOtroFields);

  function updateFieldChecks() {
    var stepEl = stepEls[currentStep];
    if (!stepEl) return;
    var fields = getStepFields(currentStep);
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (!field || field.type === 'checkbox' || field.type === 'radio' || field.type === 'hidden' || field.type === 'file') continue;
      var wrap = field.closest('.ob-field-wrap');
      if (!wrap) continue;
      var check = wrap.querySelector('.ob-field-check');
      if (!check) continue;
      if (!field.required) {
        check.classList.remove('-ok');
        continue;
      }
      var valid = field.checkValidity();
      if (field.id === 'addressSearch') {
        valid = valid && field.dataset.addressSelected === 'true';
      }
      if (currentStep === 1 && field.name === 'repCellPhone') {
        valid = valid && isValidPanamaMobile(field.value || '').valid;
      }
      if (currentStep === 1 && field.name === 'confirmPhoneOwnership') {
        var elCell = form.elements.repCellPhone;
        valid = valid && elCell && isValidPanamaMobile(elCell.value).valid && field.checked;
      }
      if (currentStep === 3 && field.name === 'settlementEmail') {
        valid = valid && isValidEmail(field.value || '').valid;
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
        if (!field || field.disabled) continue;
        if (field.tagName === 'INPUT' && ['button','submit','file','checkbox','radio','hidden'].indexOf(field.type) >= 0) continue;
        if (!field.required) continue;
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
  var elSettlementEmail = form.elements.settlementEmail;
  if (elSettlementEmail) {
    elSettlementEmail.addEventListener('blur', function(){
      var r = isValidEmail(this.value);
      var errEl = document.getElementById('settlementEmailError');
      if (errEl) { errEl.textContent = r.valid ? '' : r.message; errEl.classList.toggle('hidden', r.valid); }
    });
    elSettlementEmail.addEventListener('input', function(){
      if (isValidEmail(this.value).valid) {
        var errEl = document.getElementById('settlementEmailError');
        if (errEl) { errEl.textContent = ''; errEl.classList.add('hidden'); }
      }
    });
  }
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
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap', maxZoom: 19 }).addTo(addressMapInstance);
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
      var box = document.getElementById('mapCoordsBox');
      if (latEl) latEl.value = lat; if (lngEl) lngEl.value = lng;
      if (cd) cd.textContent = lat + ', ' + lng;
      if (box) { box.style.display = 'flex'; box.classList.remove('hidden'); }
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
  window.__obInitAddressMap = initAddressMapIfNeeded;
  var mapModal = document.getElementById('mapModal');
  var mapPickerFrame = document.getElementById('mapPickerFrame');
  var btnOpenMap = document.getElementById('btnOpenMap');
  var mapModalClose = document.getElementById('mapModalClose');
  function closeMapModal(){
    if (mapModal) { mapModal.style.display = 'none'; mapModal.classList.add('hidden'); mapModal.setAttribute('aria-hidden', 'true'); }
    if (mapPickerFrame) mapPickerFrame.src = 'about:blank';
  }
  function applyMapCoordsFromPicker(lat, lng) {
    var latStr = (typeof lat === 'number' && !isNaN(lat)) ? lat.toFixed(6) : String(lat || '');
    var lngStr = (typeof lng === 'number' && !isNaN(lng)) ? lng.toFixed(6) : String(lng || '');
    var latEl = form.elements.addressLat, lngEl = form.elements.addressLng;
    var cd = document.getElementById('mapCoordsDisplay');
    var box = document.getElementById('mapCoordsBox');
    if (latEl) latEl.value = latStr; if (lngEl) lngEl.value = lngStr;
    if (cd) cd.textContent = latStr + ', ' + lngStr;
    if (box) { box.style.display = 'flex'; box.classList.remove('hidden'); }
    closeMapModal();
    saveRecovery();
    setMsg('Ubicación guardada.', false);
  }
  window.__obReceiveMapCoords = applyMapCoordsFromPicker;
  window.addEventListener('message', function(e){
    if (!e.data || e.data.type !== 'mapa-picker-done') return;
    applyMapCoordsFromPicker(e.data.lat, e.data.lng);
  });
  function openMapModal(){
    if (!mapModal || !mapPickerFrame) return;
    var latEl = form.elements.addressLat, lngEl = form.elements.addressLng;
    var lat = (latEl && latEl.value) ? parseFloat(latEl.value) : NaN;
    var lng = (lngEl && lngEl.value) ? parseFloat(lngEl.value) : NaN;
    var base = 'mapa-picker.html';
    var q = [];
    if (!isNaN(lat)) q.push('lat=' + lat);
    if (!isNaN(lng)) q.push('lng=' + lng);
    if (q.length) base += '?' + q.join('&');
    mapPickerFrame.src = base;
    mapModal.style.display = 'flex';
    mapModal.classList.remove('hidden');
    mapModal.setAttribute('aria-hidden', 'false');
  }
  window.__obOpenMapModal = openMapModal;
  if (mapModal && mapModalClose) {
    mapModalClose.addEventListener('click', closeMapModal);
  }
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);
  }
  function applyCoordsFromLocation(lat, lng, source, addressParts) {
    var latStr = parseFloat(lat).toFixed(6);
    var lngStr = parseFloat(lng).toFixed(6);
    var latEl = form.elements.addressLat, lngEl = form.elements.addressLng;
    var cd = document.getElementById('mapCoordsDisplay');
    var box = document.getElementById('mapCoordsBox');
    var btn = document.getElementById('btnUseMyLocationQuick');
    var btnText = document.getElementById('btnUseMyLocationQuickText');
    if (latEl) latEl.value = latStr;
    if (lngEl) lngEl.value = lngStr;
    if (cd) cd.textContent = latStr + ', ' + lngStr;
    if (box) { box.style.display = 'flex'; box.classList.remove('hidden'); }
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Leer mi ubicación';
    setLocationStatus('Ubicación guardada (' + source + ')', false);
    if (addressParts && addressParts.length) {
      var addrStr = addressParts.filter(Boolean).join(', ');
      var addrInput = document.getElementById('addressSearch');
      var addrHidden = form.elements.businessAddress;
      if (addrInput) addrInput.value = addrStr;
      if (addrHidden) addrHidden.value = addrStr;
    }
    saveRecovery();
    setMsg('Ubicación guardada (' + source + '). No necesita abrir el mapa.', false);
  }
  function setLocationStatus(txt, isError) {
    var el = document.getElementById('obLocationStatus');
    if (el) {
      el.textContent = txt || '';
      el.className = 'text-sm font-medium min-w-[200px] ' + (isError ? 'text-red-600' : 'text-slate-600');
    }
    if (txt) setMsg(txt, isError);
  }
  function readMyLocation() {
    var btn = document.getElementById('btnUseMyLocationQuick');
    var btnText = document.getElementById('btnUseMyLocationQuickText');
    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = 'Obteniendo...';
    setLocationStatus('Obteniendo ubicación...', false);
    if (isMobileDevice()) {
      if (!navigator.geolocation) {
        fetchLocationByIP(btn);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          applyCoordsFromLocation(pos.coords.latitude, pos.coords.longitude, 'GPS', null);
          if (btn) btn.disabled = false;
          if (btnText) btnText.textContent = 'Leer mi ubicación';
          setLocationStatus('', false);
        },
        function(err) {
          setLocationStatus('Permiso denegado. Intentando por IP...', false);
          fetchLocationByIP(btn);
        },
        { timeout: 10000, maximumAge: 60000 }
      );
    } else {
      fetchLocationByIP(btn);
    }
  }
  window.__obReadMyLocation = readMyLocation;
  function fetchLocationByIP(btn) {
    setLocationStatus('Obteniendo ubicación por IP...', false);
    function tryApply(data) {
      var lat = data.latitude != null ? data.latitude : data.lat;
      var lng = data.longitude != null ? data.longitude : data.lon;
      if (lat != null && lng != null && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng))) {
        var parts = [data.city, data.region_name || data.region, data.country_name || data.country].filter(Boolean);
        applyCoordsFromLocation(lat, lng, 'IP', parts);
        return true;
      }
      return false;
    }
    function onFail() {
      setLocationStatus('No se pudo obtener. Use "Abrir mapa" para ubicar manualmente.', true);
      if (btn) btn.disabled = false;
      var bt = document.getElementById('btnUseMyLocationQuickText');
      if (bt) bt.textContent = 'Leer mi ubicación';
    }
    function tryFetch(url) {
      return fetch(url).then(function(r) { return r.json(); });
    }
    tryFetch('https://ipapi.co/json/')
      .then(function(data) {
        if (tryApply(data)) {
          if (btn) btn.disabled = false;
          var bt = document.getElementById('btnUseMyLocationQuickText');
          if (bt) bt.textContent = 'Leer mi ubicación';
          return;
        }
        return tryFetch('https://reallyfreegeoip.org/json/');
      })
      .then(function(data2) {
        if (!data2) return;
        if (tryApply(data2)) {
          if (btn) btn.disabled = false;
          var bt = document.getElementById('btnUseMyLocationQuickText');
          if (bt) bt.textContent = 'Leer mi ubicación';
          return;
        }
        onFail();
      })
      .catch(function() {
        tryFetch('https://reallyfreegeoip.org/json/')
          .then(function(data3) {
            if (data3 && tryApply(data3)) {
              if (btn) btn.disabled = false;
              var bt = document.getElementById('btnUseMyLocationQuickText');
              if (bt) bt.textContent = 'Leer mi ubicación';
            } else {
              onFail();
            }
          })
          .catch(function() { onFail(); });
      });
  }
  var elRepEmail = form.elements.repEmail;
  if (elRepEmail) { elRepEmail.addEventListener('input', function(){ if (currentStep === 1) updateMetamapMetadata(); }); elRepEmail.addEventListener('change', function(){ if (currentStep === 1) updateMetamapMetadata(); }); }
  window.addEventListener('beforeunload', function(e) {
    if (window.__metamapModalOpen) e.preventDefault();
  });
  var btnRegresar = document.getElementById('btnRegresar');
  if (btnRegresar) btnRegresar.addEventListener('click', function(e) {
    if (window.__metamapModalOpen) {
      e.preventDefault();
      e.stopPropagation();
      setMsg('Complete o cancele la verificación de identidad antes de salir.', true);
    }
  }, true);
  var metamapBtn = document.getElementById('metamap-btn');
  var kycTriggerBtn = document.getElementById('kyc-trigger-btn');
  function startMetamapVerification(){
    updateMetamapMetadata();
    var btn = document.getElementById('metamap-btn');
    if (btn) {
      btn.click();
    } else {
      setMsg('Verificación no disponible. Recargue la página e intente de nuevo.', true);
    }
  }
  if (kycTriggerBtn) {
    kycTriggerBtn.addEventListener('click', function() { startMetamapVerification(); });
  }
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
      markKycAsSent(identityId, verificationId);
    });
    metamapBtn.addEventListener('metamap:exitedSdk', function() {
      setMetamapModalOpen(false);
      markKycAsPending();
    });
  }
  }
  function runInit() {
    try {
      init();
    } catch (err) {
      console.error('Onboarding init error:', err);
      var formMsg = document.getElementById('formMsg');
      if (formMsg) formMsg.textContent = 'Error al cargar. Abra la consola (F12) para detalles: ' + (err.message || err);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
  } else {
    runInit();
  }
})();
