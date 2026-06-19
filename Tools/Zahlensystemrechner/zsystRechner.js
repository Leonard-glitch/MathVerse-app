// ==========================
// 🔹 ELEMENTE
// ==========================
const btnAddInput = document.getElementById("btnAddInput");
const btnDeleteInput = document.getElementById("btnDeleteInput");
const btnRechnen = document.getElementById("buttonZahlenInput");
const container = document.getElementById("systemeContainer");
const output = document.getElementById("loesungOutput");
const errorBox = document.getElementById("errorMessages");

let anzahlZusatzInputs = 0;

// ==========================
// 🔹 INPUT HINZUFÜGEN
// ==========================
btnAddInput.addEventListener("click", () => {
    anzahlZusatzInputs++;

    // Erstelle Operator-Wrapper
    const wrapperOp = document.createElement("div");
    wrapperOp.className = "rechenZeichenSelectDiv zusatzElement"; // zusatzElement dient als Marker zum Löschen
    wrapperOp.innerHTML = `
        <select class="rechenZeichenSelect zusatzSelect">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
        </select>
    `;

    // Erstelle Input-Wrapper
    const wrapperInput = document.createElement("div");
    wrapperInput.className = "SytemDiv zusatzElement";
    wrapperInput.innerHTML = `
        <input type="number" 
               placeholder="Zahl ${anzahlZusatzInputs + 2}" 
               class="zahlenInput zusatzInput">
    `;

    container.appendChild(wrapperOp);
    container.appendChild(wrapperInput);
    
    // Fehler ausblenden bei Interaktion
    errorBox.style.display = "none";
});

// ==========================
// 🔹 INPUT LÖSCHEN (Dynamisch von unten)
// ==========================
btnDeleteInput.addEventListener("click", () => {
    // Finde alle dynamisch hinzugefügten Elemente
    const zusatzElemente = container.querySelectorAll(".zusatzElement");
    
    // Sicherstellen, dass die 2 fixen Startfelder niemals gelöscht werden können
    if (zusatzElemente.length >= 2) {
        // Entferne das letzte Inputfeld und das letzte Rechenzeichen (die letzten beiden Elemente im Array)
        container.removeChild(zusatzElemente[zusatzElemente.length - 1]); // Löscht das Input-Feld
        container.removeChild(zusatzElemente[zusatzElemente.length - 2]); // Löscht das Operator-Feld
        
        anzahlZusatzInputs--;
    } else {
        errorBox.textContent = "Die Standard-Eingabefelder können nicht gelöscht werden!";
        errorBox.style.display = "block";
        setTimeout(() => { errorBox.style.display = "none"; }, 3000);
    }
});

// ==========================
// 🔹 VALIDIERUNG & PARSE
// ==========================
function isValidForBase(value, base) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
    const regex = new RegExp(`^-?[${chars}]+(\\.[${chars}]+)?$`, "i");
    return regex.test(value.trim());
}

function parseBaseNumber(value, base) {
    value = value.trim().toUpperCase();
    if (!isValidForBase(value, base)) return null;

    let sign = 1;
    if (value.startsWith("-")) {
        sign = -1;
        value = value.slice(1);
    }

    let [intPart, fracPart] = value.split(".");

    let intValue = 0;
    for (let i = 0; i < intPart.length; i++) {
        intValue *= base;
        intValue += parseInt(intPart[i], base);
    }

    let fracValue = 0;
    if (fracPart) {
        for (let i = 0; i < fracPart.length; i++) {
            fracValue += parseInt(fracPart[i], base) / Math.pow(base, i + 1);
        }
    }

    return sign * (intValue + fracValue);
}

function toBaseString(number, base, precision = 10) {
    if (isNaN(number)) return "Fehler";

    let sign = number < 0 ? "-" : "";
    number = Math.abs(number);

    let intPart = Math.floor(number);
    let fracPart = number - intPart;

    let intStr = intPart.toString(base).toUpperCase();
    if (fracPart === 0) return sign + intStr;

    let fracStr = "";
    for (let i = 0; i < precision; i++) {
        fracPart *= base;
        let digit = Math.floor(fracPart);
        fracStr += digit.toString(base).toUpperCase();
        fracPart -= digit;
        if (fracPart === 0) break;
    }

    return sign + intStr + "." + fracStr;
}

function calculate(a, b, op) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") {
        if (b === 0) return "DIV0";
        return a / b;
    }
}

// ==========================
// 🔹 MAIN LOGIK
// ==========================
btnRechnen.addEventListener("click", () => {
    errorBox.style.display = "none";
    const base = parseInt(document.getElementById("basea").value);

    const zahl1Raw = document.getElementById("zahl1Input").value;
    const zahl2Raw = document.getElementById("zahl2Input").value;
    const opMain = document.getElementById("rechenZeichenMain").value;

    const zahl1 = parseBaseNumber(zahl1Raw, base);
    const zahl2 = parseBaseNumber(zahl2Raw, base);

    if (zahl1 === null || zahl2 === null) {
        errorBox.textContent = `Ungültige Eingabe für Basis ${base}`;
        errorBox.style.display = "block";
        output.textContent = "";
        return;
    }

    // Wir sammeln alle Zeilen für den schriftlichen Rechenweg in einem Array
    let rechenwegZeilen = [];
    
    // Erste Zahl hinzufügen
    const strZahl1 = toBaseString(zahl1, base);
    rechenwegZeilen.push({ op: "", zahl: strZahl1 });

    // Zweite Zahl mit Hauptoperator hinzufügen
    const strZahl2 = toBaseString(zahl2, base);
    rechenwegZeilen.push({ op: opMain, zahl: strZahl2 });

    let aktuellesErgebnis = calculate(zahl1, zahl2, opMain);

    if (aktuellesErgebnis === "DIV0") {
        errorBox.textContent = "Division durch 0!";
        errorBox.style.display = "block";
        output.textContent = "";
        return;
    }

    // Selektiert die dynamisch erzeugten Zusatzfelder
    const ops = document.querySelectorAll(".zusatzSelect");
    const values = document.querySelectorAll(".zusatzInput");

    // Schleife für alle weiteren Zusatz-Eingaben
    for (let i = 0; i < ops.length; i++) {
        const valParsed = parseBaseNumber(values[i].value, base);

        if (valParsed === null) {
            errorBox.textContent = `Ungültige Eingabe in Zusatzfeld ${i + 1}`;
            errorBox.style.display = "block";
            output.textContent = "";
            return;
        }

        // Zusatzoperator und Zusatzzahl für das Schriftbild registrieren
        const strZusatzZahl = toBaseString(valParsed, base);
        rechenwegZeilen.push({ op: ops[i].value, zahl: strZusatzZahl });

        aktuellesErgebnis = calculate(aktuellesErgebnis, valParsed, ops[i].value);

        if (aktuellesErgebnis === "DIV0") {
            errorBox.textContent = "Division durch 0!";
            errorBox.style.display = "block";
            output.textContent = "";
            return;
        }
    }

    // Finale Lösung als String holen
    const strErgebnis = toBaseString(aktuellesErgebnis, base);

    // 🔹 RECHENWEG GENERIEREN (Dynamische schriftliche Darstellung)
    const rechenwegDiv = document.querySelector(".rechenwegDiv");
    const rechenwegOutput = document.getElementById("rechenwegOutput");

    // Maximale Länge ermitteln, um alles perfekt rechtsbündig auszurichten
    let maxLaenge = strErgebnis.length;
    rechenwegZeilen.forEach(item => {
        const kombinierteLaenge = item.op.length + item.zahl.length;
        if (kombinierteLaenge > maxLaenge) {
            maxLaenge = kombinierteLaenge;
        }
    });

    // Hilfsfunktion zum Auffüllen mit Leerzeichen links (Rechtsbündigkeit)
    const padLeft = (str, len) => " ".repeat(Math.max(0, len - str.length)) + str;

    // Block zeilenweise zusammensetzen
    let ausgabeText = "";
    rechenwegZeilen.forEach(item => {
        // Verbindet Operator und Zahl (z.B. "+0111" oder bei der ersten Zeile einfach nur die Zahl)
        const kombinierterString = item.op + item.zahl;
        ausgabeText += padLeft(kombinierterString, maxLaenge) + "\n";
    });

    // Trennlinie und Endergebnis anhängen
    const trennLinie = "-".repeat(maxLaenge);
    ausgabeText += trennLinie + "\n" + padLeft(strErgebnis, maxLaenge);

    // Text in das pre-Feld schreiben
    rechenwegOutput.textContent = ausgabeText;
    
    // Rechenweg-Container sichtbar machen
    rechenwegDiv.style.display = "flex";

    // 🔹 Haupt-Ergebnis anzeigen
    output.innerHTML = `${strErgebnis}<sub style="font-size:0.6em;">${base}</sub>`;
});