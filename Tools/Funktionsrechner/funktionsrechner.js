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

        const alreadyWiredElsewhere = ['fullscreen', 'zoom-in', 'zoom-out', 'reset'];
        btn.addEventListener('click', () => {
            if (btnData.id === 'fullscreen') {
                toggleFullscreen();
            } else if (!alreadyWiredElsewhere.includes(btnData.id)) {
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
        const isFullscreen = container.classList.contains('is-fullscreen');

        // Icon toggeln
        if (fullscreenBtnIcon) {
            fullscreenBtnIcon.classList.toggle('fa-expand');
            fullscreenBtnIcon.classList.toggle('fa-compress');
        }

        // Klasse toggeln (schaltet display: flex an/aus)
        if (targetElement) {
            targetElement.classList.toggle('is-visible');
        }

        // Favoriten-Herz in den zweiten Header verschieben, solange der
        // Hauptheader durch den Vollbild-Modus verdeckt ist – zurück an
        // seinen Ursprungsort (body), sobald Fullscreen verlassen wird.
        const heartBtn = document.querySelector('.tool-page-heart');
        const heartSlot = document.getElementById('boxForFavoriteHeart');
        if (heartBtn && heartSlot) {
            if (isFullscreen) {
                heartSlot.appendChild(heartBtn);
            } else {
                document.body.appendChild(heartBtn);
            }
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



// ==========================================================================
// KOORDINATENSYSTEM – SVG-Viewport mit Grid, Achsen, Pan & Zoom
// ==========================================================================
function initCoordinateSystem() {
    const container = document.querySelector(".cordSystemContainer");
    const svg = document.getElementById("functionGraphSvg");
    const gridGroup = document.getElementById("graphGrid");
    const axesGroup = document.getElementById("graphAxes");
    const labelsGroup = document.getElementById("graphLabels");
    if (!container || !svg || !gridGroup || !axesGroup || !labelsGroup) return;

    const svgNS = "http://www.w3.org/2000/svg";

    // ── Viewport-State ────────────────────────────────────────────────────
    // 1:1-Skalierung (mathematisch korrekt): eine Einheit ist auf x und y
    // gleich viele Pixel groß, damit z.B. Steigungen visuell stimmen.
    const viewport = {
        centerX: 0,
        centerY: 0,
        pixelsPerUnit: 40
    };

    let widthPx = 0;
    let heightPx = 0;

    // ── Koordinatentransformation ────────────────────────────────────────
    function toScreenX(mathX) { return widthPx / 2 + (mathX - viewport.centerX) * viewport.pixelsPerUnit; }
    function toScreenY(mathY) { return heightPx / 2 - (mathY - viewport.centerY) * viewport.pixelsPerUnit; }
    function toMathX(screenX) { return viewport.centerX + (screenX - widthPx / 2) / viewport.pixelsPerUnit; }
    function toMathY(screenY) { return viewport.centerY - (screenY - heightPx / 2) / viewport.pixelsPerUnit; }

    function clampZoom(value) {
        return Math.min(4000, Math.max(2, value));
    }

    // "Schöne" Schrittweite ermitteln (1/2/5 · 10^n), Ziel: ~70px pro Schritt
    function niceStep() {
        const targetPx = 70;
        const rawUnit = targetPx / viewport.pixelsPerUnit;
        const magnitude = Math.pow(10, Math.floor(Math.log10(rawUnit)));
        const residual = rawUnit / magnitude;
        let niceResidual;
        if (residual < 1.5) niceResidual = 1;
        else if (residual < 3.5) niceResidual = 2;
        else if (residual < 7.5) niceResidual = 5;
        else niceResidual = 10;
        return niceResidual * magnitude;
    }

    // Rundet Anzeige-Werte, um Fließkomma-Reste (0.30000000004) zu killen
    function formatLabel(value) {
        return (Math.round(value * 1e9) / 1e9).toString();
    }

    function el(tag, attrs) {
        const node = document.createElementNS(svgNS, tag);
        Object.entries(attrs).forEach(([key, val]) => node.setAttribute(key, val));
        return node;
    }

    // ── Zeichnen ──────────────────────────────────────────────────────────
    function render() {
        if (widthPx === 0 || heightPx === 0) return;

        svg.setAttribute("viewBox", `0 0 ${widthPx} ${heightPx}`);

        const step = niceStep();
        const minX = toMathX(0), maxX = toMathX(widthPx);
        const minY = toMathY(heightPx), maxY = toMathY(0);

        gridGroup.innerHTML = "";
        labelsGroup.innerHTML = "";
        axesGroup.innerHTML = "";

        const originScreenX = toScreenX(0);
        const originScreenY = toScreenY(0);
        const xAxisVisible = minY <= 0 && 0 <= maxY;
        const yAxisVisible = minX <= 0 && 0 <= maxX;

        // Vertikale Linien (konstantes x)
        const startXi = Math.floor(minX / step);
        const endXi = Math.ceil(maxX / step);
        for (let i = startXi; i <= endXi; i++) {
            const sx = toScreenX(i * step);
            gridGroup.appendChild(el("line", { class: "graphGridLine", x1: sx, y1: 0, x2: sx, y2: heightPx }));

            if (i !== 0) {
                const label = el("text", {
                    class: "graphAxisLabel",
                    x: sx + 4,
                    y: xAxisVisible ? originScreenY - 6 : 14
                });
                label.textContent = formatLabel(i * step);
                labelsGroup.appendChild(label);
            }
        }

        // Horizontale Linien (konstantes y)
        const startYi = Math.floor(minY / step);
        const endYi = Math.ceil(maxY / step);
        for (let i = startYi; i <= endYi; i++) {
            const sy = toScreenY(i * step);
            gridGroup.appendChild(el("line", { class: "graphGridLine", x1: 0, y1: sy, x2: widthPx, y2: sy }));

            if (i !== 0) {
                const label = el("text", {
                    class: "graphAxisLabel",
                    x: yAxisVisible ? originScreenX + 6 : 4,
                    y: sy - 4
                });
                label.textContent = formatLabel(i * step);
                labelsGroup.appendChild(label);
            }
        }

        // Achsen
        if (yAxisVisible) {
            axesGroup.appendChild(el("line", { class: "graphAxisLine", x1: originScreenX, y1: 0, x2: originScreenX, y2: heightPx }));
        }
        if (xAxisVisible) {
            axesGroup.appendChild(el("line", { class: "graphAxisLine", x1: 0, y1: originScreenY, x2: widthPx, y2: originScreenY }));
        }
    }

    // ── Größenänderung (Container-Resize, inkl. Fullscreen-Toggle) ────────
    const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        widthPx = entry.contentRect.width;
        heightPx = entry.contentRect.height;
        render();
    });
    resizeObserver.observe(container);

    // ── Pointer-Interaktionen: Pan (1 Finger/Maus) & Pinch-Zoom (2 Finger) ──
    const activePointers = new Map(); // pointerId -> {x, y}
    let panStartScreen = null;
    let panStartCenter = null;
    let pinchStartDistance = null;
    let pinchStartZoom = null;

    function distanceBetween(p1, p2) {
        return Math.hypot(p1.x - p2.x, p1.y - p2.y);
    }

    svg.addEventListener("pointerdown", (e) => {
        if (e.button !== undefined && e.button > 0) return; // nur Links-/Primärklick
        svg.setPointerCapture(e.pointerId);
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.size === 1) {
            panStartScreen = { x: e.clientX, y: e.clientY };
            panStartCenter = { x: viewport.centerX, y: viewport.centerY };
            svg.classList.add("is-panning");
        } else if (activePointers.size === 2) {
            const pts = Array.from(activePointers.values());
            pinchStartDistance = distanceBetween(pts[0], pts[1]);
            pinchStartZoom = viewport.pixelsPerUnit;
            panStartScreen = null; // Pan pausiert während Pinch
        }
    });

    svg.addEventListener("pointermove", (e) => {
        if (!activePointers.has(e.pointerId)) return;
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (activePointers.size === 2 && pinchStartDistance) {
            const pts = Array.from(activePointers.values());
            const distance = distanceBetween(pts[0], pts[1]);
            viewport.pixelsPerUnit = clampZoom(pinchStartZoom * (distance / pinchStartDistance));
            render();
            return;
        }

        if (activePointers.size === 1 && panStartScreen) {
            const dxPx = e.clientX - panStartScreen.x;
            const dyPx = e.clientY - panStartScreen.y;
            viewport.centerX = panStartCenter.x - dxPx / viewport.pixelsPerUnit;
            viewport.centerY = panStartCenter.y + dyPx / viewport.pixelsPerUnit;
            render();
        }
    });

    function endPointer(e) {
        activePointers.delete(e.pointerId);
        try { svg.releasePointerCapture(e.pointerId); } catch (err) { /* bereits freigegeben */ }

        if (activePointers.size < 2) pinchStartDistance = null;

        if (activePointers.size === 1) {
            // Von Pinch zurück zu Pan: neuen Startpunkt setzen, damit der
            // verbleibende Finger nicht springt
            const remaining = Array.from(activePointers.values())[0];
            panStartScreen = { x: remaining.x, y: remaining.y };
            panStartCenter = { x: viewport.centerX, y: viewport.centerY };
        }

        if (activePointers.size === 0) {
            panStartScreen = null;
            svg.classList.remove("is-panning");
        }
    }
    svg.addEventListener("pointerup", endPointer);
    svg.addEventListener("pointercancel", endPointer);

    // ── Zoom (Mausrad, zentriert um den Cursor) ─────────────────────────────
    svg.addEventListener("wheel", (e) => {
        e.preventDefault();
        const rect = svg.getBoundingClientRect();
        const cursorScreenX = e.clientX - rect.left;
        const cursorScreenY = e.clientY - rect.top;
        const cursorMathXBefore = toMathX(cursorScreenX);
        const cursorMathYBefore = toMathY(cursorScreenY);

        const zoomFactor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
        viewport.pixelsPerUnit = clampZoom(viewport.pixelsPerUnit * zoomFactor);

        // Punkt unter dem Cursor bleibt an derselben Bildschirmposition
        viewport.centerX = cursorMathXBefore - (cursorScreenX - widthPx / 2) / viewport.pixelsPerUnit;
        viewport.centerY = cursorMathYBefore + (cursorScreenY - heightPx / 2) / viewport.pixelsPerUnit;

        render();
    }, { passive: false });

    // ── Toolbar-Buttons anbinden ─────────────────────────────────────────
    document.getElementById("zoom-in")?.addEventListener("click", () => {
        viewport.pixelsPerUnit = clampZoom(viewport.pixelsPerUnit * 1.3);
        render();
    });
    document.getElementById("zoom-out")?.addEventListener("click", () => {
        viewport.pixelsPerUnit = clampZoom(viewport.pixelsPerUnit / 1.3);
        render();
    });
    document.getElementById("reset")?.addEventListener("click", () => {
        viewport.centerX = 0;
        viewport.centerY = 0;
        viewport.pixelsPerUnit = 40;
        render();
    });
}

document.addEventListener("DOMContentLoaded", initCoordinateSystem);