document.querySelector('.loginForm').addEventListener('submit', function(event) {
    const usernameError = document.getElementById('usernameError');
    const formError = document.getElementById('formError');
    
    const usernameInput = document.getElementById('userName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfInput = document.getElementById('passwordConf');
    const privacyCheckbox = document.getElementById('privacyAccept');

    // Erstmal alle Fehlertexte und ALLE Rahmenfarben zurücksetzen
    usernameError.style.display = 'none';
    usernameError.textContent = '';
    formError.style.display = 'none';
    formError.textContent = '';
    
    [usernameInput, emailInput, passwordInput, passwordConfInput].forEach(input => {
        input.style.borderColor = 'var(--border-color)';
    });

    let isValid = true;

    // 1. Username prüfen
    if (!usernameInput.value.trim()) {
        isValid = false;
        usernameInput.style.borderColor = 'var(--accent-error)';
        usernameError.textContent = 'Bitte gib einen Benutzernamen ein.';
        usernameError.style.display = 'block';
    }

    // 2. E-Mail, Passwörter & Checkbox prüfen
    let generalErrorMessage = '';

    if (!emailInput.checkValidity()) {
        isValid = false;
        emailInput.style.borderColor = 'var(--accent-error)';
        generalErrorMessage = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    } 
    // FEHLER BEHOBEN: Hier wird jetzt auch die Mindestlänge von 6 Zeichen beim Absenden geprüft!
    else if (!passwordInput.value || passwordInput.value.length < 6 || !passwordConfInput.value) {
        isValid = false;
        if(!passwordInput.value || passwordInput.value.length < 6) passwordInput.style.borderColor = 'var(--accent-error)';
        if(!passwordConfInput.value) passwordConfInput.style.borderColor = 'var(--accent-error)';
        generalErrorMessage = 'Das Passwort muss mindestens 6 Zeichen lang sein.';
    } else if (passwordInput.value !== passwordConfInput.value) {
        isValid = false;
        passwordConfInput.style.borderColor = 'var(--accent-error)';
        passwordInput.style.borderColor = 'var(--accent-error)';
        generalErrorMessage = 'Die Passwörter stimmen nicht überein.';
    } else if (!privacyCheckbox.checked) {
        isValid = false;
        generalErrorMessage = 'Du musst die Datenschutzerklärung akzeptieren.';
    }

    if (generalErrorMessage) {
        formError.textContent = generalErrorMessage;
        formError.style.display = 'block';
    }

    if (!isValid) {
        event.preventDefault();
    }
});

// ==========================================================================
// LIVE-VALIDIERUNG (Beim Verlassen des Feldes)
// ==========================================================================

// Username
document.getElementById('userName').addEventListener('blur', function() {
    const usernameError = document.getElementById('usernameError');
    const name = this.value.trim();

    if (!name) {
        this.style.borderColor = 'var(--border-color)';
        return;
    }

    const vergebeneNamen = ["admin", "test", "max_mustermann"];

    if (vergebeneNamen.includes(name.toLowerCase())) {
        this.style.borderColor = 'var(--accent-error)';
        usernameError.textContent = `Der Name "${name}" ist bereits vergeben.`;
        usernameError.style.display = 'block';
    } else {
        this.style.borderColor = 'var(--accent-live)';
        usernameError.style.display = 'none';
    }
});

// E-Mail
document.getElementById('email').addEventListener('blur', function() {
    const formError = document.getElementById('formError');
    
    if (!this.value.trim()) {
        this.style.borderColor = 'var(--border-color)';
        return;
    }

    if (this.checkValidity()) {
        this.style.borderColor = 'var(--accent-live)';
        if (formError.textContent.includes('E-Mail-Adresse')) {
            formError.style.display = 'none';
        }
    } else {
        this.style.borderColor = 'var(--accent-error)';
        formError.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
        formError.style.display = 'block';
    }
});

// Passwort (Hauptfeld)
document.getElementById('password').addEventListener('blur', function() {
    const formError = document.getElementById('formError');
    const passwordConf = document.getElementById('passwordConf');

    if (!this.value) {
        this.style.borderColor = 'var(--border-color)';
        return;
    }

    if (this.value.length >= 6) {
        this.style.borderColor = 'var(--accent-live)';
        if (formError.textContent.includes('mindestens 6 Zeichen')) {
            formError.style.display = 'none';
        }
    } else {
        this.style.borderColor = 'var(--accent-error)';
        formError.textContent = 'Das Passwort muss mindestens 6 Zeichen lang sein.';
        formError.style.display = 'block';
    }

    if (passwordConf.value) {
        validatePasswordMatch();
    }
});

// Passwort-Bestätigung
document.getElementById('passwordConf').addEventListener('blur', function() {
    if (!this.value) {
        this.style.borderColor = 'var(--border-color)';
        return;
    }
    validatePasswordMatch();
});

// Gemeinsame Funktion für den Passwort-Match
function validatePasswordMatch() {
    const password = document.getElementById('password');
    const passwordConf = document.getElementById('passwordConf');
    const formError = document.getElementById('formError');

    if (!passwordConf.value) return;

    if (password.value === passwordConf.value && password.value.length >= 6) {
        passwordConf.style.borderColor = 'var(--accent-live)';
        password.style.borderColor = 'var(--accent-live)';
        if (formError.textContent.includes('stimmen nicht überein') || formError.textContent.includes('mindestens 6 Zeichen')) {
            formError.style.display = 'none';
        }
    } else {
        passwordConf.style.borderColor = 'var(--accent-error)';
        if (password.value !== passwordConf.value) {
            formError.textContent = 'Die Passwörter stimmen nicht überein.';
        }
        formError.style.display = 'block';
    }
}

// ==========================================================================
// ZURÜCKSETZEN BEIM TIPPEN (Optik-Fix für das "Grün-Problem")
// ==========================================================================
document.getElementById('userName').addEventListener('input', function() {
    // Wenn das Feld vorher valide (grün) war, lassen wir es grün! 
    // Es wird erst beim Tippen wieder violett, wenn es vorher rot war.
    if (this.style.borderColor === 'var(--accent-error)') {
        this.style.borderColor = 'var(--border-glow)';
    }
    document.getElementById('usernameError').style.display = 'none';
});

['email', 'password', 'passwordConf'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        const formError = document.getElementById('formError');
        
        // Nur auf Violett zurücksetzen, wenn es vorher einen Fehler (Rot) hatte
        if (this.style.borderColor === 'var(--accent-error)') {
            this.style.borderColor = 'var(--border-glow)';
        }
        
        // Echtzeit-Match-Prüfung während des Tippens
        const p1 = document.getElementById('password').value;
        const p2 = document.getElementById('passwordConf').value;
        
        if (p1 === p2 && p1.length >= 6) {
            document.getElementById('password').style.borderColor = 'var(--accent-live)';
            document.getElementById('passwordConf').style.borderColor = 'var(--accent-live)';
            formError.style.display = 'none';
        }
    });
});

document.getElementById('privacyAccept').addEventListener('change', function() {
    if (this.checked) {
        const formError = document.getElementById('formError');
        if (formError.textContent.includes('Datenschutzerklärung')) {
            formError.style.display = 'none';
        }
    }
});