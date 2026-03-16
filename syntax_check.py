import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    text = f.readlines()

for i, line in enumerate(text):
    if '"en": {' in line:
        print(f"EN starting at line {i+1}")
    if '"ru": {' in line:
        print(f"RU starting at line {i+1}")
    if '"zh": {' in line:
        print(f"ZH starting at line {i+1}")
