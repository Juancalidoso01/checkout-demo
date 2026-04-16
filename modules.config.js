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
})();
