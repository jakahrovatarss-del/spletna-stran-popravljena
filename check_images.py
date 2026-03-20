from PIL import Image
import os
images=['images/ARSS_logo2022.webp','images/family-white.webp','images/smart-city.webp']
for p in images:
    full=os.path.join(os.getcwd(), p)
    with Image.open(full) as img:
        print(p, img.size, img.format, os.path.getsize(full))
