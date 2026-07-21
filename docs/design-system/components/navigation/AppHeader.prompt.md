Top bar with the white-label logo slot. Pass `logoSrc` for the client's logo; without it, `name` renders as a plain wordmark (never invent a mark).

```jsx
<AppHeader logoSrc="/uploads/client-logo.svg" logoAlt="Acme" right={<IconButton aria-label="Ayuda"><HelpIcon/></IconButton>} />
<AppHeader compact onBack={prev} person="Lucía Fernández" relation="Tu jefa" />
```
