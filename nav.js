/**
 * nav.js - Centralizirana navigacija za ARSS spletno stran
 * 
 * Uporaba: V vsaki HTML datoteki zamenjaj <header> z:
 *   <div id="nav-placeholder"></div>
 * in dodaj <script src="./nav.js"></script> pred ostale skripte.
 */

(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Določi, katera stran je aktivna
  function isActive(page) {
    // Podstrani industrije (merjenje, komunikacija, programska-oprema) spadajo pod "Industrija"
    const industrijaPages = ['industrija.html', 'komunikacija.html', 'programska-oprema.html',
      'referenca-komunala.html', 'referenca-vecstanovanjski.html'];

    if (page === 'index.html') {
      return currentPage === 'index.html' || currentPage === '' || currentPage === '/';
    }
    if (page === 'gospodinjstva.html') {
      return currentPage === 'gospodinjstva.html';
    }
    if (page === 'industrija.html') {
      return industrijaPages.includes(currentPage);
    }
    return false;
  }

  const navHTML = `
    <header class="header">
      <div class="container nav-container">
        <a href="index.html" class="logo" title="ARSS - Domov">
          <img src="./images/ARSS_logo2022.webp" alt="ARSS Logo" width="86" height="95" title="/">
        </a>
        <button class="mobile-menu-btn" aria-label="Odpri meni">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        <nav class="nav-links">
          <a href="index.html" class="nav-link${isActive('index.html') ? ' active' : ''}" title="Domov">Domov</a>

          <div class="dropdown">
            <a href="gospodinjstva.html" class="nav-link${isActive('gospodinjstva.html') ? ' active' : ''}" title="Za gospodinjstva - pametni vodomeri">Gospodinjstva ▾</a>
            <div class="dropdown-content">
              <a href="gospodinjstva.html#features" title="Prednosti za gospodinjstva">Prednosti</a>
              <a href="gospodinjstva.html#how-it-works" title="Kako deluje - gospodinjstva">Kako deluje</a>

              <a href="gospodinjstva.html#faq" title="Pogosta vprašanja - gospodinjstva">Pogosta vprašanja</a>
            </div>
          </div>

          <div class="dropdown">
            <a href="industrija.html" class="nav-link${isActive('industrija.html') ? ' active' : ''}" title="Za industrijo in vodovode">Industrija ▾</a>
            <div class="dropdown-content">

              <a href="komunikacija.html" title="Komunikacijske rešitve">Komunikacija</a>
              <a href="programska-oprema.html" title="AURA Platforma">AURA Platforma</a>
              <a href="industrija.html#references" title="Reference">Reference</a>

            </div>
          </div>

          <a href="index.html#about" class="nav-link" title="Pojdi na sekcijo O nas">O nas</a>
          <a href="index.html#contact" class="nav-link" title="Pojdi na kontaktni obrazec">Kontakt</a>
        </nav>
      </div>
    </header>
  `;

  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    placeholder.outerHTML = navHTML;
  }
})();
