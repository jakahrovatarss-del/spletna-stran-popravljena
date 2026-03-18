import os
import re

directory = '/home/jakahrovat/Dokumenti/nova spletna stran/spletna-stran-popravljena'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

link_pattern = re.compile(r'(?:href|src)="([^"]+)"', re.IGNORECASE)

broken_internal = []
external_links = set()

for html_file in html_files:
    filepath = os.path.join(directory, html_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    links = link_pattern.findall(content)
    
    for link in links:
        if not link or link.startswith(('mailto:', 'tel:', 'javascript:')):
            continue
            
        if link.startswith('http://') or link.startswith('https://'):
            external_links.add(link)
        else:
            clean_link = link.split('#')[0].split('?')[0]
            if not clean_link:
                continue
                
            if clean_link.startswith('/'):
                target_path = os.path.join(directory, clean_link.lstrip('/'))
            else:
                target_path = os.path.join(directory, clean_link)
                
            if not os.path.exists(target_path):
                broken_internal.append((html_file, link, target_path))

print("\n--- BROKEN INTERNAL LINKS ---")
if broken_internal:
    for f, l, t in broken_internal:
        print(f"File: {f} | Link: {l}")
else:
    print("None found!")

print("\n--- EXTERNAL LINKS ---")
for ext in sorted(external_links):
    print(ext)
