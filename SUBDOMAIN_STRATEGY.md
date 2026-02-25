# Guía Maestra de Implementación: Subdominio insights.authomia.cloud

Esta guía detalla paso a paso cómo crear, configurar y desplegar la aplicación web dedicada a publicaciones (`insights.authomia.cloud`), manteniendo la coherencia visual y estructural con el dominio principal (`authomia.cloud`).

---

## 1. Arquitectura del Ecosistema

El objetivo es crear un "Silo" de contenido. Aunque son dos proyectos técnicos distintos, para el usuario deben sentirse como una sola experiencia.

*   **Proyecto A (Principal):** `authomia.cloud` (Landing, Servicios, Contacto, Manager).
*   **Proyecto B (Insights):** `insights.authomia.cloud` (Solo lectura de publicaciones).
*   **Base de Datos:** Compartida (Firebase Firestore).

---

## 2. Creación del Proyecto "Insights" (Paso a Paso)

### Paso A: Inicialización del Proyecto
No necesitas empezar de cero. La forma más rápida y segura es clonar tu proyecto actual y limpiar lo que no sirve.

1.  **Clonar Repositorio:**
    *   Crea una copia de tu carpeta actual de `authomia-web` y llámala `authomia-insights`.
    *   O si usas GitHub, crea un nuevo repo e importa el código actual.

2.  **Limpieza de Archivos (En el nuevo proyecto `authomia-insights`):**
    *   Elimina componentes que NO usarás: `Hero.tsx`, `Intro.tsx`, `Services.tsx`, `Process.tsx`, `Clients.tsx`, `Manager.tsx`, etc.
    *   Mantén solo: `Navbar.tsx`, `Publications.tsx`, `Footer.tsx` (simplificado), `firebase.ts`, `constants.ts`, `types.ts`.

### Paso B: Configuración de Rutas y Componentes

En el nuevo proyecto `authomia-insights`, tu archivo `App.tsx` debe ser extremadamente simple.

**Ejemplo de `App.tsx` para Insights:**

```tsx
import React from 'react';
import Navbar from './components/Navbar';
import Publications from './components/Publications'; // Tu componente actual adaptado
import Footer from './components/Footer';

function App() {
  // En este subdominio, la página principal ES las publicaciones
  return (
    <main className="bg-[#020202] min-h-screen text-white font-sans">
      <Navbar />
      <Publications />
      <Footer />
    </main>
  );
}

export default App;
```

### Paso C: Adaptación de la Navegación (Crucial para el Silo)

Para que el usuario pueda volver al sitio principal, debes cambiar los enlaces internos (`<Link>` o navegación por estado) por **enlaces absolutos** (`<a href="...">`).

**En `components/Navbar.tsx` (del proyecto Insights):**

```tsx
// En lugar de navegar internamente, mandamos al usuario al dominio principal
<a href="https://authomia.cloud/" className="...">Inicio</a>
<a href="https://authomia.cloud/servicios" className="...">Servicios</a>
<a href="https://authomia.cloud/sobre-nosotros" className="...">Quiénes Somos</a>
<a href="https://authomia.cloud/contacto" className="...">Contacto</a>
// El logo también debe apuntar a https://authomia.cloud/
```

**En `components/Navbar.tsx` (del proyecto Principal `authomia.cloud`):**

```tsx
// El enlace a publicaciones debe apuntar al subdominio
<a href="https://insights.authomia.cloud" className="...">Publicaciones</a>
```

---

## 3. Configuración de Firebase (Compartida)

No crees un nuevo proyecto en Firebase. Usa las **mismas credenciales** que ya tienes en `lib/firebase.ts`.

1.  Asegúrate de que el archivo `.env` del nuevo proyecto `authomia-insights` tenga las mismas variables de entorno que el principal.
2.  En la consola de Firebase > Authentication > Settings > Authorized Domains, añade:
    *   `insights.authomia.cloud`

Esto permitirá que el nuevo sitio lea la base de datos sin problemas.

---

## 4. Despliegue en Vercel (Hosting)

1.  Ve a tu dashboard de Vercel.
2.  Haz clic en **"Add New..."** > **"Project"**.
3.  Importa el repositorio de `authomia-insights`.
4.  En la configuración del proyecto:
    *   **Framework Preset:** Vite
    *   **Environment Variables:** Copia las variables de Firebase de tu proyecto principal.
5.  Haz clic en **Deploy**.

### Configuración del Dominio

Una vez desplegado:
1.  Ve a **Settings** > **Domains** en tu nuevo proyecto de Vercel.
2.  Escribe: `insights.authomia.cloud`.
3.  Vercel te dará unos valores DNS (probablemente un registro `CNAME` o `A`).
4.  Ve a tu proveedor de dominios (donde compraste `authomia.cloud`).
5.  Añade el registro DNS que te pide Vercel.
    *   Type: `CNAME`
    *   Name: `insights`
    *   Value: `cname.vercel-dns.com` (o lo que te indique Vercel).

---

## 5. SEO y Consideraciones Finales

*   **Sitemap:** En el futuro, querrás tener un sitemap en el subdominio que liste tus artículos.
*   **Canonical Tags:** Asegúrate de que cada artículo tenga su etiqueta canonical apuntando a sí mismo `https://insights.authomia.cloud/slug-del-articulo`.
*   **Analytics:** Si usas Google Analytics, puedes usar la misma propiedad o crear una vista separada para el subdominio.

## Resumen de Acción Inmediata

1.  [ ] Termina de pulir la página de Servicios y FAQs en el proyecto actual.
2.  [ ] Clona este proyecto en una nueva carpeta.
3.  [ ] Limpia el clon y deja solo la lógica de Publicaciones.
4.  [ ] Cambia los links del Navbar del clon para que apunten a `authomia.cloud`.
5.  [ ] Despliégalo en Vercel bajo `insights.authomia.cloud`.
6.  [ ] Vuelve al proyecto principal y cambia el link de "Publicaciones" para que apunte a `insights.authomia.cloud`.

¡Listo! Tendrás una arquitectura profesional, escalable y segmentada.
