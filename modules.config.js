/**
 * Catálogo de módulos por ÁREA — edita aquí nombres y notas; mantén `ruta` alineada con archivos reales.
 * `areaId` / `moduloId`: identificadores estables para priorizar mejoras (ej. "sprint portal-agentes").
 */
(function () {
  window.PP_MODULOS_POR_AREA = [
    {
      areaId: 'pagos-demo',
      area: 'Cobros y comprobantes (demo)',
      items: [
        {
          moduloId: 'checkout',
          nombreTrabajo: 'Cobro con tarjeta (demo)',
          ruta: 'checkout.html',
          nota: 'Demo de flujos de pago; enlaza al portal agente.',
        },
        {
          moduloId: 'factura',
          nombreTrabajo: 'Comprobante o factura al cliente',
          ruta: 'agents/recharge.html?tab=factura',
          nota: 'Pestaña Factura del portal agente (único módulo; antes factura.html).',
        },
      ],
    },
    {
      areaId: 'portal-agentes',
      area: 'Operaciones del comercio',
      items: [
        {
          moduloId: 'agent-hub',
          nombreTrabajo: 'Inicio del portal: saldo y recargas',
          ruta: 'agents/recharge.html',
          nota: 'Tabs: recarga, histórico, factura, ACH, servicios. Sesión agent/employee.',
          roles: 'agent · employee',
        },
        {
          moduloId: 'agent-team',
          nombreTrabajo: 'Empleados del comercio',
          ruta: 'agents/team.html',
          nota: 'CRUD empleados en localStorage; requiere agentId.',
          roles: 'agent',
        },
        {
          moduloId: 'agent-cashout',
          nombreTrabajo: 'Retiro a cuenta bancaria',
          ruta: 'agents/cashout.html',
          nota: 'Flujo demo retiros / banco.',
        },
      ],
    },
    {
      areaId: 'admin',
      area: 'Equipo Punto Pago (interno)',
      items: [
        {
          moduloId: 'admin-entry',
          nombreTrabajo: 'Portal interno: login y altas',
          ruta: 'pp-admin-entry.html',
          nota: 'Login superadmin + credenciales; actualiza URLs absolutas si cambia el dominio del deploy.',
        },
        {
          moduloId: 'admin-panel',
          nombreTrabajo: 'Revisar solicitudes y aprobar',
          ruta: 'admin/index.html',
          nota: 'Gestión interna.',
        },
      ],
    },
    {
      areaId: 'onboarding',
      area: 'Alta del comercio',
      items: [
        {
          moduloId: 'onb-access',
          nombreTrabajo: 'Página pública: interés y contacto',
          ruta: 'onboarding-access.html',
          nota: 'Vitrina y mensajes para atraer al comercio; validación de acceso opcional (p. ej. Supabase magic link).',
        },
        {
          moduloId: 'onb-form',
          nombreTrabajo: 'Formulario de datos del negocio',
          ruta: 'onboarding.html',
          nota: 'Núcleo del expediente: datos del negocio y representantes.',
        },
        {
          moduloId: 'onb-contract',
          nombreTrabajo: 'Contrato y condiciones',
          ruta: 'onboarding-contract.html',
          nota: 'Firma / contrato.',
        },
        {
          moduloId: 'onb-review',
          nombreTrabajo: 'Solicitud enviada · en revisión',
          ruta: 'onboarding-review-pending.html',
          nota: 'Estado post envío.',
        },
      ],
    },
    {
      areaId: 'comercio-util',
      area: 'Acceso y ubicación',
      items: [
        {
          moduloId: 'setup',
          nombreTrabajo: 'Ajustes del comercio',
          ruta: 'setup.html',
          nota: 'Enlazado desde portal agente.',
        },
        {
          moduloId: 'login',
          nombreTrabajo: 'Entrada al portal del comercio',
          ruta: 'login.html',
          nota: 'auth.js · redirección por rol.',
        },
        {
          moduloId: 'mapa-picker',
          nombreTrabajo: 'Dirección y ubicación en mapa',
          ruta: 'mapa-picker.html',
          nota: 'Selector de ubicación; continúa el expediente tras el formulario base.',
        },
      ],
    },
    {
      areaId: 'sandbox',
      area: 'Pruebas técnicas (solo demo)',
      items: [
        {
          moduloId: 'test-kyc',
          nombreTrabajo: 'Prueba integración KYC',
          ruta: 'test-kyc-edge-function.html',
          nota: 'Sandbox.',
        },
        {
          moduloId: 'test-direccion',
          nombreTrabajo: 'Prueba autocompletar dirección',
          ruta: 'test-direccion.html',
          nota: 'Sandbox.',
        },
        {
          moduloId: 'test-mapa',
          nombreTrabajo: 'Prueba mapa y pin',
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
        titulo: 'Del interés al alta del comercio',
        journeyLabel: 'Vista del comercio (solicitante)',
        subtitulo:
          '1) Página pública para captar interés.\n2) Formulario con datos del negocio.\n3–5) Misma solicitud, después del formulario: ubicación en mapa, contrato y mensaje de “en revisión”.',
        ids: ['onb-access', 'onb-form', 'mapa-picker', 'onb-contract', 'onb-review'],
        /** Pasos que en el mapa se agrupan como continuación del formulario (paso 2). */
        subflujoDependeDeFormulario: ['mapa-picker', 'onb-contract', 'onb-review'],
      },
      {
        titulo: 'Equipo interno: revisar y aprobar',
        journeyLabel: 'Vista Punto Pago (operaciones)',
        subtitulo:
          '1) Portal interno: entrar y gestionar altas (correo del aliado, credenciales).\n2) Panel para revisar expedientes cuando el comercio ya envió el onboarding.',
        ids: ['admin-entry', 'admin-panel'],
      },
      {
        titulo: 'Comercio en día a día (portal)',
        journeyLabel: 'Vista del comercio (ya dado de alta)',
        subtitulo:
          '1) Solo el acceso con usuario cuenta como “paso” del mapa.\n2) El resto son pantallas del mismo portal (cobros, equipo, ajustes…): útiles, pero no son pasos nuevos del alta.',
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
      var opLists = [fase.subflujoFuncionesAgente];
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
