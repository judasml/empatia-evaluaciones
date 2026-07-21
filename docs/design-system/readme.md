# empat.IA 360 — Sistema de diseño

Sistema de diseño **white-label** para **empat.IA 360**, una app SaaS de RRHH para
evaluaciones 270°/360°. La interfaz es cálida, espaciosa y amable, pensada
**mobile-first** y **en español**. Cada cliente aplica su propia marca cambiando
**un solo token de color**; todo lo demás permanece neutro.

> **Referencia estética:** clay.com — fondos claros y cálidos, mucha respiración,
> tipografía sans grande y amable, bordes suaves y tarjetas con sombra mínima.

Este proyecto no partió de un código ni de un Figma existentes: se construyó desde
cero a partir del brief y la referencia estética. No se aportó ningún logotipo, así
que **no se ha creado ninguna marca**: donde iría el logo del cliente se reserva un
*slot* (ver `AppHeader`) y en las maquetas se usa un logotipo de muestra ficticio
(«Northwind»), claramente reemplazable.

---

## La regla white-label (lo más importante)

- El color de marca vive en **un único token**: `--brand` (placeholder `#4A5DA8`).
- Todas las variantes (`--brand-hover`, `--brand-strong`, `--brand-soft`,
  `--brand-border`, `--brand-ring`…) se derivan con `color-mix()`. Un cliente
  **solo sobrescribe `--brand`** (y opcionalmente `--brand-on` si necesita texto
  oscuro sobre su color).
- El color de marca aparece **solo** en: **botones primarios**, **indicadores de
  progreso** y **estados de éxito**. `--success` es un alias de `--brand`.
- **Todo lo demás es neutro** (grises cálidos). Error y aviso existen pero son
  discretos y se reservan para validaciones reales.
- El logo del cliente va en el *slot* de `AppHeader` (`logoSrc`); sin logo, se
  muestra el nombre en tipografía plana.

---

## CONTENT FUNDAMENTALS — cómo se escribe

- **Idioma:** español, en toda la UI. **Tuteo** («Tus respuestas», «¿Qué debería
  empezar a hacer?»). Cercano y respetuoso, nunca infantil.
- **Tono:** cálido, humano y tranquilizador. La app pide feedback honesto sobre
  personas, así que el copy reduce la ansiedad: recuerda el anonimato, estima el
  tiempo, agradece.
- **Persona:** se habla al evaluador de tú; a la persona evaluada se la nombra por
  su nombre de pila cuando aporta calidez («una idea concreta para Lucía»).
- **Mayúsculas:** *sentence case* en títulos y botones («Enviar evaluación», no
  «Enviar Evaluación»). Sólo el texto mono de etiquetas/eyebrows va en MAYÚSCULAS
  con *tracking* amplio («COMUNICACIÓN», «SIGUIENTE PERSONA»).
- **Números y datos:** en tipografía mono, discretos («7 de 24», «Evaluación 1 de 4»,
  «unos 5 minutos»). Nada de *data slop*: sólo cifras que orientan.
- **Emoji:** no se usan.
- **Microcopy de ejemplo:** «Tus respuestas son anónimas · Tu nombre no aparece en
  ningún reporte», «¿Qué debería empezar a hacer, dejar de hacer o seguir haciendo?»,
  «Puedes volver con el mismo enlace y retomar donde quedaste».
- **Escala Likert:** extremos con una sola palabra («Nunca» / «Siempre»,
  «En desarrollo» / «Referente»).

---

## VISUAL FOUNDATIONS

- **Color:** base de **grises cálidos** definidos en oklch (matices 65–75, croma muy
  bajo). Fondos entre crema (`--bg-page`) y blanco (`--surface`). El único color
  cromático en una pantalla por defecto es la marca. Ver `tokens/colors.css`.
- **Tipografía:** una sola sans humanista, **Hanken Grotesk**, hace casi todo el
  trabajo — grande, redondeada y amable. **JetBrains Mono** para etiquetas de datos,
  progreso y metadatos. Títulos en *semibold*/*bold* (no *black*): amables, no
  gritones. Escala mobile-first en `tokens/typography.css`.
- **Espaciado:** rejilla base 4px, **generosa por defecto** — la respiración es parte
  de la marca. `--gutter` (20px) es el margen lateral móvil. Ver `tokens/spacing.css`.
- **Fondos:** planos y cálidos. Un único gradiente radial muy sutil se permite como
  telón detrás del dispositivo en las maquetas. Sin texturas, patrones ni ilustración
  de fondo. Las imágenes reales (fotos de personas) van en `Avatar`.
- **Bordes:** *hairlines* cálidas (`--border-subtle`/`-default`). La elevación se lee
  ante todo por el **borde**, no por la sombra.
- **Sombras:** **casi imperceptibles**, tintadas en cálido y de baja opacidad. Nunca
  *drop shadows* fuertes. Ver `tokens/shadows.css`.
- **Esquinas:** suaves y generosas. Botones/inputs 12px, tarjetas 16px, hojas/paneles
  20–28px, píldoras y avatares totalmente redondeados.
- **Tarjetas:** superficie blanca, `--radius-lg`, borde *hairline* y un susurro de
  sombra (`--shadow-card`). En modo `interactive`, una leve elevación al pasar/tocar.
- **Movimiento:** tranquilo y rápido. Ease suave (`--ease-standard`), duraciones
  cortas (120/200/320ms), **sin rebotes**. Los rellenos de progreso se deslizan; las
  entradas hacen *fade + translate* de 6px. Ver `tokens/motion.css`.
- **Hover:** oscurece ligeramente el relleno de marca; en superficies neutras, un
  fondo `--surface-subtle`. **Press:** encoge al 0.98 (`--press-scale`).
- **Foco:** anillo de 3px tintado en marca (`--ring`) + borde `--brand`.
- **Transparencia/blur:** sólo el scrim del `Dialog` (`--overlay`, negro cálido al
  42%). Sin *glassmorphism*.

---

## ICONOGRAPHY

- **Sistema:** iconos de **línea (outline)**, trazo 2px, extremos y uniones
  redondeados (`stroke-linecap/linejoin="round"`), estilo cercano a **Lucide**.
- **Formato:** SVG en línea, `stroke="currentColor"` para que hereden el color del
  contexto (neutro casi siempre; marca sólo donde corresponde). Los componentes son
  **agnósticos de librería de iconos**: reciben el icono como *nodo* (`leadingIcon`,
  `icon`, `children`), así que puedes pasar Lucide, Heroicons o SVGs propios.
- **Recomendación:** usar **Lucide** vía CDN en consumidores
  (`https://unpkg.com/lucide-static`) o el paquete `lucide-react`. Las maquetas de este
  sistema dibujan los iconos que necesitan como SVG en línea con ese mismo estilo para
  no depender de la red. **No se usa emoji** ni caracteres unicode como iconos.
- **Assets:** no se aportaron iconos ni logotipos propios; por eso `assets/` no
  contiene binarios. Cuando el cliente entregue su logo, colócalo y pásalo a
  `AppHeader logoSrc`.

---

## Índice — qué hay aquí

- **`styles.css`** — punto de entrada; los consumidores enlazan **solo este archivo**.
- **`tokens/`** — variables CSS: `fonts.css`, `colors.css`, `typography.css`,
  `spacing.css`, `radius.css`, `shadows.css`, `motion.css`.
- **`components/`** — 21 primitivas React (inline-styled, sin dependencias):
  - `actions/` — **Button**, **IconButton**
  - `forms/` — **Input**, **Textarea**, **Select**, **Checkbox**, **Radio**, **Switch**
  - `display/` — **Card**, **Badge**, **Tag**, **Avatar**
  - `feedback/` — **ProgressBar**, **RatingScale**, **Toast**, **Tooltip**, **EmptyState**
  - `navigation/` — **AppHeader** (slot de logo white-label), **Tabs**, **BottomNav**
  - `overlay/` — **Dialog**
  - Cada carpeta incluye su `*.card.html` (galería de la pestaña *Design System*).
- **`guidelines/`** — tarjetas de especímenes (Colors, Type, Spacing, Brand).
- **`ui_kits/app/`** — **prototipo interactivo** de la encuesta 270°/360° (4 pantallas
  conectadas). Ver `ui_kits/app/README.md`.
- **`ds-preview.js`** — build de las primitivas para navegador (Babel), ensamblado
  desde `components/**`. Lo usan las tarjetas y el prototipo. **La fuente de verdad son
  los `.jsx` individuales.**
- **`SKILL.md`** — para usar este sistema como *skill* descargable.

### Adiciones intencionadas (no son primitivas «estándar»)
- **ProgressBar** y **RatingScale** — específicas del dominio 270°/360° (progreso y
  escala Likert de competencias).
- **Avatar** y **AppHeader** — el header integra el *slot* de logo white-label, pieza
  central del producto.

---

## Sustituciones a revisar (⚠ para el usuario)
- **Fuentes:** Hanken Grotesk + JetBrains Mono se cargan desde Google Fonts CDN. Si
  la marca tiene fuentes licenciadas, entrégalas y sustituimos las `@import` por
  `@font-face` locales en `tokens/fonts.css`.
- **Logo:** no se aportó; se usa un logo de muestra («Northwind»). Entrega el logo real
  del cliente para el *slot* de `AppHeader`.
