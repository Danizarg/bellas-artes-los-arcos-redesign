# Bellas Artes Los Arcos — rediseño

Sitio web para **Bellas Artes Los Arcos**, tienda especialista en material de bellas artes en Marbella desde 1990.

> **Donde comienza la creatividad.**

Rediseño independiente del sitio original (`bellasarteslosarcos.webnode.es`). El dominio original no se toca ni se modifica.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 (configuración CSS-first en `app/globals.css`) |
| Animación | Motion (`motion/react`) |
| Imágenes | `next/image` con Unsplash CDN (`images.unsplash.com`) |
| Mapa | OpenStreetMap embed (sin clave de API) |

## Puesta en marcha

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

## Páginas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/nuestra-historia` | Nuestra historia |
| `/materiales` | Materiales de bellas artes |
| `/categorias` | Categorías de productos |
| `/inspiracion` | Inspiración |
| `/contacto` | Contacto |
| `/como-llegar` | Cómo llegar |

Más `sitemap.xml`, `robots.txt`, imagen Open Graph generada y página 404.

---

## Formulario de contacto

El formulario **solo envía directamente cuando hay un proveedor de correo configurado**. Sin configurar, no finge enviar nada: redacta el mensaje y lo abre en el programa de correo del visitante (`mailto:`), con el botón etiquetado «Redactar en mi correo».

Para activar el envío directo, defina estas variables en el proyecto de Vercel y vuelva a desplegar:

```
RESEND_API_KEY=re_xxxxxxxxxxxx      # clave de resend.com (obligatoria)
CONTACT_TO_EMAIL=...                # opcional; por defecto, el email de la tienda
CONTACT_FROM_EMAIL=...              # opcional; debe ser un dominio verificado en Resend
```

El endpoint es `app/api/contacto/route.ts`. Incluye validación, honeypot anti-bots y límites de longitud. Si no hay clave, responde `503` y el cliente recurre al `mailto:`.

> El valor se lee en tiempo de build, así que **añadir la variable requiere un nuevo despliegue** para que el formulario cambie de modo.

---

## Contenido: qué está verificado y qué es marcador de posición

Todo el contenido comercial sale del sitio original de la tienda o de los datos facilitados por la propiedad. **No se han inventado precios, marcas, stock, horarios ni testimonios.**

**Verificado** (en `lib/site.ts`):

- «Especialistas desde 1990» y «Su tienda de bellas artes en Marbella»
- Dirección: Calle Galveston 9, 29601 Marbella · Teléfono 952 86 05 54 · bellasarteslosarcos@gmail.com
- Las cinco categorías: Pintura, Dibujo y Rotuladores, Pinceles y Espátulas, Papeles, Lienzos y Soportes
- Gamas publicadas: Óleo, Acrílico, Acuarela, Pastel, Chalk Paint · Lápices, Cajas y sets de Lápices, Rotuladores
- Proceso de pedido: PayPal o transferencia, confirmación previa por teléfono/email, envío por Correos certificado con seguimiento
- Coordenadas y barrio (Barrio Alto / Divina Pastora) geocodificados con OpenStreetMap

**Marcadores de posición, señalados como tales en la propia web:**

- Pinceles y Espátulas, Papeles y Lienzos y Soportes no tienen gamas publicadas → se muestran como «Catálogo en preparación» / «Ficha en preparación»
- El horario de apertura no está publicado → la web invita a llamar en lugar de inventarlo
- La galería de obra de clientes en `/inspiracion` está vacía a propósito
- **Todas las fotografías son de archivo (Unsplash)** y están pensadas para sustituirse por fotos reales de la tienda

### Sustituir las fotografías

Las URLs están centralizadas en `lib/site.ts` (`imagery` y el campo `cover`/`gallery` de cada categoría). Para usar fotos propias, colóquelas en `public/` y cambie las rutas ahí; si deja de usar Unsplash puede quitar `remotePatterns` de `next.config.ts`.

### Añadir gamas a una categoría

En `lib/site.ts`, rellene `ranges` y ponga `catalogueReady: true`. La interfaz cambia sola de marcador de posición a fichas de producto.

---

## Accesibilidad y rendimiento

- Navegación por teclado completa, incluido el menú móvil (trampa de foco, `Escape`, `aria-expanded`)
- Enlace «Saltar al contenido»
- `prefers-reduced-motion` respetado en CSS y en Motion (`MotionConfig reducedMotion="user"`); el lienzo de pigmento dibuja un único fotograma estático
- El lienzo se detiene cuando sale de pantalla o la pestaña se oculta, y se dibuja a resolución reducida
- Hover y foco comparten estado en todas las interacciones, así que el teclado ve lo mismo que el ratón
- Sin JavaScript, un bloque `<noscript>` fuerza el estado final de las animaciones de entrada para que nada quede invisible
- Teléfono, email y rutas de mapas funcionan como enlaces nativos (`tel:`, `mailto:`, Google/Apple Maps)
