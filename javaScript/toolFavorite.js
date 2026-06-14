/**
 * toolFavorite.js – Floating Heart Button auf Tool-Seiten
 *
 * Nutzt window.MV (aus common-login.js) für Login-Check und
 * Favoriten-Verwaltung -> exakt dieselbe Logik wie auf der Homepage.
 *
 * HTML: <script type="module" src="../../javaScript/toolFavorite.js"></script>
 */

import { tools } from './toolsCollection.js';

const filename = window.location.pathname.split('/').pop();
const toolData = tools.find(t => t.filename === filename);

if (toolData) init(toolData.id);

function init(toolId) {

    // ── Heart-Button bauen ──────────────────────────────────────────────────
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
        const loggedIn = window.MV.isLoggedIn();
        const isFav    = loggedIn && window.MV.getFavorites().includes(toolId);

        btn.classList.toggle('is-active', isFav);
        btn.classList.toggle('is-disabled', !loggedIn);

        btn.setAttribute('aria-label', isFav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen');
        btn.querySelector('.heart-tooltip-label').textContent = isFav ? 'Favorit' : 'Favorit?';
    }

    // ── Klick ────────────────────────────────────────────────────────────────
    btn.addEventListener('click', () => {
        if (!window.MV.isLoggedIn()) {
            window.MV.showLoginPrompt('Melde dich an, um Tools als Favorit zu speichern.');
            return;
        }
        window.MV.toggleFavorite(toolId);
        render();
    });

    // ── Cross-Tab-Sync ──────────────────────────────────────────────────────
    window.addEventListener('storage', (e) => {
        if (e.key === 'currentUser' || e.key === 'isLoggedIn') render();
    });

    render();
}