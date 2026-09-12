// Portion → nutrition data per PRD §4 (per-portion, not scaled)
const PORTIONS = [
  {
    label: "Regular",
    price: "$14.00",
    servingSize: 280,
    calories: 580,
    protein: "24g",
    carbs: "68g",
    fat: "21g",
    fiber: "3g",
    sugars: "6g",
    sodium: "890mg",
  },
  {
    label: "Large",
    price: "$19.00",
    servingSize: 380,
    calories: 760,
    protein: "31g",
    carbs: "89g",
    fat: "27g",
    fiber: "4g",
    sugars: "8g",
    sodium: "1120mg",
  },
];

const sheet = document.getElementById("sheet");
const sheetScrim = document.getElementById("sheetScrim");
const sheetClose = document.getElementById("sheetClose");

function openSheet() {
  sheet.classList.add("is-open");
  sheetScrim.classList.add("is-visible");
  document.body.style.overflow = "hidden";
}

function closeSheet() {
  sheet.classList.remove("is-open");
  sheetScrim.classList.remove("is-visible");
  document.body.style.overflow = "";
}

document.querySelectorAll(".food-card:not(.is-sold-out)").forEach((card) => {
  card.addEventListener("click", openSheet);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSheet();
    }
  });
});

sheetClose.addEventListener("click", closeSheet);
sheetScrim.addEventListener("click", closeSheet);

// Portion toggle — swaps the entire nutrition block, per PRD §6.3
const segs = document.querySelectorAll(".portion-seg");
segs.forEach((seg) => {
  seg.addEventListener("click", () => {
    segs.forEach((s) => {
      s.classList.remove("is-active");
      s.setAttribute("aria-selected", "false");
    });
    seg.classList.add("is-active");
    seg.setAttribute("aria-selected", "true");

    const data = PORTIONS[Number(seg.dataset.portion)];
    document.getElementById("servingSize").textContent = data.servingSize;
    document.getElementById("calValue").textContent = data.calories;
    document.getElementById("macroProtein").textContent = data.protein;
    document.getElementById("macroCarbs").textContent = data.carbs;
    document.getElementById("macroFat").textContent = data.fat;
    document.getElementById("microFiber").textContent = data.fiber;
    document.getElementById("microSugars").textContent = data.sugars;
    document.getElementById("microSodium").textContent = data.sodium;
  });
});

// Micronutrient disclosure — collapsed by default per PRD §6.5
const microToggle = document.getElementById("microToggle");
const microDetails = document.getElementById("microDetails");
microToggle.addEventListener("click", () => {
  const isOpen = microDetails.classList.toggle("is-open");
  microToggle.setAttribute("aria-expanded", String(isOpen));
  microToggle.querySelector("span").textContent = isOpen
    ? "Hide nutrition details"
    : "Show more nutrition details";
});
