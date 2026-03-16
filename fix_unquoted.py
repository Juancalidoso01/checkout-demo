import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    text = f.read()

# quote things like `login_err_invalid: "` -> `"login_err_invalid": "`
new_text = re.sub(r'^\s*([a-zA-Z0-9_]+)\s*:', r'    "\1":', text, flags=re.MULTILINE)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

