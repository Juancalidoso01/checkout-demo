import re

with open('chat-widget.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("if (window._ppChatWidgetInited || document.getElementById('pp-chat-widget')) return;", 
"""const existing = document.getElementById('pp-chat-widget');
    if (existing) existing.remove();
    window._ppChatWidgetInited = true;""")

with open('chat-widget.js', 'w', encoding='utf-8') as f:
    f.write(text)

