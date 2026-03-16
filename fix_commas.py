import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    text = f.read()

# I will find all occurrences of `"key": "value"\n\n\s*"key2"` where comma is missing.
# More generally, `"\s*\n+\s*"` between properties without a comma.
new_text = re.sub(r'("\s*)\n(\s*")', r'\1,\n\2', text)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

