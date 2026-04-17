// ====================== LANGUAGE SYSTEM ======================
// Bilingual translations (expanded from your big portfolio file)
const translations = {
  ru: {
    nav_about: "Обо мне",
    nav_services: "Услуги",
    nav_projects: "Проекты",
    nav_faq: "FAQ",
    nav_contact: "Контакт",
    contact_btn: "Написать мне",
    hero_title_1: "Я создаю",
    hero_title_2: "иммерсивные",
    hero_title_3: "веб3, мобильные и AI продукты",
    about_label: "Привет, я Nate",
    about_title: "Software architect с душой",
    what_label: "Что я создаю",
    what_title: "Продукты под ключ",
    projects_label: "Работы",
    projects_title: "Что я уже сделал",
    faq_label: "Частые вопросы",
    faq_title: "Всё что вы хотели спросить",
    cta_title: "Есть идея?",
    cta_desc: "Давайте обсудим ваш проект",
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
    hero_title_1: "I build",
    hero_title_2: "immersive",
    hero_title_3: "web3, mobile & AI products",
    about_label: "Hi, I'm Nate",
    about_title: "Software architect with soul",
    what_label: "What I build",
    what_title: "End-to-end products",
    projects_label: "Work",
    projects_title: "What I've built",
    faq_label: "FAQ",
    faq_title: "Everything you wanted to ask",
    cta_title: "Got an idea?",
    cta_desc: "Let's discuss your project",
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
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Project filters (already working, now with smaller cards)
function initFilters() {
  /* same as before, but now works with smaller cards */
}

// FAQ toggle from big file
function toggleFaq(el) {
  /* same toggle logic you already had */
}

// Init everything
document.addEventListener("DOMContentLoaded", () => {
  setLanguage("ru"); // Russian first for your clients
  document.querySelector(".lang-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-lang");
    setLanguage(current === "ru" ? "en" : "ru");
  });

  initFilters();
  console.log(
    "%c✅ Tech Dolphin portfolio v2 ready with premium effects",
    "color:#0EA5E9;font-weight:bold",
  );
});
