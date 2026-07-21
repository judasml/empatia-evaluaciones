---
name: empatia-360-design
description: Use this skill to generate well-branded interfaces and assets for empat.IA 360, a white-label HR SaaS product for 270°/360° evaluations, either for production or throwaway prototypes/mocks. Contains design guidelines, colors, type, fonts, assets and a UI kit for prototyping. UI copy is in Spanish, mobile-first.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

Key rules to internalize before designing:
- **White-label:** brand colour lives in a single token, `--brand`. Everything else is
  warm-neutral. The brand appears only in primary buttons, progress and success states.
- **Language:** all UI copy is in **Spanish**, **tú** (informal), sentence case.
- **Mobile-first**, warm and spacious (clay.com aesthetic): big friendly sans
  (Hanken Grotesk), soft corners, hairline borders, barely-there shadows.
- **Icons:** Lucide-style line icons, passed as nodes. No emoji.

If creating visual artifacts (mocks, throwaway prototypes, slides), copy assets out and
create static HTML files that link `styles.css` and mount primitives from `ds-preview.js`
(load React + Babel, transform with the **classic** JSX runtime — see any `*.card.html`
or `ui_kits/app/index.html` for the exact bootstrap). If working on production code, copy
assets and read the token files + component `.d.ts`/`.prompt.md` to design like an expert
in this brand.

If the user invokes this skill without other guidance, ask what they want to build,
ask a few focused questions, and act as an expert designer who outputs HTML artifacts or
production code depending on the need.
