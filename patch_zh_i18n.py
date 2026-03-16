import re

with open("i18n.js", "r", encoding="utf-8") as f:
    content = f.read()

# Dictionary to add
additions = {
    'es': """    login_err_invalid: "Usuario o contraseña inválidos.",
    login_err_disabled: "Usuario deshabilitado.",
    login_err_generic: "No fue posible iniciar sesión.",\n""",
    'zh': """    login_err_invalid: "用户名或密码无效。",
    login_err_disabled: "用户已禁用。",
    login_err_generic: "无法登录。",\n"""
}

for lang, extra in additions.items():
    pattern = r'("' + lang + r'": \{)'
    match = re.search(pattern, content)
    if match:
        idx = match.end()
        content = content[:idx] + "\n" + extra + content[idx:]
    else:
        print(f"Could not find {lang}")

with open("i18n.js", "w", encoding="utf-8") as f:
    f.write(content)

print("i18n.js patched successfully for zh and es!")
