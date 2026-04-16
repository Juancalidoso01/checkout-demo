/**
 * Barra contextual del demo: fase del proceso (PP_FLUJO_PROCESO) + pasos en línea (violeta).
 * Requiere modules.config.js (PP_MODULO_FLUJO_META). Opcional: auth.js para URL del mapa.
 */
(function () {
  var SKIP_FILES = { 'index.html': 1, 'modules-map.html': 1 };

  var ROUTE_TO_MODULO = {
    'checkout.html': 'checkout',
    'factura.html': 'factura',
    'login.html': 'login',
    'setup.html': 'setup',
    'mapa-picker.html': 'mapa-picker',
    'onboarding-access.html': 'onb-access',
    'onboarding.html': 'onb-form',
    'onboarding-contract.html': 'onb-contract',
    'onboarding-review-pending.html': 'onb-review',
    'onboarding-firma-preview.html': 'onb-contract',
    'pp-admin-entry.html': 'admin-entry',
    'test-kyc-edge-function.html': 'test-kyc',
    'test-direccion.html': 'test-direccion',
    'test-mapa.html': 'test-mapa',
    'agents/recharge.html': 'agent-hub',
    'agents/team.html': 'agent-team',
    'agents/cashout.html': 'agent-cashout',
    'admin/index.html': 'admin-panel',
  };

  function normalizePathname() {
    var p = (location.pathname || '').replace(/\\/g, '/').toLowerCase();
    if (p.indexOf('/checkout-demo/') >= 0) {
      p = p.split('/checkout-demo/').pop() || p;
    }
    p = p.replace(/^\/+/, '');
    return p;
  }

  function pathToModuloId() {
    if (document.body && document.body.getAttribute('data-pp-demo-modulo')) {
      return String(document.body.getAttribute('data-pp-demo-modulo')).trim();
    }
    var m = document.querySelector('meta[name="pp-demo-modulo"]');
    if (m && m.getAttribute('content')) return String(m.getAttribute('content')).trim();
    var p = normalizePathname();
    if (ROUTE_TO_MODULO[p]) return ROUTE_TO_MODULO[p];
    var file = p.split('/').pop() || '';
    return ROUTE_TO_MODULO[file] || null;
  }

  function relativeIndexHtml() {
    if (window.PPAuth && typeof window.PPAuth.buildProcessMapHomeUrl === 'function') {
      return window.PPAuth.buildProcessMapHomeUrl();
    }
    var path = normalizePathname();
    var segs = path.split('/').filter(Boolean);
    if (segs.length && /\.html?$/i.test(segs[segs.length - 1])) segs.pop();
    var depth = segs.length;
    return (depth ? new Array(depth + 1).join('../') : '') + 'index.html';
  }

  function injectDemoFlowContext() {
    var path = normalizePathname();
    var file = path.split('/').pop() || '';
    if (SKIP_FILES[file]) return;

    var mid = pathToModuloId();
    var meta = mid && window.PP_MODULO_FLUJO_META && window.PP_MODULO_FLUJO_META[mid];
    if (!meta) return;
    if (document.getElementById('pp-demo-flow-context')) return;

    var root = document.createElement('div');
    root.id = 'pp-demo-flow-context';
    root.className = 'pp-demo-flow-context';
    root.setAttribute('role', 'navigation');
    root.setAttribute('aria-label', 'Contexto del proceso en el demo');

    var inner = document.createElement('div');
    inner.className = 'pp-demo-flow-context__inner';

    var home = document.createElement('a');
    home.className = 'pp-demo-flow-context__home';
    home.href = relativeIndexHtml();
    home.setAttribute('title', 'Volver al mapa del proceso');
    home.innerHTML = '<span class="pp-demo-flow-context__home-icon" aria-hidden="true">◇</span><span>Mapa del proceso</span>';

    var phase = document.createElement('div');
    phase.className = 'pp-demo-flow-context__phase';

    var badge = document.createElement('span');
    badge.className =
      'pp-demo-flow-context__badge' +
      (meta.tipo === 'extra'
        ? ' pp-demo-flow-context__badge--extra'
        : meta.tipo === 'operativo'
          ? ' pp-demo-flow-context__badge--operativo'
          : '');
    badge.textContent =
      meta.tipo === 'principal'
        ? 'Fase ' + meta.faseIndex
        : meta.tipo === 'extra'
          ? 'Sandbox'
          : meta.tipo === 'operativo'
            ? 'Fase ' + meta.faseIndex + ' · Módulo'
            : 'Fase ' + meta.faseIndex;

    var title = document.createElement('span');
    title.className = 'pp-demo-flow-context__phase-title';
    title.textContent = meta.faseTitulo || '';

    var sub = document.createElement('span');
    sub.className = 'pp-demo-flow-context__phase-sub';
    sub.textContent = meta.faseSubtitulo || '';

    phase.appendChild(badge);
    phase.appendChild(title);
    phase.appendChild(sub);

    var track = document.createElement('div');
    track.className = 'pp-demo-flow-context__track';
    track.setAttribute('aria-hidden', 'true');

    if (meta.tipo === 'operativo') {
      track.removeAttribute('aria-hidden');
      track.classList.add('pp-demo-flow-context__track--operativo');
      var opHint = document.createElement('span');
      opHint.className = 'pp-demo-flow-context__operativo-hint';
      opHint.textContent = 'Función del portal (no es un paso numerado del mapa)';
      track.appendChild(opHint);
    } else {
      var n = Math.max(1, meta.pasosEnFase | 0);
      var cur = Math.min(Math.max(1, meta.pasoEnFase | 0), n);
      var i;
      for (i = 1; i <= n; i += 1) {
        var dot = document.createElement('span');
        dot.className = 'pp-demo-flow-context__dot';
        if (i < cur) dot.classList.add('-done');
        else if (i === cur) dot.classList.add('-current');
        else dot.classList.add('-todo');
        track.appendChild(dot);
        if (i < n) {
          var seg = document.createElement('span');
          seg.className = 'pp-demo-flow-context__seg';
          if (cur > i) seg.classList.add('-done');
          track.appendChild(seg);
        }
      }
    }

    var stepLabel = document.createElement('div');
    stepLabel.className = 'pp-demo-flow-context__step-label';
    if (meta.tipo === 'operativo') {
      stepLabel.textContent =
        'Pantalla de referencia; el flujo principal de la fase son los pasos del mapa.';
    } else {
      var n2 = Math.max(1, meta.pasosEnFase | 0);
      var cur2 = Math.min(Math.max(1, meta.pasoEnFase | 0), n2);
      stepLabel.textContent =
        'Paso ' +
        cur2 +
        ' / ' +
        n2 +
        (meta.tipo === 'principal' ? ' en esta fase' : meta.tipo === 'extra' ? ' (sandbox)' : '');
    }

    inner.appendChild(home);
    inner.appendChild(phase);
    inner.appendChild(track);
    inner.appendChild(stepLabel);
    root.appendChild(inner);

    document.body.insertBefore(root, document.body.firstChild);
    document.body.classList.add('pp-has-demo-flow-context');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectDemoFlowContext);
  } else {
    injectDemoFlowContext();
  }
})();
