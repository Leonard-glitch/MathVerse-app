
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
            { id: 'U', label: 'Umfang (U)' },
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
            { id: 'U', label: 'Umfang (U)' },
            { id: 'd', label: 'Diagonale (d)' }
        ]
    },
    square: {
        name: 'Quadrat',
        dimension: '2d',
        type: 1,
        inputs: [
            { id: 'a', label: 'Seitenlänge (a)' },
            { id: 'U', label: 'Umfang (U)' },
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
        type: 4,
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
        type: 4,
        inputs: [
            { id: 'a', label: 'Seite a' },
            { id: 'b', label: 'Seite b' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'A', label: 'Fläche (A)' }
        ],
        redundantGroups: [['a', 'h', 'A']]
    },
     rhombus: {
        name: 'Raute',
        dimension: '2d',
        type: 2,
        inputs: [
            { id: 'a', label: 'Seitenlänge (a)' },
            { id: 'e', label: 'Diagonale e' },
            { id: 'f', label: 'Diagonale f' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'U', label: 'Umfang (U)' },
            { id: 'A', label: 'Fläche (A)' }
        ],
        redundantGroups: [['a', 'U']]
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

let inputTypeFour=document.createElement('div');
inputTypeFour.classList.add('inputContainer');
inputTypeFour.innerHTML = `
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
    <div class="inputRow">
        <div class="inputSelectDiv">
            <select name="selectInput" id="selectInputRow3" class="selection">

            </select>
        </div>
        <input type="number" id="zahlenInputRow3" placeholder="Zahl" class="zahlenInputfeld">
    </div>
`;

const errorMessages=document.getElementById("errorMessages");
const typeButtons=document.querySelectorAll(".dimensionTypeBtn");
const formSelectContainer=document.getElementById("selectForm");
const sketchContainer=document.querySelector(".geometryRightFormContainer");
const ausgabeContainer=document.getElementById("ausgabeContainer");
const rechenwegOutput=document.getElementById("rechenwegOutput");

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
    const areaOn = given.has('A') ? "area-active" : "";
    const perimeterOn = given.has('U') ? "perimeter-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <circle class="sketchOutline ${areaOn} ${perimeterOn}" cx="120" cy="120" r="80" />
    <circle class="sketchCenter" cx="120" cy="120" r="2.5" />

    <line class="sketchDim ${on('r')}" x1="120" y1="120" x2="177" y2="63" />
    <circle class="sketchHandle ${on('r')}" cx="177" cy="63" r="4" />
    <text class="sketchLabel ${on('r')}" x="164" y="90">r</text>

    <line class="sketchDim ${on('d')}" x1="40" y1="120" x2="200" y2="120" />
    <circle class="sketchHandle ${on('d')}" cx="40" cy="120" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="200" cy="120" r="4" />
    <text class="sketchLabel ${on('d')}" x="120" y="138">d</text>

    <text class="sketchLabel ${on('A')}" x="95" y="150">A</text>
    <text class="sketchLabel ${on('U')}" x="120" y="214">U</text>
</svg>`;
}

function sketchSquare(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    const perimeterOn = given.has('U') ? "perimeter-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <rect class="sketchOutline ${areaOn} ${perimeterOn}" x="60" y="60" width="120" height="120" />

    <line class="sketchDim ${on('a')}" x1="60" y1="192" x2="180" y2="192" />
    <circle class="sketchHandle ${on('a')}" cx="60" cy="192" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="180" cy="192" r="4" />
    <text class="sketchLabel ${on('a')}" x="120" y="208">a</text>

    <line class="sketchDim ${on('d')}" x1="60" y1="60" x2="180" y2="180" />
    <circle class="sketchHandle ${on('d')}" cx="60" cy="60" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="180" cy="180" r="4" />
    <text class="sketchLabel ${on('d')}" x="152" y="98">d</text>

    <text class="sketchLabel ${on('A')}" x="95" y="145">A</text>
    <text class="sketchLabel ${on('U')}" x="45" y="45">U</text>
</svg>`;
}

function sketchRectangle(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    const perimeterOn = given.has('U') ? "perimeter-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <rect class="sketchOutline ${areaOn} ${perimeterOn}" x="40" y="70" width="160" height="100" />

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
    <text class="sketchLabel ${on('U')}" x="40" y="55">U</text>
</svg>`;
}

// ── 2D: restliche Formen ──────────────────────────────────────────────────

function sketchTriangle(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchOutline ${areaOn}" points="40,195 200,195 130,45" />

    <line class="sketchDim ${on('c')}" x1="40" y1="211" x2="200" y2="211" />
    <circle class="sketchHandle ${on('c')}" cx="40" cy="211" r="4" />
    <circle class="sketchHandle ${on('c')}" cx="200" cy="211" r="4" />
    <text class="sketchLabel ${on('c')}" x="120" y="225">c</text>

    <line class="sketchDim ${on('a')}" x1="200" y1="195" x2="130" y2="45" />
    <circle class="sketchHandle ${on('a')}" cx="200" cy="195" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="130" cy="45" r="4" />
    <text class="sketchLabel ${on('a')}" x="190" y="118">a</text>

    <line class="sketchDim ${on('b')}" x1="40" y1="195" x2="130" y2="45" />
    <circle class="sketchHandle ${on('b')}" cx="40" cy="195" r="4" />
    <circle class="sketchHandle ${on('b')}" cx="130" cy="45" r="4" />
    <text class="sketchLabel ${on('b')}" x="60" y="118">b</text>

    <path class="sketchDecor ${on('alpha')}" d="M 60,195 Q 63,182 50,178" />
    <text class="sketchLabel ${on('alpha')}" x="64" y="182">α</text>

    <path class="sketchDecor ${on('beta')}" d="M 180,195 Q 178,181 192,177" />
    <text class="sketchLabel ${on('beta')}" x="176" y="180">β</text>

    <path class="sketchDecor ${on('gamma')}" d="M 121,60 Q 129,69 138,61" />
    <text class="sketchLabel ${on('gamma')}" x="129" y="73">γ</text>

    <line class="sketchDim ${on('ha')}" x1="40" y1="195" x2="171" y2="134" />
    <circle class="sketchHandle ${on('ha')}" cx="171" cy="134" r="4" />
    <text class="sketchLabel ${on('ha')}" x="101" y="187">ha</text>

    <line class="sketchDim ${on('hb')}" x1="200" y1="195" x2="82" y2="124" />
    <circle class="sketchHandle ${on('hb')}" cx="82" cy="124" r="4" />
    <text class="sketchLabel ${on('hb')}" x="154" y="188">hb</text>

    <line class="sketchDim ${on('hc')}" x1="130" y1="45" x2="130" y2="195" />
    <circle class="sketchHandle ${on('hc')}" cx="130" cy="195" r="4" />
    <text class="sketchLabel ${on('hc')}" x="143" y="115">hc</text>

    <text class="sketchLabel ${on('A')}" x="123" y="160">A</text>
</svg>`;
}

function sketchRightTriangle(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchOutline ${areaOn}" points="50,195 195,195 50,60" />
    <path class="sketchDecor" d="M 50,183 L 62,183 L 62,195" />

    <line class="sketchDim ${on('b')}" x1="50" y1="211" x2="195" y2="211" />
    <circle class="sketchHandle ${on('b')}" cx="50" cy="211" r="4" />
    <circle class="sketchHandle ${on('b')}" cx="195" cy="211" r="4" />
    <text class="sketchLabel ${on('b')}" x="122" y="225">b</text>

    <line class="sketchDim ${on('a')}" x1="34" y1="195" x2="34" y2="60" />
    <circle class="sketchHandle ${on('a')}" cx="34" cy="195" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="34" cy="60" r="4" />
    <text class="sketchLabel ${on('a')}" x="20" y="128">a</text>

    <line class="sketchDim ${on('c')}" x1="50" y1="60" x2="195" y2="195" />
    <circle class="sketchHandle ${on('c')}" cx="50" cy="60" r="4" />
    <circle class="sketchHandle ${on('c')}" cx="195" cy="195" r="4" />
    <text class="sketchLabel ${on('c')}" x="140" y="118">c</text>

    <path class="sketchDecor ${on('alpha')}" d="M 175,195 Q 170,185 180,181" />
    <text class="sketchLabel ${on('alpha')}" x="169" y="183">α</text>

    <path class="sketchDecor ${on('beta')}" d="M 50,80 Q 61,84 65,74" />
    <text class="sketchLabel ${on('beta')}" x="63" y="85">β</text>

    <text class="sketchLabel ${on('A')}" x="90" y="165">A</text>
</svg>`;
}

function sketchTrapezoid(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchOutline ${areaOn}" points="40,180 200,180 160,80 80,80" />

    <line class="sketchDim ${on('a')}" x1="40" y1="196" x2="200" y2="196" />
    <circle class="sketchHandle ${on('a')}" cx="40" cy="196" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="200" cy="196" r="4" />
    <text class="sketchLabel ${on('a')}" x="120" y="210">a</text>

    <line class="sketchDim ${on('c')}" x1="80" y1="64" x2="160" y2="64" />
    <circle class="sketchHandle ${on('c')}" cx="80" cy="64" r="4" />
    <circle class="sketchHandle ${on('c')}" cx="160" cy="64" r="4" />
    <text class="sketchLabel ${on('c')}" x="120" y="50">c</text>

    <line class="sketchDim ${on('h')}" x1="25" y1="180" x2="25" y2="80" />
    <circle class="sketchHandle ${on('h')}" cx="25" cy="180" r="4" />
    <circle class="sketchHandle ${on('h')}" cx="25" cy="80" r="4" />
    <text class="sketchLabel ${on('h')}" x="14" y="130">h</text>

    <text class="sketchLabel ${on('A')}" x="120" y="140">A</text>
</svg>`;
}

function sketchParallelogram(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchOutline ${areaOn}" points="60,180 200,180 170,70 30,70" />

    <line class="sketchDim ${on('a')}" x1="60" y1="196" x2="200" y2="196" />
    <circle class="sketchHandle ${on('a')}" cx="60" cy="196" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="200" cy="196" r="4" />
    <text class="sketchLabel ${on('a')}" x="130" y="210">a</text>

    <line class="sketchDim ${on('b')}" x1="60" y1="180" x2="30" y2="70" />
    <circle class="sketchHandle ${on('b')}" cx="60" cy="180" r="4" />
    <circle class="sketchHandle ${on('b')}" cx="30" cy="70" r="4" />
    <text class="sketchLabel ${on('b')}" x="30" y="128">b</text>

    <line class="sketchDim ${on('h')}" x1="215" y1="180" x2="215" y2="70" />
    <circle class="sketchHandle ${on('h')}" cx="215" cy="180" r="4" />
    <circle class="sketchHandle ${on('h')}" cx="215" cy="70" r="4" />
    <text class="sketchLabel ${on('h')}" x="228" y="128">h</text>

    <text class="sketchLabel ${on('A')}" x="115" y="128">A</text>
</svg>`;
}

function sketchRhombus(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    const perimeterOn = given.has('U') ? "perimeter-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchOutline ${areaOn} ${perimeterOn}" points="120,70 202,128 120,186 38,128" />

    <line class="sketchDim ${on('a')}" x1="120" y1="70" x2="202" y2="128" />
    <circle class="sketchHandle ${on('a')}" cx="120" cy="70" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="202" cy="128" r="4" />
    <text class="sketchLabel ${on('a')}" x="182" y="90">a</text>

    <line class="sketchDim ${on('e')}" x1="38" y1="128" x2="202" y2="128" />
    <circle class="sketchHandle ${on('e')}" cx="38" cy="128" r="4" />
    <circle class="sketchHandle ${on('e')}" cx="202" cy="128" r="4" />
    <text class="sketchLabel ${on('e')}" x="152" y="115">e</text>

    <line class="sketchDim ${on('f')}" x1="120" y1="70" x2="120" y2="186" />
    <circle class="sketchHandle ${on('f')}" cx="120" cy="70" r="4" />
    <circle class="sketchHandle ${on('f')}" cx="120" cy="186" r="4" />
    <text class="sketchLabel ${on('f')}" x="133" y="100">f</text>

    <line class="sketchDecor" x1="120" y1="186" x2="147" y2="205" stroke-dasharray="3 3" />
    <path class="sketchDecor" d="M 155,211 L 161,203 L 153,197" />
    <line class="sketchDim ${on('h')}" x1="202" y1="128" x2="147" y2="205" />
    <circle class="sketchHandle ${on('h')}" cx="202" cy="128" r="4" />
    <circle class="sketchHandle ${on('h')}" cx="147" cy="205" r="4" />
    <text class="sketchLabel ${on('h')}" x="192" y="168">h</text>

    <text class="sketchLabel ${on('A')}" x="100" y="145">A</text>
    <text class="sketchLabel ${on('U')}" x="65" y="180">U</text>
</svg>`;
}

// ── 3D: Körper ───────────────────────────────────────────────────────────

function sketchCube(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('V') ? "area-active" : "";
    const perimeterOn = given.has('O') ? "perimeter-active" : "";
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchFace ${areaOn}" points="60,100 160,100 160,200 60,200" />
    <polygon class="sketchFace ${areaOn}" points="60,100 100,60 200,60 160,100" />
    <polygon class="sketchFace ${areaOn}" points="160,100 200,60 200,160 160,200" />

    <line class="sketchDim ${on('d')}" x1="60" y1="200" x2="200" y2="60" />
    <circle class="sketchHandle ${on('d')}" cx="60" cy="200" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="200" cy="60" r="4" />
    <text class="sketchLabel ${on('d')}" x="150" y="115">d</text>

    <polygon class="sketchEdges ${perimeterOn}" points="60,100 160,100 160,200 60,200" />
    <polygon class="sketchEdges ${perimeterOn}" points="60,100 100,60 200,60 160,100" />
    <polygon class="sketchEdges ${perimeterOn}" points="160,100 200,60 200,160 160,200" />

    <line class="sketchDim ${on('a')}" x1="60" y1="215" x2="160" y2="215" />
    <circle class="sketchHandle ${on('a')}" cx="60" cy="215" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="160" cy="215" r="4" />
    <text class="sketchLabel ${on('a')}" x="110" y="229">a</text>

    <text class="sketchLabel ${on('V')}" x="80" y="150">V</text>
    <text class="sketchLabel ${on('O')}" x="185" y="110">O</text>
</svg>`;
}

function sketchCuboid(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('V') ? "area-active" : "";
    const perimeterOn = given.has('O') ? "perimeter-active" : "";
    const gOn = on('G');
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchFace ${areaOn}" points="50,90 170,90 170,180 50,180" />
    <polygon class="sketchFace sketchPart ${areaOn} ${gOn}" points="50,90 170,90 205,55 85,55" />
    <polygon class="sketchFace ${areaOn}" points="170,90 205,55 205,145 170,180" />

    <line class="sketchDim ${on('d')}" x1="50" y1="180" x2="205" y2="55" />
    <circle class="sketchHandle ${on('d')}" cx="50" cy="180" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="205" cy="55" r="4" />
    <text class="sketchLabel ${on('d')}" x="140" y="128">d</text>

    <polygon class="sketchEdges ${perimeterOn}" points="50,90 170,90 170,180 50,180" />
    <polygon class="sketchEdges sketchPart ${perimeterOn} ${gOn}" points="50,90 170,90 205,55 85,55" />
    <polygon class="sketchEdges ${perimeterOn}" points="170,90 205,55 205,145 170,180" />

    <line class="sketchDim ${on('a')}" x1="50" y1="195" x2="170" y2="195" />
    <circle class="sketchHandle ${on('a')}" cx="50" cy="195" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="170" cy="195" r="4" />
    <text class="sketchLabel ${on('a')}" x="110" y="209">a</text>

    <line class="sketchDim ${on('c')}" x1="35" y1="90" x2="35" y2="180" />
    <circle class="sketchHandle ${on('c')}" cx="35" cy="90" r="4" />
    <circle class="sketchHandle ${on('c')}" cx="35" cy="180" r="4" />
    <text class="sketchLabel ${on('c')}" x="20" y="135">c</text>

    <line class="sketchDim ${on('b')}" x1="39" y1="79" x2="74" y2="44" />
    <circle class="sketchHandle ${on('b')}" cx="39" cy="79" r="4" />
    <circle class="sketchHandle ${on('b')}" cx="74" cy="44" r="4" />
    <text class="sketchLabel ${on('b')}" x="46" y="53">b</text>

    <text class="sketchLabel ${gOn}" x="127" y="75">G</text>
    <text class="sketchLabel ${on('V')}" x="75" y="168">V</text>
    <text class="sketchLabel ${on('O')}" x="188" y="118">O</text>
</svg>`;
}

function sketchSphere(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const wholeOn = `${given.has('V') ? "area-active" : ""} ${given.has('O') ? "perimeter-active" : ""}`;
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <circle class="sketchOutline ${wholeOn}" cx="120" cy="130" r="75" />
    <ellipse class="sketchDecor" cx="120" cy="130" rx="75" ry="18" />
    <circle class="sketchCenter" cx="120" cy="130" r="2.5" />

    <line class="sketchDim ${on('r')}" x1="120" y1="130" x2="173" y2="88" />
    <circle class="sketchHandle ${on('r')}" cx="173" cy="88" r="4" />
    <text class="sketchLabel ${on('r')}" x="155" y="90">r</text>

    <line class="sketchDim ${on('d')}" x1="45" y1="130" x2="195" y2="130" />
    <circle class="sketchHandle ${on('d')}" cx="45" cy="130" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="195" cy="130" r="4" />
    <text class="sketchLabel ${on('d')}" x="120" y="150">d</text>

    <text class="sketchLabel ${on('V')}" x="75" y="168">V</text>
    <text class="sketchLabel ${on('O')}" x="130" y="80">O</text>
</svg>`;
}

function sketchCylinder(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const wholeOn = `${given.has('V') ? "area-active" : ""} ${given.has('O') ? "perimeter-active" : ""}`;
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <path class="sketchOutline sketchPart ${wholeOn} ${on('M')}" d="M 50,70 A 70,22 0 0 0 190,70 L 190,190 A 70,22 0 0 1 50,190 Z" />
    <ellipse class="sketchOutline sketchPart ${wholeOn} ${on('G')}" cx="120" cy="190" rx="70" ry="22" />
    <ellipse class="sketchOutline ${wholeOn}" cx="120" cy="70" rx="70" ry="22" />

    <line class="sketchDim ${on('d')}" x1="50" y1="70" x2="190" y2="70" />
    <circle class="sketchHandle ${on('d')}" cx="50" cy="70" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="190" cy="70" r="4" />
    <text class="sketchLabel ${on('d')}" x="120" y="50">d</text>

    <line class="sketchDim ${on('r')}" x1="120" y1="70" x2="165" y2="53" />
    <circle class="sketchHandle ${on('r')}" cx="165" cy="53" r="4" />
    <text class="sketchLabel ${on('r')}" x="152" y="43">r</text>

    <line class="sketchDim ${on('h')}" x1="215" y1="70" x2="215" y2="190" />
    <circle class="sketchHandle ${on('h')}" cx="215" cy="70" r="4" />
    <circle class="sketchHandle ${on('h')}" cx="215" cy="190" r="4" />
    <text class="sketchLabel ${on('h')}" x="228" y="130">h</text>

    <text class="sketchLabel ${on('G')}" x="120" y="192">G</text>
    <text class="sketchLabel ${on('V')}" x="120" y="115">V</text>
    <text class="sketchLabel ${on('M')}" x="120" y="145">M</text>
    <text class="sketchLabel ${on('O')}" x="75" y="218">O</text>
</svg>`;
}

function sketchCone(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const wholeOn = `${given.has('V') ? "area-active" : ""} ${given.has('O') ? "perimeter-active" : ""}`;
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <path class="sketchOutline sketchPart ${wholeOn} ${on('M')}" d="M 120,50 L 190,190 A 70,20 0 0 1 50,190 Z" />
    <ellipse class="sketchOutline sketchPart ${wholeOn} ${on('G')}" cx="120" cy="190" rx="70" ry="20" />

    <line class="sketchDim ${on('s')}" x1="120" y1="50" x2="190" y2="190" />
    <circle class="sketchHandle ${on('s')}" cx="190" cy="190" r="4" />
    <text class="sketchLabel ${on('s')}" x="168" y="115">s</text>

    <line class="sketchDim ${on('r')}" x1="120" y1="190" x2="120" y2="210" />
    <circle class="sketchHandle ${on('r')}" cx="120" cy="210" r="4" />
    <text class="sketchLabel ${on('r')}" x="138" y="203">r</text>

    <line class="sketchDim ${on('d')}" x1="50" y1="222" x2="190" y2="222" />
    <circle class="sketchHandle ${on('d')}" cx="50" cy="222" r="4" />
    <circle class="sketchHandle ${on('d')}" cx="190" cy="222" r="4" />
    <text class="sketchLabel ${on('d')}" x="120" y="236">d</text>

    <line class="sketchDim ${on('h')}" x1="35" y1="50" x2="35" y2="190" />
    <circle class="sketchHandle ${on('h')}" cx="35" cy="50" r="4" />
    <circle class="sketchHandle ${on('h')}" cx="35" cy="190" r="4" />
    <text class="sketchLabel ${on('h')}" x="20" y="120">h</text>

    <text class="sketchLabel ${on('G')}" x="120" y="180">G</text>
    <text class="sketchLabel ${on('V')}" x="120" y="110">V</text>
    <text class="sketchLabel ${on('M')}" x="120" y="140">M</text>
    <text class="sketchLabel ${on('O')}" x="59" y="145">O</text>
</svg>`;
}

function sketchQuadrangularPyramid(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const wholeOn = `${given.has('V') ? "area-active" : ""} ${given.has('O') ? "perimeter-active" : ""}`;
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchOutline sketchPart ${wholeOn} ${on('M')}" points="105,45 50,175 190,175" />
    <polygon class="sketchOutline sketchPart ${wholeOn} ${on('M')}" points="105,45 190,175 160,120" />
    <polygon class="sketchOutline sketchPart ${wholeOn} ${on('G')}" points="50,175 190,175 160,120 20,120" />
    <line class="sketchDecor" x1="105" y1="45" x2="20" y2="120" stroke-dasharray="3 3" />

    <line class="sketchDim ${on('a')}" x1="50" y1="191" x2="190" y2="191" />
    <circle class="sketchHandle ${on('a')}" cx="50" cy="191" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="190" cy="191" r="4" />
    <text class="sketchLabel ${on('a')}" x="120" y="205">a</text>

    <line class="sketchDim ${on('h')}" x1="215" y1="45" x2="215" y2="175" />
    <circle class="sketchHandle ${on('h')}" cx="215" cy="45" r="4" />
    <circle class="sketchHandle ${on('h')}" cx="215" cy="175" r="4" />
    <text class="sketchLabel ${on('h')}" x="228" y="112">h</text>

    <line class="sketchDim ${on('ha')}" x1="105" y1="45" x2="120" y2="175" />
    <circle class="sketchHandle ${on('ha')}" cx="120" cy="175" r="4" />
    <text class="sketchLabel ${on('ha')}" x="95" y="120">ha</text>

    <text class="sketchLabel ${on('G')}" x="105" y="150">G</text>
    <text class="sketchLabel ${on('V')}" x="105" y="100">V</text>
    <text class="sketchLabel ${on('M')}" x="140" y="145">M</text>
    <text class="sketchLabel ${on('O')}" x="60" y="145">O</text>
</svg>`;
}

function sketchRectangularPyramid(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const wholeOn = `${given.has('V') ? "area-active" : ""} ${given.has('O') ? "perimeter-active" : ""}`;
    return `
<svg class="shapeSketch" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <polygon class="sketchOutline sketchPart ${wholeOn} ${on('M')}" points="115,45 60,175 200,175" />
    <polygon class="sketchOutline sketchPart ${wholeOn} ${on('M')}" points="115,45 200,175 170,125" />
    <polygon class="sketchOutline sketchPart ${wholeOn} ${on('G')}" points="60,175 200,175 170,125 30,125" />
    <line class="sketchDecor" x1="115" y1="45" x2="30" y2="125" stroke-dasharray="3 3" />

    <line class="sketchDim ${on('a')}" x1="60" y1="191" x2="200" y2="191" />
    <circle class="sketchHandle ${on('a')}" cx="60" cy="191" r="4" />
    <circle class="sketchHandle ${on('a')}" cx="200" cy="191" r="4" />
    <text class="sketchLabel ${on('a')}" x="130" y="205">a</text>

    <line class="sketchDim ${on('b')}" x1="60" y1="175" x2="30" y2="125" />
    <circle class="sketchHandle ${on('b')}" cx="60" cy="175" r="4" />
    <circle class="sketchHandle ${on('b')}" cx="30" cy="125" r="4" />
    <text class="sketchLabel ${on('b')}" x="24" y="153">b</text>

    <line class="sketchDim ${on('h')}" x1="222" y1="45" x2="222" y2="175" />
    <circle class="sketchHandle ${on('h')}" cx="222" cy="45" r="4" />
    <circle class="sketchHandle ${on('h')}" cx="222" cy="175" r="4" />
    <text class="sketchLabel ${on('h')}" x="232" y="112">h</text>

    <line class="sketchDim ${on('ha')}" x1="115" y1="45" x2="130" y2="175" />
    <circle class="sketchHandle ${on('ha')}" cx="130" cy="175" r="4" />
    <text class="sketchLabel ${on('ha')}" x="98" y="118">ha</text>

    <line class="sketchDim ${on('hb')}" x1="115" y1="45" x2="45" y2="150" />
    <circle class="sketchHandle ${on('hb')}" cx="45" cy="150" r="4" />
    <text class="sketchLabel ${on('hb')}" x="60" y="95">hb</text>

    <text class="sketchLabel ${on('G')}" x="115" y="152">G</text>
    <text class="sketchLabel ${on('V')}" x="115" y="100">V</text>
    <text class="sketchLabel ${on('M')}" x="150" y="145">M</text>
    <text class="sketchLabel ${on('O')}" x="65" y="145">O</text>
</svg>`;
}

const shapeSketches = {
    circle: sketchCircle,
    square: sketchSquare,
    rectangle: sketchRectangle,
    triangle: sketchTriangle,
    rightTriangle: sketchRightTriangle,
    trapezoid: sketchTrapezoid,
    parallelogram: sketchParallelogram,
    rhombus: sketchRhombus,
    cube: sketchCube,
    cuboid: sketchCuboid,
    sphere: sketchSphere,
    cylinder: sketchCylinder,
    cone: sketchCone,
    quadrangularpyramid: sketchQuadrangularPyramid,
    rectangularpyramid: sketchRectangularPyramid
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

// ── Rechen-Engine ──────────────────────────────────────────────────────────
// Jeder Resolver bekommt eine Map { inputId: Zahlenwert } mit genau den vom
// Nutzer gewählten und ausgefüllten Werten und liefert entweder
// { values, steps } (alle berechenbaren Werte + Rechenweg) oder { error }.

function formatNum(n) {
    return n.toLocaleString('de-DE', {
        minimumFractionDigits: window.MV.getDecimalPlaces(),
        maximumFractionDigits: window.MV.getDecimalPlaces()
    });
}

// Schulähnliche Notation: echter Bruchstrich statt "/", Wurzelstrich statt "√(...)"
function frac(num, den) {
    return `<span class="geo-frac"><span class="geo-frac-num">${num}</span><span class="geo-frac-bar"></span><span class="geo-frac-den">${den}</span></span>`;
}

function sqrt(content) {
    return `<span class="geo-sqrt"><span class="geo-sqrt-symbol">√</span><span class="geo-sqrt-radicand">${content}</span></span>`;
}

// isGiven = true, wenn dieser Schritt nur einen vom Nutzer eingegebenen Wert
// wiedergibt (keine Berechnung) -> bleibt im Rechenweg neutral statt grün.
function step(title, text, formula, solution, isGiven = false) {
    return { title, text, formula, solution, isGiven };
}

const DISPLAY_SYMBOLS = { alpha: 'α', beta: 'β', gamma: 'γ' };
function displaySymbol(id) {
    return DISPLAY_SYMBOLS[id] || id;
}

function toRad(deg) { return deg * Math.PI / 180; }
function toDeg(rad) { return rad * 180 / Math.PI; }

function resolveCircle(given) {
    const [knownId, knownVal] = Object.entries(given)[0];
    const steps = [];
    let r;

    if (knownId === 'r') {
        r = knownVal;
        steps.push(step("Radius", "Der Radius ist der gegebene Wert.", `r = ${formatNum(r)}`, null, true));
    } else if (knownId === 'd') {
        r = knownVal / 2;
        steps.push(step("Radius aus Durchmesser", "Der Radius ist die Hälfte des Durchmessers:", `r = ${frac('d', '2')} = ${frac(formatNum(knownVal), '2')} = ${formatNum(r)}`));
    } else if (knownId === 'U') {
        r = knownVal / (2 * Math.PI);
        steps.push(step("Radius aus Umfang", "Der Umfang ist U = 2 · π · r, umgestellt nach r:", `r = ${frac('U', '2π')} = ${frac(formatNum(knownVal), '2π')} = ${formatNum(r)}`));
    } else {
        r = Math.sqrt(knownVal / Math.PI);
        steps.push(step("Radius aus Fläche", "Die Fläche ist A = π · r², umgestellt nach r:", `r = ${sqrt(frac('A', 'π'))} = ${sqrt(frac(formatNum(knownVal), 'π'))} = ${formatNum(r)}`));
    }

    const d = 2 * r;
    const U = 2 * Math.PI * r;
    const A = Math.PI * r * r;

    if (knownId !== 'd') steps.push(step("Durchmesser", "Der Durchmesser ist doppelt so groß wie der Radius:", `d = 2 · r = 2 · ${formatNum(r)} = ${formatNum(d)}`));
    if (knownId !== 'U') steps.push(step("Umfang", "Formel für den Kreisumfang:", `U = 2π · r = 2π · ${formatNum(r)} = ${formatNum(U)}`));
    if (knownId !== 'A') steps.push(step("Fläche", "Formel für die Kreisfläche:", `A = π · r² = π · ${formatNum(r)}² = ${formatNum(A)}`));

    return { values: { r, d, U, A }, steps };
}

function resolveSquare(given) {
    const [knownId, knownVal] = Object.entries(given)[0];
    const steps = [];
    let a;

    if (knownId === 'a') {
        a = knownVal;
        steps.push(step("Seitenlänge", "Die Seitenlänge ist der gegebene Wert.", `a = ${formatNum(a)}`, null, true));
    } else if (knownId === 'U') {
        a = knownVal / 4;
        steps.push(step("Seitenlänge aus Umfang", "Ein Quadrat hat 4 gleich lange Seiten:", `a = ${frac('U', '4')} = ${frac(formatNum(knownVal), '4')} = ${formatNum(a)}`));
    } else if (knownId === 'A') {
        a = Math.sqrt(knownVal);
        steps.push(step("Seitenlänge aus Fläche", "Die Fläche ist A = a², umgestellt nach a:", `a = ${sqrt('A')} = ${sqrt(formatNum(knownVal))} = ${formatNum(a)}`));
    } else {
        a = knownVal / Math.SQRT2;
        steps.push(step("Seitenlänge aus Diagonale", "Die Diagonale ist d = a√2, umgestellt nach a:", `a = ${frac('d', '√2')} = ${frac(formatNum(knownVal), '√2')} = ${formatNum(a)}`));
    }

    const U = 4 * a;
    const A = a * a;
    const d = a * Math.SQRT2;

    if (knownId !== 'U') steps.push(step("Umfang", "Vier gleich lange Seiten addiert:", `U = 4 · a = 4 · ${formatNum(a)} = ${formatNum(U)}`));
    if (knownId !== 'A') steps.push(step("Fläche", "Seitenlänge im Quadrat:", `A = a² = ${formatNum(a)}² = ${formatNum(A)}`));
    if (knownId !== 'd') steps.push(step("Diagonale", "Aus dem Satz des Pythagoras (die Diagonale teilt das Quadrat in zwei rechtwinklige Dreiecke):", `d = a · √2 = ${formatNum(a)} · √2 = ${formatNum(d)}`));

    return { values: { a, U, A, d }, steps };
}

function resolveRectangle(given) {
    const order = ['a', 'b', 'A', 'U', 'd'];
    const ids = Object.keys(given).sort((x, y) => order.indexOf(x) - order.indexOf(y));
    const key = ids.join(',');
    const v = given;
    const steps = [];
    let a, b;

    switch (key) {
        case 'a,b':
            a = v.a; b = v.b;
            steps.push(step("Seiten", "Beide Seiten sind bereits gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}`, null, true));
            break;

        case 'a,A':
            a = v.a; b = v.A / v.a;
            steps.push(step("Seite b aus der Fläche", "Die Fläche ist A = a · b, umgestellt nach b:", `b = ${frac('A', 'a')} = ${frac(formatNum(v.A), formatNum(a))} = ${formatNum(b)}`));
            break;

        case 'A,b':
            b = v.b; a = v.A / v.b;
            steps.push(step("Seite a aus der Fläche", "Die Fläche ist A = a · b, umgestellt nach a:", `a = ${frac('A', 'b')} = ${frac(formatNum(v.A), formatNum(b))} = ${formatNum(a)}`));
            break;

        case 'a,U':
            a = v.a; b = v.U / 2 - v.a;
            if (b <= 0) return { error: "Diese Kombination ergibt kein gültiges Rechteck – die zweite Seite wäre 0 oder negativ." };
            steps.push(step("Seite b aus dem Umfang", "Der Umfang ist U = 2 · (a + b), umgestellt nach b:", `b = ${frac('U', '2')} − a = ${frac(formatNum(v.U), '2')} − ${formatNum(a)} = ${formatNum(b)}`));
            break;

        case 'b,U':
            b = v.b; a = v.U / 2 - v.b;
            if (a <= 0) return { error: "Diese Kombination ergibt kein gültiges Rechteck – die zweite Seite wäre 0 oder negativ." };
            steps.push(step("Seite a aus dem Umfang", "Der Umfang ist U = 2 · (a + b), umgestellt nach a:", `a = ${frac('U', '2')} − b = ${frac(formatNum(v.U), '2')} − ${formatNum(b)} = ${formatNum(a)}`));
            break;

        case 'a,d':
            a = v.a;
            if (v.d <= v.a) return { error: "Diese Kombination ergibt kein gültiges Rechteck – die Diagonale muss größer als Seite a sein." };
            b = Math.sqrt(v.d * v.d - v.a * v.a);
            steps.push(step("Seite b aus der Diagonale", "Nach dem Satz des Pythagoras gilt d² = a² + b², umgestellt nach b:", `b = ${sqrt('d² − a²')} = ${sqrt(`${formatNum(v.d)}² − ${formatNum(a)}²`)} = ${formatNum(b)}`));
            break;

        case 'b,d':
            b = v.b;
            if (v.d <= v.b) return { error: "Diese Kombination ergibt kein gültiges Rechteck – die Diagonale muss größer als Seite b sein." };
            a = Math.sqrt(v.d * v.d - v.b * v.b);
            steps.push(step("Seite a aus der Diagonale", "Nach dem Satz des Pythagoras gilt d² = a² + b², umgestellt nach a:", `a = ${sqrt('d² − b²')} = ${sqrt(`${formatNum(v.d)}² − ${formatNum(b)}²`)} = ${formatNum(a)}`));
            break;

        case 'A,U': {
            const s = v.U / 2;
            const disc = s * s - 4 * v.A;
            if (disc < 0) return { error: "Diese Kombination ergibt kein gültiges Rechteck – bei diesem Umfang ist die Fläche zu groß." };
            const root = Math.sqrt(disc);
            a = (s + root) / 2;
            b = (s - root) / 2;
            steps.push(step("Halber Umfang", "Aus dem Umfang folgt die Summe der Seiten:", `a + b = ${frac('U', '2')} = ${frac(formatNum(v.U), '2')} = ${formatNum(s)}`));
            steps.push(step("Seiten aus Summe und Produkt", "a und b sind die beiden Lösungen von t² − (a+b) · t + A = 0. Da beide Seiten gleichwertig sind, wird der größere Wert a und der kleinere b zugeordnet:", `t² − ${formatNum(s)} · t + ${formatNum(v.A)} = 0\nt₁ = ${formatNum(a)},  t₂ = ${formatNum(b)}`));
            break;
        }

        case 'A,d': {
            if (v.d * v.d < 2 * v.A) return { error: "Diese Kombination ergibt kein gültiges Rechteck – bei dieser Diagonale ist die Fläche zu groß." };
            const s = Math.sqrt(v.d * v.d + 2 * v.A);
            const diff = Math.sqrt(v.d * v.d - 2 * v.A);
            a = (s + diff) / 2;
            b = (s - diff) / 2;
            steps.push(step("Summe der Seiten", "Aus (a+b)² = d² + 2A folgt:", `a + b = ${sqrt('d² + 2A')} = ${sqrt(`${formatNum(v.d)}² + 2 · ${formatNum(v.A)}`)} = ${formatNum(s)}`));
            steps.push(step("Differenz der Seiten", "Aus (a−b)² = d² − 2A folgt:", `a − b = ${sqrt('d² − 2A')} = ${sqrt(`${formatNum(v.d)}² − 2 · ${formatNum(v.A)}`)} = ${formatNum(diff)}`));
            steps.push(step("Seiten a und b", "Summe und Differenz zusammen ergeben beide Seiten:", `a = ${frac(`${formatNum(s)} + ${formatNum(diff)}`, '2')} = ${formatNum(a)}\nb = ${frac(`${formatNum(s)} − ${formatNum(diff)}`, '2')} = ${formatNum(b)}`));
            break;
        }

        case 'U,d': {
            const s = v.U / 2;
            const disc = 2 * v.d * v.d - s * s;
            if (disc < 0) return { error: "Diese Kombination ergibt kein gültiges Rechteck – Umfang und Diagonale passen nicht zusammen." };
            const diff = Math.sqrt(disc);
            a = (s + diff) / 2;
            b = (s - diff) / 2;
            steps.push(step("Halber Umfang", "Aus dem Umfang folgt die Seitensumme:", `a + b = ${frac('U', '2')} = ${frac(formatNum(v.U), '2')} = ${formatNum(s)}`));
            steps.push(step("Differenz der Seiten", "Kombiniert mit d² = a² + b² ergibt sich die Differenz:", `a − b = ${sqrt('2d² − (a+b)²')} = ${sqrt(`2 · ${formatNum(v.d)}² − ${formatNum(s)}²`)} = ${formatNum(diff)}`));
            steps.push(step("Seiten a und b", "Summe und Differenz zusammen ergeben beide Seiten:", `a = ${frac(`${formatNum(s)} + ${formatNum(diff)}`, '2')} = ${formatNum(a)}\nb = ${frac(`${formatNum(s)} − ${formatNum(diff)}`, '2')} = ${formatNum(b)}`));
            break;
        }

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    const A = a * b;
    const U = 2 * (a + b);
    const d = Math.sqrt(a * a + b * b);

    if (!ids.includes('A')) steps.push(step("Fläche", "Seite mal Seite:", `A = a · b = ${formatNum(a)} · ${formatNum(b)} = ${formatNum(A)}`));
    if (!ids.includes('U')) steps.push(step("Umfang", "Zweimal die Summe beider Seiten:", `U = 2 · (a + b) = 2 · (${formatNum(a)} + ${formatNum(b)}) = ${formatNum(U)}`));
    if (!ids.includes('d')) steps.push(step("Diagonale", "Nach dem Satz des Pythagoras:", `d = ${sqrt('a² + b²')} = ${sqrt(`${formatNum(a)}² + ${formatNum(b)}²`)} = ${formatNum(d)}`));

    return { values: { a, b, A, U, d }, steps };
}

function resolveRightTriangle(given) {
    if (('alpha' in given && (given.alpha <= 0 || given.alpha >= 90)) ||
        ('beta' in given && (given.beta <= 0 || given.beta >= 90))) {
        return { error: "Winkel müssen im rechtwinkligen Dreieck zwischen 0° und 90° liegen." };
    }

    const order = ['a', 'b', 'c', 'alpha', 'beta', 'A'];
    const ids = Object.keys(given).sort((x, y) => order.indexOf(x) - order.indexOf(y));
    const key = ids.join(',');
    const v = given;
    const steps = [];
    let a, b, c, alpha, beta;

    switch (key) {
        case 'a,b':
            a = v.a; b = v.b;
            c = Math.sqrt(a * a + b * b);
            alpha = toDeg(Math.atan(a / b));
            beta = 90 - alpha;
            steps.push(step("Katheten", "Beide Katheten sind bereits gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}`, null, true));
            steps.push(step("Hypotenuse", "Nach dem Satz des Pythagoras:", `c = ${sqrt('a² + b²')} = ${sqrt(`${formatNum(a)}² + ${formatNum(b)}²`)} = ${formatNum(c)}`));
            steps.push(step("Winkel α", "Über die Tangensfunktion (Gegenkathete durch Ankathete):", `tan(α) = ${frac('a', 'b')} = ${frac(formatNum(a), formatNum(b))}\nα = tan⁻¹(${formatNum(a / b)}) = ${formatNum(alpha)}°`));
            steps.push(step("Winkel β", "Die Winkelsumme im rechtwinkligen Dreieck ergibt β:", `β = 90° − α = 90° − ${formatNum(alpha)}° = ${formatNum(beta)}°`));
            break;

        case 'a,c':
            a = v.a; c = v.c;
            if (c <= a) return { error: "Diese Kombination ergibt kein gültiges Dreieck – die Hypotenuse muss größer als Kathete a sein." };
            b = Math.sqrt(c * c - a * a);
            alpha = toDeg(Math.asin(a / c));
            beta = 90 - alpha;
            steps.push(step("Kathete b", "Nach dem Satz des Pythagoras, umgestellt nach b:", `b = ${sqrt('c² − a²')} = ${sqrt(`${formatNum(c)}² − ${formatNum(a)}²`)} = ${formatNum(b)}`));
            steps.push(step("Winkel α", "Über die Sinusfunktion (Gegenkathete durch Hypotenuse):", `sin(α) = ${frac('a', 'c')} = ${frac(formatNum(a), formatNum(c))}\nα = sin⁻¹(${formatNum(a / c)}) = ${formatNum(alpha)}°`));
            steps.push(step("Winkel β", "Die Winkelsumme im rechtwinkligen Dreieck ergibt β:", `β = 90° − α = ${formatNum(beta)}°`));
            break;

        case 'b,c':
            b = v.b; c = v.c;
            if (c <= b) return { error: "Diese Kombination ergibt kein gültiges Dreieck – die Hypotenuse muss größer als Kathete b sein." };
            a = Math.sqrt(c * c - b * b);
            beta = toDeg(Math.asin(b / c));
            alpha = 90 - beta;
            steps.push(step("Kathete a", "Nach dem Satz des Pythagoras, umgestellt nach a:", `a = ${sqrt('c² − b²')} = ${sqrt(`${formatNum(c)}² − ${formatNum(b)}²`)} = ${formatNum(a)}`));
            steps.push(step("Winkel β", "Über die Sinusfunktion (Gegenkathete durch Hypotenuse):", `sin(β) = ${frac('b', 'c')} = ${frac(formatNum(b), formatNum(c))}\nβ = sin⁻¹(${formatNum(b / c)}) = ${formatNum(beta)}°`));
            steps.push(step("Winkel α", "Die Winkelsumme im rechtwinkligen Dreieck ergibt α:", `α = 90° − β = ${formatNum(alpha)}°`));
            break;

        case 'c,alpha':
            c = v.c; alpha = v.alpha;
            beta = 90 - alpha;
            a = c * Math.sin(toRad(alpha));
            b = c * Math.cos(toRad(alpha));
            steps.push(step("Winkel β", "Die Winkelsumme im rechtwinkligen Dreieck ergibt β:", `β = 90° − α = ${formatNum(beta)}°`));
            steps.push(step("Kathete a", "Über die Sinusfunktion:", `a = c · sin(α) = ${formatNum(c)} · sin(${formatNum(alpha)}°) = ${formatNum(a)}`));
            steps.push(step("Kathete b", "Über die Kosinusfunktion:", `b = c · cos(α) = ${formatNum(c)} · cos(${formatNum(alpha)}°) = ${formatNum(b)}`));
            break;

        case 'c,beta':
            c = v.c; beta = v.beta;
            alpha = 90 - beta;
            b = c * Math.sin(toRad(beta));
            a = c * Math.cos(toRad(beta));
            steps.push(step("Winkel α", "Die Winkelsumme im rechtwinkligen Dreieck ergibt α:", `α = 90° − β = ${formatNum(alpha)}°`));
            steps.push(step("Kathete b", "Über die Sinusfunktion:", `b = c · sin(β) = ${formatNum(c)} · sin(${formatNum(beta)}°) = ${formatNum(b)}`));
            steps.push(step("Kathete a", "Über die Kosinusfunktion:", `a = c · cos(β) = ${formatNum(c)} · cos(${formatNum(beta)}°) = ${formatNum(a)}`));
            break;

        case 'a,alpha':
            a = v.a; alpha = v.alpha;
            beta = 90 - alpha;
            c = a / Math.sin(toRad(alpha));
            b = a / Math.tan(toRad(alpha));
            steps.push(step("Winkel β", "Die Winkelsumme im rechtwinkligen Dreieck ergibt β:", `β = 90° − α = ${formatNum(beta)}°`));
            steps.push(step("Hypotenuse", "Über die Sinusfunktion, umgestellt nach c:", `c = ${frac('a', 'sin(α)')} = ${frac(formatNum(a), `sin(${formatNum(alpha)}°)`)} = ${formatNum(c)}`));
            steps.push(step("Kathete b", "Über die Tangensfunktion, umgestellt nach b:", `b = ${frac('a', 'tan(α)')} = ${frac(formatNum(a), `tan(${formatNum(alpha)}°)`)} = ${formatNum(b)}`));
            break;

        case 'b,alpha':
            b = v.b; alpha = v.alpha;
            beta = 90 - alpha;
            a = b * Math.tan(toRad(alpha));
            c = b / Math.cos(toRad(alpha));
            steps.push(step("Winkel β", "Die Winkelsumme im rechtwinkligen Dreieck ergibt β:", `β = 90° − α = ${formatNum(beta)}°`));
            steps.push(step("Kathete a", "Über die Tangensfunktion:", `a = b · tan(α) = ${formatNum(b)} · tan(${formatNum(alpha)}°) = ${formatNum(a)}`));
            steps.push(step("Hypotenuse", "Über die Kosinusfunktion, umgestellt nach c:", `c = ${frac('b', 'cos(α)')} = ${frac(formatNum(b), `cos(${formatNum(alpha)}°)`)} = ${formatNum(c)}`));
            break;

        case 'a,beta':
            a = v.a; beta = v.beta;
            alpha = 90 - beta;
            b = a * Math.tan(toRad(beta));
            c = a / Math.cos(toRad(beta));
            steps.push(step("Winkel α", "Die Winkelsumme im rechtwinkligen Dreieck ergibt α:", `α = 90° − β = ${formatNum(alpha)}°`));
            steps.push(step("Kathete b", "Über die Tangensfunktion:", `b = a · tan(β) = ${formatNum(a)} · tan(${formatNum(beta)}°) = ${formatNum(b)}`));
            steps.push(step("Hypotenuse", "Über die Kosinusfunktion, umgestellt nach c:", `c = ${frac('a', 'cos(β)')} = ${frac(formatNum(a), `cos(${formatNum(beta)}°)`)} = ${formatNum(c)}`));
            break;

        case 'b,beta':
            b = v.b; beta = v.beta;
            alpha = 90 - beta;
            c = b / Math.sin(toRad(beta));
            a = b / Math.tan(toRad(beta));
            steps.push(step("Winkel α", "Die Winkelsumme im rechtwinkligen Dreieck ergibt α:", `α = 90° − β = ${formatNum(alpha)}°`));
            steps.push(step("Hypotenuse", "Über die Sinusfunktion, umgestellt nach c:", `c = ${frac('b', 'sin(β)')} = ${frac(formatNum(b), `sin(${formatNum(beta)}°)`)} = ${formatNum(c)}`));
            steps.push(step("Kathete a", "Über die Tangensfunktion, umgestellt nach a:", `a = ${frac('b', 'tan(β)')} = ${frac(formatNum(b), `tan(${formatNum(beta)}°)`)} = ${formatNum(a)}`));
            break;

        case 'a,A':
            a = v.a;
            b = 2 * v.A / a;
            c = Math.sqrt(a * a + b * b);
            alpha = toDeg(Math.atan(a / b));
            beta = 90 - alpha;
            steps.push(step("Kathete b aus der Fläche", "Die Fläche ist A = (a · b) / 2, umgestellt nach b:", `b = ${frac('2A', 'a')} = ${frac(`2 · ${formatNum(v.A)}`, formatNum(a))} = ${formatNum(b)}`));
            steps.push(step("Hypotenuse", "Nach dem Satz des Pythagoras:", `c = ${sqrt('a² + b²')} = ${formatNum(c)}`));
            steps.push(step("Winkel α", "Über die Tangensfunktion:", `α = tan⁻¹(${frac('a', 'b')}) = tan⁻¹(${formatNum(a / b)}) = ${formatNum(alpha)}°`));
            steps.push(step("Winkel β", "Die Winkelsumme ergibt β:", `β = 90° − α = ${formatNum(beta)}°`));
            break;

        case 'b,A':
            b = v.b;
            a = 2 * v.A / b;
            c = Math.sqrt(a * a + b * b);
            alpha = toDeg(Math.atan(a / b));
            beta = 90 - alpha;
            steps.push(step("Kathete a aus der Fläche", "Die Fläche ist A = (a · b) / 2, umgestellt nach a:", `a = ${frac('2A', 'b')} = ${frac(`2 · ${formatNum(v.A)}`, formatNum(b))} = ${formatNum(a)}`));
            steps.push(step("Hypotenuse", "Nach dem Satz des Pythagoras:", `c = ${sqrt('a² + b²')} = ${formatNum(c)}`));
            steps.push(step("Winkel α", "Über die Tangensfunktion:", `α = tan⁻¹(${frac('a', 'b')}) = ${formatNum(alpha)}°`));
            steps.push(step("Winkel β", "Die Winkelsumme ergibt β:", `β = 90° − α = ${formatNum(beta)}°`));
            break;

        case 'c,A': {
            c = v.c;
            if (c * c < 4 * v.A) return { error: "Diese Kombination ergibt kein gültiges Dreieck – bei dieser Hypotenuse ist die Fläche zu groß." };
            const sum = Math.sqrt(c * c + 4 * v.A);
            const dif = Math.sqrt(c * c - 4 * v.A);
            a = (sum + dif) / 2;
            b = (sum - dif) / 2;
            alpha = toDeg(Math.atan(a / b));
            beta = 90 - alpha;
            steps.push(step("Summe der Katheten", "Aus a² + b² = c² und a · b = 2A folgt (a+b)² = c² + 4A:", `a + b = ${sqrt('c² + 4A')} = ${sqrt(`${formatNum(c)}² + 4 · ${formatNum(v.A)}`)} = ${formatNum(sum)}`));
            steps.push(step("Differenz der Katheten", "Ebenso folgt (a−b)² = c² − 4A:", `a − b = ${sqrt('c² − 4A')} = ${sqrt(`${formatNum(c)}² − 4 · ${formatNum(v.A)}`)} = ${formatNum(dif)}`));
            steps.push(step("Katheten a und b", "Summe und Differenz zusammen ergeben beide Katheten:", `a = ${frac(`${formatNum(sum)} + ${formatNum(dif)}`, '2')} = ${formatNum(a)}\nb = ${frac(`${formatNum(sum)} − ${formatNum(dif)}`, '2')} = ${formatNum(b)}`));
            steps.push(step("Winkel α", "Über die Tangensfunktion:", `α = tan⁻¹(${frac('a', 'b')}) = ${formatNum(alpha)}°`));
            steps.push(step("Winkel β", "Die Winkelsumme ergibt β:", `β = 90° − α = ${formatNum(beta)}°`));
            break;
        }

        case 'alpha,A':
            alpha = v.alpha; beta = 90 - alpha;
            c = Math.sqrt(4 * v.A / Math.sin(2 * toRad(alpha)));
            a = c * Math.sin(toRad(alpha));
            b = c * Math.cos(toRad(alpha));
            steps.push(step("Winkel β", "Die Winkelsumme im rechtwinkligen Dreieck ergibt β:", `β = 90° − α = ${formatNum(beta)}°`));
            steps.push(step("Hypotenuse aus der Fläche", "Mit a = c·sin(α) und b = c·cos(α) folgt A = c² · sin(2α) / 4, umgestellt nach c:", `c = ${sqrt(frac('4A', 'sin(2α)'))} = ${sqrt(frac(`4 · ${formatNum(v.A)}`, `sin(${formatNum(2 * alpha)}°)`))} = ${formatNum(c)}`));
            steps.push(step("Kathete a", "Über die Sinusfunktion:", `a = c · sin(α) = ${formatNum(c)} · sin(${formatNum(alpha)}°) = ${formatNum(a)}`));
            steps.push(step("Kathete b", "Über die Kosinusfunktion:", `b = c · cos(α) = ${formatNum(c)} · cos(${formatNum(alpha)}°) = ${formatNum(b)}`));
            break;

        case 'beta,A':
            beta = v.beta; alpha = 90 - beta;
            c = Math.sqrt(4 * v.A / Math.sin(2 * toRad(beta)));
            b = c * Math.sin(toRad(beta));
            a = c * Math.cos(toRad(beta));
            steps.push(step("Winkel α", "Die Winkelsumme im rechtwinkligen Dreieck ergibt α:", `α = 90° − β = ${formatNum(alpha)}°`));
            steps.push(step("Hypotenuse aus der Fläche", "Analog zur Herleitung über α, mit β statt α:", `c = ${sqrt(frac('4A', 'sin(2β)'))} = ${sqrt(frac(`4 · ${formatNum(v.A)}`, `sin(${formatNum(2 * beta)}°)`))} = ${formatNum(c)}`));
            steps.push(step("Kathete b", "Über die Sinusfunktion:", `b = c · sin(β) = ${formatNum(c)} · sin(${formatNum(beta)}°) = ${formatNum(b)}`));
            steps.push(step("Kathete a", "Über die Kosinusfunktion:", `a = c · cos(β) = ${formatNum(c)} · cos(${formatNum(beta)}°) = ${formatNum(a)}`));
            break;

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    const A = a * b / 2;
    if (!ids.includes('A')) steps.push(step("Fläche", "Halbes Produkt der beiden Katheten:", `A = ${frac('a · b', '2')} = ${frac(`${formatNum(a)} · ${formatNum(b)}`, '2')} = ${formatNum(A)}`));

    return { values: { a, b, c, alpha, beta, A }, steps };
}

function resolveTrapezoid(given) {
    const order = ['a', 'c', 'h', 'A'];
    const ids = Object.keys(given).sort((x, y) => order.indexOf(x) - order.indexOf(y));
    const key = ids.join(',');
    const v = given;
    const steps = [];
    let a, c, h, A;

    switch (key) {
        case 'a,c,h':
            a = v.a; c = v.c; h = v.h;
            A = (a + c) / 2 * h;
            steps.push(step("Grundseiten und Höhe", "Alle drei Werte sind bereits gegeben.", `a = ${formatNum(a)}, c = ${formatNum(c)}, h = ${formatNum(h)}`, null, true));
            steps.push(step("Fläche", "Die Trapezfläche ist das Mittel der beiden parallelen Seiten mal der Höhe:", `A = ${frac('a + c', '2')} · h = ${frac(`${formatNum(a)} + ${formatNum(c)}`, '2')} · ${formatNum(h)} = ${formatNum(A)}`));
            break;

        case 'a,c,A':
            a = v.a; c = v.c; A = v.A;
            if (a + c === 0) return { error: "Diese Kombination ergibt kein gültiges Trapez." };
            h = 2 * A / (a + c);
            steps.push(step("Grundseiten und Fläche", "Alle drei Werte sind bereits gegeben.", `a = ${formatNum(a)}, c = ${formatNum(c)}, A = ${formatNum(A)}`, null, true));
            steps.push(step("Höhe", "Die Flächenformel A = (a+c)/2 · h nach h umgestellt:", `h = ${frac('2A', 'a + c')} = ${frac(`2 · ${formatNum(A)}`, `${formatNum(a)} + ${formatNum(c)}`)} = ${formatNum(h)}`));
            break;

        case 'a,h,A':
            a = v.a; h = v.h; A = v.A;
            if (h === 0) return { error: "Diese Kombination ergibt kein gültiges Trapez – die Höhe darf nicht 0 sein." };
            c = 2 * A / h - a;
            if (c <= 0) return { error: "Diese Kombination ergibt kein gültiges Trapez – die zweite Grundseite wäre 0 oder negativ." };
            steps.push(step("Grundseite und Höhe", "Beide Werte sind bereits gegeben.", `a = ${formatNum(a)}, h = ${formatNum(h)}`, null, true));
            steps.push(step("Parallele Seite c", "Die Flächenformel A = (a+c)/2 · h nach c umgestellt:", `c = ${frac('2A', 'h')} − a = ${frac(`2 · ${formatNum(A)}`, formatNum(h))} − ${formatNum(a)} = ${formatNum(c)}`));
            break;

        case 'c,h,A':
            c = v.c; h = v.h; A = v.A;
            if (h === 0) return { error: "Diese Kombination ergibt kein gültiges Trapez – die Höhe darf nicht 0 sein." };
            a = 2 * A / h - c;
            if (a <= 0) return { error: "Diese Kombination ergibt kein gültiges Trapez – die Grundseite a wäre 0 oder negativ." };
            steps.push(step("Parallele Seite und Höhe", "Beide Werte sind bereits gegeben.", `c = ${formatNum(c)}, h = ${formatNum(h)}`, null, true));
            steps.push(step("Grundseite a", "Die Flächenformel A = (a+c)/2 · h nach a umgestellt:", `a = ${frac('2A', 'h')} − c = ${frac(`2 · ${formatNum(A)}`, formatNum(h))} − ${formatNum(c)} = ${formatNum(a)}`));
            break;

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    return { values: { a, c, h, A }, steps };
}

function resolveParallelogram(given) {
    const order = ['a', 'b', 'h', 'A'];
    const ids = Object.keys(given).sort((x, y) => order.indexOf(x) - order.indexOf(y));
    const key = ids.join(',');
    const v = given;
    const steps = [];
    let a, b, h, A;

    switch (key) {
        case 'a,b,h':
            a = v.a; b = v.b; h = v.h;
            A = a * h;
            steps.push(step("Seiten und Höhe", "Alle drei Werte sind bereits gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, h = ${formatNum(h)}`, null, true));
            steps.push(step("Fläche", "Grundseite a mal zugehöriger Höhe h:", `A = a · h = ${formatNum(a)} · ${formatNum(h)} = ${formatNum(A)}`));
            break;

        case 'a,b,A':
            a = v.a; b = v.b; A = v.A;
            if (a === 0) return { error: "Diese Kombination ergibt kein gültiges Parallelogramm – Seite a darf nicht 0 sein." };
            h = A / a;
            steps.push(step("Seiten und Fläche", "Alle drei Werte sind bereits gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, A = ${formatNum(A)}`, null, true));
            steps.push(step("Höhe", "Die Flächenformel A = a · h nach h umgestellt:", `h = ${frac('A', 'a')} = ${frac(formatNum(A), formatNum(a))} = ${formatNum(h)}`));
            break;

        case 'b,h,A':
            b = v.b; h = v.h; A = v.A;
            if (h === 0) return { error: "Diese Kombination ergibt kein gültiges Parallelogramm – die Höhe darf nicht 0 sein." };
            a = A / h;
            if (b < h) return { error: "Diese Kombination ergibt kein gültiges Parallelogramm – Seite b kann nicht kürzer als die Höhe h sein." };
            steps.push(step("Seite und Höhe", "Beide Werte sind bereits gegeben.", `b = ${formatNum(b)}, h = ${formatNum(h)}`, null, true));
            steps.push(step("Seite a", "Die Flächenformel A = a · h nach a umgestellt:", `a = ${frac('A', 'h')} = ${frac(formatNum(A), formatNum(h))} = ${formatNum(a)}`));
            break;

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    return { values: { a, b, h, A }, steps };
}

function resolveRhombus(given) {
    const v = { ...given };
    const preSteps = [];
    const steps = [];

    const rawIds = Object.keys(given);
    preSteps.push(step("Gegebene Werte", "Diese Werte sind bereits bekannt.",
        rawIds.map(id => `${id} = ${formatNum(given[id])}`).join(',  '), null, true));

    if ('U' in v && !('a' in v)) {
        v.a = v.U / 4;
        preSteps.push(step("Seitenlänge aus Umfang", "Eine Raute hat 4 gleich lange Seiten:", `a = ${frac('U', '4')} = ${frac(formatNum(v.U), '4')} = ${formatNum(v.a)}`));
    }

    let a, e, f, h, A, U;
    const order = ['a', 'e', 'f', 'h', 'A'];
    const ids = Object.keys(v).filter(id => order.includes(id)).sort((x, y) => order.indexOf(x) - order.indexOf(y));
    const key = ids.join(',');

    switch (key) {
        case 'a,e':
            a = v.a; e = v.e;
            if (e >= 2 * a) return { error: "Diese Kombination ergibt keine gültige Raute – die Diagonale ist zu lang für diese Seitenlänge." };
            f = 2 * Math.sqrt(a * a - (e / 2) * (e / 2));
            A = e * f / 2;
            h = A / a;
            steps.push(step("Diagonale f", "Die Diagonalen halbieren sich rechtwinklig; nach dem Satz des Pythagoras im Teildreieck:", `f = 2 · ${sqrt(`a² − ${frac('e', '2')}²`)} = 2 · ${sqrt(`${formatNum(a)}² − ${frac(formatNum(e), '2')}²`)} = ${formatNum(f)}`));
            steps.push(step("Fläche", "Halbes Produkt der Diagonalen:", `A = ${frac('e · f', '2')} = ${frac(`${formatNum(e)} · ${formatNum(f)}`, '2')} = ${formatNum(A)}`));
            steps.push(step("Höhe", "Aus der Flächenformel A = a · h umgestellt:", `h = ${frac('A', 'a')} = ${frac(formatNum(A), formatNum(a))} = ${formatNum(h)}`));
            break;

        case 'a,f':
            a = v.a; f = v.f;
            if (f >= 2 * a) return { error: "Diese Kombination ergibt keine gültige Raute – die Diagonale ist zu lang für diese Seitenlänge." };
            e = 2 * Math.sqrt(a * a - (f / 2) * (f / 2));
            A = e * f / 2;
            h = A / a;
            steps.push(step("Diagonale e", "Die Diagonalen halbieren sich rechtwinklig; nach dem Satz des Pythagoras im Teildreieck:", `e = 2 · ${sqrt(`a² − ${frac('f', '2')}²`)} = 2 · ${sqrt(`${formatNum(a)}² − ${frac(formatNum(f), '2')}²`)} = ${formatNum(e)}`));
            steps.push(step("Fläche", "Halbes Produkt der Diagonalen:", `A = ${frac('e · f', '2')} = ${frac(`${formatNum(e)} · ${formatNum(f)}`, '2')} = ${formatNum(A)}`));
            steps.push(step("Höhe", "Aus der Flächenformel A = a · h umgestellt:", `h = ${frac('A', 'a')} = ${frac(formatNum(A), formatNum(a))} = ${formatNum(h)}`));
            break;

        case 'e,f':
            e = v.e; f = v.f;
            a = Math.sqrt((e / 2) * (e / 2) + (f / 2) * (f / 2));
            A = e * f / 2;
            h = A / a;
            steps.push(step("Seitenlänge", "Die Diagonalen halbieren sich rechtwinklig; nach dem Satz des Pythagoras im Teildreieck:", `a = ${sqrt(`${frac('e', '2')}² + ${frac('f', '2')}²`)} = ${sqrt(`${frac(formatNum(e), '2')}² + ${frac(formatNum(f), '2')}²`)} = ${formatNum(a)}`));
            steps.push(step("Fläche", "Halbes Produkt der Diagonalen:", `A = ${frac('e · f', '2')} = ${frac(`${formatNum(e)} · ${formatNum(f)}`, '2')} = ${formatNum(A)}`));
            steps.push(step("Höhe", "Aus der Flächenformel A = a · h umgestellt:", `h = ${frac('A', 'a')} = ${frac(formatNum(A), formatNum(a))} = ${formatNum(h)}`));
            break;

        case 'a,h':
            a = v.a; h = v.h;
            if (h > a) return { error: "Diese Kombination ergibt keine gültige Raute – die Höhe kann nicht größer als die Seitenlänge sein." };
            A = a * h;
            {
                const disc = 4 * Math.pow(a, 4) - 4 * A * A;
                if (disc < 0) return { error: "Diese Kombination ergibt keine gültige Raute." };
                e = Math.sqrt(2 * a * a + Math.sqrt(disc));
                f = Math.sqrt(2 * a * a - Math.sqrt(disc));
            }
            steps.push(step("Fläche", "Seitenlänge mal zugehöriger Höhe:", `A = a · h = ${formatNum(a)} · ${formatNum(h)} = ${formatNum(A)}`));
            steps.push(step("Diagonalen aus a und A", "Aus e² + f² = 4a² und e · f = 2A ergeben sich e² und f² als Lösungen einer quadratischen Gleichung:", `t² − 4a² · t + 4A² = 0\ne = ${formatNum(e)},  f = ${formatNum(f)}`));
            break;

        case 'a,A':
            a = v.a; A = v.A;
            h = A / a;
            {
                const disc = 4 * Math.pow(a, 4) - 4 * A * A;
                if (disc < 0) return { error: "Diese Kombination ergibt keine gültige Raute – bei dieser Seitenlänge ist die Fläche zu groß." };
                e = Math.sqrt(2 * a * a + Math.sqrt(disc));
                f = Math.sqrt(2 * a * a - Math.sqrt(disc));
            }
            steps.push(step("Höhe", "Aus der Flächenformel A = a · h umgestellt:", `h = ${frac('A', 'a')} = ${frac(formatNum(A), formatNum(a))} = ${formatNum(h)}`));
            steps.push(step("Diagonalen aus a und A", "Aus e² + f² = 4a² und e · f = 2A ergeben sich e² und f² als Lösungen einer quadratischen Gleichung:", `t² − 4a² · t + 4A² = 0\ne = ${formatNum(e)},  f = ${formatNum(f)}`));
            break;

        case 'e,h':
            e = v.e; h = v.h;
            if (h >= e) return { error: "Diese Kombination ergibt keine gültige Raute – die Höhe muss kleiner als die Diagonale e sein." };
            a = (e * e) / (2 * Math.sqrt(e * e - h * h));
            A = a * h;
            f = 2 * A / e;
            steps.push(step("Seitenlänge aus e und h", "Kombiniert man a² = (e/2)² + (f/2)² mit A = a·h = e·f/2, ergibt sich nach Auflösen:", `a = ${frac('e²', `2 · ${sqrt('e² − h²')}`)} = ${frac(`${formatNum(e)}²`, `2 · ${sqrt(`${formatNum(e)}² − ${formatNum(h)}²`)}`)} = ${formatNum(a)}`));
            steps.push(step("Fläche", "Seitenlänge mal Höhe:", `A = a · h = ${formatNum(a)} · ${formatNum(h)} = ${formatNum(A)}`));
            steps.push(step("Diagonale f", "Aus der Flächenformel A = e · f / 2 umgestellt:", `f = ${frac('2A', 'e')} = ${frac(`2 · ${formatNum(A)}`, formatNum(e))} = ${formatNum(f)}`));
            break;

        case 'f,h':
            f = v.f; h = v.h;
            if (h >= f) return { error: "Diese Kombination ergibt keine gültige Raute – die Höhe muss kleiner als die Diagonale f sein." };
            a = (f * f) / (2 * Math.sqrt(f * f - h * h));
            A = a * h;
            e = 2 * A / f;
            steps.push(step("Seitenlänge aus f und h", "Kombiniert man a² = (e/2)² + (f/2)² mit A = a·h = e·f/2, ergibt sich nach Auflösen:", `a = ${frac('f²', `2 · ${sqrt('f² − h²')}`)} = ${frac(`${formatNum(f)}²`, `2 · ${sqrt(`${formatNum(f)}² − ${formatNum(h)}²`)}`)} = ${formatNum(a)}`));
            steps.push(step("Fläche", "Seitenlänge mal Höhe:", `A = a · h = ${formatNum(a)} · ${formatNum(h)} = ${formatNum(A)}`));
            steps.push(step("Diagonale e", "Aus der Flächenformel A = e · f / 2 umgestellt:", `e = ${frac('2A', 'f')} = ${frac(`2 · ${formatNum(A)}`, formatNum(f))} = ${formatNum(e)}`));
            break;

        case 'e,A':
            e = v.e; A = v.A;
            f = 2 * A / e;
            a = Math.sqrt((e / 2) * (e / 2) + (f / 2) * (f / 2));
            h = A / a;
            steps.push(step("Diagonale f", "Aus der Flächenformel A = e · f / 2 umgestellt:", `f = ${frac('2A', 'e')} = ${frac(`2 · ${formatNum(A)}`, formatNum(e))} = ${formatNum(f)}`));
            steps.push(step("Seitenlänge", "Nach dem Satz des Pythagoras im Teildreieck der Diagonalen:", `a = ${sqrt(`${frac('e', '2')}² + ${frac('f', '2')}²`)} = ${formatNum(a)}`));
            steps.push(step("Höhe", "Aus der Flächenformel A = a · h umgestellt:", `h = ${frac('A', 'a')} = ${frac(formatNum(A), formatNum(a))} = ${formatNum(h)}`));
            break;

        case 'f,A':
            f = v.f; A = v.A;
            e = 2 * A / f;
            a = Math.sqrt((e / 2) * (e / 2) + (f / 2) * (f / 2));
            h = A / a;
            steps.push(step("Diagonale e", "Aus der Flächenformel A = e · f / 2 umgestellt:", `e = ${frac('2A', 'f')} = ${frac(`2 · ${formatNum(A)}`, formatNum(f))} = ${formatNum(e)}`));
            steps.push(step("Seitenlänge", "Nach dem Satz des Pythagoras im Teildreieck der Diagonalen:", `a = ${sqrt(`${frac('e', '2')}² + ${frac('f', '2')}²`)} = ${formatNum(a)}`));
            steps.push(step("Höhe", "Aus der Flächenformel A = a · h umgestellt:", `h = ${frac('A', 'a')} = ${frac(formatNum(A), formatNum(a))} = ${formatNum(h)}`));
            break;

        case 'h,A':
            h = v.h; A = v.A;
            if (h === 0) return { error: "Diese Kombination ergibt keine gültige Raute – die Höhe darf nicht 0 sein." };
            a = A / h;
            {
                const disc = 4 * Math.pow(a, 4) - 4 * A * A;
                if (disc < 0) return { error: "Diese Kombination ergibt keine gültige Raute." };
                e = Math.sqrt(2 * a * a + Math.sqrt(disc));
                f = Math.sqrt(2 * a * a - Math.sqrt(disc));
            }
            steps.push(step("Seitenlänge", "Aus der Flächenformel A = a · h umgestellt:", `a = ${frac('A', 'h')} = ${frac(formatNum(A), formatNum(h))} = ${formatNum(a)}`));
            steps.push(step("Diagonalen aus a und A", "Aus e² + f² = 4a² und e · f = 2A ergeben sich e² und f² als Lösungen einer quadratischen Gleichung:", `t² − 4a² · t + 4A² = 0\ne = ${formatNum(e)},  f = ${formatNum(f)}`));
            break;

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    U = 4 * a;
    if (!('U' in given)) steps.push(step("Umfang", "Vier gleich lange Seiten addiert:", `U = 4 · a = 4 · ${formatNum(a)} = ${formatNum(U)}`));

    return { values: { a, e, f, h, U, A }, steps: [...preSteps, ...steps] };
}
const shapeResolvers = {
    circle: resolveCircle,
    square: resolveSquare,
    rectangle: resolveRectangle,
    rightTriangle: resolveRightTriangle,
    trapezoid: resolveTrapezoid,
    parallelogram: resolveParallelogram,
    rhombus: resolveRhombus
    // triangle folgt als nächstes
};

function renderRechenwegSteps(steps) {
    // Die CSS-Klasse "final-step" (Name historisch aus den anderen Tools
    // übernommen) wird hier auf JEDEN Schritt angewandt, der etwas berechnet –
    // nicht nur auf den letzten. Nur Schritte, die einen eingegebenen Wert
    // unverändert wiedergeben (isGiven), bleiben neutral.
    rechenwegOutput.innerHTML = steps.map(s => `
            <div class="step-container ${s.isGiven ? "" : "final-step"}">
                <div class="step-title">${s.title}</div>
                ${s.text ? `<div class="step-text">${s.text}</div>` : ""}
                ${s.formula ? `<div class="step-formula-box">${s.formula}</div>` : ""}
                ${s.solution ? `<div class="step-sub-solution">${s.solution}</div>` : ""}
            </div>`).join("");
}

function renderResultsGrid(shape, values, given) {
    const grid = document.querySelector(".ergebnisGrid");
    if (!grid) return;

    grid.innerHTML = shape.inputs.map(input => {
        const isGiven = input.id in given;
        const label = displaySymbol(input.id);
        return `
        <div class="ergebnisItem ${isGiven ? "is-given" : ""}">
            <p class="ergebnisLabel">${label}${isGiven ? ' <i class="fa fa-pencil ergebnisGivenIcon" title="Eingegebener Wert"></i>' : ''}</p>
            <p class="ergebnisValue">${formatNum(values[input.id])}</p>
        </div>`;
    }).join("");
}

function readGivenValues() {
    const given = {};
    let hasInvalid = false;

    getAllActiveSelects().forEach(select => {
        const row = select.closest(".inputContainer, .inputRow");
        const numberInput = row ? row.querySelector(".zahlenInputfeld") : null;
        if (!numberInput) return;

        const raw = numberInput.value.trim();
        if (raw === "") return;

        const num = parseFloat(raw.replace(",", "."));
        if (isNaN(num) || num <= 0) { hasInvalid = true; return; }

        given[select.value] = num;
    });

    return { given, hasInvalid };
}

function setResultsVisible(visible) {
    // Nutzt Opacity statt display:none, damit die Box ihre Höhe behält
    // (siehe Kommentar an .zahlenAusgabestyle in geometrieRechner.css)
    ausgabeContainer.style.opacity = visible ? "1" : "0";
    ausgabeContainer.style.pointerEvents = visible ? "auto" : "none";
}

function calculate() {
    const shapeKey = formSelectContainer.value;
    const shape = shapeConfig[shapeKey];
    if (!shape) return;

    const { given, hasInvalid } = readGivenValues();
    const requiredCount = document.querySelectorAll("#variousInputContainer .zahlenInputfeld").length;
    const givenCount = Object.keys(given).length;

    if (hasInvalid) {
        showError("Bitte nur positive Zahlen eingeben.");
        setResultsVisible(false);
        rechenwegOutput.innerHTML = "";
        return;
    }

    if (givenCount < requiredCount) {
        hideError();
        setResultsVisible(false);
        rechenwegOutput.innerHTML = "";
        return;
    }

    const resolver = shapeResolvers[shapeKey];
    if (!resolver) {
        hideError();
        setResultsVisible(false);
        rechenwegOutput.innerHTML = `<div class="step-container"><div class="step-title">Bald verfügbar</div><div class="step-text">Die Berechnung für „${shape.name}" wird als Nächstes ergänzt.</div></div>`;
        return;
    }

    const result = resolver(given);

    if (result.error) {
        showError(result.error);
        setResultsVisible(false);
        rechenwegOutput.innerHTML = "";
        return;
    }

    hideError();
    setResultsVisible(true);
    renderResultsGrid(shape, result.values, given);
    renderRechenwegSteps(result.steps);
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
        calculate(); // Bereits angezeigtes Ergebnis mit neuer Rundung neu berechnen
    });

    // Cross-Tab/bfcache-Sync, gleiche Logik wie im Finanzrechner
    window.addEventListener('mv:staterestore', () => {
        currentDecimalPlaces = window.MV.getDecimalPlaces();
        decimalPlacesSelect.value = currentDecimalPlaces;
        calculate(); // Bereits angezeigtes Ergebnis mit neuer Rundung neu berechnen
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
    calculate();
}

function deleteThirdInput(){
    const row = document.getElementById("inputRow3");
    if (row) row.remove();

    const shape = shapeConfig[formSelectContainer.value];
    if (shape) refreshSelectOptions(shape);
    refreshSketch();
    calculate();
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
    calculate();
});

inputsContainer.addEventListener("input", (e) => {
    if (!e.target.classList.contains("zahlenInputfeld")) return;
    calculate();
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
        case 4:
            inputsContainer.appendChild(inputTypeFour);
            break;
    }

    populateDropdowns(type);
    refreshSketch();
    calculate();
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