# UI kit · empat.IA 360 — Encuesta 270°/360°

Prototipo **móvil interactivo** de la encuesta de evaluación. El evaluador entra por
un **enlace con token** (p. ej. WhatsApp): **sin login y sin pedir su nombre**.

Abre `index.html`. Es autocontenido (React + Babel desde CDN, enlaza `../../styles.css`
y monta las primitivas desde `../../ds-preview.js`). La lógica de las 4 pantallas está
en `app.jsx`.

## Las 4 pantallas conectadas

1. **Entrada** — logo del cliente (*slot* white-label), invitación breve, caja
   destacada de **anonimato**, lista de **4 evaluaciones pendientes** con nombre y
   relación desde la perspectiva del evaluador («Tu jefa», «Tu par», «Te reporta»),
   estimación «unos 5 minutos por persona» y botón **Comenzar**.
2. **Pregunta** — header compacto (persona + relación), **progreso doble** (evaluación
   1 de 4 + pregunta 7 de 24), etiqueta de competencia, la pregunta y una **escala 1–5
   de círculos táctiles grandes** con extremos «Nunca / Siempre». Al tocar un número
   **avanza sola** a la siguiente pregunta (sin botón siguiente); link discreto
   **«Anterior»**.
3. **Comentario** — al terminar las 24 preguntas. «Para terminar: una idea concreta
   para [nombre]», subtítulo empezar/dejar/seguir, textarea con *placeholder* que
   modela una respuesta útil, nota de anonimato, primario **«Enviar evaluación»** y
   secundario discreto **«Enviar sin comentario»**.
4. **Transición** — check de confirmación, «Te quedan 3 de 4», progreso de la cola,
   tarjeta con la **siguiente persona ya cargada**, botón **«Continuar»** y link
   **«Terminar más tarde»** (abre un diálogo con la nota de retomar con el mismo enlace).

## Flujo / máquina de estados
`welcome → question (×24, auto-avance) → comment → transition → (siguiente evaluación)`.
Al completar las 4, la pantalla de transición muestra el estado final «¡Has terminado!».

## Notas
- La **escala de círculos** es un tratamiento específico de esta encuesta; la primitiva
  de sistema equivalente es `RatingScale` (celdas rectangulares) para formularios
  internos.
- El logo «Northwind» es de muestra: sustitúyelo por el del cliente.
- Datos (personas, competencias, preguntas) son de ejemplo, dentro de `app.jsx`.
