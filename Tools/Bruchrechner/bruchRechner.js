// ==========================================================================
// BRUCHRECHNER – Logik
// ==========================================================================

// ── Zustand ─────────────────────────────────────────────────────────────────
let currentOperation = "add";

// ── DOM-Referenzen ───────────────────────────────────────────────────────────
const opButtons       = document.querySelectorAll(".btnUnits");
const mixedToggle     = document.getElementById("mixedToggle");
const opZeichen       = document.getElementById("operationZeichen");
const wrapperBruch2   = document.getElementById("wrapperBruch2");
const bruch2Eingabe   = document.getElementById("bruch2Eingabe");

const inputs = {
    g1:     document.getElementById("ganzzahl1"),
    z1:     document.getElementById("zaehler1"),
    n1:     document.getElementById("nenner1"),
    g2:     document.getElementById("ganzzahl2"),
    z2:     document.getElementById("zaehler2"),
    n2:     document.getElementById("nenner2"),
    factor: document.getElementById("erwFaktor")
};

const loesungOutput    = document.getElementById("loesungOutput");
const rechenwegOutput  = document.getElementById("rechenwegOutput");
const errorMessages    = document.getElementById("errorMessages");
const ausgabeContainer = document.getElementById("ausgabeContainer");

// ── Mathematische Hilfsfunktionen ────────────────────────────────────────────
function ggt(a, b) {
    return b === 0 ? Math.abs(a) : ggt(b, a % b);
}

function kgv(a, b) {
    return Math.abs(a * b) / ggt(a, b);
}

// ── Fehler-Handling ──────────────────────────────────────────────────────────
function hideError() {
    errorMessages.style.display = "none";
}

function showError(msg) {
    ausgabeContainer.style.display = "none";
    loesungOutput.innerText        = "Fehler";
    errorMessages.textContent      = msg;
    errorMessages.style.display    = "block";
}

// ── UI-Update (Operation & Mixed-Mode) ───────────────────────────────────────
function updateUI() {
    const isMixed = mixedToggle.checked;

    // Ganzzahlfelder zeigen / verstecken
    document.querySelectorAll(".mixed-field").forEach(el => {
        el.style.display = isMixed ? "block" : "none";
    });

    // Standardzustand zurücksetzen
    wrapperBruch2.style.display   = "flex";
    bruch2Eingabe.style.display   = "flex";
    inputs.factor.style.display   = "none";

    // Operation-spezifisches Layout
    if (currentOperation === "kuerzen") {
        opZeichen.textContent       = "➔";
        wrapperBruch2.style.display = "none";

    } else if (currentOperation === "erweitern") {
        opZeichen.textContent       = "×";
        bruch2Eingabe.style.display = "none";
        inputs.g2.style.display     = "none";   // ganzzahl2 im Erweitern-Modus verstecken
        inputs.factor.style.display = "block";

    } else {
        const symbols = { add: "+", sub: "−", mul: "×", div: "÷" };
        opZeichen.textContent = symbols[currentOperation];
    }

    calculate();
}

// ── Bruch aus Eingabefeldern lesen ───────────────────────────────────────────
function getFraction(gEl, zEl, nEl) {
    let g = parseInt(gEl.value) || 0;
    let z = parseInt(zEl.value);
    let n = parseInt(nEl.value);

    if (isNaN(z) || isNaN(n)) return null;
    if (n === 0)               return "NaN_Nenner";

    // Gemischte Zahl → unechter Bruch
    if (g !== 0) {
        z = g < 0 ? g * n - z : g * n + z;
    }

    return { z, n };
}

// ── Ergebnis als HTML formatieren ────────────────────────────────────────────
function formatResultHTML(z, n) {
    if (z === 0) return "0";
    if (n === 1) return `${z}`;

    let extraMixed = "";
    if (mixedToggle.checked && Math.abs(z) > n) {
        const ganz  = Math.trunc(z / n);
        const restZ = Math.abs(z % n);
        extraMixed = restZ !== 0
            ? ` = ${ganz}<div class="resBruch"><span>${restZ}</span><div class="resBruchStrich"></div><span>${n}</span></div>`
            : ` = ${ganz}`;
    }

    return `<div class="resBruch"><span>${z}</span><div class="resBruchStrich"></div><span>${n}</span></div>${extraMixed}`;
}

// ── Hauptberechnung ──────────────────────────────────────────────────────────
function calculate() {
    hideError();

    const f1 = getFraction(inputs.g1, inputs.z1, inputs.n1);
    if (!f1)               { resetOutput(); return; }
    if (f1 === "NaN_Nenner") { showError("Nenner darf nicht 0 sein!"); return; }

    let finalZ, finalN;
    const steps = [];
    const printBruch = (z, n) => `${z}/${n}`;

    // ── Kürzen ──────────────────────────────────────────────────────────────
    if (currentOperation === "kuerzen") {
        const teiler = ggt(f1.z, f1.n);
        finalZ = f1.z / teiler;
        finalN = f1.n / teiler;

        steps.push({
            title:   "Schritt 1: Größten gemeinsamen Teiler (ggT) ermitteln",
            text:    `Ausgangsbruch: ${printBruch(f1.z, f1.n)}`,
            formula: `ggT(${f1.z}, ${f1.n}) = ${teiler}`
        });
        steps.push({
            title:    "Schritt 2: Zähler und Nenner kürzen",
            text:     `Teilen durch den ggT (${teiler}):`,
            formula:  `Zähler: ${f1.z} ÷ ${teiler} = ${finalZ}\nNenner: ${f1.n} ÷ ${teiler} = ${finalN}`,
            solution: `Gekürzter Bruch: ${printBruch(finalZ, finalN)}`
        });

    // ── Erweitern ────────────────────────────────────────────────────────────
    } else if (currentOperation === "erweitern") {
        const factor = parseInt(inputs.factor.value);
        if (isNaN(factor)) { resetOutput(); return; }
        if (factor === 0)  { showError("Erweiterungsfaktor darf nicht 0 sein!"); return; }

        finalZ = f1.z * factor;
        finalN = f1.n * factor;

        steps.push({
            title:    "Schritt 1: Zähler und Nenner multiplizieren",
            text:     `Erweitern mit Faktor: ${factor}`,
            formula:  `Zähler: ${f1.z} × ${factor} = ${finalZ}\nNenner: ${f1.n} × ${factor} = ${finalN}`,
            solution: `Erweiterter Bruch: ${printBruch(finalZ, finalN)}`
        });

    // ── Grundrechenarten ─────────────────────────────────────────────────────
    } else {
        const f2 = getFraction(inputs.g2, inputs.z2, inputs.n2);
        if (!f2)               { resetOutput(); return; }
        if (f2 === "NaN_Nenner") { showError("Nenner darf nicht 0 sein!"); return; }

        if (currentOperation === "add" || currentOperation === "sub") {
            const hauptnenner = kgv(f1.n, f2.n);
            const mf1         = hauptnenner / f1.n;
            const mf2         = hauptnenner / f2.n;
            const z1_erw      = f1.z * mf1;
            const z2_erw      = f2.z * mf2;

            steps.push({
                title:   "Schritt 1: Hauptnenner bestimmen",
                text:    `Nenner vergleichen (${f1.n} und ${f2.n}):`,
                formula: `kgV(${f1.n}, ${f2.n}) = ${hauptnenner}`
            });
            steps.push({
                title:   "Schritt 2: Brüche gleichnamig machen",
                text:    "Erweiterungsfaktoren berechnen und anwenden:",
                formula: `Bruch 1 (×${mf1}): (${f1.z}×${mf1}) / (${f1.n}×${mf1}) = ${z1_erw}/${hauptnenner}\nBruch 2 (×${mf2}): (${f2.z}×${mf2}) / (${f2.n}×${mf2}) = ${z2_erw}/${hauptnenner}`
            });

            if (currentOperation === "add") {
                finalZ = z1_erw + z2_erw;
                steps.push({
                    title:    "Schritt 3: Zähler addieren",
                    text:     `Nenner (${hauptnenner}) bleibt unverändert:`,
                    formula:  `${z1_erw}/${hauptnenner} + ${z2_erw}/${hauptnenner} = (${z1_erw} + ${z2_erw}) / ${hauptnenner} = ${finalZ}/${hauptnenner}`,
                    solution: `Zwischenergebnis: ${printBruch(finalZ, hauptnenner)}`
                });
            } else {
                finalZ = z1_erw - z2_erw;
                steps.push({
                    title:    "Schritt 3: Zähler subtrahieren",
                    text:     `Nenner (${hauptnenner}) bleibt unverändert:`,
                    formula:  `${z1_erw}/${hauptnenner} - ${z2_erw}/${hauptnenner} = (${z1_erw} - ${z2_erw}) / ${hauptnenner} = ${finalZ}/${hauptnenner}`,
                    solution: `Zwischenergebnis: ${printBruch(finalZ, hauptnenner)}`
                });
            }
            finalN = hauptnenner;

        } else if (currentOperation === "mul") {
            finalZ = f1.z * f2.z;
            finalN = f1.n * f2.n;

            steps.push({
                title:    "Schritt 1: Multiplikationsregel anwenden",
                text:     "Zähler mal Zähler, Nenner mal Nenner:",
                formula:  `Zähler: ${f1.z} × ${f2.z} = ${finalZ}\nNenner: ${f1.n} × ${f2.n} = ${finalN}`,
                solution: `Zwischenergebnis: ${printBruch(finalZ, finalN)}`
            });

        } else if (currentOperation === "div") {
            if (f2.z === 0) { showError("Division durch 0 ist nicht erlaubt!"); return; }
            finalZ = f1.z * f2.n;
            finalN = f1.n * f2.z;

            steps.push({
                title:   "Schritt 1: Kehrwert bilden",
                text:    `Division wird zur Multiplikation mit dem Kehrwert von ${printBruch(f2.z, f2.n)}:`,
                formula: `Kehrwert: ${printBruch(f2.n, f2.z)}\nAnsatz: (${f1.z}/${f1.n}) × (${f2.n}/${f2.z})`
            });
            steps.push({
                title:    "Schritt 2: Ausmultiplizieren",
                text:     "Zähler mal Zähler, Nenner mal Nenner rechnen:",
                formula:  `Zähler: ${f1.z} × ${f2.n} = ${finalZ}\nNenner: ${f1.n} × ${f2.z} = ${finalN}`,
                solution: `Zwischenergebnis: ${printBruch(finalZ, finalN)}`
            });
        }

        // Automatisches Kürzen des Endergebnisses
        const endTeiler = ggt(finalZ, finalN);
        if (endTeiler > 1) {
            const vorZ = finalZ, vorN = finalN;
            finalZ /= endTeiler;
            finalN /= endTeiler;
            steps.push({
                title:    `Schritt ${steps.length + 1}: Ergebnis vollständig kürzen`,
                text:     `Zähler und Nenner durch gemeinsamen Teiler (${endTeiler}) dividieren:`,
                formula:  `${vorZ} ÷ ${endTeiler} = ${finalZ}\n${vorN} ÷ ${endTeiler} = ${finalN}`,
                solution: `Endgültiges Ergebnis: ${printBruch(finalZ, finalN)}`
            });
        } else {
            // Letzten vorhandenen Schritt als finales Ergebnis markieren
            const last = steps[steps.length - 1];
            if (last) last.solution = `Endgültiges Ergebnis: ${printBruch(finalZ, finalN)}`;
        }
    }

    // Vorzeichen-Fix: negativer Nenner
    if (finalN < 0) {
        finalZ = -finalZ;
        finalN = Math.abs(finalN);
    }

    // ── Ausgabe rendern ──────────────────────────────────────────────────────
    loesungOutput.innerHTML = formatResultHTML(finalZ, finalN);

    rechenwegOutput.innerHTML = steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return `
            <div class="step-container ${isLast ? "final-step" : ""}">
                <div class="step-title">${step.title}</div>
                ${step.text     ? `<div class="step-text">${step.text}</div>`         : ""}
                <div class="step-formula-box">${step.formula}</div>
                ${step.solution ? `<div class="step-sub-solution">${step.solution}</div>` : ""}
            </div>`;
    }).join("");

    ausgabeContainer.style.display = "flex";
}

// ── Reset ────────────────────────────────────────────────────────────────────
function resetOutput() {
    loesungOutput.innerText        = "Ergebnis";
    rechenwegOutput.innerHTML      = "";
    ausgabeContainer.style.display = "none";
}

// ── Event Listener ───────────────────────────────────────────────────────────
opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        opButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentOperation = btn.dataset.operation;
        updateUI();
    });
});

mixedToggle.addEventListener("change", updateUI);

Object.values(inputs).forEach(input => {
    input.addEventListener("input", calculate);
});

// ── Initialisierung ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", updateUI);