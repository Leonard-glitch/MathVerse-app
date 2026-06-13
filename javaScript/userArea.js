/**
 * userArea.js – MathVerse Settings Page Logic (ES Module)
 *
 * Bugs behoben gegenüber der alten Version:
 * - TOOL_META entfernt → Daten kommen jetzt aus toolsCollection.js
 * - initFavoritesPanel() war nicht definiert → entfernt
 * - logoutNavBtn.addEventListener() am Dateiende → ReferenceError behoben
 * - Logout löscht jetzt auch 'isLoggedIn' aus localStorage
 * - applyTheme / applyFontSize: ungenutzten 'live'-Parameter entfernt
 * - showError-Konflikt: Funktion in showFormError umbenannt
 */

import { tools, groups } from './toolsCollection.js';

// ── Colour Themes ─────────────────────────────────────────────────────────────
const THEMES = {
    violet: {
        '--border-glow':   '#8a16ff',
        '--accent-color':  '#8a16ff',
        '--accent-hover':  '#a142ff',
        '--glow-soft':     'rgba(138, 22, 255, 0.25)',
        '--glow-hard':     'rgba(138, 22, 255, 0.4)',
        '--border-accent': '#8a16ff',
    },
    cyan: {
        '--border-glow':   '#00e5b5',
        '--accent-color':  '#00e5b5',
        '--accent-hover':  '#00ffcc',
        '--glow-soft':     'rgba(0, 229, 181, 0.25)',
        '--glow-hard':     'rgba(0, 229, 181, 0.4)',
        '--border-accent': '#00e5b5',
    },
    blue: {
        '--border-glow':   '#1e90ff',
        '--accent-color':  '#1e90ff',
        '--accent-hover':  '#4dabff',
        '--glow-soft':     'rgba(30, 144, 255, 0.25)',
        '--glow-hard':     'rgba(30, 144, 255, 0.4)',
        '--border-accent': '#1e90ff',
    },
    pink: {
        '--border-glow':   '#ff2d78',
        '--accent-color':  '#ff2d78',
        '--accent-hover':  '#ff5e97',
        '--glow-soft':     'rgba(255, 45, 120, 0.25)',
        '--glow-hard':     'rgba(255, 45, 120, 0.4)',
        '--border-accent': '#ff2d78',
    },
    orange: {
        '--border-glow':   '#ff6a00',
        '--accent-color':  '#ff6a00',
        '--accent-hover':  '#ff8c33',
        '--glow-soft':     'rgba(255, 106, 0, 0.25)',
        '--glow-hard':     'rgba(255, 106, 0, 0.4)',
        '--border-accent': '#ff6a00',
    },
    gold: {
        '--border-glow':   '#f5c518',
        '--accent-color':  '#f5c518',
        '--accent-hover':  '#f7d04e',
        '--glow-soft':     'rgba(245, 197, 24, 0.25)',
        '--glow-hard':     'rgba(245, 197, 24, 0.4)',
        '--border-accent': '#f5c518',
    },
};

// ── Gruppen-Icon-Mapping für Favoriten (abgeleitet aus toolsCollection-Gruppen) ──
const GROUP_ICONS = {
    arithmetik:    'fa-percent',
    zahlensysteme: 'fa-calculator',
    algebra:       'fa-bar-chart',
    geometrie:     'fa-circle-o',
    statistik:     'fa-line-chart',
    einheiten:     'fa-arrows-h',
};

// ── State ─────────────────────────────────────────────────────────────────────

/* * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * LOCAL STORAGE ZUGRIFF: Theme und Fontsize auslesen (Get Item)
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
let currentTheme    = localStorage.getItem('mv-theme')    || 'violet';
let currentFontSize = parseInt(localStorage.getItem('mv-fontsize') || '20', 10);
let pendingTheme    = currentTheme;
let pendingFontSize = currentFontSize;

// ── DOM-Referenzen ────────────────────────────────────────────────────────────
const navItems        = document.querySelectorAll('.navItem[data-panel]');
const panels          = document.querySelectorAll('.settingsPanel');

const sidebarAvatar   = document.getElementById('sidebarAvatarEl');
const sidebarUsername = document.getElementById('sidebarUsernameEl');
const sidebarEmail    = document.getElementById('sidebarEmailEl');
const profileAvatar   = document.getElementById('profileAvatarEl');
const displayName     = document.getElementById('displayNameEl');
const viewUsername    = document.getElementById('view-username');
const viewEmail       = document.getElementById('view-email');

// ── Shake-Keyframe (einmalig injiziert) ───────────────────────────────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes settingsShake {
        0%,100% { transform: translateX(0); }
        20%     { transform: translateX(-5px); }
        40%     { transform: translateX(5px); }
        60%     { transform: translateX(-3px); }
        80%     { transform: translateX(3px); }
    }
`;
document.head.appendChild(shakeStyle);

// ── Initialisierung ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    applyFontSize(currentFontSize);
    populateUserInfo();
    initPanelNav();
    initAccountPanel();
    initSecurityPanel();
    initAppearancePanel();
    initDeletePanel();
    initLogoutModal();
    initPasswordToggles();
});

// =============================================================================
// PANEL NAVIGATION
// =============================================================================

function initPanelNav() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            switchPanel(item.dataset.panel);
        });
    });
}

function switchPanel(panelId) {
    panels.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`panel-${panelId}`);
    if (target) target.classList.add('active');

    // Panel-spezifische Seiteneffekte
    if (panelId === 'favorites') populateFavorites();
}

// =============================================================================
// USER INFO
// =============================================================================

function maskEmail(email) {
    if (!email || !email.includes('@')) return '–';
    const [local, domain] = email.split('@');
    const visible = local.slice(0, 2);
    return `${visible}${'*'.repeat(Math.min(local.length - 2, 5))}@${domain}`;
}

function populateUserInfo() {
    /* * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * LOCAL STORAGE ZUGRIFF: Username und E-Mail abrufen (Get Item)
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */
    const name   = localStorage.getItem('mv-username') || 'Gast';
    const email  = localStorage.getItem('mv-email')    || '';
    const letter = name.charAt(0).toUpperCase();

    if (sidebarAvatar)   sidebarAvatar.textContent  = letter;
    if (sidebarUsername) sidebarUsername.textContent = name;
    if (sidebarEmail)    sidebarEmail.textContent    = maskEmail(email);
    if (profileAvatar)   profileAvatar.textContent   = letter;
    if (displayName)     displayName.textContent     = name;
    if (viewUsername)    viewUsername.textContent     = name;
    if (viewEmail)       viewEmail.textContent        = maskEmail(email) || '–';

    const inputUsername = document.getElementById('input-username');
    const inputEmail    = document.getElementById('input-email');
    if (inputUsername)          inputUsername.value = name;
    if (inputEmail && email)    inputEmail.value    = email;
}

// =============================================================================
// KONTO-PANEL
// =============================================================================

function initAccountPanel() {
    const editBtn   = document.getElementById('editAccountBtn');
    const cancelBtn = document.getElementById('cancelAccountBtn');
    const saveBtn   = document.getElementById('saveAccountBtn');
    const viewMode  = document.getElementById('accountViewMode');
    const editMode  = document.getElementById('accountEditMode');
    const toast     = document.getElementById('accountToast');

    if (!editBtn) return;

    editBtn.addEventListener('click', () => {
        viewMode.classList.add('hidden');
        editMode.classList.remove('hidden');
        editBtn.classList.add('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        exitEditMode(viewMode, editMode, editBtn);
    });

    saveBtn.addEventListener('click', () => {
        const newName   = document.getElementById('input-username').value.trim();
        const newEmail  = document.getElementById('input-email').value.trim();
        const currentPw = document.getElementById('input-current-pw').value;

        if (!currentPw) {
            shakeElement(document.getElementById('input-current-pw'));
            return;
        }
        if (!newName || newName.length < 3) {
            shakeElement(document.getElementById('input-username'));
            return;
        }

        /* * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * LOCAL STORAGE ZUGRIFF: Username und E-Mail updaten (Set Item)
         * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         */
        localStorage.setItem('mv-username', newName);
        if (newEmail) localStorage.setItem('mv-email', newEmail);

        populateUserInfo();
        exitEditMode(viewMode, editMode, editBtn);
        document.getElementById('input-current-pw').value = '';

        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    });
}

function exitEditMode(viewMode, editMode, editBtn) {
    editMode.classList.add('hidden');
    viewMode.classList.remove('hidden');
    editBtn.classList.remove('hidden');
}

// =============================================================================
// SICHERHEITS-PANEL
// =============================================================================

function initSecurityPanel() {
    const newPwInput  = document.getElementById('sec-new-pw');
    const confPwInput = document.getElementById('sec-confirm-pw');
    const saveBtn     = document.getElementById('savePwBtn');
    const errorEl     = document.getElementById('sec-error');

    if (!newPwInput) return;

    newPwInput.addEventListener('input', () => updateStrength(newPwInput.value));

    saveBtn.addEventListener('click', () => {
        const cur  = document.getElementById('sec-current-pw').value;
        const nw   = newPwInput.value;
        const conf = confPwInput.value;

        errorEl.classList.add('hidden');

        if (!cur) {
            showFormError(errorEl, 'Bitte gib dein aktuelles Passwort ein.');
            shakeElement(document.getElementById('sec-current-pw'));
            return;
        }
        if (nw.length < 6) {
            showFormError(errorEl, 'Das neue Passwort muss mindestens 6 Zeichen lang sein.');
            shakeElement(newPwInput);
            return;
        }
        if (nw !== conf) {
            showFormError(errorEl, 'Die Passwörter stimmen nicht überein.');
            shakeElement(confPwInput);
            return;
        }

        // Erfolg
        document.getElementById('sec-current-pw').value = '';
        newPwInput.value  = '';
        confPwInput.value = '';
        updateStrength('');
        showFormError(errorEl, '✓ Passwort erfolgreich geändert.', true);
        setTimeout(() => errorEl.classList.add('hidden'), 3000);
    });
}

function updateStrength(pw) {
    const fill  = document.getElementById('sec-strengthFill');
    const label = document.getElementById('sec-strengthLabel');
    if (!fill) return;

    if (!pw) {
        fill.style.width           = '0';
        fill.style.backgroundColor = '';
        if (label) label.textContent = '';
        return;
    }

    let score = 0;
    if (pw.length >= 6)           score++;
    if (pw.length >= 10)          score++;
    if (pw.length >= 14)          score++;
    if (/[A-Z]/.test(pw))         score++;
    if (/[0-9]/.test(pw))         score++;
    if (/[^A-Za-z0-9]/.test(pw))  score++;

    const lvl    = Math.min(4, Math.max(1, Math.round(score / 1.5)));
    const labels = ['', 'Schwach', 'Ok', 'Gut', 'Stark'];
    const colors = ['', '#ff2a5f', '#ff9100', '#ffcc00', '#00ffcc'];

    fill.style.width           = `${lvl * 25}%`;
    fill.style.backgroundColor = colors[lvl];

    if (label) {
        label.textContent = labels[lvl];
        label.style.color = colors[lvl];
    }
}

// =============================================================================
// ERSCHEINUNGSBILD-PANEL
// =============================================================================

function initAppearancePanel() {
    const swatches = document.querySelectorAll('.colorSwatch');
    const slider   = document.getElementById('fontSizeSlider');
    const display  = document.getElementById('fontSizeDisplay');
    const saveBtn  = document.getElementById('saveAppearanceBtn');
    const resetBtn = document.getElementById('resetAppearanceBtn');
    const toast    = document.getElementById('appearanceToast');

    // Aktiven Swatch aus gespeichertem Theme setzen
    document.querySelector(`.colorSwatch[data-theme="${currentTheme}"]`)
        ?.classList.add('active');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            pendingTheme = swatch.dataset.theme;
            applyTheme(pendingTheme); // Live-Vorschau
        });
    });

    if (slider) {
        slider.value = currentFontSize;
        if (display) display.textContent = currentFontSize;

        slider.addEventListener('input', () => {
            pendingFontSize = parseInt(slider.value, 10);
            if (display) display.textContent = pendingFontSize;
            applyFontSize(pendingFontSize); // Live-Vorschau
        });
    }

    saveBtn?.addEventListener('click', () => {
        currentTheme    = pendingTheme;
        currentFontSize = pendingFontSize;

        /* * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * LOCAL STORAGE ZUGRIFF: Theme und Fontsize speichern (Set Item)
         * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         */
        localStorage.setItem('mv-theme',    currentTheme);
        localStorage.setItem('mv-fontsize', String(currentFontSize));

        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    });

    resetBtn?.addEventListener('click', () => {
        pendingTheme    = 'violet';
        pendingFontSize = 20;

        applyTheme(pendingTheme);
        applyFontSize(pendingFontSize);

        if (slider)  slider.value         = 20;
        if (display) display.textContent  = 20;

        swatches.forEach(s => s.classList.remove('active'));
        document.querySelector('.colorSwatch[data-theme="violet"]')
            ?.classList.add('active');
    });
}

function applyTheme(themeName) {
    const vars = THEMES[themeName];
    if (!vars) return;
    Object.entries(vars).forEach(([key, val]) =>
        document.documentElement.style.setProperty(key, val)
    );
}

function applyFontSize(size) {
    document.documentElement.style.fontSize = `${size}px`;
}

// =============================================================================
// FAVORITEN-PANEL
// (Daten kommen jetzt direkt aus toolsCollection.js – kein TOOL_META mehr)
// =============================================================================

function populateFavorites() {
    const grid       = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('favEmptyState');

    let favs = [];
    try { 
        /* * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * LOCAL STORAGE ZUGRIFF: Favoriten-Liste auslesen (Get Item)
         * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         */
        favs = JSON.parse(localStorage.getItem('favoriten') || '[]'); 
    } catch (_) {}

    grid.innerHTML = '';

    if (favs.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    favs.forEach(id => {
        const tool = tools.find(t => t.id === id);
        if (!tool) return;

        const group = groups.find(g => g.id === tool.group);
        const icon  = GROUP_ICONS[tool.group] || 'fa-star';

        const card = document.createElement('a');
        card.href       = tool.url;
        card.className  = 'favCard';
        card.innerHTML  = `
            <i class="fa ${icon} favCardIcon"></i>
            <div class="favCardTitle">${tool.title}</div>
            <div class="favCardTag">${group?.title ?? ''}</div>
        `;
        grid.appendChild(card);
    });
}

// =============================================================================
// KONTO-LÖSCHEN-PANEL
// =============================================================================

function initDeletePanel() {
    const input = document.getElementById('deleteConfirmInput');
    const btn   = document.getElementById('deleteAccountBtn');

    if (!input || !btn) return;

    input.addEventListener('input', () => {
        btn.disabled = input.value !== 'LÖSCHEN';
    });

    btn.addEventListener('click', () => {
        /* * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * LOCAL STORAGE ZUGRIFF: Kompletten Speicher leeren (Clear)
         * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         */
        localStorage.clear();
        alert('Konto wurde gelöscht. Du wirst zur Startseite weitergeleitet.');
        window.location.href = '../index.html';
    });
}

// =============================================================================
// LOGOUT-MODAL
// =============================================================================

function initLogoutModal() {
    const logoutNavBtn = document.getElementById('logoutNavBtn');
    const modal        = document.getElementById('logoutModal');
    const cancelBtn    = document.getElementById('logoutCancelBtn');
    const confirmBtn   = document.getElementById('logoutConfirmBtn');

    if (!logoutNavBtn || !modal) return;

    logoutNavBtn.addEventListener('click', () => modal.classList.remove('hidden'));

    cancelBtn?.addEventListener('click', () => modal.classList.add('hidden'));

    // Schließen bei Klick auf das Overlay
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Schließen mit Escape-Taste
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });

    confirmBtn?.addEventListener('click', () => {
        /* * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * LOCAL STORAGE ZUGRIFF: Spezifische Login-Daten löschen (Remove Item)
         * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         */
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('mv-username');
        localStorage.removeItem('mv-email');
        window.location.href = '../index.html';
    });
}

// =============================================================================
// PASSWORT-TOGGLES (global für alle Panels)
// =============================================================================

function initPasswordToggles() {
    document.querySelectorAll('.pwToggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            if (!input) return;
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            btn.querySelector('i').className = isHidden ? 'fa fa-eye-slash' : 'fa fa-eye';
        });
    });
}

// =============================================================================
// HILFSFUNKTIONEN
// =============================================================================

function shakeElement(el) {
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetWidth; // Reflow → Animation neu starten
    el.style.animation = 'settingsShake 0.35s ease';
    setTimeout(() => { el.style.animation = ''; }, 400);
}

function showFormError(el, msg, isSuccess = false) {
    el.textContent           = msg;
    el.style.color           = isSuccess ? 'var(--accent-live)'     : 'var(--accent-error)';
    el.style.borderColor     = isSuccess ? 'var(--accent-live)'     : 'rgba(255,42,95,0.3)';
    el.style.backgroundColor = isSuccess ? 'rgba(0,255,204,0.06)'   : 'rgba(255,42,95,0.06)';
    el.classList.remove('hidden');
}