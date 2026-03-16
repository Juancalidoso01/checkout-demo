import re

with open('agents/cashout.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace innerHTML strings with i18n placeholders and span elements
content = content.replace("Procesando retiro...", "<span data-i18n=\\'cashout_processing\\'>Procesando retiro...</span>")
content = content.replace("¡Retiro completado!", "<span data-i18n=\\'cashout_completed\\'>¡Retiro completado!</span>")

content = content.replace("<i class=\\\"fas fa-check\\\"></i> Guardado", "<i class=\\\"fas fa-check\\\"></i> <span data-i18n=\\'cashout_saved\\'>Guardado</span>")
content = content.replace("<i class=\\\"fas fa-check\\\"></i> Vinculada", "<i class=\\\"fas fa-check\\\"></i> <span data-i18n=\\'cashout_linked\\'>Vinculada</span>")

# Also the event listener might need triggering to translate these JS generated texts
js_listener = """
      document.addEventListener('languageChanged', () => {
        if(window.I18N) window.I18N.updateDOM();
      });
"""
if "document.addEventListener('languageChanged'" not in content:
    content = content.replace("function loadState()", js_listener + "\n      function loadState()")

with open('agents/cashout.html', 'w', encoding='utf-8') as f:
    f.write(content)

