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

//Grundlegende & erweiterte Statistik
const ausgabeMedian      = document.getElementById("ausgabeMedian");
const ausgabeModus       = document.getElementById("ausgabeModus");
const ausgabeSpannweite  = document.getElementById("ausgabeSpannweite");
const ausgabeVarianz     = document.getElementById("ausgabeVarianz");
const ausgabeStdAbw      = document.getElementById("ausgabeStdAbw");

//Datenübersicht & sortierte Liste
const ausgabeAnzahl      = document.getElementById("ausgabeAnzahl");
const ausgabePositiv     = document.getElementById("ausgabePositiv");
const ausgabeNegativ     = document.getElementById("ausgabeNegativ");
const ausgabeNullen      = document.getElementById("ausgabeNullen");
const ausgabeEindeutig   = document.getElementById("ausgabeEindeutig");
const ausgabeSortiert    = document.getElementById("ausgabeSortiert");

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

function rund4(n) {
    return Math.round(n * 10000) / 10000;
}

function berechneModus(arr) {
    const haeufigkeit = new Map();
    arr.forEach(n => haeufigkeit.set(n, (haeufigkeit.get(n) || 0) + 1));

    const anzahlEindeutigerWerte = haeufigkeit.size;
    const maxHaeufigkeit = Math.max(...haeufigkeit.values());
    const alleGleichHaeufig = [...haeufigkeit.values()].every(h => h === maxHaeufigkeit);

    if (anzahlEindeutigerWerte > 1 && alleGleichHaeufig) {
        return { werte: [], eindeutig: false, haeufigkeit: maxHaeufigkeit, alleHaeufigkeiten: haeufigkeit };
    }

    const werte = [...haeufigkeit.entries()]
        .filter(([, h]) => h === maxHaeufigkeit)
        .map(([wert]) => wert)
        .sort((a, b) => a - b);

    return { werte, eindeutig: true, haeufigkeit: maxHaeufigkeit, alleHaeufigkeiten: haeufigkeit };
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

    const average = rund4(sum / arr.length);

    const alleGanzzahlen = arr.every(n => Number.isInteger(n));
    let ggtResult = null;
    let kgvResult = null;

    if (alleGanzzahlen) {
        ggtResult = arr.reduce((acc, n) => ggt(acc, n));
        kgvResult = arr.reduce((acc, n) => kgv(acc, n));
    }

    // ── Sortierte Liste (Basis für Median & Datenaufbereitung) ──────────────
    const sortiert = [...arr].sort((a, b) => a - b);

    // ── Median ────────────────────────────────────────────────────────────
    const mid = Math.floor(sortiert.length / 2);
    const median = sortiert.length % 2 === 0
        ? rund4((sortiert[mid - 1] + sortiert[mid]) / 2)
        : sortiert[mid];

    // ── Modus ─────────────────────────────────────────────────────────────
    const modus = berechneModus(arr);

    // ── Spannweite ────────────────────────────────────────────────────────
    const spannweite = rund4(max - min);

    // ── Varianz & Standardabweichung (Grundgesamtheit, Division durch n) ───
    const summeQuadrate  = arr.reduce((acc, x) => acc + Math.pow(x - average, 2), 0);
    const varianz        = rund4(summeQuadrate / arr.length);
    const stdAbweichung  = rund4(Math.sqrt(summeQuadrate / arr.length));

    // ── Datenübersicht ────────────────────────────────────────────────────
    const anzahl          = arr.length;
    const anzahlPositiv   = arr.filter(n => n > 0).length;
    const anzahlNegativ   = arr.filter(n => n < 0).length;
    const anzahlNullen    = arr.filter(n => n === 0).length;
    const anzahlEindeutig = new Set(arr).size;

    return {
        sum, max, min, average,
        ggt: ggtResult,
        kgv: kgvResult,
        alleGanzzahlen,
        sortiert,
        median,
        modus,
        spannweite,
        varianz,
        stdAbweichung,
        anzahl,
        anzahlPositiv,
        anzahlNegativ,
        anzahlNullen,
        anzahlEindeutig
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
    const sortiertStr = result.sortiert.join(", ");

    let html = schrittHTML("Eingabe", `Werte: ${liste}`);
    html += schrittHTML("Summe", `${arr.join(" + ")} = ${result.sum}`);
    html += schrittHTML("Maximum", `Größter Wert der Liste = ${result.max}`);
    html += schrittHTML("Minimum", `Kleinster Wert der Liste = ${result.min}`);
    html += schrittHTML("Durchschnitt", `(${arr.join(" + ")}) / ${arr.length} = ${result.average}`);

    // ── Median ───────────────────────────────────────────────────────────
    const mid = Math.floor(result.sortiert.length / 2);
    const medianFormel = result.sortiert.length % 2 === 0
        ? `Sortiert: ${sortiertStr}<br>Mittelwert der beiden mittleren Werte: (${result.sortiert[mid - 1]} + ${result.sortiert[mid]}) / 2 = ${result.median}`
        : `Sortiert: ${sortiertStr}<br>Mittlerer Wert (Position ${mid + 1}) = ${result.median}`;
    html += schrittHTML("Median", medianFormel);

    // ── Modus ────────────────────────────────────────────────────────────
    const haeufigkeitsZeilen = [...result.modus.alleHaeufigkeiten.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([wert, h]) => `${wert} → ${h}×`)
        .join(", ");
    const modusFormel = result.modus.eindeutig
        ? `Häufigkeiten: ${haeufigkeitsZeilen}<br>Häufigster Wert(e): ${result.modus.werte.join(", ")} (je ${result.modus.haeufigkeit}×)`
        : `Häufigkeiten: ${haeufigkeitsZeilen}<br>Alle Werte kommen gleich oft vor ⇒ kein eindeutiger Modus`;
    html += schrittHTML(`Modus ${infoIconHTML("Der/die am häufigsten vorkommende(n) Wert(e)")}`, modusFormel);

    // ── Spannweite ───────────────────────────────────────────────────────
    html += schrittHTML("Spannweite", `Maximum − Minimum = ${result.max} − ${result.min} = ${result.spannweite}`);

    if (result.alleGanzzahlen) {
        html += schrittHTML(`ggT ${infoIconHTML("Größter gemeinsamer Teiler")}`, `ggT(${liste}) = ${result.ggt}`);
        html += schrittHTML(`kgV ${infoIconHTML("Kleinstes gemeinsames Vielfaches")}`, `kgV(${liste}) = ${result.kgv}`);
    } else {
        html += schrittHTML("ggT / kgV", "Nur für ganze Zahlen definiert – Eingabe enthält Dezimalzahlen.");
    }

    // ── Varianz ──────────────────────────────────────────────────────────
    const abweichungsZeilen = arr
        .map(x => `(${x} − ${result.average})² = ${rund4(Math.pow(x - result.average, 2))}`)
        .join("<br>");
    const summeQuadrateAnzeige = rund4(arr.reduce((acc, x) => acc + Math.pow(x - result.average, 2), 0));
    html += schrittHTML(
        `Varianz ${infoIconHTML("Durchschnittliche quadratische Abweichung vom Mittelwert")}`,
        `x̄ = ${result.average}<br>${abweichungsZeilen}<br>Summe = ${summeQuadrateAnzeige}<br>Varianz = ${summeQuadrateAnzeige} / ${arr.length} = ${result.varianz}`
    );

    // ── Standardabweichung ───────────────────────────────────────────────
    html += schrittHTML(
        `Standardabweichung ${infoIconHTML("Quadratwurzel der Varianz")}`,
        `√Varianz = √${result.varianz} = ${result.stdAbweichung}`
    );

    // ── Datenübersicht ───────────────────────────────────────────────────
    html += schrittHTML(
        "Datenübersicht",
        `Anzahl der Werte: ${result.anzahl}<br>Positive Werte: ${result.anzahlPositiv}<br>Negative Werte: ${result.anzahlNegativ}<br>Nullen: ${result.anzahlNullen}<br>Eindeutige Werte: ${result.anzahlEindeutig}`
    );

    // ── Sortierte Liste ──────────────────────────────────────────────────
    html += schrittHTML("Sortierte Liste", `${liste}<br>→ sortiert: ${sortiertStr}`);

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

    ausgabeMedian.textContent = "";
    ausgabeModus.textContent = "";
    ausgabeSpannweite.textContent = "";
    ausgabeVarianz.textContent = "";
    ausgabeStdAbw.textContent = "";

    ausgabeAnzahl.textContent = "";
    ausgabePositiv.textContent = "";
    ausgabeNegativ.textContent = "";
    ausgabeNullen.textContent = "";
    ausgabeEindeutig.textContent = "";
    ausgabeSortiert.textContent = "";

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

    ausgabeMedian.textContent     = result.median;
    ausgabeModus.textContent      = result.modus.eindeutig ? result.modus.werte.join(", ") : "Kein eindeutiger Modus";
    ausgabeSpannweite.textContent = result.spannweite;

    ausgabeVarianz.textContent = result.varianz;
    ausgabeStdAbw.textContent  = result.stdAbweichung;

    ausgabeAnzahl.textContent    = result.anzahl;
    ausgabePositiv.textContent   = result.anzahlPositiv;
    ausgabeNegativ.textContent   = result.anzahlNegativ;
    ausgabeNullen.textContent    = result.anzahlNullen;
    ausgabeEindeutig.textContent = result.anzahlEindeutig;
    ausgabeSortiert.textContent  = result.sortiert.join(", ");

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