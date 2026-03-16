import re

with open('i18n.js', 'r') as f:
    content = f.read()

# Make sure we add the iframe broadcast inside setLanguage
set_lang_code = """
      setLanguage: function(lang) {
        if (!this.dicts[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('pp_lang', lang);
        this.updateDOM();
        document.addEventListener('languageChanged', function(){})
        // Normal event
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
        
        // Broadcast to children iframes
        for (let i = 0; i < window.frames.length; i++) {
            try {
                window.frames[i].postMessage({ type: 'languageChanged', lang: lang }, '*');
            } catch(e) {}
        }
      },
"""

# Replace the existing setLanguage implementation
content = re.sub(r'setLanguage:\s*function\s*\(\w+\)\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', set_lang_code.strip() + ',', content, count=1, flags=re.MULTILINE|re.DOTALL)

with open('i18n.js', 'w') as f:
    f.write(content)

