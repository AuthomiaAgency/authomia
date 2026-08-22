import { Content, Language } from './types';

export const LOGO_TEXT_URL = "https://imgur.com/h6YsFBg.png";
export const LOGO_ICON_URL = "https://lh3.googleusercontent.com/a/ACg8ocJm6J1CFWtP53KiJT18j3NSLQBU6bJpEOle5eMYXLMiSO8CbEw=s288-c-no";

// DOMAIN CONFIGURATION
export const MAIN_DOMAIN = "https://authomia.cloud";
export const SUBDOMAIN_URL = "https://insights.authomia.cloud";

export const CONTENT: Record<Language, Content> = {
  es: {
    hero: {
      title: "Arquitectura Digital e Inteligencia Estratégica para Empresas",
      subtitle: "Diseño, ingeniería e integración de plataformas web de alto rendimiento, sistemas de inteligencia aplicada y optimización operativa para empresas en crecimiento.",
      ctaPrimary: "Conocer Soluciones Corporativas",
    },
    intro: {
      title: "Metodología Authomia",
      description: "Authomia Agency no implementa herramientas aisladas ni promesas genéricas. Diseñamos infraestructura digital sólida, plataformas web modernas e integraciones de inteligencia que maximizan la visibilidad, reducen costos operativos y escalan con el negocio.",
      cards: [
        { title: "Arquitectura Web & Plataformas", desc: "Desarrollo de portales, sistemas web y experiencias digitales de alto impacto comercial." },
        { title: "Integración de Inteligencia Artificial", desc: "Modelos y asistentes aplicados a operaciones, atención al cliente y gestión de datos." },
        { title: "Optimización de Procesos", desc: "Automatización de flujos comerciales, administrativos y logísticos con control total." },
        { title: "Estrategia & Visibilidad de Marca", desc: "Posicionamiento técnico, presencia digital corporativa y conversión medible." },
      ]
    },
    comparison: {
      title: "Criterio de Ingeniería vs. Enfoques Tradicionales",
      left: {
        title: "Agencias Convencionales",
        items: [
          "Plantillas genéricas y software sin personalización",
          "Herramientas desconectadas que generan fricción",
          "Promesas rápidas sin auditoría previa",
          "Falta de soporte y arquitectura escalable"
        ]
      },
      right: {
        title: "Authomia Agency",
        items: [
          "Arquitectura a la medida de los objetivos del negocio",
          "Sistemas integrados con seguridad y trazabilidad",
          "Diagnóstico riguroso antes de cualquier desarrollo",
          "Soberanía tecnológica, código limpio y alta disponibilidad"
        ]
      }
    },
    protocols: {
      title: "Protocolos de Trabajo Corporativo",
      description: "Un proceso estructurado en fases para garantizar previsibilidad técnica, cumplimiento de tiempos y retorno claro sobre la inversión.",
      pillarsTitle: "Pilares de Intervención",
      pillars: [
        { title: "Administración", icon: "FileText", desc: ["Procesos internos", "Control operativo", "Trazabilidad de datos"] },
        { title: "Presencia & Visibilidad", icon: "Megaphone", desc: ["Plataformas web", "Posicionamiento", "Canales digitales"] },
        { title: "Ventas & Conversión", icon: "TrendingUp", desc: ["Embudos comerciales", "Integración CRM", "Seguimiento ágil"] },
        { title: "Operaciones & Soporte", icon: "Package", desc: ["Entrega de servicio", "Automatización de atención", "Post-venta"] },
      ],
      steps: [
        { phase: "Fase 01", title: "Evaluación y Alcance Inicial", details: ["Revisión del modelo de negocio", "Levantamiento de requerimientos y objetivos", "Validación de factibilidad técnica"], type: "neutral", icon: "Filter" },
        { phase: "Fase 02", title: "Diagnóstico y Arquitectura de Solución", details: ["Auditoría de sistemas existentes", "Diseño de la infraestructura y flujos de trabajo", "Plan maestro y estimación transparente"], type: "blue", icon: "Activity" },
        { phase: "Fase 03", title: "Presentación y Validación Estratégica", details: ["Revisión ejecutiva de hallazgos y propuesta", "Demostración de arquitectura y alcance", "Aprobación formal del cronograma"], type: "neutral", icon: "Monitor" },
        { phase: "Fase 04", title: "Ingeniería y Desarrollo por Bloques", details: ["Construcción de módulos y plataformas", "Integración de APIs e inteligencia aplicada", "Pruebas continuas de rendimiento y seguridad"], type: "red", icon: "Zap" },
        { phase: "Fase 05", title: "Despliegue Controlado y Validación", details: ["Puesta en marcha en entorno productivo", "Pruebas de estrés y validación con usuarios reales", "Ajustes de precisión y estabilización"], type: "red", icon: "Layers" },
        { phase: "Fase 06", title: "Transferencia y Soporte Continuo", details: ["Entrega de documentación técnica completa", "Capacitación a los equipos del cliente", "Mantenimiento y evolución de sistemas"], type: "gold", icon: "CheckCircle" },
      ],
      closure: "La disciplina técnica y la claridad en la comunicación son la base de cada desarrollo en Authomia Agency."
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
    detailedServices: {
      blue: {
        title: "BLUE DIAMOND PRIME™",
        description: "La fase de inteligencia pura. Antes de escribir una sola línea de código, entendemos tu negocio mejor que nadie.",
        items: [
          { title: "Análisis de Flujos Empresariales", desc: "Mapeo exhaustivo de cada movimiento operativo para detectar ineficiencias invisibles." },
          { title: "Detección de Oportunidades Tecnológicas", desc: "Evaluación de dónde la IA y la automatización generarán el mayor retorno inmediato (ROI)." },
          { title: "Auditoría de Seguridad Digital", desc: "Revisión de vulnerabilidades críticas en la infraestructura actual (Opcional pero recomendado)." },
          { title: "Roadmap de Implementación", desc: "El plano maestro. Un documento estratégico que te dice qué hacer, cuándo y cuánto costará." }
        ]
      },
      red: {
        title: "RED DIAMOND PRIME™",
        description: "La fase de construcción. Transformamos el diagnóstico en sistemas vivos, autónomos y rentables. NOTA: Los siguientes son solo algunos ejemplos de nuestro catálogo integrado de soluciones.",
        items: [
          { title: "Diagnóstico de Madurez IA", desc: "Evaluación del nivel real de adopción de IA, identificando riesgos y retorno esperado antes de implementar.", icon: "Brain" },
          { title: "Asistentes Inteligentes (AI Assistants)", desc: "Diseño de agentes entrenados con data de tu negocio para soporte, ventas o gestión operativa interna.", icon: "Bot" },
          { title: "Chatbots Multicanal", desc: "Sistemas avanzados en WhatsApp/Web que no solo responden, sino que ejecutan acciones y cierran procesos.", icon: "MessageSquare" },
          { title: "Automatización de Atención (Customer Ops)", desc: "Clasificación, respuesta y derivación automática de consultas para reducir la carga operativa humana.", icon: "Headphones" },
          { title: "Procesamiento Inteligente de Documentos (IDP)", desc: "Lectura y extracción automática de datos desde facturas, contratos y reportes PDF/físicos.", icon: "FileText" },
          { title: "Automatización de Procesos (RPA)", desc: "Robots de software que ejecutan tareas repetitivas administrativas, financieras y logísticas 24/7.", icon: "Cpu" },
          { title: "Automatización de Ventas (CRM)", desc: "Sistemas de seguimiento automático de leads, recordatorios y cierre para que ningún cliente se enfríe.", icon: "TrendingUp" },
          { title: "Automatización de Marketing", desc: "Flujos de nutrición, segmentación y reactivación de clientes basados en comportamiento real.", icon: "Megaphone" },
          { title: "Dashboards & BI Automatizado", desc: "Transformación de datos crudos en paneles de control visuales para toma de decisiones en tiempo real.", icon: "BarChart3" },
          { title: "Desarrollo de Software a Medida", desc: "Creación de herramientas específicas (Custom Tools) cuando el software genérico no es suficiente.", icon: "Code" },
          { title: "Integración de Sistemas (APIs)", desc: "Conexión fluida entre tu ERP, CRM y herramientas externas para que operen como un solo organismo.", icon: "Link" },
          { title: "Ciberseguridad & Auditoría", desc: "Blindaje de la infraestructura digital y protocolos de seguridad para proteger los activos de información.", icon: "ShieldCheck" }
        ]
      }
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
      nav: ["Protocolos de Trabajo", "Quiénes Somos", "Servicios y FAQs"],
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
        { question: "¿Cuál es la diferencia real entre Blue y Red Diamond?", answer: "Es la diferencia entre el plano y el edificio. Blue Diamond Prime™ es el servicio de consultoría estratégica: entregamos inteligencia, mapas de procesos y un plan de acción claro. Red Diamond Prime™ es la ejecución de ese plan: construimos el software, configuramos las IAs y automatizamos los procesos. Si contratas Red Diamond, el costo del Blue Diamond se bonifica al 100%." },
        { question: "¿Qué necesito tener listo para empezar?", answer: "Solo voluntad de cambio y acceso a la información de tu negocio. No necesitas tener procesos perfectos ni tecnología avanzada; justamente para eso nos contratas. Durante la Fase 01, nosotros nos encargamos de extraer la información necesaria mediante entrevistas y auditorías guiadas." },
        { question: "¿Cuánto tiempo tarda una implementación completa?", answer: "Depende de la complejidad. Un diagnóstico Blue Diamond toma entre 10 a 15 días hábiles. Una implementación Red Diamond típica oscila entre 4 a 12 semanas. No hacemos proyectos eternos; trabajamos por sprints de entrega de valor para que veas resultados funcionales lo antes posible." },
        { question: "¿La automatización reemplazará a mi personal?", answer: "El objetivo de Authomia no es despedir humanos, sino eliminar el trabajo robótico que hacen los humanos. Buscamos que tu equipo deje de copiar y pegar datos en Excel y empiece a tomar decisiones estratégicas, atender mejor a los clientes y generar más valor. Automatizamos tareas, potenciamos personas." },
        { question: "¿Qué pasa si mis sistemas actuales son muy antiguos?", answer: "Es nuestro escenario favorito. Somos expertos en integración. Podemos conectar sistemas 'legacy' antiguos con IAs modernas mediante capas intermedias (middleware) o, si es necesario, diseñar un plan de migración seguro. No te obligaremos a cambiar todo tu software si no es estrictamente necesario para la rentabilidad." },
        { question: "¿Ofrecen garantía sobre los resultados?", answer: "En tecnología, garantizar resultados financieros exactos es irresponsable. Lo que garantizamos es la funcionalidad técnica: el sistema hará exactamente lo que se diseñó que hiciera. Además, trabajamos con una política de 'Cero Deuda Técnica': entregamos código limpio, documentado y propiedad tuya, no cajas negras." },
        { question: "¿Cómo se maneja la confidencialidad de mis datos?", answer: "Con rigor militar. Firmamos Acuerdos de Confidencialidad (NDA) antes de recibir cualquier acceso. Tus datos se utilizan únicamente para el entrenamiento de tus propios modelos y la configuración de tus sistemas. No compartimos ni vendemos datos a terceros. La seguridad es un pilar no negociable de nuestra arquitectura." }
      ]
    }
  },
  en: {
    hero: {
      title: "Digital Architecture & Applied Intelligence for Enterprises",
      subtitle: "Engineering and integration of high-performance web platforms, applied AI systems, and operational optimization for scaling businesses.",
      ctaPrimary: "Explore Enterprise Solutions",
    },
    intro: {
      title: "The Authomia Methodology",
      description: "Authomia Agency designs robust digital infrastructure, modern web platforms, and tailored intelligence integrations that maximize visibility, reduce operational overhead, and scale sustainably.",
      cards: [
        { title: "Web Architecture & Platforms", desc: "Engineering high-impact portals, web applications, and digital business platforms." },
        { title: "Enterprise AI Integration", desc: "Applied models and assistants for customer operations, workflow automation, and data insight." },
        { title: "Process Optimization", desc: "End-to-end automation of commercial, administrative, and fulfillment workflows with complete control." },
        { title: "Strategic Visibility & Growth", desc: "Technical brand positioning, digital footprint enhancement, and measurable conversion." },
      ]
    },
    comparison: {
      title: "Engineering Discipline vs. Conventional Approaches",
      left: {
        title: "Traditional Agencies",
        items: [
          "Generic templates and uncustomized off-the-shelf tools",
          "Disconnected software causing team friction",
          "Quick promises with no prior structural diagnosis",
          "Zero code ownership or long-term architecture"
        ]
      },
      right: {
        title: "Authomia Agency",
        items: [
          "Custom engineering aligned directly with business goals",
          "Unified systems with enterprise security and traceability",
          "Rigorous diagnosis and blueprint before any deployment",
          "Complete technological sovereignty and scalable infrastructure"
        ]
      }
    },
    protocols: {
      title: "Corporate Work Protocols",
      description: "A structured phase-by-phase framework ensuring technical predictability, timely execution, and clear return on investment.",
      pillarsTitle: "Core Execution Pillars",
      pillars: [
        { title: "Administration", icon: "FileText", desc: ["Internal operations", "Process control", "Data traceability"] },
        { title: "Presence & Visibility", icon: "Megaphone", desc: ["Web platforms", "Positioning", "Digital channels"] },
        { title: "Sales & Conversion", icon: "TrendingUp", desc: ["Commercial funnels", "CRM Integration", "Lead tracking"] },
        { title: "Operations & Support", icon: "Package", desc: ["Service delivery", "Support automation", "Post-sales"] },
      ],
      steps: [
        { phase: "Phase 01", title: "Assessment & Scoping", details: ["Business model evaluation", "Requirements and KPI alignment", "Technical feasibility audit"], type: "neutral", icon: "Filter" },
        { phase: "Phase 02", title: "Diagnosis & Solution Architecture", details: ["Legacy systems audit", "Infrastructure and flow blueprinting", "Detailed master plan and transparent pricing"], type: "blue", icon: "Activity" },
        { phase: "Phase 03", title: "Executive Validation & Alignment", details: ["Presentation of findings and architecture", "Scope confirmation and milestone sign-off", "Client approval to proceed"], type: "neutral", icon: "Monitor" },
        { phase: "Phase 04", title: "Modular Engineering & Build", details: ["Component and platform development", "API & applied intelligence integration", "Continuous security and performance testing"], type: "red", icon: "Zap" },
        { phase: "Phase 05", title: "Controlled Deployment & Validation", details: ["Staging-to-production rollout", "Stress testing and real-user validation", "Fine-tuning and system stabilization"], type: "red", icon: "Layers" },
        { phase: "Phase 06", title: "Handover & Ongoing Support", details: ["Complete technical documentation delivery", "Team training and operations manual", "Evolution roadmap and continuous maintenance"], type: "gold", icon: "CheckCircle" },
      ],
      closure: "Technical discipline and clear communication form the bedrock of every development at Authomia Agency."
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