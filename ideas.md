# Ideas de Diseño - Flaxnet IA Agency

## Concepto Elegido: Futurismo Tecnológico Minimalista

### Design Movement
**Futurismo Digital Corporativo** - Una fusión de minimalismo corporativo con elementos de ciencia ficción. Inspirado en interfaces de películas de ciencia ficción, diseño de agencias tech de vanguardia (como Vercel, Anthropic) y la estética de dashboards de IA.

### Core Principles
1. **Claridad Radical:** Cada elemento tiene un propósito. Jerarquía visual extremadamente clara, sin ruido visual.
2. **Movimiento Inteligente:** Las animaciones no son decorativas; revelan información, guían la atención, comunican estado.
3. **Contraste Dinámico:** Fondos oscuros (casi negros) con acentos de neón (cian, violeta, magenta) que evocan tecnología avanzada.
4. **Espacio Negativo Generoso:** Mucho espacio en blanco/negro para que los elementos respiren y destaquen.

### Color Philosophy
- **Fondo Base:** `#050505` (Negro profundo, casi vacío, como el espacio).
- **Primario:** `#00f2ff` (Cian eléctrico - energía, innovación, futuro).
- **Secundario:** `#7000ff` (Violeta intenso - creatividad, IA, transformación).
- **Acentos:** `#ff006e` (Magenta - urgencia, dinamismo).
- **Texto:** `#ffffff` (Blanco puro) y `#a0a0a0` (Gris suave para secundario).
- **Razonamiento:** Los colores neón sobre fondo oscuro evocan pantallas de terminal, interfaces de IA, y la sensación de "código vivo". Es profesional pero audaz.

### Layout Paradigm
- **Asimetría Inteligente:** No centrado. Usa grid 12 columnas con elementos que rompen la simetría.
- **Secciones Diagonales:** Divisores con ángulos (clip-path) para crear movimiento visual.
- **Flujo Vertical Dramático:** Las secciones se despliegan con animaciones de entrada que revelan contenido gradualmente.
- **Sidebar Flotante (en mobile):** Navegación que aparece desde el lateral.

### Signature Elements
1. **Líneas de Neón Animadas:** Bordes que se iluminan, líneas que trazan caminos. Comunican conexión y flujo de datos.
2. **Gradientes Direccionales:** Gradientes que van de oscuro a neón, sugiriendo energía fluyendo.
3. **Tarjetas Flotantes:** Elementos con sombras profundas que parecen flotar, con bordes sutilmente iluminados.

### Interaction Philosophy
- **Hover = Activación:** Al pasar sobre elementos, se iluminan, se expanden, revelan información.
- **Click = Transformación:** Los clics desencadenan animaciones suaves que transforman la interfaz.
- **Scroll = Revelación:** El scroll desencadena animaciones de entrada, parallax sutil, cambios de opacidad.

### Animation
- **Entrada:** Elementos aparecen con fade-in + slide-up suave (200-300ms).
- **Hover:** Cambio de color de neón + escala suave (1.05x) + sombra aumentada.
- **Transiciones:** Todas las transiciones son 200-400ms, usando `ease-out` para que se sientan ágiles.
- **Scroll Animations:** Elementos se revelan cuando entran en viewport con animaciones suaves.
- **Pulsación Sutil:** Elementos clave (CTA, números) tienen una pulsación suave infinita para atraer atención.

### Typography System
- **Display Font:** `Space Mono` (monoespaciado, futurista, para títulos principales).
- **Body Font:** `Inter` (limpio, legible, para cuerpo de texto).
- **Hierarchy:**
  - H1: Space Mono, 48px, 700, color cian.
  - H2: Space Mono, 32px, 700, color blanco.
  - H3: Inter, 24px, 600, color blanco.
  - Body: Inter, 16px, 400, color gris suave.
  - Small: Inter, 14px, 400, color gris más oscuro.

---

## Resumen para Desarrollo
Este diseño busca posicionar a Flaxnet como una agencia de IA de vanguardia, moderna y accesible. La estética futurista con colores neón comunica innovación, mientras que la claridad radical y el espacio generoso comunican profesionalismo y confianza. Las animaciones inteligentes hacen que la interfaz se sienta viva y responsiva, sin ser abrumadora.
