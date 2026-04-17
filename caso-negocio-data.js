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
      lineas: ['10 páginas', 'Datos pp. 03–06', 'Historia comercial pp. 07–10'],
    },

    /** Índice en la apertura (p. 2): enlaces saltan a la página indicada */
    indicePaginas: [
      { pagina: 3, texto: 'Panamá: demografía, urbano/rural y cifras' },
      { pagina: 4, texto: 'Tabla población por distrito (2023)' },
      { pagina: 5, texto: 'Escenarios: gráficas + tabla (TX, ticket, volumen)' },
      { pagina: 6, texto: 'TAM / SAM: Colombia vs Panamá y niveles SOM' },
      { pagina: 7, texto: 'Segmento y razón comercial' },
      { pagina: 8, texto: 'Mercado y problema' },
      { pagina: 9, texto: 'Solución y economía' },
      { pagina: 10, texto: 'Riesgos y enlaces al demo' },
    ],

    apertura: {
      titulo: 'Resumen ejecutivo',
      cuerpo:
        'Primero situamos el país (demografía y cabeceras clave), luego los escenarios de volumen e ingreso bruto, el marco TAM / SAM / SOM frente a una referencia tipo corresponsalía en Colombia y, al final, el hilo comercial: segmento, mercado, problema, solución, economía, riesgos y demo.',
      chips: [
        'Contexto Panamá',
        'Escenarios de TX',
        'TAM / SAM / SOM',
        'Segmento y mercado',
        'Solución y riesgos',
        'Mapa del demo',
      ],
    },

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
        'Supuestos de transacciones anuales, ticket promedio y volumen; transacciones por punto y mes con red de 2 500 puntos; ingreso bruto al 1,2 %. Última fila: ancla tipo Puntored Colombia 2024 (proporcional), con CAC Colombia US$200–260 como referencia de mercado maduro.',
      notaCac: 'CAC Colombia (referencia Puntored / mercado maduro): US$200–260.',
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
      titulo: 'TAM, SAM y mercado objetivo',
      intro:
        'Primera tabla: ancla Colombia (Puntored 2024 real) frente a proyección Panamá ajustada por población, ticket e infraestructura de puntos. Segunda: niveles de mercado direccionable y escenarios de penetración.',
      metricas: [
        {
          metrica: 'Población',
          colombia: '52 M',
          panama: '4,4 M',
          explicacion: 'Panamá ≈ 8,6 % de Colombia',
        },
        {
          metrica: 'Usuarios activos mensuales',
          colombia: '11 M',
          panama: '700 k – 950 k',
          explicacion: '16 % – 21 % penetración',
        },
        {
          metrica: 'Transacciones anuales',
          colombia: '330 M',
          panama: '28 M – 32 M',
          explicacion: 'Escala proporcional ~8,6 %',
        },
        {
          metrica: 'Ticket promedio',
          colombia: 'US$17',
          panama: 'US$25 – US$35',
          explicacion: 'Mayor ingreso per cápita',
        },
        {
          metrica: 'Volumen anual',
          colombia: 'US$5,5 B',
          panama: 'US$700 M – US$1,0 B',
          explicacion: 'Ajustado por ticket y red',
        },
        {
          metrica: 'Corresponsales activos',
          colombia: '55 000',
          panama: '2 000 – 3 000',
          explicacion: 'Escala proporcional eficiente',
        },
        {
          metrica: 'Transacciones por punto / mes',
          colombia: '500',
          panama: '400 – 600',
          explicacion: 'Realista y alcanzable',
        },
      ],
      niveles: [
        {
          nivel: 'TAM',
          volumen: 'US$4,5 B – US$5 B',
          usuarios: '2,9 M adultos',
          supuesto: 'Todo gasto susceptible a pago físico',
        },
        {
          nivel: 'SAM',
          volumen: 'US$1,6 B – US$1,8 B',
          usuarios: '1,0 M – 1,2 M',
          supuesto: '35 % – 40 % usarían red física',
        },
        {
          nivel: 'SOM (15 %)',
          volumen: 'US$240 M – US$270 M',
          usuarios: '~600 k usuarios',
          supuesto: 'Captura conservadora',
        },
        {
          nivel: 'SOM (25 %)',
          volumen: 'US$400 M – US$450 M',
          usuarios: '~800 k usuarios',
          supuesto: 'Escenario fuerte',
        },
        {
          nivel: 'SOM (tipo Puntored 2024 proporcional)',
          volumen: 'US$470 M – US$600 M',
          usuarios: '~900 k usuarios',
          supuesto: '~8,6 % del volumen real Colombia',
        },
      ],
    },

    texto: {
      tituloPagina: 'Caso de negocio — Agentes en Panamá',
      heroDek:
        'Secuencia: Panamá → escenarios → TAM/SAM → segmento → mercado → problema → solución → economía → riesgos → demo.',

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
          'Las páginas anteriores fijaron TAM/SAM y escenarios; aquí se resume crecimiento del canal físico y participación relativa frente a digital.',
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
        titulo: 'Volumen anual por nivel (punto medio del rango)',
        tipo: 'bar',
        horizontal: true,
        labels: ['TAM', 'SAM', 'SOM 15 %', 'SOM 25 %', 'SOM Puntored'],
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
