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
          nombreTrabajo: 'Brochure y captación comercial',
          ruta: 'onboarding-access.html',
          nota: 'Vitrina y mensajes para atraer al comercio; validación de acceso opcional (p. ej. Supabase magic link).',
        },
        {
          moduloId: 'onb-form',
          nombreTrabajo: 'Formulario de alta del comercio',
          ruta: 'onboarding.html',
          nota: 'Núcleo del expediente: datos del negocio y representantes.',
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
          nombreTrabajo: 'Ubicación en mapa (KYB)',
          ruta: 'mapa-picker.html',
          nota: 'Selector de ubicación; continúa el expediente tras el formulario base.',
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
        titulo: 'Captación y alta del comercio',
        journeyLabel: 'Journey del cliente (comercio)',
        subtitulo:
          'Paso 1: brochure para captar. Paso 2: formulario base del expediente. Los pasos 3 a 5 son el mismo caso comercial una vez avanzado el formulario: ubicación, contrato y seguimiento.',
        ids: ['onb-access', 'onb-form', 'mapa-picker', 'onb-contract', 'onb-review'],
        /** Pasos que en el mapa se agrupan como continuación del formulario (paso 2). */
        subflujoDependeDeFormulario: ['mapa-picker', 'onb-contract', 'onb-review'],
      },
      {
        titulo: 'Administración del programa',
        journeyLabel: 'Journey interno (equipo Punto Pago)',
        subtitulo:
          'Dos accesos administrados: (1) captación con correo del aliado y canal de entrada unificado; (2) tras completar el onboarding, revisión y aprobación del expediente — propósito del portal interno. Las variantes de login y credenciales son herramientas, no pasos del recorrido.',
        ids: ['admin-entry', 'admin-panel'],
        /** Login alterno y credenciales legacy: enlaces útiles, no pasos secuenciales. */
        subflujoModulosOperativosAdmin: ['admin-login-alt', 'admin-credentials'],
      },
      {
        titulo: 'El comercio ya operando',
        journeyLabel: 'Journey del aliado (portal agente)',
        subtitulo:
          'Un solo paso de acceso al portal (login); el resto son funciones y operaciones en el mismo entorno — no se numeran como pasos del journey.',
        ids: ['login'],
        /** Tras iniciar sesión: hub, ajustes, equipo, retiros, cobro y factura. */
        subflujoFuncionesAgente: [
          'agent-hub',
          'setup',
          'agent-team',
          'agent-cashout',
          'checkout',
          'factura',
        ],
      },
    ],
    /** Solo herramientas locales / QA; no son pasos del flujo comercial anterior. */
    extras: ['test-kyc', 'test-direccion', 'test-mapa'],
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
      var opLists = [fase.subflujoModulosOperativosAdmin, fase.subflujoFuncionesAgente];
      opLists.forEach(function (list) {
        if (!list || !list.length) return;
        list.forEach(function (mid) {
          if (meta[mid]) return;
          meta[mid] = {
            faseIndex: fi + 1,
            faseTitulo: fase.titulo,
            faseSubtitulo: fase.subtitulo || '',
            pasoEnFase: 0,
            pasosEnFase: n,
            pasoGlobal: null,
            tipo: 'operativo',
          };
        });
      });
    });
    var extras = flujo.extras || [];
    extras.forEach(function (mid, j) {
      meta[mid] = {
        faseIndex: null,
        faseTitulo: 'Pruebas y sandbox',
        faseSubtitulo: 'Herramientas locales; fuera del flujo comercial principal.',
        pasoEnFase: j + 1,
        pasosEnFase: extras.length,
        pasoGlobal: globalStep++,
        tipo: 'extra',
      };
    });
    window.PP_MODULO_FLUJO_META = meta;
  })();

  /**
   * Referencia informativa por fase (mapa en index): servicios externos típicos a integrar.
   * Solo lectura en UI; no altera rutas ni metadatos de pasos.
   */
  window.PP_FLUJO_INTEGRACIONES = {
    porFase: [
      {
        items: [
          {
            label: 'Direcciones y mapa',
            hint:
              'Autocomplete, geocodificación y selector en mapa (p. ej. Geoapify u otro proveedor de direcciones).',
            icon: 'fa-location-dot',
          },
          {
            label: 'KYC / identidad',
            hint: 'Verificación de identidad con Metamap (SDK web, seguimiento y revisión manual).',
            icon: 'fa-fingerprint',
          },
          {
            label: 'Backend y correo',
            hint:
              'Supabase (datos, auth, Edge Functions); envío de enlaces y avisos por email (magic link, plantillas).',
            icon: 'fa-plug',
          },
        ],
      },
      {
        items: [
          {
            label: 'Supabase',
            hint: 'Aplicaciones en revisión, verificaciones KYC y lógica en Edge Functions para operación interna.',
            icon: 'fa-database',
          },
          {
            label: 'Correo transaccional',
            hint: 'Notificaciones de estado, credenciales y comunicación con el comercio.',
            icon: 'fa-envelope',
          },
        ],
      },
      {
        items: [
          {
            label: 'Cobro (demo)',
            hint: 'Flujo de pago del prototipo; en producción se conecta a la pasarela definida por el producto.',
            icon: 'fa-credit-card',
          },
          {
            label: 'Comprobantes y email',
            hint: 'Envío de factura o comprobante al cliente (mailto, SMTP o API de correo).',
            icon: 'fa-file-invoice',
          },
        ],
      },
    ],
  };
})();
