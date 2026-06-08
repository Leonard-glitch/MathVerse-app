/**
 * register.js – MathVerse Registrierungs-Validierung
 *
 * Zustandsverwaltung via CSS-Klassen (.is-valid / .is-error),
 * niemals via inline-style-Vergleiche (das funktioniert nicht
 * zuverlässig mit CSS-Variablen).
 */

const form             = document.querySelector('.loginForm');
const usernameInput    = document.getElementById('userName');
const emailInput       = document.getElementById('email');
const passwordInput    = document.getElementById('password');
const passwordConfInput = document.getElementById('passwordConf');
const privacyCheckbox  = document.getElementById('privacyAccept');

const usernameError    = document.getElementById('usernameError');
const emailError       = document.getElementById('emailError');
const formError        = document.getElementById('formError');

const strengthWrapper  = document.getElementById('strengthWrapper');
const strengthFill     = document.getElementById('strengthFill');
const strengthLabel    = document.getElementById('strengthLabel');

// Konfiguration
const TAKEN_NAMES    = ['admin', 'test', 'max_mustermann', 'mathverse', 'moderator'];
const MIN_PW_LENGTH  = 6;
const MIN_UN_LENGTH  = 3;

// ===========================================================================
// STATE HELPERS
// ===========================================================================

function setValid(input) {
    input.classList.remove('is-error', 'shake');
    input.classList.add('is-valid');
}

function setError(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-error');
    // Shake-Animation neu triggern
    input.classList.remove('shake');
    void input.offsetWidth; // reflow
    input.classList.add('shake');
}

function setNeutral(input) {
    input.classList.remove('is-valid', 'is-error', 'shake');
}

function showMsg(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
}

function hideMsg(el) {
    if (!el) return;
    el.style.display = 'none';
}

// ===========================================================================
// VALIDIERUNGS-FUNKTIONEN
// ===========================================================================

/**
 * @param {boolean} silent – true = nur Klassen setzen, keine Fehlertext-Änderungen
 * @returns {boolean} – true wenn valide
 */
function validateUsername(silent = false) {
    const val = usernameInput.value.trim();

    if (!val) {
        setNeutral(usernameInput);
        if (!silent) hideMsg(usernameError);
        return false;
    }
    if (val.length < MIN_UN_LENGTH) {
        setError(usernameInput);
        if (!silent) showMsg(usernameError, `Benutzername muss mindestens ${MIN_UN_LENGTH} Zeichen lang sein.`);
        return false;
    }
    if (TAKEN_NAMES.includes(val.toLowerCase())) {
        setError(usernameInput);
        if (!silent) showMsg(usernameError, `„${val}" ist bereits vergeben.`);
        return false;
    }

    setValid(usernameInput);
    if (!silent) hideMsg(usernameError);
    return true;
}

function validateEmail(silent = false) {
    const val = emailInput.value.trim();

    if (!val) {
        setNeutral(emailInput);
        if (!silent) hideMsg(emailError);
        return false;
    }
    if (!emailInput.checkValidity()) {
        setError(emailInput);
        if (!silent) showMsg(emailError, 'Bitte gib eine gültige E-Mail-Adresse ein.');
        return false;
    }

    setValid(emailInput);
    if (!silent) hideMsg(emailError);
    return true;
}

function validatePassword(silent = false) {
    const val = passwordInput.value;

    if (!val) {
        setNeutral(passwordInput);
        return false;
    }
    if (val.length < MIN_PW_LENGTH) {
        setError(passwordInput);
        if (!silent) showMsg(formError, `Das Passwort muss mindestens ${MIN_PW_LENGTH} Zeichen lang sein.`);
        return false;
    }

    setValid(passwordInput);
    return true;
}

function validatePasswordConf(silent = false) {
    const pw  = passwordInput.value;
    const pwc = passwordConfInput.value;

    if (!pwc) {
        setNeutral(passwordConfInput);
        return false;
    }
    if (pw !== pwc) {
        setError(passwordConfInput);
        if (!silent) showMsg(formError, 'Die Passwörter stimmen nicht überein.');
        return false;
    }
    if (pw.length < MIN_PW_LENGTH) {
        setError(passwordConfInput);
        return false;
    }

    setValid(passwordConfInput);
    if (!silent) hideMsg(formError);
    return true;
}

// ===========================================================================
// PASSWORT-STÄRKE INDIKATOR
// ===========================================================================

const STRENGTH_LEVELS = [
    { min: 0,  label: '',        strength: 0 },
    { min: 1,  label: 'Schwach', strength: 1 },
    { min: 6,  label: 'Ok',      strength: 2 },
    { min: 10, label: 'Gut',     strength: 3 },
    { min: 14, label: 'Stark',   strength: 4 },
];

function getStrength(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6)  score++;
    if (pw.length >= 10) score++;
    if (pw.length >= 14) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(4, Math.max(1, Math.round(score / 1.5)));
}

function updateStrengthBar(pw) {
    if (!strengthWrapper) return;

    if (!pw) {
        strengthWrapper.style.display = 'none';
        return;
    }

    strengthWrapper.style.display = 'flex';
    const lvl = getStrength(pw);
    strengthWrapper.dataset.strength = lvl;

    const labels = ['', 'Schwach', 'Ok', 'Gut', 'Stark'];
    strengthLabel.textContent = labels[lvl];
}

// ===========================================================================
// BLUR EVENTS
// ===========================================================================

usernameInput.addEventListener('blur',    () => validateUsername());
emailInput.addEventListener('blur',       () => validateEmail());
passwordInput.addEventListener('blur', () => {
    validatePassword();
    // Passwort-Bestätigung neu prüfen falls schon ausgefüllt
    if (passwordConfInput.value) validatePasswordConf();
});
passwordConfInput.addEventListener('blur', () => validatePasswordConf());

// ===========================================================================
// INPUT (Tipp-Events)
// ===========================================================================

usernameInput.addEventListener('input', () => {
    if (usernameInput.classList.contains('is-error')) {
        usernameInput.classList.remove('is-error', 'shake');
        hideMsg(usernameError);
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('is-error')) {
        emailInput.classList.remove('is-error', 'shake');
        hideMsg(emailError);
    }
});

passwordInput.addEventListener('input', () => {
    const pw = passwordInput.value;

    // Stärke-Balken aktualisieren
    updateStrengthBar(pw);

    // Fehler-Klasse beim Tippen entfernen (Feld wirkt "aktiv")
    if (passwordInput.classList.contains('is-error')) {
        passwordInput.classList.remove('is-error', 'shake');
    }
    if (formError.textContent.includes('Zeichen')) hideMsg(formError);

    // Echtzeit-Match: Wenn Bestätigungsfeld schon ausgefüllt ist → live prüfen
    if (passwordConfInput.value) {
        if (pw === passwordConfInput.value && pw.length >= MIN_PW_LENGTH) {
            setValid(passwordInput);
            setValid(passwordConfInput);
            hideMsg(formError);
        } else {
            passwordConfInput.classList.remove('is-valid');
        }
    }
});

passwordConfInput.addEventListener('input', () => {
    if (passwordConfInput.classList.contains('is-error')) {
        passwordConfInput.classList.remove('is-error', 'shake');
    }
    if (formError.textContent.includes('überein')) hideMsg(formError);

    // Echtzeit-Match
    const pw  = passwordInput.value;
    const pwc = passwordConfInput.value;
    if (pw && pwc && pw === pwc && pw.length >= MIN_PW_LENGTH) {
        setValid(passwordInput);
        setValid(passwordConfInput);
        hideMsg(formError);
    }
});

privacyCheckbox.addEventListener('change', () => {
    if (privacyCheckbox.checked && formError.textContent.includes('Datenschutz')) {
        hideMsg(formError);
    }
});

// ===========================================================================
// SUBMIT
// ===========================================================================

form.addEventListener('submit', (e) => {
    // Alle Fehlermeldungen zurücksetzen
    hideMsg(usernameError);
    hideMsg(emailError);
    hideMsg(formError);

    let valid = true;
    let firstErrorInput = null;

    // 1. Benutzername
    const uname = usernameInput.value.trim();
    if (!uname) {
        setError(usernameInput);
        showMsg(usernameError, 'Bitte gib einen Benutzernamen ein.');
        valid = false;
        firstErrorInput = firstErrorInput || usernameInput;
    } else if (uname.length < MIN_UN_LENGTH) {
        setError(usernameInput);
        showMsg(usernameError, `Mindestens ${MIN_UN_LENGTH} Zeichen erforderlich.`);
        valid = false;
        firstErrorInput = firstErrorInput || usernameInput;
    } else if (TAKEN_NAMES.includes(uname.toLowerCase())) {
        setError(usernameInput);
        showMsg(usernameError, `„${uname}" ist bereits vergeben.`);
        valid = false;
        firstErrorInput = firstErrorInput || usernameInput;
    } else {
        setValid(usernameInput);
    }

    // 2. E-Mail
    if (!emailInput.value.trim() || !emailInput.checkValidity()) {
        setError(emailInput);
        showMsg(emailError, 'Bitte gib eine gültige E-Mail-Adresse ein.');
        valid = false;
        firstErrorInput = firstErrorInput || emailInput;
    } else {
        setValid(emailInput);
    }

    // 3. Passwort
    if (!passwordInput.value) {
        setError(passwordInput);
        if (!formError.textContent) showMsg(formError, 'Bitte gib ein Passwort ein.');
        valid = false;
        firstErrorInput = firstErrorInput || passwordInput;
    } else if (passwordInput.value.length < MIN_PW_LENGTH) {
        setError(passwordInput);
        showMsg(formError, `Das Passwort muss mindestens ${MIN_PW_LENGTH} Zeichen lang sein.`);
        valid = false;
        firstErrorInput = firstErrorInput || passwordInput;
    } else {
        setValid(passwordInput);
    }

    // 4. Passwort-Bestätigung
    if (!passwordConfInput.value) {
        setError(passwordConfInput);
        if (!formError.textContent) showMsg(formError, 'Bitte bestätige dein Passwort.');
        valid = false;
        firstErrorInput = firstErrorInput || passwordConfInput;
    } else if (passwordInput.value !== passwordConfInput.value) {
        setError(passwordConfInput);
        setError(passwordInput);
        showMsg(formError, 'Die Passwörter stimmen nicht überein.');
        valid = false;
        firstErrorInput = firstErrorInput || passwordConfInput;
    } else if (passwordInput.value.length >= MIN_PW_LENGTH) {
        setValid(passwordConfInput);
    }

    // 5. Datenschutz-Checkbox
    if (!privacyCheckbox.checked) {
        if (!formError.textContent) showMsg(formError, 'Du musst die Datenschutzerklärung akzeptieren.');
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
        // Scroll zum ersten Fehler-Feld
        if (firstErrorInput) {
            firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorInput.focus();
        }
    }
});

// ===========================================================================
// PASSWORT-TOGGLE BUTTONS (Auge-Icon)
// ===========================================================================

function setupPasswordToggle(toggleId, inputEl) {
    const btn = document.getElementById(toggleId);
    if (!btn || !inputEl) return;

    btn.addEventListener('click', () => {
        const isHidden = inputEl.type === 'password';
        inputEl.type = isHidden ? 'text' : 'password';
        const icon = btn.querySelector('i');
        icon.className = isHidden ? 'fa fa-eye-slash' : 'fa fa-eye';
        btn.setAttribute('aria-label',
            isHidden ? 'Passwort verbergen' : 'Passwort anzeigen');
    });
}

setupPasswordToggle('togglePassword',     passwordInput);
setupPasswordToggle('togglePasswordConf', passwordConfInput);