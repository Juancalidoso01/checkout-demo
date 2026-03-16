import re
import json

with open('i18n.js', 'r', encoding='utf-8') as f:
    text = f.read()

try:
    match = re.search(r'const translations = (\{.*?\});', text, re.DOTALL)
    if match:
        obj_str = match.group(1)
        # JS object keys might not be fully compliant JSON if they have trailing commas, let's just try to parse or eval
        # I'll manually check for common JS syntax errors
        import esprima # don't have
    else:
        print("Match failed")
except Exception as e:
    print(e)
