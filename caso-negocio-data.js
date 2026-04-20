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
     * Bloques de trabajo pendientes (pp. 11–14).
     * etiqueta: pendiente | referencia | sintesis (la UI actual muestra solo pendiente).
     */
    guiasPreguntas: [
      {
        titulo: 'Pipeline de relanzamiento (I): Fundación y Activación',
        introduccion:
          'Primero la base operativa y luego el primer ingreso del agente. Si esto falla, todo lo demás pierde eficiencia.',
        items: [
          {
            pregunta: '1) Fundación — Prioridad 🔴 Crítica',
            etiqueta: 'pendiente',
            respuesta:
              'Objetivo: eliminar fricción antes de salir. Iniciativas: onboarding digital completo (KYC + contrato + credenciales), acreditación 100% automática, facturación automática con ajuste de comisiones y estabilidad operativa (pagos, recargas, uptime). Impacto esperado: menos abandono en onboarding, menor costo operativo y mayor velocidad de activación.',
          },
          {
            pregunta: '2) Activación — Prioridad 🔴 Crítica',
            etiqueta: 'pendiente',
            respuesta:
              'Objetivo: reducir tiempo a primera transacción. Iniciativas: flujo guiado de primer uso, instructivos simples de recarga/pagos, soporte directo (Intercom o chat web) e incentivo a primera transacción. Impacto esperado: menor tiempo a revenue y mayor conversión de agente activo.',
          },
        ],
      },
      {
        titulo: 'Pipeline de relanzamiento (II): Propuesta de Valor y Adquisición',
        introduccion:
          'Con la operación estable, se fortalece el producto para competir y luego se llena el embudo comercial.',
        items: [
          {
            pregunta: '3) Propuesta de valor — Prioridad 🟠 Alta (faseada)',
            etiqueta: 'pendiente',
            respuesta:
              'Objetivo: que el producto gane frente al mercado. Iniciativas: ACH, integración con Yappy, vínculo con PayPal, tarjeta débito para uso de fondos, remesas vía app y P2P en app para recurrencia. Impacto esperado: mayor uso del ecosistema, más ingresos por agente y diferenciación.',
          },
          {
            pregunta: '4) Adquisición — Prioridad 🟠 Alta',
            etiqueta: 'pendiente',
            respuesta:
              'Objetivo: generar volumen de nuevos agentes. Iniciativas: landing de adquisición, campañas Google con geo-targeting, WhatsApp/email a base existente, programa de referidos e inclusión en mapas para visibilidad. Impacto esperado: más leads y menor costo de adquisición.',
          },
        ],
      },
      {
        titulo: 'Pipeline de relanzamiento (III): Distribución y Retención',
        introduccion:
          'Escalar por aliados y capturar valor en la permanencia; la rentabilidad vive en retención y frecuencia.',
        items: [
          {
            pregunta: '5) Distribución — Prioridad 🟡 Media-Alta',
            etiqueta: 'pendiente',
            respuesta:
              'Objetivo: escalar sin depender solo de marketing. Iniciativas: partnerships con distribuidores, mayoristas, cooperativas y proveedores POS/internet bajo modelo B2B2B. Impacto esperado: adquisición masiva, menor CAC y mayor cobertura geográfica.',
          },
          {
            pregunta: '6) Retención y expansión — Prioridad 🟡 Media',
            etiqueta: 'pendiente',
            respuesta:
              'Objetivo: aumentar volumen por agente activo. Iniciativas: gamificación tipo Puntored, incentivos por volumen, cross-sell de servicios y comunicación directa por Intercom/chat. Impacto esperado: mayor frecuencia, mayor ticket promedio y menor churn.',
          },
        ],
      },
      {
        titulo: 'Pipeline de relanzamiento (IV): Rebranding y control de ejecución',
        introduccion:
          'El relanzamiento visible se activa cuando la operación base ya cumple nivel mínimo de servicio y conversión.',
        items: [
          {
            pregunta: '7) Rebranding — Prioridad 🟢 Condicionada',
            etiqueta: 'pendiente',
            respuesta:
              'Objetivo: cambiar percepción de mercado con sustento operativo. Iniciativas: nuevo nombre comercial (ej. PuntoYa / PuntoExpress / PuntoMaxx), nueva narrativa (liquidez, facilidad, ingresos para el comercio) y ajuste de branding en app, web y kioscos. Condición: ejecutar después de Fundación + Activación estables.',
          },
          {
            pregunta: 'Gate de salida a mercado',
            etiqueta: 'pendiente',
            respuesta:
              'Checklist mínimo para lanzar: onboarding automático estable, time-to-first-transaction controlado, soporte directo activo y propuesta de valor inicial habilitada (al menos ACH + un integrador clave).',
          },
          {
            pregunta: 'Métricas de control semanal',
            etiqueta: 'pendiente',
            respuesta:
              'Tablero único: CAC por agente activado, % agentes que transaccionan en 7 días, GMV por agente, retención 30/60/90 y CPA real. Segmentación objetivo de comunicación: tiendas pequeñas, emprendedores, freelancers, minimarkets, farmacias, talleres y servicios semi-formales.',
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
      { nombre: 'Bocas del Toro', poblacion: 170000, x: 13, y: 30, align: 'right' },
      { nombre: 'Chiriqui', poblacion: 470000, x: 14, y: 58, align: 'right' },
      { nombre: 'Veraguas', poblacion: 260000, x: 27, y: 63, align: 'right' },
      { nombre: 'Cocle', poblacion: 280000, x: 40, y: 54, align: 'right' },
      { nombre: 'Herrera', poblacion: 125000, x: 38, y: 74, align: 'right' },
      { nombre: 'Los Santos', poblacion: 100000, x: 47, y: 84, align: 'right' },
      { nombre: 'Colon', poblacion: 300000, x: 37, y: 38, align: 'right' },
      { nombre: 'Panama Oeste', poblacion: 730000, x: 49, y: 45, align: 'right' },
      { nombre: 'Panama', poblacion: 2050000, x: 59, y: 41, align: 'right' },
      { nombre: 'Darien', poblacion: 80000, x: 84, y: 53, align: 'left' },
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
