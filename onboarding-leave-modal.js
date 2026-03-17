(function(){
  var form = document.getElementById('onboardingForm');
  var formDirty = false;
  var formSaved = false;
  var pendingHref = null;
  var backdrop = document.getElementById('leaveConfirmBackdrop');
  var portalLink = document.getElementById('portalLink');

  function markDirty(){ formDirty = true; window.__formSavedAfterDraft = false; }
  function markSaved(){ formSaved = true; formDirty = false; window.__formSavedAfterDraft = true; }

  if (form) {
    form.addEventListener('input', markDirty);
    form.addEventListener('change', markDirty);
  }

  window.addEventListener('beforeunload', function(e){
    if (window.__formSavedAfterDraft) return;
    if (window.__metamapModalOpen) e.preventDefault();
    // No bloquear recarga: sessionStorage recupera progreso al refrescar
  });

  function showLeaveModal(href){
    if (!backdrop) return;
    pendingHref = href;
    backdrop.classList.remove('hidden');
  }
  function hideLeaveModal(){
    if (backdrop) backdrop.classList.add('hidden');
    pendingHref = null;
  }

  if (portalLink) {
    portalLink.addEventListener('click', function(e){
      if (!formDirty || formSaved) return;
      e.preventDefault();
      showLeaveModal(this.getAttribute('href'));
    });
  }

  if (backdrop) {
    var btnSave = document.getElementById('leaveConfirmSave');
    if (btnSave) btnSave.addEventListener('click', function(){
      var btn = document.getElementById('saveDraftBtn');
      if (btn) { btn.click(); markSaved(); }
      hideLeaveModal();
      if (pendingHref) location.href = pendingHref;
    });
    var btnDiscard = document.getElementById('leaveConfirmDiscard');
    if (btnDiscard) btnDiscard.addEventListener('click', function(){
      var h = pendingHref;
      hideLeaveModal();
      if (h) location.href = h;
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
