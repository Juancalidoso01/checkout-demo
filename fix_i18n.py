import json
import re

# Read current file
with open('i18n.js', 'r') as f:
    content = f.read()

# Try to extract the translations object using regex
match = re.search(r'const translations = (\{.*?\});\n\nwindow\.I18N', content, re.DOTALL)
if not match:
    # Try a looser match
    # find everything between "const translations =" and "window.I18N ="
    parts = content.split('window.I18N =')
    obj_str = parts[0].replace('const translations =', '').strip()
    if obj_str.endswith(';'):
        obj_str = obj_str[:-1].strip()
else:
    obj_str = match.group(1)

# We can't parse JS object easily in python, so let's just use node to output JSON?
# wait, node isn't available.
pass
