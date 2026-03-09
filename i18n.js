const translations = {
  es: {
    "lang_es": "Español",
    "lang_en": "Inglés",
    "lang_ru": "Ruso",
"lang_zh": "Chino",
    "settings_title": "Ajustes",
    "settings_account": "Cuenta",
    "settings_security": "Seguridad",
    "settings_preferences": "Preferencias",
    "settings_legal": "Legal",
    "cashout_title": "Retiro de fondos",
    "cashout_available_funds": "Fondos Disponibles",
    "cashout_withdraw": "Monto a retirar",
    "cashout_transfer_funds": "Transferir fondos a mi cuenta",
    "cashout_origin_account": "Cuenta de origen",
    "cashout_destination_account": "Cuenta de destino",
    "recharge_title": "Recargas y Pagos",
    "recharge_digital": "Recarga digital"
  },
  en: {
    "lang_es": "Spanish",
    "lang_en": "English",
    "lang_ru": "Russian",
"lang_zh": "Chinese",
    "settings_title": "Settings",
    "settings_account": "Account",
    "settings_security": "Security",
    "settings_preferences": "Preferences",
    "settings_legal": "Legal",
    "cashout_title": "Withdraw funds",
    "cashout_available_funds": "Available Funds",
    "cashout_withdraw": "Amount to withdraw",
    "cashout_transfer_funds": "Transfer funds to my account",
    "cashout_origin_account": "Origin account",
    "cashout_destination_account": "Destination account",
    "recharge_title": "Top-ups & Payments",
    "recharge_digital": "Digital Recharge"
  },
  ru: {
    "lang_es": "Испанский",
    "lang_en": "Английский",
    "lang_ru": "Русский",
"lang_zh": "Китайский",
    "settings_title": "Настройки",
    "settings_account": "Аккаунт",
    "settings_security": "Безопасность",
    "settings_preferences": "Настройки",
    "settings_legal": "Правовая информация",
    "cashout_title": "Вывод средств",
    "cashout_available_funds": "Доступные средства",
    "cashout_withdraw": "Сумма для вывода",
    "cashout_transfer_funds": "Перевести средства на мой счет",
    "cashout_origin_account": "Очередной счет",
    "cashout_destination_account": "Счет назначения",
    "recharge_title": "Пополнения и Платежи",
    "recharge_digital": "Цифровой Перезарядка"
  },
  zh: {
    "lang_es": "西班牙语",
    "lang_en": "英语",
    "lang_ru": "俄语",
"lang_zh": "中文 (Chino)",
    "settings_title": "设置",
    "settings_account": "账户",
    "settings_security": "安全",
    "settings_preferences": "偏好设置",
    "settings_legal": "法律",
    "cashout_title": "提取资金",
    "cashout_available_funds": "可用资金",
    "cashout_withdraw": "提取金额",
    "cashout_transfer_funds": "将资金转入我的账户",
    "cashout_origin_account": "原账户",
    "cashout_destination_account": "目标账户",
    "recharge_title": "充值和付款",
    "recharge_digital": "数字充值"
  }
};

window.I18N = {
  currentLang: 'es', // Por defecto

  init: function() {
    let savedLang = localStorage.getItem('pp_lang');
    
    if (!savedLang) {
      const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2).toLowerCase();
      if (['es', 'en', 'ru', 'zh'].includes(browserLang)) {
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
