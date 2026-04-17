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
      lineas: ['14 páginas', 'Datos 03–06 · Guía 07–10', 'Cierre 11–14'],
    },

    /** Índice en la apertura (p. 2): enlaces saltan a la página indicada */
    indicePaginas: [
      { pagina: 3, texto: 'Panamá: demografía, urbano/rural y cifras' },
      { pagina: 4, texto: 'Tabla población por distrito (2023)' },
      { pagina: 5, texto: 'Escenarios: gráficas + tabla (TX, ticket, volumen)' },
      { pagina: 6, texto: 'Tamaño del mercado: comparación y pasteles TAM / SAM / SOM' },
      { pagina: 7, texto: 'Guía: negocio hoy y volumen por agente (referencias)' },
      { pagina: 8, texto: 'Guía: costes, herramientas y procesos hoy' },
      { pagina: 9, texto: 'Guía: oportunidad Panamá, mercado y problema' },
      { pagina: 10, texto: 'Guía: red objetivo, pagos y propuesta' },
      { pagina: 11, texto: 'Segmento y razón comercial' },
      { pagina: 12, texto: 'Mercado y problema' },
      { pagina: 13, texto: 'Solución y economía' },
      { pagina: 14, texto: 'Riesgos y enlaces al demo' },
    ],

    apertura: {
      titulo: 'Resumen ejecutivo',
      cuerpo:
        'Primero situamos el país (demografía y cabeceras), escenarios y TAM/SAM. Luego, páginas 07–10: guía de preguntas frecuentes del caso — con respuestas donde ya hay cifras del modelo de referencia y recuadros “pendiente” donde falta información del modelo de agentes actual (la completarás después). Cierra el hilo comercial y el demo en 11–14.',
      chips: [
        'Contexto Panamá',
        'Escenarios de TX',
        'TAM / SAM / SOM',
        'Guía preguntas 07–10',
        'Segmento y mercado',
        'Demo',
      ],
    },

    /**
     * Preguntas guía (pp. 07–10): respuestas con la información ya incorporada al caso.
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
              'Hoy el dolor es que todo está repartido en muchas herramientas, cuesta caro y lento meter comercios nuevos, hay riesgo operativo y casi nadie ve de un solo vistazo qué le pasó al cliente y qué le pasó al agente. Más adelante en esta misma revista el bloque “Problema” lo dice en la misma línea, y el mapa del demo muestra el camino único que queremos.',
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
          'Cierra la guía con números del caso y con la propuesta de valor; productos concretos quedan como familias típicas hasta que los fijes. Si no ves todas las tarjetas, desplaza dentro de esta página.',
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
        'Aquí imaginamos cuatro formas distintas de crecer en un año: una forma prudente, una forma equilibrada, una forma ambiciosa y una cuarta fila que copia el ritmo de un negocio grande en Colombia (Puntored, 2024) pero ajustado a nuestro relato. Cada fila dice cuántas ventas haría la red en un año, cuánto dinero mueve cada venta en promedio, cuántas ventas al mes le tocarían a cada punto si tuviéramos 2 500 puntos, y cuánto dinero bruto quedaría si cobráramos el 1,2 % sobre todo lo que pasó. También dejamos escrito cuánto cuesta en Colombia adquirir un cliente en un mercado ya maduro (CAC entre US$200 y US$260) para tener una idea de esfuerzo comercial.',
      notaCac:
        'CAC significa “cuánto nos cuesta ganar un cliente nuevo”. En Colombia, en mercados parecidos, ese costo suele estar entre US$200 y US$260 por cliente.',
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

    /** Colombia real vs Panamá ajustada + niveles TAM / SAM / SOM */
    tamSam: {
      titulo: 'Qué tan grande es el mercado y qué parte podemos tocar',
      intro:
        'Esta página cuenta dos historias con números. La primera historia pone al lado a Colombia y a Panamá. Colombia tiene muchas más personas y ya mueve pagos enormes en tiendas y puntos; los números de Colombia son reales de 2024 y usamos el ejemplo público de Puntored solo para ver cómo se ve un país cuando el negocio ya está muy crecido. Los números de Panamá no son una copia: los armamos pensando que aquí vive menos gente, que cada pago suele ser de un monto distinto y que una red de puntos en Panamá no puede ser del mismo tamaño que en un país tan grande. Por eso en cada fila ves la misma idea (personas, ventas al año, dinero que se mueve) explicada en dos tamaños de país distintos. La segunda historia usa tres palabras que suenan raras pero solo miden el tamaño del pastel. TAM es el pastel gigante: todo el dinero que en teoría podría pagarse con ayuda humana o en ventanilla si nadie faltara al plan. SAM es el pastel mediano: la parte donde sí tiene sentido que la gente use una red con agentes y comercios como los que estamos imaginando. SOM es el pedazo que podemos planear de verdad cuando hay competencia y no todo sale perfecto; por eso hay varias filas de SOM, desde un plan cuidadoso hasta un plan fuerte y otro que se parece en proporción al ejemplo grande de Colombia, para que nadie crea que existe una sola cifra mágica.',
      metricas: [
        {
          metrica: 'Población',
          colombia: '52 M',
          panama: '4,4 M',
          explicacion:
            'Hay muchas más personas viviendo en Colombia que en Panamá; por eso cualquier número de Panamá va a ser más chico casi siempre.',
        },
        {
          metrica: 'Usuarios activos mensuales',
          colombia: '11 M',
          panama: '700 k – 950 k',
          explicacion:
            'Usuarios activos significa “personas que al menos una vez al mes usan la red”. En Panamá, si la red funciona bien, podríamos estar hablando de entre 700 mil y 950 mil personas en ese hábito.',
        },
        {
          metrica: 'Transacciones anuales',
          colombia: '330 M',
          panama: '28 M – 32 M',
          explicacion:
            'Una transacción es cada vez que alguien paga o cobra algo a través del canal. Al año, en Panamá, el cuento del caso se mueve en decenas de millones de transacciones, no en cientos como en el país grande.',
        },
        {
          metrica: 'Ticket promedio',
          colombia: 'US$17',
          panama: 'US$25 – US$35',
          explicacion:
            'Ticket es “cuánto dinero entra en cada venta en promedio”. En Panamá el caso supone montos un poco mayores por venta que en el ejemplo colombiano.',
        },
        {
          metrica: 'Volumen anual',
          colombia: 'US$5,5 B',
          panama: 'US$700 M – US$1,0 B',
          explicacion:
            'Volumen es todo el dinero que pasa por el sistema en un año sumando todas las ventas. Panamá, siendo más chica, mueve cientos de millones al año en este cuento, no miles de millones como el ejemplo grande.',
        },
        {
          metrica: 'Corresponsales activos',
          colombia: '55 000',
          panama: '2 000 – 3 000',
          explicacion:
            'Corresponsal es un punto o comercio que hace de “mini banco” para la gente. En un país grande caben decenas de miles; en Panamá el caso habla de unos pocos miles bien trabajados.',
        },
        {
          metrica: 'Transacciones por punto / mes',
          colombia: '500',
          panama: '400 – 600',
          explicacion:
            'Aquí se pregunta: si tengo un punto abierto, ¿cuántas ventas le entran en un mes? El caso de Panamá se queda en un rango parecido al del país grande, para no prometer algo imposible.',
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
        'Secuencia: Panamá → escenarios → TAM/SAM → guía de preguntas (07–10) → segmento → mercado → solución → riesgos → demo.',

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
          'La gráfica resume un mix de ingresos objetivo; calibrar con los escenarios de volumen e ingreso bruto (sección Escenarios) y con TAM/SAM, además de la hoja de trabajo.',
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
