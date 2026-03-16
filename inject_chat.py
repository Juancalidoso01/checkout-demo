import re

def update_file(filename, js_path):
    with open(filename, 'r') as f:
        content = f.read()

    # Add chat script logic right before </body>
    if 'chat-widget.js' not in content:
        content = content.replace('</body>', f'  <script src="{js_path}"></script>\n</body>')

    with open(filename, 'w') as f:
        f.write(content)

update_file('agents/cashout.html', '../chat-widget.js')
update_file('agents/recharge.html', '../chat-widget.js')
update_file('setup.html', 'chat-widget.js')
update_file('index.html', 'chat-widget.js')
