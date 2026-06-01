// Globale Zustände
let currentOperation = "add";

// DOM-Elemente abgreifen
const opButtons = document.querySelectorAll(".btnUnits");
const mixedToggle = document.getElementById("mixedToggle");
const opZeichen = document.getElementById("operationZeichen");

const wrapperBruch1 = document.getElementById("wrapperBruch1");
const wrapperBruch2 = document.getElementById("wrapperBruch2");
const bruch2Eingabe = document.getElementById("bruch2Eingabe");
const erwFaktor = document.getElementById("erwFaktor");

// Inputs
const inputs = {
    g1: document.getElementById("ganzzahl1"),
    z1: document.getElementById("zaehler1"),
    n1: document.getElementById("nenner1"),
    g2: document.getElementById("ganzzahl2"),
    z2: document.getElementById("zaehler2"),
    n2: document.getElementById("nenner2"),
    factor: document.getElementById("erwFaktor")
};

const loesungOutput = document.getElementById("loesungOutput");
const rechenwegOutput = document.getElementById("rechenwegOutput");
const errorMessages = document.getElementById("errorMessages");
const ausgabeContainer = document.getElementById("ausgabeContainer");

// Mathematische Hilfsfunktionen
function ggt(a, b) {
    return b === 0 ? Math.abs(a) : ggt(b, a % b);
}

function kgv(a, b) {
    return Math.abs(a * b) / ggt(a, b);
}

// Fehler-Handling
function hideError() {
    errorMessages.style.display = "none";
}

function showError(msg) {
    ausgabeContainer.style.display = "none";
    loesungOutput.innerText = "Fehler";
    errorMessages.textContent = msg;
    errorMessages.style.display = "block";
}

// UI-Sichtbarkeit basierend auf Operation und Modus anpassen
function updateUI() {
    const isMixed = mixedToggle.checked;
    
    // Ganzzahlfelder basierend auf "Gemischte Zahlen" Toggle zeigen/verstecken
    document.querySelectorAll(".mixed-field").forEach(el => {
        el.style.display = isMixed ? "block" : "none";
    });

    // Reset auf Standardansichten
    wrapperBruch2.style.display = "flex";
    bruch2Eingabe.style.display = "flex";
    erwFaktor.style.display = "none";

    // Spezifische Layouts für Kürzen / Erweitern
    if (currentOperation === "kuerzen") {
        opZeichen.textContent = "➔";
        wrapperBruch2.style.display = "none"; // Kein zweiter Bruch benötigt
    } else if (currentOperation === "erweitern") {
        opZeichen.textContent = "×";
        bruch2Eingabe.style.display = "none"; // Zweiter Bruch wird zum Einzelfeld
        erwFaktor.style.display = "block";
    } else {
        // Grundrechenarten
        const symbols = { add: "+", sub: "−", mul: "×", div: "÷" };
        opZeichen.textContent = symbols[currentOperation];
    }
    calculate();
}

// Parsing-Helfer (Inklusive Vorzeichen & Gemischten Zahlen)
function getFraction(gEl, zEl, nEl) {
    let g = parseInt(gEl.value) || 0;
    let z = parseInt(zEl.value);
    let n = parseInt(nEl.value);

    if (isNaN(z) || isNaN(n)) return null;
    if (n === 0) return "NaN_Nenner";

    // Bei gemischten Zahlen: Ganzzahl in den Zähler einrechnen
    if (g !== 0) {
        if (g < 0) z = g * n - z;
        else z = g * n + z;
    }
    return { z, n };
}

// Formatierungs-Helfer für HTML-Output im Ergebnis-Div
function formatResultHTML(z, n) {
    if (n === 1) return `${z}`;
    if (z === 0) return `0`;
    
    // Gemischter Bruch Output im Ergebnis wenn gewünscht (optional)
    let extraMixed = "";
    if (mixedToggle.checked && Math.abs(z) > n) {
        const ganz = Math.trunc(z / n);
        const restZ = Math.abs(z % n);
        if (restZ !== 0) {
            extraMixed = ` = ${ganz}<div class="resBruch"><span>${restZ}</span><div class="resBruchStrich"></div><span>${n}</span></div>`;
        } else {
            extraMixed = ` = ${ganz}`;
        }
    }

    return `<div class="resBruch"><span>${z}</span><div class="resBruchStrich"></div><span>${n}</span></div>${extraMixed}`;
}

// Hauptrechnung
function calculate() {
    hideError();
    
    const f1 = getFraction(inputs.g1, inputs.z1, inputs.n1);
    
    // Validierung Bruch 1
    if (!f1) { resetOutput(); return; }
    if (f1 === "NaN_Nenner") { showError("Nenner darf nicht 0 sein!"); return; }

    let finalZ, finalN;
    let steps = []; // Array für die strukturierten Schritte im neuen Design

    const printBruch = (z, n) => `${z}/${n}`;

    if (currentOperation === "kuerzen") {
        const teiler = ggt(f1.z, f1.n);
        finalZ = f1.z / teiler;
        finalN = f1.n / teiler;
        
        steps.push({
            title: "Schritt 1: Größten gemeinsamen Teiler (ggT) ermitteln",
            text: `Ausgangsbruch: ${printBruch(f1.z, f1.n)}`,
            formula: `ggT(${f1.z}, ${f1.n}) = ${teiler}`
        });
        steps.push({
            title: "Schritt 2: Zähler und Nenner kürzen",
            text: `Teilen durch den ggT (${teiler}):`,
            formula: `Zähler: ${f1.z} ÷ ${teiler} = ${finalZ}\nNenner: ${f1.n} ÷ ${teiler} = ${finalN}`,
            solution: `Gekürzter Bruch: ${printBruch(finalZ, finalN)}`
        });

    } else if (currentOperation === "erweitern") {
        const factor = parseInt(inputs.factor.value);
        if (isNaN(factor)) { resetOutput(); return; }
        if (factor === 0) { showError("Erweiterungsfaktor darf nicht 0 sein!"); return; }

        finalZ = f1.z * factor;
        finalN = f1.n * factor;

        steps.push({
            title: "Schritt 1: Zähler und Nenner multiplizieren",
            text: `Erweitern mit Faktor: ${factor}`,
            formula: `Zähler: ${f1.z} × ${factor} = ${finalZ}\nNenner: ${f1.n} × ${factor} = ${finalN}`,
            solution: `Erweiterter Bruch: ${printBruch(finalZ, finalN)}`
        });

    } else {
        // Grundrechenarten benötigen Bruch 2
        const f2 = getFraction(inputs.g2, inputs.z2, inputs.n2);
        if (!f2) { resetOutput(); return; }
        if (f2 === "NaN_Nenner") { showError("Nenner darf nicht 0 sein!"); return; }

        if (currentOperation === "add" || currentOperation === "sub") {
            const hauptnenner = kgv(f1.n, f2.n);
            const mf1 = hauptnenner / f1.n;
            const mf2 = hauptnenner / f2.n;
            
            const z1_erw = f1.z * mf1;
            const z2_erw = f2.z * mf2;

            steps.push({
                title: "Schritt 1: Hauptnenner bestimmen",
                text: `Nenner vergleichen (${f1.n} und ${f2.n}):`,
                formula: `kgV(${f1.n}, ${f2.n}) = ${hauptnenner}`
            });
            
            steps.push({
                title: "Schritt 2: Brüche gleichnamig machen",
                text: `Erweiterungsfaktoren berechnen und anwenden:`,
                formula: `Bruch 1 (×${mf1}): (${f1.z}×${mf1}) / (${f1.n}×${mf1}) = ${z1_erw}/${hauptnenner}\nBruch 2 (×${mf2}): (${f2.z}×${mf2}) / (${f2.n}×${mf2}) = ${z2_erw}/${hauptnenner}`
            });

            if (currentOperation === "add") {
                finalZ = z1_erw + z2_erw;
                steps.push({
                    title: "Schritt 3: Zähler addieren",
                    text: `Nenner (${hauptnenner}) bleibt unverändert:`,
                    formula: `${z1_erw}/${hauptnenner} + ${z2_erw}/${hauptnenner} = (${z1_erw} + ${z2_erw}) / ${hauptnenner} = ${finalZ}/${hauptnenner}`,
                    solution: `Zwischenergebnis: ${printBruch(finalZ, hauptnenner)}`
                });
            } else {
                finalZ = z1_erw - z2_erw;
                steps.push({
                    title: "Schritt 3: Zähler subtrahieren",
                    text: `Nenner (${hauptnenner}) bleibt unverändert:`,
                    formula: `${z1_erw}/${hauptnenner} - ${z2_erw}/${hauptnenner} = (${z1_erw} - ${z2_erw}) / ${hauptnenner} = ${finalZ}/${hauptnenner}`,
                    solution: `Zwischenergebnis: ${printBruch(finalZ, hauptnenner)}`
                });
            }
            finalN = hauptnenner;

        } else if (currentOperation === "mul") {
            finalZ = f1.z * f2.z;
            finalN = f1.n * f2.n;
            
            steps.push({
                title: "Schritt 1: Multiplikationsregel anwenden",
                text: `Zähler mal Zähler, Nenner mal Nenner:`,
                formula: `Zähler: ${f1.z} × ${f2.z} = ${finalZ}\nNenner: ${f1.n} × ${f2.n} = ${finalN}`,
                solution: `Zwischenergebnis: ${printBruch(finalZ, finalN)}`
            });

        } else if (currentOperation === "div") {
            if (f2.z === 0) { showError("Division durch 0 ist nicht erlaubt!"); return; }
            finalZ = f1.z * f2.n;
            finalN = f1.n * f2.z;
            
            steps.push({
                title: "Schritt 1: Kehrwert bilden",
                text: `Division wird zur Multiplikation mit dem Kehrwert von ${printBruch(f2.z, f2.n)}:`,
                formula: `Kehrwert: ${printBruch(f2.n, f2.z)}\nAnsatz: (${f1.z}/${f1.n}) × (${f2.n}/${f2.z})`
            });
            steps.push({
                title: "Schritt 2: Ausmultiplizieren",
                text: `Zähler mal Zähler, Nenner mal Nenner rechnen:`,
                formula: `Zähler: ${f1.z} × ${f2.n} = ${finalZ}\nNenner: ${f1.n} × ${f2.z} = ${finalN}`,
                solution: `Zwischenergebnis: ${printBruch(finalZ, finalN)}`
            });
        }
        
        // Automatisches Kürzen des Endergebnisses
        const endTeiler = ggt(finalZ, finalN);
        if (endTeiler > 1) {
            finalZ /= endTeiler;
            finalN /= endTeiler;
            steps.push({
                title: "Schritt 4: Ergebnis vollständig kürzen",
                text: `Zähler und Nenner teilen durch den gemeinsamen Teiler (${endTeiler}):`,
                formula: `${finalZ * endTeiler} ÷ ${endTeiler} = ${finalZ}\n${finalN * endTeiler} ÷ ${endTeiler} = ${finalN}`,
                solution: `Endgültiges Ergebnis: ${printBruch(finalZ, finalN)}`
            });
        } else {
            // Wenn nicht mehr gekürzt werden muss, deklarieren wir den letzten existierenden Schritt als "Endgültiges Ergebnis"
            const lastStep = steps[steps.length - 1];
            if (lastStep) {
                lastStep.solution = `Endgültiges Ergebnis: ${printBruch(finalZ, finalN)}`;
            }
        }
    }

    if (finalN < 0) {
        finalZ = -finalZ;
        finalN = Math.abs(finalN);
    }

    // Haupt-Ergebnisbox updaten
    loesungOutput.innerHTML = formatResultHTML(finalZ, finalN);
    
    // HTML-Struktur für das Screenshot-Design generieren
    let stepsHTML = "";
    steps.forEach((step, index) => {
        const isLast = index === steps.length - 1;
        
        stepsHTML += `
            <div class="step-container ${isLast ? 'final-step' : ''}">
                <div class="step-title">${step.title}</div>
                ${step.text ? `<div class="step-text">${step.text}</div>` : ''}
                <div class="step-formula-box">${step.formula}</div>
                ${step.solution ? `<div class="step-sub-solution">${step.solution}</div>` : ''}
            </div>
        `;
    });
    
    rechenwegOutput.innerHTML = stepsHTML;
    ausgabeContainer.style.display = "flex";
}

function resetOutput() {
    loesungOutput.innerText = "Ergebnis";
    rechenwegOutput.innerHTML = "";
    ausgabeContainer.style.display = "none";
}

// Event Listener
opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        opButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentOperation = btn.dataset.operation;
        updateUI();
    });
});

mixedToggle.addEventListener("change", () => {
    localStorage.setItem("bruchMixedActive", mixedToggle.checked);
    updateUI();
});

// Input Listener für Echtzeit-Berechnung anhängen
Object.values(inputs).forEach(input => {
    input.addEventListener("input", calculate);
});

// Init beim Laden
document.addEventListener("DOMContentLoaded", () => {
    const savedState = localStorage.getItem("bruchMixedActive");
    mixedToggle.checked = savedState === "true";
    updateUI();
});