import re

def rewrite(path):
    with open(path, 'r') as f:
        html = f.read()

    # I accidentally added " <script src="../chat-widget.js"></script>" to w.document.write AGAIN. I made the same exact mistake as before! 
    # That's because my regex script used `content.replace('</body>', <script>)` and hit the inner HTML string.
    
    html = html.replace('w.document.write(`<html><head><title>Recibo</title></head><body>${content}  <script src="../chat-widget.js"></script>\n</body></html>`);',
                        'w.document.write(`<html><head><title>Recibo</title></head><body>${content}</body></html>`);')

    # Ensure it didn't break again, let's fix
    with open(path, 'w') as f:
        f.write(html)

rewrite('agents/recharge.html')
