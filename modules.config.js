/**
 * Catálogo de módulos por ÁREA — edita aquí nombres y notas; mantén `ruta` alineada con archivos reales.
 * `areaId` / `moduloId`: identificadores estables para priorizar mejoras (ej. "sprint portal-agentes").
 */
(function () {
  window.PP_MODULOS_POR_AREA = [
    {
      areaId: 'pagos-demo',
      area: 'Pagos y demo',
      items: [
        {
          moduloId: 'checkout',
          nombreTrabajo: 'Checkout principal',
          ruta: 'checkout.html',
          nota: 'Demo de flujos de pago; enlaza al portal agente.',
        },
        {
          moduloId: 'factura',
          nombreTrabajo: 'Factura / comprobante',
          ruta: 'factura.html',
          nota: 'Embebido en portal agente con ?embed=1',
        },
      ],
    },
    {
      areaId: 'portal-agentes',
      area: 'Portal agentes',
      items: [
        {
          moduloId: 'agent-hub',
          nombreTrabajo: 'Portal agente (hub)',
          ruta: 'agents/recharge.html',
          nota: 'Tabs: recarga, histórico, factura, ACH, servicios. Sesión agent/employee.',
          roles: 'agent · employee',
        },
        {
          moduloId: 'agent-team',
          nombreTrabajo: 'Equipo / empleados',
          ruta: 'agents/team.html',
          nota: 'CRUD empleados en localStorage; requiere agentId.',
          roles: 'agent',
        },
        {
          moduloId: 'agent-cashout',
          nombreTrabajo: 'Retiro de fondos (UI)',
          ruta: 'agents/cashout.html',
          nota: 'Flujo demo retiros / banco.',
        },
      ],
    },
    {
      areaId: 'admin',
      area: 'Admin y credenciales',
      items: [
        {
          moduloId: 'admin-entry',
          nombreTrabajo: 'Entrada admin unificada',
          ruta: 'pp-admin-entry.html',
          nota: 'Login superadmin + credenciales; actualiza URLs absolutas si cambia el dominio del deploy.',
        },
        {
          moduloId: 'admin-login-alt',
          nombreTrabajo: 'Login admin alterno',
          ruta: 'admin-login.html',
          nota: 'Variante de acceso admin.',
        },
        {
          moduloId: 'admin-panel',
          nombreTrabajo: 'Panel admin',
          ruta: 'admin/index.html',
          nota: 'Gestión interna.',
        },
        {
          moduloId: 'admin-credentials',
          nombreTrabajo: 'Credenciales (legacy)',
          ruta: 'admin/credentials.html',
          nota: 'Compatibilidad / redirecciones.',
        },
      ],
    },
    {
      areaId: 'onboarding',
      area: 'Onboarding',
      items: [
        {
          moduloId: 'onb-access',
          nombreTrabajo: 'Acceso previo onboarding',
          ruta: 'onboarding-access.html',
          nota: 'Validación; opcional Supabase magic link.',
        },
        {
          moduloId: 'onb-form',
          nombreTrabajo: 'Formulario onboarding',
          ruta: 'onboarding.html',
          nota: 'Formulario largo del comercio.',
        },
        {
          moduloId: 'onb-contract',
          nombreTrabajo: 'Contrato onboarding',
          ruta: 'onboarding-contract.html',
          nota: 'Firma / contrato.',
        },
        {
          moduloId: 'onb-review',
          nombreTrabajo: 'Revisión pendiente',
          ruta: 'onboarding-review-pending.html',
          nota: 'Estado post envío.',
        },
        {
          moduloId: 'onb-test',
          nombreTrabajo: 'Prueba onboarding (diseño)',
          ruta: 'onboarding-test.html',
          nota: 'Modo prueba sin Supabase.',
        },
      ],
    },
    {
      areaId: 'comercio-util',
      area: 'Comercio y utilidades',
      items: [
        {
          moduloId: 'setup',
          nombreTrabajo: 'Menú / setup comercio',
          ruta: 'setup.html',
          nota: 'Enlazado desde portal agente.',
        },
        {
          moduloId: 'login',
          nombreTrabajo: 'Login general',
          ruta: 'login.html',
          nota: 'auth.js · redirección por rol.',
        },
        {
          moduloId: 'mapa-picker',
          nombreTrabajo: 'Selector mapa',
          ruta: 'mapa-picker.html',
          nota: 'Usado desde flujo onboarding.',
        },
      ],
    },
    {
      areaId: 'sandbox',
      area: 'Pruebas y herramientas locales',
      items: [
        {
          moduloId: 'test-kyc',
          nombreTrabajo: 'Tests / KYC / dirección',
          ruta: 'test-kyc-edge-function.html',
          nota: 'Sandbox.',
        },
        {
          moduloId: 'test-direccion',
          nombreTrabajo: 'Test dirección',
          ruta: 'test-direccion.html',
          nota: 'Sandbox.',
        },
        {
          moduloId: 'test-mapa',
          nombreTrabajo: 'Test mapa',
          ruta: 'test-mapa.html',
          nota: 'Sandbox.',
        },
      ],
    },
  ];

  /**
   * Mapa de proceso (home): cada fila = fase legible para stakeholders.
   * `ids` = moduloId presente en PP_MODULOS_POR_AREA.
   */
  window.PP_FLUJO_PROCESO = {
    filas: [
      {
        titulo: 'Alta del comercio',
        subtitulo: 'El negocio entra, completa datos y envía la solicitud.',
        ids: ['onb-access', 'onb-form', 'onb-contract', 'onb-review'],
      },
      {
        titulo: 'Revisión interna',
        subtitulo: 'Punto Pago revisa y deja listas las credenciales.',
        ids: ['admin-entry'],
      },
      {
        titulo: 'Operación del agente',
        subtitulo: 'Ingreso al sistema, portal y demo de cobro.',
        ids: ['login', 'agent-hub', 'checkout'],
      },
    ],
    extras: [
      'factura',
      'setup',
      'agent-team',
      'agent-cashout',
      'mapa-picker',
      'onb-test',
      'admin-login-alt',
      'admin-panel',
      'admin-credentials',
      'test-kyc',
      'test-direccion',
      'test-mapa',
    ],
  };

  (function buildFlujoMeta() {
    var flujo = window.PP_FLUJO_PROCESO;
    if (!flujo || !flujo.filas) return;
    var meta = {};
    var globalStep = 1;
    flujo.filas.forEach(function (fase, fi) {
      var ids = fase.ids || [];
      var n = ids.length;
      ids.forEach(function (mid, j) {
        meta[mid] = {
          faseIndex: fi + 1,
          faseTitulo: fase.titulo,
          faseSubtitulo: fase.subtitulo || '',
          pasoEnFase: j + 1,
          pasosEnFase: n,
          pasoGlobal: globalStep++,
          tipo: 'principal',
        };
      });
    });
    var extras = flujo.extras || [];
    extras.forEach(function (mid, j) {
      meta[mid] = {
        faseIndex: null,
        faseTitulo: 'Complementarias',
        faseSubtitulo: 'Otras pantallas del demo',
        pasoEnFase: j + 1,
        pasosEnFase: extras.length,
        pasoGlobal: globalStep++,
        tipo: 'extra',
      };
    });
    window.PP_MODULO_FLUJO_META = meta;
  })();
})();
