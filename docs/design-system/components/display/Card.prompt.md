The primary content surface: warm white, `--radius-lg`, hairline border, whisper of shadow.

```jsx
<Card interactive onClick={open}>
  <h3>Ciclo Q2 2026</h3>
  <p>8 de 12 evaluaciones completadas</p>
</Card>
```
`interactive` adds a gentle hover lift for tappable cards. `padding` = none|sm|md|lg. Never add a heavy drop shadow — elevation reads through the border.
