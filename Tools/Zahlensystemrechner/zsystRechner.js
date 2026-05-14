// ==========================
// 🔹 ELEMENTE
// ==========================
const btnAddInput = document.getElementById("btnAddInput");
const btnRechnen = document.getElementById("buttonZahlenInput");
const output = document.getElementById("loesungOutput");

let anzahlZusatzInputs = 0;

// ==========================
// 🔹 INPUT HINZUFÜGEN
// ==========================
btnAddInput.addEventListener("click", () => {
    const container = document.getElementById("systemeContainer");
    anzahlZusatzInputs++;

    const wrapper = document.createElement("div");
    wrapper.className = "vrechenZeichenSelectDiv";

    wrapper.innerHTML = `
        <select class="rechenZeichenSelect">
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
        </select>
    `;

    const wrapper2 = document.createElement("div");
    wrapper2.className = "SytemDiv";

    wrapper2.innerHTML = `
        <input type="text" 
               placeholder="Zahl ${anzahlZusatzInputs + 2}" 
               class="zahlenInput">
    `;

    container.appendChild(wrapper);
    container.appendChild(wrapper2);
});










// ==========================
// 🔹 VALIDIERUNG (inkl. Komma)
// ==========================
function isValidForBase(value, base) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
    const regex = new RegExp(`^-?[${chars}]+(\\.[${chars}]+)?$`, "i");
    return regex.test(value.trim());
}

// ==========================
// 🔹 PARSE (auch Kommazahlen)
// ==========================
function parseBaseNumber(value, base) {
    value = value.trim().toUpperCase();

    if (!isValidForBase(value, base)) return null;

    let sign = 1;
    if (value.startsWith("-")) {
        sign = -1;
        value = value.slice(1);
    }

    let [intPart, fracPart] = value.split(".");

    // Ganzzahlteil
    let intValue = 0;
    for (let i = 0; i < intPart.length; i++) {
        intValue *= base;
        intValue += parseInt(intPart[i], base);
    }

    // Nachkommateil
    let fracValue = 0;
    if (fracPart) {
        for (let i = 0; i < fracPart.length; i++) {
            fracValue += parseInt(fracPart[i], base) / Math.pow(base, i + 1);
        }
    }

    return sign * (intValue + fracValue);
}

// ==========================
// 🔹 ZURÜCK INS SYSTEM (mit Komma)
// ==========================
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

// ==========================
// 🔹 RECHNEN
// ==========================
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

    const base = parseInt(document.getElementById("basea").value);

    const zahl1Raw = document.getElementById("zahl1Input").value;
    const zahl2Raw = document.getElementById("zahl2Input").value;
    const opMain = document.getElementById("rechenZeichenMain").value;

    const zahl1 = parseBaseNumber(zahl1Raw, base);
    const zahl2 = parseBaseNumber(zahl2Raw, base);

    // ❌ Fehler erste Inputs
    if (zahl1 === null || zahl2 === null) {
        output.textContent = `Ungültige Eingabe für Basis ${base}`;
        return;
    }

    let ergebnis = calculate(zahl1, zahl2, opMain);

    if (ergebnis === "DIV0") {
        output.textContent = "Division durch 0!";
        return;
    }

    // 🔹 Zusatzinputs
    const ops = document.querySelectorAll(".zusatzSelect");
    const values = document.querySelectorAll(".zusatzInput");

    for (let i = 0; i < ops.length; i++) {

        const valParsed = parseBaseNumber(values[i].value, base);

        if (valParsed === null) {
            output.textContent = `Ungültige Eingabe in Zusatzfeld ${i + 1}`;
            return;
        }

        ergebnis = calculate(ergebnis, valParsed, ops[i].value);

        if (ergebnis === "DIV0") {
            output.textContent = "Division durch 0!";
            return;
        }
    }

    // 🔹 Ergebnis anzeigen
    output.textContent = toBaseString(ergebnis, base);
});