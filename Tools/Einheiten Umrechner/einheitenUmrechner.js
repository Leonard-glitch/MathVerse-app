const units = {
    length: {
        // Metrisch klein
        nm: 0.000000001,
        µm: 0.000001,
        mm: 0.001,
        cm: 0.01,
        dm: 0.1,
        m: 1,
        km: 1000,
        // Imperial / US
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344,
        NM: 1852, // Seemeile
        // Astronomisch
        ly: 9460730472580800 // Lichtjahr
    },
    mass: {
        // Metrisch (vollständig von klein bis groß)
        µg: 0.000001,   // Mikrogramm
        mg: 0.001,      // Milligramm
        cg: 0.01,       // Zentigramm
        dg: 0.1,        // Dezigramm
        g: 1,           // Gramm (unsere Rechenbasis für Masse)
        dag: 10,        // Dekagramm (1 dag = 10 g)
        hg: 100,        // Hektogramm (1 hg = 100 g)
        kg: 1000,       // Kilogramm
        dt: 100000,     // Doppelzentner (100 kg)
        t: 1000000,     // Tonne
        // Imperial / US
        gr: 0.06479891, // Grain (Gran)
        oz: 28.349523125, // Unze
        lb: 453.59237,  // Pfund
        st: 6350.29318, // Stone (Stein)
        ct: 0.2         // Karat (für Edelsteine)
    },
    time: {
        // Winzig
        ns: 0.000000001,
        µs: 0.000001,
        ms: 0.001,
        // Standard
        s: 1,
        min: 60,
        h: 3600,
        d: 86400,
        wk: 604800,
        mo: 2628000,    // Durchschnittlicher Monat (30.41 Tage)
        yr: 31536000,   // Normaljahr (365 Tage)
        dec: 315360000, // Jahrzehnt
        cen: 3153600000 // Jahrhundert
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

let currentCategory = "length"; 

function hideError() {
    errorMessages.style.opacity = "0";
    errorMessages.style.display = "none";
}

function showError() {
    errorMessages.style.display = "block";
    setTimeout(() => {
        errorMessages.style.opacity = "1";
    }, 10);
}

// Funktion zur Berechnung
function calculate() {
    const inputValue = inputEinheit.value.trim();
    
    if (inputValue === "") {
        loesungOutput.innerText = "Ergebnis";
        rechenwegOutput.innerHTML = "";
        hideError();
        return;
    }

    // Komma durch Punkt ersetzen für die mathematische Prüfung
    const cleanedInput = inputValue.replace(",", ".");

    // Strikt prüfen: Ist es KEINE gültige reine Zahl?
    // Number() konvertiert im Gegensatz zu parseFloat() den String nur, wenn er komplett numerisch ist.
    if (isNaN(Number(cleanedInput)) || cleanedInput === "") {
        showError();
        loesungOutput.innerText = "Fehler";
        rechenwegOutput.innerHTML = "";
        return;
    } else {
        hideError();
    }

    // Erst NACHDER Validierung parsen wir den Wert für die Rechnung
    const parsedValue = parseFloat(cleanedInput);

    const unitFrom = einheitA.value;
    const unitTo = einheitZ.value;

    if (!unitFrom || !unitTo) return;

    // 1. Direkten Umrechnungsfaktor bestimmen
    // Beispiel h (3600) zu min (60) -> 3600 / 60 = 60. Der Faktor ist also genau 60!
    const directFactor = units[currentCategory][unitFrom] / units[currentCategory][unitTo];
    
    // 2. Direkt multiplizieren
    const result = parsedValue * directFactor;

    // Exponentielle Darstellung für extrem kleine/große Zahlen abfangen
    let formattedResult;
    if (result !== 0 && (Math.abs(result) < 0.00001 || Math.abs(result) > 100000000)) {
        formattedResult = result.toExponential(5);
    } else {
        formattedResult = Number(result.toFixed(6));
    }

    // Ergebnis anzeigen
    loesungOutput.innerText = `${formattedResult} ${unitTo}`;

    // 3. Den Rechenweg wunderschön und einfach ausgeben
    if (unitFrom === unitTo) {
        rechenwegOutput.innerHTML = `Identische Einheiten: Keine Berechnung notwendig.`;
    } else {
        // Faktor für die Anzeige lesbar machen
        const printFactor = directFactor < 0.001 || directFactor > 1000000 ? directFactor.toExponential(4) : Number(directFactor.toFixed(6));
        
        rechenwegOutput.innerHTML = `
            Formel: Wert &times; ${printFactor}<br>
            Rechnung: ${parsedValue} ${unitFrom} &times; ${printFactor} = <b>${formattedResult} ${unitTo}</b>
        `;
    }
}

// Event Listener für die Kategorie-Buttons
unitsButtons.forEach(button => {
    button.addEventListener("click", function() {
        unitsButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        const type = button.dataset.category;
        currentCategory = type.replace("btn", "").toLowerCase();

        const keys = Object.keys(units[currentCategory]);

        einheitA.innerHTML = "";
        einheitZ.innerHTML = "";

        keys.forEach(unit => {
            einheitA.innerHTML += `<option value="${unit}">${unit}</option>`;
            einheitZ.innerHTML += `<option value="${unit}">${unit}</option>`;
        });

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

inputEinheit.addEventListener("input", calculate);
einheitA.addEventListener("change", calculate);
einheitZ.addEventListener("change", calculate);

document.addEventListener("DOMContentLoaded", () => {
    const firstButton = document.querySelector('[data-category="btnLength"]');
    if (firstButton) firstButton.click();
});