import re

def rewrite(path):
    with open(path, 'r') as f:
        html = f.read()

    # Recharge
    html = re.sub(r'(>)\s*Recargas y Pagos\s*(<)', r'\1Recargas y Pagos\2', html)
    html = html.replace('>Recargas y Pagos<', ' data-i18n="recharge_title">Recargas y Pagos<')

    html = re.sub(r'(>)\s*Recarga digital\s*(<)', r'\1Recarga digital\2', html)
    html = html.replace('>Recarga digital<', ' data-i18n="recharge_digital">Recarga digital<')

    with open(path, 'w') as f:
        f.write(html)

rewrite('agents/recharge.html')
