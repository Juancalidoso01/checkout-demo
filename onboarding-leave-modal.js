(function(){
  var form = document.getElementById('onboardingForm');
  var formDirty = false;
  var formSaved = false;
  var pendingBack = false;
  var backdrop = document.getElementById('leaveConfirmBackdrop');
  var btnRegresar = document.getElementById('btnRegresar');

  function markDirty(){ formDirty = true; window.__formSavedAfterDraft = false; }
  function markSaved(){ formSaved = true; formDirty = false; window.__formSavedAfterDraft = true; }

  if (form) {
    form.addEventListener('input', markDirty);
    form.addEventListener('change', markDirty);
  }

  window.addEventListener('beforeunload', function(e){
    if (window.__formSavedAfterDraft) return;
    if (window.__metamapModalOpen) e.preventDefault();
  });

  function showLeaveModal(isBack){
    if (!backdrop) return;
    pendingBack = !!isBack;
    backdrop.classList.remove('hidden');
  }
  function hideLeaveModal(){
    if (backdrop) backdrop.classList.add('hidden');
    pendingBack = false;
  }

  function doRegresar(){
    if (history.length > 1) history.back();
    else location.href = 'onboarding-access.html';
  }

  window.__obTriggerRegresar = function(){
    if (!formDirty || formSaved) {
      doRegresar();
      return;
    }
    showLeaveModal(true);
  };

  if (btnRegresar) {
    btnRegresar.addEventListener('click', function(e){
      e.preventDefault();
      window.__obTriggerRegresar && window.__obTriggerRegresar();
    });
  }

  if (backdrop) {
    var btnSave = document.getElementById('leaveConfirmSave');
    if (btnSave) btnSave.addEventListener('click', function(){
      var btn = document.getElementById('saveDraftBtn');
      if (btn) { btn.click(); markSaved(); }
      hideLeaveModal();
      if (pendingBack) doRegresar();
    });
    var btnDiscard = document.getElementById('leaveConfirmDiscard');
    if (btnDiscard) btnDiscard.addEventListener('click', function(){
      var goBack = pendingBack;
      hideLeaveModal();
      if (goBack) doRegresar();
    });
    var btnCancel = document.getElementById('leaveConfirmCancel');
    if (btnCancel) btnCancel.addEventListener('click', function(){
      hideLeaveModal();
    });
  }

  var saveBtn = document.getElementById('saveDraftBtn');
  if (saveBtn) saveBtn.addEventListener('click', markSaved);
  var obForm = document.getElementById('onboardingForm');
  if (obForm) obForm.addEventListener('submit', markSaved);
})();
