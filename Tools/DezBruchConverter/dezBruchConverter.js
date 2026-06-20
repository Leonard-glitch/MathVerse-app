const inputContainer = document.getElementById("cardDezimalContainer");
const outputContainer = document.getElementById("cardBruchContainer");
const swapBtn = document.getElementById("swapBtn");
const errorMessages = document.getElementById("errorMessages");
const ausgabeContainer = document.getElementById("ausgabeContainer");
const rechenwegOutput = document.getElementById("rechenwegOutput");

// HTML-Strukturen für die Karten (Wichtig: Backticks ` nutzen!)
const cardDezHTML = `
    <div class="card">
        <h2>Dezimal</h2>
        <input type="number" id="inputFeld3" placeholder="z.B. 0.75" class="zahlenInputfeld">
    </div>`;

const cardBruchHTML = `
    <div class="card">
        <h2>Bruch</h2>
        <div class="bruchEingabe">
            <input type="number" id="zaehler1" placeholder="Zähler" class="zahlenInputfeld">
            <div class="bruchStrich"></div>
            <input type="number" id="nenner1" placeholder="Nenner" class="zahlenInputfeld">
        </div>
    </div>`;

// Start-Zustand: true = Dezimal zu Bruch, false = Bruch zu Dezimal
let isDezimalToBruch = true;

// ── Mathematische Hilfsfunktionen ─────────────────────────────────────────
function ggt(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    return b === 0 ? a : ggt(b, a % b);
}

// ── Rechenweg-Strukturierungs-Hilfen (Dein Pattern) ───────────────────────
function schrittHTML(titel, formel) {
    return `
        <div class="rechenwegSchritt" style="margin-bottom: 1rem;">
            <p class="schrittTitel" style="font-weight: bold; margin: 0 0 0.25rem 0; font-size: 0.9rem;">${titel}</p>
            <p class="schrittFormel" style="margin: 0; font-family: monospace; color: var(--text-secondary);">${formel}</p>
        </div>`;
}

// ── Hauptlogik für die Live-Berechnung ────────────────────────────────────
function berechneLive() {
    errorMessages.innerText = ""; 
    rechenwegOutput.innerHTML = "";

    if (isDezimalToBruch) {
        // ── DEZIMAL ZU BRUCH ──
        const dezInput = document.getElementById("inputFeld3");
        const zaehlerOut = document.getElementById("zaehler1");
        const nennerOut = document.getElementById("nenner1");
        
        if (!dezInput || !dezInput.value.trim()) {
            zaehlerOut.value = "";
            nennerOut.value = "";
            ausgabeContainer.style.display = "none";
            return;
        }

        const rawValue = dezInput.value.trim();
        const decimalNumber = parseFloat(rawValue);

        if (isNaN(decimalNumber)) return;

        // Berechne Nachkommastellen für die Zehnerpotenz-Erweiterung
        const teile = rawValue.split('.');
        const nachkommastellen = teile[1] ? teile[1].length : 0;
        const erweiterungsFaktor = Math.pow(10, nachkommastellen);

        // Schritt 1: Erweitern
        let startZaehler = Math.round(decimalNumber * erweiterungsFaktor);
        let startNenner = erweiterungsFaktor;

        // Schritt 2: Kürzen via GgT
        const teiler = ggt(startZaehler, startNenner);
        const gekuerzterZaehler = startZaehler / teiler;
        const gekuerzterNenner = startNenner / teiler;

        // Werte live ins schreibgeschützte Feld eintragen
        zaehlerOut.value = gekuerzterZaehler;
        nennerOut.value = gekuerzterNenner;

        // Rechenweg im schrittHTML-Stil aufbauen
        let html = schrittHTML("1. Ausgangswert", `Dezimalzahl = ${decimalNumber}`);
        html += schrittHTML(
            `2. Als Bruch schreiben (mit $10^{${nachkommastellen}}$ erweitert)`, 
            `\\frac{${startZaehler}}{${startNenner}}`
        );
        html += schrittHTML("3. Größter gemeinsamer Teiler (ggT)", `ggT(${startZaehler}, ${startNenner}) = ${teiler}`);
        html += schrittHTML("4. Gekürztes Ergebnis", `\\frac{${startZaehler} \\div ${teiler}}{${startNenner} \\div ${teiler}} = \\mathbf{\\frac{${gekuerzterZaehler}}{${gekuerzterNenner}}}`);

        rechenwegOutput.innerHTML = html;
        ausgabeContainer.style.display = "flex";

    } else {
        // ── BRUCH ZU DEZIMAL ──
        const zaehlerInput = document.getElementById("zaehler1");
        const nennerInput = document.getElementById("nenner1");
        const dezOut = document.getElementById("inputFeld3");
        
        if (!zaehlerInput || !nennerInput || !zaehlerInput.value.trim() || !nennerInput.value.trim()) {
            dezOut.value = "";
            ausgabeContainer.style.display = "none";
            return;
        }
        
        const z = parseFloat(zaehlerInput.value);
        const n = parseFloat(nennerInput.value);
        
        if (isNaN(z) || isNaN(n)) return;

        if (n === 0) {
            errorMessages.innerText = "Division durch 0 ist nicht erlaubt! (Nenner darf nicht 0 sein)";
            dezOut.value = "";
            ausgabeContainer.style.display = "none";
            return;
        }
        
        const ergebnis = z / n;
        // Runden auf max 6 Nachkommastellen (Floating-Point-Fehler abfangen)
        const gerundetesErgebnis = Math.round((ergebnis + Number.EPSILON) * 1e6) / 1e6;
        
        dezOut.value = gerundetesErgebnis;

        // Rechenweg im schrittHTML-Stil aufbauen
        let html = schrittHTML("1. Gegebener Bruch", `\\frac{Zähler}{Nenner} = \\frac{${z}}{${n}}`);
        html += schrittHTML("2. Berechnung", `${z} \\div ${n} = ${gerundetesErgebnis}`);
        
        rechenwegOutput.innerHTML = html;
        ausgabeContainer.style.display = "flex";
    }
}

// ── Event-Handling & Card Swapping ────────────────────────────────────────

function initLiveEvents() {
    if (isDezimalToBruch) {
        const dezInput = document.getElementById("inputFeld3");
        if (dezInput) dezInput.addEventListener("input", berechneLive);
    } else {
        const zaehlerInput = document.getElementById("zaehler1");
        const nennerInput = document.getElementById("nenner1");
        if (zaehlerInput) zaehlerInput.addEventListener("input", berechneLive);
        if (nennerInput) nennerInput.addEventListener("input", berechneLive);
    }
}

function swapCards() {
    isDezimalToBruch = !isDezimalToBruch;
    
    if (isDezimalToBruch) {
        inputContainer.innerHTML = cardDezHTML;
        outputContainer.innerHTML = cardBruchHTML;
    } else {
        inputContainer.innerHTML = cardBruchHTML;
        outputContainer.innerHTML = cardDezHTML;
    }
    
    // Setze alle Inputs im Ausgabe-Container auf Readonly
    const outputInputs = outputContainer.querySelectorAll("input");
    outputInputs.forEach(input => {
        input.setAttribute("readonly", true);
    });

    ausgabeContainer.style.display = "none";
    errorMessages.innerText = "";

    initLiveEvents();
}

swapBtn.addEventListener("click", () => {
    swapBtn.classList.add("rotate");
    setTimeout(() => {
        swapBtn.classList.remove("rotate");
    }, 350);

    swapCards();
});

// Setup beim ersten Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    const outputInputs = outputContainer.querySelectorAll("input");
    outputInputs.forEach(input => input.setAttribute("readonly", true));
    initLiveEvents();
});