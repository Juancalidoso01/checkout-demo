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

  /** Raíz publicada del sitio (vacío en Vercel raíz, `/checkout-demo` en GitHub Pages proyecto). */
  function getDeployBasePath(){
    const path = (location && location.pathname) || '/';
    if (path === '/checkout-demo' || path.startsWith('/checkout-demo/')) return '/checkout-demo';
    return '';
  }

  /** URL desde la raíz del deploy (útil desde subcarpetas como `admin/`). */
  function buildSiteUrl(relativePath){
    const clean = (relativePath || '').replace(/^\/+/, '');
    const base = getDeployBasePath();
    if (base) return `${location.origin}${base}/${clean}`;
    return `${location.origin}/${clean}`;
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

  function signIn(username, password){
    const u = (username || '').trim().toLowerCase();
    const p = (password || '').toString();
    const users = loadUsers();

    const user = users.find(x => (x.username || '').toLowerCase() === u);
    if (!user) return { ok:false, errorKey: 'login_err_invalid', error: 'Usuario o contraseña inválidos.' };
    if (!user.active) return { ok:false, errorKey: 'login_err_disabled', error: 'Usuario deshabilitado.' };
    if ((user.password || '') !== p) return { ok:false, errorKey: 'login_err_invalid', error: 'Usuario o contraseña inválidos.' };

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
    if (next) {
      try {
        const url = new URL(next, location.origin);
        url.searchParams.delete('pp_demo');
        location.href = url.href;
        return;
      } catch(e) {}
    }
    const s = getSession();
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

  /**
   * Demo stakeholders: enlaces con ?pp_demo=1 inician sesión automática con usuario demo adecuado.
   */
  function needsStakeholderDemoLogin(relativePath){
    const clean = (relativePath || '').replace(/^\/+/, '').split('?')[0].toLowerCase();
    if (clean.indexOf('agents/') === 0) return true;
    if (clean.indexOf('admin/') === 0) return true;
    if (clean === 'pp-admin-entry.html' || clean === 'admin-login.html') return true;
    if (clean === 'setup.html' || clean === 'factura.html') return true;
    if (clean === 'login.html') return true;
    return false;
  }

  function withStakeholderDemoQuery(relativePath){
    if (!relativePath || !needsStakeholderDemoLogin(relativePath)) return relativePath;
    const base = relativePath.split('?')[0];
    const q = relativePath.indexOf('?') >= 0 ? relativePath.slice(relativePath.indexOf('?') + 1) : '';
    const params = new URLSearchParams(q);
    params.set('pp_demo', '1');
    return `${base}?${params.toString()}`;
  }

  function stakeholderDemoPickCredentials(pathname, search){
    const p = (pathname || '').toLowerCase();
    const s = search || '';

    if (p.indexOf('login.html') >= 0){
      try {
        const q = new URLSearchParams(s);
        const next = q.get('next');
        if (next){
          const nu = new URL(decodeURIComponent(next), location.origin);
          return stakeholderDemoPickCredentials(nu.pathname, nu.search);
        }
      } catch (e){}
      return { username: 'agente01', password: '1234' };
    }

    if (p.indexOf('/admin/index') >= 0 || p.endsWith('admin/index.html')){
      return { username: 'superadmin', password: 'admin123' };
    }
    if (p.indexOf('pp-admin-entry') >= 0) return { username: 'superadmin', password: 'admin123' };
    if (p.indexOf('admin-login') >= 0) return { username: 'superadmin', password: 'admin123' };
    if (p.indexOf('admin/credentials') >= 0) return { username: 'superadmin', password: 'admin123' };

    if (p.indexOf('/agents/') >= 0) return { username: 'agente01', password: '1234' };
    if (p.indexOf('setup.html') >= 0) return { username: 'agente01', password: '1234' };
    if (p.indexOf('factura.html') >= 0) return { username: 'agente01', password: '1234' };

    if (p.indexOf('checkout.html') >= 0) return null;
    if (p.indexOf('onboarding') >= 0) return null;
    if (p.indexOf('mapa-picker') >= 0) return null;
    if (p.indexOf('modules-map') >= 0) return null;
    if (p === '/' || p.endsWith('/index.html')) return null;
    if (p.indexOf('test-') >= 0) return null;

    return null;
  }

  function stripPpDemoParamFromUrl(){
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('pp_demo') !== '1') return;
      params.delete('pp_demo');
      const q = params.toString();
      const url = location.pathname + (q ? `?${q}` : '') + location.hash;
      history.replaceState({}, '', url);
    } catch (e){}
  }

  function showStakeholderDemoToast(){
    const run = () => {
      if (!document.body) return;
      const el = document.createElement('div');
      el.setAttribute('role', 'status');
      el.style.cssText = [
        'position:fixed','bottom:22px','left:50%','transform:translateX(-50%)','z-index:9999',
        'max-width:min(92vw,420px)','padding:12px 18px','border-radius:14px',
        'background:linear-gradient(135deg,#3738ab,#5462e6)','color:#fff','font-size:13px','font-weight:600',
        'font-family:system-ui,sans-serif','box-shadow:0 12px 40px rgba(84,98,230,.35)',
        'text-align:center','line-height:1.35'
      ].join(';');
      el.textContent = 'Acceso demo activado: estás viendo la pantalla como usuario de prueba.';
      document.body.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transition = 'opacity .4s ease';
        setTimeout(() => el.remove(), 400);
      }, 4200);
    };
    if (document.body) run();
    else document.addEventListener('DOMContentLoaded', run, { once: true });
  }

  function applyStakeholderDemoIfRequested(){
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('pp_demo') !== '1') return;
      const creds = stakeholderDemoPickCredentials(location.pathname, location.search);
      if (creds){
        signOut();
        const res = signIn(creds.username, creds.password);
        if (res.ok) showStakeholderDemoToast();
      }
      stripPpDemoParamFromUrl();
    } catch (e){}
  }

  applyStakeholderDemoIfRequested();

  // Expose minimal API
  window.PPAuth = {
    USERS_KEY,
    SESSION_KEY,
    loadUsers,
    saveUsers,
    getSession,
    signIn,
    signOut,
    requireAuth,
    redirectAfterLogin,
    ensureLogoutButton,
    renderSessionBadge,
    buildAppUrl,
    buildSiteUrl,
    needsStakeholderDemoLogin,
    withStakeholderDemoQuery,
  };
})();
