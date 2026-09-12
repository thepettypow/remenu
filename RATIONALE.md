# Rationale

- **Bottom sheet over full-screen navigation** for the details view — it's read-only with no checkout flow to protect, so a sheet preserves the diner's scroll position in the menu underneath and closes in one gesture, matching the pattern diners already know from delivery apps.
- **Nutrition modeled as per-portion data, not a scaled calculation** — real menus don't linearly scale macros with size. Switching the Regular/Large toggle swaps the entire nutrition block (calories, macros, micros, serving size) from a pre-defined data object rather than doing math on the frontend.
- **Micronutrients collapsed behind a disclosure** (Dietary Fiber, Sugars, Sodium) so the Nutrition Facts section leads with calories and the three core macros — the two things most diners actually scan for first — instead of reading like a spec sheet.
- **Dietary badges capped at 3 on the card with a "+2" overflow chip**, full tag list moved to the details view — keeps the card scannable in a scrolling list while still surfacing every tag once the diner taps in.
- **Sold-out cards have zero tap affordance** — chevron removed, price replaced with muted "Currently unavailable" text at the same position so the grid doesn't jump, and the whole card is non-interactive. There's no ordering flow to protect, but opening a details view for something you can't get is still a dead end worth cutting at the card.

## Files
- `index.html` / `styles.css` / `script.js` — working, interactive implementation (real toggle + disclosure logic, not just a static mock).
- `assets/02-food-card-available.png` — Food Card, available state, variant pricing ("From $14.00").
- `assets/03-food-card-sold-out.png` — Food Card, sold-out state.
- `assets/04-food-details-view.png` — Food Details View, default portion (Regular) selected, full description, ingredients, and complete Nutrition Facts (micronutrients expanded for the export; collapsed by default in the live interaction).
- `assets/01-food-card-list.png` — both card states together in a menu-list context, plus a third card demonstrating the 4+ badge overflow and single-portion (no "From") edge cases.

To view live: open `index.html` in a browser at a 375–390px viewport, or serve the folder locally (`python3 -m http.server`).
