const params = new URLSearchParams(window.location.search);
const token  = params.get('token') || '';

const formContainer = document.getElementById('resetFormContainer');
const invalidBox    = document.getElementById('invalidTokenBox');
const successBox    = document.getElementById('successBox');

const form           = formContainer.querySelector('.loginForm');
const newPwInput     = document.getElementById('password');
const confirmPwInput = document.getElementById('passwordConf');
const formError      = document.getElementById('formError');
const strengthWrapper = document.getElementById('strengthWrapper');
const strengthFill    = document.getElementById('strengthFill');
const strengthLabel   = document.getElementById('strengthLabel');

const MIN_PW_LENGTH = 6;

window.MV.redirectIfLoggedIn("../index.html");

function showMsg(el, msg) { el.textContent = msg; el.style.display = 'block'; }
function hideMsg(el) { if (el) el.style.display = 'none'; }
function setError(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-error');
    input.classList.remove('shake');
    void input.offsetWidth;
    input.classList.add('shake');
}
function setValid(input) {
    input.classList.remove('is-error', 'shake');
    input.classList.add('is-valid');
}

function updateStrengthBar(pw) {
    if (!strengthWrapper) return;
    if (!pw) { strengthWrapper.style.display = 'none'; return; }
    strengthWrapper.style.display = 'flex';
    const lvl = window.MV.getPasswordStrength(pw);
    strengthWrapper.dataset.strength = lvl;
    const labels = ['', 'Weak', 'Okay', 'Good', 'Strong'];
    strengthLabel.textContent = labels[lvl];
}

async function init() {
    if (!token) {
        formContainer.style.display = 'none';
        invalidBox.style.display = 'block';
        return;
    }
    const check = await window.MV.validatePasswordResetToken(token);
    if (!check.valid) {
        formContainer.style.display = 'none';
        invalidBox.style.display = 'block';
    }
}
init();

newPwInput.addEventListener('input', () => {
    updateStrengthBar(newPwInput.value);
    if (newPwInput.classList.contains('is-error')) newPwInput.classList.remove('is-error', 'shake');
    hideMsg(formError);
});

confirmPwInput.addEventListener('input', () => {
    if (confirmPwInput.classList.contains('is-error')) confirmPwInput.classList.remove('is-error', 'shake');
    hideMsg(formError);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMsg(formError);

    const pw  = newPwInput.value;
    const pwc = confirmPwInput.value;

    if (!pw || pw.length < MIN_PW_LENGTH) {
        setError(newPwInput);
        showMsg(formError, `The password must be at least ${MIN_PW_LENGTH} characters long.`);
        return;
    }
    if (pw !== pwc) {
        setError(confirmPwInput);
        showMsg(formError, 'The passwords do not match.');
        return;
    }
    setValid(newPwInput);
    setValid(confirmPwInput);

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    const result = await window.MV.resetPasswordWithToken(token, pw);

    if (!result.success) {
        submitBtn.disabled = false;
        formContainer.style.display = 'none';
        invalidBox.style.display = 'block';
        return;
    }

    formContainer.style.display = 'none';
    successBox.style.display = 'block';
});

// Passwort-Sichtbarkeits-Toggles (gleiches Muster wie login.js/register.js)
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
setupPasswordToggle('togglePassword', newPwInput);
setupPasswordToggle('togglePasswordConf', confirmPwInput);