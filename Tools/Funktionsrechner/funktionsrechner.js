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




// ==========================================================================
// FUNKTIONSLISTE – Zustand, Buchstaben-/Farbvergabe, Rendering
// ==========================================================================

const FUNCTION_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Gleiche 6 Akzentfarben wie die Theme-Auswahl in der UserArea (siehe
// THEMES in common-login.js) – konsistent mit dem Rest der Website statt
// neue, beliebige Farben einzuführen. Ab der 7. Funktion wiederholt sich
// der Zyklus.
const FUNCTION_COLORS = ["#8a16ff", "#00ffcc", "#1e90ff", "#ff2d78", "#ff6a00", "#f5c518"];

let functionsState = [];
let nextFunctionId = 1;
let editingFunctionId = null;
let openFunctionMenuId = null;
let openFunctionModalForEdit = () => {}; // wird in initAddFunctionModal() gesetzt
let requestGraphRedraw = () => {}; // wird in initCoordinateSystem() gesetzt

// Buchstabe nach Listenposition: A, B, ... Z, A1, B1, ... Z1, A2, ...
// Buchstabe UND Farbe werden aus der Position berechnet, nicht fest pro
// Funktion gespeichert – beim Löschen rücken nachfolgende Funktionen nach.
function letterForIndex(index) {
    const cycle = Math.floor(index / FUNCTION_LETTERS.length);
    const base = FUNCTION_LETTERS[index % FUNCTION_LETTERS.length];
    return cycle === 0 ? base : `${base}${cycle}`;
}

function colorForIndex(index) {
    return FUNCTION_COLORS[index % FUNCTION_COLORS.length];
}

// Leichte Eingabe-Hygiene für die Modal-Validierung. Eine vollständige
// mathematische Prüfung (lässt sich die Formel auswerten?) folgt mit der
// Funktionsdarstellung im Koordinatensystem – dafür wird der bestehende
// Parser aus Formel Umformer/Gleichungslöser wiederverwendet statt hier
// ein drittes Mal nachgebaut zu werden.
function validateFunctionInput(latex) {
    if (!latex || !latex.trim()) {
        return "Bitte gib eine Funktion ein.";
    }

    const openers = { "{": "}", "(": ")", "[": "]" };
    const closers = { "}": "{", ")": "(", "]": "[" };
    const stack = [];

    for (const ch of latex) {
        if (openers[ch]) stack.push(ch);
        else if (closers[ch] && stack.pop() !== closers[ch]) {
            return "Die Klammern in deiner Funktion sind nicht korrekt geschlossen.";
        }
    }
    if (stack.length > 0) {
        return "Die Klammern in deiner Funktion sind nicht korrekt geschlossen.";
    }

    // Echte mathematische Prüfung: lässt sich die Formel überhaupt auswerten?
    try {
        compileGraphFormula(latex);
    } catch (err) {
        return err instanceof GraphFormulaError
            ? err.message
            : "Diese Funktion konnte nicht verarbeitet werden. Bitte überprüfe deine Eingabe.";
    }

    return null; // gültig
}

function renderFunctionsList() {
    const container = document.querySelector('.allFunctionsContainer');
    if (!container) return;

    if (functionsState.length === 0) {
        container.innerHTML = `<p class="functionListEmpty">Noch keine Funktion hinzugefügt.</p>`;
        requestGraphRedraw();
        return;
    }

    container.innerHTML = functionsState.map((fn, index) => {
        const letter = letterForIndex(index);
        const color = colorForIndex(index);
        const visibilityIcon = fn.visible ? "fa-eye" : "fa-eye-slash";
        const visibilityLabel = fn.visible ? "Ausblenden" : "Einblenden";
        const menuOpen = openFunctionMenuId === fn.id;

        return `
            <div class="function-item ${fn.visible ? "" : "is-hidden"}" data-id="${fn.id}">
                <span class="functionLetter">${letter}</span>
                <span class="functionColorDot" style="background-color:${color}; color:${color};"></span>
                <div class="functionFormula"><math-field read-only>${fn.latex}</math-field></div>
                <button type="button" class="functionVisibilityBtn ${fn.visible ? "" : "is-hidden-state"}" data-action="toggle-visibility" aria-label="${visibilityLabel}">
                    <i class="fa ${visibilityIcon}"></i>
                </button>
                <div class="functionMenuWrapper">
                    <button type="button" class="functionMenuBtn" data-action="toggle-menu" aria-haspopup="true" aria-expanded="${menuOpen}" aria-label="Menü öffnen">
                        <i class="fa fa-ellipsis-v"></i>
                    </button>
                    <div class="functionMenuDropdown ${menuOpen ? "is-open" : ""}">
                        <button type="button" class="functionMenuItem" data-action="edit"><i class="fa fa-pencil"></i> Bearbeiten</button>
                        <button type="button" class="functionMenuItem functionMenuItem--danger" data-action="delete"><i class="fa fa-trash"></i> Löschen</button>
                    </div>
                </div>
            </div>`;
    }).join("");

    requestGraphRedraw();
}

function closeFunctionMenu() {
    if (openFunctionMenuId === null) return;
    openFunctionMenuId = null;
    renderFunctionsList();
}

// Event-Delegation: ein Listener für Sichtbarkeit, Menü, Bearbeiten, Löschen
// statt pro Zeile einzeln zu binden (Liste wird bei jeder Änderung neu gerendert).
function initFunctionListEvents() {
    const container = document.querySelector('.allFunctionsContainer');
    if (!container) return;

    container.addEventListener('click', (event) => {
        const actionBtn = event.target.closest('[data-action]');
        if (!actionBtn) return;

        const item = actionBtn.closest('.function-item');
        const id = item ? parseInt(item.dataset.id, 10) : null;
        const action = actionBtn.dataset.action;

        event.stopPropagation();

        if (action === 'toggle-visibility' && id !== null) {
            const fn = functionsState.find(f => f.id === id);
            if (fn) fn.visible = !fn.visible;
            openFunctionMenuId = null;
        } else if (action === 'toggle-menu' && id !== null) {
            openFunctionMenuId = (openFunctionMenuId === id) ? null : id;
        } else if (action === 'edit' && id !== null) {
            openFunctionMenuId = null;
            openFunctionModalForEdit(id);
        } else if (action === 'delete' && id !== null) {
            functionsState = functionsState.filter(f => f.id !== id);
            openFunctionMenuId = null;
        }

        renderFunctionsList();
    });

    // Menü schließen bei Klick außerhalb oder Escape
    document.addEventListener('click', closeFunctionMenu);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeFunctionMenu();
    });
}

// ==========================================================================
// MODAL "FUNKTION HINZUFÜGEN" / "BEARBEITEN"
// ==========================================================================
function initAddFunctionModal() {
    const addBtn = document.querySelector('#addFunctionButton');
    const modal = document.querySelector('#functionModal');
    const modalTitle = document.querySelector('#functionModalTitle');
    const cancelBtn = document.querySelector('#cancelFunctionBtn');
    const saveBtn = document.querySelector('#saveFunctionBtn');
    const input = document.querySelector('#functionInput'); // math-field Element
    const errorBox = document.getElementById('errorMessages');

    if (!addBtn || !modal || !modalTitle || !cancelBtn || !saveBtn || !input || !errorBox) return;

    let modalErrorValue = null; // Wert, der zum aktuell angezeigten Fehler geführt hat

    function showModalError(msg, value) {
        errorBox.textContent = msg;
        errorBox.style.display = 'block';
        modalErrorValue = value;
    }

    function hideModalError() {
        errorBox.style.display = 'none';
        modalErrorValue = null;
    }

    function openModal() {
        hideModalError();
        modal.classList.add('is-visible');
        setTimeout(() => input.focus(), 50);
    }

    // 1. Popup öffnen (Neu)
    addBtn.addEventListener('click', () => {
        editingFunctionId = null;
        modalTitle.textContent = 'Neue Funktion hinzufügen';
        saveBtn.textContent = 'Funktion hinzufügen';
        input.value = '';
        openModal();
    });

    // 1b. Popup öffnen (Bearbeiten) – von initFunctionListEvents() aufgerufen
    openFunctionModalForEdit = (id) => {
        const fn = functionsState.find(f => f.id === id);
        if (!fn) return;
        editingFunctionId = id;
        modalTitle.textContent = 'Funktion bearbeiten';
        saveBtn.textContent = 'Änderungen speichern';
        input.value = fn.latex;
        openModal();
    };

    // 2. Schließen (Abbrechen)
    const closeModal = () => {
        modal.classList.remove('is-visible');
        editingFunctionId = null;
    };

    cancelBtn.addEventListener('click', closeModal);

    // Klick außerhalb schließt Modal
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    // 3. Funktion speichern (Neu ODER Bearbeiten)
    const saveFunction = () => {
        const latexValue = input.value.trim();
        const error = validateFunctionInput(latexValue);

        if (error) {
            showModalError(error, latexValue);
            return;
        }

        // Kompilierung kann hier praktisch nicht mehr fehlschlagen (validateFunctionInput
        // hat das bereits geprüft) – try/catch bleibt trotzdem als Sicherheitsnetz,
        // damit ein unvorhergesehener Fall die Funktion nicht zeichnet statt abzustürzen.
        let ast = null;
        try { ast = compileGraphFormula(latexValue); } catch (err) { /* siehe Kommentar oben */ }

        if (editingFunctionId !== null) {
            const fn = functionsState.find(f => f.id === editingFunctionId);
            if (fn) { fn.latex = latexValue; fn.ast = ast; }
        } else {
            functionsState.push({ id: nextFunctionId++, latex: latexValue, visible: true, ast });
        }

        renderFunctionsList();
        closeModal();
    };

    saveBtn.addEventListener('click', saveFunction);

    // 4. Tastatur-Support (Enter = Speichern, ESC = Abbrechen)
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Verhindert Zeilenumbruch im Formelfeld
            saveFunction();
        } else if (event.key === 'Escape') {
            closeModal();
        }
    });

    input.addEventListener('input', () => {
        // MathLive feuert bei Enter intern zusätzlich ein "input"-Event mit
        // demselben (weiterhin ungültigen) Wert – dieses Echo würde die
        // gerade erst gezeigte Fehlermeldung sofort wieder verstecken.
        // Nur bei einer TATSÄCHLICHEN Wertänderung ausblenden.
        if (modalErrorValue !== null && input.value.trim() === modalErrorValue) return;
        hideModalError();
    });

    // ── MathLive Tastatur-Layout (bisher nicht gesetzt) ────────────────────
    customElements.whenDefined("math-field").then(() => {
        try {
            if (window.mathVirtualKeyboard) {
                window.mathVirtualKeyboard.layouts = ["numeric", "alphabetic", "greek"];
            }
        } catch (e) { /* Version-abhängig, kein Blocker */ }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initAddFunctionModal();
    initFunctionListEvents();
    renderFunctionsList();
});


// ==========================================================================
// FUNKTIONSAUSWERTUNG – schlanker Parser NUR für numerische Auswertung an
// einer x-Stelle (kein Gleichungen-Lösen nötig, daher bewusst NICHT die
// große Engine aus Formel Umformer/Gleichungslöser wiederverwendet)
// ==========================================================================

class GraphFormulaError extends Error {}

function tokenizeGraphFormula(latex) {
    const tokens = [];
    let i = 0;
    const n = latex.length;

    while (i < n) {
        const ch = latex[i];
        if (/\s/.test(ch)) { i++; continue; }

        if (ch === "\\") {
            let j = i + 1;
            while (j < n && /[a-zA-Z]/.test(latex[j])) j++;
            const cmd = latex.slice(i + 1, j);
            i = j;
            switch (cmd) {
                case "left": case "right": continue;
                case "cdot": case "times": tokens.push({ type: "MUL" }); continue;
                case "div": tokens.push({ type: "DIV" }); continue;
                case "frac": tokens.push({ type: "FRAC" }); continue;
                case "sqrt": tokens.push({ type: "SQRT" }); continue;
                case "pi": tokens.push({ type: "CONST", name: "pi" }); continue;
                case "sin": case "cos": case "tan": case "ln":
                    tokens.push({ type: "FUNC", name: cmd }); continue;
                default:
                    throw new GraphFormulaError(`Der Befehl „${cmd}" wird hier nicht unterstützt.`);
            }
        }

        if (ch === "{") { tokens.push({ type: "LBRACE" }); i++; continue; }
        if (ch === "}") { tokens.push({ type: "RBRACE" }); i++; continue; }
        if (ch === "(") { tokens.push({ type: "LPAREN" }); i++; continue; }
        if (ch === ")") { tokens.push({ type: "RPAREN" }); i++; continue; }
        if (ch === "|") { tokens.push({ type: "PIPE" }); i++; continue; }
        if (ch === "^") { tokens.push({ type: "CARET" }); i++; continue; }
        if (ch === "+") { tokens.push({ type: "PLUS" }); i++; continue; }
        if (ch === "-") { tokens.push({ type: "MINUS" }); i++; continue; }
        if (ch === "*") { tokens.push({ type: "MUL" }); i++; continue; }
        if (ch === "/") { tokens.push({ type: "DIV" }); i++; continue; }

        if (/[0-9]/.test(ch) || ((ch === "." || ch === ",") && /[0-9]/.test(latex[i + 1] || ""))) {
            let raw = "";
            while (i < n && /[0-9]/.test(latex[i])) { raw += latex[i]; i++; }
            if (latex[i] === "." || latex[i] === ",") {
                raw += "."; i++;
                while (i < n && /[0-9]/.test(latex[i])) { raw += latex[i]; i++; }
            }
            tokens.push({ type: "NUM", value: parseFloat(raw) });
            continue;
        }

        if (ch === "x") { tokens.push({ type: "VAR" }); i++; continue; }
        if (ch === "e") { tokens.push({ type: "CONST", name: "e" }); i++; continue; }
        if (/[a-zA-Z]/.test(ch)) {
            throw new GraphFormulaError(`Nur die Variable „x" wird unterstützt (gefunden: „${ch}").`);
        }

        throw new GraphFormulaError(`Das Zeichen „${ch}" wird nicht erkannt.`);
    }

    tokens.push({ type: "EOF" });
    return tokens;
}

function parseGraphExpression(tokens) {
    let pos = 0;
    let openPipes = 0;
    const peek = () => tokens[pos];
    const advance = () => tokens[pos++];
    const expect = (type, msg) => {
        if (peek().type !== type) throw new GraphFormulaError(msg || `Erwartet: ${type}`);
        return advance();
    };
    const atomStartTypes = ["NUM", "VAR", "CONST", "LPAREN", "PIPE", "FRAC", "SQRT", "FUNC"];
    const startsAtom = (t) => atomStartTypes.includes(t);

    function parseExpr() {
        let node = parseTerm();
        while (peek().type === "PLUS" || peek().type === "MINUS") {
            const op = advance().type;
            node = { type: op === "PLUS" ? "add" : "sub", left: node, right: parseTerm() };
        }
        return node;
    }

    function parseTerm() {
        let node = parseFactor();
        while (true) {
            const t = peek().type;
            if (t === "MUL") { advance(); node = { type: "mul", left: node, right: parseFactor() }; }
            else if (t === "DIV") { advance(); node = { type: "div", left: node, right: parseFactor() }; }
            else if (t === "PIPE" && openPipes > 0) break;
            else if (startsAtom(t)) { node = { type: "mul", left: node, right: parseFactor() }; }
            else break;
        }
        return node;
    }

    function parseFactor() {
        if (peek().type === "MINUS") { advance(); return { type: "neg", arg: parseFactor() }; }
        return parsePower();
    }

    function parseExponent() {
        if (peek().type === "LBRACE") {
            advance();
            const e = parseExpr();
            expect("RBRACE", "Der Exponent wurde nicht richtig geschlossen.");
            return e;
        }
        return parseFactor();
    }

    function parsePower() {
        let base = parseAtom();
        if (peek().type === "CARET") {
            advance();
            return { type: "pow", base, exp: parseExponent() };
        }
        return base;
    }

    function parseAtom() {
        const t = peek();
        switch (t.type) {
            case "NUM": advance(); return { type: "num", value: t.value };
            case "VAR": advance(); return { type: "var" };
            case "CONST": advance(); return { type: "const", name: t.name };
            case "LPAREN": {
                advance();
                const e = parseExpr();
                expect("RPAREN", "Eine Klammer wurde nicht geschlossen.");
                return e;
            }
            case "PIPE": {
                openPipes++;
                advance();
                const e = parseExpr();
                expect("PIPE", "Die Betragsstriche wurden nicht geschlossen.");
                openPipes--;
                return { type: "abs", arg: e };
            }
            case "FRAC": {
                advance();
                expect("LBRACE", "Der Bruch ist unvollständig.");
                const num = parseExpr();
                expect("RBRACE", "Der Zähler wurde nicht richtig geschlossen.");
                expect("LBRACE", "Der Bruch ist unvollständig.");
                const den = parseExpr();
                expect("RBRACE", "Der Nenner wurde nicht richtig geschlossen.");
                return { type: "div", left: num, right: den };
            }
            case "SQRT": {
                advance();
                expect("LBRACE", "Der Inhalt der Wurzel fehlt.");
                const arg = parseExpr();
                expect("RBRACE", "Die Wurzel wurde nicht richtig geschlossen.");
                return { type: "sqrt", arg };
            }
            case "FUNC": {
                advance();
                if (peek().type === "LPAREN") {
                    advance();
                    const arg = parseExpr();
                    expect("RPAREN", "Die Klammer nach der Funktion wurde nicht geschlossen.");
                    return { type: "func", name: t.name, arg };
                }
                return { type: "func", name: t.name, arg: parseFactor() };
            }
            default:
                throw new GraphFormulaError("Die Formel enthält an dieser Stelle ein unerwartetes Element.");
        }
    }

    const expr = parseExpr();
    if (peek().type !== "EOF") {
        throw new GraphFormulaError("Am Ende der Formel befinden sich überzählige Zeichen.");
    }
    return expr;
}

// Wertet einen AST-Knoten an einer konkreten x-Stelle aus. Gibt null zurück
// bei Definitionslücken (Division durch 0, Wurzel aus negativer Zahl, ln von
// nicht-positiver Zahl, ...) statt NaN/Infinity durchzureichen – so kann die
// Rendering-Seite daraus sauber eine Lücke im Funktionsgraphen machen.
function evaluateGraphNode(node, xValue) {
    switch (node.type) {
        case "num": return node.value;
        case "var": return xValue;
        case "const": return node.name === "pi" ? Math.PI : Math.E;
        case "neg": { const a = evaluateGraphNode(node.arg, xValue); return a === null ? null : -a; }
        case "add": { const a = evaluateGraphNode(node.left, xValue), b = evaluateGraphNode(node.right, xValue); return (a === null || b === null) ? null : a + b; }
        case "sub": { const a = evaluateGraphNode(node.left, xValue), b = evaluateGraphNode(node.right, xValue); return (a === null || b === null) ? null : a - b; }
        case "mul": { const a = evaluateGraphNode(node.left, xValue), b = evaluateGraphNode(node.right, xValue); return (a === null || b === null) ? null : a * b; }
        case "div": {
            const a = evaluateGraphNode(node.left, xValue), b = evaluateGraphNode(node.right, xValue);
            return (a === null || b === null || b === 0) ? null : a / b;
        }
        case "pow": {
            const a = evaluateGraphNode(node.base, xValue), b = evaluateGraphNode(node.exp, xValue);
            if (a === null || b === null) return null;
            if (a < 0 && !Number.isInteger(b)) return null; // nicht reell
            return Math.pow(a, b);
        }
        case "sqrt": {
            const a = evaluateGraphNode(node.arg, xValue);
            return (a === null || a < 0) ? null : Math.sqrt(a);
        }
        case "abs": {
            const a = evaluateGraphNode(node.arg, xValue);
            return a === null ? null : Math.abs(a);
        }
        case "func": {
            const a = evaluateGraphNode(node.arg, xValue);
            if (a === null) return null;
            switch (node.name) {
                case "sin": return Math.sin(a);
                case "cos": return Math.cos(a);
                case "tan": return Math.tan(a);
                case "ln": return a > 0 ? Math.log(a) : null;
                default: return null;
            }
        }
        default: return null;
    }
}

// Extrahiert die rechte Seite von "f(x)=..." und übersetzt sie in einen AST.
// Ohne "=" (z.B. reine Eingabe "2x+3") wird die ganze Eingabe ausgewertet.
function compileGraphFormula(latex) {
    const eqIndex = latex.indexOf("=");
    const rhs = eqIndex === -1 ? latex : latex.slice(eqIndex + 1);
    return parseGraphExpression(tokenizeGraphFormula(rhs));
}


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
    const functionsGroup = document.getElementById("graphFunctions");
    if (!container || !svg || !gridGroup || !axesGroup || !labelsGroup || !functionsGroup) return;

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
        functionsGroup.innerHTML = "";

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

        // Funktionen
        functionsState.forEach((fn, index) => {
            if (!fn.visible || !fn.ast) return;
            const d = pointsToPathD(samplePoints(fn));
            if (!d) return;
            functionsGroup.appendChild(el("path", {
                d,
                fill: "none",
                stroke: colorForIndex(index),
                "stroke-width": 2.5,
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            }));
        });
    }

    // Sampling: pro sichtbarer Pixel-Spalte den zugehörigen x-Wert auswerten.
    // Alle 2px statt jedem einzelnen Pixel – visuell nicht wahrnehmbar,
    // halbiert aber die Auswertungen pro Redraw (siehe Performance-Hinweis).
    // Werte außerhalb eines großzügigen Bereichs (Asymptoten, z.B. tan(x))
    // brechen den Pfad ab, statt eine falsche Spitze durchzuziehen.
    function samplePoints(fn) {
        const points = [];
        const visibleHalfHeightMath = (heightPx / 2) / viewport.pixelsPerUnit;
        const maxAbsY = Math.abs(viewport.centerY) + visibleHalfHeightMath * 4;

        for (let px = 0; px <= widthPx; px += 2) {
            const mathY = evaluateGraphNode(fn.ast, toMathX(px));
            if (mathY === null || !Number.isFinite(mathY) || Math.abs(mathY) > maxAbsY) {
                points.push(null);
            } else {
                points.push({ x: px, y: toScreenY(mathY) });
            }
        }
        return points;
    }

    function pointsToPathD(points) {
        let d = "";
        let penDown = false;
        points.forEach(p => {
            if (p === null) { penDown = false; return; }
            d += (penDown ? "L" : "M") + p.x.toFixed(1) + "," + p.y.toFixed(1) + " ";
            penDown = true;
        });
        return d.trim();
    }

    // ── Größenänderung (Container-Resize, inkl. Fullscreen-Toggle) ────────
    const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        widthPx = entry.contentRect.width;
        heightPx = entry.contentRect.height;
        render();
    });
    resizeObserver.observe(container);

    // Bündelt schnell aufeinanderfolgende Redraws (Pan-Drag, Pinch, Mausrad)
    // auf maximal einen pro Frame – Grid/Achsen/Funktionen zusammen sind
    // teurer als der reine Grid/Achsen-Redraw aus Phase 1.
    let renderScheduled = false;
    function scheduleRender() {
        if (renderScheduled) return;
        renderScheduled = true;
        requestAnimationFrame(() => {
            renderScheduled = false;
            render();
        });
    }

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
            scheduleRender();
            return;
        }

        if (activePointers.size === 1 && panStartScreen) {
            const dxPx = e.clientX - panStartScreen.x;
            const dyPx = e.clientY - panStartScreen.y;
            viewport.centerX = panStartCenter.x - dxPx / viewport.pixelsPerUnit;
            viewport.centerY = panStartCenter.y + dyPx / viewport.pixelsPerUnit;
            scheduleRender();
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

        scheduleRender();
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

    requestGraphRedraw = render;
}

document.addEventListener("DOMContentLoaded", initCoordinateSystem);