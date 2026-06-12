/* ==========================================================================
   userArea.js – MathVerse Settings Page Logic
   Handles: panel navigation, inline editing, appearance theming, favorites
   ========================================================================== */

// ── Colour Themes ────────────────────────────────────────────────────────────
// Each theme overrides the root CSS variables that control all glow/border colours.

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

// Tool meta-data for the Favourites panel (mirrors index.js tools array)
const TOOL_META = {
    card1: { title: 'Zahlen Analyse',            icon: 'fa-bar-chart', tag: 'Algebra',        url: '../Tools/Zahlenanalyse/zahlenAnalyse.html' },
    card2: { title: 'Zahlensystem Umrechner',    icon: 'fa-exchange',  tag: 'Zahlensysteme',  url: '../Tools/Zahlensystemumrechner/zsystUmrechner.html' },
    card3: { title: 'Zahlensystem Rechner',      icon: 'fa-calculator',tag: 'Zahlensysteme',  url: '../Tools/Zahlensystemrechner/zsystRechner.html' },
    card4: { title: 'Einheiten Umrechner',        icon: 'fa-arrows-h',  tag: 'Einheiten',      url: '../Tools/Einheiten Umrechner/einheitenUmrechner.html' },
    card5: { title: 'Prozentrechnung',           icon: 'fa-percent',   tag: 'Arithmetik',     url: '../Tools/Prozentrechner/prozentrechner.html' },
};

// ── State ────────────────────────────────────────────────────────────────────

let currentTheme    = localStorage.getItem('mv-theme') || 'violet';
let currentFontSize = parseInt(localStorage.getItem('mv-fontsize') || '20', 10);
let pendingTheme    = currentTheme;
let pendingFontSize = currentFontSize;

// ── DOM Refs ─────────────────────────────────────────────────────────────────

const navItems        = document.querySelectorAll('.navItem[data-panel]');
const panels          = document.querySelectorAll('.settingsPanel');

// Sidebar live elements
const sidebarAvatar   = document.getElementById('sidebarAvatarEl');
const sidebarUsername = document.getElementById('sidebarUsernameEl');
const sidebarEmail    = document.getElementById('sidebarEmailEl');

// Profile elements
const profileAvatar   = document.getElementById('profileAvatarEl');
const displayName     = document.getElementById('displayNameEl');
const viewUsername    = document.getElementById('view-username');
const viewEmail       = document.getElementById('view-email');

// ── Initialisation ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme, false);
    applyFontSize(currentFontSize, false);
    populateUserInfo();
    initPanelNav();
    initAccountPanel();
    initSecurityPanel();
    initAppearancePanel();
    initFavoritesPanel();
    initDeletePanel();
    initLogoutModal();
    initPasswordToggles();   // Called ONCE globally — covers all panels
});

// ── Panel navigation ─────────────────────────────────────────────────────────

function initPanelNav() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const panelId = item.dataset.panel;
            switchPanel(panelId);
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function switchPanel(panelId) {
    panels.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`panel-${panelId}`);
    if (target) target.classList.add('active');

    // Side-effects per panel
    if (panelId === 'favorites') populateFavorites();
}

// ── User info population ─────────────────────────────────────────────────────

function maskEmail(email) {
    if (!email || !email.includes('@')) return '–';
    const [local, domain] = email.split('@');
    const visible = local.charAt(0) + local.charAt(1);
    return `${visible}${'*'.repeat(Math.min(local.length - 2, 5))}@${domain}`;
}

function populateUserInfo() {
    const name  = localStorage.getItem('mv-username') || 'Leolegend6260';
    const email = localStorage.getItem('mv-email')    || '';
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
    if (inputUsername) inputUsername.value = name;
    if (inputEmail && email) inputEmail.value = email;
}

// ── Account panel ─────────────────────────────────────────────────────────────

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
        const newName  = document.getElementById('input-username').value.trim();
        const newEmail = document.getElementById('input-email').value.trim();
        const pw       = document.getElementById('input-current-pw').value;

        if (!pw) {
            shakeElement(document.getElementById('input-current-pw'));
            return;
        }
        if (!newName || newName.length < 3) {
            shakeElement(document.getElementById('input-username'));
            return;
        }

        // Persist
        localStorage.setItem('mv-username', newName);
        if (newEmail) localStorage.setItem('mv-email', newEmail);

        populateUserInfo();
        exitEditMode(viewMode, editMode, editBtn);

        // Show toast
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);

        // Clear sensitive field
        document.getElementById('input-current-pw').value = '';
    });
}

function exitEditMode(viewMode, editMode, editBtn) {
    editMode.classList.add('hidden');
    viewMode.classList.remove('hidden');
    editBtn.classList.remove('hidden');
}

// ── Security panel ─────────────────────────────────────────────────────────────

function initSecurityPanel() {
    const newPwInput  = document.getElementById('sec-new-pw');
    const confPwInput = document.getElementById('sec-confirm-pw');
    const saveBtn     = document.getElementById('savePwBtn');
    const errorEl     = document.getElementById('sec-error');

    if (!newPwInput) return;

    // Live strength meter
    newPwInput.addEventListener('input', () => {
        updateStrength(newPwInput.value);
    });

    saveBtn.addEventListener('click', () => {
        const cur  = document.getElementById('sec-current-pw').value;
        const nw   = document.getElementById('sec-new-pw').value;
        const conf = document.getElementById('sec-confirm-pw').value;

        errorEl.classList.add('hidden');

        if (!cur) {
            showError(errorEl, 'Bitte gib dein aktuelles Passwort ein.');
            shakeElement(document.getElementById('sec-current-pw'));
            return;
        }
        if (nw.length < 6) {
            showError(errorEl, 'Das neue Passwort muss mindestens 6 Zeichen lang sein.');
            shakeElement(newPwInput);
            return;
        }
        if (nw !== conf) {
            showError(errorEl, 'Die Passwörter stimmen nicht überein.');
            shakeElement(confPwInput);
            return;
        }

        // Success
        document.getElementById('sec-current-pw').value = '';
        newPwInput.value  = '';
        confPwInput.value = '';
        updateStrength('');

        showError(errorEl, '✓ Passwort erfolgreich geändert.', true);
        setTimeout(() => errorEl.classList.add('hidden'), 3000);
    });
}

function updateStrength(pw) {
    const fill  = document.getElementById('sec-strengthFill');
    const label = document.getElementById('sec-strengthLabel');
    if (!fill) return;

    if (!pw) {
        fill.style.width = '0';
        fill.style.backgroundColor = '';
        label.textContent = '';
        return;
    }

    let score = 0;
    if (pw.length >= 6)  score++;
    if (pw.length >= 10) score++;
    if (pw.length >= 14) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    const lvl = Math.min(4, Math.max(1, Math.round(score / 1.5)));
    const map  = ['', 'Schwach', 'Ok', 'Gut', 'Stark'];
    const cols = ['', '#ff2a5f', '#ff9100', '#ffcc00', '#00ffcc'];

    fill.style.width           = `${lvl * 25}%`;
    fill.style.backgroundColor = cols[lvl];
    label.textContent          = map[lvl];
    label.style.color          = cols[lvl];
}

// ── Appearance panel ──────────────────────────────────────────────────────────

function initAppearancePanel() {
    // Color swatches
    const swatches = document.querySelectorAll('.colorSwatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            pendingTheme = swatch.dataset.theme;
            applyTheme(pendingTheme, true);  // Live preview
        });
    });

    // Set initially active swatch
    const activeSwatch = document.querySelector(`.colorSwatch[data-theme="${currentTheme}"]`);
    if (activeSwatch) activeSwatch.classList.add('active');

    // Font size slider
    const slider  = document.getElementById('fontSizeSlider');
    const display = document.getElementById('fontSizeDisplay');

    if (slider) {
        slider.value = currentFontSize;
        if (display) display.textContent = currentFontSize;

        slider.addEventListener('input', () => {
            pendingFontSize = parseInt(slider.value, 10);
            if (display) display.textContent = pendingFontSize;
            applyFontSize(pendingFontSize, true);
        });
    }

    // Save
    const saveBtn  = document.getElementById('saveAppearanceBtn');
    const resetBtn = document.getElementById('resetAppearanceBtn');
    const toast    = document.getElementById('appearanceToast');

    saveBtn.addEventListener('click', () => {
        currentTheme    = pendingTheme;
        currentFontSize = pendingFontSize;
        localStorage.setItem('mv-theme',    currentTheme);
        localStorage.setItem('mv-fontsize', currentFontSize);

        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    });

    resetBtn.addEventListener('click', () => {
        pendingTheme    = 'violet';
        pendingFontSize = 20;
        applyTheme(pendingTheme, true);
        applyFontSize(pendingFontSize, true);

        if (slider)  slider.value = 20;
        if (display) display.textContent = 20;

        swatches.forEach(s => s.classList.remove('active'));
        const violet = document.querySelector('.colorSwatch[data-theme="violet"]');
        if (violet) violet.classList.add('active');
    });
}

function applyTheme(themeName, live = false) {
    const vars = THEMES[themeName];
    if (!vars) return;
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val));
}

function applyFontSize(size, live = false) {
    document.documentElement.style.fontSize = `${size}px`;
}

// ── Favorites panel ───────────────────────────────────────────────────────────

function populateFavorites() {
    const grid      = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('favEmptyState');

    let favs = [];
    try { favs = JSON.parse(localStorage.getItem('favoriten') || '[]'); } catch (_) {}

    grid.innerHTML = '';

    if (favs.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    favs.forEach(id => {
        const meta = TOOL_META[id];
        if (!meta) return;

        const card = document.createElement('a');
        card.href  = meta.url;
        card.className = 'favCard';
        card.innerHTML = `
            <i class="fa ${meta.icon} favCardIcon"></i>
            <div class="favCardTitle">${meta.title}</div>
            <div class="favCardTag">${meta.tag}</div>
        `;
        grid.appendChild(card);
    });
}

// ── Delete panel ──────────────────────────────────────────────────────────────

function initDeletePanel() {
    const input  = document.getElementById('deleteConfirmInput');
    const btn    = document.getElementById('deleteAccountBtn');

    if (!input || !btn) return;

    input.addEventListener('input', () => {
        const ready = input.value === 'LÖSCHEN';
        btn.disabled = !ready;
    });

    btn.addEventListener('click', () => {
        // In a real app: API call to delete account
        localStorage.clear();
        alert('Konto wurde gelöscht. Du wirst zur Startseite weitergeleitet.');
        window.location.href = '../index.html';
    });
}

// ── Logout modal ──────────────────────────────────────────────────────────────

function initLogoutModal() {
    const logoutNavBtn   = document.getElementById('logoutNavBtn');
    const modal          = document.getElementById('logoutModal');
    const cancelBtn      = document.getElementById('logoutCancelBtn');
    const confirmBtn     = document.getElementById('logoutConfirmBtn');

    if (!logoutNavBtn || !modal) return;

    logoutNavBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on overlay click or Escape key
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });

    confirmBtn.addEventListener('click', () => {
        // Real logout logic goes here
        localStorage.removeItem('mv-username');
        window.location.href = '../index.html';
    });
}

logoutNavBtn.addEventListener('click', () => {
  initLogoutModal();  
})

// ── Password toggle helper ────────────────────────────────────────────────────

function initPasswordToggles() {
    document.querySelectorAll('.pwToggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const input    = document.getElementById(targetId);
            if (!input) return;
            const isHidden = input.type === 'password';
            input.type     = isHidden ? 'text' : 'password';
            const icon     = btn.querySelector('i');
            icon.className = isHidden ? 'fa fa-eye-slash' : 'fa fa-eye';
        });
    });
}

// ── Utility helpers ───────────────────────────────────────────────────────────

function shakeElement(el) {
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'settingsShake 0.35s ease';
    setTimeout(() => { el.style.animation = ''; }, 400);
}

function showError(el, msg, isSuccess = false) {
    el.textContent = msg;
    el.style.color           = isSuccess ? 'var(--accent-live)'  : 'var(--accent-error)';
    el.style.borderColor     = isSuccess ? 'var(--accent-live)'  : 'rgba(255,42,95,0.3)';
    el.style.backgroundColor = isSuccess ? 'rgba(0,255,204,0.06)' : 'rgba(255,42,95,0.06)';
    el.classList.remove('hidden');
}

// Shake animation added to document
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes settingsShake {
        0%,100%  { transform: translateX(0); }
        20%      { transform: translateX(-5px); }
        40%      { transform: translateX(5px); }
        60%      { transform: translateX(-3px); }
        80%      { transform: translateX(3px); }
    }
`;
document.head.appendChild(shakeStyle);