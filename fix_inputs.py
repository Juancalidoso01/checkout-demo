import re

with open('agents/recharge.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('data-i18n-ph="', 'data-i18n="')

with open('agents/recharge.html', 'w', encoding='utf-8') as f:
    f.write(content)
