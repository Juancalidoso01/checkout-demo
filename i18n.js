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
    // 1. Revisar si el usuario ya escogió un idioma antes
    let savedLang = localStorage.getItem('pp_lang');
    
    // 2. Si no, detectamos el del sistema
    if (!savedLang) {
      const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2).toLowerCase();
      // Validar si soportamos ese idioma (es, en, ru)
      if (['es', 'en', 'ru'].includes(browserLang)) {
        savedLang = browserLang;
      } else {
        savedLang = 'es'; // Fallback a Español
      }
    }
    this.setLanguage(savedLang);
  },

  setLanguage: function(lang) {
    this.currentLang = lang;
    localStorage.setItem('pp_lang', lang);
    document.documentElement.lang = lang; // Actualiza la etiqueta <html>

    const dict = translations[lang] || translations['es'];

    // Buscar todos los elementos traducibles y reemplazarlos
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        // Soporte para placeholders en inputs si es necesario
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.hasAttribute('placeholder')) {
             el.placeholder = dict[key];
          }
        } 
        // Si tiene contenido HTML normal
        else {
          el.innerText = dict[key];
        }
      }
    });

    // Despachar un evento global por si otros scripts necesitan saber que el idioma cambió
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
  },
  
  getDict: function() {
      return translations[this.currentLang] || translations['es'];
  }
};

// Se autoejecuta al cargarse
document.addEventListener('DOMContentLoaded', () => {
    window.I18N.init();
});
