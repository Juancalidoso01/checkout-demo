import re
import json

with open('i18n.js', 'r', encoding='utf-8') as f:
    text = f.read()

# find dicts object
try:
    # it's usually `const dicts = { ... };`
    match = re.search(r'const dicts = (\{.*\});?', text, re.DOTALL)
    if match:
        obj_str = match.group(1)
        # simplistic check: replace unquoted keys if any, mostly it's valid JSON
        # Let's just print the end of en and ru to see if there's a syntax error like trailing comma or missing brace.
        print("Found dicts length:", len(obj_str))
    else:
        print("Could not find dicts")
except Exception as e:
    print(e)
