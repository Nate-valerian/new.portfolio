// ====================== LANGUAGE SYSTEM ======================
const translations = {
  ru: {
    nav_home: "Главная",
    nav_about: "Обо мне",
    nav_projects: "Проекты",
    nav_services: "Услуги",
    nav_faq: "FAQ",
    nav_contact: "Контакт",
    hero_title_1: "Я создаю",
    hero_title_2: "иммерсивные",
    hero_title_3: "веб3, мобильные и AI продукты",
    hero_desc:
      "От идеи до готового продукта за недели. Красиво, быстро, полезно.",
    contact_btn: "Написать мне",
    back_home: "← На главную",
    filter_all: "Все",
    filter_mobile: "Мобильные",
    filter_web: "Web / Web3",
    filter_ai: "AI",
    featured_badge: "Избранное",
    cta_title: "Готовы создать что-то крутое?",
    cta_desc: "Давайте обсудим ваш проект",
    cta_btn: "Написать",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_projects: "Projects",
    nav_services: "Services",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    hero_title_1: "I build",
    hero_title_2: "immersive",
    hero_title_3: "web3, mobile & AI products",
    hero_desc:
      "From idea to finished product in weeks. Beautiful, fast, actually useful.",
    contact_btn: "Get in touch",
    back_home: "← Back to home",
    filter_all: "All",
    filter_mobile: "Mobile",
    filter_web: "Web / Web3",
    filter_ai: "AI",
    featured_badge: "Featured",
    cta_title: "Ready to build something great?",
    cta_desc: "Let’s discuss your project",
    cta_btn: "Contact me",
  },
};

function setLanguage(lang) {
  document.documentElement.setAttribute("data-lang", lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  // Update lang toggle button
  const toggle = document.querySelector(".lang-toggle");
  if (toggle) toggle.textContent = lang === "ru" ? "EN" : "RU";
}

// ====================== PROJECT FILTERS ======================
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card, .feature-card");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block";
        } else {
          card.style.display = card.getAttribute("data-filter").includes(filter)
            ? "block"
            : "none";
        }
      });
    });
  });
}

// ====================== MOBILE NAV ======================
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
    });
  }
}

// ====================== INIT ======================
document.addEventListener("DOMContentLoaded", () => {
  // Default language = Russian
  setLanguage("ru");

  // Lang toggle
  const langBtn = document.querySelector(".lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-lang");
      setLanguage(current === "ru" ? "en" : "ru");
    });
  }

  initFilters();
  initNav();

  console.log(
    "%c✅ Tech Dolphin portfolio ready (bilingual)",
    "color:#0EA5E9; font-size:14px; font-weight:bold",
  );
});
