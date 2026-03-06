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
    if (!user) return { ok:false, error: 'Usuario o contraseña inválidos.' };
    if (!user.active) return { ok:false, error: 'Usuario deshabilitado.' };
    if ((user.password || '') !== p) return { ok:false, error: 'Usuario o contraseña inválidos.' };

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
      location.href = `${location.origin}${location.pathname.replace(/\/[^\/]*$/, '')}/login.html?next=${next}`;
      return null;
    }

    if (role){
      const allowed = Array.isArray(role) ? role : [role];
      if (allowed.indexOf(session.role) < 0){
        // If user lacks permissions, bounce to their appropriate home
        if (session.role === 'superadmin') location.href = '../admin/index.html';
        else location.href = 'agents/recharge.html';
        return null;
      }
    }

    return session;
  }

  function redirectAfterLogin(next){
    if (next) {
      try {
        const url = new URL(next, location.origin);
        location.href = url.href;
        return;
      } catch(e) {}
    }
    const s = getSession();
    if (s?.role === 'superadmin') location.href = 'admin/index.html';
    else location.href = 'agents/recharge.html';
  }

  function ensureLogoutButton({ selector }){
    const el = document.querySelector(selector || '[data-pp-logout]');
    if (!el) return;
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      signOut();
      location.href = '../login.html';
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
    loadUsers,
    saveUsers,
    getSession,
    signIn,
    signOut,
    requireAuth,
    redirectAfterLogin,
    ensureLogoutButton,
    renderSessionBadge,
  };
})();
