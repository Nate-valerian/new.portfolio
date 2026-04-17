const translations = {
  ru: {
    nav_about: "Обо мне",
    nav_services: "Услуги",
    nav_projects: "Проекты",
    nav_faq: "FAQ",
    nav_contact: "Контакт",
    contact_btn: "Написать мне",
    back_home: "← На главную",
    filter_all: "Все",
    filter_mobile: "Мобильные",
    filter_web: "Web/Web3",
    filter_ai: "AI",
  },
  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_projects: "Projects",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    contact_btn: "Get in touch",
    back_home: "← Back to home",
    filter_all: "All",
    filter_mobile: "Mobile",
    filter_web: "Web/Web3",
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

document.addEventListener("DOMContentLoaded", () => {
  setLanguage("ru");

  document.querySelector(".lang-toggle").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-lang");
    setLanguage(cur === "ru" ? "en" : "ru");
  });

  // Filters
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".project-card,.feature-card").forEach((c) => {
        c.style.display =
          f === "all" || c.dataset.filter.includes(f) ? "block" : "none";
      });
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
