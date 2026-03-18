# Napake in popravki na spletni strani

Tukaj je postopna razvrstitev vseh napak od najbolj pomembnih do najmanj pomembnih, glede na vpliv na funkcionalnost, varnost in standardizacijo.

---

### 🔴 1. Najbolj pomembne napake (vplivajo na varnost ali delovanje)

#### ❗ Neveljaven `http-equiv="X-Content-Type-Options"`
- **Kje**: Vrstica 6 (npr. v `index.html`)
- **Koda**:  
  ```html
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  ```
- **Zakaj je pomembno**:  
  Ta meta tag **ne deluje v HTML-ju** – `X-Content-Type-Options` je **HTTP glava**, ki jo mora strežnik poslati v odzivu. Če jo uporabiš v HTML, je brez učinka in lahko zavaja.
- **Popravek**:  
  Odstrani to vrstico iz HTML-ja in jo namesto tega nastavi na strežniku (npr. v `.htaccess`, Nginx, Node.js itd.).

#### ❗ CSS Parse Error (Sintaksa ni veljavna za CSS3)
- **Kje**: Vrstica 1118 v `style.css`
- **Koda**:  
  ```css
  *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  ```
- **Zakaj je pomembno**:  
  Gre za napako pri razčlenjevanju (Parse Error). Verjetno je problem z uporabo `*::after` ali z vrednostmi `!important` v tem specifičnem kontekstu, kar lahko prepreči pravilno nalaganje preostalega CSS-ja.
- **Popravek**:  
  Preveri sintakso in po potrebi odstrani ali popravi selektor/vrednosti.

---

### 🟠 2. Pomembne napake (vplivajo na pravilno prikazovanje na različnih napravah)

#### ❗ Manjkajoč `sizes` pri `srcset` z `w` opisnikom
- **Kje**: Vrstice 194, 195, 219, 220 (in druge)
- **Koda** (primer):
  ```html
  <img src="..." srcset="./images/family-white.png 520w" ...>
  ```
- **Zakaj je pomembno**:  
  Brez `sizes` brskalnik ne ve, kako velik slika naj bo na različnih zaslonih → lahko povzroči **slabo kakovost slik** ali **prevelike datoteke**.
- **Popravek**:  
  Dodaj `sizes` atribut, npr.:
  ```html
  sizes="(max-width: 520px) 100vw, 520px"
  ```

---

### 🟡 3. Manj pomembne napake (tehnično napačne, a ne vplivajo na delovanje)

#### ❗ `defer` na `type="module"` skriptah
- **Kje**: Vrstice 408–411 (npr. v `index.html`)
- **Koda** (primer):
  ```html
  <script type="module" src="./main.js" defer></script>
  ```
- **Zakaj je pomembno**:  
  Skripte z `type="module"` so že **samodejno odložene** – `defer` je odveč in povzroča napako po standardih.
- **Popravek**:  
  Preprosto odstrani `defer`:
  ```html
  <script type="module" src="./main.js"></script>
  ```

---

### ✅ Povzetek zaporedja popravkov

| Vrstni red | Napaka | Popravek |
|----------|--------|----------|
| 1 | `http-equiv="X-Content-Type-Options"` | Odstrani iz HTML, nastavi na strežniku |
| 2 | Manjkajoč `sizes` pri `srcset` | Dodaj `sizes` atribut |
| 3 | `defer` na `type="module"` | Odstrani `defer` |
| 4 | CSS Parse Error (`style.css`) | Popravi sintakso v vrstici 1118 |

---

### ⚠️ Opozorila (76)

- **CSS spremenljivke (`--variable`)**: Večina opozoril je zaradi spremenljivk, ki jih validator trenutno ne more statično preveriti.
- **Vendor-prefiksi**: Nekaj opozoril zaradi uporabe `-webkit-background-clip`, `-webkit-text-fill-color` itd.
- **Zastarele vrednosti**: Ena vrstica uporablja zastarelo vrednost `text` (vrstica 229).

---

### ⚡ Analiza GTmetrix Poročila

Stran ima **izjemno dobro zmogljivost** (Performance 100%, Structure 98%).

#### Glavne Ocene:

| Metrika | Rezultat | Ocena |
|---------|----------|-------|
| **Performance** | 100% | ✅ Odlično |
| **Structure** | 98% | ✅ Odlično |
| **L. Contentful Paint** | 515ms | ✅ Dobro |
| **T. Blocking Time** | 0ms | ✅ Odlično |
| **C. Layout Shift** | 0 | ✅ Odlično |

#### Kaj to pomeni:
- **100% Performance**: Stran se naloži izjemno hitro (604ms skupno).
- **0ms Blocking Time**: Brskalnik nikoli ni blokiran, stran je fluidna.
- **0 Layout Shift**: Elementi se ne premikajo med nalaganjem.

#### Problemi, ki jih je treba rešiti (Top Issues):

**🟡 Med-Low Prioriteta:**
1. **Efficient cache policy**: Podaljšaj čas hranjenja statičnih datotek (potencialni prihranek: 349KB).
2. **CDN (Content Delivery Network)**: Uporabi globalno omrežje za 9 virov.

**🟢 Low Prioriteta:**
- **Slike**: Pravilno prilagodi velikost slik (potencialni prihranek: 260KB).
- **JavaScript**: Zmanjšaj neuporabljen JS (prihranek: 78.1KB) in čas izvajanja (112ms).
- **Network Payloads**: Skupna velikost je 592KB (prizadevaj si za zmanjšanje).

#### Priporočila po prioritetah:
1. Nastavi **cache politiko** za statične datoteke.
2. Implementiraj **CDN** za zunanje vire.
3. **Optimiziraj slike** (dodatnih 260KB prihranka).
4. Zmanjšaj **neuporabljen JavaScript**.

**Skupni potencialni prihranki: ~687KB** (to bi lahko izboljšalo hitrost še za 10-15%).

---

### 🌐 Mreža in nalaganje (DevTools Network)

Povzetek ugotovitev iz razvojnih orodij brskalnika pri odpiranju strani.

#### Kaj pomenijo posamezni elementi:

| Element | Pomen |
|---------|-------|
| **Status 200** | Datoteka se je uspešno naložila |
| **Status 404** | Datoteka ni bila najdena (npr. `vite.svg`) |
| **Size** | Velikost datoteke |
| **Timeline** | Čas nalaganja posamezne datoteke |
| **Fully Loaded 604ms** | Skupni čas nalaganja strani |

#### Kaj je treba popraviti:

1. **🔴 vite.svg (404 napaka)**: Datoteka manjka. Treba jo je dodati v mapo ali odstraniti sklic iz kode.
2. **smart-city.webp (194 KB)**: Največja posamezna datoteka. Zmanjšaj velikost s stiskanjem ali uporabo manjše resolucije.
3. **Google Analytics (153 KB)**: Precejšnja poraba virov. Razmisli, ali je nujno potrebna.

#### Kako izboljšati (Povzetek):

- **Optimizacija slik**: Format `.webp` je super, ampak `smart-city.webp` potrebuje dodatno stiskanje.
- **Lazy loading**: Slike, ki niso vidne takoj, naloži s `loading="lazy"`.
- **Caching**: Nastavi predpomnjenje za statične datoke.
- **Minifikacija**: Zmanjšaj `style.css` in `main.js`.
- **Odprava 404**: Čas nalaganja (604ms) bi lahko z odpravo napak zmanjšal na ~400ms.

---

### 🔍 SEO Analiza in Metapodaki

Povzetek ugotovitev glede optimizacije za iskalnike (SEO).

#### Kritične napake:

- **Manjkajoči metapodatki**:
    - `Keywords`: Popolnoma manjkajo (dodaj: "pametni vodomer, upravljanje vode, IoT, NB-IoT").
    - `Author` & `Publisher`: Ni podatkov o avtorju ali izdajatelju.
    - `Robots`: Meta tag ni definiran (vpliva na indeksiranje).
- **Problemi s strukturo**:
    - **Title**: Prekratek (31 znakov, idealno 50-60). Predlog: "ARSS - Pametno upravljanje vode | Pametni vodomeri in IoT rešitve".
    - **Canonical URL**: Razlikuje se od glavnega URL-ja (potencialen problem za SEO).
- **Slike**:
    - ALT teksti so prisotni (super! ✓).
    - **TITLE atributi** so prazni (dodaj opisne naslove).

#### Priporočila za optimizacijo:

1. Dodaj **meta keywords** tag.
2. Izboljšaj in podaljšaj **title tag**.
3. Definiraj **robots meta tag** (`index, follow`).
4. Uskladi **canonical URL**.
5. Dodaj podatke o **avtorju in izdajatelju**.
6. Dodaj **TITLE atribute** vsem slikam.

---

### 📊 Lighthouse Analiza (Mobilno vs Namizno)

Primerjava rezultatov in identifikacija kritičnih problemov pri nalaganju.

#### 📈 Rezultati:

| Metrika | Mobilna (Slow 4G) | Namizna (Custom) | Razlika |
|---------|-------------------|------------------|---------|
| **Performance** | 88 | 84 | -4 |
| **Accessibility** | 100 | 100 | — |
| **Best Practices** | 96 | 96 | — |
| **SEO** | 100 | 100 | — |

#### 🔴 Kritični Problemi:

1. **Render Blocking Requests (~410 ms)**: CSS in JS blokirata začetni prikaz.
    - *Rešitev*: Odloži JS (`defer`/`async`), vstavi kritični CSS v `<head>`.
2. **Optimizacija Slik (203-281 KiB prihrankov)**:
    - `smart-city.webp`: Napačne dimenzije (1024x545 → 564x564).
    - `family-white.webp`: Napačne dimenzije (381x408 → 180x120).
    - `ARSS_logo2022.webp`: Prevelik (2150x2364 → 172x189).
3. **Cache Lifetime (348 KiB prihrankov)**: Predpomnjenje nastavljeno le na 10 min (priporočeno 1 leto).

#### 🟡 Opozorila:

- **Cumulative Layout Shift (CLS)**: 0.3 na mobilni (povzroča nalaganje Google Fonts).
    - *Rešitev*: Uporabi `font-display: swap`.
- **Minifikacija JS (92 KiB prihrankov)**: `xregexp-all.js`, `translate.js`, `utilities.js`.
- **Unused JavaScript (512 KiB prihrankov)**: Skripti iz razširitev (npr. `bubble_compiled.js`).

---

### 🔍 Dodatne ugotovitve (Avtomatski pregled)
- [ ] Preveri notranje povezave (`check_internal.py`)
- [ ] Preveri zunanje povezave (`check_links.py`)
- [ ] Preveri kodiranje šumnikov (`debug_encoding.py`)
