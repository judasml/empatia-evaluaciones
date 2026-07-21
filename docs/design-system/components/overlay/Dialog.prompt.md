Centred (or bottom-docked) modal over a scrim. Controlled via `open`.

```jsx
<Dialog open={open} onClose={close} dock="bottom"
  title="¿Terminar más tarde?"
  description="Puedes volver con el mismo enlace y retomar donde quedaste."
  footer={<><Button variant="ghost" onClick={close}>Cancelar</Button><Button onClick={leave}>Terminar</Button></>} />
```
