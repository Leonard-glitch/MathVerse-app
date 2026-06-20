const zahlenInput = document.getElementById("zahlenInput");
const buttonInput = document.getElementById("buttonZahlenInput");

const errorMessages = document.getElementById("errorMessages");
const errorBox = document.querySelector(".falscheEingabestyle");

const ausgabeContainer    = document.getElementById("ausgabeContainer");
const ausgabeSumme        = document.getElementById("ausgabeSumme");
const ausgabeMax          = document.getElementById("ausgabeMax");
const ausgabeMin          = document.getElementById("ausgabeMin");
const ausgabeDurchschnitt = document.getElementById("ausgabeDurchschnitt");
const ausgabeGgt          = document.getElementById("ausgabeGgt");
const ausgabeKgv          = document.getElementById("ausgabeKgv");
const rechenwegOutput     = document.getElementById("rechenwegOutput");

// ── Mathematische Hilfsfunktionen 
function ggt(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    return b === 0 ? a : ggt(b, a % b);
}

function kgv(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / ggt(a, b);
}

function zahlenAnalyse(arr) {
    if (arr.length === 0) return null;

    let sum = 0;
    let max = arr[0];
    let min = arr[0];

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }

    const average = Math.round((sum / arr.length) * 10000) / 10000;

    const alleGanzzahlen = arr.every(n => Number.isInteger(n));
    let ggtResult = null;
    let kgvResult = null;

    if (alleGanzzahlen) {
        ggtResult = arr.reduce((acc, n) => ggt(acc, n));
        kgvResult = arr.reduce((acc, n) => kgv(acc, n));
    }

    return {
        sum, max, min, average,
        ggt: ggtResult,
        kgv: kgvResult,
        alleGanzzahlen
    };
}

function validateInput(inputString) {
    if (inputString.trim() === "") {
        return "Bitte eine Zahl eingeben!";
    }

    const teile = inputString.split(",");

    if (teile.some(t => t.trim() === "")) {
        return "Keine leeren Werte oder doppelte Kommas erlaubt!";
    }

    const zahlenArray = teile.map(t => Number(t.trim()));

    if (zahlenArray.some(num => isNaN(num))) {
        return "Bitte gültige Zahlen eingeben!";
    }

    return zahlenArray;
}

// ── Rechenweg-Generierung 
function infoIconHTML(text) {
    return `<i class="fa fa-info-circle infoIcon" data-info="${text}"></i>`;
}

function schrittHTML(titel, formel) {
    return `
        <div class="rechenwegSchritt">
            <p class="schrittTitel">${titel}</p>
            <p class="schrittFormel">${formel}</p>
        </div>`;
}

function buildRechenweg(arr, result) {
    const liste = arr.join(", ");

    let html = schrittHTML("Eingabe", `Werte: ${liste}`);
    html += schrittHTML("Summe", `${arr.join(" + ")} = ${result.sum}`);
    html += schrittHTML("Maximum", `Größter Wert der Liste = ${result.max}`);
    html += schrittHTML("Minimum", `Kleinster Wert der Liste = ${result.min}`);
    html += schrittHTML("Durchschnitt", `(${arr.join(" + ")}) / ${arr.length} = ${result.average}`);

    if (result.alleGanzzahlen) {
        html += schrittHTML(`ggT ${infoIconHTML("Größter gemeinsamer Teiler")}`, `ggT(${liste}) = ${result.ggt}`);
        html += schrittHTML(`kgV ${infoIconHTML("Kleinstes gemeinsames Vielfaches")}`, `kgV(${liste}) = ${result.kgv}`);
    } else {
        html += schrittHTML("ggT / kgV", "Nur für ganze Zahlen definiert – Eingabe enthält Dezimalzahlen.");
    }

    return html;
}

// ── Ausgabe zurücksetzen 
function resetOutput() {
    ausgabeContainer.style.display = "none";
    ausgabeSumme.textContent = "";
    ausgabeMax.textContent = "";
    ausgabeMin.textContent = "";
    ausgabeDurchschnitt.textContent = "";
    ausgabeGgt.textContent = "";
    ausgabeKgv.textContent = "";
    rechenwegOutput.innerHTML = "";
    hideInfoTooltip();
}

// ── Hauptlogik 
buttonInput.addEventListener("click", function() {
    const validationResult = validateInput(zahlenInput.value);

    if (typeof validationResult === "string") {
        errorBox.style.display = "block";
        errorMessages.textContent = validationResult;
        resetOutput();
        return;
    }

    errorBox.style.display = "none";

    const result = zahlenAnalyse(validationResult);
    if (!result) {
        resetOutput();
        return;
    }

    ausgabeSumme.textContent        = result.sum;
    ausgabeMax.textContent          = result.max;
    ausgabeMin.textContent          = result.min;
    ausgabeDurchschnitt.textContent = result.average;
    ausgabeGgt.textContent          = result.alleGanzzahlen ? result.ggt : "–";
    ausgabeKgv.textContent          = result.alleGanzzahlen ? result.kgv : "–";

    rechenwegOutput.innerHTML = buildRechenweg(validationResult, result);
    ausgabeContainer.style.display = "flex";
});

zahlenInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        buttonInput.click();
    }
});

zahlenInput.addEventListener("focus", function() {
    zahlenInput.select();
});

zahlenInput.addEventListener("input", function() {
    errorBox.style.display = "none";
});

let infoTooltip = null;
let activeInfoIcon = null;

function ensureInfoTooltip() {
    if (infoTooltip) return infoTooltip;
    infoTooltip = document.createElement("div");
    infoTooltip.className = "infoTooltip";
    infoTooltip.innerHTML = `<span class="infoTooltipText"></span>`;
    document.body.appendChild(infoTooltip);
    return infoTooltip;
}

function positionInfoTooltip(icon) {
    const WIDTH = 220, MARGIN = 10, OFFSET = 10;
    const rect = icon.getBoundingClientRect();

    infoTooltip.style.width = `${WIDTH}px`;
    const height = infoTooltip.offsetHeight || 60;

    let top, arrowClass;
    if (rect.top >= height + OFFSET + MARGIN) {
        top = rect.top - height - OFFSET;
        arrowClass = "tooltip-above";
    } else {
        top = rect.bottom + OFFSET;
        arrowClass = "tooltip-below";
    }

    let left = rect.left + rect.width / 2 - WIDTH / 2;
    left = Math.max(MARGIN, Math.min(left, window.innerWidth - WIDTH - MARGIN));
    const arrowLeft = Math.max(16, Math.min(rect.left + rect.width / 2 - left, WIDTH - 16));

    infoTooltip.style.top  = `${top}px`;
    infoTooltip.style.left = `${left}px`;
    infoTooltip.style.setProperty("--arrow-left", `${arrowLeft}px`);
    infoTooltip.classList.remove("tooltip-above", "tooltip-below");
    infoTooltip.classList.add(arrowClass);
}

function showInfoTooltip(icon) {
    ensureInfoTooltip();
    activeInfoIcon = icon;
    infoTooltip.querySelector(".infoTooltipText").textContent = icon.dataset.info;
    infoTooltip.classList.remove("visible");
    positionInfoTooltip(icon);
    infoTooltip.classList.add("visible");
}

function hideInfoTooltip() {
    if (infoTooltip) infoTooltip.classList.remove("visible", "tooltip-above", "tooltip-below");
    activeInfoIcon = null;
}


document.addEventListener("click", (e) => {
    const icon = e.target.closest(".infoIcon");

    if (icon) {
        e.stopPropagation();
        activeInfoIcon === icon ? hideInfoTooltip() : showInfoTooltip(icon);
        return;
    }

    hideInfoTooltip();
});

// Schließt das Tooltip automatisch beim Scrollen
window.addEventListener("scroll", () => {
    if (activeInfoIcon) activeInfoIcon._pinned = false; // Falls eine Pin-Logik existiert
    hideInfoTooltip();
}, { capture: true, passive: true });