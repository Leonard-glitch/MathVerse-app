// Vollständige Einheiten-Struktur (Aufgeteilt in Basic und Advanced)
const unitsConfig = {
    length: {
        basics: {
            mm: 0.001,
            cm: 0.01,
            dm: 0.1,
            m: 1,
            km: 1000
        },
        advanced: {
            nm: 0.000000001,
            µm: 0.000001,
            in: 0.0254,
            ft: 0.3048,
            yd: 0.9144,
            mi: 1609.344,
            NM: 1852,
            ly: 9460730472580800
        }
    },
    mass: {
        basics: {
            mg: 0.001,
            g: 1,
            kg: 1000,
            t: 1000000
        },
        advanced: {
            µg: 0.000001,
            cg: 0.01,
            dg: 0.1,
            dag: 10,
            hg: 100,
            dt: 100000,
            gr: 0.06479891,
            oz: 28.349523125,
            lb: 453.59237,
            st: 6350.29318,
            ct: 0.2
        }
    },
    time: {
        basics: {
            s: 1,
            min: 60,
            h: 3600,
            d: 86400
        },
        advanced: {
            ns: 0.000000001,
            µs: 0.000001,
            ms: 0.001,
            wk: 604800,
            mo: 2628000,
            yr: 31536000,
            dec: 315360000,
            cen: 3153600000
        }
    },
    area: {
        basics: {
            "mm²": 0.000001,
            "cm²": 0.0001,
            "dm²": 0.01,
            "m²": 1,
            "a": 100,          // Ar
            "ha": 10000,       // Hektar
            "km²": 1000000
        },
        advanced: {
            "in²": 0.00064516,
            "ft²": 0.09290304,
            "yd²": 0.83612736,
            "ac": 4046.8564224, // Acre
            "mi²": 2589988.110336
        }
    },

    speed: {
        basics: {
            "mm/s": 0.001,
            "cm/s": 0.01,
            "m/s": 1,
            "km/h": 0.27777777778,
            "km/s": 1000
        },
        advanced: {
            "in/s": 0.0254,
            "ft/s": 0.3048,
            "mph": 0.44704,
            "kn": 0.51444444444,   // Knoten
            "mach": 340.3,         // Mach 1 (Standardatmosphäre, ~15°C)
            "c": 299792458         // Lichtgeschwindigkeit
        }
    }
};

// DOM Elemente abgreifen
const einheitA = document.getElementById("einheitA");
const einheitZ = document.getElementById("einheitZ");
const inputEinheit = document.getElementById("inputEinheit");
const loesungOutput = document.getElementById("loesungOutput");
const rechenwegOutput = document.getElementById("rechenwegOutput");
const errorMessages = document.getElementById("errorMessages");
const unitsButtons = document.querySelectorAll(".btnUnits");
const advancedCheckbox = document.querySelector(".advancedMode input[type='checkbox']");

let currentCategory = "length"; 

// Liste aller imperialen, US-amerikanischen und astronomischen Einheiten
const imperialUnits = [
    "in", "ft", "yd", "mi", "NM", "ly",        // Länge
    "gr", "oz", "lb", "st", "ct",              // Masse
    "in²", "ft²", "yd²", "ac", "mi²",          // Fläche
    "in/s", "ft/s", "mph", "kn", "mach", "c"   // Geschwindigkeit
];

// Standard-Zuordnungen beim harten Wechsel der Hauptkategorie
        const categoryDefaults = {
            length: { from: "m",    to: "cm" },
            mass:   { from: "kg",   to: "g" },
            time:   { from: "h",    to: "min" },
            area:   { from: "m²",   to: "cm²" },
            speed:  { from: "km/h", to: "m/s" }
        };
// Hilfsfunktion: Holt die aktivierten Einheiten und sortiert sie sauber nach System und Größe
function getActiveUnits() {
    const category = unitsConfig[currentCategory];
    let combinedUnits = {};

    if (advancedCheckbox.checked) {
        combinedUnits = { ...category.basics, ...category.advanced };
    } else {
        combinedUnits = { ...category.basics };
    }

    // Einheiten nach System und Wert sortieren
    return sortUnitsBySystemAndValue(combinedUnits);
}

// Sortiert ein Objekt: Erst Metrisch (klein -> groß), dann Imperial/Astro (klein -> groß)
function sortUnitsBySystemAndValue(obj) {
    const entries = Object.entries(obj);
    
    // 1. Metrische Einheiten filtern und sortieren
    const metricEntries = entries
        .filter(([key]) => !imperialUnits.includes(key))
        .sort((a, b) => a[1] - b[1]);
        
    // 2. Imperiale / US / Astro Einheiten filtern und sortieren
    const imperialEntries = entries
        .filter(([key]) => imperialUnits.includes(key))
        .sort((a, b) => a[1] - b[1]);

    // Beide sortierten Arrays wieder zu einem einzigen Objekt zusammenführen
    return Object.fromEntries([...metricEntries, ...imperialEntries]);
}

// DOM Element für den Ausgabe-Container greifen
const ausgabeContainer = document.getElementById("ausgabeContainer");
const rechenwegDiv = document.querySelector(".rechenwegDiv");

// Hilfsfunktionen für die Sichtbarkeit von Fehlern und Ergebnissen
function hideError() {
    errorMessages.style.display = "none";
}

function showError(msg = "Falsche Eingabe") {
    // 1. Rechenweg-Box komplett unsichtbar machen
    ausgabeContainer.style.display = "none"; 
    
    // 2. Fehlermeldung befüllen und anzeigen
    errorMessages.textContent = msg;
    errorMessages.style.display = "block"; 
}

// Die Berechnungs-Funktion
function calculate() {
    const inputValue = inputEinheit.value.trim();
    
    // Fall 1: Das Eingabefeld ist komplett leer
    if (inputValue === "") {
        loesungOutput.innerText = "Ergebnis";
        rechenwegOutput.innerHTML = "";
        ausgabeContainer.style.display = "none"; // Kein Rechenweg
        hideError();                             // Kein Fehler
        return;
    }

    const cleanedInput = inputValue.replace(",", ".");

    // Fall 2: Die Eingabe ist keine gültige Zahl (FEHLERFALL)
    if (isNaN(Number(cleanedInput)) || cleanedInput === "") {
        loesungOutput.innerText = "Fehler";
        rechenwegOutput.innerHTML = "";
        showError("Falsche Eingabe"); // Hier wird der Rechenweg versteckt und der rote Fehler gezeigt
        return;
    } 

    // Wenn wir hier landen, ist die Zahl valide -> Fehler wegschalten!
    hideError();

    const parsedValue = parseFloat(cleanedInput);
    const unitFrom = einheitA.value;
    const unitTo = einheitZ.value;

    if (!unitFrom || !unitTo) return;

    const currentUnitsList = getActiveUnits();
    
    if (!currentUnitsList[unitFrom] || !currentUnitsList[unitTo]) {
        loesungOutput.innerText = "Ergebnis";
        rechenwegOutput.innerHTML = "";
        ausgabeContainer.style.display = "none";
        return;
    }

    // Mathematische Berechnung
    const directFactor = currentUnitsList[unitFrom] / currentUnitsList[unitTo];
    const result = parsedValue * directFactor;

    let formattedResult;
    if (result !== 0 && (Math.abs(result) < 0.00001 || Math.abs(result) > 100000000)) {
        formattedResult = result.toExponential(5);
    } else {
        formattedResult = Number(result.toFixed(6));
    }

    loesungOutput.innerText = `${formattedResult} ${unitTo}`;

    // Fall 3: Erfolgreiche Berechnung -> Rechenweg-Box einblenden
    ausgabeContainer.style.display = "flex"; 

    if (unitFrom === unitTo) {
    rechenwegOutput.innerHTML = `<pre>Identische Einheiten: Keine Berechnung notwendig.</pre>`;
    } else {
    // Faktor für die ANZEIGE bestimmen: manchmal ist der Kehrwert "schöner"
    // (z.B. ÷ 3.6 statt × 0.2777777778 bei km/h -> m/s)
    let displayOperator = "×";
    let displayFactor = directFactor;

    if (directFactor >= 0.0001 && directFactor < 1) {
        const inverse = 1 / directFactor;
        if (countDecimals(inverse) <= 4 && countDecimals(inverse) < countDecimals(directFactor)) {
            displayOperator = "÷";
            displayFactor = inverse;
        }
    }

    const printFactor = formatFactor(displayFactor);

    rechenwegOutput.innerHTML = `
        <pre>Formel:    Wert ${displayOperator} ${printFactor}\nRechnung:  ${parsedValue} ${unitFrom} ${displayOperator} ${printFactor} = <b>${formattedResult} ${unitTo}</b></pre>
    `;
    }
}

// Generiert die Optionen für die Dropdowns basierend auf dem Advanced-Status
function updateDropdowns() {
    const currentUnitsList = getActiveUnits();
    const keys = Object.keys(currentUnitsList);

    // Aktuelle Auswahl sichern, um sie wenn möglich zu behalten
    const oldFrom = einheitA.value;
    const oldTo = einheitZ.value;

    einheitA.innerHTML = "";
    einheitZ.innerHTML = "";

    keys.forEach(unit => {
        einheitA.innerHTML += `<option value="${unit}">${unit}</option>`;
        einheitZ.innerHTML += `<option value="${unit}">${unit}</option>`;
    });

    // Versuchen die alten Werte zu setzen, sonst Fallback auf Standard basics
    if (keys.includes(oldFrom)) einheitA.value = oldFrom;
    else einheitA.value = keys[0];

    if (keys.includes(oldTo)) einheitZ.value = oldTo;
    else einheitZ.value = keys[1] || keys[0];
}

// Event Listener für die Kategorie-Buttons
unitsButtons.forEach(button => {
    button.addEventListener("click", function() {
        unitsButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        const type = button.dataset.category;
        currentCategory = type.replace("btn", "").toLowerCase();

        updateDropdowns();

        const defaults = categoryDefaults[currentCategory];
        if (defaults) {
            einheitA.value = defaults.from;
            einheitZ.value = defaults.to;
        }


        calculate();
    });
});

// Rundet auf 10 Nachkommastellen (killt Floating-Point-Reste wie 3.5999999999997)
// und zählt, wie viele "echte" Nachkommastellen übrig bleiben.
function countDecimals(num) {
    const rounded = Math.round(num * 1e10) / 1e10;
    const str = rounded.toString();
    if (str.includes("e")) return Infinity; // Exponentialschreibweise -> nicht "schön"
    const parts = str.split(".");
    return parts[1] ? parts[1].length : 0;
}

// Formatiert einen Faktor für die Anzeige im Rechenweg
function formatFactor(num) {
    if (num !== 0 && (Math.abs(num) < 0.000001 || Math.abs(num) > 10000000)) {
        return num.toExponential(6);
    }
    return parseFloat(num.toFixed(10)).toString();
}


inputEinheit.addEventListener("input", calculate);
einheitA.addEventListener("change", calculate);
einheitZ.addEventListener("change", calculate);

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    window.MV.bindAdvancedToggle(advancedCheckbox, "einheitenUmrechner", () => {
        updateDropdowns();
        calculate();
    });

    const firstButton = document.querySelector('[data-category="btnLength"]');
    if (firstButton) firstButton.click();
});