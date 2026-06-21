
const inputContainer  = document.getElementById("cardDezimalContainer");
const outputContainer = document.getElementById("cardBruchContainer");
const swapBtn          = document.getElementById("swapBtn");
const errorMessages    = document.getElementById("errorMessages");
const ausgabeContainer = document.getElementById("ausgabeContainer");
const rechenwegOutput  = document.getElementById("rechenwegOutput");

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

let isDezimalToBruch = true;

const MAX_NACHKOMMASTELLEN = 10;

function ggt(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    return b === 0 ? a : ggt(b, a % b);
}

function hideError() {
    errorMessages.style.display = "none";
}

function showError(msg) {
    ausgabeContainer.style.display = "none";
    errorMessages.textContent = msg;
    errorMessages.style.display = "block";
}

function renderRechenweg(steps) {
    rechenwegOutput.innerHTML = steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return `
            <div class="step-container ${isLast ? "final-step" : ""}">
                <div class="step-title">${step.title}</div>
                ${step.text     ? `<div class="step-text">${step.text}</div>`         : ""}
                ${step.formula  ? `<div class="step-formula-box">${step.formula}</div>` : ""}
                ${step.solution ? `<div class="step-sub-solution">${step.solution}</div>` : ""}
            </div>`;
    }).join("");
}

function berechneLive() {
    hideError();
    rechenwegOutput.innerHTML = "";

    if (isDezimalToBruch) {
        berechneDezimalZuBruch();
    } else {
        berechneBruchZuDezimal();
    }
}

function berechneDezimalZuBruch() {
    const dezInput   = document.getElementById("inputFeld3");
    const zaehlerOut = document.getElementById("zaehler1");
    const nennerOut  = document.getElementById("nenner1");

    const rawValue = dezInput.value.trim().replace(",", ".");

    if (rawValue === "") {
        zaehlerOut.value = "";
        nennerOut.value  = "";
        ausgabeContainer.style.display = "none";
        return;
    }

    if (isNaN(Number(rawValue))) {
        showError("Bitte eine gültige Dezimalzahl eingeben.");
        return;
    }

    const [intPart, rawFrac = ""] = rawValue.split(".");
    const fracPart           = rawFrac.slice(0, MAX_NACHKOMMASTELLEN);
    const nachkommastellen   = fracPart.length;
    const erweiterungsFaktor = Math.pow(10, nachkommastellen);
    const decimalNumber      = parseFloat(fracPart ? `${intPart}.${fracPart}` : intPart);

    const startZaehler = Math.round(decimalNumber * erweiterungsFaktor);
    const startNenner  = erweiterungsFaktor;

    const teiler  = ggt(startZaehler, startNenner);
    const zaehler = startZaehler / teiler;
    const nenner  = startNenner / teiler;

    zaehlerOut.value = zaehler;
    nennerOut.value  = nenner;

    const steps = [{
        title:   "Schritt 1: Nachkommastellen zählen",
        text:    nachkommastellen > 0
            ? `${decimalNumber} hat ${nachkommastellen} Nachkommastelle(n) → Erweiterungsfaktor 10^${nachkommastellen}.`
            : `${decimalNumber} hat keine Nachkommastellen.`,
        formula: `Erweiterungsfaktor = ${erweiterungsFaktor}`
    }, {
        title:    "Schritt 2: Mit dem Faktor erweitern",
        text:     "Zahl mit dem Erweiterungsfaktor multiplizieren, um einen Bruch ohne Komma zu erhalten:",
        formula:  `${decimalNumber} × ${erweiterungsFaktor} = ${startZaehler}`,
        solution: `Zwischenergebnis: ${startZaehler}/${startNenner}`
    }];

    if (teiler > 1) {
        steps.push({
            title:    "Schritt 3: Bruch kürzen",
            text:     "Größten gemeinsamen Teiler (ggT) von Zähler und Nenner berechnen und kürzen:",
            formula:  `ggT(${startZaehler}, ${startNenner}) = ${teiler}\n${startZaehler} ÷ ${teiler} = ${zaehler}\n${startNenner} ÷ ${teiler} = ${nenner}`,
            solution: `Endgültiges Ergebnis: ${zaehler}/${nenner}`
        });
    } else {
        steps[steps.length - 1].solution = `Endgültiges Ergebnis: ${zaehler}/${nenner} (bereits vollständig gekürzt)`;
    }

    renderRechenweg(steps);
    ausgabeContainer.style.display = "flex";
}

function berechneBruchZuDezimal() {
    const zaehlerInput = document.getElementById("zaehler1");
    const nennerInput  = document.getElementById("nenner1");
    const dezOut       = document.getElementById("inputFeld3");

    const zRaw = zaehlerInput.value.trim().replace(",", ".");
    const nRaw = nennerInput.value.trim().replace(",", ".");

    if (zRaw === "" || nRaw === "") {
        dezOut.value = "";
        ausgabeContainer.style.display = "none";
        return;
    }

    const z = Number(zRaw);
    const n = Number(nRaw);

    if (isNaN(z) || isNaN(n)) {
        showError("Bitte gültige Zahlen eingeben.");
        return;
    }

    if (n === 0) {
        showError("Division durch 0 ist nicht erlaubt! (Nenner darf nicht 0 sein)");
        return;
    }

    const ergebnis       = z / n;
    const gerundet       = Math.round((ergebnis + Number.EPSILON) * 1e6) / 1e6;
    const wurdeGerundet  = ergebnis !== gerundet;

    dezOut.value = gerundet;

    const steps = [{
        title:   "Schritt 1: Bruch als Division verstehen",
        text:    "Ein Bruch entspricht der Division von Zähler durch Nenner:",
        formula: `${z}/${n} = ${z} ÷ ${n}`
    }, {
        title:    "Schritt 2: Division berechnen",
        text:     wurdeGerundet
            ? "Ergebnis berechnen (auf 6 Nachkommastellen gerundet, da die Dezimalzahl unendlich lang wäre):"
            : "Ergebnis berechnen:",
        formula:  `${z} ÷ ${n} = ${gerundet}`,
        solution: `Endgültiges Ergebnis: ${gerundet}`
    }];

    renderRechenweg(steps);
    ausgabeContainer.style.display = "flex";
}

function initLiveEvents() {
    if (isDezimalToBruch) {
        document.getElementById("inputFeld3")?.addEventListener("input", berechneLive);
    } else {
        document.getElementById("zaehler1")?.addEventListener("input", berechneLive);
        document.getElementById("nenner1")?.addEventListener("input", berechneLive);
    }
}

function swapCards() {
    const dezValue     = document.getElementById("inputFeld3")?.value ?? "";
    const zaehlerValue = document.getElementById("zaehler1")?.value ?? "";
    const nennerValue  = document.getElementById("nenner1")?.value ?? "";

    isDezimalToBruch = !isDezimalToBruch;

    if (isDezimalToBruch) {
        inputContainer.innerHTML  = cardDezHTML;
        outputContainer.innerHTML = cardBruchHTML;
        document.getElementById("inputFeld3").value = dezValue;
    } else {
        inputContainer.innerHTML  = cardBruchHTML;
        outputContainer.innerHTML = cardDezHTML;
        document.getElementById("zaehler1").value = zaehlerValue;
        document.getElementById("nenner1").value  = nennerValue;
    }

    outputContainer.querySelectorAll("input").forEach(input => input.setAttribute("readonly", true));

    initLiveEvents();
    berechneLive();
}

swapBtn.addEventListener("click", () => {
    swapBtn.classList.add("rotate");
    setTimeout(() => swapBtn.classList.remove("rotate"), 350);
    swapCards();
});

document.addEventListener("DOMContentLoaded", () => {
    outputContainer.querySelectorAll("input").forEach(input => input.setAttribute("readonly", true));
    initLiveEvents();
});