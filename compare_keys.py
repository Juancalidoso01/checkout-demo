import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    text = f.read()

def get_keys_for_lang(lang):
    import re
    # Match from "lang": { up to the next }, or end of string
    pattern = r'"{}"\s*:\s*\{{([^}}]+)\}}'.format(lang)
    block_match = re.search(pattern, text, re.DOTALL)
    if not block_match:
        return set()
    block = block_match.group(1)
    # the keys look like: "key_name": "value",
    keys = set(re.findall(r'"([^"]+)"\s*:', block))
    return keys

es_keys = get_keys_for_lang('es')
zh_keys = get_keys_for_lang('zh')

missing_in_zh = es_keys - zh_keys
print("Total es_keys:", len(es_keys))
print("Total zh_keys:", len(zh_keys))
print("Missing in zh:", missing_in_zh)
