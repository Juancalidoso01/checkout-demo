import re
import glob

# fix HTML files that literally contain `\'` instead of `'` or `"`
files = glob.glob('**/*.html', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # If it's a plain HTML file, `\'` shouldn't be there for attributes
    # E.g. data-i18n=\'key\' -> data-i18n="key"
    new_content = re.sub(r"data-i18n=\\'([^']+)\\'", r'data-i18n="\1"', content)
    
    # also check duplicate data-i18n="key" data-i18n="key"
    new_content = re.sub(r'(data-i18n="[^"]+")\s+\1', r'\1', new_content)

    if new_content != content:
        print(f"Fixed {file}")
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)

