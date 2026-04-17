/* =========================
   LANGUAGE TOGGLE (EN / RU)
========================= */

const translations = {
  en: {
    nav_who: "Who We Are",
    nav_what: "What We Do",
    nav_projects: "Projects",
    nav_services: "Services",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    view_all_projects: "View All Projects →",
    more_info: "More info",
    less_info: "Less info",
  },
  ru: {
    nav_who: "О нас",
    nav_what: "Что мы делаем",
    nav_projects: "Проекты",
    nav_services: "Услуги",
    nav_faq: "FAQ",
    nav_contact: "Контакты",
    view_all_projects: "Смотреть все проекты →",
    more_info: "Подробнее",
    less_info: "Скрыть",
  },
};

function setLanguage(lang) {
  localStorage.setItem("td_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = lang === "en" ? "RU" : "EN";
  }
}

function initLanguage() {
  const savedLang = localStorage.getItem("td_lang") || "en";
  setLanguage(savedLang);

  const toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentLang = localStorage.getItem("td_lang") || "en";
      const newLang = currentLang === "en" ? "ru" : "en";
      setLanguage(newLang);
    });
  }
}

/* =========================
   PROJECT FILTER (projects.html)
========================= */

function initProjectFilter() {
  const tabs = document.querySelectorAll(".ptab");
  const cards = document.querySelectorAll(".pcard");

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* =========================
   PROJECT TOGGLE (More Info)
========================= */

function initProjectToggles() {
  const buttons = document.querySelectorAll(".project-toggle");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const extra = btn.nextElementSibling;
      const lang = localStorage.getItem("td_lang") || "en";

      extra.classList.toggle("hidden");

      if (extra.classList.contains("hidden")) {
        btn.textContent = translations[lang]["more_info"];
      } else {
        btn.textContent = translations[lang]["less_info"];
      }
    });
  });
}

/* =========================
   INIT ALL
========================= */

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initProjectFilter();
  initProjectToggles();
});
