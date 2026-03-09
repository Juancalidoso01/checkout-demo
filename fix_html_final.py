import re

def rewrite(path):
    with open(path, 'r') as f:
        html = f.read()

    # Fix the typo I made earlier
    html = html.replace('</i data-i18n="cashout_origin_account">Cuenta Bancaria</button>', '</i><span data-i18n="cashout_origin_account">Cuenta Bancaria</span></button>')
    
    # Recharge - "Recargas y Pagos" doesn't strictly exist as a standalone h1 maybe?
    # but let's replace <span class="title">Factura</span> or other texts inside recharge if the user needs
    # Actually wait. Let's do it right. Let's search inside Recharge.
    
    with open(path, 'w') as f:
        f.write(html)

rewrite('agents/cashout.html')
