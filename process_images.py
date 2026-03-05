import os
import re
import subprocess

directory = '/home/jakahrovat/Dokumenti/nova spletna stran/spletna-stran-popravljena'
img_dir = os.path.join(directory, 'images')

# 1. Convert all images in images directory and ARSS_logo2022 to webp
for filename in os.listdir(img_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')) and not filename.startswith('ARSS_logo2022'):
        base = os.path.splitext(filename)[0]
        webp_path = os.path.join(img_dir, f"{base}.webp")
        orig_path = os.path.join(img_dir, filename)
        if not os.path.exists(webp_path):
            subprocess.run(["cwebp", orig_path, "-o", webp_path], stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)

# Handle ARSS_logo2022 specifically
subprocess.run(["cwebp", os.path.join(img_dir, "ARSS_logo2022.png"), "-o", os.path.join(img_dir, "ARSS_logo2022.webp")], stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)

# 2. Update HTML files
html_files = [f for f in os.listdir(directory) if f.endswith('.html')]

img_regex = re.compile(r'<img\s+([^>]+)>', re.IGNORECASE)

alt_map = {
    'ARSS_logo2022.png': 'ARSS Logo',
    'ARSS_logo2022.webp': 'ARSS Logo',
    'family-white.png': 'Družina',
    'family-white.webp': 'Družina',
    'smart-city.png': 'Industrija',
    'smart-city.webp': 'Industrija'
}

def process_img_tag(match):
    attrs_str = match.group(1)
    
    # Extract existing attributes
    attr_matches = re.finditer(r'([a-zA-Z\-]+)="([^"]*)"', attrs_str)
    attrs = {}
    for am in attr_matches:
        attrs[am.group(1).lower()] = am.group(2)
    
    # Update src
    if 'src' in attrs:
        src = attrs['src']
        if 'ARSS_logo2022.png' in src:
            src = './images/ARSS_logo2022.webp'
        else:
            base, ext = os.path.splitext(src)
            if ext.lower() in ['.png', '.jpg', '.jpeg']:
                src = base + '.webp'
        attrs['src'] = src
        
    # Update srcset
    if 'srcset' in attrs:
        srcset = attrs['srcset']
        new_srcset = []
        for part in srcset.split(','):
            part = part.strip()
            if not part: continue
            parts = part.split(' ')
            url = parts[0]
            if 'ARSS_logo2022.png' in url:
                url = './images/ARSS_logo2022.webp'
            else:
                base, ext = os.path.splitext(url)
                if ext.lower() in ['.png', '.jpg', '.jpeg']:
                    url = base + '.webp'
            if len(parts) > 1:
                new_srcset.append(f"{url} {parts[1]}")
            else:
                new_srcset.append(url)
        attrs['srcset'] = ", ".join(new_srcset)
        
    # Set alt if needed based on the 3 specific files
    for key, val in alt_map.items():
        if 'src' in attrs and key in attrs['src']:
            attrs['alt'] = val
            break
            
    # Add title="/" to all images
    if 'title' not in attrs:
        attrs['title'] = '/'
        
    # Rebuild tag
    new_attrs_str = " ".join([f'{k}="{v}"' for k, v in attrs.items()])
    return f'<img {new_attrs_str}>'

for html_file in html_files:
    filepath = os.path.join(directory, html_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content = img_regex.sub(process_img_tag, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {html_file}")

print("Done")
