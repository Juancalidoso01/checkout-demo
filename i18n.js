const translations = {
  es: {
    "lang_es": "Español",
    "lang_en": "Inglés",
    "lang_ru": "Ruso",
    "settings_title": "Ajustes",
    "settings_account": "Cuenta",
    "settings_security": "Seguridad",
    "settings_preferences": "Preferencias",
    "settings_legal": "Legal"
  },
  en: {
    "lang_es": "Spanish",
    "lang_en": "English",
    "lang_ru": "Russian",
    "settings_title": "Settings",
    "settings_account": "Account",
    "settings_security": "Security",
    "settings_preferences": "Preferences",
    "settings_legal": "Legal"
  },
  ru: {
    "lang_es": "Испанский",
    "lang_en": "Английский",
    "lang_ru": "Русский",
    "settings_title": "Настройки",
    "settings_account": "Аккаунт",
    "settings_security": "Безопасность",
    "settings_preferences": "Настройки",
    "settings_legal": "Правовая информация"
  }
};

window.I18N = {
  currentLang: 'es', // Por defecto

  init: function() {
    let savedLang = localStorage.getItem('pp_lang');
    
    if (!savedLang) {
      const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2).toLowerCase();
      if (['es', 'en', 'ru'].includes(browserLang)) {
        savedLang = browserLang;
      } else {
        savedLang = 'es';
      }
    }
    this.setLanguage(savedLang);
  },

  setLanguage: function(lang) {
    if (!translations[lang]) lang = 'es'; // Fallback
    console.log("I18N: Cambiando idioma a ->", lang);
    
    this.currentLang = lang;
    localStorage.setItem('pp_lang', lang);
    document.documentElement.lang = lang; 

    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
             el.placeholder = dict[key];
        } else {
          // Usamos innerHTML para mayor compatibilidad
          el.innerHTML = dict[key];
        }
      }
    });

    // Evento manual por si otros componentes necesitan percatarse
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
  },
  
  getDict: function() {
      return translations[this.currentLang] || translations['es'];
  }
};

// Autoinicialización robusta
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.I18N.init());
} else {
    window.I18N.init();
}
