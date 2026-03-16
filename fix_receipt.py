import re

def rewrite(path):
    with open(path, 'r') as f:
        html = f.read()

    # The buggy string injected inside w.document.write
    html = html.replace('w.document.write(`<html><head><title>Recibo</title></head><body>${content}  <script src="../i18n.js?v=2"></script>\n</body></html>`);', 
                        'w.document.write(`<html><head><title>Recibo</title></head><body>${content}</body></html>`);')

    with open(path, 'w') as f:
        f.write(html)

rewrite('agents/recharge.html')
