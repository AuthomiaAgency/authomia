import { Content, Language } from './types';

export const LOGO_TEXT_URL = "https://imgur.com/h6YsFBg.png";
export const LOGO_ICON_URL = "https://imgur.com/R48vhCC.png";

export const CONTENT: Record<Language, Content> = {
  es: {
    hero: {
      title: "Inteligencia y Automatización para Empresas del Mercado",
      subtitle: "Diagnóstico, arquitectura e implementación de sistemas digitales escalables.",
      ctaPrimary: "¿Qué podemos ofrecerle a tu negocio?",
    },
    intro: {
      title: "Sistema Authomia",
      description: "Authomia Agency no vende software, bots ni soluciones genéricas. Diseña sistemas vivos, escalables y medibles que convierten el caos operativo en orden estratégico.",
      cards: [
        { title: "Estrategia", desc: "Visión de alto nivel" },
        { title: "Procesos", desc: "Arquitectura de flujos" },
        { title: "Tecnología", desc: "Automatización e IA" },
        { title: "Personas", desc: "Adopción y cultura" },
      ]
    },
    comparison: {
      title: "¿Por qué Authomia?",
      left: {
        title: "Otras Agencias",
        items: ["Automatizan sin entender", "Implementan herramientas aisladas", "Promesas rápidas", "Sin visión sistémica"]
      },
      right: {
        title: "Authomia Agency",
        items: ["Diagnóstico profundo", "Sistemas integrados", "Escalabilidad real", "Criterio técnico y humano"]
      }
    },
    protocols: {
      title: "Protocolos de Trabajo",
      description: "Nuestro proceso está diseñado para reducir incertidumbre, optimizar decisiones y garantizar claridad antes de cualquier implementación.",
      pillarsTitle: "Los 4 Pilares de Evaluación",
      pillars: [
        { title: "Administración", icon: "FileText", desc: ["Procesos internos", "Control operativo", "Trazabilidad"] },
        { title: "Marketing", icon: "Megaphone", desc: ["Posicionamiento", "Canales", "Automatización"] },
        { title: "Ventas", icon: "TrendingUp", desc: ["Procesos comerciales", "Embudos", "Integración CRM"] },
        { title: "Fulfillment", icon: "Package", desc: ["Entrega de servicio", "Logística", "Post-venta"] },
      ],
      steps: [
        { phase: "Fase 00", title: "Contacto y Filtrado Inicial", details: ["Solicitud vía formulario (Blue/Red Diamond)", "Validación de viabilidad técnica", "Filtrado de perfil de cliente"], type: "neutral", icon: "Filter" },
        { phase: "Fase 01", title: "Primera Reunión (Contexto)", details: ["Comprensión del negocio global", "Historia operativa", "Detección de fricciones", "NO se venden soluciones aquí"], type: "neutral", icon: "Users" },
        { phase: "Fase 02", title: "Diagnóstico y Modelado", details: ["Análisis de los 4 Pilares", "Modelado de flujos y cuellos de botella", "Definición de arquitectura", "Estimación de costos"], type: "blue", icon: "Activity" },
        { phase: "Fase 03", title: "Presentación de Diagnóstico", details: ["Dashboard de hallazgos", "Explicación de arquitectura propuesta", "Escenarios de inversión", "Cliente decide si avanza"], type: "neutral", icon: "Monitor" },
        { phase: "Fase 04", title: "Activación (Red Diamond)", details: ["Definición de alcance final", "Cronograma de implementación", "Asignación de responsables", "Priorización por pilar"], type: "red", icon: "Zap" },
        { phase: "Fase 05", title: "Autorización e Insumos", details: ["Entrega formal de accesos y APIs", "Firma de acuerdos de confidencialidad", "Recolección de data operativa"], type: "red", icon: "Lock" },
        { phase: "Fase 06", title: "Implementación y Validación", details: ["Despliegue por bloques", "Validación en entorno real", "Ajustes controlados", "Documentación técnica"], type: "red", icon: "Layers" },
        { phase: "Fase 07", title: "Cierre y Transferencia", details: ["Entrega de sistemas estabilizados", "Capacitación final", "Lineamientos de evolución"], type: "gold", icon: "CheckCircle" },
      ],
      closure: "Authomia no improvisa procesos ni ejecuta sin estructura. Cada proyecto sigue este protocolo para garantizar orden, coherencia y sostenibilidad operativa."
    },
    whoWeAre: {
      title: "Quiénes Somos",
      rouletteTitle: "Authomia está diseñada para",
      sectors: [
        "Boticas y cadenas farmacéuticas",
        "Restaurantes y grupos gastronómicos",
        "Cafeterías especializadas",
        "Hostales y hoteles",
        "Clínicas y centros médicos",
        "Laboratorios",
        "Estudios contables y legales",
        "Empresas de transporte",
        "Negocios familiares consolidados",
        "Comercios con múltiples sucursales",
        "Empresas de servicios profesionales",
        "Centros educativos privados",
        "Inmobiliarias",
        "Empresas agroindustriales",
        "Distribuidores y mayoristas",
        "Tiendas retail",
        "Franquicias en expansión"
      ],
      specialSector: "TI", // The distinct animation trigger
      specialMessage: "Esta estructura fue diseñada para TI.",
      report: [
        { title: "Identidad Corporativa", content: "Authomia Agency es una agencia especializada en diagnóstico estratégico, diseño de sistemas e implementación tecnológica. Nacemos para resolver la falta de comprensión operativa en la adopción tecnológica." },
        { title: "Naturaleza de la Agencia", content: "No operamos desde una única disciplina. Integramos análisis de negocio, modelado de procesos y tecnología bajo los 4 pilares: Administración, Marketing, Ventas y Fulfillment." },
        { title: "Propósito Operativo", content: "Transformar complejidad operativa en sistemas claros, medibles y ejecutables, permitiendo a los negocios crecer sin perder control." },
        { title: "Enfoque Metodológico", content: "Trabajamos bajo un enfoque 'Diagnóstico-Primero'. Separamos la comprensión del negocio de la ejecución técnica para evitar errores estructurales." },
        { title: "Estructura de Intervención", content: "Dividimos claramente el pensamiento (Blue Diamond Prime™) de la acción (Red Diamond Prime™). No construimos sin planos aprobados." },
        { title: "Criterios de Trabajo", content: "Diagnóstico antes que ejecución. Estructura antes que velocidad. Sistema antes que herramienta." },
        { title: "Perfil de Cliente", content: "Trabajamos con organizaciones que valoran el análisis, buscan orden y requieren escalabilidad real, no solo parches temporales." },
        { title: "Base Operativa", content: "Authomia Agency tiene base operativa en Jauja – Junín – Perú, con capacidad de despliegue nacional e internacional." },
        { title: "Síntesis Institucional", content: "Authomia Agency analiza, diseña e implementa sistemas con criterio técnico, enfoque estructural y visión de largo plazo." }
      ],
      pillars: [
        { title: "Administración", icon: "FileText", desc: ["Procesos internos", "Gestión operativa", "Control administrativo"] },
        { title: "Marketing", icon: "Megaphone", desc: ["Posicionamiento", "Canales", "Mensaje"] },
        { title: "Ventas", icon: "TrendingUp", desc: ["Procesos comerciales", "Embudos", "Seguimiento"] },
        { title: "Fulfillment", icon: "Package", desc: ["Prestación servicio", "Logística", "Experiencia cliente"] },
      ]
    },
    contact: {
      title: "Contacto Oficial",
      email: "authomia.agency@gmail.com",
      phone: "+51 934 384 060",
      location: "Jauja – Junín – Perú",
      locationLabel: "Centro de Operaciones"
    },
    services: {
      blue: {
        name: "BLUE DIAMOND PRIME™",
        subtitle: "Diagnóstico Estratégico Premium",
        features: [
          "Análisis profundo de procesos",
          "Detección de oportunidades IA",
          "Evaluación de automatización",
          "Roadmap estratégico claro"
        ],
        priceRange: "Rango de Inversión: Estratégico",
        priceNote: "El precio depende de la complejidad real del negocio.",
        cta: "Seleccionar Protocolo Estratégico"
      },
      red: {
        name: "RED DIAMOND PRIME™",
        subtitle: "Diagnóstico + Implementación Integral",
        features: [
          "Todo el diagnóstico Blue Diamond",
          "Implementación de automatizaciones",
          "Integración de IA",
          "Arquitectura escalable y segura"
        ],
        priceRange: "Rango de Inversión: Enterprise",
        priceNote: "El diagnóstico no se cobra si implementamos contigo.",
        cta: "Seleccionar Protocolo Integral"
      },
      hook: "¿Aún no estás convencido? Sigue bajando..."
    },
    process: {
      title: "Arquitectura de Flujo Neural",
      bluePhase: {
        title: "FASE ESTRATÉGICA",
        steps: [
          { id: "01", title: "Evaluación", desc: "Escaneo de viabilidad técnica y operativa." },
          { id: "02", title: "Diagnóstico", desc: "Análisis profundo del núcleo del negocio." },
          { id: "03", title: "Diseño", desc: "Planificación de la arquitectura de solución." }
        ]
      },
      barrierLabel: "PROTOCOLO DE EJECUCIÓN",
      redPhase: {
        title: "FASE DE EJECUCIÓN",
        steps: [
          { id: "04", title: "Implementación", desc: "Despliegue de automatización e IA en producción." },
          { id: "05", title: "Optimización", desc: "Refinamiento continuo basado en métricas." }
        ]
      }
    },
    appExperience: {
      text: "Control total sobre tus activos digitales. Activa o desactiva flujos neuronales y observa el impacto en tiempo real.",
      metrics: [
        { value: "0", label: "Prod. Executions" },
        { value: "0", label: "Failed Executions" },
        { value: "0%", label: "Failure Rate" },
        { value: "0s", label: "Run Time (Avg)" }
      ]
    },
    costExperience: {
      title: "Proyección de Escalabilidad Financiera",
      subtitle: "Rentabilidad vs Tiempo (12 Meses). Desliza para analizar la divergencia.",
      labels: {
        traditional: "Agencia Tradicional",
        traditionalDesc: "Costo lineal, eficiencia decreciente.",
        authomia: "Arquitectura Authomia",
        authomiaDesc: "Costo marginal cero, escala exponencial.",
      },
      floatingPoints: [],
      insights: []
    },
    testimonials: {
      title: "Bitácora de Reputación",
      voidTitle: "Señal No Detectada",
      voidDesc: "La base de datos de reseñas públicas está esperando el bloque génesis. Sé el primer socio estratégico en establecer el estándar de calidad.",
      cta: "Escribir la Primera Entrada"
    },
    clients: {
      title: "Protocolo de Socios Legado",
      subtitle: "La arquitectura de élite requiere visionarios. El 'Slot Génesis' está reservado para el primer caso de éxito de la versión 2.0.",
      slotTitle: "SLOT 01: DISPONIBLE",
      slotDesc: "Capacidad de sistema reservada para socio fundador.",
      cta: "Iniciar Solicitud de Acceso"
    },
    finalCta: {
      title: "¿Decisión Tomada? Selecciona Nivel de Intervención",
      blueSummary: "Ideal para claridad operativa y hoja de ruta.",
      redSummary: "Ideal para transformación total y ejecución técnica."
    },
    footer: {
      legal: ["Política de Privacidad", "Términos y Condiciones", "Aviso Legal"],
      social: ["LinkedIn", "Facebook", "Instagram"],
      nav: ["Protocolos de Trabajo", "Quiénes Somos", "FAQ"],
      contact: "Contacto Oficial",
      copyright: "Authomia Agency © 2024. All Systems Operational."
    },
    legalDocuments: {
      privacy: {
        title: "Política de Privacidad Global",
        lastUpdated: "Vigencia: Actual",
        sections: [
          {
            heading: "1. Identidad del Responsable",
            content: "Authomia Agency (en adelante, “Authomia”), con correo de contacto authomia.agency@gmail.com, es responsable del tratamiento de los datos personales recopilados a través de su sitio web."
          },
          {
            heading: "2. Datos que se recopilan",
            content: "Authomia podrá recopilar los siguientes datos:\n• Nombre y apellidos\n• Correo electrónico\n• Número telefónico\n• Información del negocio o empresa\n• Datos proporcionados voluntariamente en formularios\n\nNo se recopilan datos sensibles sin consentimiento expreso."
          },
          {
            heading: "3. Finalidad del tratamiento",
            content: "Los datos personales se utilizan para:\n• Evaluar solicitudes de diagnóstico\n• Contactar al usuario\n• Elaborar propuestas de servicio\n• Cumplir obligaciones contractuales\n• Mejorar la experiencia del usuario"
          },
          {
            heading: "4. Base legal del tratamiento",
            content: "El tratamiento se basa en:\n• Consentimiento del usuario\n• Ejecución de una relación precontractual o contractual\n• Cumplimiento de obligaciones legales"
          },
          {
            heading: "5. Conservación de datos",
            content: "Los datos se conservarán únicamente durante el tiempo necesario para cumplir su finalidad o mientras exista una relación comercial activa."
          },
          {
             heading: "6. Confidencialidad y seguridad",
             content: "Authomia aplica medidas técnicas y organizativas razonables para proteger la información frente a accesos no autorizados, pérdida o uso indebido."
          },
          {
             heading: "7. Derechos del usuario",
             content: "El usuario puede ejercer los derechos de Acceso, Rectificación, Cancelación y Oposición mediante solicitud a: authomia.agency@gmail.com"
          },
          {
             heading: "8. Modificaciones",
             content: "Authomia se reserva el derecho de modificar esta política en cualquier momento. Las modificaciones serán publicadas en el sitio web."
          }
        ]
      },
      terms: {
        title: "Términos y Condiciones",
        lastUpdated: "Vigencia: Inmediata",
        sections: [
          {
            heading: "1. Objeto",
            content: "Estos términos regulan el uso del sitio web y los servicios ofrecidos por Authomia."
          },
          {
            heading: "2. Naturaleza del servicio",
            content: "Authomia ofrece servicios de diagnóstico empresarial, diseño de sistemas, automatización e implementación tecnológica.\nEl diagnóstico (Blue Diamond Prime™) es una fase independiente de la implementación (Red Diamond Prime™)."
          },
          {
            heading: "3. Alcance",
            content: "Ningún servicio implica garantía de resultados específicos, ya que estos dependen de múltiples factores externos y del compromiso del cliente."
          },
          {
            heading: "4. Propiedad intelectual",
            content: "Todo contenido, metodología, informes y estructuras desarrolladas por Authomia son propiedad intelectual de la empresa, salvo acuerdo escrito en contrario."
          },
          {
            heading: "5. Responsabilidad",
            content: "Authomia no será responsable por decisiones tomadas por el cliente sin asesoría, uso incorrecto de la información proporcionada, o incumplimientos derivados de información incompleta del cliente."
          },
          {
            heading: "6. Confidencialidad",
            content: "Toda la información intercambiada será tratada como confidencial durante la relación comercial."
          },
          {
             heading: "7. Jurisdicción",
             content: "Estos términos se rigen por las leyes aplicables en la República del Perú. Cualquier controversia será sometida a la jurisdicción correspondiente."
          },
          {
             heading: "8. Aceptación",
             content: "El uso del sitio web y la contratación de servicios implica la aceptación plena de estos términos."
          }
        ]
      },
      legalNotice: {
        title: "Aviso Legal Corporativo",
        lastUpdated: "Status: Active",
        sections: [
          {
            heading: "1. Identificación del Titular",
            content: "El presente sitio web es operado por Authomia Agency, entidad dedicada a la consultoría tecnológica avanzada y desarrollo de software."
          },
          {
            heading: "2. Objeto",
            content: "Este aviso legal regula el acceso y uso del sitio web authomia.cloud y sus subdominios asociados."
          },
          {
            heading: "3. Propiedad Intelectual e Industrial",
            content: "Los derechos de propiedad intelectual sobre la disposición de los contenidos, diseño gráfico y códigos fuente son titularidad exclusiva de Authomia Agency."
          },
          {
            heading: "4. Legislación Aplicable",
            content: "Las presentes condiciones se regirán por la legislación internacional vigente aplicable a servicios digitales, sometiéndose a los tribunales competentes para la resolución de conflictos."
          }
        ]
      }
    },
    faq: {
      title: "Centro de Resolución de Dudas (FAQ)",
      items: [
        { question: "¿Cuál es la diferencia entre Blue y Red Diamond?", answer: "Blue Diamond Prime es la fase de inteligencia y diagnóstico (el plano del arquitecto). Red Diamond Prime es la fase de construcción e implementación técnica (la obra). No construimos sin planos." },
        { question: "¿Qué información debe proporcionar el cliente?", answer: "Durante el proceso se pueden solicitar: Información operativa, Flujos de trabajo, Accesos controlados y Documentación interna necesaria. Todo se solicita bajo autorización expresa y con manejo responsable de la información." },
        { question: "¿Authomia ejecuta sin aprobación del cliente?", answer: "No. Ninguna implementación se inicia sin: Diagnóstico presentado, Aprobación del cliente, Aceptación de términos y Confirmación formal." },
        { question: "¿Qué tipo de empresas pueden trabajar con Authomia?", answer: "Trabajamos con: Empresas en operación, Negocios del mercado, Proyectos estructurados y Organizaciones que buscan claridad, control y escalabilidad." },
        { question: "¿Ofrecen soporte o acompañamiento?", answer: "Sí. Durante la implementación se ofrece acompañamiento técnico y estratégico según el alcance definido. Posteriormente, ofrecemos planes de mantenimiento y evolución." },
        { question: "¿Cómo inicio el proceso?", answer: "Desde el botón 'Iniciar Diagnóstico' o 'Qué podemos ofrecerle', donde se abre un cuestionario guiado y estructurado para evaluar su caso." },
        { question: "¿Qué incluye exactamente el diagnóstico?", answer: "Incluye un mapeo exhaustivo de sus procesos actuales, identificación de cuellos de botella, diseño de la arquitectura de automatización ideal y una cotización exacta para la implementación." },
        { question: "¿Cuánto tiempo toma el proceso?", answer: "El diagnóstico toma entre 7 a 14 días. La implementación depende de la complejidad detectada, variando generalmente entre 4 a 10 semanas." },
        { question: "¿Cómo se manejan los costos?", answer: "El diagnóstico (Blue Diamond) tiene un costo fijo por consultoría estratégica. La implementación (Red Diamond) se cotiza a medida. Si decide implementar con nosotros, el costo del diagnóstico se bonifica." }
      ]
    }
  },
  en: {
    hero: {
      title: "Intelligence & Automation for Market Enterprises",
      subtitle: "Diagnosis, architecture, and implementation of scalable digital systems.",
      ctaPrimary: "What can we offer your business?",
    },
    intro: {
      title: "The Authomia System",
      description: "Authomia Agency does not sell software, bots, or generic solutions. We design living, scalable, and measurable systems that turn operational chaos into strategic order.",
      cards: [
        { title: "Strategy", desc: "High-level vision" },
        { title: "Processes", desc: "Workflow architecture" },
        { title: "Technology", desc: "Automation & AI" },
        { title: "People", desc: "Adoption & culture" },
      ]
    },
    comparison: {
      title: "Why Authomia?",
      left: {
        title: "Other Agencies",
        items: ["Automate without understanding", "Implement isolated tools", "Quick promises", "No systemic vision"]
      },
      right: {
        title: "Authomia Agency",
        items: ["Deep diagnosis", "Integrated systems", "Real scalability", "Technical & human criteria"]
      }
    },
    protocols: {
      title: "Work Protocols",
      description: "Our process is designed to reduce uncertainty, optimize decisions, and guarantee clarity before any implementation.",
      pillarsTitle: "The 4 Evaluation Pillars",
      pillars: [
        { title: "Administration", icon: "FileText", desc: ["Internal processes", "Ops control", "Traceability"] },
        { title: "Marketing", icon: "Megaphone", desc: ["Positioning", "Channels", "Automation"] },
        { title: "Sales", icon: "TrendingUp", desc: ["Sales processes", "Funnels", "CRM Integration"] },
        { title: "Fulfillment", icon: "Package", desc: ["Service delivery", "Logistics", "Post-sales"] },
      ],
      steps: [
        { phase: "Phase 00", title: "Contact & Initial Filter", details: ["Request via form (Blue/Red Diamond)", "Technical viability check", "Client profile filtering"], type: "neutral", icon: "Filter" },
        { phase: "Phase 01", title: "First Meeting (Context)", details: ["Global business understanding", "Operational history", "Friction detection", "NO solutions sold here"], type: "neutral", icon: "Users" },
        { phase: "Phase 02", title: "Diagnosis & Modeling", details: ["4 Pillars Analysis", "Flow & bottleneck modeling", "Architecture definition", "Cost estimation"], type: "blue", icon: "Activity" },
        { phase: "Phase 03", title: "Diagnosis Presentation", details: ["Findings dashboard", "Proposed architecture explanation", "Investment scenarios", "Client decides next step"], type: "neutral", icon: "Monitor" },
        { phase: "Phase 04", title: "Activation (Red Diamond)", details: ["Final scope definition", "Implementation timeline", "Role assignment", "Pillar prioritization"], type: "red", icon: "Zap" },
        { phase: "Phase 05", title: "Auth & Inputs", details: ["Formal access & API handover", "NDA signing", "Operational data collection"], type: "red", icon: "Lock" },
        { phase: "Phase 06", title: "Implementation & Validation", details: ["Block deployment", "Real-environment validation", "Controlled adjustments", "Technical documentation"], type: "red", icon: "Layers" },
        { phase: "Phase 07", title: "Cierre & Transfer", details: ["Stabilized system delivery", "Final training", "Evolution guidelines"], type: "gold", icon: "CheckCircle" },
      ],
      closure: "Authomia does not improvise processes or execute without structure. Every project follows this protocol to guarantee order, coherence, and operational sustainability."
    },
    whoWeAre: {
      title: "Who We Are",
      rouletteTitle: "Authomia is designed for",
      sectors: [
        "Pharmacies and chains",
        "Restaurants and food groups",
        "Specialty coffee shops",
        "Hotels and hostels",
        "Clinics and medical centers",
        "Laboratorios",
        "Legal and accounting firms",
        "Transport companies",
        "Consolidated family businesses",
        "Multi-branch retail",
        "Professional services",
        "Private education",
        "Real estate",
        "Agro-industrial firms",
        "Distributors",
        "Retail stores",
        "Expanding franchises"
      ],
      specialSector: "IT",
      specialMessage: "This structure was designed for IT.",
      report: [
        { title: "Corporate Identity", content: "Authomia Agency is a specialized agency in strategic diagnosis, system design, and tech implementation. We exist to solve the lack of operational understanding in tech adoption." },
        { title: "Nature of Agency", content: "We do not operate from a single discipline. We integrate business analysis, process modeling, and technology under 4 pillars: Admin, Marketing, Sales, Fulfillment." },
        { title: "Operational Purpose", content: "Transform operational complexity into clear, measurable, executable systems, allowing businesses to grow without losing control." },
        { title: "Methodological Approach", content: "We work under a 'Diagnosis-First' approach. We separate business understanding from technical execution to avoid structural errors." },
        { title: "Intervention Structure", content: "We clearly divide thought (Blue Diamond Prime™) from action (Red Diamond Prime™). We do not build without approved blueprints." },
        { title: "Work Criteria", content: "Diagnosis before execution. Structure before speed. System before tool." },
        { title: "Client Profile", content: "We work with organizations that value analysis, seek order, and require real scalability, not just temporary patches." },
        { title: "Operational Base", content: "Authomia Agency is based in Jauja – Junín – Perú, with national and international deployment capacity." },
        { title: "Institutional Synthesis", content: "Authomia Agency analyzes, designs, and implements systems with technical criteria, structural focus, and long-term vision." }
      ],
      pillars: [
        { title: "Administration", icon: "FileText", desc: ["Internal processes", "Ops management", "Admin control"] },
        { title: "Marketing", icon: "Megaphone", desc: ["Positioning", "Channels", "Message"] },
        { title: "Sales", icon: "TrendingUp", desc: ["Sales processes", "Funnels", "Tracking"] },
        { title: "Fulfillment", icon: "Package", desc: ["Service delivery", "Logistics", "Customer experience"] },
      ]
    },
    contact: {
      title: "Official Contact",
      email: "authomia.agency@gmail.com",
      phone: "+51 934 384 060",
      location: "Jauja – Junín – Peru",
      locationLabel: "Operations Center"
    },
    services: {
      blue: {
        name: "BLUE DIAMOND PRIME™",
        subtitle: "Premium Strategic Diagnosis",
        features: [
          "Deep process analysis",
          "AI opportunity detection",
          "Automation evaluation",
          "Clear strategic roadmap"
        ],
        priceRange: "Investment Range: Strategic",
        priceNote: "Price depends on real business complexity.",
        cta: "Select Strategic Protocol"
      },
      red: {
        name: "RED DIAMOND PRIME™",
        subtitle: "Diagnosis + Integral Implementation",
        features: [
          "All Blue Diamond diagnosis",
          "Automation implementation",
          "AI Integration",
          "Scalable & secure architecture"
        ],
        priceRange: "Investment Range: Enterprise",
        priceNote: "Diagnosis fee waived if we implement.",
        cta: "Select Integral Protocol"
      },
      hook: "Not convinced yet? Keep scrolling..."
    },
    process: {
      title: "Neural Flow Architecture",
      bluePhase: {
        title: "STRATEGIC PHASE",
        steps: [
          { id: "01", title: "Evaluation", desc: "Technical and operational feasibility scan." },
          { id: "02", title: "Diagnosis", desc: "Deep analysis of the business core." },
          { id: "03", title: "Design", desc: "Solution architecture planning." }
        ]
      },
      barrierLabel: "EXECUTION PROTOCOL",
      redPhase: {
        title: "EXECUTION PHASE",
        steps: [
          { id: "04", title: "Implementation", desc: "Automation and AI deployment in production." },
          { id: "05", title: "Optimization", desc: "Continuous refinement based on metrics." }
        ]
      }
    },
    appExperience: {
      text: "Total control over your digital assets. Activate or deactivate neural flows and observe real-time impact.",
      metrics: [
        { value: "0", label: "Prod. Executions" },
        { value: "0", label: "Failed Executions" },
        { value: "0%", label: "Failure Rate" },
        { value: "0s", label: "Run Time (Avg)" }
      ]
    },
    costExperience: {
      title: "Financial Scalability Projection",
      subtitle: "Profitability vs Time (12 Months). Slide to analyze divergence.",
      labels: {
        traditional: "Traditional Agency",
        traditionalDesc: "Linear cost, diminishing efficiency.",
        authomia: "Authomia Architecture",
        authomiaDesc: "Zero marginal cost, exponential scale.",
      },
      floatingPoints: [],
      insights: []
    },
    testimonials: {
      title: "Reputation Log",
      voidTitle: "Signal Not Detected",
      voidDesc: "Public review database awaiting genesis block. Be the first strategic partner to set the quality standard.",
      cta: "Write First Entry"
    },
    clients: {
      title: "Legacy Partner Protocol",
      subtitle: "Elite architecture requires visionaries. 'Slot Genesis' is reserved for the first v2.0 success case.",
      slotTitle: "SLOT 01: AVAILABLE",
      slotDesc: "System capacity reserved for founding partner.",
      cta: "Initiate Access Request"
    },
    finalCta: {
      title: "Decision Reached? Select Intervention Level",
      blueSummary: "Ideal for operational clarity and roadmap.",
      redSummary: "Ideal for total transformation and execution."
    },
    footer: {
      legal: ["Privacy Policy", "Terms & Conditions", "Legal Notice"],
      social: ["LinkedIn", "Facebook", "Instagram"],
      nav: ["Work Protocols", "Who We Are", "FAQ"],
      contact: "Official Contact",
      copyright: "Authomia Agency © 2024. All Systems Operational."
    },
    legalDocuments: {
      privacy: {
        title: "Global Privacy Policy",
        lastUpdated: "Last Updated: Operational Current",
        sections: [
          {
            heading: "1. Introduction",
            content: "Authomia Agency is responsible for the treatment of personal data collected through its website."
          }
        ]
      },
      terms: {
        title: "Terms & Conditions",
        lastUpdated: "Immediate",
        sections: [
          {
            heading: "1. Object",
            content: "Terms regulating the use of the Authomia website and services."
          }
        ]
      },
      legalNotice: {
        title: "Corporate Legal Notice",
        lastUpdated: "Status: Active",
        sections: [
          {
            heading: "1. Owner Identification",
            content: "Authomia Agency."
          }
        ]
      }
    },
    faq: {
      title: "Doubt Resolution Center (FAQ)",
      items: [
        { question: "What information must the client provide?", answer: "Operational info, workflows, controlled access, and internal documentation. All requested under strict authorization." },
        { question: "Does Authomia execute without client approval?", answer: "No. No implementation starts without a presented diagnosis and formal confirmation." },
        { question: "How do I start the process?", answer: "From the 'Start Diagnosis' button, which opens a guided questionnaire." },
        { question: "What is the difference between Blue and Red Diamond?", answer: "Blue Diamond Prime is the intelligence and diagnostic phase (the architect's blueprint). Red Diamond Prime is the construction and technical implementation phase (the building). We do not build without blueprints." }
      ]
    }
  }
};