# Guía de Migración: Authomia Insights & Manager CMS v2.0

Este documento detalla la arquitectura, dependencias y estructura de datos necesarias para migrar y adoptar el nuevo **Authomia Manager CMS v2.0** y la sección de **Publicaciones** en el nuevo proyecto (`insights.authomia.cloud`).

---

## 1. Arquitectura del Nuevo Proyecto

El nuevo proyecto debe aislar la lógica de publicaciones y gestión del contenido de la landing page principal.

*   **Ruta Principal (`/` o `insights.authomia.cloud`):** Deberá renderizar la vista pública de publicaciones (el componente `Publications.tsx` actual).
*   **Ruta de Gestión (`/manager`):** Deberá renderizar el nuevo `Manager.tsx`.

---

## 2. Dependencias Requeridas

Asegúrate de instalar las siguientes dependencias en el nuevo proyecto para garantizar que la UI, las animaciones y los gráficos funcionen correctamente:

```bash
npm install lucide-react framer-motion recharts firebase
```

*   **`lucide-react`**: Para toda la iconografía premium del CMS.
*   **`framer-motion`**: Para las microinteracciones, transiciones de pestañas y modales.
*   **`recharts`**: Para el nuevo Dashboard de Analytics (gráficos de área y barras).
*   **`firebase`**: Para la autenticación y la base de datos Firestore.

---

## 3. Estructura de Datos (Firebase Firestore)

El CMS v2.0 utiliza una estructura NoSQL basada en documentos únicos dentro de la colección `appData`. A continuación, las interfaces TypeScript exactas que debes usar:

### A. Publicaciones (`appData/publications`)
```typescript
interface PublicationBlock {
  id: string; // Generado con Date.now() para estabilidad en drag & drop
  type: 'text' | 'image' | 'button' | 'heading' | 'h2' | 'h3' | 'h4' | 'quote' | 'video' | 'divider' | 'code';
  content: string;
  extra?: string; // Usado para el autor en citas, color en botones, etc.
  url?: string; // Usado para botones y videos
}

interface Publication {
  id: string;
  title: string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  groupId?: string;
  date: string;
  coverImage: string; // Base64 o URL
  coverPosition?: 'top' | 'bottom' | 'hidden'; // Posición del banner
  authorId?: string; // ID del miembro del equipo
  relatedPosts?: string[]; // IDs de posts relacionados
  excerpt: string;
  blocks: PublicationBlock[];
  status: 'published' | 'draft';
}
```

### B. Grupos de Publicaciones (`appData/publicationGroups`)
```typescript
interface PublicationGroup {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}
```

### C. Partners (`appData/partners`)
```typescript
interface Partner {
  id: string;
  companyName: string;
  personName: string;
  quote: string;
  image: string;
  website: string;
  bio: string;
  borderColor?: 'white' | 'red' | 'blue' | 'green' | 'gold';
  socialLinks?: string[]; // Enlaces a redes sociales (LinkedIn, etc.)
  customButtons?: { label: string; url: string; color?: string }[]; // Botones personalizados
}
```

### D. Equipo y Socios (`appData/team`)
```typescript
interface TeamMember {
  id: string;
  email: string;
  password?: string; // Almacenado en texto plano para el prototipo
  role: 'admin' | 'socio'; // Control de acceso
}
```

### E. Postulantes (`appData/applications`)
```typescript
interface JobApplication {
  id: string;
  name: string;
  email: string;
  specialty: string;
  pastProjects: string;
  cvUrl?: string;
  date: string;
}
```

### F. Materiales MIFO (`appData/materials`)
```typescript
interface MaterialLead {
  email: string;
  date: string;
}

interface Material {
  id: string;
  title: string;
  type: 'mifo';
  leads: MaterialLead[];
}
```

---

## 4. Novedades del Manager v2.0 (Para adoptar)

Al copiar el archivo `Manager.tsx` al nuevo proyecto, te llevarás las siguientes características "Ultra-Premium" ya implementadas:

### 🎨 UI/UX "Deep Dark Mode"
*   Se ha eliminado la barra de navegación superior a favor de un **Sidebar colapsable** profesional.
*   Uso intensivo de `backdrop-blur-xl` y bordes `border-white/5` para un efecto *glassmorphism* elegante.
*   Tipografía dual: `Inter` para lectura y `JetBrains Mono` para datos técnicos y etiquetas.

### 📝 Editor de Bloques "Lienzo Infinito"
*   **Nuevos Bloques:** Soporte para videos de YouTube (`video`) y botones personalizados (`button`).
*   **Metadatos Avanzados:** Control de posición del banner (`coverPosition`), asignación de autor (`authorId`) y selección de posts relacionados (`relatedPosts`).
*   **Smart Paste:** El botón "Smart Paste" permite pegar texto desde el portapapeles y detecta automáticamente bloques de código (` ``` `), encabezados (`#`, `##`), citas (`>`) y divisores (`---`), convirtiéndolos en bloques estructurados.

### 📊 Analytics Dashboard
*   **Global Analytics:** Una pestaña dedicada en el Sidebar que muestra vistas totales, visitantes únicos y tiempo de lectura promedio.
*   **Gráficos Interactivos:** Implementación de `recharts` para mostrar el tráfico de los últimos 30 días con un gradiente azul elegante.
*   **Post-Level Analytics:** Dentro del editor de cada publicación, ahora hay un *toggle* en la parte superior para cambiar entre **"Content"** (el editor) y **"Analytics"** (estadísticas específicas de ese post).

### 👥 Gestión de Equipo y Socios
*   Nueva pestaña **"Equipo / Socios"** para gestionar accesos al CMS.
*   Soporte para inicio de sesión de "Socios" con credenciales específicas.

### 💼 Postulantes y Materiales
*   Pestaña **"Postulantes"** para revisar las solicitudes enviadas desde la sección "Join the Team" de la web principal.
*   Pestaña **"Materiales (MIFO)"** para visualizar los leads capturados a través de descargas de material.

### 🤝 Partners Mejorados
*   El editor de Partners ahora incluye soporte para agregar múltiples enlaces de redes sociales y botones personalizados con colores específicos.

---

## 5. Pasos para la Migración

1.  **Inicializar el nuevo proyecto:** Crea el proyecto para `insights.authomia.cloud`.
2.  **Instalar dependencias:** Ejecuta el comando de instalación mencionado en la sección 2.
3.  **Configurar Tailwind:** Asegúrate de que tu `tailwind.config.js` tenga los colores personalizados (ej. `authomia-blue`, `authomia-blueLight`).
4.  **Copiar Componentes:**
    *   Copia `Manager.tsx` (contiene todo el CMS y Analytics).
    *   Copia `Publications.tsx` (la vista pública).
5.  **Configurar Firebase:** Copia tu archivo `lib/firebase.ts` al nuevo proyecto para mantener la conexión con la misma base de datos.
6.  **Desplegar:** Despliega en Vercel y asigna el dominio `insights.authomia.cloud`.

---
*Documento generado para la estandarización del ecosistema Authomia.*
