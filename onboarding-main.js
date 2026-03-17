(function(){
  function init(){
  const APPLICATIONS_KEY = 'pp_onboarding_applications_v1';
  const ACCESS_KEY = 'pp_onboarding_access_v1';
  const RECOVERY_KEY = 'pp_onboarding_recovery_v1';
  const steps = [
    { title: 'Comercio', desc: 'Estructura, empresa y aviso de operaciones (PDF)' },
    { title: 'Contactos', desc: 'Representante, teléfono empresa y celular' },
    { title: 'Dirección', desc: 'Mapa, provincia, barrio y operación' },
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
  function esc(v){ return (v || '').toString().replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
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
    const fd = new FormData(form);
    const data = {};
    for (const [key, value] of fd.entries()) {
      if (data[key] !== undefined) continue;
      if (value instanceof File || value instanceof Blob) continue;
      data[key] = value;
    }
    data.acceptTerms = form.elements.acceptTerms.checked;
    data.needsApiIntegration = form.elements.needsApiIntegration.checked;
    data.confirmPhoneOwnership = form.elements.confirmPhoneOwnership?.checked || false;
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
    formMsg.textContent = msg || '';
    formMsg.className = `text-sm min-h-[20px] ${isError ? 'text-red-600' : 'text-slate-600'}`;
  }
  function goToStep(idx){
    if (idx < 0 || idx >= stepEls.length || idx === currentStep) return;
    if (metamapModalOpen) return;
    currentStep = idx;
    renderSteps();
    setMsg('');
    saveRecovery();
  }
  function renderIndicator(){
    if (!indicator) return;
    const html = steps.map((step, idx) => `
      <div class="ob-step ${idx === currentStep ? '-active' : ''} cursor-pointer" data-step-idx="${idx}" role="button" tabindex="0">
        <div class="ob-step-index">${idx + 1}</div>
        <div>
          <div class="font-extrabold text-sm">${esc(step.title)}</div>
          <div class="text-xs text-slate-500 mt-1">${esc(step.desc)}</div>
        </div>
      </div>`).join('');
    if (!html) return;
    indicator.innerHTML = html;
    indicator.querySelectorAll('.ob-step[data-step-idx]').forEach(el => {
      const idx = parseInt(el.getAttribute('data-step-idx'), 10);
      el.addEventListener('click', () => goToStep(idx));
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToStep(idx); } });
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
      else { all[applicationId] = { ...data, updatedAt: Date.now() }; }
      localStorage.setItem(KYC_STATUS_KEY, JSON.stringify(all));
    } catch (e) {}
  }
  window.setKycResult = function(appId, payload){
    try {
      const raw = localStorage.getItem(KYC_STATUS_KEY);
      const all = raw ? JSON.parse(raw) : {};
      all[appId] = { ...(all[appId] || {}), ...payload, updatedAt: Date.now() };
      localStorage.setItem(KYC_STATUS_KEY, JSON.stringify(all));
      if (appId === applicationId) renderKycStatus();
    } catch (e) {}
  };
  function isKycCompleted(){ const k = getKycStatus(); return !!(k && k.verificationId); }
  window.getKycVerificationsForSupabase = function(){
    try {
      const raw = localStorage.getItem(KYC_STATUS_KEY);
      const all = raw ? JSON.parse(raw) : {};
      return Object.entries(all).map(([appId, kyc]) => ({
        application_id: appId,
        identity_id: kyc.identityId || null,
        verification_id: kyc.verificationId || null,
        status: kyc.status || 'pending_review',
        error_message: kyc.error?.message || null,
        error_code: kyc.error?.code || null,
        error_type: kyc.error?.type || null,
        completed_at: kyc.completedAt || null,
        updated_at: kyc.updatedAt || null
      }));
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
    const repEmail = form.elements.repEmail?.value || '';
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
    stepEls.forEach((el, idx) => el.classList.toggle('is-hidden', idx !== currentStep));
    prevBtn.disabled = currentStep === 0;
    nextBtn.classList.toggle('is-hidden', currentStep === stepEls.length - 1);
    const canShowSubmit = (currentStep === stepEls.length - 1) && [0,1,2,3].every(i => validateStepSilent(i));
    submitBtn.classList.toggle('is-hidden', !canShowSubmit);
    submitBtn.setAttribute('aria-hidden', canShowSubmit ? 'false' : 'true');
    if (currentStep === stepEls.length - 1) renderSummary();
    if (currentStep === 1) { updateMetamapMetadata(); renderKycStatus(); }
    if (currentStep === 2) { initAddressMapIfNeeded(); }
    renderIndicator();
    updateProgress();
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
    function handleFiles(files){
      clearError();
      if (!files || !files[0]) return;
      const file = files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        pdfInput.value = '';
        showError('Solo se permiten archivos en formato PDF.');
        return;
      }
      const mb = (file.size / (1024 * 1024)).toFixed(2);
      showInfo(`Seleccionado: ${file.name} (${mb} MB)`);
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
    pdfInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });
  }
  function getStepFields(stepIndex){
    const stepEl = stepEls[stepIndex];
    if (!stepEl) return [];
    return Array.from(stepEl.querySelectorAll('input, select, textarea')).filter(el => el.type !== 'button' && el.type !== 'submit' && !el.disabled);
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
    const fields = getStepFields(stepIndex);
    for (const field of fields) {
      if (!field.checkValidity()) return false;
    }
    if (stepIndex === 2) {
      const lat = (form.elements.addressLat?.value || '').trim();
      const lng = (form.elements.addressLng?.value || '').trim();
      if (!lat || !lng) return false;
    }
    if (stepIndex === 1) {
      const companyVal = (form.elements.companyPhone?.value || '').trim();
      if (!companyVal) return false;
      const cellRes = isValidPanamaMobile(form.elements.repCellPhone?.value);
      if (!cellRes.valid) return false;
      if (!isKycCompleted()) return false;
      if (!form.elements.confirmPhoneOwnership?.checked) return false;
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
    const fields = getStepFields(stepIndex);
    for (const field of fields) {
      if (!field.checkValidity()) {
        const label = getFieldLabel(field);
        setMsg('Falta completar: ' + label + '.', true);
        field.focus();
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });
        field.reportValidity();
        return false;
      }
    }
        if (stepIndex === 2) {
          const lat = (form.elements.addressLat?.value || '').trim();
          const lng = (form.elements.addressLng?.value || '').trim();
          if (!lat || !lng) {
            setMsg('Debe marcar la ubicación en el mapa moviendo el pin o usando "Usar mi ubicación".', true);
            return false;
          }
        }
        if (stepIndex === 1) {
          const companyVal = (form.elements.companyPhone?.value || '').trim();
          if (!companyVal) { showPhoneError('companyPhone', 'Ingrese el teléfono de atención a clientes.'); setMsg('Ingrese el teléfono de atención a clientes.', true); return false; }
          showPhoneError('companyPhone', '');
          const cellRes = isValidPanamaMobile(form.elements.repCellPhone?.value);
          if (!cellRes.valid) { showPhoneError('repCellPhone', cellRes.message); setMsg(cellRes.message, true); return false; }
          showPhoneError('repCellPhone', '');
          if (!isKycCompleted()) { setMsg('Debe completar la verificación de identidad para continuar.', true); return false; }
          if (!form.elements.confirmPhoneOwnership?.checked) { setMsg('Debe confirmar que el número de celular es correcto.', true); return false; }
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
    summaryList.innerHTML = items.map(([label, value]) => `<dt>${esc(label)}</dt><dd>${esc(value || '—')}</dd>`).join('');
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
    const idx = items.findIndex(item => item.id === applicationId);
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

  prevBtn.addEventListener('click', function(e) { e.preventDefault(); goPrev(); });
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      goNext();
    } catch (err) {
      console.error('goNext error:', err);
      setMsg('Error al avanzar. Abra la consola (F12) para más detalles.', true);
    }
  });
  saveDraftBtn.addEventListener('click', () => {
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
  form.addEventListener('submit', (e) => {
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
  form.addEventListener('input', saveRecovery);
  form.addEventListener('change', saveRecovery);
  form.elements.companyPhone?.addEventListener('blur', function(){ if ((this.value||'').trim()) showPhoneError('companyPhone', ''); });
  form.elements.repCellPhone?.addEventListener('blur', function(){ const r = isValidPanamaMobile(this.value); showPhoneError('repCellPhone', r.valid ? '' : r.message); });
  form.elements.repCellPhone?.addEventListener('input', function(){ if (isValidPanamaMobile(this.value).valid) showPhoneError('repCellPhone', ''); });
  setupPdfUpload();
  let addressMapInstance = null;
  let addressMarker = null;
  const PANAMA_CENTER = [8.9945, -79.5199];
  function initAddressMapIfNeeded(){
    const mapEl = document.getElementById('addressMap');
    const latEl = document.getElementById('addressLat');
    const lngEl = document.getElementById('addressLng');
    const coordsDisplay = document.getElementById('mapCoordsDisplay');
    if (!mapEl || !window.L) return;
    if (addressMapInstance) {
      addressMapInstance.invalidateSize();
      return;
    }
    const savedLat = parseFloat(latEl?.value);
    const savedLng = parseFloat(lngEl?.value);
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
    document.getElementById('btnUseMyLocation')?.addEventListener('click', function(){
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
  form.elements.repEmail?.addEventListener('input', () => { if (currentStep === 1) updateMetamapMetadata(); });
  form.elements.repEmail?.addEventListener('change', () => { if (currentStep === 1) updateMetamapMetadata(); });
  window.addEventListener('beforeunload', (e) => {
    if (window.__metamapModalOpen) e.preventDefault();
  });
  document.getElementById('portalLink')?.addEventListener('click', (e) => {
    if (window.__metamapModalOpen) {
      e.preventDefault();
      e.stopPropagation();
      setMsg('Complete o cancele la verificación de identidad antes de salir.', true);
    }
  }, true);
  const metamapBtn = document.getElementById('metamap-btn');
  if (metamapBtn) {
    metamapBtn.addEventListener('metamap:userStartedSdk', () => {
      setMetamapModalOpen(true);
      setMsg('Complete la verificación. No cierre ni actualice la página.', false);
    });
    metamapBtn.addEventListener('metamap:userFinishedSdk', (e) => {
      setMetamapModalOpen(false);
      const d = e.detail || {};
      const identityId = d.identityId || d.identity_id;
      const verificationId = d.verificationId || d.verification_id;
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
    metamapBtn.addEventListener('metamap:exitedSdk', () => {
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
})();
