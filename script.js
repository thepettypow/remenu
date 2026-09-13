// ---------------------------------------------------------------------------
// Data model — matches PRD §4 (Dish / Portion schema)
// ---------------------------------------------------------------------------

const BADGE_META = {
  vegetarian:  { emoji: "🥬", label: "Vegetarian",  cls: "veg" },
  vegan:       { emoji: "🌱", label: "Vegan",       cls: "veg" },
  spicy:       { emoji: "🌶️", label: "Spicy",       cls: "spicy" },
  gluten_free: { emoji: "🌾", label: "Gluten-Free", cls: "gf" },
  dairy_free:  { emoji: "🥛", label: "Dairy-Free",  cls: "gf" },
  nut_free:    { emoji: "🥜", label: "Nut-Free",    cls: "veg" },
};

const MENU = [
  {
    category: "Starters",
    dishes: [
      {
        id: "garlic-bread",
        title: "Garlic Bread with Whipped Ricotta",
        short_description: "Wood-fired sourdough, whipped ricotta, garlic confit",
        full_description: "Thick-cut sourdough grilled over the wood oven, brushed with garlic confit oil and finished with a smear of whipped ricotta and torn herbs. Served warm.",
        photo: "🥖",
        status: "available",
        dietary_tags: ["vegetarian"],
        allergens: ["gluten", "dairy"],
        prep_time_min: 8, prep_time_max: 10,
        ingredients: ["Sourdough", "Ricotta", "Garlic confit", "Extra virgin olive oil", "Chives"],
        portions: [
          { size_label: "Regular", price: 7.5, serving_size_g: 160,
            nutrition: { calories_kcal: 340, protein_g: 9, carbs_g: 38, fat_g: 16, fiber_g: 2, sugars_g: 2, sodium_mg: 520 } },
        ],
      },
      {
        id: "calamari",
        title: "Crispy Calamari",
        short_description: "Semolina-dusted, lemon aioli, chili flake",
        full_description: "Fresh squid rings dusted in seasoned semolina and flash-fried until golden, served with a bright lemon aioli and a scatter of chili flake for heat.",
        photo: "🦑",
        status: "available",
        dietary_tags: ["spicy"],
        allergens: ["shellfish", "gluten", "egg"],
        prep_time_min: 10, prep_time_max: 14,
        ingredients: ["Squid", "Semolina", "Lemon aioli", "Chili flake", "Parsley"],
        portions: [
          { size_label: "Regular", price: 11.0, serving_size_g: 210,
            nutrition: { calories_kcal: 420, protein_g: 22, carbs_g: 31, fat_g: 22, fiber_g: 1, sugars_g: 1, sodium_mg: 780 } },
        ],
      },
    ],
  },
  {
    category: "Pizza",
    dishes: [
      {
        id: "margherita",
        title: "Margherita Pizza",
        short_description: "San Marzano tomato, fresh mozzarella, basil, EVOO",
        full_description: "A classic Neapolitan-style pizza with a slow-fermented dough, San Marzano tomato sauce, fresh mozzarella di bufala, hand-torn basil, and a finish of extra virgin olive oil. Baked at high heat for a lightly charred crust.",
        photo: "🍕",
        status: "available",
        dietary_tags: ["vegetarian"],
        allergens: ["gluten", "dairy"],
        prep_time_min: 12, prep_time_max: 15,
        ingredients: ["San Marzano tomatoes", "Fresh mozzarella", "Basil", "Extra virgin olive oil", "Sea salt"],
        portions: [
          { size_label: "Regular", price: 14.0, serving_size_g: 280,
            nutrition: { calories_kcal: 580, protein_g: 24, carbs_g: 68, fat_g: 21, fiber_g: 3, sugars_g: 6, sodium_mg: 890 } },
          { size_label: "Large", price: 19.0, serving_size_g: 380,
            nutrition: { calories_kcal: 760, protein_g: 31, carbs_g: 89, fat_g: 27, fiber_g: 4, sugars_g: 8, sodium_mg: 1120 } },
        ],
      },
      {
        id: "diavola",
        title: "Diavola Pizza",
        short_description: "Spicy salami, chili honey, mozzarella",
        full_description: "San Marzano tomato base topped with spicy cured salami, fresh mozzarella, and a post-bake drizzle of chili honey for a sweet-heat finish.",
        photo: "🍕",
        status: "sold_out",
        dietary_tags: ["spicy"],
        allergens: ["gluten", "dairy"],
        prep_time_min: 12, prep_time_max: 15,
        ingredients: ["San Marzano tomatoes", "Spicy salami", "Fresh mozzarella", "Chili honey", "Oregano"],
        portions: [
          { size_label: "Regular", price: 15.0, serving_size_g: 290,
            nutrition: { calories_kcal: 640, protein_g: 27, carbs_g: 66, fat_g: 27, fiber_g: 3, sugars_g: 9, sodium_mg: 1180 } },
          { size_label: "Large", price: 20.0, serving_size_g: 390,
            nutrition: { calories_kcal: 840, protein_g: 35, carbs_g: 87, fat_g: 35, fiber_g: 4, sugars_g: 12, sodium_mg: 1480 } },
        ],
      },
      {
        id: "quattro-formaggi",
        title: "Quattro Formaggi",
        short_description: "Mozzarella, fontina, gorgonzola, parmesan",
        full_description: "A white pizza built on four cheeses — mozzarella, fontina, gorgonzola, and aged parmesan — baked until bubbling and finished with a crack of black pepper and honey.",
        photo: "🍕",
        status: "available",
        dietary_tags: ["vegetarian"],
        allergens: ["gluten", "dairy"],
        prep_time_min: 12, prep_time_max: 16,
        ingredients: ["Mozzarella", "Fontina", "Gorgonzola", "Parmesan", "Honey", "Black pepper"],
        portions: [
          { size_label: "Regular", price: 16.0, serving_size_g: 280,
            nutrition: { calories_kcal: 690, protein_g: 30, carbs_g: 62, fat_g: 34, fiber_g: 2, sugars_g: 5, sodium_mg: 1240 } },
          { size_label: "Large", price: 21.0, serving_size_g: 380,
            nutrition: { calories_kcal: 900, protein_g: 39, carbs_g: 81, fat_g: 44, fiber_g: 3, sugars_g: 7, sodium_mg: 1580 } },
        ],
      },
    ],
  },
  {
    category: "Mains",
    dishes: [
      {
        id: "salmon",
        title: "Grilled Salmon",
        short_description: "Charred lemon, asparagus, salsa verde",
        full_description: "Wild-caught salmon fillet grilled over open flame, served with charred lemon, blistered asparagus, and a bright herb salsa verde.",
        photo: "🐟",
        status: "available",
        dietary_tags: ["gluten_free", "dairy_free"],
        prep_time_min: 15, prep_time_max: 18,
        ingredients: ["Salmon fillet", "Asparagus", "Salsa verde", "Charred lemon", "Olive oil"],
        portions: [
          { size_label: "Regular", price: 22.0, serving_size_g: 320,
            nutrition: { calories_kcal: 480, protein_g: 38, carbs_g: 9, fat_g: 32, fiber_g: 3, sugars_g: 2, sodium_mg: 410 } },
          { size_label: "Large", price: 28.0, serving_size_g: 420,
            nutrition: { calories_kcal: 630, protein_g: 49, carbs_g: 12, fat_g: 42, fiber_g: 4, sugars_g: 3, sodium_mg: 540 } },
        ],
      },
      {
        id: "chicken-parm",
        title: "Chicken Parmigiana",
        short_description: "Breaded chicken, tomato, mozzarella, basil",
        full_description: "Breaded chicken breast fried until golden, layered with San Marzano tomato sauce and melted mozzarella, finished under the broiler with fresh basil. Served with a side of spaghetti.",
        photo: "🍗",
        status: "available",
        dietary_tags: [],
        allergens: ["gluten", "dairy", "egg"],
        prep_time_min: 18, prep_time_max: 22,
        ingredients: ["Chicken breast", "San Marzano tomatoes", "Mozzarella", "Parmesan", "Spaghetti", "Basil"],
        portions: [
          { size_label: "Regular", price: 19.0, serving_size_g: 380,
            nutrition: { calories_kcal: 720, protein_g: 46, carbs_g: 58, fat_g: 32, fiber_g: 4, sugars_g: 7, sodium_mg: 1350 } },
          { size_label: "Large", price: 24.0, serving_size_g: 480,
            nutrition: { calories_kcal: 910, protein_g: 58, carbs_g: 74, fat_g: 40, fiber_g: 5, sugars_g: 9, sodium_mg: 1680 } },
        ],
      },
      {
        id: "mushroom-risotto",
        title: "Wild Mushroom Risotto",
        short_description: "Porcini, thyme, aged parmesan",
        full_description: "Carnaroli rice slow-cooked with a wild mushroom and porcini stock, finished with aged parmesan, butter, and fresh thyme for a deeply savory, creamy risotto.",
        photo: "🍄",
        status: "sold_out",
        dietary_tags: ["vegetarian", "gluten_free"],
        allergens: ["dairy"],
        prep_time_min: 20, prep_time_max: 25,
        ingredients: ["Carnaroli rice", "Wild mushrooms", "Porcini stock", "Parmesan", "Thyme", "Butter"],
        portions: [
          { size_label: "Regular", price: 18.0, serving_size_g: 350,
            nutrition: { calories_kcal: 560, protein_g: 15, carbs_g: 74, fat_g: 21, fiber_g: 3, sugars_g: 3, sodium_mg: 780 } },
        ],
      },
    ],
  },
  {
    category: "Salads",
    dishes: [
      {
        id: "garden-bowl",
        title: "Garden Harvest Bowl With Roasted Seasonal Vegetables",
        short_description: "Quinoa, roasted vegetables, tahini dressing, toasted seeds",
        full_description: "A hearty bowl of quinoa and seasonal roasted vegetables tossed in a tahini dressing, topped with toasted seeds and fresh herbs. Naturally plant-based, gluten-free, and dairy-free.",
        photo: "🥗",
        status: "available",
        dietary_tags: ["vegetarian", "vegan", "gluten_free", "dairy_free"],
        prep_time_min: 10, prep_time_max: 13,
        ingredients: ["Quinoa", "Roasted seasonal vegetables", "Tahini dressing", "Toasted seeds", "Herbs"],
        portions: [
          { size_label: "Regular", price: 12.5, serving_size_g: 340,
            nutrition: { calories_kcal: 430, protein_g: 13, carbs_g: 52, fat_g: 19, fiber_g: 9, sugars_g: 8, sodium_mg: 460 } },
        ],
      },
      {
        id: "caesar",
        title: "Classic Caesar Salad",
        short_description: "Romaine, parmesan, garlic croutons, anchovy dressing",
        full_description: "Crisp romaine hearts tossed in a traditional anchovy Caesar dressing, topped with shaved parmesan and house-made garlic croutons.",
        photo: "🥬",
        status: "available",
        dietary_tags: ["vegetarian"],
        allergens: ["gluten", "dairy", "fish", "egg"],
        prep_time_min: 8, prep_time_max: 10,
        ingredients: ["Romaine lettuce", "Parmesan", "Garlic croutons", "Anchovy dressing"],
        portions: [
          { size_label: "Regular", price: 10.0, serving_size_g: 220,
            nutrition: { calories_kcal: 320, protein_g: 10, carbs_g: 18, fat_g: 23, fiber_g: 3, sugars_g: 3, sodium_mg: 640 } },
        ],
      },
    ],
  },
  {
    category: "Desserts",
    dishes: [
      {
        id: "tiramisu",
        title: "Tiramisu",
        short_description: "Espresso-soaked ladyfingers, mascarpone, cocoa",
        full_description: "Layers of espresso-soaked ladyfingers and whipped mascarpone cream, dusted with bittersweet cocoa. Made in-house daily.",
        photo: "🍰",
        status: "available",
        dietary_tags: ["vegetarian"],
        allergens: ["gluten", "dairy", "egg"],
        prep_time_min: 5, prep_time_max: 5,
        ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Cocoa powder", "Egg"],
        portions: [
          { size_label: "Regular", price: 8.5, serving_size_g: 150,
            nutrition: { calories_kcal: 420, protein_g: 7, carbs_g: 34, fat_g: 28, fiber_g: 1, sugars_g: 22, sodium_mg: 140 } },
        ],
      },
      {
        id: "lava-cake",
        title: "Chocolate Lava Cake",
        short_description: "Molten dark chocolate, vanilla gelato",
        full_description: "Warm dark chocolate cake with a molten center, served with a scoop of vanilla gelato and a dusting of powdered sugar.",
        photo: "🍫",
        status: "sold_out",
        dietary_tags: ["vegetarian"],
        allergens: ["gluten", "dairy", "egg"],
        prep_time_min: 12, prep_time_max: 15,
        ingredients: ["Dark chocolate", "Butter", "Eggs", "Flour", "Vanilla gelato"],
        portions: [
          { size_label: "Regular", price: 9.5, serving_size_g: 180,
            nutrition: { calories_kcal: 540, protein_g: 8, carbs_g: 58, fat_g: 31, fiber_g: 3, sugars_g: 42, sodium_mg: 210 } },
        ],
      },
    ],
  },
  {
    category: "Drinks",
    dishes: [
      {
        id: "lemonade",
        title: "Sparkling Rosemary Lemonade",
        short_description: "House-made, fresh rosemary, soda",
        full_description: "Fresh-squeezed lemonade infused with rosemary syrup and topped with soda water for a refreshing, herbaceous fizz.",
        photo: "🍋",
        status: "available",
        dietary_tags: ["vegan", "gluten_free", "dairy_free"],
        prep_time_min: 3, prep_time_max: 4,
        ingredients: ["Lemon juice", "Rosemary syrup", "Soda water"],
        portions: [
          { size_label: "Regular", price: 4.5, serving_size_g: 350,
            nutrition: { calories_kcal: 110, protein_g: 0, carbs_g: 28, fat_g: 0, fiber_g: 0, sugars_g: 26, sodium_mg: 10 } },
          { size_label: "Large", price: 6.0, serving_size_g: 470,
            nutrition: { calories_kcal: 150, protein_g: 0, carbs_g: 38, fat_g: 0, fiber_g: 0, sugars_g: 35, sodium_mg: 15 } },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MAX_VISIBLE_BADGES = 3;

function slug(str) {
  return "cat-" + str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function lowestPrice(dish) {
  return Math.min(...dish.portions.map((p) => p.price));
}

function fmtPrice(n) {
  return "$" + n.toFixed(2);
}

function badgeHtml(tagKey) {
  const meta = BADGE_META[tagKey];
  if (!meta) return "";
  return `<span class="badge badge-${meta.cls}" title="${meta.label}">${meta.emoji}</span>`;
}

// ---------------------------------------------------------------------------
// Render: category nav + card list
// ---------------------------------------------------------------------------

const navEl = document.getElementById("categoryNav");
const rootEl = document.getElementById("menuRoot");

function renderMenu() {
  const navHtml = MENU.map(
    (group, i) =>
      `<button class="category-tab${i === 0 ? " is-active" : ""}" data-target="${slug(group.category)}">${group.category}</button>`
  ).join("");
  navEl.innerHTML = navHtml;

  const sectionsHtml = MENU.map((group) => {
    const cardsHtml = group.dishes.map(cardHtml).join("");
    return `
      <section class="category-section" id="${slug(group.category)}">
        <h2 class="category-title">${group.category}</h2>
        <div class="card-list">${cardsHtml}</div>
      </section>
    `;
  }).join("");
  rootEl.innerHTML = sectionsHtml;

  // Wire nav scroll
  navEl.querySelectorAll(".category-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      navEl.querySelectorAll(".category-tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      document.getElementById(tab.dataset.target).scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Wire card taps
  rootEl.querySelectorAll(".food-card:not(.is-sold-out)").forEach((card) => {
    card.addEventListener("click", () => openSheet(card.dataset.dish));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openSheet(card.dataset.dish);
      }
    });
  });
}

function cardHtml(dish) {
  const isSoldOut = dish.status === "sold_out";
  const visibleTags = dish.dietary_tags.slice(0, MAX_VISIBLE_BADGES);
  const overflowCount = dish.dietary_tags.length - visibleTags.length;

  const badgesHtml = isSoldOut
    ? `<span class="soldout-pill">SOLD OUT</span>`
    : `<div class="badge-row">
        ${visibleTags.map(badgeHtml).join("")}
        ${overflowCount > 0 ? `<span class="badge-overflow" title="+${overflowCount} more">+${overflowCount}</span>` : ""}
      </div>`;

  const priceHtml = isSoldOut
    ? `<span class="card-price muted">Currently unavailable</span>`
    : dish.portions.length > 1
    ? `<span class="card-price"><span class="price-from">From</span> ${fmtPrice(lowestPrice(dish))}</span>`
    : `<span class="card-price">${fmtPrice(lowestPrice(dish))}</span>`;

  const chevronHtml = isSoldOut ? "" : `<span class="card-chevron" aria-hidden="true">›</span>`;

  return `
    <article class="food-card${isSoldOut ? " is-sold-out" : ""}" data-dish="${dish.id}"
      ${isSoldOut ? "" : 'tabindex="0" role="button"'}
      aria-label="${dish.title}${isSoldOut ? ", currently unavailable" : `, ${dish.portions.length > 1 ? "from " : ""}${fmtPrice(lowestPrice(dish))}, tap for details`}">
      <div class="card-photo">
        <div class="photo-fallback" aria-hidden="true">${dish.photo}</div>
        ${badgesHtml}
      </div>
      <div class="card-body">
        <h3 class="card-title">${dish.title}</h3>
        <p class="card-desc">${dish.short_description}</p>
        <div class="card-footer">
          ${priceHtml}
          ${chevronHtml}
        </div>
      </div>
    </article>
  `;
}

// ---------------------------------------------------------------------------
// Details sheet — populated per dish, portion state lives here
// ---------------------------------------------------------------------------

const sheet = document.getElementById("sheet");
const sheetScrim = document.getElementById("sheetScrim");
const sheetClose = document.getElementById("sheetClose");
const microToggle = document.getElementById("microToggle");
const microDetails = document.getElementById("microDetails");
const portionSection = document.getElementById("portionSection");
const portionDivider = document.getElementById("portionDivider");
const portionToggleEl = document.getElementById("portionToggle");

let activeDish = null;

function findDish(id) {
  for (const group of MENU) {
    const found = group.dishes.find((d) => d.id === id);
    if (found) return found;
  }
  return null;
}

function applyPortion(dish, index) {
  const p = dish.portions[index];
  document.getElementById("servingSize").textContent = p.serving_size_g;
  document.getElementById("calValue").textContent = p.nutrition.calories_kcal;
  document.getElementById("macroProtein").textContent = p.nutrition.protein_g + "g";
  document.getElementById("macroCarbs").textContent = p.nutrition.carbs_g + "g";
  document.getElementById("macroFat").textContent = p.nutrition.fat_g + "g";
  document.getElementById("microFiber").textContent = p.nutrition.fiber_g + "g";
  document.getElementById("microSugars").textContent = p.nutrition.sugars_g + "g";
  document.getElementById("microSodium").textContent = p.nutrition.sodium_mg + "mg";
}

function openSheet(dishId) {
  const dish = findDish(dishId);
  if (!dish) return;
  activeDish = dish;

  document.getElementById("sheetPhoto").innerHTML = `<div class="photo-fallback" aria-hidden="true">${dish.photo}</div>`;
  document.getElementById("sheetTitle").textContent = dish.title;
  document.getElementById("sheetDesc").textContent = dish.full_description;
  document.getElementById("sheetPrepTime").textContent = `⏱️ ${dish.prep_time_min}–${dish.prep_time_max} mins`;

  // Tags: dietary badges + allergens (allergen row omitted entirely if none, per PRD §8)
  const dietaryTagsHtml = dish.dietary_tags
    .map((key) => {
      const meta = BADGE_META[key];
      return `<span class="tag tag-${meta.cls}">${meta.emoji} ${meta.label}</span>`;
    })
    .join("");
  const allergenTagsHtml = (dish.allergens || [])
    .map((a) => `<span class="tag tag-allergen">Contains: ${a[0].toUpperCase()}${a.slice(1)}</span>`)
    .join("");
  document.getElementById("sheetTags").innerHTML = dietaryTagsHtml + allergenTagsHtml;

  // Ingredients
  document.getElementById("sheetIngredients").innerHTML = dish.ingredients
    .map((ing) => `<span class="chip">${ing}</span>`)
    .join("");

  // Portion toggle — hidden entirely for single-portion dishes (PRD §6.3)
  if (dish.portions.length > 1) {
    portionSection.style.display = "";
    portionDivider.style.display = "";
    portionToggleEl.innerHTML = dish.portions
      .map(
        (p, i) => `
        <button class="portion-seg${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-portion="${i}">
          <span class="portion-label">${p.size_label}</span><span class="portion-price">${fmtPrice(p.price)}</span>
        </button>`
      )
      .join("");
    portionToggleEl.querySelectorAll(".portion-seg").forEach((seg) => {
      seg.addEventListener("click", () => {
        portionToggleEl.querySelectorAll(".portion-seg").forEach((s) => {
          s.classList.remove("is-active");
          s.setAttribute("aria-selected", "false");
        });
        seg.classList.add("is-active");
        seg.setAttribute("aria-selected", "true");
        applyPortion(activeDish, Number(seg.dataset.portion));
      });
    });
  } else {
    portionSection.style.display = "none";
    portionDivider.style.display = "none";
    portionToggleEl.innerHTML = "";
  }

  // Reset micro-nutrient disclosure to collapsed on every open
  microDetails.classList.remove("is-open");
  microToggle.setAttribute("aria-expanded", "false");
  microToggle.querySelector("span").textContent = "Show more nutrition details";

  applyPortion(dish, 0);

  sheet.classList.add("is-open");
  sheetScrim.classList.add("is-visible");
  document.body.style.overflow = "hidden";
  sheet.querySelector(".sheet-scroll").scrollTop = 0;
}

function closeSheet() {
  sheet.classList.remove("is-open");
  sheetScrim.classList.remove("is-visible");
  document.body.style.overflow = "";
}

sheetClose.addEventListener("click", closeSheet);
sheetScrim.addEventListener("click", closeSheet);

microToggle.addEventListener("click", () => {
  const isOpen = microDetails.classList.toggle("is-open");
  microToggle.setAttribute("aria-expanded", String(isOpen));
  microToggle.querySelector("span").textContent = isOpen
    ? "Hide nutrition details"
    : "Show more nutrition details";
});

renderMenu();
