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
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{3,20}$/;

window.MV.redirectIfLoggedIn("../index.html")

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
    el.style.color = '';
    el.style.borderColor = '';
    el.style.backgroundColor = '';
}

function hideMsg(el) {
    if (!el) return;
    el.style.display = 'none';
}

function showSuccessMsg(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
    el.style.color = 'var(--accent-live)';
    el.style.borderColor = 'var(--accent-live)';
    el.style.backgroundColor = 'rgba(0, 255, 204, 0.06)';
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

    if (!USERNAME_REGEX.test(val)) {
        setError(usernameInput);
        if (!silent) showMsg(usernameError, 'Nur Buchstaben, Zahlen, _, - und . erlaubt (3–20 Zeichen).');
        return false;
    }

    if (TAKEN_NAMES.includes(val.toLowerCase()) || window.MV.isUsernameTaken(val)) {
        setError(usernameInput);
        if (!silent) showMsg(usernameError, `„${val}" ist bereits vergeben.`);
        return false;
    }

    setValid(usernameInput);
    if (!silent) showSuccessMsg(usernameError, `„${val}" ist verfügbar.`);
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
    if (window.MV.isEmailTaken(val)) {
        setError(emailInput);
        if (!silent) showMsg(emailError, 'Für diese E-Mail-Adresse existiert bereits ein Konto.');
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


function updateStrengthBar(pw) {
    if (!strengthWrapper) return;

    if (!pw) {
        strengthWrapper.style.display = 'none';
        return;
    }

    strengthWrapper.style.display = 'flex';
    const lvl = window.MV.getPasswordStrength(pw);
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
    usernameInput.classList.remove('shake');
    validateUsername(); // läuft live bei jedem Tastendruck, zeigt dauerhaft Status
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

// Erkennt, wenn der Browser/Passwortmanager (z.B. "Starkes Passwort
// vorschlagen") das Feld automatisch befüllt – dafür triggert :-webkit-autofill
// in register.css eine CSS-Animation, die wir hier abfangen.
passwordInput.addEventListener('animationstart', (e) => {
    if (e.animationName === 'onAutoFillStart') {
        updateStrengthBar(passwordInput.value);
        if (passwordConfInput.value) {
            // Bestätigungsfeld ggf. mit-validieren, falls auch befüllt
            if (passwordInput.value === passwordConfInput.value) {
                setValid(passwordInput);
                setValid(passwordConfInput);
                hideMsg(formError);
            }
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
    // Verhindert das Abschicken an das (noch) nicht vorhandene Backend
    e.preventDefault();

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
    } else if (!USERNAME_REGEX.test(uname)) {
        setError(usernameInput);
        showMsg(usernameError, 'Nur Buchstaben, Zahlen, _, - und . erlaubt (3–20 Zeichen).');
        valid = false;
        firstErrorInput = firstErrorInput || usernameInput;
    } else if (TAKEN_NAMES.includes(uname.toLowerCase()) || window.MV.isUsernameTaken(uname)) {
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
    } else if (window.MV.isEmailTaken(emailInput.value.trim())) {
        setError(emailInput);
        showMsg(emailError, 'Für diese E-Mail-Adresse existiert bereits ein Konto.');
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

    // AUSWERTUNG
    if (!valid) {
        // Scroll zum ersten Fehler-Feld, falls etwas nicht passt
        if (firstErrorInput) {
            firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorInput.focus();
        }
    } else {
        // WENN ALLES PASST: User in "allUsers" registrieren und einloggen
        window.MV.registerUser({
            username: uname,
            email: emailInput.value.trim(),
            password: passwordInput.value,
            favoriten: [],
            pinnedGroups: [],
            containerOrders: {},
            theme: 'violet',
            fontsize: 20,
            isPro: false
        });

        console.log('Registrierung erfolgreich! User eingeloggt.');

        // Weiterleitung zur Startseite
        window.location.href = '../index.html';
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