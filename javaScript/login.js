document.querySelector('.loginForm').addEventListener('submit', function(event) {
    const usernameError = document.getElementById('usernameError');
    const formError = document.getElementById('formError');
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Reset vor der Prüfung
    usernameError.style.display = 'none';
    usernameError.textContent = '';
    formError.style.display = 'none';
    formError.textContent = '';
    
    [usernameInput, passwordInput].forEach(input => {
        input.style.borderColor = 'var(--border-color)';
    });

    let isValid = true;

    // 1. Prüfen ob Username/E-Mail ausgefüllt ist
    if (!usernameInput.value.trim()) {
        isValid = false;
        usernameInput.style.borderColor = 'var(--accent-error)';
        usernameError.textContent = 'Bitte gib deinen Benutzernamen oder deine E-Mail-Adresse ein.';
        usernameError.style.display = 'block';
    }

    // 2. Prüfen ob Passwort ausgefüllt ist
    if (!passwordInput.value) {
        isValid = false;
        passwordInput.style.borderColor = 'var(--accent-error)';
        formError.textContent = 'Bitte gib dein Passwort ein.';
        formError.style.display = 'block';
    }

    if (!isValid) {
        event.preventDefault();
    }
});

// ==========================================================================
// LIVE-VALIDIERUNG (Beim Verlassen des Feldes -> Grün-Logik)
// ==========================================================================

// Username / E-Mail
document.getElementById('username').addEventListener('blur', function() {
    const usernameError = document.getElementById('usernameError');
    if (!this.value.trim()) {
        this.style.borderColor = 'var(--border-color)';
        return;
    }
    
    // Einfache Live-Validierung: Wenn Text drin steht, ist es für den Client erstmal valide (Grün)
    this.style.borderColor = 'var(--accent-live)';
    usernameError.style.display = 'none';
});

// Passwort
document.getElementById('password').addEventListener('blur', function() {
    const formError = document.getElementById('formError');
    if (!this.value) {
        this.style.borderColor = 'var(--border-color)';
        return;
    }

    // Für das Login reicht es, wenn überhaupt etwas eingegeben wurde
    this.style.borderColor = 'var(--accent-live)';
    formError.style.display = 'none';
});

// ==========================================================================
// ZURÜCKSETZEN BEIM TIPPEN (Kein Flackern von Grün auf Violett)
// ==========================================================================
['username', 'password'].forEach(id => {
    document.getElementById(id).addEventListener('input', function() {
        const usernameError = document.getElementById('usernameError');
        const formError = document.getElementById('formError');

        // Nur auf Violett setzen, wenn das Feld aktuell einen Fehler (Rot) anzeigt
        if (this.style.borderColor === 'var(--accent-error)') {
            this.style.borderColor = 'var(--border-glow)';
        }

        // Fehlertexte beim Tippen ausblenden
        if (id === 'username') {
            usernameError.style.display = 'none';
        } else {
            formError.style.display = 'none';
        }
    });
});