Labelled single-line text field with brand focus ring, optional leading icon, helper and error text.

```jsx
<Input label="Nombre del evaluado" placeholder="Busca…" leadingIcon={<SearchIcon/>} />
<Input label="Email" type="email" error="Introduce un email válido." />
```
`error` flips it to the restrained danger state — use only for real validation failures.
