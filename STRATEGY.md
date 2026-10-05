# Cornerstone Builds — Studio Strategy

## Eight decisions

1. **Customer:** Homebuyers and owners comparing units in new construction — want process transparency before talking to sales.
2. **5-second feel:** Blueprint industrial — steel blue, dashed borders, mono labels, construction film — not candlelit jewelry dark.
3. **Signature:** **Building → Floor → Unit** stepper on homepage + `/journey`, with walkthrough film and wireframe massing 3D.
4. **Journey:** Blueprint hero → orbit massing → stats → journey stepper → milestone reviews → **finish packages** shop → **/quote** (primary conversion) → success.
5. **Layout originality:** Drafting-table hero, dashed stat cells, amber accent on steel — avoids luxury condo render spam without navigation.
6. **Type & color:** Barlow Condensed + Source Sans 3; cool gray field, trust blue, safety amber — high contrast, readable specs.
7. **Motion & 3D:** Walkthrough loop in journey panel; floor-select on wireframe stack; reduced-motion hides orbit.
8. **Conversion hooks:** **FOUNDATION** consult code on quote; offer banner; Owner Portal AI; shop scopes as finish packages; quote form with finish tier.

## Stack & routes

Next.js **15.5.7**, Tailwind 3, TypeScript, Three.js massing.  
Routes: `/`, `/journey`, `/quote`, `/shop`, `/product/[id]`, `/about`, `/success` (+ cart/checkout/wishlist for package deposits demo).

## Signature (one line)

**Unit Journey stepper** — pick building, floor, and unit with film walkthrough and optional 3D massing orbit.
