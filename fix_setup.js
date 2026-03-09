const fs = require('fs');
let content = fs.readFileSync('setup.html', 'utf-8');

// The bottom of the file is currently mangled around the scripts
// Let's rewrite the bottom script section safely.

const scriptStart = content.indexOf('<script>\n    (function(){\n      try {\n        const session = window.PPAuth');

if (scriptStart !== -1) {
    const cleanBottom = `  <script>
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
            // Save preference
            localStorage.setItem('pp_lang', e.target.value);
            // Auto refresh completely
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
</html>`;
    content = content.substring(0, scriptStart) + cleanBottom;
    fs.writeFileSync('setup.html', content);
} else {
    console.log("Could not find the target to replace");
}
