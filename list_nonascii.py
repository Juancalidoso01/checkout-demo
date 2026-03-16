import os
import re

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            path = os.path.join(root, file)
            if 'node_modules' in path or '.git' in path: continue
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                # Find characters above U+02B0 (avoids Latin, Latin-1, standard accents, etc)
                # Chinese is U+4E00 to U+9FFF. We can just test for Chinese directly.
                matches = set(re.findall(r'[\u4e00-\u9fff]', content))
                if matches:
                    if 'i18n.js' not in path and 'test.js' not in path:
                        print(f"Chinese found in {path}:", "".join(matches))
