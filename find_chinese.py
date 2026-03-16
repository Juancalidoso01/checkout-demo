import os
import re

def has_chinese(text):
    return bool(re.search(r'[\u4e00-\u9fff]', text))

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') or file == 'i18n.js':
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if path.endswith('i18n.js'):
                    # Check es, en, ru blocks
                    es = re.search(r'"es":\s*\{(.*?)\}', content, re.DOTALL)
                    en = re.search(r'"en":\s*\{(.*?)\}', content, re.DOTALL)
                    ru = re.search(r'"ru":\s*\{(.*?)\}', content, re.DOTALL)
                    if es and has_chinese(es.group(1)): print(f"Chinese in i18n.js -> es block")
                    if en and has_chinese(en.group(1)): print(f"Chinese in i18n.js -> en block")
                    if ru and has_chinese(ru.group(1)): print(f"Chinese in i18n.js -> ru block")
                else:
                    if has_chinese(content):
                        print(f"Chinese found in {path}")
