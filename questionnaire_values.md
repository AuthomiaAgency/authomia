# Valores del Cuestionario para Sincronización con Gmail (EmailJS)

Estos son los identificadores y valores que se envían a través de EmailJS. Asegúrate de que tu plantilla de correo en EmailJS utilice estas variables (ej. `{{fullName}}`, `{{email}}`, etc.).

## Variables de la Plantilla (Template Params)

| Variable | Descripción | Valores Posibles / Ejemplo |
| :--- | :--- | :--- |
| `fullName` | Nombre completo del cliente | "Juan Pérez" |
| `email` | Correo electrónico | "juan@empresa.com" |
| `phone` | Teléfono completo (código + número) | "+51 999 999 999" |
| `businessName` | Nombre del negocio o proyecto | "Mi Empresa S.A.C." |
| `clientType` | Tipo de cliente (Estado del proyecto) | "Empresa Activa" o "Nuevo Proyecto" |
| `industry` | Sector o Industria | Ver lista de industrias abajo |
| `message` | Mensaje o contexto adicional | Texto libre del usuario |
| `selectedPlan` | Plan seleccionado (o al que escaló) | "BLUE DIAMOND PRIME™" o "RED DIAMOND PRIME™" |
| `planDescription` | Descripción técnica del plan | "Diagnóstico estratégico integral (Sin implementación)" o "Diagnóstico + Implementación (Diagnóstico bonificado al 100%)" |
| `socialNetworks` | Lista de redes sociales | Texto con saltos de línea (ej. "• https://instagram.com/..." ) |
| `budgetRange` | Rango de presupuesto seleccionado | Ver lista de rangos abajo |
| `time` | Fecha y hora del envío | "10/25/2023, 10:30:00 AM" |

## Listas de Valores

### Industrias (`industry`)
- Agroindustria
- Alimentos & Bebidas
- Arquitectura & Construcción
- Automotriz
- Banca & Fintech
- Comercio Minorista (Retail)
- Comercio Mayorista
- Consultoría & Servicios
- E-commerce
- Educación
- Energía & Minería
- Entretenimiento & Medios
- Farmacéutica & Salud
- Gastronomía
- Hotelería & Turismo
- Inmobiliaria (Real Estate)
- Legal
- Logística & Transporte
- Manufactura
- Marketing & Publicidad
- SaaS / Tecnología
- Seguros
- Textil & Moda
- Otro

### Rangos de Presupuesto (`budgetRange`)

**Para Blue Diamond Prime™:**
- "$100 - $300 USD"
- "$300 - $600 USD"
- "+ $600 USD"

**Para Red Diamond Prime™:**
- "$800 - $1,500 USD"
- "$1,500 - $3,000 USD"
- "$3,000 - $5,000 USD"
- "+ $5,000 USD (Enterprise)"
