# ProductIcon

Set de íconos **multicolor propios del producto** para las acciones principales:
`crearEvaluacion`, `invitar`, `cobertura`, `resultados`, `importar`, `kim`.

## Cuándo usarlo (y cuándo no)

- **Sí:** tarjetas de acción principal (estilo Clay), cabeceras de sección de alto
  nivel, empty states, onboarding. Un ícono ancla una acción con personalidad.
- **No:** acciones secundarias, filas de tabla, botones pequeños, metadatos — ahí
  siguen los íconos de línea monocromos (Lucide-style, `stroke=currentColor`).
- Máximo 1 ProductIcon por tarjeta/sección. No competir con datos.

## Regla de color

La paleta (`PI_COLORS`: coral, amber, teal, indigo, plum, ink) es **fija del
producto** y convive con cualquier `--brand` del cliente. Nunca tintar estos
íconos con la marca ni derivarlos de ella.

## Uso

```jsx
<ProductIcon name="kim" size={40} tile />       // sobre teja redondeada
<ProductIcon name="resultados" size={28} />     // glifo suelto
```

`tile` añade fondo suave con el tinte del ícono, borde y sombra xs — el formato
de las tarjetas de acción. El glifo suelto es para cabeceras y espacios propios.
