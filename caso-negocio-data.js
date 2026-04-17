/**
 * Caso de negocio — datos para gráficas y textos.
 * Origen: https://docs.google.com/spreadsheets/d/1aA_WmZYIoDscBgRb_adag942RRaJTlDIS5bQycmtrTM/edit?gid=1960561278
 *
 * Demografía Panamá: órdenes de magnitud coherentes con Banco Mundial / ONU (2023–2024);
 * distritos: referencia interna 2023; validar con INEC para uso oficial.
 */
(function () {
  window.PP_CASO_NEGOCIO = {
    fuenteHoja:
      'https://docs.google.com/spreadsheets/d/1aA_WmZYIoDscBgRb_adag942RRaJTlDIS5bQycmtrTM/edit?gid=1960561278',

    /** true = muestra aviso de que conviene enlazar export CSV oficial */
    usarDatosEjemplo: true,

    cover: {
      eyebrow: 'Revista digital · Punto Pago',
      lineas: ['16 páginas', 'Datos 03–07 · Recursos 08–09 · Guía 10–13', 'Cierre 14–16'],
    },

    /** Índice en la apertura (p. 2): enlaces saltan a la página indicada */
    indicePaginas: [
      { pagina: 3, texto: 'Panamá: demografía, urbano/rural y cifras' },
      { pagina: 4, texto: 'Tabla población por distrito (2023)' },
      { pagina: 5, texto: 'Escenarios: gráficas y tabla' },
      { pagina: 6, texto: 'Mercado: Colombia vs Panamá (tabla)' },
      { pagina: 7, texto: 'Mercado: TAM / SAM / SOM, gráfica y tabla' },
      { pagina: 8, texto: 'Recursos: gastos digitales (meses 1–6)' },
      { pagina: 9, texto: 'Recursos: gastos digitales (meses 7–12 y métricas)' },
      { pagina: 10, texto: 'Guía: negocio hoy y volumen por agente' },
      { pagina: 11, texto: 'Guía: costes, herramientas y procesos' },
      { pagina: 12, texto: 'Guía: oportunidad, tamaño y problema' },
      { pagina: 13, texto: 'Guía: red, pagos y propuesta' },
      { pagina: 14, texto: 'Segmento y razón comercial' },
      { pagina: 15, texto: 'Mercado y problema' },
      { pagina: 16, texto: 'Solución, economía, riesgos y demo' },
    ],

    apertura: {
      titulo: 'Resumen ejecutivo',
      cuerpo:
        'País y cabeceras (03–04), escenarios (05), mercado en dos páginas (06–07), presupuesto de marketing y esfuerzo digital (08–09), guía de preguntas (10–13), segmento (14), mercado y problema (15) y cierre operativo en una sola página (16).',
      chips: [
        'Contexto Panamá',
        'Escenarios de TX',
        'TAM / SAM / SOM',
        'Recursos 08–09',
        'Guía preguntas 10–13',
        'Cierre 16',
      ],
    },

    /**
     * Gastos y esfuerzos digitales (plan anual): dos tablas en el flipbook (08–09).
     * Valores mensuales en US$ salvo filas de puntos (enteros) y CAC (US$ por punto nuevo).
     */
    recursosMarketing: {
      tituloPrimera: 'Gastos y esfuerzos digitales (1/2)',
      introPrimera:
        'Canales de pauta, operación de mensajería, referidos, contenido y apoyo administrativo. Meses 1 a 6 en US$; la última columna es la suma de ese semestre.',
      tituloSegunda: 'Gastos y esfuerzos digitales (2/2)',
      introSegunda:
        'Meses 7 a 12 y total del año en dinero. Al pie: puntos nuevos de la red, CAC mensual (referencia interna del plan) y puntos acumulados; el asterisco marca cifra de cierre proyectada.',
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
     * Preguntas guía (pp. 10–13 en el flipbook): respuestas con la información ya incorporada al caso.
     * etiqueta: pendiente = espera datos del modelo operativo actual; referencia = tablas/escenarios; sintesis = redacción del caso.
     */
    guiasPreguntas: [
      {
        titulo: 'Negocio de agentes hoy y actividad por punto',
        introduccion:
          'Aquí va la foto del “como estamos” en operación. Lo que aún no has compartido queda marcado como pendiente. Lo que sí está escrito con números sale de los escenarios que vimos en esta misma revista, donde imaginamos una red con 2 500 puntos.',
        items: [
          {
            pregunta: '¿Cómo es el negocio de agentes hasta hoy?',
            etiqueta: 'pendiente',
            respuesta:
              'Falta tu narrativa y métricas internas (segmentos atendidos, mix de productos, geografía). Cuando las tengamos, esta respuesta sustituye el marcador sin cambiar el resto del flipbook.',
          },
          {
            pregunta: '¿Cuántos agentes tenemos? ¿Cuánto hemos crecido en el último año?',
            etiqueta: 'pendiente',
            respuesta:
              'Base instalada y variación interanual: pendiente de tus datos. Para tener una idea del tamaño del mercado, en la parte donde medimos el pastel grande y el pastel mediano hablamos de entre 2 000 y 3 000 corresponsales activos en Panamá, pensando en un país más chico que el ejemplo grande.',
          },
          {
            pregunta: '¿De qué tamaño es el agente más común?',
            etiqueta: 'pendiente',
            respuesta:
              'Ticket medio por agente, mix de transacciones y ticket por comercio: pendiente. Sirve para calibrar capacitación, comisiones y riesgo operativo.',
          },
          {
            pregunta: '¿Cuánto transaccionamos con cada agente? ¿Cuánto ganamos con cada agente?',
            etiqueta: 'referencia',
            respuesta:
              'Hoy no tenemos tus cifras reales por agente. En los escenarios de esta revista, con 2 500 puntos, cada punto podría mover entre unas 267 y 600 ventas al mes según qué tan optimista sea el año. Si cobráramos el 1,2 % sobre todo el dinero que pasa, el ingreso bruto al año quedaría entre US$2,4 M y US$7,56 M en los tres cuentos base y alrededor de US$6 M en la fila que imita el ritmo del ejemplo colombiano.',
          },
          {
            pregunta: '¿Cuánto nos cuesta hoy la operación de los agentes?',
            etiqueta: 'pendiente',
            respuesta:
              'Costo por transacción, soporte, logística de efectivo, fraude y churn de comercios: pendiente de tu modelo de costos. Es la pieza para comparar contra el ingreso bruto de los escenarios.',
          },
        ],
      },
      {
        titulo: 'Herramientas y procesos que hacen funcionar el canal',
        introduccion:
          'El detalle de tu stack actual lo completarás después; abajo solo un marco típico de corresponsalía para no dejar la página vacía.',
        items: [
          {
            pregunta: '¿Qué herramientas utilizan los agentes hoy?',
            etiqueta: 'pendiente',
            respuesta:
              'Terminal o app, portal de conciliación, mesa de soporte, materiales de marca, etc.: pendiente de inventario real. Evitamos inventar nombres de sistemas.',
          },
          {
            pregunta: '¿Qué procesos clave realizamos hoy para que los agentes funcionen?',
            etiqueta: 'sintesis',
            respuesta:
              'En redes de agentes suele repetirse el mismo esqueleto: afiliación y due diligence del punto, habilitación técnica, liquidación y conciliación, gestión de límites y fraude, soporte y retraining. El mapa del demo Punto Pago refleja el recorrido deseado; el “como es hoy” lo precisamos con tu operación.',
          },
        ],
      },
      {
        titulo: 'Oportunidad en Panamá, tamaño de mercado y problema',
        introduccion:
          'Estas respuestas se leen junto con las partes donde pintamos el país, los escenarios y el tamaño del mercado; todos los números ya están escritos ahí para que esta página solo cuente el cuento con palabras.',
        items: [
          {
            pregunta: '¿Qué oportunidad de crecimiento vemos en Panamá?',
            etiqueta: 'referencia',
            respuesta:
              'Panamá es un país chiquito en población (cerca de 4,4 millones) y una parte importante vive fuera de las grandes ciudades; por eso el efectivo y el “te ayudo en el mostrador” siguen siendo muy importantes. Cuando comparamos con el país grande, el cuento del caso dice que podrían usar la red entre 700 mil y 950 mil personas al mes y que el dinero que se mueve al año podría estar entre US$700 M y US$1 000 M si las cosas van bien.',
          },
          {
            pregunta: '¿De qué tamaño es el mercado?',
            etiqueta: 'referencia',
            respuesta:
              'TAM es el pastel gigante de todo lo que podría pagarse con ayuda humana; en este cuento ronda US$4,5 mil millones a US$5 mil millones al año. SAM es el pastel mediano donde sí tiene sentido nuestra red; ronda US$1,6 mil millones a US$1,8 mil millones. SOM es el pedazo que podemos planear de verdad y va desde unos US$240 M hasta unos US$600 M al año según qué tan fuerte sea el año, con entre 600 mil y 900 mil personas alrededor en los cuentos más altos.',
          },
          {
            pregunta: '¿Cuál es el problema que queremos resolver?',
            etiqueta: 'sintesis',
            respuesta:
              'Hoy el dolor es que todo está repartido en muchas herramientas, cuesta caro y lento meter comercios nuevos, hay riesgo operativo y casi nadie ve de un solo vistazo qué le pasó al cliente y qué le pasó al agente. El bloque “Problema” (página 15) lo dice en la misma línea, y el mapa del demo muestra el camino único que queremos.',
          },
          {
            pregunta: '¿Queremos incrementar transacciones en zonas donde no podemos llevar kioscos?',
            etiqueta: 'sintesis',
            respuesta:
              'Sí, encaja con la idea del caso: llevar cobros y pagos con ayuda humana donde un kiosco fijo no alcanza a estar en cada esquina, sobre todo en zonas rurales y ciudades medianas. Los comercios y los corresponsales hacen de “brazo largo” para llegar a la gente. El mapa exacto de qué zona va primero lo decide el plan comercial con datos reales.',
          },
        ],
      },
      {
        titulo: 'Red objetivo, economía del canal y propuesta',
        introduccion:
          'Cierre de la guía: números del caso y propuesta de valor. Hay muchas tarjetas; usa el scroll solo en esta página si hace falta.',
        items: [
          {
            pregunta: '¿Cuántos agentes queremos tener?',
            etiqueta: 'referencia',
            respuesta:
              'En los escenarios trabajamos con 2 500 puntos como una red de ejemplo. En el tamaño del mercado hablamos de entre 2 000 y 3 000 corresponsales activos en Panamá como rango que se ve sensato. El número oficial de meta lo fija el equipo; aquí solo dejamos escrito el orden de magnitud para que todos miren el mismo cuento.',
          },
          {
            pregunta: '¿Qué transaccionalidad esperamos por cada nuevo agente?',
            etiqueta: 'referencia',
            respuesta:
              'En el país grande el cuento habla de unas 500 ventas por punto al mes. Para Panamá el caso usa un rango de 400 a 600 ventas por punto al mes, y los escenarios con 2 500 puntos muestran desde 267 hasta 1 000 ventas por punto al mes según qué tan fuerte sea el año.',
          },
          {
            pregunta: '¿Cuánto queremos ganar con los nuevos agentes?',
            etiqueta: 'referencia',
            respuesta:
              'Si cobráramos el 1,2 % sobre todo el dinero que pasa en un año, el ingreso bruto quedaría entre US$2,4 M y US$7,56 M en los tres cuentos Conservador a Agresivo, y alrededor de US$6 M en la fila que imita el ritmo del ejemplo colombiano. El número final depende de cuánto cobramos de verdad y de cuánto nos cuesta operar.',
          },
          {
            pregunta: '¿Cómo pagan hoy los clientes sus servicios, especialmente fuera de la ciudad de Panamá?',
            etiqueta: 'sintesis',
            respuesta:
              'Fuera de la capital la gente suele mezclar efectivo, pagos en el comercio de la esquina y ayuda en un punto. En esta revista ya vimos cuánta población vive en zonas urbanas y cuánta en zonas rurales, y una tabla con varios distritos, para entender por qué el “humano cerca de casa” sigue siendo tan importante. Un estudio local de medios de pago podría bajar esto a porcentajes por zona.',
          },
          {
            pregunta: '¿Cuál es nuestra propuesta de valor?',
            etiqueta: 'sintesis',
            respuesta:
              'Una plataforma que orqueste alta del comercio, riesgo, liquidaciones y experiencia del agente, con un mapa de proceso claro — menos fricción que ensamblar varias herramientas y mejor trazabilidad que operar a ciegas entre digital y ventanilla.',
          },
          {
            pregunta: '¿Qué productos podemos ofrecer a los agentes? ¿Créditos? ¿Manejo de cuentas? ¿xBorder?',
            etiqueta: 'sintesis',
            respuesta:
              'Familias habituales del canal: recaudos y pagos de servicios, recargas, giros y remesas, y con el tiempo créditos asistidos, cuentas simplificadas y pagos transfronterizos si encajan en marco regulatorio y riesgo. No listamos productos ya lanzados hasta que confirmes catálogo y roadmap.',
          },
          {
            pregunta: '¿Cómo queremos aprovechar la oportunidad?',
            etiqueta: 'sintesis',
            respuesta:
              'Podemos empezar por las zonas donde la gente más necesita efectivo y un lugar de confianza, dejar claras las reglas de operación para cada punto y usar los datos de las ventas para mejorar poco a poco el monto por venta y la fidelidad de los comercios. Eso va en la misma dirección que los números de volumen y de personas que ya vimos al medir el mercado.',
          },
          {
            pregunta: '¿Qué procesos clave tenemos que cambiar?',
            etiqueta: 'sintesis',
            respuesta:
              'Onboarding y riesgo en un solo flujo, liquidaciones y conciliación con menos pasos manuales, soporte escalable y telemetría del punto para auditoría. El detalle depende del diagnóstico de tu operación actual (pendiente).',
          },
          {
            pregunta: '¿Qué herramientas necesitamos desarrollar?',
            etiqueta: 'sintesis',
            respuesta:
              'Capa unificada para agente y comercio (app/terminal), APIs de producto y riesgo, panel de operaciones y reporting en tiempo casi real. Nombres y alcance de MVP los ajustas con tecnología y producto.',
          },
          {
            pregunta: '¿Cómo vamos a adquirir a los nuevos agentes?',
            etiqueta: 'referencia',
            respuesta:
              'En los escenarios dejamos escrito que en Colombia, en mercados ya maduros, ganar un cliente nuevo puede costar entre US$200 y US$260; sirve solo como comparación de esfuerzo comercial. En Panamá suele funcionar mezclar vendedores que visitan comercios, comercios grandes que jalan volumen y alianzas con cadenas. El presupuesto y el plan fino los define el equipo cuando tenga los datos locales.',
          },
          {
            pregunta: '¿Qué necesitamos para empezar?',
            etiqueta: 'sintesis',
            respuesta:
              'Hace falta dejar claro con abogados y regulador qué se puede hacer (SBP y corresponsalía), hacer un piloto chiquito en un corredor, tener una primera versión de la plataforma y un equipo mínimo que soporte y concilie, y escoger tres o cuatro números sencillos para ver si el piloto se parece a los escenarios y al pedazo de mercado (SOM) que quieran perseguir. Fechas y dinero de inversión siguen pendientes de la hoja de proyecto.',
          },
        ],
      },
    ],

    /** Panamá: demografía y nota metodológica */
    panama: {
      titulo: 'Panamá en contexto',
      subtitulo: 'Demografía y dispersión territorial',
      intro:
        'Panamá es un mercado compacto pero heterogéneo: alta concentración en el eje urbano del centro–oeste y corredores logísticos, con una fracción relevante de población en cabeceras intermedias y zonas rurales donde el efectivo y el punto humano siguen siendo centrales.',
      poblacionMillones: 4.4,
      pctUrbano: 73,
      pctRural: 27,
      nota:
        'Población total de referencia ~4,4 millones (2023–2024). Urbanización ~73 % urbano / ~27 % rural (órdenes de magnitud típicos Banco Mundial / ONU). Cifras redondeadas para storytelling; cierre oficial con INEC.',
    },

    /** Población total por distrito — referencia 2023 (subset ilustrativo) */
    distritos: [
      { nombre: 'La Chorrera', poblacion: 258221 },
      { nombre: 'Arraiján', poblacion: 299079 },
      { nombre: 'San Carlos', poblacion: 22201 },
      { nombre: 'Chame', poblacion: 28535 },
      { nombre: 'Chepo', poblacion: 65588 },
      { nombre: 'Colón City', poblacion: 240722 },
      { nombre: 'David', poblacion: 156498 },
      { nombre: 'Penonomé', poblacion: 104326 },
      { nombre: 'Santiago de Veraguas', poblacion: 109605 },
      { nombre: 'Chitré', poblacion: 60957 },
      { nombre: 'Aguadulce', poblacion: 49005 },
    ],

    distritosTitulo: 'Población por distrito (2023)',

    distritosIntro:
      'Muestra de cabeceras con población total 2023 (referencia interna). La suma no representa el país completo; sirve para visualizar peso relativo de corregimientos clave frente al modelo de red física.',

    /** Escenarios de negocio — 2 500 puntos, ingreso bruto 1,2 % */
    escenarios: {
      titulo: 'Escenarios comparativos',
      intro:
        'Cuatro cuentos para un mismo año: prudente, equilibrado, ambicioso y uno extra que imita el ritmo de Puntored en Colombia (2024) ajustado a nuestro relato. Cada fila = ventas al año, ticket medio, volumen, ventas por punto y mes con 2 500 puntos, e ingreso bruto si cobramos 1,2 % del volumen. Las barras resumen volumen e ingreso; el detalle está en la tabla.',
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
     * Mercado en dos páginas: 06 = comparación; 07 = TAM/SAM/SOM + gráfica + tabla niveles.
     */
    tamSam: {
      titulo: 'Colombia y Panamá en la misma idea',
      introComparacion:
        'Colombia trae números reales 2024 (ejemplo Puntored): país grande y red ya madura. Panamá trae números del caso: menos gente, ticket distinto y menos puntos; no es copiar y pegar. Cada fila compara la misma métrica en los dos países.',
      tituloSegunda: 'TAM, SAM y SOM: tres tamaños del pastel',
      introPasteles:
        'TAM = todo lo que podría pagarse con ayuda en ventanilla o punto si todo fuera ideal. SAM = la parte donde sí tendría sentido nuestra red física. SOM = lo que podemos planear de verdad con competencia; por eso hay varias filas (prudente, fuerte y una inspirada en la proporción del ejemplo colombiano). La barra y la tabla de abajo cuantifican esos tamaños.',
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
      tituloPagina: 'Caso de negocio — Agentes en Panamá',
      heroDek:
        'Panamá → escenarios → mercado (06–07) → recursos (08–09) → guía (10–13) → segmento → mercado/problema → cierre solución/economía/riesgos/demo (16 páginas).',

      segmento: {
        titulo: 'Segmento y razón comercial',
        subtitulo: 'Por qué Panamá y por qué un modelo de red de agentes',
        intro:
          'Tras dimensionar el país y el mercado direccionable, el argumento comercial se apoya en flujo regional, brecha de última milla y economía de comisiones frente a sucursal propia.',
        bullets: [
          {
            titulo: 'Corredor y volumen',
            desc: 'Hub comercial y financiero favorece remesas y pagos B2B/B2C con alta rotación de efectivo.',
          },
          {
            titulo: 'Brecha última milla',
            desc: 'Quien prioriza confianza humana o proximidad usa farmacia, mini súper o agente afiliado.',
          },
          {
            titulo: 'Razón para la operadora',
            desc: 'Comisiones por transacción, flotante y datos; el agente reduce costo de servicio vs. ventanilla propia.',
          },
        ],
      },

      mercado: {
        titulo: 'Mercado y oportunidad',
        intro:
          'Ya vimos cuánto dinero cabe en el mercado y cómo se mueven los escenarios; aquí solo recordamos con una gráfica de ejemplo que el canal físico sigue creciendo y comparte espacio con el digital.',
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
          'Un solo stack que orqueste alta de comercio, riesgo, liquidaciones y experiencia del agente, con mapa de proceso claro para dirección y producto.',
      },

      economia: {
        titulo: 'Lógica económica (resumen)',
        intro:
          'La gráfica resume un mix de ingresos objetivo; calibrar con la página 05 (escenarios) y con el mercado en 06–07, más la hoja de trabajo.',
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
          'El mapa navegable materializa el recorrido acordado: desde captación hasta operación diaria. Es la capa de “historia común” sobre la que apoyas este caso.',
      },
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
