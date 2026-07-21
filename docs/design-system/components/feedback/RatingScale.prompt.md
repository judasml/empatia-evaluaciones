The core 360 rating input — a 1–max Likert scale of large tappable cells with brand fill.

```jsx
<RatingScale max={5} lowLabel="Nunca" highLabel="Siempre" onChange={(n) => next(n)} />
<RatingScale max={5} allowNA lowLabel="En desarrollo" highLabel="Referente" />
```
Selecting a cell fills it and everything below it. In the survey flow, `onChange` auto-advances to the next question — no "next" button.
