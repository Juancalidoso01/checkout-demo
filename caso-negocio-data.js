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
      { capitulo: 'IV · Decisión y retorno (11–16)' },
      { pagina: 11, texto: 'Cronograma pipeline (1/2): Fundación a producto' },
      { pagina: 12, texto: 'Cronograma pipeline (2/2): Comercial a rebranding' },
      { pagina: 13, texto: 'Participación por segmento (gráfico)' },
      { pagina: 14, texto: 'Oferta de valor: comercio y cliente' },
      { pagina: 15, texto: 'Solución, economía, ganancia y demo' },
      { pagina: 16, texto: 'Benchmark de competencia' },
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
        titulo: 'Relanzamiento — Cronograma pipeline (1/2): Fundación a producto',
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
        titulo: 'Relanzamiento — Cronograma pipeline (2/2): Comercial a rebranding',
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

    /**
     * Población por provincia (referencia ~2023, storytelling).
     * `slug` enlaza cada región del SVG esquemático (caso-negocio.html) con la cifra (tooltip al hover / foco).
     */
    provinciasMapa: [
      { slug: 'bocas-del-toro', nombre: 'Bocas del Toro', poblacion: 170000 },
      { slug: 'chiriqui', nombre: 'Chiriquí', poblacion: 470000 },
      { slug: 'veraguas', nombre: 'Veraguas', poblacion: 260000 },
      { slug: 'cocle', nombre: 'Coclé', poblacion: 280000 },
      { slug: 'herrera', nombre: 'Herrera', poblacion: 125000 },
      { slug: 'los-santos', nombre: 'Los Santos', poblacion: 100000 },
      { slug: 'colon', nombre: 'Colón', poblacion: 300000 },
      { slug: 'panama-oeste', nombre: 'Panamá Oeste', poblacion: 730000 },
      { slug: 'panama', nombre: 'Panamá', poblacion: 2050000 },
      { slug: 'darien', nombre: 'Darién', poblacion: 80000 },
    ],

    /** Alineado con la red de ejemplo en escenarios (2 500 puntos). */
    distritosRedReferencia: 2500,

    distritosTitulo: 'Territorio: contexto para quien no conoce Panamá',

    distritosIntro:
      'Mapa base con margen alrededor del istmo y límites reales: cada provincia tiene contorno interactivo; comarcas visibles sin dato al pasar el cursor. Pase el cursor o use Tab. Cierre oficial con INEC.',

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
        'Misma métrica en ambos países: Colombia como referente de red consolidada (2024; ej. Puntored) y Panamá con las cifras de este caso. Abajo, tres supuestos que contextualizan la brecha.',
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
        titulo: 'Segmento de agentes (situación actual)',
        subtitulo: 'Participación del volumen por tipo de punto',
        intro:
          'Total US$ por segmento en el periodo de referencia. En el gráfico, el monto aparece dentro de cada porción; la leyenda identifica el segmento.',
        bullets: [
          {
            titulo: 'Cooperativa',
            desc: 'Concentra la mayor parte del volumen reportado en el periodo.',
          },
          {
            titulo: 'Long tail',
            desc: 'Aeropuerto, farmacias, electrónica y comercios naturales complementan el mix.',
          },
          {
            titulo: 'Altas recientes',
            desc: 'Minisuper y otros segmentos con arranque en meses recientes.',
          },
        ],
      },

      ofertaValor: {
        titulo: 'Oferta de valor',
        intro:
          'Oferta de valor en espejo: cada fila contrasta el mismo beneficio para el comercio que opera el punto y para quien paga o cobra ahí. Tras el tamaño de mercado (07–08), aquí se ve el valor percibido en la operación.',
        filas: [
          {
            dimension: 'Ingresos / Ahorro',
            comercio: 'Genera comisiones por cada transacción',
            cliente: 'Ahorra tiempo y costos de desplazamiento',
          },
          {
            dimension: 'Acceso',
            comercio: 'Accede a servicios financieros sin ser banco',
            cliente: 'Acceso cercano a servicios financieros',
          },
          {
            dimension: 'Conveniencia',
            comercio: 'Ofrece múltiples servicios en un solo punto',
            cliente: 'Resuelve todo en un solo lugar',
          },
          {
            dimension: 'Rapidez',
            comercio: 'Procesos ágiles y acreditación rápida',
            cliente: 'Transacciones inmediatas',
          },
          {
            dimension: 'Liquidez',
            comercio: 'Uso inmediato del dinero recibido',
            cliente: 'Disponibilidad rápida de pagos y recargas',
          },
          {
            dimension: 'Tráfico / Frecuencia',
            comercio: 'Aumenta visitas al local',
            cliente: 'Punto cercano y recurrente',
          },
          {
            dimension: 'Fidelización / Confianza',
            comercio: 'Se posiciona como punto clave en la comunidad',
            cliente: 'Confía en un comercio conocido',
          },
          {
            dimension: 'Portafolio',
            comercio: 'Amplia oferta (recargas, pagos, billetera, transferencias)',
            cliente: 'Variedad de servicios disponibles',
          },
          {
            dimension: 'Simplicidad',
            comercio: 'Operación fácil y onboarding rápido',
            cliente: 'Uso simple y sin fricción',
          },
          {
            dimension: 'Inclusión',
            comercio: 'Amplía su alcance a más clientes',
            cliente: 'Puede operar sin depender totalmente de un banco',
          },
        ],
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

      /**
       * Benchmark (p. 16): columnas = competidor + logo. Celdas bool: true / false / null (null = pendiente, se muestra —).
       * Texto: cadenas por columna; use \\n para segunda línea. Sustituye logos en assets/magazine/competitors/ si usas marca oficial.
       * Puntos por provincia: `archivoPuntos` por competidor (URL o ruta bajo el repo). Si todos comparten el mismo archivo, usa solo `archivoPuntosDefecto`.
       * Formatos: .html embebible; .pdf con visor del navegador; Excel/Sheets/enlace genérico → solo botón «Abrir en pestaña nueva».
       */
      benchmarkCompetencia: {
        titulo: 'Benchmark de competencia',
        intro:
          'Comparativo en Panamá. ✓ / ✕ según corresponda; — indica dato pendiente de validar. Toca la cabecera de cada competidor (logo) para abrir el detalle de puntos por provincia cuando el archivo esté enlazado.',
        notaPie:
          'Leyenda: en «Exclusivo de su propio banco», ✓ significa que el modelo es cerrado sobre la red de ese banco. En «Solo pagos y corresponsalía», ✓ indica foco acotado a esos servicios. Los totales de la primera fila se pueden alinear con ese detalle.',
        etiquetaVerPuntos: 'Ver puntos por provincia',
        sinArchivoLeyenda: 'Archivo próximo',
        /** Misma ruta para todos los competidores si comparten un solo documento (p. ej. PDF con secciones). */
        archivoPuntosDefecto: '',
        competidores: [
          { nombre: 'Rapibac', logo: 'assets/magazine/competitors/rapibac.svg', archivoPuntos: '' },
          { nombre: 'Caja Amiga', logo: 'assets/magazine/competitors/caja-amiga.svg', archivoPuntos: '' },
          { nombre: 'Banistmo PTM', logo: 'assets/magazine/competitors/banistmo-ptm.svg', archivoPuntos: '' },
          { nombre: 'Western Union', logo: 'assets/magazine/competitors/western-union.svg', archivoPuntos: '' },
        ],
        filas: [
          {
            criterio: 'Cantidad de puntos (total)',
            tipo: 'texto',
            celdas: ['—', '—', '—', '—'],
          },
          { criterio: 'Terminal POS', tipo: 'bool', celdas: [null, null, null, null] },
          { criterio: 'Operación con balance de cuentas', tipo: 'bool', celdas: [null, null, null, null] },
          { criterio: 'Exclusivo de su propio banco (red cerrada)', tipo: 'bool', celdas: [null, null, null, null] },
          {
            criterio: 'Solo pagos y corresponsalía bancaria (sin mix más amplio)',
            tipo: 'bool',
            celdas: [null, null, null, null],
          },
          {
            criterio: 'Debida diligencia y tiempo de alta',
            tipo: 'texto',
            celdas: [
              '—\nRegular / tradicional: pendiente',
              '—\nRegular / tradicional: pendiente',
              '—\nRegular / tradicional: pendiente',
              '—\nRegular / tradicional: pendiente',
            ],
          },
        ],
      },
    },

    /**
     * Agregados por segmento (nombre agente) y mes 01–12. Celdas vacías = sin actividad en ese mes.
     * Totales mensuales y gran total: fila de control del extracto compartido.
     */
    agentesSegmentoActual: {
      tituloResumen: 'Totales por segmento (US$)',
      introResumen:
        'Participación sobre el total del periodo. Valores con separador de miles; “—” indica mes sin movimiento en ese segmento.',
      tituloDetalle1: 'Enero a junio',
      tituloDetalle2: 'Julio a diciembre + total anual por fila',
      notaDetalle:
        'La fila “Total mes” suma todos los segmentos; debe coincidir con la suma de la columna “Total” por segmento.',
      chartTitulo: 'Participación por segmento (total US$ en el periodo)',
      filas: [
        {
          segmento: 'Aeropuerto',
          corto: 'Aeropuerto',
          meses: [5557, 6195, 6583, 5426, 3353, 130, 82, 5571, 4335, 3393, 3658, 4385],
          total: 48670,
        },
        {
          segmento: 'Café internet',
          corto: 'Café internet',
          meses: [4221, 4902, 5400, 5677, 4442, 4818, 5992, 6163, 5611, 6323, 5661, 6282],
          total: 65492,
        },
        {
          segmento: 'Cooperativa',
          corto: 'Cooperativa',
          meses: [
            235127, 218830, 201725, 197714, 239501, 221059, 221475, 214202, 216674, 218558, 171391, 207673,
          ],
          total: 2563928,
        },
        {
          segmento: 'Electrónica',
          corto: 'Electrónica',
          meses: [11532, 8547, 7021, 6590, 8011, 7767, 8817, 7107, 11925, 6373, 5745, 7769],
          total: 97205,
        },
        {
          segmento: 'Farmacias',
          corto: 'Farmacias',
          meses: [4478, 4964, 5864, 5459, 6040, 6169, 6599, 7284, 7276, 7096, 5681, 7649],
          total: 74558,
        },
        {
          segmento: 'Minisuper',
          corto: 'Minisuper',
          meses: [null, null, null, null, null, null, null, null, 5243, 16337, 11011, null],
          total: 32591,
        },
        {
          segmento: 'Mueblería',
          corto: 'Mueblería',
          meses: [null, null, null, null, null, null, null, null, null, null, 6834, null],
          total: 6834,
        },
        {
          segmento: 'Naturales / pequeños comercios',
          corto: 'Naturales',
          meses: [6252, 6095, 7362, 13191, 7418, 7405, 11725, 11299, 10695, 14840, 11400, 11746],
          total: 119429,
        },
        {
          segmento: 'Servicios de contabilidad',
          corto: 'Contabilidad',
          meses: [12700, 17897, 7368, 11255, 11835, 8960, 20049, 18375, 19568, 16245, 15613, null],
          total: 159865,
        },
      ],
      totalesMensuales: [
        267167, 262234, 251851, 241427, 280018, 259183, 263650, 271675, 274891, 281394, 236118, 278963,
      ],
      granTotal: 3168572,
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
