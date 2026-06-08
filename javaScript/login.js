/**
 * login.js – MathVerse Login-Validierung
 *
 * Wichtig: Zustandsverwaltung via CSS-Klassen (.is-valid / .is-error),
 * NICHT via this.style.borderColor === 'var(--…)' – das funktioniert im
 * Browser nicht zuverlässig, weil CSS-Variablen in inline Styles zu
 * computed values aufgelöst werden.
 */

const form           = document.querySelector('.loginForm');
const usernameInput  = document.getElementById('username');
const passwordInput  = document.getElementById('password');
const usernameError  = document.getElementById('usernameError');
const formError      = document.getElementById('formError');
const toggleBtn      = document.getElementById('togglePassword');

// ===========================================================================
// STATE HELPERS
// ===========================================================================

function setValid(input, errEl) {
    input.classList.remove('is-error', 'shake');
    input.classList.add('is-valid');
    if (errEl) hideMsg(errEl);
}

function setError(input, errEl, msg) {
    input.classList.remove('is-valid');
    input.classList.add('is-error');
    // Shake-Animation triggern
    input.classList.remove('shake');
    void input.offsetWidth; // reflow → Animation neu starten
    input.classList.add('shake');
    if (errEl && msg) showMsg(errEl, msg);
}

function setNeutral(input) {
    input.classList.remove('is-valid', 'is-error', 'shake');
}

function showMsg(el, msg) {
    el.textContent = msg;
    el.style.display = 'block';
}

function hideMsg(el) {
    if (el) el.style.display = 'none';
}

// ===========================================================================
// BLUR VALIDATION (grün wenn ok, neutral wenn leer)
// ===========================================================================

usernameInput.addEventListener('blur', () => {
    if (usernameInput.value.trim()) {
        setValid(usernameInput, usernameError);
    } else {
        setNeutral(usernameInput);
    }
});

passwordInput.addEventListener('blur', () => {
    if (passwordInput.value) {
        setValid(passwordInput, formError);
    } else {
        setNeutral(passwordInput);
    }
});

// ===========================================================================
// INPUT (Tipp-Events) – Fehlermarker beim Tippen entfernen
// ===========================================================================

usernameInput.addEventListener('input', () => {
    if (usernameInput.classList.contains('is-error')) {
        usernameInput.classList.remove('is-error', 'shake');
        hideMsg(usernameError);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('is-error')) {
        passwordInput.classList.remove('is-error', 'shake');
        hideMsg(formError);
    }
});

// ===========================================================================
// SUBMIT VALIDATION
// ===========================================================================

form.addEventListener('submit', (e) => {
    // Alle alten Meldungen zurücksetzen
    hideMsg(usernameError);
    hideMsg(formError);

    let valid = true;

    // Benutzername / E-Mail
    if (!usernameInput.value.trim()) {
        setError(usernameInput, usernameError, 'Bitte gib deinen Benutzernamen oder deine E-Mail-Adresse ein.');
        valid = false;
    } else {
        setValid(usernameInput, usernameError);
    }

    // Passwort
    if (!passwordInput.value) {
        setError(passwordInput, formError, 'Bitte gib dein Passwort ein.');
        valid = false;
    } else {
        setValid(passwordInput, formError);
    }

    if (!valid) {
        e.preventDefault();
    }
});

// ===========================================================================
// PASSWORT TOGGLE (Auge-Icon)
// ===========================================================================

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        const icon = toggleBtn.querySelector('i');
        icon.className = isHidden ? 'fa fa-eye-slash' : 'fa fa-eye';
        toggleBtn.setAttribute('aria-label', isHidden ? 'Passwort verbergen' : 'Passwort anzeigen');
    });
}