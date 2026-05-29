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
const imperialUnits = ["in", "ft", "yd", "mi", "NM", "ly", "gr", "oz", "lb", "st", "ct"];

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
        // --- LESBARE DEZIMALZAHL-LOGIK (Reine Multiplikation bleibt) ---
        let printFactor;
        
        // Wenn der Faktor extrem winzig (< 0.000001) oder gigantisch ist, 
        // nutzen wir als Notfall-Layoutschutz die Exponenten-Schreibweise.
        // Dazwischen (wie bei 0.0001) erzwingen wir die normale Dezimalzahl.
        if (directFactor !== 0 && (directFactor < 0.000001 || directFactor > 10000000)) {
            printFactor = directFactor.toExponential(6);
        } else {
            // toFixed(10) wirft das '1e-4' raus, parseFloat entfernt unnötige Nullen am Ende
            printFactor = parseFloat(directFactor.toFixed(10)).toString();
        }
        
        rechenwegOutput.innerHTML = `
            <pre>Formel:    Wert × ${printFactor}\nRechnung:  ${parsedValue} ${unitFrom} × ${printFactor} = <b>${formattedResult} ${unitTo}</b></pre>
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

        // Standard-Zuordnungen beim harten Wechsel der Hauptkategorie
        if (currentCategory === "length") {
            einheitA.value = "m";
            einheitZ.value = "cm";
        } else if (currentCategory === "mass") {
            einheitA.value = "kg";
            einheitZ.value = "g";
        } else if (currentCategory === "time") {
            einheitA.value = "h";
            einheitZ.value = "min";
        }

        calculate();
    });
});

// Advanced Mode Switch Event Listener mit LocalStorage Anbindung
advancedCheckbox.addEventListener("change", () => {
    localStorage.setItem("advancedModeActive", advancedCheckbox.checked);
    updateDropdowns();
    calculate();
});

inputEinheit.addEventListener("input", calculate);
einheitA.addEventListener("change", calculate);
einheitZ.addEventListener("change", calculate);

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    // Advanced Mode Zustand aus dem LocalStorage holen
    const savedAdvancedState = localStorage.getItem("advancedModeActive");
    if (savedAdvancedState === "true") {
        advancedCheckbox.checked = true;
    } else {
        advancedCheckbox.checked = false;
    }

    // Ersten Button (Length) triggern, um die Anwendung zu starten
    const firstButton = document.querySelector('[data-category="btnLength"]');
    if (firstButton) firstButton.click();
});