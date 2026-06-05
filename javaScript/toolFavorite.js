/**
 * toolFavorite.js
 * Injiziert einen schwebenden Heart-Button auf Tool-Seiten.
 * Synchronisiert Favoriten mit der Homepage via localStorage ("favoriten"-Key).
 * Einbinden: <script src="../../javaScript/toolFavorite.js"></script>
 */
(function () {

    // ── Filename → Tool-ID (muss mit index.js übereinstimmen) ──────────────
    const PAGE_TO_ID = {
        'zahlenAnalyse.html':      'card1',
        'zsystUmrechner.html':     'card2',
        'zsystRechner.html':       'card3',
        'einheitenUmrechner.html': 'card4',
        'prozentrechner.html':     'card5'
    };

    const filename = window.location.pathname.split('/').pop();
    const toolId   = PAGE_TO_ID[filename];
    if (!toolId) return;   // Unbekannte Seite → nichts tun

    // ── localStorage-Helfer ─────────────────────────────────────────────────
    function getFavoriten() {
        try { return JSON.parse(localStorage.getItem('favoriten') || '[]'); }
        catch { return []; }
    }

    function setFavoriten(arr) {
        localStorage.setItem('favoriten', JSON.stringify(arr));
    }

    // ── Heart-Button bauen (SVG, kein FontAwesome nötig) ───────────────────
    const btn = document.createElement('button');
    btn.className = 'tool-page-heart';
    btn.setAttribute('aria-label', 'Zu Favoriten hinzufügen');
    btn.innerHTML = `
        <svg class="heart-svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06
                   a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
                   1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span class="heart-tooltip-label"></span>
    `;
    document.body.appendChild(btn);

    // ── Zustand rendern ─────────────────────────────────────────────────────
    function render() {
        const isFav = getFavoriten().includes(toolId);
        btn.classList.toggle('is-active', isFav);
        btn.setAttribute('aria-label',
            isFav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen');
        btn.querySelector('.heart-tooltip-label').textContent =
            isFav ? 'Favorit' : 'Favorit?';
    }

    // ── Toggle bei Klick ────────────────────────────────────────────────────
    btn.addEventListener('click', () => {
        let favs = getFavoriten();
        const isFav = favs.includes(toolId);
        favs = isFav
            ? favs.filter(id => id !== toolId)
            : [...favs, toolId];
        setFavoriten(favs);
        render();
    });

    // ── Cross-Tab-Sync (z.B. Homepage in Tab 2 ändert State) ───────────────
    window.addEventListener('storage', (e) => {
        if (e.key === 'favoriten') render();
    });

    // ── Initial ─────────────────────────────────────────────────────────────
    render();

})();
