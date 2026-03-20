import re
from pathlib import Path
files = [
    'index.html', 'komunikacija.html', 'industrija.html', 'programska-oprema.html',
    'gospodinjstva.html', 'referenca-komunala.html', 'referenca-vecstanovanjski.html'
]
for filename in files:
    path = Path(filename)
    text = path.read_text(encoding='utf-8')
    # Ensure base SEO meta tags
    if 'name="keywords"' not in text:
        text = re.sub(r'(\n\s*<meta name="description"[^>]*>\n)', '\1    <meta name="keywords" content="pametni vodomer, upravljanje vode, IoT, NB-IoT, ARSS">
', text, count=1)
    if 'name="author"' not in text:
        text = re.sub(r'(\n\s*<meta name="keywords"[^>]*>\n)', '\1    <meta name="author" content="ARSS">\n', text, count=1)
    if 'name="robots"' not in text:
        text = re.sub(r'(\n\s*<meta name="author"[^>]*>\n)', '\1    <meta name="robots" content="index, follow">\n', text, count=1)
    # Enhance title if short
    title_match = re.search(r'<title>(.*?)</title>', text)
    if title_match:
        title = title_match.group(1).strip()
        if len(title) < 45 and 'ARSS' in title:
            new_title = 'ARSS - Pametno upravljanje vode | Pametni vodomeri in IoT rešitve'
            text = text.replace(title_match.group(0), f'<title>{new_title}</title>')
    # set image title attributes for missing or placeholder
    def update_img(m):
        tag = m.group(0)
        alt = m.group('alt')
        title = m.group('title')
        if title and title.strip() not in ('', '/', None):
            return tag
        if alt:
            new_title = alt
        else:
            new_title = 'ARSS image'
        if 'title=' in tag:
            return re.sub(r'title="[^"]*"', f'title="{new_title}"', tag)
        else:
            return tag.replace('<img ', f'<img title="{new_title}" ', 1)
    text = re.sub(r'<img (?P<attrs>[^>]*?)>', lambda m: update_img(re.match(r'(<img (?P<attrs>[^>]*?)>)', m.group(0))), text)
    path.write_text(text, encoding='utf-8')
    print('updated', filename)
