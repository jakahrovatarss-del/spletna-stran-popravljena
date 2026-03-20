from PIL import Image
import os
sizes = {
    'images/ARSS_logo2022.webp': (172,189),
    'images/family-white.webp': (180,120),
    'images/smart-city.webp': (564,564),
}
for p, size in sizes.items():
    full = os.path.join(os.getcwd(), p)
    img = Image.open(full)
    img = img.convert('RGBA') if img.mode in ('P', 'RGBA', 'LA') else img.convert('RGB')
    img = img.resize(size, Image.LANCZOS)
    img.save(full, 'WEBP', quality=80, method=6)
    print('resized', p, 'to', size, 'new size', os.path.getsize(full))
