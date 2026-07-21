const toolbarButtons = [
    {
        id: "undo",
        icon: "fa-undo",
        tooltip: "undo",
        position: { top: "10px", left: "10px" }
    },
    {
        id: "redo",
        icon: "fa-repeat", // In FA 4.7 heißt Redo "fa-repeat"
        tooltip: "redo",
        position: { top: "10px", left: "80px" }
    },
    {
        id: "settings",
        icon: "fa-cog",
        tooltip: "settings",
        position: { top: "10px", right: "10px" }
    },
    {
        id: "reset",
        icon: "fa-home",
        tooltip: "return to center",
        position: { bottom: "115px", right: "10px" }
    },
    {
        id: "zoom-in",
        icon: "fa-search-plus",
        tooltip: "zoom-in",
        position: { bottom: "80px", right: "10px" }
    },
    {
        id: "zoom-out",
        icon: "fa-search-minus",
        tooltip: "zoom-out",
        position: { bottom: "45px", right: "10px" }
    },
    {
        id: "fullscreen",
        icon: "fa-expand",
        tooltip: "expand",
        position: { bottom: "10px", right: "10px" }
    }
    
];



function renderToolbarButtons() {
    const container = document.querySelector('.cordSystemContainer');
    if (!container) return;

    toolbarButtons.forEach(btnData => {
        const btn = document.createElement('button');
        btn.id = btnData.id;
        btn.className = 'coord-btn';
        btn.title = btnData.tooltip;
        btn.innerHTML = `<i class="fa ${btnData.icon}"></i>`;

        // Positionen zuweisen
        if (btnData.position) {
            Object.keys(btnData.position).forEach(key => {
                btn.style[key] = btnData.position[key];
            });
        }

        // Event-Listener spezifisch für den Fullscreen-Button
        btn.addEventListener('click', () => {
            if (btnData.id === 'fullscreen') {
                toggleFullscreen();
            } else {
                console.log(`Button ${btnData.id} geklickt!`);
            }
        });

        container.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', renderToolbarButtons);


// Funktion zum Umschalten des Fullscreen-Modus
function toggleFullscreen() {
    const container = document.querySelector('.functionsContainer');
    const fullscreenBtnIcon = document.querySelector('#fullscreen i');
    const targetElement = document.querySelector('.topNavlistContainer');

    if (container) {
        // Fullscreen toggeln
        container.classList.toggle('is-fullscreen');

        // Icon toggeln
        if (fullscreenBtnIcon) {
            fullscreenBtnIcon.classList.toggle('fa-expand');
            fullscreenBtnIcon.classList.toggle('fa-compress');
        }

        // Klasse toggeln (schaltet display: flex an/aus)
        if (targetElement) {
            targetElement.classList.toggle('is-visible');
        }
    }
}

// Schließen des Fullscreen-Modus mit der ESC-Taste
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const container = document.querySelector('.functionsContainer');
        if (container && container.classList.contains('is-fullscreen')) {
            toggleFullscreen();
        }
    }
});

function initSecondNavToggle() {
    const navBtn = document.querySelector('#buttonForSecondNavList');
    const secondNav = document.querySelector('.secondNavList');

    if (navBtn && secondNav) {
        navBtn.addEventListener('click', () => {
            // Toggelt das Menü (Auf-/Zuklappen)
            secondNav.classList.toggle('is-open');
            
            // Toggelt den Button (damit sich die Pfeile drehen)
            navBtn.classList.toggle('is-open');
        });
    }
}

// Initialisieren, sobald das HTML geladen ist
document.addEventListener('DOMContentLoaded', initSecondNavToggle);




function initAccordionOutput() {
    const loesungBtn = document.querySelector('.loesungText');
    const loesungOutput = document.querySelector('#loesungOutput');
    const rechenwegDiv = document.querySelector('.rechenwegDiv');

    const rechenwegBtn = document.querySelector('.rechenwegText');
    const rechenwegOutput = document.querySelector('#rechenwegOutput');

    // 1. Ergebnisse ausklappen & Rechenweg-Button anzeigen
    if (loesungBtn && loesungOutput) {
        loesungBtn.addEventListener('click', () => {
            const isOpen = loesungOutput.classList.toggle('is-open');
            loesungBtn.classList.toggle('is-open');

            // Rechenweg-Bereich anzeigen/verstecken
            if (rechenwegDiv) {
                if (isOpen) {
                    rechenwegDiv.classList.add('is-visible');
                } else {
                    rechenwegDiv.classList.remove('is-visible');
                    // Wenn Ergebnisse zugeklappt werden, klappen wir den Rechenweg gleich mit zu
                    if (rechenwegOutput) rechenwegOutput.classList.remove('is-open');
                    if (rechenwegBtn) rechenwegBtn.classList.remove('is-open');
                }
            }
        });
    }

    // 2. Rechenweg ausklappen
    if (rechenwegBtn && rechenwegOutput) {
        rechenwegBtn.addEventListener('click', () => {
            rechenwegOutput.classList.toggle('is-open');
            rechenwegBtn.classList.toggle('is-open');
        });
    }
}

// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', initAccordionOutput);




function initAddFunctionModal() {
    const addBtn = document.querySelector('#addFunctionButton');
    const modal = document.querySelector('#functionModal');
    const cancelBtn = document.querySelector('#cancelFunctionBtn');
    const saveBtn = document.querySelector('#saveFunctionBtn');
    const input = document.querySelector('#functionInput'); // math-field Element
    const container = document.querySelector('.allFunctionsContainer');

    if (!addBtn || !modal || !cancelBtn || !saveBtn || !input || !container) return;

    // 1. Popup öffnen
    addBtn.addEventListener('click', () => {
        input.value = ''; // Formelfeld leeren
        modal.classList.add('is-visible');
        
        // Kleines Timeout, damit der Fokus nach dem Einblenden zuverlässig greift
        setTimeout(() => input.focus(), 50); 
    });

    // 2. Schließen (Abbrechen)
    const closeModal = () => {
        modal.classList.remove('is-visible');
    };

    cancelBtn.addEventListener('click', closeModal);

    // Klick außerhalb schließt Modal
    modal.addEventListener('click', (event) => {
    // Prüfen, ob wirklich direkt das Overlay (und nicht die Tastatur) geklickt wurde
    if (event.target === modal) {
        closeModal();
    }
});

    // 3. Funktion hinzufügen
    const addFunction = () => {
        // .value gibt bei math-field den LaTeX-String zurück
        const latexValue = input.value.trim();

        if (latexValue !== '') {
            const newFuncDiv = document.createElement('div');
            newFuncDiv.className = 'functionexample function-item';

            // Erstellt ein schreibgeschütztes math-field für schönes Rendering in der Liste
            newFuncDiv.innerHTML = `<math-field read-only>${latexValue}</math-field>`;

            container.appendChild(newFuncDiv);
            closeModal();
        }
    };

    saveBtn.addEventListener('click', addFunction);

    // 4. Tastatur-Support (Enter = Speichern, ESC = Abbrechen)
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Verhindert Zeilenumbruch im Formelfeld
            addFunction();
        } else if (event.key === 'Escape') {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', initAddFunctionModal);



// Globales Objekt mit allen Einstellungen
const settingsState = {
    showGrid: true,
    showAxes: true,
    showLabels: true,
    showLegend: true,
    markRoots: true,
    markIntersects: true,
    markYIntercept: true,
    autoScale: true,
    aspectRatio: false,
    zoomMouseWheel: true,
    panEnabled: true
};

function initSettingsModal() {
    const settingsBtn = document.querySelector('#settings'); // Toolbar Button
    const settingsModal = document.querySelector('#settingsModal');
    const closeBtn = document.querySelector('#closeSettingsBtn');

    if (!settingsModal || !closeBtn) return;

    // 1. Modal öffnen
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('is-visible');
        });
    }

    // 2. Modal schließen (per Button)
    const closeModal = () => {
        settingsModal.classList.remove('is-visible');
    };

    closeBtn.addEventListener('click', closeModal);

    // Per ESC-Taste schließen
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && settingsModal.classList.contains('is-visible')) {
            closeModal();
        }
    });

    // 3. Status-Updates bei Änderungen der Switches (Live Preview!)
    const checkboxes = settingsModal.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const key = e.target.id.replace('set-', '');
            
            if (key in settingsState) {
                settingsState[key] = e.target.checked;
                console.log(`Live-Update für "${key}":`, settingsState[key]);
                
                // Hier rufst du deine Funktion auf, die das Koordinatensystem neu zeichnet:
                // renderCoordinateSystem();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initSettingsModal);




// Beispiel-Datenstruktur für deine analysierten Funktionen
const exampleFunctionsData = [
    {
        name: "f(x) = x² - 4",
        nullstellen: "N₁(2 | 0), N₂(-2 | 0)",
        yAbschnitt: "S_y(0 | -4)",
        extrempunkte: "Tiefpunkt T(0 | -4)",
        wendepunkte: "Keine",
        symmetrie: "Achsensymmetrisch"
    },
    {
        name: "g(x) = 2x + 1",
        nullstellen: "N(-0.5 | 0)",
        yAbschnitt: "S_y(0 | 1)",
        extrempunkte: "Keine",
        wendepunkte: "Keine",
        symmetrie: "Keine"
    }
];

function renderResultsTable(functionsData) {
    const table = document.querySelector('#resultsTable');
    if (!table) return;

    // Table leeren
    table.innerHTML = '';

    // --- 1. HEAD (Für Desktop) ---
    const thead = document.createElement('thead');
    let headHTML = '<tr><th>Kennwert</th>';
    functionsData.forEach(fn => {
        headHTML += `<th>${fn.name}</th>`;
    });
    headHTML += '</tr>';
    thead.innerHTML = headHTML;
    table.appendChild(thead);

    // --- 2. BODY (Zeilen für Kennwerte) ---
    const tbody = document.createElement('tbody');

    // Liste aller Kategorien, die ausgegeben werden sollen
    const categories = [
        { key: 'nullstellen', label: 'Nullstellen' },
        { key: 'yAbschnitt', label: 'y-Achsenabschnitt' },
        { key: 'extrempunkte', label: 'Extrempunkte' },
        { key: 'wendepunkte', label: 'Wendepunkte' },
        { key: 'symmetrie', label: 'Symmetrie' }
    ];

    // Für jede Kategorie eine Tabellenzeile erstellen
    categories.forEach(cat => {
        const tr = document.createElement('tr');

        // Erste Spalte: Kategorie-Name
        let rowHTML = `<td class="mobile-card-header"><strong>${cat.label}</strong></td>`;

        // Für jede Funktion den entsprechenden Wert einfügen
        functionsData.forEach(fn => {
            const val = fn[cat.key] || '-';
            // data-label sorgt auf Mobile für den vorangestellten Text!
            rowHTML += `<td data-label="${cat.label}:">${val}</td>`;
        });

        tr.innerHTML = rowHTML;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}

// Testaufruf zum Testen
document.addEventListener('DOMContentLoaded', () => {
    renderResultsTable(exampleFunctionsData);
});