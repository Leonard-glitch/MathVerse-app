
const inputs = [
    document.getElementById("inputFeld1"),
    document.getElementById("inputFeld2"),
    document.getElementById("inputFeld3"),
    document.getElementById("inputFeld4")
];

const errorMessages=document.getElementById("errorMessages");
const ausgabeContainer=document.getElementById("ausgabeContainer");
const rechenwegOutput=document.getElementById("rechenwegOutput");
const typeButtons=document.querySelectorAll(".dreisatzTypeBtn");

let currentType = "proportional"; 


 
const PROP_MAP = {
    0: { num: [1, 2], den: 3 },
    1: { num: [0, 3], den: 2 },
    2: { num: [0, 3], den: 1 },
    3: { num: [1, 2], den: 0 }
};

const ANTIPROP_MAP = {
    0: { num: [2, 3], den: 1 },
    1: { num: [2, 3], den: 0 },
    2: { num: [0, 1], den: 3 },
    3: { num: [0, 1], den: 2 }
};

function getMap(isProp) {
    return isProp ? PROP_MAP : ANTIPROP_MAP;
}



function parseVal(el) {
    const raw = el.value.trim();
    if (raw === "") return null;
    return Number(raw.replace(",", "."));
}

// Rundet auf 6 Nachkommastellen und killt Floating-Point-Reste
function formatNum(n) {
    const rounded = Math.round((n + Number.EPSILON) * 1e6) / 1e6;
    return rounded.toString();
}

function hideError() {
    errorMessages.style.display = "none";
}

function showError(msg) {
    errorMessages.textContent   = msg;
    errorMessages.style.display = "block";
    ausgabeContainer.style.display = "none";
}



function calculate() {
    hideError();

    const values = inputs.map(parseVal);

    if (values.some(v => Number.isNaN(v))) {
        showError("Bitte nur gültige Zahlen eingeben.");
        return;
    }

    //Zielfeld(er) bestimmen: leer ODER zuvor berechnet
    const targetIndexes = inputs
        .map((el, i) => (values[i] === null || el.classList.contains("is-result")) ? i : -1)
        .filter(i => i !== -1);

    if (targetIndexes.length === 0) {
        showError("Bitte genau ein Feld leer lassen – es wird automatisch berechnet.");
        return;
    }

    if (targetIndexes.length > 1) {
        ausgabeContainer.style.display = "none"; // noch nicht genug Werte
        return;
    }

    const targetIndex = targetIndexes[0];
    const isProp = currentType === "proportional";
    const map = getMap(isProp)[targetIndex];

    const numerator   = values[map.num[0]] * values[map.num[1]];
    const denominator = values[map.den];

    if (denominator === 0) {
        showError("Division durch 0 ist bei dieser Eingabe nicht möglich.");
        return;
    }

    const result = numerator / denominator;

    const targetInput = inputs[targetIndex];
    targetInput.value = formatNum(result);
    targetInput.classList.add("is-result");

    renderRechenweg(targetIndex, values, isProp, map, result);
}


//RECHENWEG


function renderRechenweg(targetIndex, values, isProp, map, result) {
    const label = i => `Wert ${i + 1}`;
    const val   = i => formatNum(values[i]);

    const beziehungZeile = isProp
        ? "Wert 1 : Wert 2 = Wert 3 : Wert 4"
        : "Wert 1 × Wert 2 = Wert 3 × Wert 4";

    const formelZeile   = `${label(targetIndex)} = (${label(map.num[0])} × ${label(map.num[1])}) / ${label(map.den)}`;
    const rechnungZeile = `${label(targetIndex)} = (${val(map.num[0])} × ${val(map.num[1])}) / ${val(map.den)}`;

    rechenwegOutput.innerHTML = `<pre>${beziehungZeile}

Formel:    ${formelZeile}
Rechnung:  ${rechnungZeile} = <b>${formatNum(result)}</b></pre>`;

    ausgabeContainer.style.display = "flex";
}


//EVENTS


inputs.forEach(input => {
    input.addEventListener("input", () => {
        input.classList.remove("is-result"); // Nutzer tippt -> Feld zählt wieder als gegeben
        calculate();
    });

    input.addEventListener("focus", () => input.select());

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") input.blur();
    });
});

typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        typeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentType = btn.dataset.type;
        calculate();
    });
});