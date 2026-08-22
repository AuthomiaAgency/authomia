# Authomia Agency — Engineering & Enterprise Digital Architecture

Plataforma corporativa web de **Authomia**, especializada en arquitectura de software, plataformas cloud de alto rendimiento, sistemas de inteligencia operativa y automatización de procesos empresariales.

---

## 🏛️ Visión y Arquitectura de la Plataforma

Authomia ofrece infraestructura digital con **soberanía técnica total**:
- **0% Comisiones / Dependencias**: Todo el código fuente, bases de datos y arquitectura pertenecen 100% al cliente.
- **Microservicios & Cloud**: APIs resilientes, bases de datos relacionales, sincronización multi-sucursal y conectores ERP/CRM.
- **Inteligencia Operativa**: Asistentes y agentes autónomos para atención comercial 24/7 y calificación de leads sin clichés visuales.
- **Rendimiento Extremo**: Optimizaciones Core Web Vitals, carga sub-segundo, animaciones por hardware y SEO técnico estructural.

---

## 📂 Estructura del Proyecto

```text
├── components/                 # Componentes modulares y vistas
│   ├── Background.tsx          # Fondo dinámico de precisión y partículas
│   ├── BusinessContactForm.tsx # Formulario empresarial con sanitización y honeypot
│   ├── Clients.tsx             # Portafolio y casos de infraestructura
│   ├── Comparison.tsx          # Comparativa de valor y soberanía técnica
│   ├── ContactPage.tsx         # Vista extendida de canales de atención
│   ├── CostExperience.tsx      # Simulador de retorno de inversión
│   ├── Hero.tsx                # Cabecera principal con call-to-action
│   ├── Intro.tsx               # Desglose de las 4 divisiones de servicios
│   ├── Manager.tsx             # Panel de gestión y control
│   ├── Mifo.tsx                # Motor interactivo de diagnóstico de flujos
│   ├── Modals.tsx              # Diálogos modales y políticas legales
│   ├── Navbar.tsx              # Barra de navegación con selector de idioma
│   ├── NeuroConcierge.tsx      # Asistente de consulta rápida
│   ├── Process.tsx             # Metodología y protocolo de entrega
│   ├── ProtocolsOverlay.tsx    # Vista modal de protocolos técnicos
│   ├── ProtocolsPage.tsx       # Página dedicada de protocolos
│   ├── Publications.tsx        # Artículos y recursos de ingeniería
│   ├── Questionnaire.tsx       # Diagnóstico Blue / Red Diamond
│   ├── QuestionnairePage.tsx   # Página de diagnóstico interactivo
│   ├── Reviews.tsx             # Reseñas verificadas con sincronización
│   ├── Services.tsx            # Vista resumen de servicios
│   ├── ServicesPage.tsx        # Página de desglose y FAQ técnico
│   ├── Survey.tsx              # Encuesta de necesidades operativas
│   ├── Testimonials.tsx        # Testimonios corporativos
│   ├── WhoWeAreOverlay.tsx     # Modal institucional
│   └── WhoWeArePage.tsx        # Página institucional de ingeniería
├── lib/
│   └── firebase.ts             # Configuración segura de Firebase/Firestore
├── services/
│   └── geminiService.ts        # Capa de integración de modelos de IA
├── App.tsx                     # Enrutamiento dinámico SPA y orquestación
├── constants.ts                # Contenidos multilingües (ES / EN) y datos
├── types.ts                    # Definición de tipos e interfaces TypeScript
├── firestore.rules             # Reglas de seguridad RBAC para Firestore
├── index.html                  # Punto de entrada HTML con SEO y meta tags
├── index.tsx                   # Renderizado raíz de React 19
├── vite.config.ts              # Configuración de Vite & plugins
├── tsconfig.json               # Configuración estricta de TypeScript
└── .env.example                # Plantilla de variables de entorno
```

---

## 🔒 Seguridad & Hardening Implementado

1. **Sanitización Estricta contra XSS**: Filtrado de etiquetas HTML y protocolos no seguros en todos los inputs.
2. **Honeypot Anti-Spambot**: Trampa invisible para neutralizar tráfico automatizado malicioso.
3. **Rate Limiting del Cliente**: Prevención de bombardeo de peticiones y saturación en formularios.
4. **Validación RFC 5322**: Comprobación estricta de formato en correos electrónicos corporativos.
5. **Aislamiento de Secretos**: `.gitignore` configurado para impedir la fuga de variables `.env` o credenciales a repositorios públicos.
6. **Reglas de Acceso Firestore**: Creación controlada con esquemas validados y permisos de lectura/edición limitados a administradores.

---

## 🚀 Despliegue & Ejecución Local

### Prerrequisitos
- Node.js 20+ o 22+
- npm, yarn o bun

### 1. Clonar e Instalar Dependencias
```bash
git clone https://github.com/TU_USUARIO/authomia-agency.git
cd authomia-agency
npm install
```

### 2. Configurar Variables de Entorno
Copia la plantilla y define tus claves locales:
```bash
cp .env.example .env
```

### 3. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### 4. Compilación para Producción
```bash
npm run build
```
Los archivos estáticos optimizados se generarán en el directorio `dist/`.

---

## 🌐 Conexión con GitHub

Para sincronizar este repositorio con GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

---

## 📄 Licencia y Propiedad

© 2026 **Authomia Agency**. Todos los derechos reservados.
Contacto: `authomia.agency@gmail.com`
