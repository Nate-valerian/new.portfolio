// Bilingual
const translations = {
  ru: {
    nav_about: "Обо мне",
    nav_services: "Услуги",
    nav_projects: "Проекты",
    nav_faq: "FAQ",
    nav_contact: "Контакт",
    contact_btn: "Написать",
    back_home: "← На главную",
    filter_all: "Все",
    filter_mobile: "Мобильные",
    filter_web: "Web / Web3",
    filter_ai: "AI",
  },
  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    contact_btn: "Get in touch",
    back_home: "← Back",
    filter_all: "All",
    filter_mobile: "Mobile",
    filter_web: "Web / Web3",
    filter_ai: "AI",
  },
};

function setLanguage(lang) {
  document.documentElement.setAttribute("data-lang", lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.querySelector(".lang-toggle").textContent =
    lang === "ru" ? "EN" : "RU";
}

// Smooth scroll + active nav
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Project filters
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document
        .querySelectorAll(".project-card, .feature-card")
        .forEach((card) => {
          card.style.display =
            filter === "all" || card.dataset.filter.includes(filter)
              ? "block"
              : "none";
        });
    });
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  setLanguage("ru"); // Russian default for your clients

  document.querySelector(".lang-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-lang");
    setLanguage(current === "ru" ? "en" : "ru");
  });

  initFilters();
  console.log("%c✅ Clean Tech Dolphin portfolio ready", "color:#0EA5E9");
});
