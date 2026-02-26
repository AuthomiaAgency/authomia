# Estrategia de SEO Avanzado para Authomia Publications

Para posicionar a Authomia como una autoridad indiscutible en "Ingeniería de Inteligencia" y "Automatización Corporativa", la aplicación de publicaciones debe evolucionar de un simple blog a un motor de contenido semántico.

## 1. Arquitectura Técnica (Technical SEO)

### A. Renderizado & Velocidad (Core Web Vitals)
*   **SSG (Static Site Generation):** Migrar las publicaciones a una arquitectura estática (Next.js SSG o similar) donde el HTML se genera en el build time, no en el cliente. Esto es crucial para que Google indexe el contenido instantáneamente.
*   **Image Optimization:** Implementar `srcset` para servir imágenes en formato WebP y tamaños exactos según el dispositivo.
*   **Lazy Loading Inteligente:** Cargar imágenes y vídeos solo cuando entran en el viewport, pero mantener la imagen principal (LCP) con carga prioritaria (`eager`).

### B. Datos Estructurados (Schema Markup)
Implementar JSON-LD dinámico en cada artículo:
*   **`Article` Schema:** Definir claramente `headline`, `image`, `author`, `datePublished` y `dateModified`.
*   **`BreadcrumbList`:** Para que Google entienda la jerarquía (Inicio > Publicaciones > Grupo > Artículo).
*   **`FAQPage`:** Si el artículo tiene preguntas frecuentes, marcarlas para ganar rich snippets en los resultados de búsqueda.
*   **`Organization`:** Vincular cada post con la entidad "Authomia Agency".

### C. Estructura de URLs (Siloing)
Mantener una estructura jerárquica estricta:
*   `insights.authomia.cloud/` (Home del Blog)
*   `insights.authomia.cloud/[categoria]/` (Pilar de Contenido)
*   `insights.authomia.cloud/[categoria]/[slug-del-articulo]` (Cluster Content)
Esto refuerza la autoridad temática de cada sección.

## 2. Estrategia de Contenido (Semantic SEO)

### A. Topic Clusters (Pilares y Satélites)
En lugar de posts aleatorios, crear "Hubs" de contenido:
1.  **Página Pilar (The Ultimate Guide):** Un artículo de 3,000+ palabras sobre un tema amplio (ej. "Automatización con IA para Empresas").
2.  **Contenido Cluster:** Artículos específicos (ej. "Cómo automatizar facturación", "Chatbots para atención al cliente") que enlazan *hacia* la página pilar.
3.  **Interlinking:** El Manager debe sugerir enlaces internos automáticamente.

### B. Optimización de Entidades
Google ya no busca solo "keywords", busca "entidades".
*   Asegurar que términos como "RPA", "LLM", "Workflow Automation" estén definidos y conectados en el texto.
*   Crear un "Glosario Técnico" en una sección aparte y enlazar automáticamente las definiciones en los artículos.

### C. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
*   **Biografías de Autor Robustas:** Cada post debe tener una caja de autor con foto, cargo en Authomia y enlaces a LinkedIn/Twitter.
*   **Fuentes y Citas:** Enlazar a estudios externos de prestigio (Gartner, Forrester) para respaldar afirmaciones.
*   **Fecha de Actualización:** Mostrar "Última actualización" prominentemente para indicar frescura.

## 3. Experiencia de Usuario (UX Signals)

Google mide cómo interactúan los usuarios:
*   **Tabla de Contenidos Flotante:** Para artículos largos, permitir saltar a secciones específicas.
*   **Barra de Progreso de Lectura:** Una línea sutil en la parte superior que muestra cuánto falta.
*   **"Key Takeaways" al Inicio:** Un resumen de 3 puntos (TL;DR) para ejecutivos con poco tiempo.

## 4. Distribución & Social

*   **Open Graph Dinámico:** Generar imágenes de previsualización social (OG Images) automáticamente con el título del post y la marca de Authomia.
*   **Twitter Cards Large:** Para maximizar el espacio en el feed.

---

**Implementación Inmediata en el Manager:**
1.  Campo para `Meta Title` y `Meta Description` con contador de caracteres.
2.  Previsualización de cómo se verá en Google (SERP Preview).
3.  Checklist de SEO antes de publicar (¿Tiene H1? ¿Tiene enlaces internos? ¿Texto alt en imágenes?).
