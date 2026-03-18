import os
import re

directory = '/home/jakahrovat/Dokumenti/nova spletna stran/spletna-stran-popravljena'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

link_pattern = re.compile(r'(?:href|src)="([^"]+)"', re.IGNORECASE)

links_found = set()

for html_file in html_files:
    filepath = os.path.join(directory, html_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    links = link_pattern.findall(content)
    links_found.update(links)

with open('all_links_extracted.txt', 'w', encoding='utf-8') as f:
    for link in sorted(links_found):
        f.write(link + '\n')

print(f"Extracted {len(links_found)} unique links.")
