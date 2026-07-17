
// ── CONFIGURATION: Hier definierst du alle Formen und ihre benötigten Inputs ──
const shapeConfig = {
    // --- 2D FIGUREN ---
    circle: {
        name: 'Kreis',
        dimension: '2d',
        type: 1,
        inputs: [
            { id: 'r', label: 'Radius (r)' },
            { id: 'd', label: 'Durchmesser (d)' },
            { id: 'u', label: 'Umfang (U)' },
            { id: 'A', label: 'Fläche (A)' }
        ]
    },
    rectangle: {
        name: 'Rechteck',
        dimension: '2d',
        type: 2,
        inputs: [
            { id: 'a', label: 'Seite a' },
            { id: 'b', label: 'Seite b' },
            { id: 'A', label: 'Fläche (A)' },
            { id: 'u', label: 'Umfang (U)' },
            { id: 'd', label: 'Diagonale (d)' }
        ]
    },
    square: {
        name: 'Quadrat',
        dimension: '2d',
        type: 1,
        inputs: [
            { id: 'a', label: 'Seitenlänge (a)' },
            { id: 'u', label: 'Umfang (U)' },
            { id: 'A', label: 'Fläche (A)' },
            { id: 'd', label: 'Diagonale (d)' }
        ]
    },
    triangle: {
        name: 'Allgemeines Dreieck',
        dimension: '2d',
        type: 3,
        inputs: [
            { id: 'a', label: 'Seite a' },
            { id: 'b', label: 'Seite b' },
            { id: 'c', label: 'Seite c' },
            { id: 'alpha', label: 'Winkel α' },
            { id: 'beta', label: 'Winkel β' },
            { id: 'gamma', label: 'Winkel γ' },
            { id: 'ha', label: 'Höhe ha' },
            { id: 'hb', label: 'Höhe hb' },
            { id: 'hc', label: 'Höhe hc' },
            { id: 'A', label: 'Fläche (A)' }
        ],
        redundantGroups: [['alpha', 'beta', 'gamma']]
    },
    rightTriangle: {
        name: 'Rechtwinkliges Dreieck',
        dimension: '2d',
        type: 2,
        inputs: [
            { id: 'a', label: 'Kathete a' },
            { id: 'b', label: 'Kathete b' },
            { id: 'c', label: 'Hypotenuse c' },
            { id: 'alpha', label: 'Winkel α' },
            { id: 'beta', label: 'Winkel β' },
            { id: 'A', label: 'Fläche (A)' }
        ],
        redundantGroups: [['alpha', 'beta']]
    },
    trapezoid: {
        name: 'Trapez',
        dimension: '2d',
        type: 3,
        inputs: [
            { id: 'a', label: 'Grundseite a' },
            { id: 'c', label: 'Parallele Seite c' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'A', label: 'Fläche (A)' }
        ]
    },
    parallelogram: {
        name: 'Parallelogramm',
        dimension: '2d',
        type: 3,
        inputs: [
            { id: 'a', label: 'Seite a' },
            { id: 'b', label: 'Seite b' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'A', label: 'Fläche (A)' }
        ]
    },
    rhombus: {
        name: 'Raute',
        dimension: '2d',
        type: 3,
        inputs: [
            { id: 'a', label: 'Seitenlänge (a)' },
            { id: 'e', label: 'Diagonale e' },
            { id: 'f', label: 'Diagonale f' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'u', label: 'Umfang (U)' },
            { id: 'A', label: 'Fläche (A)' }
        ],
        redundantGroups: [['a', 'u']]
    },

    // --- 3D KÖRPER ---
    cube: {
        name: 'Würfel',
        dimension: '3d',
        type: 1,
        inputs: [
            { id: 'a', label: 'Kantenlänge (a)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'V', label: 'Volumen (V)' },
            { id: 'd', label: 'Raumdiagonale (d)' }
        ]
    },
    cuboid: {
        name: 'Quader',
        dimension: '3d',
        type: 3,
        inputs: [
            { id: 'a', label: 'Länge (a)' },
            { id: 'b', label: 'Breite (b)' },
            { id: 'c', label: 'Höhe (c)' },
            { id: 'V', label: 'Volumen (V)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'd', label: 'Raumdiagonale (d)' },
            { id: 'G', label: 'Grundfläche (G)' }
        ]
    },
    sphere: {
        name: 'Kugel',
        dimension: '3d',
        type: 1,
        inputs: [
            { id: 'r', label: 'Radius (r)' },
            { id: 'd', label: 'Durchmesser (d)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'V', label: 'Volumen (V)' }
        ]
    },
    cylinder: {
        name: 'Zylinder',
        dimension: '3d',
        type: 2,
        inputs: [
            { id: 'r', label: 'Radius (r)' },
            { id: 'd', label: 'Durchmesser (d)' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'V', label: 'Volumen (V)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'M', label: 'Mantelfläche (M)' },
            { id: 'G', label: 'Grundfläche (G)' }
        ],
        redundantGroups: [['r', 'd']]
    },
    cone: {
        name: 'Kegel',
        dimension: '3d',
        type: 2,
        inputs: [
            { id: 'r', label: 'Radius (r)' },
            { id: 'd', label: 'Durchmesser (d)' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 's', label: 'Mantellinie (s)' },
            { id: 'V', label: 'Volumen (V)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'M', label: 'Mantelfläche (M)' },
            { id: 'G', label: 'Grundfläche (G)' }
        ],
        redundantGroups: [['r', 'd']]
    },
    quadrangularpyramid: {
        name: 'Quadratische Pyramide',
        dimension: '3d',
        type: 2,
        inputs: [
            { id: 'a', label: 'Grundkante (a)' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'ha', label: 'Seitenhöhe (ha)' },
            { id: 'V', label: 'Volumen (V)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'M', label: 'Mantelfläche (M)' },
            { id: 'G', label: 'Grundfläche (G)' }
        ]
    },
    rectangularpyramid: {
        name: 'Rechteckige Pyramide',
        dimension: '3d',
        type: 3,
        inputs: [
            { id: 'a', label: 'Grundkante a' },
            { id: 'b', label: 'Grundkante b' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'ha', label: 'Seitenhöhe a (ha)' },
            { id: 'hb', label: 'Seitenhöhe b (hb)' },
            { id: 'V', label: 'Volumen (V)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'M', label: 'Mantelfläche (M)' },
            { id: 'G', label: 'Grundfläche (G)' }
        ]
    }
};

function buildFormOptions(dimension) {
    return Object.entries(shapeConfig)
        .filter(([, cfg]) => cfg.dimension === dimension)
        .map(([key, cfg]) => `<option value="${key}">${cfg.name}</option>`)
        .join("");
}

const inputsContainer = document.getElementById("variousInputContainer");

let inputTypeOne=document.createElement('div');
inputTypeOne.classList.add('inputContainer');
inputTypeOne.innerHTML = `
    <div class="inputSelectDiv">
        <select name="selectInput" id="selectInput" class="selection">

        </select>
    </div>
    <input type="number" id="zahlenInput" placeholder="Zahl" class="zahlenInputfeld">
`;

let inputTypeTwo=document.createElement('div');
inputTypeTwo.classList.add('inputContainer');
inputTypeTwo.innerHTML = `
    <div class="inputRow">
        <div class="inputSelectDiv">
            <select name="selectInput" id="selectInputRow1" class="selection">

            </select>
        </div>
        <input type="number" id="zahlenInputRow1" placeholder="Zahl" class="zahlenInputfeld">
    </div>
    <div class="inputRow">
        <div class="inputSelectDiv">
            <select name="selectInput" id="selectInputRow2" class="selection">
          
            </select>
        </div>
        <input type="number" id="zahlenInputRow2" placeholder="Zahl" class="zahlenInputfeld">
    </div>
`;

let inputTypeThree=document.createElement('div');
inputTypeThree.classList.add('inputContainer');
inputTypeThree.innerHTML =`
    <div class="numbInputSwitchDiv">
        <button class="numbInputTypeBtn active" data-type="2Inputs">2 Inputs</button>
        <button class="numbInputTypeBtn" data-type="3Inputs">3 Inputs</button>
    </div>
    <div class="inputRow">
        <div class="inputSelectDiv">
            <select name="selectInput" id="selectInputRow1" class="selection">
          
            </select>
        </div>
        <input type="number" id="zahlenInputRow1" placeholder="Zahl" class="zahlenInputfeld">
    </div>
    <div class="inputRow">
        <div class="inputSelectDiv">
            <select name="selectInput" id="selectInputRow2" class="selection">
         
            </select>
        </div>
        <input type="number" id="zahlenInputRow2" placeholder="Zahl" class="zahlenInputfeld">
    </div>
`;

const errorMessages=document.getElementById("errorMessages");
const typeButtons=document.querySelectorAll(".dimensionTypeBtn");
const formSelectContainer=document.getElementById("selectForm");
const sketchContainer=document.querySelector(".geometryRightFormContainer");

let currentType = "2d";

// ── Gegenseitiger Ausschluss der Dropdown-Werte ─────────────────────────
// Ein bereits in einem anderen Dropdown gewählter Wert darf nicht ein
// zweites Mal auswählbar sein
function getAllActiveSelects() {
    return Array.from(inputsContainer.querySelectorAll(".inputContainer .selection"));
}

// Prüft, ob ein Eigenschaftswert durch bereits belegte Werte einer
// geschlossenen Gruppe redundant geworden ist (z.B. Winkelsumme, Radius/
// Durchmesser, Seite/Umfang) – er würde dann keine neue, unabhängige
// Information mehr liefern. Formel-Beziehungen zwischen zwei UNABHÄNGIGEN
// Größen (z.B. Fläche = Seite × Höhe) fallen bewusst NICHT hierunter, da
// deren Ausschluss vom noch zu bauenden Rechenkern abhängt (siehe unten).
function isRedundantGiven(inputId, usedIds, groups) {
    return groups.some(group => {
        if (!group.includes(inputId)) return false;
        const usedInGroup = group.filter(id => usedIds.has(id));
        return usedInGroup.length >= group.length - 1;
    });
}

function refreshSelectOptions(shape) {
    const selects = getAllActiveSelects();
    const groups = shape.redundantGroups || [];

    selects.forEach(select => {
        const usedByOthers = new Set(
            selects.filter(s => s !== select && s.value).map(s => s.value)
        );
        const currentValue = select.value;

        select.innerHTML = shape.inputs
            .filter(input => input.id === currentValue ||
                (!usedByOthers.has(input.id) && !isRedundantGiven(input.id, usedByOthers, groups)))
            .map(input => `<option value="${input.id}">${input.label}</option>`)
            .join("");

        if (currentValue) select.value = currentValue;
    });
}

// ── Skizze / Formvorschau ────────────────────────────────────────────────
function sketchCircle(given) {
    const on = id => given.has(id) ? "is-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <circle class="sketchOutline" cx="120" cy="120" r="80" />
    <circle class="sketchCenter" cx="120" cy="120" r="2.5" />

    <line class="sketchDim ${on('r')}" x1="120" y1="120" x2="177" y2="63" />
    <circle class="sketchHandle ${on('r')}" cx="177" cy="63" r="4" />
    <text class="sketchLabel ${on('r')}" x="156" y="82">r</text>

    <line class="sketchDim ${on('d')}" x1="40" y1="120" x2="200" y2="120" />
    <circle class="sketchHandle ${on('d')}" cx="40" cy="120" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="200" cy="120" r="4" />
    <text class="sketchLabel ${on('d')}" x="120" y="138">d</text>

    <text class="sketchLabel ${on('A')}" x="95" y="150">A</text>
    <text class="sketchLabel ${on('u')}" x="120" y="214">U</text>
</svg>`;
}

function sketchSquare(given) {
    const on = id => given.has(id) ? "is-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <rect class="sketchOutline" x="60" y="60" width="120" height="120" />

    <line class="sketchDim ${on('a')}" x1="60" y1="192" x2="180" y2="192" />
    <circle class="sketchHandle ${on('a')}" cx="60" cy="192" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="180" cy="192" r="4" />
    <text class="sketchLabel ${on('a')}" x="120" y="208">a</text>

    <line class="sketchDim ${on('d')}" x1="60" y1="60" x2="180" y2="180" />
    <circle class="sketchHandle ${on('d')}" cx="60" cy="60" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="180" cy="180" r="4" />
    <text class="sketchLabel ${on('d')}" x="152" y="98">d</text>

    <text class="sketchLabel ${on('A')}" x="95" y="145">A</text>
    <text class="sketchLabel ${on('u')}" x="45" y="45">U</text>
</svg>`;
}

function sketchRectangle(given) {
    const on = id => given.has(id) ? "is-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <rect class="sketchOutline" x="40" y="70" width="160" height="100" />

    <line class="sketchDim ${on('a')}" x1="40" y1="184" x2="200" y2="184" />
    <circle class="sketchHandle ${on('a')}" cx="40" cy="184" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="200" cy="184" r="4" />
    <text class="sketchLabel ${on('a')}" x="120" y="200">a</text>

    <line class="sketchDim ${on('b')}" x1="214" y1="70" x2="214" y2="170" />
    <circle class="sketchHandle ${on('b')}" cx="214" cy="70" r="4" />
    <circle class="sketchHandle ${on('b')}" cx="214" cy="170" r="4" />
    <text class="sketchLabel ${on('b')}" x="228" y="120">b</text>

    <line class="sketchDim ${on('d')}" x1="40" y1="70" x2="200" y2="170" />
    <circle class="sketchHandle ${on('d')}" cx="40" cy="70" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="200" cy="170" r="4" />
    <text class="sketchLabel ${on('d')}" x="165" y="100">d</text>

    <text class="sketchLabel ${on('A')}" x="90" y="140">A</text>
    <text class="sketchLabel ${on('u')}" x="40" y="55">U</text>
</svg>`;
}

const shapeSketches = {
    circle: sketchCircle,
    square: sketchSquare,
    rectangle: sketchRectangle
};

function renderSketch(shapeKey, given) {
    if (!sketchContainer) return;

    const sketchFn = shapeSketches[shapeKey];
    if (sketchFn) {
        sketchContainer.innerHTML = `<div class="sketchCard">${sketchFn(given)}</div>`;
        return;
    }

    const shape = shapeConfig[shapeKey];
    sketchContainer.innerHTML = `
        <div class="sketchCard">
            <div class="sketchPlaceholder">
                <i class="fa fa-square-o" aria-hidden="true"></i>
                <span>Skizze für „${shape ? shape.name : ""}" folgt in Kürze.</span>
            </div>
        </div>`;
}

// Liest, welche Eigenschaften den aktuell aktiven Dropdowns zugeordnet sind
// -> steuert, welche Elemente in der Skizze hervorgehoben werden.
function getSelectedInputIds() {
    const ids = new Set();
    getAllActiveSelects().forEach(select => {
        if (select.value) ids.add(select.value);
    });
    return ids;
}

function refreshSketch() {
    const shape = shapeConfig[formSelectContainer.value];
    if (shape) renderSketch(formSelectContainer.value, getSelectedInputIds());
}

typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        typeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentType = btn.dataset.type;

        formSelectContainer.innerHTML = buildFormOptions(currentType);
        setCurrentInputType(formSelectContainer.value);
    });
});



function showError(message) {
    errorMessages.textContent = message;
    errorMessages.style.display = "block";
}

function hideError() {
    errorMessages.style.display = "none";
}



let currentDecimalPlaces = window.MV.getDecimalPlaces();

document.addEventListener('DOMContentLoaded', () => {
    const advancedSettingsBtn = document.getElementById('advancedSettingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const decimalPlacesSelect = document.getElementById('decimalPlaces');

    decimalPlacesSelect.value = currentDecimalPlaces;

    advancedSettingsBtn.addEventListener('click', () => { settingsModal.classList.add('show'); });
    closeModalBtn.addEventListener('click', () => { settingsModal.classList.remove('show'); });
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) settingsModal.classList.remove('show');
    });

    saveSettingsBtn.addEventListener('click', () => {
        currentDecimalPlaces = parseInt(decimalPlacesSelect.value, 10);
        window.MV.setDecimalPlaces(currentDecimalPlaces);
        settingsModal.classList.remove('show');
    });

    // Cross-Tab/bfcache-Sync, gleiche Logik wie im Finanzrechner
    window.addEventListener('mv:staterestore', () => {
        currentDecimalPlaces = window.MV.getDecimalPlaces();
        decimalPlacesSelect.value = currentDecimalPlaces;
    });
});

function addThirdInput(){
    const shape = shapeConfig[formSelectContainer.value];
    if (!shape) return;

    document.querySelector(".inputContainer").insertAdjacentHTML('beforeend', `
    <div class="inputRow" id="inputRow3">
        <div class="inputSelectDiv">
            <select name="selectInput" id="selectInputRow3" class="selection"></select>
        </div>
        <input type="number" id="zahlenInputRow3" placeholder="Zahl" class="zahlenInputfeld">
    </div>`);

    const select3 = document.getElementById("selectInputRow3");
    select3.innerHTML = shape.inputs
        .map(input => `<option value="${input.id}">${input.label}</option>`)
        .join("");

    // Ersten noch sinnvollen freien Wert vorauswählen: weder bereits von den
    // anderen Dropdowns belegt, noch durch eine geschlossene Gruppe redundant.
    const used = new Set(getAllActiveSelects().filter(s => s !== select3 && s.value).map(s => s.value));
    const groups = shape.redundantGroups || [];
    const free = shape.inputs.find(input => !used.has(input.id) && !isRedundantGiven(input.id, used, groups));
    if (free) select3.value = free.id;

    refreshSelectOptions(shape);
    refreshSketch();
}

function deleteThirdInput(){
    const row = document.getElementById("inputRow3");
    if (row) row.remove();

    const shape = shapeConfig[formSelectContainer.value];
    if (shape) refreshSelectOptions(shape);
    refreshSketch();
}

// Delegiert auf inputTypeThree selbst (persistenter Node, wird nur ein-/ausgehängt,
// nie neu erstellt) – vorher lief querySelectorAll auf einem noch nicht
// eingehängten Element und band daher nie einen Listener.
inputTypeThree.addEventListener("click", (e) => {
    const btn = e.target.closest(".numbInputTypeBtn");
    if (!btn) return;

    inputTypeThree.querySelectorAll(".numbInputTypeBtn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const thirdInput = document.getElementById("zahlenInputRow3");

    if (btn.dataset.type === "2Inputs" && thirdInput) {
        deleteThirdInput();
    } else if (btn.dataset.type === "3Inputs" && !thirdInput) {
        addThirdInput();
    }
});


formSelectContainer.addEventListener("change", (event) => {
    const selectedShape = event.target.value;
    setCurrentInputType(selectedShape);
});

// Delegiert auf dem Container statt auf einzelnen Selects/Inputs, damit auch
// die per addThirdInput() nachträglich eingefügte 3. Zeile erfasst wird.
inputsContainer.addEventListener("change", (e) => {
    if (!e.target.classList.contains("selection")) return;
    const shape = shapeConfig[formSelectContainer.value];
    if (shape) refreshSelectOptions(shape);
    refreshSketch();
});

function setCurrentInputType(type){
    const currentType = shapeConfig[type].type;
    
    inputsContainer.innerHTML = "";
    
    switch(currentType){
        case 1: 
            inputsContainer.appendChild(inputTypeOne); 
            break;
        case 2: 
            inputsContainer.appendChild(inputTypeTwo); 
            break;
        case 3: 
            inputsContainer.appendChild(inputTypeThree); 
            break;
    }

    populateDropdowns(type);
    refreshSketch();
}

function populateDropdowns(shapeKey) {
    const shape = shapeConfig[shapeKey];
    if (!shape) return;

    const selects = getAllActiveSelects();
    const groups = shape.redundantGroups || [];
    const chosen = new Set();

    selects.forEach(select => {
        select.innerHTML = shape.inputs
            .map(input => `<option value="${input.id}">${input.label}</option>`)
            .join("");

        // Sinnvolle Default-Zuordnung: der Reihe nach die nächste Eigenschaft
        // wählen, die noch nicht vergeben UND nicht redundant geworden ist
        // (z.B. h statt d bei Zylinder/Kegel, sobald r schon gewählt wurde).
        const next = shape.inputs.find(input =>
            !chosen.has(input.id) && !isRedundantGiven(input.id, chosen, groups)
        );

        if (next) {
            select.value = next.id;
            chosen.add(next.id);
        }
    });

    refreshSelectOptions(shape);
}

formSelectContainer.innerHTML = buildFormOptions("2d");
setCurrentInputType(formSelectContainer.value);