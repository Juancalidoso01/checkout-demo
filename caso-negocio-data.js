/**
 * Caso de negocio — datos para gráficas y textos.
 * Origen: https://docs.google.com/spreadsheets/d/1aA_WmZYIoDscBgRb_adag942RRaJTlDIS5bQycmtrTM/edit?gid=1960561278
 *
 * Demografía Panamá: órdenes de magnitud coherentes con Banco Mundial / ONU (2023–2024);
 * distritos: referencia interna 2023; validar con INEC para uso oficial.
 *
 * Presentación de cifras (tablas): alinear números a la derecha y usar cifras tabulares donde aplica;
 * ver guías de tablas (p. ej. Nielsen Norman Group) y claridad en visualización financiera (CFI / informes).
 */
(function () {
  window.PP_CASO_NEGOCIO = {
    fuenteHoja:
      'https://docs.google.com/spreadsheets/d/1aA_WmZYIoDscBgRb_adag942RRaJTlDIS5bQycmtrTM/edit?gid=1960561278',

    cover: {
      eyebrow: 'Punto Pago',
      titulo: 'Agentes en Panamá',
      subtitulo: 'Mercado, inversión digital y retorno a accionistas.',
    },

    apertura: {
      eyebrow: 'Sesión',
      titulo: 'Lo que vemos hoy',
      cuerpo:
        'Contexto breve en esta página. El índice de todo el caso está en la página siguiente (03).',
    },

    indiceFlipbook: {
      titulo: 'Índice',
      intro: 'Elige una sección para saltar a esa página.',
      navTitulo: 'Contenido',
    },

    indicePaginas: [
      { capitulo: 'I · Panamá y escenarios (4–6)' },
      { pagina: 4, texto: 'Demografía y urbano / rural' },
      { pagina: 5, texto: 'Territorio: contexto y población por cabecera' },
      { pagina: 6, texto: 'Escenarios con 2 500 puntos' },
      { capitulo: 'II · Tamaño del mercado (7–8)' },
      { pagina: 7, texto: 'Colombia vs Panamá + supuestos del ajuste' },
      { pagina: 8, texto: 'TAM / SAM / SOM y visual' },
      { capitulo: 'III · Esfuerzo comercial (9–10)' },
      { pagina: 9, texto: 'Presupuesto digital (M1–M6)' },
      { pagina: 10, texto: 'Presupuesto digital (M7–M12) + red' },
      { capitulo: 'IV · Decisión y retorno (11–15)' },
      { pagina: 11, texto: 'Gantt relanzamiento (1/2): Fundación a producto' },
      { pagina: 12, texto: 'Gantt relanzamiento (2/2): Comercial a rebranding' },
      { pagina: 13, texto: 'Segmento (resumen)' },
      { pagina: 14, texto: 'Mercado y problema' },
      { pagina: 15, texto: 'Solución, economía, ganancia y demo' },
    ],

    /**
     * Gastos y esfuerzos digitales (plan anual): dos tablas en el flipbook (09–10).
     * Valores mensuales en US$ salvo filas de puntos (enteros) y CAC (US$ por punto nuevo).
     */
    recursosMarketing: {
      tituloPrimera: 'Gastos y esfuerzos digitales (1/2)',
      introPrimera:
        'Pauta, mensajería, referidos, contenido y apoyo admin. US$ M1–M6; última columna = suma del semestre.',
      tituloSegunda: 'Gastos y esfuerzos digitales (2/2)',
      introSegunda:
        'M7–M12 y total año. Pie: puntos nuevos, CAC del plan y acumulados (* = cierre proyectado).',
      filas: [
        {
          tipo: 'usd',
          canal: 'Google Ads',
          meses: [800, 900, 1000, 1200, 1300, 1400, 1500, 1600, 1600, 1500, 1300, 1000],
        },
        {
          tipo: 'usd',
          canal: 'Meta Ads',
          meses: [500, 600, 700, 800, 900, 1000, 1000, 1100, 1100, 1000, 900, 700],
        },
        {
          tipo: 'usd',
          canal: 'WhatsApp / Email',
          meses: [150, 150, 200, 200, 250, 250, 300, 300, 300, 250, 200, 150],
        },
        {
          tipo: 'usd',
          canal: 'Programa Referidos',
          meses: [200, 300, 400, 500, 600, 700, 800, 900, 1000, 900, 700, 500],
        },
        {
          tipo: 'usd',
          canal: 'Contenido / Material',
          meses: [350, 250, 200, 200, 150, 150, 100, 100, 100, 100, 100, 100],
        },
        {
          tipo: 'usd',
          canal: 'Mano de obra, apoyo administrativo',
          meses: [1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200],
        },
        {
          tipo: 'usd',
          canal: 'Total marketing',
          meses: [3200, 2200, 2500, 2900, 3200, 3500, 3700, 4000, 4100, 3750, 3200, 2450],
          destacado: true,
        },
        {
          tipo: 'entero',
          canal: 'Puntos nuevos',
          meses: [80, 120, 180, 220, 250, 280, 300, 320, 320, 250, 110, 70],
          destacado: true,
        },
        {
          tipo: 'cac',
          canal: 'CAC (US$ por punto nuevo)',
          meses: [40, 18, 14, 13, 13, 13, 12, 13, 13, 15, 29, 35],
          totalCacAnual: 227,
        },
        {
          tipo: 'acum',
          canal: 'Puntos acumulados',
          meses: [140, 260, 440, 660, 910, 1190, 1490, 1810, 2130, 2380, 2490, 2560],
          asteriscoUltimoMes: true,
        },
      ],
    },

    /**
     * Gantt de relanzamiento (pp. 11–12): dos páginas con dos tablas cada una (secciones).
     * tipo: gantt — secciones[] opcional: cada bloque reutiliza columnas y notaPie en la última sección si aplica.
     * w[] por fila: 0 vacío, 1 ligero, 2 medio, 3 alto (según bloques █ del plan).
     */
    guiasPreguntas: [
      {
        titulo: 'Relanzamiento — Gantt (1/2): Fundación a producto',
        tipo: 'gantt',
        introduccion:
          'Cada columna agrupa 4 semanas (hasta 20 semanas). Las barras muestran intensidad relativa de ejecución, no fechas fijas. Fase 2 acelera primera transacción; Fase 3 suma servicios y monetización incremental.',
        columnas: ['S 1–4', 'S 5–8', 'S 9–12', 'S 13–16', 'S 17–20'],
        secciones: [
          {
            subtitulo: '1 · Fundación',
            filas: [
              {
                fase: '1. Fundación',
                bloque: 'Onboarding digital (KYC, contratos, credenciales)',
                w: [3, 2, 0, 0, 0],
                obs: 'Base para activación',
              },
              { fase: '', bloque: 'Acreditación automática', w: [3, 2, 0, 0, 0], obs: 'Eliminación de procesos manuales' },
              { fase: '', bloque: 'Facturación y comisiones optimizadas', w: [3, 2, 0, 0, 0], obs: 'Mejora flujo financiero' },
              { fase: '', bloque: 'Estabilidad operativa', w: [3, 3, 2, 0, 0], obs: 'Continuo' },
              { fase: '', bloque: 'Mejora APIs operadores', w: [3, 3, 0, 0, 0], obs: 'Crítico para conversión' },
              { fase: '', bloque: 'Mejora consulta de clientes', w: [3, 3, 0, 0, 0], obs: 'Reduce errores y reclamos' },
            ],
          },
          {
            subtitulo: '2 y 3 · Activación y producto',
            filas: [
              { fase: '2. Activación', bloque: 'Flujo de primer uso', w: [0, 0, 3, 2, 0], obs: 'Reduce tiempo a primera transacción' },
              { fase: '', bloque: 'Incentivos iniciales', w: [0, 0, 3, 2, 0], obs: 'Activación temprana' },
              { fase: '', bloque: 'Soporte (chat / Intercom)', w: [0, 0, 3, 3, 2], obs: 'Soporte continuo' },
              { fase: '3. Producto', bloque: 'Nuevos servicios (ACH, Yappy, PayPal)', w: [0, 0, 0, 3, 2], obs: 'Incremento de valor' },
              { fase: '', bloque: 'Tarjeta débito / uso de fondos', w: [0, 0, 0, 3, 2], obs: 'Monetización' },
              { fase: '', bloque: 'Remesas / P2P en app', w: [0, 0, 3, 3, 2], obs: 'Expansión de ecosistema' },
            ],
          },
        ],
      },
      {
        titulo: 'Relanzamiento — Gantt (2/2): Comercial a rebranding',
        tipo: 'gantt',
        introduccion:
          'Fase 4 llena el embudo; Fase 5 acelera escala con aliados cuando el producto y APIs sostienen volumen. Fase 6 captura valor recurrente; Fase 7 cuando la operación y conversión ya están sostenidas.',
        columnas: ['S 1–4', 'S 5–8', 'S 9–12', 'S 13–16', 'S 17–20'],
        secciones: [
          {
            subtitulo: '4 y 5 · Comercialización y distribución',
            filas: [
              { fase: '4. Comercialización', bloque: 'Preparación comercial (scripts, materiales)', w: [0, 0, 2, 2, 0], obs: 'Etapa de validación' },
              { fase: '', bloque: 'Campañas digitales', w: [0, 0, 0, 3, 2], obs: 'Escalamiento' },
              { fase: '', bloque: 'Canales directos (WhatsApp, email)', w: [0, 0, 0, 3, 2], obs: 'Conversión' },
              { fase: '', bloque: 'Programa de referidos', w: [0, 0, 2, 3, 2], obs: 'Optimización CAC' },
              { fase: '5. Distribución', bloque: 'Partnerships (B2B2B)', w: [0, 0, 0, 2, 3], obs: 'Escala no lineal' },
              { fase: '', bloque: 'Integraciones con terceros', w: [0, 0, 0, 2, 3], obs: 'Dependiente de APIs' },
            ],
          },
          {
            subtitulo: '6 y 7 · Retención y rebranding',
            filas: [
              { fase: '6. Retención y expansión', bloque: 'Gamificación e incentivos', w: [0, 0, 0, 3, 3], obs: 'Incremento de uso' },
              { fase: '', bloque: 'Cross-sell / upsell', w: [0, 0, 0, 3, 3], obs: 'Mayor ingreso por cliente' },
              { fase: '7. Rebranding', bloque: 'Estrategia de marca', w: [0, 0, 0, 2, 3], obs: 'Preparación' },
              { fase: '', bloque: 'Lanzamiento al mercado', w: [0, 0, 0, 0, 3], obs: 'Activación masiva' },
            ],
            notaPie:
              'Control sugerido: CAC por agente activado, % que transacciona en 7 días, GMV por agente, retención 30/60/90 y CPA real.',
          },
        ],
      },
    ],

    /** Panamá: demografía y nota metodológica */
    panama: {
      titulo: 'Panamá en contexto',
      subtitulo: 'Demografía y dispersión territorial',
      intro:
        'Mercado compacto y heterogéneo: mucho peso en el eje urbano y corredores; rural y cabeceras medianas donde el punto humano y el efectivo siguen contando.',
      poblacionMillones: 4.4,
      pctUrbano: 73,
      pctRural: 27,
      nota:
        'Población total de referencia ~4,4 millones (2023–2024). Urbanización ~73 % urbano / ~27 % rural (órdenes de magnitud típicos Banco Mundial / ONU). Cifras redondeadas para storytelling; cierre oficial con INEC.',
    },

    /** Mapa por provincia (referencia 2023 aproximada para storytelling). */
    provinciasMapa: [
      { nombre: 'Bocas del Toro', poblacion: 170000, x: 7, y: 24, align: 'right', dx: 0, dy: 0 },
      { nombre: 'Chiriquí', poblacion: 470000, x: 11, y: 58, align: 'right', dx: 0, dy: 0 },
      { nombre: 'Veraguas', poblacion: 260000, x: 28, y: 58, align: 'right', dx: 0, dy: 0 },
      { nombre: 'Coclé', poblacion: 280000, x: 40, y: 48, align: 'right', dx: 0, dy: 0 },
      { nombre: 'Herrera', poblacion: 125000, x: 40, y: 72, align: 'right', dx: 0, dy: 0 },
      { nombre: 'Los Santos', poblacion: 100000, x: 46, y: 82, align: 'right', dx: 0, dy: 0 },
      { nombre: 'Colón', poblacion: 300000, x: 44, y: 30, align: 'top', dx: 0, dy: 0 },
      { nombre: 'Panamá Oeste', poblacion: 730000, x: 52, y: 42, align: 'right', dx: 0, dy: 0 },
      { nombre: 'Panamá', poblacion: 2050000, x: 58, y: 40, align: 'right', dx: 0, dy: 0 },
      { nombre: 'Darién', poblacion: 80000, x: 82, y: 52, align: 'left', dx: 0, dy: 0 },
    ],

    /** Alineado con la red de ejemplo en escenarios (2 500 puntos). */
    distritosRedReferencia: 2500,

    distritosTitulo: 'Territorio: contexto para quien no conoce Panamá',

    distritosIntro:
      'Antes de números de red o de mercado, ubicamos la concentracion poblacional por provincia en Panama (referencia 2023, aproximada). El mapa es de contexto para junta y no reemplaza la validacion oficial con INEC.',

    distritosNota:
      'Cifras referenciales para narrativa ejecutiva (INEC en version final). La red de 2.500 puntos se usa en la pagina siguiente solo como escenario de modelado.',

    /** Tarjeta de contexto geográfico (p. 05): audiencias que no ubican el país. */
    distritosContexto: {
      caption: 'Referencia rápida',
      bullets: [
        'Panamá es un istmo en Centroamérica; frontera con Costa Rica (oeste) y Colombia (sureste).',
        'Moneda de curso legal: balboa y dólar estadounidense (US$) a la par.',
        'Mucho del comercio formal y la densidad de transacciones se concentran en el área metropolitana y corredores cercanos.',
      ],
    },

    /** Escenarios de negocio — 2 500 puntos, ingreso bruto 1,2 % */
    escenarios: {
      titulo: 'Escenarios comparativos',
      intro:
        'En la página anterior vimos dónde se concentra la población; aquí fijamos una red de ejemplo de 2 500 puntos (solo para ordenar magnitudes) e ingreso bruto al 1,2 % del volumen. Cuatro escenarios; una fila calibra ritmo tipo referente colombiano; las barras resumen y el detalle está en la tabla.',
      notaCac:
        'CAC = costo de ganar un cliente nuevo. Referencia Colombia (mercado maduro): US$200–US$260 por cliente.',
      filas: [
        {
          escenario: 'Conservador',
          transaccionesAnuales: 8000000,
          ticketUsd: 25,
          volumenUsd: 200000000,
          txPorPuntoMes: 267,
          ingresoBrutoUsd: 2400000,
        },
        {
          escenario: 'Realista',
          transaccionesAnuales: 12000000,
          ticketUsd: 30,
          volumenUsd: 360000000,
          txPorPuntoMes: 400,
          ingresoBrutoUsd: 4320000,
        },
        {
          escenario: 'Agresivo',
          transaccionesAnuales: 18000000,
          ticketUsd: 35,
          volumenUsd: 630000000,
          txPorPuntoMes: 600,
          ingresoBrutoUsd: 7560000,
        },
        {
          escenario: 'Modelo Puntored proporcional 2024',
          transaccionesAnuales: 30000000,
          ticketUsd: 17,
          volumenUsd: 500000000,
          txPorPuntoMes: 1000,
          ingresoBrutoUsd: 6000000,
          ingresoBrutoAprox: true,
        },
      ],
    },

    /**
     * Mercado en dos páginas: 07 = comparación; 08 = TAM/SAM/SOM + gráfica + tabla niveles.
     */
    tamSam: {
      titulo: 'Colombia y Panamá en la misma idea',
      introComparacion:
        'Colombia (referente 2024, ejemplo Puntored): red madura. Panamá: cifras del caso, no copia. Cada fila compara una misma métrica. Debajo, tres supuestos que explican el salto de país.',
      puenteTitulo: 'Tres supuestos del ajuste Panamá',
      puenteIntro:
        'Transparencia breve: qué fijamos para que el referente no se lea como “lo mismo en otro país”.',
      puenteFilas: [
        {
          supuesto: 'Escala de país',
          detalle: 'Población y PIB menor → menos puntos y otro volumen; no extrapolamos market share 1:1.',
        },
        {
          supuesto: 'Ticket y uso',
          detalle: 'Panamá con ticket medio más alto en el relato; intensidad de uso calibrada aparte de Colombia.',
        },
        {
          supuesto: 'SOM como elección',
          detalle: 'Varias filas SOM = planes distintos (cuota de mercado), no predicciones únicas.',
        },
      ],
      tituloSegunda: 'TAM, SAM y SOM: tres tamaños del pastel',
      introPasteles:
        'Embudo: TAM (techo teórico) → SAM (donde competimos con red física) → SOM (lo alcanzable en el horizonte con recursos y competencia). La barra y la tabla cuantifican; una fila toma proporción del referente colombiano solo como escenario, no como hecho.',
      metricas: [
        {
          metrica: 'Población',
          colombia: '52 M',
          panama: '4,4 M',
          explicacion: 'Panamá es mucho más chica en habitantes.',
        },
        {
          metrica: 'Usuarios activos mensuales',
          colombia: '11 M',
          panama: '700 k – 950 k',
          explicacion: 'Personas que usan la red al menos una vez al mes.',
        },
        {
          metrica: 'Transacciones anuales',
          colombia: '330 M',
          panama: '28 M – 32 M',
          explicacion: 'Cada pago o cobro que pasa por el canal en un año.',
        },
        {
          metrica: 'Ticket promedio',
          colombia: 'US$17',
          panama: 'US$25 – US$35',
          explicacion: 'Monto promedio por venta; en el caso Panamá va un poco más alto.',
        },
        {
          metrica: 'Volumen anual',
          colombia: 'US$5,5 B',
          panama: 'US$700 M – US$1,0 B',
          explicacion: 'Dinero total que mueve el canal en un año.',
        },
        {
          metrica: 'Corresponsales activos',
          colombia: '55 000',
          panama: '2 000 – 3 000',
          explicacion: 'Puntos o comercios que atienden como red.',
        },
        {
          metrica: 'Transacciones por punto / mes',
          colombia: '500',
          panama: '400 – 600',
          explicacion: 'Ventas mensuales por punto; rango parecido al país grande.',
        },
      ],
      niveles: [
        {
          nivel: 'TAM',
          volumen: 'US$4,5 B – US$5 B',
          usuarios: '2,9 M adultos',
          supuesto: 'Todo lo que la gente podría pagar en efectivo o con ayuda en un punto, si el mundo fuera perfecto.',
        },
        {
          nivel: 'SAM',
          volumen: 'US$1,6 B – US$1,8 B',
          usuarios: '1,0 M – 1,2 M',
          supuesto: 'Solo la parte donde de verdad la gente querría usar una red física como la nuestra.',
        },
        {
          nivel: 'SOM (15 %)',
          volumen: 'US$240 M – US$270 M',
          usuarios: '~600 k usuarios',
          supuesto: 'Un plan prudente: ganamos una parte chica pero seria del pastel mediano.',
        },
        {
          nivel: 'SOM (25 %)',
          volumen: 'US$400 M – US$450 M',
          usuarios: '~800 k usuarios',
          supuesto: 'Un plan más fuerte: más gente usando la red y más dinero moviéndose.',
        },
        {
          nivel: 'SOM (ejemplo proporcional Puntored 2024)',
          volumen: 'US$470 M – US$600 M',
          usuarios: '~900 k usuarios',
          supuesto:
            'Un plan inspirado en el país grande: tomamos la misma “forma” del negocio maduro y la bajamos al tamaño de Panamá, sin decir que va a pasar igual mañana.',
        },
      ],
    },

    texto: {
      tituloPagina: 'Agentes en Panamá',
      heroDek: 'Mercado Panamá · plan digital · retorno a accionistas.',

      segmento: {
        titulo: 'Segmento y razón comercial',
        subtitulo: 'Por qué Panamá y por qué un modelo de red de agentes',
        intro:
          'Tres ideas que cierran el “por qué aquí”: corredor, última milla humana, economía de canal vs. sucursal.',
        bullets: [
          {
            titulo: 'Corredor',
            desc: 'Remesas y pagos con alta rotación de efectivo.',
          },
          {
            titulo: 'Última milla',
            desc: 'Confianza y proximidad en comercio o agente.',
          },
          {
            titulo: 'Operadora',
            desc: 'Comisiones y datos; menos costo que ventanilla propia.',
          },
        ],
      },

      mercado: {
        titulo: 'Mercado y oportunidad',
        intro:
          'Gráfica de ejemplo: el canal físico sigue relevante junto al digital; el tamaño en dinero ya está en 07–08.',
      },

      problema: {
        titulo: 'Problema a resolver',
        intro:
          'Fragmentación de sistemas, costo de onboarding de comercios, riesgo operativo y falta de visibilidad unificada del recorrido del cliente y del agente.',
        bullets: [
          'Varias herramientas para KYC, facturación y liquidaciones.',
          'Dificultad para auditar quién cobró qué y en qué ventanilla.',
          'Experiencia inconsistente entre digital y presencial.',
        ],
      },

      solucion: {
        titulo: 'Propuesta: plataforma + red de agentes',
        intro:
          'Un stack y un mapa de proceso para alta, riesgo, liquidaciones y experiencia del agente.',
      },

      economia: {
        titulo: 'Lógica económica (resumen)',
        intro:
          'Mix de ingresos de ejemplo; contrastar con p. 06 y 07–08. Debajo: ganancia año tras año (ejemplo) para accionistas.',
      },

      riesgos: {
        titulo: 'Riesgos y dependencias',
        bullets: [
          'Regulación SBP / normativa de corresponsalía (validar con legal).',
          'Seguridad física y fraude en ventanilla.',
          'Adopción de comercios y capacitación de agentes.',
        ],
      },

      demo: {
        titulo: 'Cómo se conecta el demo Punto Pago',
        intro:
          'Mapa del recorrido captación → operación; enlace al mapa y a la hoja cuando la tengas.',
      },
    },

    /**
     * Proyección ilustrativa — página 15 (cierre), bloque interactivo bajo la gráfica de economía.
     */
    gananciaAnual: {
      titulo: 'Ganancia año tras año',
      intro:
        'US$ de ejemplo. Aro = tamaño relativo al año 5; pulsa un año para repetir la animación.',
      anios: [
        { n: 1, montoUsd: 1738980 },
        { n: 2, montoUsd: 2608470 },
        { n: 3, montoUsd: 3912705 },
        { n: 4, montoUsd: 5869058 },
        { n: 5, montoUsd: 8803586 },
      ],
    },

    charts: {
      panamaUrbano: {
        titulo: 'Población por entorno (referencia)',
        tipo: 'doughnut',
        labels: ['Urbano', 'Rural'],
        values: [73, 27],
      },
      escenariosVolumen: {
        titulo: 'Volumen anual por escenario (US$ M)',
        tipo: 'bar',
        labels: ['Conservador', 'Realista', 'Agresivo', 'Puntored ref.'],
        values: [200, 360, 630, 500],
        unit: 'Millones USD',
      },
      escenariosIngresoBruto: {
        titulo: 'Ingreso bruto anual (1,2 %) — US$ M',
        tipo: 'bar',
        labels: ['Conservador', 'Realista', 'Agresivo', 'Puntored ref.'],
        values: [2.4, 4.32, 7.56, 6.0],
        unit: 'Millones USD',
      },
      tamSamVolumen: {
        titulo: 'Cuánto dinero mueve cada tamaño de pastel (punto medio del rango)',
        tipo: 'bar',
        horizontal: true,
        labels: ['TAM', 'SAM', 'SOM 15 %', 'SOM 25 %', 'SOM proporcional'],
        values: [4.75, 1.7, 0.255, 0.425, 0.535],
        unit: 'Miles de millones USD',
      },
      segmentoCanal: {
        titulo: 'Peso relativo por tipo de canal (ejemplo)',
        tipo: 'doughnut',
        labels: ['Agentes / corresponsales', 'Digital directo', 'Sucursal / otro'],
        values: [42, 38, 20],
      },
      mercadoCrecimiento: {
        titulo: 'Índice de actividad canal físico (ejemplo)',
        tipo: 'bar',
        labels: ['2022', '2023', '2024', '2025e'],
        values: [100, 118, 132, 151],
        unit: 'índice',
      },
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
