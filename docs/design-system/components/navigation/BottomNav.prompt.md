Mobile tab bar for the manager/admin side. Active item uses the brand colour. Icon-agnostic.

```jsx
<BottomNav value="inicio" onChange={setTab} items={[
  {value:'inicio', label:'Inicio', icon:<HomeIcon/>},
  {value:'equipo', label:'Equipo', icon:<UsersIcon/>},
]} />
```
