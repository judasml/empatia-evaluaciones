# KimOrb

El orbe de KIM: esfera azul luminosa que **respira**. Es la única forma de
invocar a KIM — reemplaza a todo botón «Conversar con KIM».

## Reglas

- **Tamaño estándar 80px** cuando KIM es protagonista (ofertas de conversación,
  paneles de resultados). Etiqueta «KIM» al centro.
- **`floating` (44px)** en esquina inferior derecha cuando KIM está disponible
  pero no es protagonista. Máximo un orbe por pantalla.
- El azul (base `rgba(56,189,248)`) es **fijo del producto** — nunca se tinta
  con la marca del cliente.
- Estados: reposo respira en ciclo de 3s (`cubic-bezier(0.77,0,0.175,1)`);
  hover acelera y brilla; `active` (escribiendo) pulsa rápido. El anillo
  exterior pulsa desfasado media fase.
- Acompañarlo de texto contextual fuera del orbe si hace falta explicar la
  acción («Preguntarle a KIM sobre estos resultados»); el orbe solo dice KIM.

## Uso

```jsx
<KimOrb onClick={openKim} />                      // 80px, protagonista
<KimOrb size={64} active={typing} />              // en una barra de acciones
<KimOrb floating onClick={openKim} />             // mini 44px, esquina
```
