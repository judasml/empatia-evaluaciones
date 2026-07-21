Primary action control — use for the main action on a screen; only `variant="primary"` carries the brand colour.

```jsx
<Button variant="primary" size="lg" fullWidth onClick={submit}>Enviar evaluación</Button>
<Button variant="secondary">Guardar borrador</Button>
<Button variant="ghost" leadingIcon={<PlusIcon/>}>Añadir evaluador</Button>
```

Variants: `primary` (brand fill, one per screen), `secondary` (neutral outline), `ghost` (bare), `danger` (destructive, neutral outline + red text). Sizes `sm|md|lg` map to 36/44/52px height — never below 44px for a mobile primary. Pass icons as `leadingIcon`/`trailingIcon` nodes; the button is icon-library agnostic.
