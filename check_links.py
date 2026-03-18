import os
import re
import urllib.request
from urllib.error import URLError, HTTPError
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

directory = '/home/jakahrovat/Dokumenti/nova spletna stran/spletna-stran-popravljena'
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

# Regex to find href and src
link_pattern = re.compile(r'(?:href|src)="([^"]+)"', re.IGNORECASE)

broken_internal = []
broken_external = []
checked_external = set()

for html_file in html_files:
    filepath = os.path.join(directory, html_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    links = link_pattern.findall(content)
    
    for link in links:
        # Ignore empty, tel:, mailto:
        if not link or link.startswith(('mailto:', 'tel:', 'javascript:')):
            continue
            
        # External links
        if link.startswith('http://') or link.startswith('https://'):
            if link not in checked_external:
                checked_external.add(link)
                try:
                    req = urllib.request.Request(link, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req, timeout=5) as response:
                        if response.status >= 400:
                            broken_external.append((html_file, link, response.status))
                except Exception as e:
                    broken_external.append((html_file, link, str(e)))
        
        # Internal links
        else:
            # Strip query params and fragments
            clean_link = link.split('#')[0].split('?')[0]
            if not clean_link: # It was just a hash eg. #about
                continue
                
            # If it's an absolute path that makes sense for local (like /vite.svg), we skip or check against root
            if clean_link.startswith('/'):
                # Treat / as project root
                target_path = os.path.join(directory, clean_link.lstrip('/'))
            else:
                target_path = os.path.join(directory, clean_link)
                
            if not os.path.exists(target_path):
                broken_internal.append((html_file, link, target_path))

print("\n--- BROKEN INTERNAL LINKS ---")
if broken_internal:
    for f, l, t in broken_internal:
        print(f"File: {f} | Link: {l} | Path checked: {t}")
else:
    print("None found!")

print("\n--- BROKEN EXTERNAL LINKS ---")
if broken_external:
    for f, l, err in broken_external:
        print(f"File: {f} | Link: {l} | Error: {err}")
else:
    print("None found!")

