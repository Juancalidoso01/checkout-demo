/**
 * Caso de negocio — datos para gráficas y textos.
 * Origen: https://docs.google.com/spreadsheets/d/1aA_WmZYIoDscBgRb_adag942RRaJTlDIS5bQycmtrTM/edit?gid=1960561278
 *
 * La hoja no está publicada en web: exporta (Archivo → Descargar → CSV)
 * o copia filas aquí. Reemplaza labels/values y párrafos por los tuyos.
 */
(function () {
  window.PP_CASO_NEGOCIO = {
    fuenteHoja:
      'https://docs.google.com/spreadsheets/d/1aA_WmZYIoDscBgRb_adag942RRaJTlDIS5bQycmtrTM/edit?gid=1960561278',

    /** true = muestra aviso de que las cifras son plantilla */
    usarDatosEjemplo: true,

    /** Portada de la revista (p. 1) */
    cover: {
      eyebrow: 'Revista digital · Punto Pago',
      lineas: ['Panamá', 'Red de agentes', 'Prototipo ejecutivo'],
    },

    /** Apertura (p. 2): lectura rápida antes del detalle */
    apertura: {
      titulo: 'Resumen ejecutivo',
      cuerpo:
        'Presentamos el caso de negocio en formato revista digital (mismo patrón que el modelo de referencia). El hilo: segmento y razón comercial en Panamá, mercado, problema, solución con agentes, economía, riesgos y cómo el mapa del demo materializa el recorrido.',
    },

    /**
     * Orden de presentación: 1) segmento / razón comercial (Panamá + agentes)
     * Ajusta títulos y textos a las filas de tu pestaña.
     */
    texto: {
      tituloPagina: 'Caso de negocio — Agentes en Panamá',
      heroDek:
        'Secuencia de presentación: segmento → mercado → problema → solución → economía → riesgos → demo. Las gráficas leen de este archivo.',

      segmento: {
        titulo: '1. Segmento y razón comercial',
        subtitulo: 'Por qué Panamá y por qué un modelo de red de agentes',
        intro:
          'Panamá concentra flujo comercial regional, alta bancarización relativa y, al mismo tiempo, segmentos que aún resuelven pagos y cobros en efectivo o con intermediación humana. Una red de agentes acerca el servicio al barrio, reduce fricción para el usuario final y da a la operadora un canal escalable de adquisición y recaudo.',
        bullets: [
          {
            titulo: 'Corredor y volumen',
            desc: 'Posición como hub comercial y financiero favorece operaciones transfronterizas y uso intensivo de remesas y pagos B2B/B2C.',
          },
          {
            titulo: 'Brecha última milla',
            desc: 'Quien no tiene tiempo, confianza digital o tarjeta prefiere un punto humano cercano: farmacia, tienda o comercio afiliado.',
          },
          {
            titulo: 'Razón para la empresa',
            desc: 'Comisiones por transacción, flotante y datos de comportamiento; el agente fideliza y reduce costo de servicio vs. sucursal propia.',
          },
        ],
      },

      mercado: {
        titulo: '2. Mercado y oportunidad',
        intro:
          'Dimensiona aquí tamaño de mercado, crecimiento y participación de canales (sustituye por cifras de tu hoja). La gráfica lee los arrays de charts.mercadoCrecimiento.',
      },

      problema: {
        titulo: '3. Problema a resolver',
        intro:
          'Fragmentación de sistemas, costo de onboarding de comercios, riesgo operativo y falta de visibilidad unificada del recorrido del cliente y del agente.',
        bullets: [
          'Varias herramientas para KYC, facturación y liquidaciones.',
          'Dificultad para auditar quién cobró qué y en qué ventanilla.',
          'Experiencia inconsistente entre digital y presencial.',
        ],
      },

      solucion: {
        titulo: '4. Propuesta: plataforma + red de agentes',
        intro:
          'Un solo stack que orqueste alta de comercio, riesgo, liquidaciones y experiencia del agente, con mapa de proceso claro para dirección y producto.',
      },

      economia: {
        titulo: '5. Lógica económica (resumen)',
        intro: 'Comisiones, ticket medio y penetración objetivo — alimenta la gráfica con tus supuestos de la hoja.',
      },

      riesgos: {
        titulo: '6. Riesgos y dependencias',
        bullets: [
          'Regulación SBP / normativa de corresponsalía (validar con legal).',
          'Seguridad física y fraude en ventanilla.',
          'Adopción de comercios y capacitación de agentes.',
        ],
      },

      demo: {
        titulo: '7. Cómo se conecta el demo Punto Pago',
        intro:
          'El mapa navegable materializa el recorrido acordado: desde captación hasta operación diaria. Es la capa de “historia común” sobre la que apoyas este caso.',
      },
    },

    /** Cada entrada: labels[], values[] (mismos length). Unidades en `unit` opcional para tooltip. */
    charts: {
      /** Ejemplo: reparto de volumen o preferencia de canal (sustituir) */
      segmentoCanal: {
        titulo: 'Peso relativo por tipo de canal (ejemplo)',
        tipo: 'doughnut',
        labels: ['Agentes / corresponsales', 'Digital directo', 'Sucursal / otro'],
        values: [42, 38, 20],
      },
      /** Ejemplo: serie anual o trimestral desde tu hoja */
      mercadoCrecimiento: {
        titulo: 'Evolución del indicador clave (ejemplo)',
        tipo: 'bar',
        labels: ['2022', '2023', '2024', '2025e'],
        values: [100, 118, 132, 151],
        unit: 'índice',
      },
      /** Ejemplo: reparto de ingresos o margen */
      economiaMix: {
        titulo: 'Estructura de ingresos objetivo (ejemplo)',
        tipo: 'bar',
        horizontal: true,
        labels: ['Comisión TX', 'Spread / FX', 'SaaS / otros'],
        values: [55, 30, 15],
        unit: '%',
      },
    },
  };
})();
