# PRD — Restaurant Menu Design Challenge
**Two connected mobile components: Food Card + Food Details View**
Platform: Mobile Web, 375–390px viewport
Time box: 2–3 hrs

---

## 1. Objective

Ship two connected, production-credible mobile components that prove three things to the evaluator:

1. You can compress rich data (nutrition, ingredients, variants, allergens) into a scannable mobile layout without clutter.
2. Your component hierarchy and touch targets hold up on a real device width.
3. You handle edge states (sold out, variant pricing) as first-class design problems, not afterthoughts.

Don't over-invest in visual polish or motion. The brief explicitly deprioritizes pixel-perfection — spend the saved time on IA and edge cases, since that's what's graded.

---

## 2. Success Criteria (mapped to evaluation rubric)

| Rubric item | What "done" looks like here |
|---|---|
| Information Architecture | Nutrition + ingredients don't dump as walls of text. Micronutrients are demoted/collapsible. Ingredients are chips, not prose. |
| Component Design & Hierarchy | Clear type scale (title > price > body > label), 44pt+ touch targets, no ambiguous tap zones. |
| Handling Edge States | Sold-out card reads as "unavailable" in under 1 second, no dead-end taps. Variant pricing never implies a false single price. |

---

## 3. Platform & Constraints

- Viewport: design at 375px (iPhone SE/mini baseline), verify it doesn't break at 390px (iPhone 14/15 baseline). If you only have time for one, design at 375 — it's the tighter constraint.
- No native app chrome — this is mobile *web*, so no bottom tab bar, no system nav assumptions.
- No ordering logic. No "Add to Cart," no quantity stepper, no cart badge. The details view is read-only. Don't add a CTA bar out of habit — its absence is intentional and stated in the brief.
- Single dish focus. You are not designing the full menu list/category page — only the card (as it would appear in that list) and the detail view it opens into. Don't scope-creep into the menu index.

---

## 4. Information Architecture — Data Model

Design against a real schema, not loose content. This is what makes the nutrition-table decision (per-portion values) and the "From $X" pricing pattern legible as *system* thinking rather than one-off copy.

```
Dish {
  id: string
  title: string
  short_description: string        // card only, ~60–80 chars
  full_description: string         // details view, 2–4 sentences
  photo_url: string
  status: "available" | "sold_out"
  dietary_tags: ["vegetarian" | "vegan" | "spicy" | "gluten_free" | "dairy_free" | "nut_free"]
  allergens: string[]              // omit field entirely if empty — don't render "None"
  prep_time_min: number
  prep_time_max: number
  ingredients: string[]            // ordered by prominence, not alphabetical
  portions: Portion[]              // 1..n — card price = min(portions.price)
}

Portion {
  size_label: string               // e.g. "Regular", "Large"
  price: number
  serving_size_g: number
  nutrition: {
    calories_kcal: number
    protein_g: number
    carbs_g: number
    fat_g: number
    fiber_g: number
    sugars_g: number
    sodium_mg: number
  }
}
```

Key decision: nutrition is **per-portion data, not a scaled calculation**. Real menus don't linearly scale calories with size (a Large isn't just 1.4x a Regular in every macro). Each `Portion` carries its own nutrition object. When the size toggle changes in the details view, you swap the entire nutrition block — you don't do math on the frontend.

If a dish has only one portion, `portions` still has length 1 — the toggle UI simply doesn't render (see §7.2).

---

## 5. Component 1 — Food Card

### 5.1 Content (in this order, top to bottom)
1. Dish photo
2. Dietary badges (overlaid on photo, not in the content block below — saves vertical space)
3. Title
4. Short description (2-line clamp max)
5. Price row: "From $X.XX" + tap affordance

### 5.2 Layout spec
- Card: full width minus 16px side margins, 16px corner radius, 1px border or soft shadow (pick one, not both).
- Photo: 4:3 or 16:9, full card width, top corners match card radius, bottom corners square.
- Badges: small circular icon chips (🌶️ 🥬 🌾), top-left over the photo, subtle scrim/backdrop-blur behind them so they read on any photo. Cap at **3 visible**; if a dish has 4+, show 2 + a "+2" chip. Full list lives in the details view — the card doesn't need to be exhaustive.
- Content padding: 16px all sides below the photo.
- Title: 16px/22px semibold, single line, ellipsis-truncate — never wrap to a second line on the card.
- Description: 14px/20px, secondary text color, 2-line clamp with ellipsis.
- Bottom row: price left-aligned, chevron (›) right-aligned as the sole tap-affordance signal. Don't add a redundant "View details" label — the chevron plus the whole card being tappable is enough; extra copy is noise.

### 5.3 Pricing rule
- 2+ portions → **"From $[lowest price]"**, semibold, same visual weight regardless of variant count.
- 1 portion → plain price, no "From" prefix. Don't force the word "From" onto a single-price item — it implies variance that isn't there.

### 5.4 States

**Default / Available**
- Full color photo, full-opacity content, chevron visible, entire card is the tap target (don't shrink the tap zone to just the chevron).

**Sold Out**
- Photo: desaturate to grayscale + ~40% dark overlay.
- "SOLD OUT" pill, high-contrast, top-left of the photo (replaces the dietary badge position — don't stack both).
- Price row: replace price with muted "Currently unavailable" text, same position/weight as the price would occupy, so the grid doesn't jump.
- Chevron: removed. **Decision: sold-out cards are not tappable.** There's no ordering action to protect against, but tapping through to a detail view for an item you can't get is a dead end — cut it at the card.
- Overall card opacity or text color stepped down (~60% of default) so it visually recedes in a scrolling list without disappearing.

---

## 6. Component 2 — Food Details View

### 6.1 Format decision: **bottom sheet, not full-screen navigation**

Reasoning: this is a read-only info view with no checkout flow to protect, so a full route change adds friction for no benefit. A sheet preserves scroll position in the menu underneath, closes in one gesture, and matches the pattern diners already know from UberEats/DoorDash/Deliveroo item views. Use a full screen only if your tool of choice can't convincingly fake a sheet — don't burn time fighting the tool.

### 6.2 Content (top to bottom)
1. Drag handle + close (X) — top of sheet
2. Full-width photo
3. Title
4. Dietary/allergen tag row (horizontally scrollable chip row if it overflows)
5. Prep time inline (⏱ 15–20 mins)
6. Full description
7. Divider
8. Portion/size toggle
9. Divider
10. Ingredients (chips)
11. Divider
12. Nutrition Facts (core macros visible, micronutrients collapsed)

### 6.3 Portion/Size toggle
- Segmented control, pill-style, one segment per portion.
- **Show the price inside each segment** (e.g. "Regular $14" / "Large $19"), not just on the selected one. Diners scanning sizes want to compare prices without tapping through each option first.
- Default selection: the first/smallest portion.
- **If `portions.length === 1`, hide this entire section.** No toggle, no dead single-option control rendered for show.
- Changing the selection updates: the price shown in this section, the serving size line, and the entire Nutrition Facts block below it (see §4 — swap the data object, don't recalculate on the fly).

### 6.4 Ingredients
- Render as chips/tags in a wrapped row, not a bulleted paragraph. Chips scan faster and visually separate from body text.
- Order by prominence (hero ingredient first), not alphabetically.
- No icons needed here — this section's job is speed-scanning, not decoration.

### 6.5 Nutrition Facts — the core IA decision

This is the section most likely to get cluttered, so the hierarchy is:

**Always visible:**
- Section label: "Nutrition Facts — per [serving_size_g]g serving" (dynamically states the size, e.g. "per 320g serving")
- Calories: largest, boldest number on the sheet after the price — this is what people scan for first.
- Three core macros (Protein / Total Carbs / Total Fat) as a 3-column stat row, equal visual weight, value + unit only (skip %DV — out of scope, don't invent a daily-value baseline you can't source).

**Collapsed by default, disclosure-triggered:**
- Dietary Fiber, Sugars, Sodium — behind a "Show more nutrition details" text-link or chevron-disclosure row.
- This single move is what keeps the sheet from feeling like a spec sheet. Core macros answer "is this healthy for me," micronutrients answer a more specific question a subset of users have — treat them accordingly.

Re-state the "corresponds to active portion" rule here explicitly in your design (e.g. the section label already encodes the serving size, which does this silently and correctly).

---

## 7. Design System Guardrails

Use these as defaults so you're not making typography/color decisions mid-build — no brand was supplied, so pick a neutral system and stay consistent across both components.

**Type scale**
- Details title (H1): 22px/28px, bold
- Section labels (H2 — "INGREDIENTS", "NUTRITION FACTS"): 12–13px, semibold, uppercase, wide letter-spacing, muted color — these should read as labels, not content.
- Card title: 16px/22px, semibold
- Body/description: 14px/20px, regular
- Price: 16px/20px semibold in the details view; 15px on the card.
- Micro-labels (badges, chips, stat units): 11–12px, medium

**Color**
- Neutral base: warm off-white background, near-black ink text — avoid pure white/pure black, it reads clinical for a food product.
- One accent color, used only for price and the active state of the size toggle. Don't spread the accent across icons, dividers, and badges — it dilutes the one place it should draw the eye.
- Dietary badges: differentiate by icon + a distinct hue per category (e.g. green for vegetarian, warm red/orange for spicy, amber for gluten-free) so they're identifiable by shape+color at a glance, not by reading text.

**Touch targets**
- 44×44pt minimum on every interactive element: close button, each toggle segment, the whole card (trivially satisfied), any chip you make tappable.

---

## 8. Edge Cases Checklist

Explicitly design or explicitly decide "not applicable" for each — don't leave these implicit:

- [ ] Sold-out card (spec'd §5.4)
- [ ] Single-portion dish — no "From," no toggle (spec'd §5.3, §6.3)
- [ ] Dish title too long for one line — ellipsis-truncate, never wrap
- [ ] Image fails to load — solid-color placeholder with a simple fork/plate icon, never a broken-image glyph
- [ ] 4+ dietary badges — cap + overflow chip on the card, full list in details (spec'd §5.2)
- [ ] No allergens — omit the row, don't render "None"
- [ ] Long ingredient list — wraps to multiple chip rows, no horizontal scroll-jail
- [ ] Zero-value nutrition field (e.g. 0g sugar) — still shown as "0g," not hidden (hiding creates inconsistent rows across dishes and looks like a bug)

---

## 9. Sample Content (drop-in, so you don't burn time inventing copy)

**Dish A — used for Card (Available) + Details View**

```
title: "Margherita Pizza"
short_description: "San Marzano tomato, fresh mozzarella, basil, EVOO"
full_description: "A classic Neapolitan-style pizza with a slow-fermented dough,
San Marzano tomato sauce, fresh mozzarella di bufala, hand-torn basil, and a
finish of extra virgin olive oil. Baked at high heat for a lightly charred crust."
dietary_tags: [vegetarian]
allergens: [gluten, dairy]
prep_time: 12–15 mins
ingredients: [San Marzano tomatoes, Fresh mozzarella, Basil, Extra virgin olive oil, Sea salt]

portions:
  - Regular, $14.00, 280g
      calories: 580 kcal | protein: 24g | carbs: 68g | fat: 21g
      fiber: 3g | sugars: 6g | sodium: 890mg
  - Large, $19.00, 380g
      calories: 760 kcal | protein: 31g | carbs: 89g | fat: 27g
      fiber: 4g | sugars: 8g | sodium: 1120mg
```

**Dish B — used for Card (Sold Out state)**

```
title: "Diavola Pizza"
short_description: "Spicy salami, chili honey, mozzarella"
dietary_tags: [spicy]
status: sold_out
```

Card price for Dish A reads **"From $14.00"**; details view defaults to the Regular tab, serving size line reads "per 280g serving," and switching to Large swaps the whole nutrition block to the second data set above — that swap is the single most important interaction to nail for the "handling multi-option data" rubric line.

---

## 10. Deliverables Checklist

Match the submission requirements exactly — don't over- or under-deliver:

- [ ] Food Card — Available state, with variant price ("From $14.00") — PNG or PDF
- [ ] Food Card — Sold Out state — PNG or PDF
- [ ] Food Details View — default portion selected, showing full description, ingredients, and Nutrition Facts (core macros visible; micronutrients can be shown expanded in the export so the evaluator sees the full section, even though it's collapsed by default in the live interaction) — PNG or PDF
- [ ] (Optional) Figma link, view access enabled
- [ ] Written rationale — 3–5 bullets (draft below)

---

## 11. Rationale — Draft (edit to match your final visuals before submitting)

- Used a bottom sheet instead of full-screen navigation for the details view since it's read-only content with no checkout flow to protect — a sheet preserves the diner's place in the menu and closes in one gesture.
- Modeled nutrition as per-portion data rather than a client-side calculation, since real menus don't scale macros linearly with size — switching the size toggle swaps the entire nutrition block, not just the number.
- Capped visible dietary badges on the card at three with an overflow indicator, keeping the card scannable while still surfacing every tag in the details view.
- Collapsed dietary fiber, sugars, and sodium behind a disclosure in the Nutrition Facts section so the sheet leads with calories and core macros — the two data points most diners actually scan for first.
- Removed all tap affordance from sold-out cards rather than letting diners open a details view for an item they can't order — a shorter dead end is a better dead end.

---

## 12. Assumptions & Open Questions

- No brand guidelines were supplied — using a neutral warm-cream/ink palette with a single accent, consistent across both components. Swap for real brand tokens if this challenge is for a specific client.
- Currency assumed USD; format adapts trivially if not.
- Nutrition values are illustrative, not sourced from an actual recipe — fine for a design exercise, would need real data for production.
- Assuming diners are not logged in / no personalization (allergy filters, saved favorites) — out of scope per the brief.
