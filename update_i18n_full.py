import re

with open('i18n.js', 'r') as f:
    js = f.read()

def inject_dict(lang_code, new_keys):
    global js
    # Find the language block
    # regex matches: lang_code: { ... }
    # we will just do a simple string replace for the last known key for each block
    pass

# Wait, `i18n.js` is quite standardized right now. I can just build a completely new string for the whole translations object.
