import re

with open('i18n.js', 'r') as f:
    content = f.read()

# Append storage event listener to propagate language changes to all open tabs and iframes
listener_code = """
// Listen for cross-tab or cross-iframe language changes
window.addEventListener('storage', function(e) {
    if (e.key === 'pp_lang') {
        const newLang = e.newValue || 'es';
        if (window.I18N && window.I18N.currentLang !== newLang) {
            window.I18N.setLanguage(newLang);
        }
    }
});

// Also listen for postMessage from parent iframe (just in case they are different origins, though they are same origin here)
window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'languageChanged' && e.data.lang) {
        if (window.I18N && window.I18N.currentLang !== e.data.lang) {
            window.I18N.currentLang = e.data.lang;
            window.I18N.updateDOM();
        }
    }
});
"""

if "window.addEventListener('storage'" not in content:
    content += "\n" + listener_code

with open('i18n.js', 'w') as f:
    f.write(content)

