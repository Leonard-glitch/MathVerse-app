
window.MV_BASE = ((document.currentScript || {}).src || '')
    .replace(/\/javaScript\/Common\/common-login\.js([?#].*)?$/, '');

localStorage.removeItem(""); 
(function () {

    const THEMES = {
        violet: { '--border-glow': '#8a16ff', '--accent-color': '#8a16ff', '--accent-hover': '#a142ff', '--glow-soft': 'rgba(138, 22, 255, 0.25)', '--glow-hard': 'rgba(138, 22, 255, 0.4)', '--border-accent': '#8a16ff' },
        cyan:   { '--border-glow': '#00e5b5', '--accent-color': '#00e5b5', '--accent-hover': '#00ffcc', '--glow-soft': 'rgba(0, 229, 181, 0.25)', '--glow-hard': 'rgba(0, 229, 181, 0.4)', '--border-accent': '#00e5b5' },
        blue:   { '--border-glow': '#1e90ff', '--accent-color': '#1e90ff', '--accent-hover': '#4dabff', '--glow-soft': 'rgba(30, 144, 255, 0.25)', '--glow-hard': 'rgba(30, 144, 255, 0.4)', '--border-accent': '#1e90ff' },
        pink:   { '--border-glow': '#ff2d78', '--accent-color': '#ff2d78', '--accent-hover': '#ff5e97', '--glow-soft': 'rgba(255, 45, 120, 0.25)', '--glow-hard': 'rgba(255, 45, 120, 0.4)', '--border-accent': '#ff2d78' },
        orange: { '--border-glow': '#ff6a00', '--accent-color': '#ff6a00', '--accent-hover': '#ff8c33', '--glow-soft': 'rgba(255, 106, 0, 0.25)', '--glow-hard': 'rgba(255, 106, 0, 0.4)', '--border-accent': '#ff6a00' },
        gold:   { '--border-glow': '#f5c518', '--accent-color': '#f5c518', '--accent-hover': '#f7d04e', '--glow-soft': 'rgba(245, 197, 24, 0.25)', '--glow-hard': 'rgba(245, 197, 24, 0.4)', '--border-accent': '#f5c518' },
    };

    const DESIGNS = {
    abyss: {
        '--bg-body':         '#09090e',
        '--bg-surface':      '#0b1528',
        '--bg-surface-glow': '#142036',
        '--bg-input':        '#05060c',
        '--bg-navbar':       'rgba(9, 9, 14, 0.75)',
        '--border-color':    '#1c2740',
        '--text-primary':    '#f3f4f6',
        '--text-secondary':  '#8f8fbc',
        '--text-muted':      '#44496a',
        '--shadow-main':     '0 10px 30px rgba(0, 0, 0, 0.6)',
        '--accent-live':  '#00ffcc',
        '--accent-error': '#ff2a5f',
        '--glow-live':    'rgba(0, 255, 204, 0.2)',
        '--glow-error':   'rgba(255, 42, 95, 0.35)',
    },
    dark: {
        '--bg-body':         '#121214',
        '--bg-surface':      '#1a1a1e',
        '--bg-surface-glow': '#232328',
        '--bg-input':        '#0e0e10',
        '--bg-navbar':       'rgba(18, 18, 20, 0.75)',
        '--border-color':    '#2a2a30',
        '--text-primary':    '#ffffff',
        '--text-secondary':  '#a0a0ab',
        '--text-muted':      '#5a5a64',
        '--shadow-main':     '0 10px 30px rgba(0, 0, 0, 0.6)',
        '--accent-live':  '#00ffcc',
        '--accent-error': '#ff2a5f',
        '--glow-live':    'rgba(0, 255, 204, 0.2)',
        '--glow-error':   'rgba(255, 42, 95, 0.35)',
    },
    light: {
        '--bg-body':         '#f8fafc',
        '--bg-surface':      '#ffffff',
        '--bg-surface-glow': '#f1f3f6',
        '--bg-input':        '#f3f4f7',
        '--bg-navbar':       'rgba(255, 255, 255, 0.75)',
        '--border-color':    '#e2e4ea',
        '--text-primary':    '#0f172a',
        '--text-secondary':  '#51566b',
        '--text-muted':      '#9598a8',
        '--shadow-main':     '0 10px 30px rgba(15, 23, 42, 0.08)',
        '--accent-live':  '#0c7c69',
        '--accent-error': '#dc2626',
        '--glow-live':    'rgba(12, 124, 105, 0.18)',
        '--glow-error':   'rgba(220, 38, 38, 0.18)',
    }
};

    // Schema für currentUser anpassen (Standard auf 'abyss')
    const DEFAULT_USER = () => ({
        username: 'Gast',
        email: '',
        password: '',
        favoriten: [],
        pinnedGroups: [],
        containerOrders: {},
        advancedModes: {},
        theme: 'violet',
        design: 'abyss',
        fontsize: 20,
        isPro: false
    });



    function redirectIfLoggedIn(path) {
    if (!isLoggedIn()) return;
    const returnUrl = sessionStorage.getItem('mv-return-url');
    if (returnUrl) {
        sessionStorage.removeItem('mv-return-url');
        window.location.href = returnUrl;
    } else {
        window.location.href = path;
    }
}

    function isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true' && !!localStorage.getItem('currentUser');
    }

    function getCurrentUser() {
        try {
            const u = JSON.parse(localStorage.getItem('currentUser'));
            return u ? { ...DEFAULT_USER(), ...u } : null;
        } catch {
            return null;
        }
    }

    function saveCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    function updateCurrentUser(patch) {
        const user = getCurrentUser() || DEFAULT_USER();
        const updated = { ...user, ...patch };
        saveCurrentUser(updated);

        // Änderungen auch in der "Datenbank" (allUsers) spiegeln
        const users = getAllUsers();
        const idx = users.findIndex(u => u.username.toLowerCase() === user.username.toLowerCase());
        if (idx !== -1) {
            users[idx] = { ...users[idx], ...patch };
            saveAllUsers(users);
        }

        return updated;
    }

    function logout() {
    // allUsers bleibt unberührt – Account & Daten existieren weiterhin.
    // currentUser wird beim nächsten Login wieder aus allUsers geladen.
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    }


    // ==========================================================================
    // "DATENBANK"-SIMULATION: allUsers (alle registrierten Accounts)
    // -> currentUser bleibt der "eingeloggte" Account, allUsers ist die
    //    komplette User-Tabelle. Spätere echte DB kann hier 1:1 andocken.
    // ==========================================================================
    const ALL_USERS_KEY = 'allUsers';

    function getAllUsers() {
        try {
            const users = JSON.parse(localStorage.getItem(ALL_USERS_KEY));
            return Array.isArray(users) ? users : [];
        } catch {
            return [];
        }
    }

    function saveAllUsers(users) {
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
    }

    function findUserByUsername(username) {
        if (!username) return undefined;
        return getAllUsers().find(u => u.username.toLowerCase() === username.toLowerCase());
    }

    function findUserByEmail(email) {
        if (!email) return undefined;
        return getAllUsers().find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
    }

    function findUserByUsernameOrEmail(identifier) {
        if (!identifier) return undefined;
        const id = identifier.toLowerCase();
        return getAllUsers().find(u =>
            u.username.toLowerCase() === id || (u.email && u.email.toLowerCase() === id)
        );
    }

    // excludeUsername: erlaubt einem User, seinen EIGENEN Namen/seine
    // EIGENE Mail beim Bearbeiten zu "behalten", ohne dass er sich
    // selbst als "vergeben" meldet.
    function isUsernameTaken(username, excludeUsername = null) {
        if (!username) return false;
        return getAllUsers().some(u =>
            u.username.toLowerCase() === username.toLowerCase() &&
            (!excludeUsername || u.username.toLowerCase() !== excludeUsername.toLowerCase())
        );
    }

    function isEmailTaken(email, excludeUsername = null) {
        if (!email) return false;
        return getAllUsers().some(u =>
            u.email && u.email.toLowerCase() === email.toLowerCase() &&
            (!excludeUsername || u.username.toLowerCase() !== excludeUsername.toLowerCase())
        );
    }

    // Registriert einen neuen User in "allUsers" und loggt ihn direkt ein
    function registerUser(userData) {
        const newUser = { ...DEFAULT_USER(), ...userData };
        const users = getAllUsers();
        users.push(newUser);
        saveAllUsers(users);

        saveCurrentUser(newUser);
        localStorage.setItem('isLoggedIn', 'true');
        return newUser;
    }

    // Prüft Zugangsdaten gegen "allUsers" und loggt bei Erfolg ein
    function loginUser(identifier, password) {
        const user = findUserByUsernameOrEmail(identifier);
        if (!user) return { success: false, reason: 'notfound' };
        if ((user.password || '') !== password) return { success: false, reason: 'wrongpassword' };

        saveCurrentUser(user);
        localStorage.setItem('isLoggedIn', 'true');
        return { success: true, user };
    }

    // Löscht den aktuell eingeloggten Account vollständig aus "allUsers"
    function deleteCurrentAccount() {
        const user = getCurrentUser();
        if (user) {
            const users = getAllUsers().filter(
                u => u.username.toLowerCase() !== user.username.toLowerCase()
            );
            saveAllUsers(users);
        }
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
    }

    // ==========================================================================
    // FAVORITEN / GRUPPEN-PINS / CONTAINER-REIHENFOLGE
    // -> nur verfügbar, wenn eingeloggt (siehe Punkt 1 der Anfrage)
    // ==========================================================================
    function getFavorites() {
        const u = getCurrentUser();
        return (isLoggedIn() && u) ? (u.favoriten || []) : [];
    }
    function setFavorites(arr) {
        if (!isLoggedIn()) return;
        updateCurrentUser({ favoriten: arr });
    }
    function toggleFavorite(id) {
        if (!isLoggedIn()) return false;
        const favs = getFavorites();
        const isFav = favs.includes(id);
        const updated = isFav ? favs.filter(f => f !== id) : [...favs, id];
        setFavorites(updated);
        return !isFav;
    }

    function getPinnedGroups() {
        const u = getCurrentUser();
        return (isLoggedIn() && u) ? (u.pinnedGroups || []) : [];
    }
    function setPinnedGroups(arr) {
        if (!isLoggedIn()) return;
        updateCurrentUser({ pinnedGroups: arr });
    }

    function getContainerOrders() {
        const u = getCurrentUser();
        return (isLoggedIn() && u) ? (u.containerOrders || {}) : {};
    }
    function setContainerOrders(obj) {
        if (!isLoggedIn()) return;
        updateCurrentUser({ containerOrders: obj });
    }


    // ==========================================================================
    // ADVANCED MODES – pro Tool ein eigener Eintrag, NUR eingeloggt nutzbar
    // (gleiche Logik wie Favoriten)
    // ==========================================================================
    function getAdvancedModes() {
        const u = getCurrentUser();
        return (isLoggedIn() && u) ? (u.advancedModes || {}) : {};
    }
    function setAdvancedModes(obj) {
        if (!isLoggedIn()) return;
        updateCurrentUser({ advancedModes: obj });
    }
    function getAdvancedMode(key) {
        return !!getAdvancedModes()[key];
    }
    function toggleAdvancedMode(key) {
        if (!isLoggedIn()) return false;
        const modes = getAdvancedModes();
        const newVal = !modes[key];
        setAdvancedModes({ ...modes, [key]: newVal });
        return newVal;
    }

    // Bindet eine Advanced-Mode-Checkbox an Login-Status + eigenen Speicherplatz.
    // key      = eindeutiger Bezeichner DIESES Tools/Switches, z.B. "einheitenUmrechner"
    // onChange = wird nach jeder Statusänderung (auch beim Initial-Load) aufgerufen
    function bindAdvancedToggle(checkbox, key, onChange) {
        if (!checkbox) return;
        const wrapper = checkbox.closest('.advancedMode') || checkbox.parentElement;

        function applyState() {
            const loggedIn = isLoggedIn();
            checkbox.checked = loggedIn ? getAdvancedMode(key) : false;
            if (wrapper) wrapper.classList.toggle('locked', !loggedIn);
            if (typeof onChange === 'function') onChange(checkbox.checked);
        }

        checkbox.addEventListener('change', () => {
            if (!isLoggedIn()) {
                checkbox.checked = false;
                showLoginPrompt('Melde dich an, um den Advanced Mode zu nutzen.');
                if (typeof onChange === 'function') onChange(false);
                return;
            }
            toggleAdvancedMode(key);
            if (typeof onChange === 'function') onChange(checkbox.checked);
        });

        applyState();

        // Cross-Tab-Sync (Login/Logout in anderem Tab)
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser' || e.key === 'isLoggedIn') applyState();
        });
    }

    // ==========================================================================
    // THEME & SCHRIFTGRÖSSE
    // Eingeloggt -> Teil von currentUser. Nicht eingeloggt -> lokale
    // Geräte-Einstellung (eigener Key), damit es trotzdem funktioniert.
    // ==========================================================================
    function getTheme() {
        const u = getCurrentUser();
        if (isLoggedIn() && u && u.theme) return u.theme;
        return localStorage.getItem('mv-theme') || 'violet';
    }
    function setTheme(theme) {
        if (isLoggedIn()) {
            updateCurrentUser({ theme });
        } else {
            localStorage.setItem('mv-theme', theme);
        }
    }
    function getFontSize() {
        const u = getCurrentUser();
        if (isLoggedIn() && u && u.fontsize) return parseInt(u.fontsize, 10);
        return parseInt(localStorage.getItem('mv-fontsize') || '20', 10);
    }
    function setFontSize(size) {
        if (isLoggedIn()) {
            updateCurrentUser({ fontsize: size });
        } else {
            localStorage.setItem('mv-fontsize', String(size));
        }
    }
    function applyTheme(themeName) {
        const vars = THEMES[themeName] || THEMES.violet;
        Object.entries(vars).forEach(([key, val]) =>
            document.documentElement.style.setProperty(key, val)
        );
    }
    function applyFontSize(size) {
    const isMobile = window.innerWidth <= 768;
    const effective = isMobile ? Math.min(size, 20) : size;
    document.documentElement.style.fontSize = `${effective}px`;
    }

    // ==========================================================================
    // DESIGN (Hintergrund- und Textfarben) – gleiche Logik wie Theme, aber
    // eigenständiger Speicher
    // ==========================================================================

    function getDesign() {
        const u = getCurrentUser();
        if (isLoggedIn() && u && u.design) return u.design;
        return localStorage.getItem('mv-design') || 'abyss'; // Standard: abyss
    }

    function setDesign(design) {
        if (isLoggedIn()) {
            updateCurrentUser({ design });
        } else {
            localStorage.setItem('mv-design', design);
        }
    }

    function applyDesign(designName) {
        // Holt die CSS-Variablen aus dem DESIGNS-Objekt (Fallback zu abyss)
        const vars = DESIGNS[designName] || DESIGNS.abyss;
        Object.entries(vars).forEach(([key, val]) =>
            document.documentElement.style.setProperty(key, val)
        );
    }


    function getPasswordStrength(pw) {
        if (!pw) return 0;
        let score = 0;
        if (pw.length >= 8)  score++;
        if (pw.length >= 12) score++;
        if (pw.length >= 16) score++;
        if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return Math.min(4, Math.max(1, Math.ceil(score / 1.5)));
    }


    let modalReady = false;

    function injectModal() {
        if (modalReady) return;
        modalReady = true;

        const style = document.createElement('style');
        style.textContent = `
            .mv-modalOverlay {
                position: fixed; inset: 0;
                background: rgba(9, 9, 14, 0.85);
                backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
                display: flex; align-items: center; justify-content: center;
                z-index: 9999; animation: mvFadeIn 0.15s ease;
            }
            .mv-modalBox {
                background: var(--bg-surface);
                border: 1px solid var(--border-glow);
                border-radius: var(--radius-md);
                padding: 2rem; max-width: 380px; width: 90%;
                box-shadow: 0 0 40px var(--glow-soft), var(--shadow-main);
                animation: mvScaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                text-align: center;
            }
            .mv-modalTitle { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.6rem; }
            .mv-modalText { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.5; }
            .mv-modalActions { display: flex; justify-content: center; gap: 0.6rem; flex-wrap: wrap; }
            .mv-modalActions a, .mv-modalActions button {
                font-family: var(--font-main);
                border-radius: var(--radius-sm);
                padding: 0.55rem 1.2rem;
                font-size: 0.78rem; font-weight: 700;
                cursor: pointer; text-decoration: none;
                transition: all var(--transition-fast);
                border: 1px solid var(--border-color);
            }
            .mv-modalBtnPrimary { background-color: var(--border-glow); color: #fff; border: none; }
            .mv-modalBtnPrimary:hover { background-color: var(--accent-hover); box-shadow: 0 0 20px var(--glow-soft); }
            .mv-modalBtnSecondary { background: transparent; color: var(--text-secondary); }
            .mv-modalBtnSecondary:hover { color: var(--text-primary); border-color: var(--text-secondary); }
            @keyframes mvFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes mvScaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `;
        document.head.appendChild(style);

        const overlay = document.createElement('div');
        overlay.className = 'mv-modalOverlay';
        overlay.id = 'mvLoginPromptModal';
        overlay.style.display = 'none';
        overlay.innerHTML = `
            <div class="mv-modalBox">
                <h2 class="mv-modalTitle">Anmeldung erforderlich</h2>
                <p class="mv-modalText" id="mvLoginPromptText">Melde dich an, um diese Funktion zu nutzen.</p>
                <div class="mv-modalActions">
                    <button class="mv-modalBtnSecondary" id="mvLoginPromptCancel">Abbrechen</button>
                    <a class="mv-modalBtnPrimary" href="${window.MV_BASE}/html/login.html">Anmelden</a>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', e => { if (e.target === overlay) hideLoginPrompt(); });
        overlay.querySelector('#mvLoginPromptCancel').addEventListener('click', hideLoginPrompt);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') hideLoginPrompt();
        });
    }

    function hideLoginPrompt() {
        const overlay = document.getElementById('mvLoginPromptModal');
        if (overlay) overlay.style.display = 'none';
    }

    function showLoginPrompt(message) {
        injectModal();
        const overlay = document.getElementById('mvLoginPromptModal');
        const text = document.getElementById('mvLoginPromptText');
        if (message) text.textContent = message;
        overlay.style.display = 'flex';
    }

    // ==========================================================================
    // PUBLIC API
    // ==========================================================================
    window.MV = {
        THEMES,
        redirectIfLoggedIn,
        isLoggedIn,
        getCurrentUser,
        saveCurrentUser,
        updateCurrentUser,
        logout,
        getFavorites, setFavorites, toggleFavorite,
        getPinnedGroups, setPinnedGroups,
        getContainerOrders, setContainerOrders,
        getTheme, setTheme, getFontSize, setFontSize,
        getDesign, setDesign,
        applyTheme, applyFontSize, applyDesign,
        getPasswordStrength,
        showLoginPrompt, hideLoginPrompt,
        getUsername: () => (getCurrentUser()?.username) || 'Gast',
        getEmail: () => (getCurrentUser()?.email) || '',
        getAllUsers, saveAllUsers,
        findUserByUsername, findUserByEmail, findUserByUsernameOrEmail,
        isUsernameTaken, isEmailTaken,
        registerUser, loginUser, deleteCurrentAccount,
        getAdvancedModes, setAdvancedModes, getAdvancedMode, toggleAdvancedMode,
        bindAdvancedToggle
    };

    // ==========================================================================
    // THEME & FONTSIZE GLOBAL ANWENDEN (auf jeder Seite, sofort)
    // ==========================================================================
    applyTheme(getTheme());
    applyFontSize(getFontSize());
    applyDesign(getDesign());
    window.addEventListener("resize", () => applyFontSize(getFontSize()), { passive: true });

    // ==========================================================================
    // NAVBAR: Login/Register -> Useraccount-Link, wenn eingeloggt
    // ==========================================================================
    const navUserArea = document.getElementById('navUserArea');

    function changeNavUserArea() {
        if (!navUserArea) return;
        const name = window.MV.getUsername();
        const displayName = name.length > 10 ? name.substring(0, 10) + '...' : name;

        const userAccount = document.createElement('a');
        userAccount.href = `${window.MV_BASE}/html/userArea.html`;
        userAccount.target = '_self';
        userAccount.classList.add('userAccount');
        userAccount.innerHTML = `
            <span class="userName">${displayName}</span>
            <i class="fa fa-cog settings-icon"></i>
        `;

        navUserArea.innerHTML = '';
        navUserArea.appendChild(userAccount);
    }

    if (isLoggedIn() && navUserArea) {
        changeNavUserArea();
    }

    // ══════════════════════════════════════════════════════════════════════
    // NAVBAR BURGER MENU (beide Versionen: eingeloggt + nicht eingeloggt)
    // ══════════════════════════════════════════════════════════════════════

    // Auto-fix: searchContainer-Klasse setzen falls nicht vorhanden
    (function fixSearchContainer() {
        const input = document.getElementById('searchInput');
        if (input && !input.parentElement.classList.contains('searchContainer')) {
            input.parentElement.classList.add('searchContainer');
        }
    })();

    function initNavBurger() {
        const navbar = document.querySelector('.navbar');
        // Nicht auf der UserArea-Seite (hat eigenes Layout)
        if (!navbar || document.querySelector('.settingsLayout')) return;

        // Burger-Button erstellen und anhängen
        const burger = document.createElement('button');
        burger.className = 'navBurger';
        burger.setAttribute('aria-label', 'Menü öffnen');
        burger.setAttribute('aria-expanded', 'false');
        burger.innerHTML = `
            <span class="burgerLine"></span>
            <span class="burgerLine"></span>
            <span class="burgerLine"></span>
        `;
        navbar.appendChild(burger);

        function openMenu() {
            navbar.classList.add('nav-open');
            burger.classList.add('is-open');
            burger.setAttribute('aria-expanded', 'true');
            burger.setAttribute('aria-label', 'Menü schließen');
        }

        function closeMenu() {
            navbar.classList.remove('nav-open');
            burger.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Menü öffnen');
        }

        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            navbar.classList.contains('nav-open') ? closeMenu() : openMenu();
        });

        // Schließen bei Klick außerhalb
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) closeMenu();
        });

        // Schließen bei Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // Schließen wenn Nav-Link oder Suchergebnis geklickt
        document.getElementById('navUserArea')?.addEventListener('click', (e) => {
            if (e.target.closest('a')) closeMenu();
        });
        document.getElementById('searchResults')?.addEventListener('click', closeMenu);
    }

    initNavBurger();

    const _mvPath = window.location.pathname;
    if (!_mvPath.endsWith('/login.html') && !_mvPath.endsWith('/register.html')) {
        sessionStorage.setItem('mv-return-url', window.location.href);
    }

    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) return;

        applyTheme(getTheme());
        applyFontSize(getFontSize());
        applyDesign(getDesign());

        const path = window.location.pathname;

        if (path.endsWith('userArea.html') && !isLoggedIn()) {
            window.location.replace(window.MV_BASE + '/html/login.html');
            return;
        }

        if ((path.endsWith('login.html') || path.endsWith('register.html')) && isLoggedIn()) {
            const returnUrl = sessionStorage.getItem('mv-return-url') || (window.MV_BASE + '/index.html');
            sessionStorage.removeItem('mv-return-url');
            window.location.replace(returnUrl);
            return;
        }

        if (navUserArea) {
            navUserArea.innerHTML = `
                <a href="${window.MV_BASE}/html/login.html" class="navTextBorder">Login</a>
                <a href="${window.MV_BASE}/html/register.html" class="navTextBorder">Register</a>
            `;
            if (isLoggedIn()) changeNavUserArea();
        }
    });

})();