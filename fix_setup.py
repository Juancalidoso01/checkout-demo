import sys

with open('setup.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_idx = text.find('  <script>\n    (function(){\n      try {\n        const session = window.PPAuth')
if start_idx == -1:
    print("Could not find marker")
    sys.exit(1)

clean_bottom = """  <script>
    (function(){
      try {
        const session = window.PPAuth && window.PPAuth.requireAuth({ anyRole: ['agent','employee','superadmin'] });
        if (!session) return;
        window.PPAuth.renderSessionBadge({ selector: '[data-pp-session]' });
        window.PPAuth.ensureLogoutButton({ selector: '[data-pp-logout]' });
      } catch(e){ console.warn('Auth guard failed', e); }
    })();
  </script>

  <script>
    (function(){
      function setupLangSelector() {
        const langSel = document.getElementById('lang-selector');
        if (langSel && window.I18N) {
          langSel.value = window.I18N.currentLang;
          
          langSel.addEventListener('change', (e) => {
            console.log("Selector de idioma cambiado a:", e.target.value);
            // Guarda primero el valor
            localStorage.setItem('pp_lang', e.target.value);
            // Fuerza un recargo completo limpio de la web
            window.location.reload();
          });
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupLangSelector);
      } else {
        setupLangSelector();
      }
    })();
  </script>
</body>
</html>"""

new_text = text[:start_idx] + clean_bottom

with open('setup.html', 'w', encoding='utf-8') as f:
    f.write(new_text)
