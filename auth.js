/*
  auth.js (DEMO)
  - Stores session in localStorage: pp_auth_session_v1
  - Stores users in localStorage: pp_users_v1

  Roles:
    - superadmin: manages all users
    - agent: can manage its employees
    - employee: belongs to an agent

  IMPORTANT:
    This is a frontend-only demo auth. It is NOT secure for production.
*/

(function(){
  const USERS_KEY = 'pp_users_v1';
  const SESSION_KEY = 'pp_auth_session_v1';
  const APPLICATIONS_KEY = 'pp_onboarding_applications_v1';
  const LAST_SUBMITTED_APPLICATION_KEY = 'pp_onboarding_last_submitted_v1';

  function now(){ return Date.now(); }

  function safeJsonParse(raw, fallback){
    try { return raw ? JSON.parse(raw) : fallback; } catch(e){ return fallback; }
  }

  function getAppBasePath(){
    const path = (location && location.pathname) || '/';
    const loginIdx = path.lastIndexOf('/login.html');
    if (loginIdx >= 0) return path.slice(0, loginIdx + 1);
    const agentsIdx = path.indexOf('/agents/');
    if (agentsIdx >= 0) return path.slice(0, agentsIdx + 1);
    const adminIdx = path.indexOf('/admin/');
    if (adminIdx >= 0) return path.slice(0, adminIdx + 1);
    const lastSlash = path.lastIndexOf('/');
    return lastSlash >= 0 ? path.slice(0, lastSlash + 1) : '/';
  }

  function buildAppUrl(relativePath){
    const clean = (relativePath || '').replace(/^\/+/, '');
    return `${location.origin}${getAppBasePath()}${clean}`;
  }

  function loadUsers(){
    const users = safeJsonParse(localStorage.getItem(USERS_KEY), null);
    if (users && Array.isArray(users)) return users;

    // bootstrap demo data
    const seeded = [
      {
        id: 'u_superadmin',
        username: 'superadmin',
        password: 'admin123',
        role: 'superadmin',
        displayName: 'Super Admin',
        agentId: null,
        active: true,
        createdAt: now(),
        updatedAt: now()
      },
      {
        id: 'u_agent_01',
        username: 'agente01',
        password: '1234',
        role: 'agent',
        displayName: 'Agente 01',
        agentId: 'u_agent_01',
        active: true,
        createdAt: now(),
        updatedAt: now()
      },
      {
        id: 'u_emp_01',
        username: 'empleado01',
        password: '1234',
        role: 'employee',
        displayName: 'Empleado 01',
        agentId: 'u_agent_01',
        active: true,
        createdAt: now(),
        updatedAt: now()
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
    return seeded;
  }

  function saveUsers(users){
    localStorage.setItem(USERS_KEY, JSON.stringify(users || []));
  }

  function getSession(){
    return safeJsonParse(localStorage.getItem(SESSION_KEY), null);
  }

  function setSession(session){
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function signOut(){
    localStorage.removeItem(SESSION_KEY);
  }

  function normalize(value){
    return (value || '').toString().trim().toLowerCase();
  }

  function loadApplications(){
    const apps = safeJsonParse(localStorage.getItem(APPLICATIONS_KEY), null);
    return Array.isArray(apps) ? apps : [];
  }

  function saveApplications(apps){
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(apps || []));
  }

  function getLastSubmittedApplicationId(){
    try { return localStorage.getItem(LAST_SUBMITTED_APPLICATION_KEY) || ''; }
    catch (e) { return ''; }
  }

  function setLastSubmittedApplicationId(id){
    try {
      if (!id) localStorage.removeItem(LAST_SUBMITTED_APPLICATION_KEY);
      else localStorage.setItem(LAST_SUBMITTED_APPLICATION_KEY, id);
    } catch (e) {}
  }

  function isPendingApplicationStatus(status){
    const val = (status || '').toString().toLowerCase();
    return val === 'pending_review' || val === 'pending';
  }

  function isContractPendingStatus(status){
    return (status || '').toString().toLowerCase() === 'contract_pending';
  }

  function findApplicationById(id){
    if (!id) return null;
    const apps = loadApplications();
    for (let i = 0; i < apps.length; i += 1) {
      if (apps[i] && apps[i].id === id) return apps[i];
    }
    return null;
  }

  function getApplicationEmails(app){
    const data = (app && app.onboarding) || {};
    return [
      normalize(data.repEmail),
      normalize(data.opsContactEmail),
      normalize(data.settlementEmail)
    ].filter(Boolean);
  }

  function findPendingApplicationByIdentifier(identifier){
    const needle = normalize(identifier);
    if (!needle) return null;
    const apps = loadApplications();
    for (let i = apps.length - 1; i >= 0; i -= 1) {
      const app = apps[i];
      if (!app || (!isPendingApplicationStatus(app.status) && !isContractPendingStatus(app.status))) continue;
      const credentials = app.credentials || {};
      const usernames = [normalize(credentials.username)];
      const emails = getApplicationEmails(app);
      if (usernames.indexOf(needle) >= 0 || emails.indexOf(needle) >= 0) return app;
    }
    return null;
  }

  function getPendingApplicationForSession(session){
    if (!session) return null;
    const users = loadUsers();
    const user = users.find(x => x && x.id === session.userId);
    const onboarding = user && user.onboarding ? user.onboarding : null;
    if (onboarding && (isPendingApplicationStatus(onboarding.status) || isContractPendingStatus(onboarding.status))) {
      return findApplicationById(onboarding.applicationId) || {
        id: onboarding.applicationId || '',
        status: onboarding.status
      };
    }
    return findPendingApplicationByIdentifier(session.username);
  }

  function buildPendingReviewUrl(applicationId){
    const suffix = applicationId ? `?applicationId=${encodeURIComponent(applicationId)}` : '';
    return buildAppUrl(`onboarding-review-pending.html${suffix}`);
  }

  function buildContractUrl(applicationId){
    const suffix = applicationId ? `?applicationId=${encodeURIComponent(applicationId)}` : '';
    return buildAppUrl(`onboarding-contract.html${suffix}`);
  }

  function redirectToContract(applicationId){
    location.href = buildContractUrl(applicationId);
  }

  function redirectToPendingReview(applicationId){
    location.href = buildPendingReviewUrl(applicationId);
  }

  function getPostSubmissionRoute(application){
    if (!application) return null;
    if (isContractPendingStatus(application.status)) {
      return { type: 'contract', applicationId: application.id || '' };
    }
    if (isPendingApplicationStatus(application.status)) {
      return { type: 'review', applicationId: application.id || '' };
    }
    return null;
  }

  function redirectForApplication(application){
    const route = getPostSubmissionRoute(application);
    if (!route) return false;
    if (route.type === 'contract') redirectToContract(route.applicationId);
    else redirectToPendingReview(route.applicationId);
    return true;
  }

  function buildPreviewApplication(overrides){
    const baseId = (overrides && overrides.id) || 'demo_app_preview';
    const timestamp = now();
    return {
      id: baseId,
      type: 'agent_onboarding',
      status: 'pending_review',
      createdAt: timestamp,
      updatedAt: timestamp,
      submittedAt: timestamp,
      onboarding: {
        businessTradeName: 'Comercio Demo Preview',
        businessLegalName: 'Comercio Demo Preview, S.A.',
        repEmail: 'preview@puntopago.test',
        opsContactEmail: 'operaciones@puntopago.test',
        settlementEmail: 'liquidaciones@puntopago.test',
        taxId: '155677889-2-2026 DV 88',
        ...(overrides && overrides.onboarding ? overrides.onboarding : {})
      },
      review: {
        state: 'pending_review',
        approvedBy: null,
        approvedAt: null,
        rejectionReason: '',
        notes: 'Solicitud de vista previa local.',
        ...(overrides && overrides.review ? overrides.review : {})
      },
      credentials: {
        username: '',
        temporaryPassword: '',
        linkedUserId: null,
        ...(overrides && overrides.credentials ? overrides.credentials : {})
      },
      ...(overrides || {})
    };
  }

  function ensurePreviewApplication(overrides){
    const previewApp = buildPreviewApplication(overrides);
    const apps = loadApplications();
    const idx = apps.findIndex(app => app && app.id === previewApp.id);
    if (idx >= 0) apps[idx] = { ...apps[idx], ...previewApp, updatedAt: now() };
    else apps.push(previewApp);
    saveApplications(apps);
    setLastSubmittedApplicationId(previewApp.id);
    return previewApp;
  }

  function generatePortalTempPassword(){
    return 'tmp-' + Math.random().toString(36).slice(2, 10);
  }

  function suggestPortalUsernameFromEmail(email){
    const e = normalize(email);
    const local = (e.split('@')[0] || 'agente').replace(/[^a-z0-9._-]/g, '') || 'agente';
    return local.slice(0, 24);
  }

  /**
   * Crea o actualiza un usuario agente en el demo (localStorage) al aprobar una solicitud,
   * para que el admin vea usuario y contraseña en el listado del portal.
   */
  function ensureAgentUserFromApproval(options){
    const opts = options || {};
    const inviteEmail = normalize(opts.inviteEmail || opts.email || '');
    if (!inviteEmail) return { ok: false, error: 'inviteEmail requerido' };
    const displayName = (opts.displayName || '').trim() || inviteEmail.split('@')[0] || 'Punto Aliado';
    const applicationId = (opts.applicationId || '').trim();
    const password = (opts.password || '').toString().trim() || generatePortalTempPassword();
    const users = loadUsers();
    let username = (opts.username || '').toString().trim().toLowerCase();
    if (!username) {
      const base = suggestPortalUsernameFromEmail(inviteEmail);
      let candidate = base;
      let n = 1;
      while (users.some(u => normalize(u.username) === normalize(candidate))) {
        n += 1;
        candidate = (base.slice(0, 14) || 'agente') + n;
      }
      username = candidate;
    } else if (users.some(u => normalize(u.username) === normalize(username) && u.id !== opts.existingUserId)) {
      return { ok: false, error: 'Ese usuario ya existe.' };
    }
    const byEmailIdx = users.findIndex(u => u.email && normalize(u.email) === inviteEmail);
    const byUserIdx = users.findIndex(u => normalize(u.username) === normalize(username));
    const idx = byEmailIdx >= 0 ? byEmailIdx : byUserIdx;
    const onboarding = {
      status: 'approved',
      updatedAt: now(),
      ...(applicationId ? { applicationId: applicationId } : {})
    };
    if (idx >= 0) {
      const id = users[idx].id;
      users[idx] = {
        ...users[idx],
        username: username,
        password: password,
        displayName: displayName,
        email: inviteEmail,
        role: 'agent',
        agentId: id,
        active: true,
        onboarding: onboarding,
        updatedAt: now()
      };
      saveUsers(users);
      return { ok: true, username: username, password: password, inviteEmail: inviteEmail, displayName: displayName, userId: id, created: false };
    }
    const id = 'u_agent_' + Math.random().toString(16).slice(2, 8) + '_' + Date.now().toString(16);
    users.push({
      id: id,
      username: username,
      password: password,
      role: 'agent',
      displayName: displayName,
      email: inviteEmail,
      agentId: id,
      active: true,
      onboarding: onboarding,
      createdAt: now(),
      updatedAt: now()
    });
    saveUsers(users);
    return { ok: true, username: username, password: password, inviteEmail: inviteEmail, displayName: displayName, userId: id, created: true };
  }

  function signIn(username, password){
    const u = normalize(username);
    const p = (password || '').toString();
    const users = loadUsers();

    const user = users.find(x => (x.username || '').toLowerCase() === u);
    if (!user) {
      const pendingApp = findPendingApplicationByIdentifier(u);
      if (pendingApp) {
        const pendingRoute = getPostSubmissionRoute(pendingApp);
        return {
          ok: false,
          errorKey: pendingRoute && pendingRoute.type === 'contract' ? 'login_err_contract_pending' : 'login_err_pending_review',
          error: pendingRoute && pendingRoute.type === 'contract' ? 'Tu solicitud está pendiente de aceptar contrato.' : 'Tu solicitud todavía está en revisión.',
          pendingReview: pendingRoute && pendingRoute.type === 'review',
          contractPending: pendingRoute && pendingRoute.type === 'contract',
          applicationId: pendingApp.id
        };
      }
      return { ok:false, errorKey: 'login_err_invalid', error: 'Usuario o contraseña inválidos.' };
    }
    if (!user.active) return { ok:false, errorKey: 'login_err_disabled', error: 'Usuario deshabilitado.' };
    if ((user.password || '') !== p) return { ok:false, errorKey: 'login_err_invalid', error: 'Usuario o contraseña inválidos.' };
    if (user.onboarding && (isPendingApplicationStatus(user.onboarding.status) || isContractPendingStatus(user.onboarding.status))) {
      const pendingRoute = getPostSubmissionRoute({
        id: user.onboarding.applicationId || '',
        status: user.onboarding.status
      });
      return {
        ok: false,
        errorKey: pendingRoute && pendingRoute.type === 'contract' ? 'login_err_contract_pending' : 'login_err_pending_review',
        error: pendingRoute && pendingRoute.type === 'contract' ? 'Tu solicitud está pendiente de aceptar contrato.' : 'Tu solicitud todavía está en revisión.',
        pendingReview: pendingRoute && pendingRoute.type === 'review',
        contractPending: pendingRoute && pendingRoute.type === 'contract',
        applicationId: user.onboarding.applicationId || ''
      };
    }

    const session = {
      userId: user.id,
      username: user.username,
      displayName: user.displayName || user.username,
      role: user.role,
      agentId: user.agentId || null,
      iat: now()
    };
    setSession(session);
    return { ok:true, session };
  }

  function requireAuth(options){
    const opts = options || {};
    const role = opts.role;
    const session = getSession();

    if (!session){
      const next = encodeURIComponent(location.pathname + location.search);
      location.href = `${buildAppUrl('login.html')}?next=${next}`;
      return null;
    }

    const pendingApp = getPendingApplicationForSession(session);
    if (pendingApp){
      redirectForApplication(pendingApp);
      return null;
    }

    if (role){
      const allowed = Array.isArray(role) ? role : [role];
      if (allowed.indexOf(session.role) < 0){
        // If user lacks permissions, bounce to their appropriate home
        if (session.role === 'superadmin') location.href = buildAppUrl('admin/index.html');
        else location.href = buildAppUrl('agents/recharge.html');
        return null;
      }
    }

    return session;
  }

  function redirectAfterLogin(next){
    const s = getSession();
    const pendingApp = getPendingApplicationForSession(s);
    if (pendingApp) {
      redirectForApplication(pendingApp);
      return;
    }
    if (next) {
      try {
        const url = new URL(next, location.origin);
        location.href = url.href;
        return;
      } catch(e) {}
    }
    if (s?.role === 'superadmin') location.href = buildAppUrl('admin/index.html');
    else location.href = buildAppUrl('agents/recharge.html');
  }

  function ensureLogoutButton({ selector }){
    const el = document.querySelector(selector || '[data-pp-logout]');
    if (!el || el.dataset.ppLogoutBound === '1') return;
    el.dataset.ppLogoutBound = '1';
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      signOut();
      location.href = buildAppUrl('login.html');
    });
  }

  function renderSessionBadge({ selector }){
    const el = document.querySelector(selector || '[data-pp-session]');
    if (!el) return;
    const s = getSession();
    if (!s){ el.textContent = ''; return; }
    el.textContent = `${s.displayName} (${s.role})`;
  }

  // Expose minimal API
  window.PPAuth = {
    USERS_KEY,
    SESSION_KEY,
    APPLICATIONS_KEY,
    LAST_SUBMITTED_APPLICATION_KEY,
    loadUsers,
    saveUsers,
    loadApplications,
    saveApplications,
    getSession,
    signIn,
    signOut,
    requireAuth,
    redirectAfterLogin,
    findApplicationById,
    findPendingApplicationByIdentifier,
    getPendingApplicationForSession,
    getLastSubmittedApplicationId,
    setLastSubmittedApplicationId,
    buildPreviewApplication,
    ensurePreviewApplication,
    isContractPendingStatus,
    getPostSubmissionRoute,
    buildContractUrl,
    redirectToContract,
    buildPendingReviewUrl,
    redirectToPendingReview,
    redirectForApplication,
    ensureLogoutButton,
    renderSessionBadge,
    ensureAgentUserFromApproval,
    generatePortalTempPassword
  };
})();
