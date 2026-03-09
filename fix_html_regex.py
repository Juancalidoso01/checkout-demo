import re

def rewrite(path):
    with open(path, 'r') as f:
        html = f.read()

    # Cashout
    html = re.sub(r'(>)\s*Retiro de fondos\s*(<)', r'\1Retiro de fondos\2', html)
    html = html.replace('>Retiro de fondos<', ' data-i18n="cashout_title">Retiro de fondos<')
    
    html = re.sub(r'(>)\s*Fondos Disponibles\s*(<)', r'\1Fondos Disponibles\2', html)
    html = html.replace('>Fondos Disponibles<', ' data-i18n="cashout_available_funds">Fondos Disponibles<')

    html = re.sub(r'(>)\s*Monto a retirar\s*(<)', r'\1Monto a retirar\2', html)
    html = html.replace('>Monto a retirar<', ' data-i18n="cashout_withdraw">Monto a retirar<')

    html = re.sub(r'(>)\s*Transferir fondos a mi cuenta\s*(<)', r'\1Transferir fondos a mi cuenta\2', html)
    html = html.replace('>Transferir fondos a mi cuenta<', ' data-i18n="cashout_transfer_funds">Transferir fondos a mi cuenta<')

    html = re.sub(r'(>)\s*Cuenta Bancaria\s*(<)', r'\1Cuenta Bancaria\2', html)
    html = html.replace('>Cuenta Bancaria<', ' data-i18n="cashout_origin_account">Cuenta Bancaria<')

    html = re.sub(r'(>)\s*Banco de destino\s*(<)', r'\1Banco de destino\2', html)
    html = html.replace('>Banco de destino<', ' data-i18n="cashout_destination_account">Banco de destino<')

    with open(path, 'w') as f:
        f.write(html)

rewrite('agents/cashout.html')
