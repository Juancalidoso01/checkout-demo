import re
import json

with open('i18n.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'const translations = (\{.*?\});(?=\s*window\.I18N)', text, re.DOTALL)
if m:
    obj_str = m.group(1)
    obj_str = re.sub(r'//.*', '', obj_str)
    
    try:
        data = json.loads(obj_str)
        for lang in ['es', 'en', 'ru']:
            print(f"Checking {lang}:")
            has_ch = False
            for k, v in data[lang].items():
                if re.search(r'[\u4e00-\u9fff]', v):
                    has_ch = True
                    print(f"  {k}: {v}")
            if not has_ch:
                print("  No Chinese found.")
    except Exception as e:
        print("JSON parse error:", e)
else:
    print("Could not extract object")
