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
      { capitulo: 'IV · Decisión y retorno (11–17)' },
      { pagina: 11, texto: 'Lo esencial para la junta' },
      { pagina: 12, texto: 'Referente Colombia → Panamá (lectura corta)' },
      { pagina: 13, texto: 'Adquisición y esfuerzo digital' },
      { pagina: 14, texto: 'Próxima versión (datos operativos)' },
      { pagina: 15, texto: 'Segmento (resumen)' },
      { pagina: 16, texto: 'Mercado y problema' },
      { pagina: 17, texto: 'Solución, economía, ganancia y demo' },
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
     * Bloques cortos para junta (pp. 11–14): pocos bullets, sin duplicar tablas de 07–08.
     * etiqueta: pendiente | referencia | sintesis (misma UI que antes).
     */
    guiasPreguntas: [
      {
        titulo: 'Lo esencial para la junta',
        introduccion:
          'Tres respuestas: tesis del caso, dónde viven los números y qué falta sustituir con datos internos.',
        items: [
          {
            pregunta: '¿Cuál es la tesis en una frase?',
            etiqueta: 'referencia',
            respuesta:
              'Dimensionar Panamá con un referente maduro en Colombia, explicitar supuestos (p. 07), cuantificar TAM/SAM/SOM (p. 08) y cerrar con economía y ganancia para accionistas (p. 17).',
          },
          {
            pregunta: '¿Dónde está cada tipo de cifra?',
            etiqueta: 'referencia',
            respuesta:
              'Índice: p. 03. País: p. 04. Territorio (contexto + población): p. 05. Escenarios (red de ejemplo 2.500 puntos): p. 06. Comparación y supuestos: p. 07. TAM/SAM/SOM: p. 08. Presupuesto digital: p. 09–10.',
          },
          {
            pregunta: '¿Qué no está todavía en el libro?',
            etiqueta: 'pendiente',
            respuesta:
              'Tu operación real (base de puntos, costos, stack). Cuando lo compartas, se reemplaza texto marcado como pendiente sin cambiar la estructura de las páginas.',
          },
        ],
      },
      {
        titulo: 'Referente Colombia → Panamá',
        introduccion:
          'Evitar la confusión “Colombia = Panamá”: el referente solo ordena magnitudes; Panamá lleva su propio rango en la tabla.',
        items: [
          {
            pregunta: '¿Para qué usamos Puntored / Colombia?',
            etiqueta: 'referencia',
            respuesta:
              'Como ancla de un segmento ya maduro (órdenes de magnitud de usuarios, volumen y ritmo por punto). No es pronóstico de resultados en Panamá.',
          },
          {
            pregunta: '¿Qué cambia al pasar a Panamá?',
            etiqueta: 'referencia',
            respuesta:
              'Población, ticket, número de corresponsales y competencia. Los tres supuestos explícitos del ajuste están en la tabla bajo la comparación (p. 07).',
          },
        ],
      },
      {
        titulo: 'Adquisición y esfuerzo digital',
        introduccion:
          'Cómo se conecta el plan de puntos con el dinero que se invierte en canales.',
        items: [
          {
            pregunta: '¿Con qué red trabajamos en los escenarios?',
            etiqueta: 'referencia',
            respuesta:
              '2 500 puntos como ejemplo de red; el rango de corresponsales en Panamá está en la tabla de mercado (p. 07–08).',
          },
          {
            pregunta: '¿Dónde está el plan de gasto digital?',
            etiqueta: 'referencia',
            respuesta:
              'Presupuesto mensual por canal, puntos nuevos y CAC de referencia del plan: p. 09–10.',
          },
          {
            pregunta: '¿Cómo se explica la ganancia a accionistas?',
            etiqueta: 'referencia',
            respuesta:
              'Proyección de ganancia año tras año e ingreso ilustrativo del canal: p. 17 (scroll si hace falta).',
          },
        ],
      },
      {
        titulo: 'Próxima versión',
        introduccion:
          'Lo que reservamos para una edición con más datos operativos; no bloquea la lectura del sizing.',
        items: [
          {
            pregunta: '¿Qué profundidad operativa quitamos por ahora?',
            etiqueta: 'sintesis',
            respuesta:
              'Listas largas de herramientas, procesos y producto: fuera de esta revista para no competir con el mensaje de mercado y retorno.',
          },
          {
            pregunta: '¿Qué conviene traer después?',
            etiqueta: 'pendiente',
            respuesta:
              'Base instalada real, costo por transacción, inventario de sistemas y checklist legal/regulatorio — enlazados a la hoja de trabajo cuando existan.',
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

    /** Población total por distrito — referencia 2023 (subset ilustrativo) */
    distritos: [
      { nombre: 'Arraiján', poblacion: 299079 },
      { nombre: 'La Chorrera', poblacion: 258221 },
      { nombre: 'Colón City', poblacion: 240722 },
      { nombre: 'David', poblacion: 156498 },
      { nombre: 'Santiago de Veraguas', poblacion: 109605 },
      { nombre: 'Penonomé', poblacion: 104326 },
      { nombre: 'Chepo', poblacion: 65588 },
      { nombre: 'Chitré', poblacion: 60957 },
    ],

    /** Alineado con la red de ejemplo en escenarios (2 500 puntos). */
    distritosRedReferencia: 2500,

    distritosTitulo: 'Territorio: contexto para quien no conoce Panamá',

    distritosIntro:
      'Antes de números de red o de mercado, ubicamos dónde vive la gente en ocho cabeceras con más población (referencia 2023). El gráfico resume magnitudes; no es plan comercial por distrito.',

    distritosNota:
      'Cifras para storytelling; cierre oficial con INEC. El ejemplo de 2.500 puntos de red aparece en la página siguiente (escenarios), no aquí.',

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
     * Proyección ilustrativa — página 17 (cierre), bloque interactivo bajo la gráfica de economía.
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
