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

const TAKEN_NAMES    = ['admin', 'test', 'max_mustermann', 'mathverse', 'moderator'];
const MIN_PW_LENGTH  = 6;
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]{3,20}$/;

window.MV.redirectIfLoggedIn("../index.html");

window.addEventListener('pageshow', (e) => {
    if (e.persisted) window.MV.redirectIfLoggedIn("../index.html");
});

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
    input.classList.remove('shake');
    void input.offsetWidth;
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
// VALIDATION FUNCTIONS
// ===========================================================================

function validateUsername(silent = false) {
    const val = usernameInput.value.trim();

    if (!val) {
        setError(usernameInput);
        if (!silent) showMsg(usernameError, 'Please enter a username.');
        return false;
    }

    if (!USERNAME_REGEX.test(val)) {
        setError(usernameInput);
        if (!silent) showMsg(usernameError, 'Only letters, numbers, _, - and . are allowed (3–20 characters).');
        return false;
    }

    if (TAKEN_NAMES.includes(val.toLowerCase()) || window.MV.isUsernameTaken(val)) {
        setError(usernameInput);
        if (!silent) showMsg(usernameError, `“${val}” is already taken.`);
        return false;
    }

    setValid(usernameInput);
    if (!silent) showSuccessMsg(usernameError, `“${val}” is available.`);
    return true;
}

function validateEmail(silent = false) {
    const val = emailInput.value.trim();

    if (!val) {
        setError(emailInput);
        if (!silent) showMsg(emailError, 'Please enter an email address.');
        return false;
    }
    if (!emailInput.checkValidity()) {
        setError(emailInput);
        if (!silent) showMsg(emailError, 'Please enter a valid email address.');
        return false;
    }
    if (window.MV.isEmailTaken(val)) {
        setError(emailInput);
        if (!silent) showMsg(emailError, 'An account already exists for this email address.');
        return false;
    }

    setValid(emailInput);
    if (!silent) hideMsg(emailError);
    return true;
}

function validatePassword(silent = false) {
    const val = passwordInput.value;

    if (!val) {
        setError(passwordInput);
        if (!silent) showMsg(formError, 'Please enter a password.');
        return false;
    }
    if (val.length < MIN_PW_LENGTH) {
        setError(passwordInput);
        if (!silent) showMsg(formError, `The password must be at least ${MIN_PW_LENGTH} characters long.`);
        return false;
    }

    setValid(passwordInput);
    return true;
}

function validatePasswordConf(silent = false) {
    const pw  = passwordInput.value;
    const pwc = passwordConfInput.value;

    if (!pwc) {
        setError(passwordConfInput);
        if (!silent) showMsg(formError, 'Please confirm your password.');
        return false;
    }
    if (pw !== pwc) {
        setError(passwordConfInput);
        if (!silent) showMsg(formError, 'The passwords do not match.');
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

// PASSWORD STRENGTH INDICATOR

function updateStrengthBar(pw) {
    if (!strengthWrapper) return;

    if (!pw) {
        strengthWrapper.style.display = 'none';
        return;
    }

    strengthWrapper.style.display = 'flex';
    const lvl = window.MV.getPasswordStrength(pw);
    strengthWrapper.dataset.strength = lvl;

    const labels = ['', 'Weak', 'Okay', 'Good', 'Strong'];
    strengthLabel.textContent = labels[lvl];
}

// BLUR EVENTS

usernameInput.addEventListener('blur', () => validateUsername());
emailInput.addEventListener('blur', () => validateEmail());
passwordInput.addEventListener('blur', () => {
    validatePassword();
    if (passwordConfInput.value) validatePasswordConf();
});
passwordConfInput.addEventListener('blur', () => validatePasswordConf());

// INPUT EVENTS

usernameInput.addEventListener('input', () => {
    usernameInput.classList.remove('shake');
    validateUsername();
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('is-error')) {
        emailInput.classList.remove('is-error', 'shake');
        hideMsg(emailError);
    }
});

passwordInput.addEventListener('input', () => {
    const pw = passwordInput.value;

    updateStrengthBar(pw);

    if (passwordInput.classList.contains('is-error')) {
        passwordInput.classList.remove('is-error', 'shake');
    }
    if (formError.textContent.includes('characters')) hideMsg(formError);

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

passwordInput.addEventListener('animationstart', (e) => {
    if (e.animationName === 'onAutoFillStart') {
        updateStrengthBar(passwordInput.value);
        if (passwordConfInput.value) {
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
        hideMsg(formError);
    }
});

// SUBMIT HANDLER

form.addEventListener('submit', (e) => {
    e.preventDefault();

    hideMsg(usernameError);
    hideMsg(emailError);
    hideMsg(formError);

    const usernameOk = validateUsername(true);
    const emailOk    = validateEmail(true);
    const passwordOk = validatePassword(true);
    const confOk     = validatePasswordConf(true);
    const privacyOk  = privacyCheckbox ? privacyCheckbox.checked : true;

    if (!usernameOk || !emailOk || !passwordOk || !confOk) {
        if (!usernameOk) validateUsername();
        if (!emailOk) validateEmail();
        if (!passwordOk) validatePassword();
        if (!confOk) validatePasswordConf();
        return;
    }

    if (!privacyOk) {
        setError(privacyCheckbox);
        showMsg(formError, 'You must accept the privacy policy to continue.');
        return;
    }

    const userData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value
    };

    const result = window.MV.registerUser(userData);
    if (!result.success) {
        showMsg(formError, result.message || 'Registration failed.');
        return;
    }

    const returnUrl = sessionStorage.getItem('mv-return-url') || (window.MV_BASE + '/index.html');
    sessionStorage.removeItem('mv-return-url');
    window.location.href = returnUrl;
});

privacyCheckbox.addEventListener('change', () => {
    if (privacyCheckbox.checked && formError.textContent.includes('privacy')) {
        hideMsg(formError);
    }
});

// PASSWORD-TOGGLE BUTTONS

function setupPasswordToggle(toggleId, inputEl) {
    const btn = document.getElementById(toggleId);
    if (!btn || !inputEl) return;

    btn.addEventListener('click', () => {
        const isHidden = inputEl.type === 'password';
        inputEl.type = isHidden ? 'text' : 'password';
        const icon = btn.querySelector('i');
        icon.className = isHidden ? 'fa fa-eye-slash' : 'fa fa-eye';
        btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
}

setupPasswordToggle('togglePassword', passwordInput);
setupPasswordToggle('togglePasswordConf', passwordConfInput);