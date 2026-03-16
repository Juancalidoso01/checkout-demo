with open('i18n.js', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    new_lines.append(line)
    if "localStorage.setItem('pp_lang', lang);" in line:
        new_lines.append("    // Emit message to child iframes\n")
        new_lines.append("    for(let i=0; i<window.frames.length; i++){\n")
        new_lines.append("      try { window.frames[i].postMessage({type: 'languageChanged', lang: lang}, '*'); } catch(e){}\n")
        new_lines.append("    }\n")

with open('i18n.js', 'w') as f:
    f.writelines(new_lines)
