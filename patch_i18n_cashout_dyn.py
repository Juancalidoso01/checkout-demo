import re

with open('i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

es_vars = ['"cashout_processing": "Procesando retiro...",', '"cashout_completed": "¡Retiro completado!",', '"cashout_saved": "Guardado",', '"cashout_linked": "Vinculada",']
en_vars = ['"cashout_processing": "Processing withdrawal...",', '"cashout_completed": "Withdrawal completed!",', '"cashout_saved": "Saved",', '"cashout_linked": "Linked",']
zh_vars = ['"cashout_processing": "正在处理提款...",', '"cashout_completed": "提款完成！",', '"cashout_saved": "已保存",', '"cashout_linked": "已链接",']
ru_vars = ['"cashout_processing": "Обработка вывода...",', '"cashout_completed": "Вывод завершен!",', '"cashout_saved": "Сохранено",', '"cashout_linked": "Привязано",']

def insert_lang(code, block):
    global content
    lang_match = re.search(r'' + code + ':\s*\{([^}]*)\}', content)
    if lang_match:
        inner = lang_match.group(1)
        newlines = "\\n      " + "\\n      ".join(block) + "\\n      "
        new_inner = newlines + inner.strip()
        replaced = "  " + code + ": {\n      " + new_inner + "\n    }"
        content = content[:lang_match.start()] + replaced + content[lang_match.end():]

insert_lang('es', es_vars)
insert_lang('en', en_vars)
insert_lang('zh', zh_vars)
insert_lang('ru', ru_vars)

with open('i18n.js', 'w', encoding='utf-8') as f:
    f.write(content)
