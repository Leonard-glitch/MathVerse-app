
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
        type: 4,
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
        type: 4, // 3 Freiheitsgrade (a,b,c) – 2 Werte reichen nie aus
        inputs: [
            { id: 'a', label: 'Länge (a)' },
            { id: 'b', label: 'Breite (b)' },
            { id: 'c', label: 'Höhe (c)' },
            { id: 'V', label: 'Volumen (V)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'd', label: 'Raumdiagonale (d)' },
            { id: 'G', label: 'Grundfläche (G)' }
        ],
        redundantGroups: [['a', 'b', 'G'], ['c', 'G', 'V']]
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
        redundantGroups: [['r', 'd'], ['r', 'G'], ['d', 'G']],
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
        redundantGroups: [['r', 'd'], ['r', 'G'], ['d', 'G']],
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
        ],
        redundantGroups: [['a', 'G']]
    },
    rectangularpyramid: {
        name: 'Rechteckige Pyramide',
        dimension: '3d',
        type: 4,
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
        ],
        redundantGroups: [['a', 'b', 'G']]
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

function nthroot(index, content) {
    return `<span class="geo-sqrt"><sup class="geo-sqrt-index">${index}</sup><span class="geo-sqrt-symbol">√</span><span class="geo-sqrt-radicand">${content}</span></span>`;
}

function solveSumProduct(s, p) {
    const disc = s * s - 4 * p;
    if (disc < 0) return null;
    const diff = Math.sqrt(disc);
    return [(s + diff) / 2, (s - diff) / 2];
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

// ── Dreieck: trigonometrische Hilfsfunktionen ──────────────────────────────
function triSideFromSAS(p, q, includedAngleDeg) {
    return Math.sqrt(p * p + q * q - 2 * p * q * Math.cos(toRad(includedAngleDeg)));
}
function triAngleFromSSS(oppositeSide, p, q) {
    const cosVal = (p * p + q * q - oppositeSide * oppositeSide) / (2 * p * q);
    return toDeg(Math.acos(Math.max(-1, Math.min(1, cosVal))));
}

// Löst den SSW-Fall: bekannt sind eine Seite mit ihrem Gegenwinkel (pVal/PDeg)
// sowie eine zweite Seite (qVal); gesucht ist deren Gegenwinkel. Da arcsin
// zwei mögliche Lösungen liefert, werden beide auf Gültigkeit geprüft.
function triSolveSSA(pVal, PDeg, qVal) {
    const sinOther = qVal * Math.sin(toRad(PDeg)) / pVal;
    if (sinOther > 1 + 1e-9) return { error: "none" };
    const clamped = Math.min(1, sinOther);
    const sol1 = toDeg(Math.asin(clamped));
    const sol2 = 180 - sol1;
    const valid1 = sol1 + PDeg < 180;
    const valid2 = sol2 + PDeg < 180 && Math.abs(sol2 - sol1) > 1e-6;
    if (valid1 && valid2) return { error: "ambiguous" };
    if (valid1) return { angle: sol1 };
    if (valid2) return { angle: sol2 };
    return { error: "none" };
}

function triSSAResult(pVal, PDeg, qVal, QName) {
    const result = triSolveSSA(pVal, PDeg, qVal);
    if (result.error === "none") {
        return { error: `Diese Kombination ergibt kein gültiges Dreieck – mit diesen Werten lässt sich kein passender Winkel ${displaySymbol(QName)} finden.` };
    }
    if (result.error === "ambiguous") {
        return { error: "Diese Kombination ist nicht eindeutig lösbar: Zwei Seiten und ein nicht eingeschlossener Winkel (SSW-Fall) können zu zwei unterschiedlichen, aber jeweils gültigen Dreiecken führen. Bitte gib stattdessen den eingeschlossenen Winkel oder eine dritte Seite an." };
    }
    return { angle: result.angle };
}

// Gemeinsamer Abschluss für alle Fälle: sobald a, b, c, α, β, γ bekannt sind,
// werden Fläche und alle drei Höhen berechnet und die Schritte ergänzt.
function finishTriangle(a, b, c, alpha, beta, gamma, steps) {
    const A = (a * b * Math.sin(toRad(gamma))) / 2;
    const ha = 2 * A / a;
    const hb = 2 * A / b;
    const hc = 2 * A / c;

    steps.push(step("Fläche", "Über zwei Seiten und den eingeschlossenen Winkel:", `A = ${frac('a · b · sin(γ)', '2')} = ${frac(`${formatNum(a)} · ${formatNum(b)} · sin(${formatNum(gamma)}°)`, '2')} = ${formatNum(A)}`));
    steps.push(step("Höhe ha", "Aus der Flächenformel A = (a · ha) / 2 umgestellt:", `ha = ${frac('2A', 'a')} = ${frac(`2 · ${formatNum(A)}`, formatNum(a))} = ${formatNum(ha)}`));
    steps.push(step("Höhe hb", "Analog für die Höhe auf Seite b:", `hb = ${frac('2A', 'b')} = ${frac(`2 · ${formatNum(A)}`, formatNum(b))} = ${formatNum(hb)}`));
    steps.push(step("Höhe hc", "Analog für die Höhe auf Seite c:", `hc = ${frac('2A', 'c')} = ${frac(`2 · ${formatNum(A)}`, formatNum(c))} = ${formatNum(hc)}`));

    return { values: { a, b, c, alpha, beta, gamma, ha, hb, hc, A }, steps };
}

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

function resolveTriangle(given) {
    const sides = ['a', 'b', 'c'].filter(id => id in given);
    const angles = ['alpha', 'beta', 'gamma'].filter(id => id in given);
    const others = Object.keys(given).filter(id => !sides.includes(id) && !angles.includes(id));

    if (others.length > 0) {
        return { error: "Diese Kombination wird aktuell nicht unterstützt – aktuell lassen sich nur Kombinationen aus drei der Größen a, b, c, α, β oder γ berechnen (z. B. SSS, SWS, WSW oder SSW)." };
    }

    for (const id of angles) {
        if (given[id] <= 0 || given[id] >= 180) {
            return { error: "Winkel müssen zwischen 0° und 180° liegen." };
        }
    }

    // ── SSS: drei Seiten ─────────────────────────────────────────────────
    if (sides.length === 3) {
        const a = given.a, b = given.b, c = given.c;
        if (a + b <= c || a + c <= b || b + c <= a) {
            return { error: "Diese Kombination ergibt kein gültiges Dreieck – die Dreiecksungleichung ist verletzt (jede Seite muss kürzer sein als die Summe der beiden anderen)." };
        }
        const alpha = triAngleFromSSS(a, b, c);
        const beta = triAngleFromSSS(b, a, c);
        const gamma = 180 - alpha - beta;
        const steps = [
            step("Seiten", "Alle drei Seiten sind bereits gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, c = ${formatNum(c)}`, null, true),
            step("Winkel α (Kosinussatz)", "Der Kosinussatz verknüpft alle drei Seiten mit dem Winkel gegenüber a:", `cos(α) = ${frac('b² + c² − a²', '2 · b · c')} = ${frac(`${formatNum(b)}² + ${formatNum(c)}² − ${formatNum(a)}²`, `2 · ${formatNum(b)} · ${formatNum(c)}`)}\nα = ${formatNum(alpha)}°`),
            step("Winkel β (Kosinussatz)", "Ebenso für den Winkel gegenüber b:", `cos(β) = ${frac('a² + c² − b²', '2 · a · c')} = ${frac(`${formatNum(a)}² + ${formatNum(c)}² − ${formatNum(b)}²`, `2 · ${formatNum(a)} · ${formatNum(c)}`)}\nβ = ${formatNum(beta)}°`),
            step("Winkel γ", "Die Winkelsumme im Dreieck ergibt den dritten Winkel:", `γ = 180° − α − β = 180° − ${formatNum(alpha)}° − ${formatNum(beta)}° = ${formatNum(gamma)}°`)
        ];
        return finishTriangle(a, b, c, alpha, beta, gamma, steps);
    }

    // ── SWS (eingeschlossener Winkel) oder SSW (nicht eingeschlossen) ──────
    if (sides.length === 2 && angles.length === 1) {
        const pair = sides.join(',');
        const knownAngleId = angles[0];

        if (pair === 'a,b' && knownAngleId === 'gamma') {
            const a = given.a, b = given.b, gamma = given.gamma;
            const c = triSideFromSAS(a, b, gamma);
            const alpha = triAngleFromSSS(a, b, c);
            const beta = 180 - alpha - gamma;
            const steps = [
                step("Seiten und eingeschlossener Winkel", "Die Seiten a, b und der zwischen ihnen liegende Winkel γ sind gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, γ = ${formatNum(gamma)}°`, null, true),
                step("Seite c (Kosinussatz)", "Der Kosinussatz berechnet die dritte Seite aus den beiden anderen und dem eingeschlossenen Winkel:", `c = ${sqrt('a² + b² − 2 · a · b · cos(γ)')} = ${sqrt(`${formatNum(a)}² + ${formatNum(b)}² − 2 · ${formatNum(a)} · ${formatNum(b)} · cos(${formatNum(gamma)}°)`)} = ${formatNum(c)}`),
                step("Winkel α (Kosinussatz)", "Mit allen drei Seiten bekannt, liefert der Kosinussatz den Winkel gegenüber a:", `cos(α) = ${frac('b² + c² − a²', '2 · b · c')}\nα = ${formatNum(alpha)}°`),
                step("Winkel β", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `β = 180° − α − γ = ${formatNum(beta)}°`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }

        if (pair === 'b,c' && knownAngleId === 'alpha') {
            const b = given.b, c = given.c, alpha = given.alpha;
            const a = triSideFromSAS(b, c, alpha);
            const beta = triAngleFromSSS(b, a, c);
            const gamma = 180 - alpha - beta;
            const steps = [
                step("Seiten und eingeschlossener Winkel", "Die Seiten b, c und der zwischen ihnen liegende Winkel α sind gegeben.", `b = ${formatNum(b)}, c = ${formatNum(c)}, α = ${formatNum(alpha)}°`, null, true),
                step("Seite a (Kosinussatz)", "Der Kosinussatz berechnet die dritte Seite aus den beiden anderen und dem eingeschlossenen Winkel:", `a = ${sqrt('b² + c² − 2 · b · c · cos(α)')} = ${sqrt(`${formatNum(b)}² + ${formatNum(c)}² − 2 · ${formatNum(b)} · ${formatNum(c)} · cos(${formatNum(alpha)}°)`)} = ${formatNum(a)}`),
                step("Winkel β (Kosinussatz)", "Mit allen drei Seiten bekannt, liefert der Kosinussatz den Winkel gegenüber b:", `cos(β) = ${frac('a² + c² − b²', '2 · a · c')}\nβ = ${formatNum(beta)}°`),
                step("Winkel γ", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `γ = 180° − α − β = ${formatNum(gamma)}°`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }

        if (pair === 'a,c' && knownAngleId === 'beta') {
            const a = given.a, c = given.c, beta = given.beta;
            const b = triSideFromSAS(a, c, beta);
            const alpha = triAngleFromSSS(a, b, c);
            const gamma = 180 - alpha - beta;
            const steps = [
                step("Seiten und eingeschlossener Winkel", "Die Seiten a, c und der zwischen ihnen liegende Winkel β sind gegeben.", `a = ${formatNum(a)}, c = ${formatNum(c)}, β = ${formatNum(beta)}°`, null, true),
                step("Seite b (Kosinussatz)", "Der Kosinussatz berechnet die dritte Seite aus den beiden anderen und dem eingeschlossenen Winkel:", `b = ${sqrt('a² + c² − 2 · a · c · cos(β)')} = ${sqrt(`${formatNum(a)}² + ${formatNum(c)}² − 2 · ${formatNum(a)} · ${formatNum(c)} · cos(${formatNum(beta)}°)`)} = ${formatNum(b)}`),
                step("Winkel α (Kosinussatz)", "Mit allen drei Seiten bekannt, liefert der Kosinussatz den Winkel gegenüber a:", `cos(α) = ${frac('b² + c² − a²', '2 · b · c')}\nα = ${formatNum(alpha)}°`),
                step("Winkel γ", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `γ = 180° − α − β = ${formatNum(gamma)}°`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }

        // ── SSW: bekannter Winkel liegt NICHT zwischen den beiden Seiten ───
        if (pair === 'a,b' && knownAngleId === 'alpha') {
            const a = given.a, b = given.b, alpha = given.alpha;
            const res = triSSAResult(a, alpha, b, 'beta');
            if (res.error) return { error: res.error };
            const beta = res.angle;
            const gamma = 180 - alpha - beta;
            const c = a * Math.sin(toRad(gamma)) / Math.sin(toRad(alpha));
            const steps = [
                step("Zwei Seiten und ein nicht eingeschlossener Winkel", "Die Seiten a, b sind gegeben, sowie der Winkel α gegenüber a.", `a = ${formatNum(a)}, b = ${formatNum(b)}, α = ${formatNum(alpha)}°`, null, true),
                step("Winkel β (Sinussatz)", "Der Sinussatz verknüpft Seiten mit ihren Gegenwinkeln:", `sin(β) = ${frac('b · sin(α)', 'a')} = ${frac(`${formatNum(b)} · sin(${formatNum(alpha)}°)`, formatNum(a))}\nβ = ${formatNum(beta)}°`),
                step("Winkel γ", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `γ = 180° − α − β = ${formatNum(gamma)}°`),
                step("Seite c (Sinussatz)", "Der Sinussatz liefert auch die letzte Seite:", `c = ${frac('a · sin(γ)', 'sin(α)')} = ${frac(`${formatNum(a)} · sin(${formatNum(gamma)}°)`, `sin(${formatNum(alpha)}°)`)} = ${formatNum(c)}`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }

        if (pair === 'a,b' && knownAngleId === 'beta') {
            const a = given.a, b = given.b, beta = given.beta;
            const res = triSSAResult(b, beta, a, 'alpha');
            if (res.error) return { error: res.error };
            const alpha = res.angle;
            const gamma = 180 - alpha - beta;
            const c = a * Math.sin(toRad(gamma)) / Math.sin(toRad(alpha));
            const steps = [
                step("Zwei Seiten und ein nicht eingeschlossener Winkel", "Die Seiten a, b sind gegeben, sowie der Winkel β gegenüber b.", `a = ${formatNum(a)}, b = ${formatNum(b)}, β = ${formatNum(beta)}°`, null, true),
                step("Winkel α (Sinussatz)", "Der Sinussatz verknüpft Seiten mit ihren Gegenwinkeln:", `sin(α) = ${frac('a · sin(β)', 'b')} = ${frac(`${formatNum(a)} · sin(${formatNum(beta)}°)`, formatNum(b))}\nα = ${formatNum(alpha)}°`),
                step("Winkel γ", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `γ = 180° − α − β = ${formatNum(gamma)}°`),
                step("Seite c (Sinussatz)", "Der Sinussatz liefert auch die letzte Seite:", `c = ${frac('a · sin(γ)', 'sin(α)')} = ${frac(`${formatNum(a)} · sin(${formatNum(gamma)}°)`, `sin(${formatNum(alpha)}°)`)} = ${formatNum(c)}`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }

        if (pair === 'b,c' && knownAngleId === 'beta') {
            const b = given.b, c = given.c, beta = given.beta;
            const res = triSSAResult(b, beta, c, 'gamma');
            if (res.error) return { error: res.error };
            const gamma = res.angle;
            const alpha = 180 - beta - gamma;
            const a = b * Math.sin(toRad(alpha)) / Math.sin(toRad(beta));
            const steps = [
                step("Zwei Seiten und ein nicht eingeschlossener Winkel", "Die Seiten b, c sind gegeben, sowie der Winkel β gegenüber b.", `b = ${formatNum(b)}, c = ${formatNum(c)}, β = ${formatNum(beta)}°`, null, true),
                step("Winkel γ (Sinussatz)", "Der Sinussatz verknüpft Seiten mit ihren Gegenwinkeln:", `sin(γ) = ${frac('c · sin(β)', 'b')} = ${frac(`${formatNum(c)} · sin(${formatNum(beta)}°)`, formatNum(b))}\nγ = ${formatNum(gamma)}°`),
                step("Winkel α", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `α = 180° − β − γ = ${formatNum(alpha)}°`),
                step("Seite a (Sinussatz)", "Der Sinussatz liefert auch die letzte Seite:", `a = ${frac('b · sin(α)', 'sin(β)')} = ${frac(`${formatNum(b)} · sin(${formatNum(alpha)}°)`, `sin(${formatNum(beta)}°)`)} = ${formatNum(a)}`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }

        if (pair === 'b,c' && knownAngleId === 'gamma') {
            const b = given.b, c = given.c, gamma = given.gamma;
            const res = triSSAResult(c, gamma, b, 'beta');
            if (res.error) return { error: res.error };
            const beta = res.angle;
            const alpha = 180 - beta - gamma;
            const a = b * Math.sin(toRad(alpha)) / Math.sin(toRad(beta));
            const steps = [
                step("Zwei Seiten und ein nicht eingeschlossener Winkel", "Die Seiten b, c sind gegeben, sowie der Winkel γ gegenüber c.", `b = ${formatNum(b)}, c = ${formatNum(c)}, γ = ${formatNum(gamma)}°`, null, true),
                step("Winkel β (Sinussatz)", "Der Sinussatz verknüpft Seiten mit ihren Gegenwinkeln:", `sin(β) = ${frac('b · sin(γ)', 'c')} = ${frac(`${formatNum(b)} · sin(${formatNum(gamma)}°)`, formatNum(c))}\nβ = ${formatNum(beta)}°`),
                step("Winkel α", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `α = 180° − β − γ = ${formatNum(alpha)}°`),
                step("Seite a (Sinussatz)", "Der Sinussatz liefert auch die letzte Seite:", `a = ${frac('b · sin(α)', 'sin(β)')} = ${frac(`${formatNum(b)} · sin(${formatNum(alpha)}°)`, `sin(${formatNum(beta)}°)`)} = ${formatNum(a)}`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }

        if (pair === 'a,c' && knownAngleId === 'alpha') {
            const a = given.a, c = given.c, alpha = given.alpha;
            const res = triSSAResult(a, alpha, c, 'gamma');
            if (res.error) return { error: res.error };
            const gamma = res.angle;
            const beta = 180 - alpha - gamma;
            const b = a * Math.sin(toRad(beta)) / Math.sin(toRad(alpha));
            const steps = [
                step("Zwei Seiten und ein nicht eingeschlossener Winkel", "Die Seiten a, c sind gegeben, sowie der Winkel α gegenüber a.", `a = ${formatNum(a)}, c = ${formatNum(c)}, α = ${formatNum(alpha)}°`, null, true),
                step("Winkel γ (Sinussatz)", "Der Sinussatz verknüpft Seiten mit ihren Gegenwinkeln:", `sin(γ) = ${frac('c · sin(α)', 'a')} = ${frac(`${formatNum(c)} · sin(${formatNum(alpha)}°)`, formatNum(a))}\nγ = ${formatNum(gamma)}°`),
                step("Winkel β", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `β = 180° − α − γ = ${formatNum(beta)}°`),
                step("Seite b (Sinussatz)", "Der Sinussatz liefert auch die letzte Seite:", `b = ${frac('a · sin(β)', 'sin(α)')} = ${frac(`${formatNum(a)} · sin(${formatNum(beta)}°)`, `sin(${formatNum(alpha)}°)`)} = ${formatNum(b)}`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }

        if (pair === 'a,c' && knownAngleId === 'gamma') {
            const a = given.a, c = given.c, gamma = given.gamma;
            const res = triSSAResult(c, gamma, a, 'alpha');
            if (res.error) return { error: res.error };
            const alpha = res.angle;
            const beta = 180 - alpha - gamma;
            const b = a * Math.sin(toRad(beta)) / Math.sin(toRad(alpha));
            const steps = [
                step("Zwei Seiten und ein nicht eingeschlossener Winkel", "Die Seiten a, c sind gegeben, sowie der Winkel γ gegenüber c.", `a = ${formatNum(a)}, c = ${formatNum(c)}, γ = ${formatNum(gamma)}°`, null, true),
                step("Winkel α (Sinussatz)", "Der Sinussatz verknüpft Seiten mit ihren Gegenwinkeln:", `sin(α) = ${frac('a · sin(γ)', 'c')} = ${frac(`${formatNum(a)} · sin(${formatNum(gamma)}°)`, formatNum(c))}\nα = ${formatNum(alpha)}°`),
                step("Winkel β", "Die Winkelsumme im Dreieck ergibt den letzten Winkel:", `β = 180° − α − γ = ${formatNum(beta)}°`),
                step("Seite b (Sinussatz)", "Der Sinussatz liefert auch die letzte Seite:", `b = ${frac('a · sin(β)', 'sin(α)')} = ${frac(`${formatNum(a)} · sin(${formatNum(beta)}°)`, `sin(${formatNum(alpha)}°)`)} = ${formatNum(b)}`)
            ];
            return finishTriangle(a, b, c, alpha, beta, gamma, steps);
        }
    }

    // ── WSW / SWW: zwei Winkel und eine Seite ──────────────────────────────
    if (angles.length === 2 && sides.length === 1) {
        const angleSum = angles.reduce((sum, id) => sum + given[id], 0);
        if (angleSum >= 180) {
            return { error: "Diese Kombination ergibt kein gültiges Dreieck – die Summe zweier Winkel darf 180° nicht erreichen oder überschreiten." };
        }

        const angleVals = { alpha: given.alpha, beta: given.beta, gamma: given.gamma };
        const missingAngle = ['alpha', 'beta', 'gamma'].find(id => !(id in given));
        angleVals[missingAngle] = 180 - angleSum;
        const { alpha, beta, gamma } = angleVals;

        const sideId = sides[0];
        const sideVal = given[sideId];
        const oppAngleOf = { a: 'alpha', b: 'beta', c: 'gamma' };
        const sideVals = { [sideId]: sideVal };
        const missingSides = ['a', 'b', 'c'].filter(id => id !== sideId);

        missingSides.forEach(id => {
            sideVals[id] = sideVal * Math.sin(toRad(angleVals[oppAngleOf[id]])) / Math.sin(toRad(angleVals[oppAngleOf[sideId]]));
        });

        const knownLabel = angles.map(id => displaySymbol(id)).join(', ');
        const steps = [
            step("Zwei Winkel und eine Seite", `Die Winkel ${knownLabel} und die Seite ${sideId} sind gegeben.`,
                angles.map(id => `${displaySymbol(id)} = ${formatNum(given[id])}°`).concat(`${sideId} = ${formatNum(sideVal)}`).join(',  '), null, true),
            step(`Winkel ${displaySymbol(missingAngle)}`, "Die Winkelsumme im Dreieck ergibt den dritten Winkel:", `${displaySymbol(missingAngle)} = 180° − ${angles.map(id => displaySymbol(id)).join(' − ')} = ${formatNum(angleVals[missingAngle])}°`)
        ];
        missingSides.forEach(id => {
            steps.push(step(`Seite ${id}`, "Der Sinussatz verknüpft jede Seite mit ihrem Gegenwinkel:",
                `${id} = ${frac(`${sideId} · sin(${displaySymbol(oppAngleOf[id])})`, `sin(${displaySymbol(oppAngleOf[sideId])})`)} = ${frac(`${formatNum(sideVal)} · sin(${formatNum(angleVals[oppAngleOf[id]])}°)`, `sin(${formatNum(angleVals[oppAngleOf[sideId]])}°)`)} = ${formatNum(sideVals[id])}`));
        });

        return finishTriangle(sideVals.a, sideVals.b, sideVals.c, alpha, beta, gamma, steps);
    }

    return { error: "Diese Kombination wird aktuell nicht unterstützt." };
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

function resolveCube(given) {
    const [knownId, knownVal] = Object.entries(given)[0];
    const steps = [];
    let a;

    if (knownId === 'a') {
        a = knownVal;
        steps.push(step("Kantenlänge", "Die Kantenlänge ist der gegebene Wert.", `a = ${formatNum(a)}`, null, true));
    } else if (knownId === 'O') {
        a = Math.sqrt(knownVal / 6);
        steps.push(step("Kantenlänge aus der Oberfläche", "Die Oberfläche besteht aus 6 gleich großen Quadraten: O = 6a², umgestellt nach a:", `a = ${sqrt(frac('O', '6'))} = ${sqrt(frac(formatNum(knownVal), '6'))} = ${formatNum(a)}`));
    } else if (knownId === 'V') {
        a = Math.cbrt(knownVal);
        steps.push(step("Kantenlänge aus dem Volumen", "Das Volumen ist V = a³, umgestellt nach a:", `a = ${nthroot(3, 'V')} = ${nthroot(3, formatNum(knownVal))} = ${formatNum(a)}`));
    } else {
        a = knownVal / Math.sqrt(3);
        steps.push(step("Kantenlänge aus der Raumdiagonale", "Die Raumdiagonale ist d = a√3, umgestellt nach a:", `a = ${frac('d', '√3')} = ${frac(formatNum(knownVal), '√3')} = ${formatNum(a)}`));
    }

    const O = 6 * a * a, V = a * a * a, d = a * Math.sqrt(3);

    if (knownId !== 'O') steps.push(step("Oberfläche", "Sechs quadratische Seitenflächen:", `O = 6 · a² = 6 · ${formatNum(a)}² = ${formatNum(O)}`));
    if (knownId !== 'V') steps.push(step("Volumen", "Kantenlänge hoch drei:", `V = a³ = ${formatNum(a)}³ = ${formatNum(V)}`));
    if (knownId !== 'd') steps.push(step("Raumdiagonale", "Über den räumlichen Satz des Pythagoras:", `d = a · √3 = ${formatNum(a)} · √3 = ${formatNum(d)}`));

    return { values: { a, O, V, d }, steps };
}

function resolveSphere(given) {
    const [knownId, knownVal] = Object.entries(given)[0];
    const steps = [];
    let r;

    if (knownId === 'r') {
        r = knownVal;
        steps.push(step("Radius", "Der Radius ist der gegebene Wert.", `r = ${formatNum(r)}`, null, true));
    } else if (knownId === 'd') {
        r = knownVal / 2;
        steps.push(step("Radius aus Durchmesser", "Der Radius ist die Hälfte des Durchmessers:", `r = ${frac('d', '2')} = ${frac(formatNum(knownVal), '2')} = ${formatNum(r)}`));
    } else if (knownId === 'O') {
        r = Math.sqrt(knownVal / (4 * Math.PI));
        steps.push(step("Radius aus der Oberfläche", "Die Kugeloberfläche ist O = 4π · r², umgestellt nach r:", `r = ${sqrt(frac('O', '4π'))} = ${sqrt(frac(formatNum(knownVal), '4π'))} = ${formatNum(r)}`));
    } else {
        r = Math.cbrt((3 * knownVal) / (4 * Math.PI));
        steps.push(step("Radius aus dem Volumen", "Das Kugelvolumen ist V = (4/3)π · r³, umgestellt nach r:", `r = ${nthroot(3, frac('3V', '4π'))} = ${nthroot(3, frac(`3 · ${formatNum(knownVal)}`, '4π'))} = ${formatNum(r)}`));
    }

    const d = 2 * r, O = 4 * Math.PI * r * r, V = (4 / 3) * Math.PI * r * r * r;

    if (knownId !== 'd') steps.push(step("Durchmesser", "Doppelter Radius:", `d = 2 · r = 2 · ${formatNum(r)} = ${formatNum(d)}`));
    if (knownId !== 'O') steps.push(step("Oberfläche", "Formel für die Kugeloberfläche:", `O = 4π · r² = 4π · ${formatNum(r)}² = ${formatNum(O)}`));
    if (knownId !== 'V') steps.push(step("Volumen", "Formel für das Kugelvolumen:", `V = ${frac('4', '3')}π · r³ = ${frac('4', '3')}π · ${formatNum(r)}³ = ${formatNum(V)}`));

    return { values: { r, d, O, V }, steps };
}

function resolveCylinder(given) {
    const v = { ...given };
    const rawIds = Object.keys(given);
    const preSteps = [step("Gegebene Werte", "Diese Werte sind bereits bekannt.", rawIds.map(id => `${id} = ${formatNum(given[id])}`).join(',  '), null, true)];

    if ('d' in v && !('r' in v)) {
        v.r = v.d / 2;
        preSteps.push(step("Radius aus Durchmesser", "Der Radius ist die Hälfte des Durchmessers:", `r = ${frac('d', '2')} = ${frac(formatNum(v.d), '2')} = ${formatNum(v.r)}`));
    } else if ('G' in v && !('r' in v)) {
        v.r = Math.sqrt(v.G / Math.PI);
        preSteps.push(step("Radius aus der Grundfläche", "Die Grundfläche ist G = π · r², umgestellt nach r:", `r = ${sqrt(frac('G', 'π'))} = ${sqrt(frac(formatNum(v.G), 'π'))} = ${formatNum(v.r)}`));
    }

    const steps = [];
    const order = ['r', 'h', 'V', 'O', 'M'];
    const key = Object.keys(v).filter(id => order.includes(id)).sort((x, y) => order.indexOf(x) - order.indexOf(y)).join(',');
    let r, h;

    switch (key) {
        case 'r,h': r = v.r; h = v.h; break;

        case 'r,V':
            r = v.r; h = v.V / (Math.PI * r * r);
            steps.push(step("Höhe aus dem Volumen", "Das Volumen ist V = π · r² · h, umgestellt nach h:", `h = ${frac('V', 'π · r²')} = ${frac(formatNum(v.V), `π · ${formatNum(r)}²`)} = ${formatNum(h)}`));
            break;

        case 'r,O':
            r = v.r; h = v.O / (2 * Math.PI * r) - r;
            if (h <= 0) return { error: "Diese Kombination ergibt keinen gültigen Zylinder – die Höhe wäre 0 oder negativ." };
            steps.push(step("Höhe aus der Oberfläche", "Die Oberfläche ist O = 2π · r² + 2π · r · h, umgestellt nach h:", `h = ${frac('O', '2π · r')} − r = ${frac(formatNum(v.O), `2π · ${formatNum(r)}`)} − ${formatNum(r)} = ${formatNum(h)}`));
            break;

        case 'r,M':
            r = v.r; h = v.M / (2 * Math.PI * r);
            steps.push(step("Höhe aus der Mantelfläche", "Die Mantelfläche ist M = 2π · r · h, umgestellt nach h:", `h = ${frac('M', '2π · r')} = ${frac(formatNum(v.M), `2π · ${formatNum(r)}`)} = ${formatNum(h)}`));
            break;

        case 'h,V':
            h = v.h; r = Math.sqrt(v.V / (Math.PI * h));
            steps.push(step("Radius aus dem Volumen", "Das Volumen ist V = π · r² · h, umgestellt nach r:", `r = ${sqrt(frac('V', 'π · h'))} = ${sqrt(frac(formatNum(v.V), `π · ${formatNum(h)}`))} = ${formatNum(r)}`));
            break;

        case 'h,O': {
            h = v.h;
            r = (-h + Math.sqrt(h * h + (2 * v.O) / Math.PI)) / 2;
            if (r <= 0) return { error: "Diese Kombination ergibt keinen gültigen Zylinder." };
            steps.push(step("Radius aus der Oberfläche", "Aus O = 2π · r² + 2π · r · h ergibt sich eine quadratische Gleichung für r:", `2π · r² + 2π · h · r − O = 0\nr = ${frac(`−h + ${sqrt('h² + 2O/π')}`, '2')} = ${formatNum(r)}`));
            break;
        }

        case 'h,M':
            h = v.h; r = v.M / (2 * Math.PI * h);
            steps.push(step("Radius aus der Mantelfläche", "Die Mantelfläche ist M = 2π · r · h, umgestellt nach r:", `r = ${frac('M', '2π · h')} = ${frac(formatNum(v.M), `2π · ${formatNum(h)}`)} = ${formatNum(r)}`));
            break;

        case 'V,M':
            r = 2 * v.V / v.M; h = v.M / (2 * Math.PI * r);
            steps.push(step("Radius aus Volumen und Mantelfläche", "Aus V = π · r² · h und M = 2π · r · h folgt V/M = r/2:", `r = ${frac('2V', 'M')} = ${frac(`2 · ${formatNum(v.V)}`, formatNum(v.M))} = ${formatNum(r)}`));
            steps.push(step("Höhe aus der Mantelfläche", "Die Mantelfläche ist M = 2π · r · h, umgestellt nach h:", `h = ${frac('M', '2π · r')} = ${frac(formatNum(v.M), `2π · ${formatNum(r)}`)} = ${formatNum(h)}`));
            break;

        case 'O,M':
            r = Math.sqrt((v.O - v.M) / (2 * Math.PI)); h = v.M / (2 * Math.PI * r);
            steps.push(step("Radius aus Oberfläche und Mantelfläche", "Da O = 2π · r² + M ist, ergibt sich nach r umgestellt:", `r = ${sqrt(frac('O − M', '2π'))} = ${sqrt(frac(`${formatNum(v.O)} − ${formatNum(v.M)}`, '2π'))} = ${formatNum(r)}`));
            steps.push(step("Höhe aus der Mantelfläche", "Die Mantelfläche ist M = 2π · r · h, umgestellt nach h:", `h = ${frac('M', '2π · r')} = ${frac(formatNum(v.M), `2π · ${formatNum(r)}`)} = ${formatNum(h)}`));
            break;

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    const G = Math.PI * r * r, M = 2 * Math.PI * r * h, O = 2 * G + M, V = G * h, d = 2 * r;

    if (!('G' in given)) steps.push(step("Grundfläche", "Kreisfläche der Grund- und Deckfläche:", `G = π · r² = π · ${formatNum(r)}² = ${formatNum(G)}`));
    if (!('M' in given)) steps.push(step("Mantelfläche", "Abgerolltes Rechteck rund um den Zylinder:", `M = 2π · r · h = 2π · ${formatNum(r)} · ${formatNum(h)} = ${formatNum(M)}`));
    if (!('O' in given)) steps.push(step("Oberfläche", "Grund- und Deckfläche plus Mantelfläche:", `O = 2G + M = 2 · ${formatNum(G)} + ${formatNum(M)} = ${formatNum(O)}`));
    if (!('V' in given)) steps.push(step("Volumen", "Grundfläche mal Höhe:", `V = G · h = ${formatNum(G)} · ${formatNum(h)} = ${formatNum(V)}`));
    if (!('d' in given)) steps.push(step("Durchmesser", "Doppelter Radius:", `d = 2 · r = 2 · ${formatNum(r)} = ${formatNum(d)}`));

    return { values: { r, d, h, V, O, M, G }, steps: [...preSteps, ...steps] };
}

function resolveCone(given) {
    const v = { ...given };
    const rawIds = Object.keys(given);
    const preSteps = [step("Gegebene Werte", "Diese Werte sind bereits bekannt.", rawIds.map(id => `${id} = ${formatNum(given[id])}`).join(',  '), null, true)];

    if ('d' in v && !('r' in v)) {
        v.r = v.d / 2;
        preSteps.push(step("Radius aus Durchmesser", "Der Radius ist die Hälfte des Durchmessers:", `r = ${frac('d', '2')} = ${frac(formatNum(v.d), '2')} = ${formatNum(v.r)}`));
    } else if ('G' in v && !('r' in v)) {
        v.r = Math.sqrt(v.G / Math.PI);
        preSteps.push(step("Radius aus der Grundfläche", "Die Grundfläche ist G = π · r², umgestellt nach r:", `r = ${sqrt(frac('G', 'π'))} = ${sqrt(frac(formatNum(v.G), 'π'))} = ${formatNum(v.r)}`));
    }

    const steps = [];
    const order = ['r', 'h', 's', 'V', 'O', 'M'];
    const key = Object.keys(v).filter(id => order.includes(id)).sort((x, y) => order.indexOf(x) - order.indexOf(y)).join(',');
    let r, h, s;

    switch (key) {
        case 'r,h':
            r = v.r; h = v.h; s = Math.sqrt(r * r + h * h);
            steps.push(step("Mantellinie", "Nach dem Satz des Pythagoras aus Radius und Höhe:", `s = ${sqrt('r² + h²')} = ${sqrt(`${formatNum(r)}² + ${formatNum(h)}²`)} = ${formatNum(s)}`));
            break;

        case 'r,s':
            r = v.r; s = v.s;
            if (s <= r) return { error: "Diese Kombination ergibt keinen gültigen Kegel – die Mantellinie muss größer als der Radius sein." };
            h = Math.sqrt(s * s - r * r);
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras, umgestellt nach h:", `h = ${sqrt('s² − r²')} = ${sqrt(`${formatNum(s)}² − ${formatNum(r)}²`)} = ${formatNum(h)}`));
            break;

        case 'r,V':
            r = v.r; h = 3 * v.V / (Math.PI * r * r); s = Math.sqrt(r * r + h * h);
            steps.push(step("Höhe aus dem Volumen", "Das Volumen ist V = (1/3)π · r² · h, umgestellt nach h:", `h = ${frac('3V', 'π · r²')} = ${frac(`3 · ${formatNum(v.V)}`, `π · ${formatNum(r)}²`)} = ${formatNum(h)}`));
            steps.push(step("Mantellinie", "Nach dem Satz des Pythagoras:", `s = ${sqrt('r² + h²')} = ${formatNum(s)}`));
            break;

        case 'r,O':
            r = v.r; s = v.O / (Math.PI * r) - r;
            if (s <= r) return { error: "Diese Kombination ergibt keinen gültigen Kegel." };
            h = Math.sqrt(s * s - r * r);
            steps.push(step("Mantellinie aus der Oberfläche", "Die Oberfläche ist O = π · r² + π · r · s, umgestellt nach s:", `s = ${frac('O', 'π · r')} − r = ${frac(formatNum(v.O), `π · ${formatNum(r)}`)} − ${formatNum(r)} = ${formatNum(s)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt('s² − r²')} = ${formatNum(h)}`));
            break;

        case 'r,M':
            r = v.r; s = v.M / (Math.PI * r);
            if (s <= r) return { error: "Diese Kombination ergibt keinen gültigen Kegel." };
            h = Math.sqrt(s * s - r * r);
            steps.push(step("Mantellinie aus der Mantelfläche", "Die Mantelfläche ist M = π · r · s, umgestellt nach s:", `s = ${frac('M', 'π · r')} = ${frac(formatNum(v.M), `π · ${formatNum(r)}`)} = ${formatNum(s)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt('s² − r²')} = ${formatNum(h)}`));
            break;

        case 'h,s':
            h = v.h; s = v.s;
            if (s <= h) return { error: "Diese Kombination ergibt keinen gültigen Kegel – die Mantellinie muss größer als die Höhe sein." };
            r = Math.sqrt(s * s - h * h);
            steps.push(step("Radius", "Nach dem Satz des Pythagoras, umgestellt nach r:", `r = ${sqrt('s² − h²')} = ${sqrt(`${formatNum(s)}² − ${formatNum(h)}²`)} = ${formatNum(r)}`));
            break;

        case 'h,V':
            h = v.h; r = Math.sqrt(3 * v.V / (Math.PI * h)); s = Math.sqrt(r * r + h * h);
            steps.push(step("Radius aus dem Volumen", "Das Volumen ist V = (1/3)π · r² · h, umgestellt nach r:", `r = ${sqrt(frac('3V', 'π · h'))} = ${sqrt(frac(`3 · ${formatNum(v.V)}`, `π · ${formatNum(h)}`))} = ${formatNum(r)}`));
            steps.push(step("Mantellinie", "Nach dem Satz des Pythagoras:", `s = ${sqrt('r² + h²')} = ${formatNum(s)}`));
            break;

        case 's,O':
            s = v.s; r = (-s + Math.sqrt(s * s + (4 * v.O) / Math.PI)) / 2;
            if (r <= 0) return { error: "Diese Kombination ergibt keinen gültigen Kegel." };
            h = Math.sqrt(s * s - r * r);
            steps.push(step("Radius aus der Oberfläche", "Aus O = π · r² + π · r · s ergibt sich eine quadratische Gleichung für r:", `π · r² + π · s · r − O = 0\nr = ${frac(`−s + ${sqrt('s² + 4O/π')}`, '2')} = ${formatNum(r)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt('s² − r²')} = ${formatNum(h)}`));
            break;

        case 's,M':
            s = v.s; r = v.M / (Math.PI * s);
            if (s <= r) return { error: "Diese Kombination ergibt keinen gültigen Kegel." };
            h = Math.sqrt(s * s - r * r);
            steps.push(step("Radius aus der Mantelfläche", "Die Mantelfläche ist M = π · r · s, umgestellt nach r:", `r = ${frac('M', 'π · s')} = ${frac(formatNum(v.M), `π · ${formatNum(s)}`)} = ${formatNum(r)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt('s² − r²')} = ${formatNum(h)}`));
            break;

        case 'O,M':
            r = Math.sqrt((v.O - v.M) / Math.PI); s = v.M / (Math.PI * r);
            if (s <= r) return { error: "Diese Kombination ergibt keinen gültigen Kegel." };
            h = Math.sqrt(s * s - r * r);
            steps.push(step("Radius aus Oberfläche und Mantelfläche", "Da O = π · r² + M ist, ergibt sich nach r umgestellt:", `r = ${sqrt(frac('O − M', 'π'))} = ${sqrt(frac(`${formatNum(v.O)} − ${formatNum(v.M)}`, 'π'))} = ${formatNum(r)}`));
            steps.push(step("Mantellinie aus der Mantelfläche", "Die Mantelfläche ist M = π · r · s, umgestellt nach s:", `s = ${frac('M', 'π · r')} = ${formatNum(s)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt('s² − r²')} = ${formatNum(h)}`));
            break;

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    const G = Math.PI * r * r, M = Math.PI * r * s, O = G + M, V = (1 / 3) * G * h, d = 2 * r;

    if (!('G' in given)) steps.push(step("Grundfläche", "Kreisfläche der Grundfläche:", `G = π · r² = π · ${formatNum(r)}² = ${formatNum(G)}`));
    if (!('M' in given)) steps.push(step("Mantelfläche", "Aufgerollter Kreissektor um den Kegel:", `M = π · r · s = π · ${formatNum(r)} · ${formatNum(s)} = ${formatNum(M)}`));
    if (!('O' in given)) steps.push(step("Oberfläche", "Grundfläche plus Mantelfläche:", `O = G + M = ${formatNum(G)} + ${formatNum(M)} = ${formatNum(O)}`));
    if (!('V' in given)) steps.push(step("Volumen", "Ein Drittel der Grundfläche mal Höhe:", `V = ${frac('1', '3')} · G · h = ${frac('1', '3')} · ${formatNum(G)} · ${formatNum(h)} = ${formatNum(V)}`));
    if (!('d' in given)) steps.push(step("Durchmesser", "Doppelter Radius:", `d = 2 · r = 2 · ${formatNum(r)} = ${formatNum(d)}`));

    return { values: { r, d, h, s, V, O, M, G }, steps: [...preSteps, ...steps] };
}

function resolveQuadPyramid(given) {
    const v = { ...given };
    const rawIds = Object.keys(given);
    const preSteps = [step("Gegebene Werte", "Diese Werte sind bereits bekannt.", rawIds.map(id => `${id} = ${formatNum(given[id])}`).join(',  '), null, true)];

    if ('G' in v && !('a' in v)) {
        v.a = Math.sqrt(v.G);
        preSteps.push(step("Grundkante aus der Grundfläche", "Die quadratische Grundfläche ist G = a², umgestellt nach a:", `a = ${sqrt('G')} = ${sqrt(formatNum(v.G))} = ${formatNum(v.a)}`));
    }

    const steps = [];
    const order = ['a', 'h', 'ha', 'V', 'O', 'M'];
    const key = Object.keys(v).filter(id => order.includes(id)).sort((x, y) => order.indexOf(x) - order.indexOf(y)).join(',');
    let a, h, ha;

    switch (key) {
        case 'a,h':
            a = v.a; h = v.h; ha = Math.sqrt(h * h + (a / 2) * (a / 2));
            steps.push(step("Seitenhöhe", "Nach dem Satz des Pythagoras (Höhe und der halbe Grundkanten-Abstand zur Kantenmitte):", `ha = ${sqrt(`h² + (${frac('a', '2')})²`)} = ${sqrt(`${formatNum(h)}² + (${frac(formatNum(a), '2')})²`)} = ${formatNum(ha)}`));
            break;

        case 'a,ha':
            a = v.a; ha = v.ha;
            if (ha <= a / 2) return { error: "Diese Kombination ergibt keine gültige Pyramide – die Seitenhöhe muss größer als der halbe Grundkanten-Abstand sein." };
            h = Math.sqrt(ha * ha - (a / 2) * (a / 2));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras, umgestellt nach h:", `h = ${sqrt(`ha² − (${frac('a', '2')})²`)} = ${sqrt(`${formatNum(ha)}² − (${frac(formatNum(a), '2')})²`)} = ${formatNum(h)}`));
            break;

        case 'a,V':
            a = v.a; h = 3 * v.V / (a * a); ha = Math.sqrt(h * h + (a / 2) * (a / 2));
            steps.push(step("Höhe aus dem Volumen", "Das Volumen ist V = (1/3) · a² · h, umgestellt nach h:", `h = ${frac('3V', 'a²')} = ${frac(`3 · ${formatNum(v.V)}`, `${formatNum(a)}²`)} = ${formatNum(h)}`));
            steps.push(step("Seitenhöhe", "Nach dem Satz des Pythagoras:", `ha = ${sqrt(`h² + (${frac('a', '2')})²`)} = ${formatNum(ha)}`));
            break;

        case 'a,O':
            a = v.a; ha = (v.O - a * a) / (2 * a);
            if (ha <= a / 2) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            h = Math.sqrt(ha * ha - (a / 2) * (a / 2));
            steps.push(step("Seitenhöhe aus der Oberfläche", "Die Oberfläche ist O = a² + 2a · ha, umgestellt nach ha:", `ha = ${frac('O − a²', '2a')} = ${frac(`${formatNum(v.O)} − ${formatNum(a)}²`, `2 · ${formatNum(a)}`)} = ${formatNum(ha)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt(`ha² − (${frac('a', '2')})²`)} = ${formatNum(h)}`));
            break;

        case 'a,M':
            a = v.a; ha = v.M / (2 * a);
            if (ha <= a / 2) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            h = Math.sqrt(ha * ha - (a / 2) * (a / 2));
            steps.push(step("Seitenhöhe aus der Mantelfläche", "Die Mantelfläche ist M = 2a · ha, umgestellt nach ha:", `ha = ${frac('M', '2a')} = ${frac(formatNum(v.M), `2 · ${formatNum(a)}`)} = ${formatNum(ha)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt(`ha² − (${frac('a', '2')})²`)} = ${formatNum(h)}`));
            break;

        case 'h,ha':
            h = v.h; ha = v.ha;
            if (ha <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide – die Seitenhöhe muss größer als die Höhe sein." };
            a = 2 * Math.sqrt(ha * ha - h * h);
            steps.push(step("Grundkante", "Nach dem Satz des Pythagoras, umgestellt nach a:", `a = 2 · ${sqrt('ha² − h²')} = 2 · ${sqrt(`${formatNum(ha)}² − ${formatNum(h)}²`)} = ${formatNum(a)}`));
            break;

        case 'h,V':
            h = v.h; a = Math.sqrt(3 * v.V / h); ha = Math.sqrt(h * h + (a / 2) * (a / 2));
            steps.push(step("Grundkante aus dem Volumen", "Das Volumen ist V = (1/3) · a² · h, umgestellt nach a:", `a = ${sqrt(frac('3V', 'h'))} = ${sqrt(frac(`3 · ${formatNum(v.V)}`, formatNum(h)))} = ${formatNum(a)}`));
            steps.push(step("Seitenhöhe", "Nach dem Satz des Pythagoras:", `ha = ${sqrt(`h² + (${frac('a', '2')})²`)} = ${formatNum(ha)}`));
            break;

        case 'h,O': {
            h = v.h;
            a = v.O / Math.sqrt(2 * v.O + 4 * h * h);
            ha = Math.sqrt(h * h + (a / 2) * (a / 2));
            steps.push(step("Grundkante aus der Oberfläche", "Aus O = a² + 2a · ha und ha = √(h²+(a/2)²) ergibt sich nach Quadrieren und Umstellen:", `a = ${frac('O', sqrt('2O + 4h²'))} = ${frac(formatNum(v.O), sqrt(`2 · ${formatNum(v.O)} + 4 · ${formatNum(h)}²`))} = ${formatNum(a)}`));
            steps.push(step("Seitenhöhe", "Nach dem Satz des Pythagoras:", `ha = ${sqrt(`h² + (${frac('a', '2')})²`)} = ${formatNum(ha)}`));
            break;
        }

        case 'h,M': {
            h = v.h;
            const u = -2 * h * h + Math.sqrt(4 * Math.pow(h, 4) + v.M * v.M);
            a = Math.sqrt(u);
            ha = Math.sqrt(h * h + (a / 2) * (a / 2));
            steps.push(step("Grundkante aus der Mantelfläche", "Aus M = 2a · ha und ha = √(h²+(a/2)²) ergibt sich mit x = a² eine quadratische Gleichung:", `x² + 4h² · x − M² = 0\nx = a² = ${formatNum(u)}\na = √x = ${formatNum(a)}`));
            steps.push(step("Seitenhöhe", "Nach dem Satz des Pythagoras:", `ha = ${sqrt(`h² + (${frac('a', '2')})²`)} = ${formatNum(ha)}`));
            break;
        }

        case 'ha,O':
            ha = v.ha; a = -ha + Math.sqrt(ha * ha + v.O);
            if (a <= 0) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            h = Math.sqrt(ha * ha - (a / 2) * (a / 2));
            steps.push(step("Grundkante aus der Oberfläche", "Aus O = a² + 2ha · a ergibt sich eine quadratische Gleichung für a:", `a² + 2ha · a − O = 0\na = −ha + ${sqrt('ha² + O')} = ${formatNum(a)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt(`ha² − (${frac('a', '2')})²`)} = ${formatNum(h)}`));
            break;

        case 'ha,M':
            ha = v.ha; a = v.M / (2 * ha);
            if (ha <= a / 2) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            h = Math.sqrt(ha * ha - (a / 2) * (a / 2));
            steps.push(step("Grundkante aus der Mantelfläche", "Die Mantelfläche ist M = 2a · ha, umgestellt nach a:", `a = ${frac('M', '2 · ha')} = ${frac(formatNum(v.M), `2 · ${formatNum(ha)}`)} = ${formatNum(a)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt(`ha² − (${frac('a', '2')})²`)} = ${formatNum(h)}`));
            break;

        case 'O,M':
            a = Math.sqrt(v.O - v.M);
            if (a <= 0) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            ha = v.M / (2 * a);
            h = Math.sqrt(ha * ha - (a / 2) * (a / 2));
            steps.push(step("Grundkante", "Da O = a² + M ist, ergibt sich nach a umgestellt:", `a = ${sqrt('O − M')} = ${sqrt(`${formatNum(v.O)} − ${formatNum(v.M)}`)} = ${formatNum(a)}`));
            steps.push(step("Seitenhöhe aus der Mantelfläche", "Die Mantelfläche ist M = 2a · ha, umgestellt nach ha:", `ha = ${frac('M', '2a')} = ${formatNum(ha)}`));
            steps.push(step("Höhe", "Nach dem Satz des Pythagoras:", `h = ${sqrt(`ha² − (${frac('a', '2')})²`)} = ${formatNum(h)}`));
            break;

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    const G = a * a, M = 2 * a * ha, O = G + M, V = (1 / 3) * G * h;

    if (!('G' in given)) steps.push(step("Grundfläche", "Grundkante im Quadrat:", `G = a² = ${formatNum(a)}² = ${formatNum(G)}`));
    if (!('M' in given)) steps.push(step("Mantelfläche", "Vier gleichschenklige Dreiecke:", `M = 2a · ha = 2 · ${formatNum(a)} · ${formatNum(ha)} = ${formatNum(M)}`));
    if (!('O' in given)) steps.push(step("Oberfläche", "Grundfläche plus Mantelfläche:", `O = G + M = ${formatNum(G)} + ${formatNum(M)} = ${formatNum(O)}`));
    if (!('V' in given)) steps.push(step("Volumen", "Ein Drittel der Grundfläche mal Höhe:", `V = ${frac('1', '3')} · G · h = ${frac('1', '3')} · ${formatNum(G)} · ${formatNum(h)} = ${formatNum(V)}`));

    return { values: { a, h, ha, V, O, M, G }, steps: [...preSteps, ...steps] };
}

function resolveRectPyramid(given) {
    const order = ['a', 'b', 'h', 'ha', 'hb', 'V', 'G', 'O', 'M'];
    const ids = Object.keys(given).filter(id => order.includes(id)).sort((x, y) => order.indexOf(x) - order.indexOf(y));
    const key = ids.join(',');
    const v = given;
    const steps = [];
    let a, b, h;

    switch (key) {
        case 'a,b,h':
            a = v.a; b = v.b; h = v.h;
            steps.push(step("Grundkanten und Höhe", "Alle drei Werte sind bereits gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, h = ${formatNum(h)}`, null, true));
            break;

        case 'a,b,V':
            a = v.a; b = v.b; h = 3 * v.V / (a * b);
            steps.push(step("Grundkanten und Volumen", "Beide Grundkanten sowie das Volumen sind gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, V = ${formatNum(v.V)}`, null, true));
            steps.push(step("Höhe", "Das Volumen ist V = (1/3) · a · b · h, umgestellt nach h:", `h = ${frac('3V', 'a · b')} = ${frac(`3 · ${formatNum(v.V)}`, `${formatNum(a)} · ${formatNum(b)}`)} = ${formatNum(h)}`));
            break;

        case 'a,b,ha':
            a = v.a; b = v.b;
            if (v.ha <= b / 2) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            h = Math.sqrt(v.ha * v.ha - (b / 2) * (b / 2));
            steps.push(step("Grundkanten und Seitenhöhe ha", "a, b sowie die Seitenhöhe ha (der Seitenfläche über a) sind gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, ha = ${formatNum(v.ha)}`, null, true));
            steps.push(step("Höhe", "ha = √(h² + (b/2)²), umgestellt nach h:", `h = ${sqrt(`ha² − (${frac('b', '2')})²`)} = ${sqrt(`${formatNum(v.ha)}² − (${frac(formatNum(b), '2')})²`)} = ${formatNum(h)}`));
            break;

        case 'a,b,hb':
            a = v.a; b = v.b;
            if (v.hb <= a / 2) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            h = Math.sqrt(v.hb * v.hb - (a / 2) * (a / 2));
            steps.push(step("Grundkanten und Seitenhöhe hb", "a, b sowie die Seitenhöhe hb (der Seitenfläche über b) sind gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, hb = ${formatNum(v.hb)}`, null, true));
            steps.push(step("Höhe", "hb = √(h² + (a/2)²), umgestellt nach h:", `h = ${sqrt(`hb² − (${frac('a', '2')})²`)} = ${sqrt(`${formatNum(v.hb)}² − (${frac(formatNum(a), '2')})²`)} = ${formatNum(h)}`));
            break;

        case 'a,h,V':
            a = v.a; h = v.h; b = 3 * v.V / (a * h);
            steps.push(step("Grundkante a, Höhe und Volumen", "a, h sowie das Volumen sind gegeben.", `a = ${formatNum(a)}, h = ${formatNum(h)}, V = ${formatNum(v.V)}`, null, true));
            steps.push(step("Grundkante b", "Das Volumen ist V = (1/3) · a · b · h, umgestellt nach b:", `b = ${frac('3V', 'a · h')} = ${frac(`3 · ${formatNum(v.V)}`, `${formatNum(a)} · ${formatNum(h)}`)} = ${formatNum(b)}`));
            break;

        case 'a,h,G':
            a = v.a; h = v.h; b = v.G / a;
            steps.push(step("Grundkante a, Höhe und Grundfläche", "a, h sowie die Grundfläche sind gegeben.", `a = ${formatNum(a)}, h = ${formatNum(h)}, G = ${formatNum(v.G)}`, null, true));
            steps.push(step("Grundkante b", "Die Grundfläche ist G = a · b, umgestellt nach b:", `b = ${frac('G', 'a')} = ${frac(formatNum(v.G), formatNum(a))} = ${formatNum(b)}`));
            break;

        case 'a,h,ha':
            a = v.a; h = v.h;
            if (v.ha <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            b = 2 * Math.sqrt(v.ha * v.ha - h * h);
            steps.push(step("Grundkante a, Höhe und Seitenhöhe ha", "a, h sowie ha (Seitenhöhe der Fläche über a) sind gegeben.", `a = ${formatNum(a)}, h = ${formatNum(h)}, ha = ${formatNum(v.ha)}`, null, true));
            steps.push(step("Grundkante b", "ha = √(h² + (b/2)²), umgestellt nach b:", `b = 2 · ${sqrt('ha² − h²')} = 2 · ${sqrt(`${formatNum(v.ha)}² − ${formatNum(h)}²`)} = ${formatNum(b)}`));
            break;

        case 'b,h,V':
            b = v.b; h = v.h; a = 3 * v.V / (b * h);
            steps.push(step("Grundkante b, Höhe und Volumen", "b, h sowie das Volumen sind gegeben.", `b = ${formatNum(b)}, h = ${formatNum(h)}, V = ${formatNum(v.V)}`, null, true));
            steps.push(step("Grundkante a", "Das Volumen ist V = (1/3) · a · b · h, umgestellt nach a:", `a = ${frac('3V', 'b · h')} = ${frac(`3 · ${formatNum(v.V)}`, `${formatNum(b)} · ${formatNum(h)}`)} = ${formatNum(a)}`));
            break;

        case 'b,h,G':
            b = v.b; h = v.h; a = v.G / b;
            steps.push(step("Grundkante b, Höhe und Grundfläche", "b, h sowie die Grundfläche sind gegeben.", `b = ${formatNum(b)}, h = ${formatNum(h)}, G = ${formatNum(v.G)}`, null, true));
            steps.push(step("Grundkante a", "Die Grundfläche ist G = a · b, umgestellt nach a:", `a = ${frac('G', 'b')} = ${frac(formatNum(v.G), formatNum(b))} = ${formatNum(a)}`));
            break;

        case 'b,h,hb':
            b = v.b; h = v.h;
            if (v.hb <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            a = 2 * Math.sqrt(v.hb * v.hb - h * h);
            steps.push(step("Grundkante b, Höhe und Seitenhöhe hb", "b, h sowie hb (Seitenhöhe der Fläche über b) sind gegeben.", `b = ${formatNum(b)}, h = ${formatNum(h)}, hb = ${formatNum(v.hb)}`, null, true));
            steps.push(step("Grundkante a", "hb = √(h² + (a/2)²), umgestellt nach a:", `a = 2 · ${sqrt('hb² − h²')} = 2 · ${sqrt(`${formatNum(v.hb)}² − ${formatNum(h)}²`)} = ${formatNum(a)}`));
            break;

        case 'h,ha,hb': {
            h = v.h;
            if (v.ha <= h || v.hb <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide – beide Seitenhöhen müssen größer als die Höhe sein." };
            b = 2 * Math.sqrt(v.ha * v.ha - h * h);
            a = 2 * Math.sqrt(v.hb * v.hb - h * h);
            steps.push(step("Höhe und beide Seitenhöhen", "Die Höhe h sowie die Seitenhöhen ha und hb sind gegeben.", `h = ${formatNum(h)}, ha = ${formatNum(v.ha)}, hb = ${formatNum(v.hb)}`, null, true));
            steps.push(step("Grundkante b", "Aus ha = √(h² + (b/2)²), umgestellt nach b:", `b = 2 · ${sqrt('ha² − h²')} = 2 · ${sqrt(`${formatNum(v.ha)}² − ${formatNum(h)}²`)} = ${formatNum(b)}`));
            steps.push(step("Grundkante a", "Aus hb = √(h² + (a/2)²), umgestellt nach a:", `a = 2 · ${sqrt('hb² − h²')} = 2 · ${sqrt(`${formatNum(v.hb)}² − ${formatNum(h)}²`)} = ${formatNum(a)}`));
            break;
        }

        case 'a,ha,hb': {
            a = v.a;
            if (v.hb <= a / 2) return { error: "Diese Kombination ergibt keine gültige Pyramide – die Seitenhöhe hb ist zu klein für diese Grundkante." };
            h = Math.sqrt(v.hb * v.hb - (a / 2) * (a / 2));
            if (v.ha <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            b = 2 * Math.sqrt(v.ha * v.ha - h * h);
            steps.push(step("Grundkante a und beide Seitenhöhen", "Die Grundkante a sowie die Seitenhöhen ha und hb sind gegeben.", `a = ${formatNum(a)}, ha = ${formatNum(v.ha)}, hb = ${formatNum(v.hb)}`, null, true));
            steps.push(step("Höhe", "Aus hb = √(h² + (a/2)²), umgestellt nach h:", `h = ${sqrt(`hb² − (${frac('a', '2')})²`)} = ${sqrt(`${formatNum(v.hb)}² − (${frac(formatNum(a), '2')})²`)} = ${formatNum(h)}`));
            steps.push(step("Grundkante b", "Aus ha = √(h² + (b/2)²), umgestellt nach b:", `b = 2 · ${sqrt('ha² − h²')} = ${formatNum(b)}`));
            break;
        }

        case 'b,ha,hb': {
            b = v.b;
            if (v.ha <= b / 2) return { error: "Diese Kombination ergibt keine gültige Pyramide – die Seitenhöhe ha ist zu klein für diese Grundkante." };
            h = Math.sqrt(v.ha * v.ha - (b / 2) * (b / 2));
            if (v.hb <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            a = 2 * Math.sqrt(v.hb * v.hb - h * h);
            steps.push(step("Grundkante b und beide Seitenhöhen", "Die Grundkante b sowie die Seitenhöhen ha und hb sind gegeben.", `b = ${formatNum(b)}, ha = ${formatNum(v.ha)}, hb = ${formatNum(v.hb)}`, null, true));
            steps.push(step("Höhe", "Aus ha = √(h² + (b/2)²), umgestellt nach h:", `h = ${sqrt(`ha² − (${frac('b', '2')})²`)} = ${sqrt(`${formatNum(v.ha)}² − (${frac(formatNum(b), '2')})²`)} = ${formatNum(h)}`));
            steps.push(step("Grundkante a", "Aus hb = √(h² + (a/2)²), umgestellt nach a:", `a = 2 · ${sqrt('hb² − h²')} = ${formatNum(a)}`));
            break;
        }

        case 'h,ha,V':
            h = v.h;
            if (v.ha <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            b = 2 * Math.sqrt(v.ha * v.ha - h * h);
            a = 3 * v.V / (b * h);
            steps.push(step("Höhe, Seitenhöhe ha und Volumen", "h, ha sowie das Volumen sind gegeben.", `h = ${formatNum(h)}, ha = ${formatNum(v.ha)}, V = ${formatNum(v.V)}`, null, true));
            steps.push(step("Grundkante b", "Aus ha = √(h² + (b/2)²), umgestellt nach b:", `b = 2 · ${sqrt('ha² − h²')} = ${formatNum(b)}`));
            steps.push(step("Grundkante a", "Das Volumen ist V = (1/3) · a · b · h, umgestellt nach a:", `a = ${frac('3V', 'b · h')} = ${frac(`3 · ${formatNum(v.V)}`, `${formatNum(b)} · ${formatNum(h)}`)} = ${formatNum(a)}`));
            break;

        case 'h,hb,V':
            h = v.h;
            if (v.hb <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            a = 2 * Math.sqrt(v.hb * v.hb - h * h);
            b = 3 * v.V / (a * h);
            steps.push(step("Höhe, Seitenhöhe hb und Volumen", "h, hb sowie das Volumen sind gegeben.", `h = ${formatNum(h)}, hb = ${formatNum(v.hb)}, V = ${formatNum(v.V)}`, null, true));
            steps.push(step("Grundkante a", "Aus hb = √(h² + (a/2)²), umgestellt nach a:", `a = 2 · ${sqrt('hb² − h²')} = ${formatNum(a)}`));
            steps.push(step("Grundkante b", "Das Volumen ist V = (1/3) · a · b · h, umgestellt nach b:", `b = ${frac('3V', 'a · h')} = ${frac(`3 · ${formatNum(v.V)}`, `${formatNum(a)} · ${formatNum(h)}`)} = ${formatNum(b)}`));
            break;

        case 'h,ha,G':
            h = v.h;
            if (v.ha <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            b = 2 * Math.sqrt(v.ha * v.ha - h * h);
            a = v.G / b;
            steps.push(step("Höhe, Seitenhöhe ha und Grundfläche", "h, ha sowie die Grundfläche sind gegeben.", `h = ${formatNum(h)}, ha = ${formatNum(v.ha)}, G = ${formatNum(v.G)}`, null, true));
            steps.push(step("Grundkante b", "Aus ha = √(h² + (b/2)²), umgestellt nach b:", `b = 2 · ${sqrt('ha² − h²')} = ${formatNum(b)}`));
            steps.push(step("Grundkante a", "Die Grundfläche ist G = a · b, umgestellt nach a:", `a = ${frac('G', 'b')} = ${frac(formatNum(v.G), formatNum(b))} = ${formatNum(a)}`));
            break;

        case 'h,hb,G':
            h = v.h;
            if (v.hb <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            a = 2 * Math.sqrt(v.hb * v.hb - h * h);
            b = v.G / a;
            steps.push(step("Höhe, Seitenhöhe hb und Grundfläche", "h, hb sowie die Grundfläche sind gegeben.", `h = ${formatNum(h)}, hb = ${formatNum(v.hb)}, G = ${formatNum(v.G)}`, null, true));
            steps.push(step("Grundkante a", "Aus hb = √(h² + (a/2)²), umgestellt nach a:", `a = 2 · ${sqrt('hb² − h²')} = ${formatNum(a)}`));
            steps.push(step("Grundkante b", "Die Grundfläche ist G = a · b, umgestellt nach b:", `b = ${frac('G', 'a')} = ${frac(formatNum(v.G), formatNum(a))} = ${formatNum(b)}`));
            break;

        case 'h,ha,M': {
            h = v.h;
            if (v.ha <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            b = 2 * Math.sqrt(v.ha * v.ha - h * h);
            // Quadratische Gleichung für a (aus M = a·ha + b·√(h²+(a/2)²) nach Quadrieren).
            // Beide möglichen Lösungen werden gegen die ursprüngliche Gleichung geprüft,
            // um die durchs Quadrieren entstandene Scheinlösung sicher auszuschließen.
            const discRoot = b * Math.sqrt(v.M * v.M + 4 * Math.pow(h, 4));
            const candidates = [(2 * v.M * v.ha + discRoot) / (2 * h * h), (2 * v.M * v.ha - discRoot) / (2 * h * h)];
            const valid = candidates.find(cand => {
                if (cand <= 0) return false;
                const hbCheck = Math.sqrt(h * h + (cand / 2) * (cand / 2));
                return Math.abs(cand * v.ha + b * hbCheck - v.M) < 1e-6 * v.M;
            });
            if (valid === undefined) return { error: "Diese Kombination ergibt keine gültige Pyramide – die Werte passen nicht zusammen." };
            a = valid;
            steps.push(step("Höhe, Seitenhöhe ha und Mantelfläche", "h, ha sowie die Mantelfläche sind gegeben.", `h = ${formatNum(h)}, ha = ${formatNum(v.ha)}, M = ${formatNum(v.M)}`, null, true));
            steps.push(step("Grundkante b", "Aus ha = √(h² + (b/2)²), umgestellt nach b:", `b = 2 · ${sqrt('ha² − h²')} = ${formatNum(b)}`));
            steps.push(step("Grundkante a", "Aus M = a · ha + b · √(h² + (a/2)²) ergibt sich nach Quadrieren eine quadratische Gleichung für a:", `h² · a² − 2M·ha · a + (M² − b²h²) = 0\na = ${formatNum(a)}`));
            break;
        }

        case 'h,hb,M': {
            h = v.h;
            if (v.hb <= h) return { error: "Diese Kombination ergibt keine gültige Pyramide." };
            a = 2 * Math.sqrt(v.hb * v.hb - h * h);
            const discRoot = a * Math.sqrt(v.M * v.M + 4 * Math.pow(h, 4));
            const candidates = [(2 * v.M * v.hb + discRoot) / (2 * h * h), (2 * v.M * v.hb - discRoot) / (2 * h * h)];
            const valid = candidates.find(cand => {
                if (cand <= 0) return false;
                const haCheck = Math.sqrt(h * h + (cand / 2) * (cand / 2));
                return Math.abs(a * haCheck + cand * v.hb - v.M) < 1e-6 * v.M;
            });
            if (valid === undefined) return { error: "Diese Kombination ergibt keine gültige Pyramide – die Werte passen nicht zusammen." };
            b = valid;
            steps.push(step("Höhe, Seitenhöhe hb und Mantelfläche", "h, hb sowie die Mantelfläche sind gegeben.", `h = ${formatNum(h)}, hb = ${formatNum(v.hb)}, M = ${formatNum(v.M)}`, null, true));
            steps.push(step("Grundkante a", "Aus hb = √(h² + (a/2)²), umgestellt nach a:", `a = 2 · ${sqrt('hb² − h²')} = ${formatNum(a)}`));
            steps.push(step("Grundkante b", "Aus M = a · √(h² + (b/2)²) + b · hb ergibt sich nach Quadrieren eine quadratische Gleichung für b:", `h² · b² − 2M·hb · b + (M² − a²h²) = 0\nb = ${formatNum(b)}`));
            break;
        }

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    const ha = Math.sqrt(h * h + (b / 2) * (b / 2));
    const hb = Math.sqrt(h * h + (a / 2) * (a / 2));
    const G = a * b, M = a * ha + b * hb, O = G + M, V = (1 / 3) * G * h;

    if (!ids.includes('ha')) steps.push(step("Seitenhöhe ha", "Höhe der Seitenfläche über der Grundkante a:", `ha = ${sqrt(`h² + (${frac('b', '2')})²`)} = ${formatNum(ha)}`));
    if (!ids.includes('hb')) steps.push(step("Seitenhöhe hb", "Höhe der Seitenfläche über der Grundkante b:", `hb = ${sqrt(`h² + (${frac('a', '2')})²`)} = ${formatNum(hb)}`));
    if (!ids.includes('G')) steps.push(step("Grundfläche", "Länge mal Breite:", `G = a · b = ${formatNum(a)} · ${formatNum(b)} = ${formatNum(G)}`));
    steps.push(step("Mantelfläche", "Zwei Paare gleichschenkliger Dreiecke:", `M = a · ha + b · hb = ${formatNum(a)} · ${formatNum(ha)} + ${formatNum(b)} · ${formatNum(hb)} = ${formatNum(M)}`));
    steps.push(step("Oberfläche", "Grundfläche plus Mantelfläche:", `O = G + M = ${formatNum(G)} + ${formatNum(M)} = ${formatNum(O)}`));
    if (!ids.includes('V')) steps.push(step("Volumen", "Ein Drittel der Grundfläche mal Höhe:", `V = ${frac('1', '3')} · G · h = ${formatNum(V)}`));

    return { values: { a, b, h, ha, hb, V, O, M, G }, steps };
}

function resolveCuboid(given) {
    const order = ['a', 'b', 'c', 'V', 'O', 'd', 'G'];
    const ids = Object.keys(given).filter(id => order.includes(id)).sort((x, y) => order.indexOf(x) - order.indexOf(y));
    const key = ids.join(',');
    const v = given;
    const steps = [];
    let a, b, c;

    switch (key) {
        case 'a,b,c':
            a = v.a; b = v.b; c = v.c;
            steps.push(step("Kanten", "Alle drei Kantenlängen sind bereits gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, c = ${formatNum(c)}`, null, true));
            break;

        case 'a,b,V':
            a = v.a; b = v.b; c = v.V / (a * b);
            steps.push(step("Kanten a, b und Volumen", "a, b sowie das Volumen sind gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, V = ${formatNum(v.V)}`, null, true));
            steps.push(step("Kante c", "Das Volumen ist V = a · b · c, umgestellt nach c:", `c = ${frac('V', 'a · b')} = ${frac(formatNum(v.V), `${formatNum(a)} · ${formatNum(b)}`)} = ${formatNum(c)}`));
            break;

        case 'a,b,O':
            a = v.a; b = v.b; c = (v.O - 2 * a * b) / (2 * (a + b));
            if (c <= 0) return { error: "Diese Kombination ergibt keinen gültigen Quader." };
            steps.push(step("Kanten a, b und Oberfläche", "a, b sowie die Oberfläche sind gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, O = ${formatNum(v.O)}`, null, true));
            steps.push(step("Kante c", "Die Oberfläche ist O = 2(ab + ac + bc), umgestellt nach c:", `c = ${frac('O − 2ab', '2(a + b)')} = ${frac(`${formatNum(v.O)} − 2 · ${formatNum(a)} · ${formatNum(b)}`, `2 · (${formatNum(a)} + ${formatNum(b)})`)} = ${formatNum(c)}`));
            break;

        case 'a,b,d':
            a = v.a; b = v.b;
            if (v.d * v.d <= a * a + b * b) return { error: "Diese Kombination ergibt keinen gültigen Quader – die Raumdiagonale ist zu kurz." };
            c = Math.sqrt(v.d * v.d - a * a - b * b);
            steps.push(step("Kanten a, b und Raumdiagonale", "a, b sowie die Raumdiagonale sind gegeben.", `a = ${formatNum(a)}, b = ${formatNum(b)}, d = ${formatNum(v.d)}`, null, true));
            steps.push(step("Kante c", "Nach dem räumlichen Satz des Pythagoras d² = a² + b² + c², umgestellt nach c:", `c = ${sqrt('d² − a² − b²')} = ${sqrt(`${formatNum(v.d)}² − ${formatNum(a)}² − ${formatNum(b)}²`)} = ${formatNum(c)}`));
            break;

        case 'a,c,V':
            a = v.a; c = v.c; b = v.V / (a * c);
            steps.push(step("Kanten a, c und Volumen", "a, c sowie das Volumen sind gegeben.", `a = ${formatNum(a)}, c = ${formatNum(c)}, V = ${formatNum(v.V)}`, null, true));
            steps.push(step("Kante b", "Das Volumen ist V = a · b · c, umgestellt nach b:", `b = ${frac('V', 'a · c')} = ${frac(formatNum(v.V), `${formatNum(a)} · ${formatNum(c)}`)} = ${formatNum(b)}`));
            break;

        case 'a,c,O':
            a = v.a; c = v.c; b = (v.O - 2 * a * c) / (2 * (a + c));
            if (b <= 0) return { error: "Diese Kombination ergibt keinen gültigen Quader." };
            steps.push(step("Kanten a, c und Oberfläche", "a, c sowie die Oberfläche sind gegeben.", `a = ${formatNum(a)}, c = ${formatNum(c)}, O = ${formatNum(v.O)}`, null, true));
            steps.push(step("Kante b", "Die Oberfläche ist O = 2(ab + ac + bc), umgestellt nach b:", `b = ${frac('O − 2ac', '2(a + c)')} = ${frac(`${formatNum(v.O)} − 2 · ${formatNum(a)} · ${formatNum(c)}`, `2 · (${formatNum(a)} + ${formatNum(c)})`)} = ${formatNum(b)}`));
            break;

        case 'a,c,d':
            a = v.a; c = v.c;
            if (v.d * v.d <= a * a + c * c) return { error: "Diese Kombination ergibt keinen gültigen Quader – die Raumdiagonale ist zu kurz." };
            b = Math.sqrt(v.d * v.d - a * a - c * c);
            steps.push(step("Kanten a, c und Raumdiagonale", "a, c sowie die Raumdiagonale sind gegeben.", `a = ${formatNum(a)}, c = ${formatNum(c)}, d = ${formatNum(v.d)}`, null, true));
            steps.push(step("Kante b", "Nach dem räumlichen Satz des Pythagoras, umgestellt nach b:", `b = ${sqrt('d² − a² − c²')} = ${sqrt(`${formatNum(v.d)}² − ${formatNum(a)}² − ${formatNum(c)}²`)} = ${formatNum(b)}`));
            break;

        case 'a,c,G':
            a = v.a; c = v.c; b = v.G / a;
            steps.push(step("Kante a, c und Grundfläche", "a, c sowie die Grundfläche sind gegeben.", `a = ${formatNum(a)}, c = ${formatNum(c)}, G = ${formatNum(v.G)}`, null, true));
            steps.push(step("Kante b", "Die Grundfläche ist G = a · b, umgestellt nach b:", `b = ${frac('G', 'a')} = ${frac(formatNum(v.G), formatNum(a))} = ${formatNum(b)}`));
            break;

        case 'b,c,V':
            b = v.b; c = v.c; a = v.V / (b * c);
            steps.push(step("Kanten b, c und Volumen", "b, c sowie das Volumen sind gegeben.", `b = ${formatNum(b)}, c = ${formatNum(c)}, V = ${formatNum(v.V)}`, null, true));
            steps.push(step("Kante a", "Das Volumen ist V = a · b · c, umgestellt nach a:", `a = ${frac('V', 'b · c')} = ${frac(formatNum(v.V), `${formatNum(b)} · ${formatNum(c)}`)} = ${formatNum(a)}`));
            break;

        case 'b,c,O':
            b = v.b; c = v.c; a = (v.O - 2 * b * c) / (2 * (b + c));
            if (a <= 0) return { error: "Diese Kombination ergibt keinen gültigen Quader." };
            steps.push(step("Kanten b, c und Oberfläche", "b, c sowie die Oberfläche sind gegeben.", `b = ${formatNum(b)}, c = ${formatNum(c)}, O = ${formatNum(v.O)}`, null, true));
            steps.push(step("Kante a", "Die Oberfläche ist O = 2(ab + ac + bc), umgestellt nach a:", `a = ${frac('O − 2bc', '2(b + c)')} = ${frac(`${formatNum(v.O)} − 2 · ${formatNum(b)} · ${formatNum(c)}`, `2 · (${formatNum(b)} + ${formatNum(c)})`)} = ${formatNum(a)}`));
            break;

        case 'b,c,d':
            b = v.b; c = v.c;
            if (v.d * v.d <= b * b + c * c) return { error: "Diese Kombination ergibt keinen gültigen Quader – die Raumdiagonale ist zu kurz." };
            a = Math.sqrt(v.d * v.d - b * b - c * c);
            steps.push(step("Kanten b, c und Raumdiagonale", "b, c sowie die Raumdiagonale sind gegeben.", `b = ${formatNum(b)}, c = ${formatNum(c)}, d = ${formatNum(v.d)}`, null, true));
            steps.push(step("Kante a", "Nach dem räumlichen Satz des Pythagoras, umgestellt nach a:", `a = ${sqrt('d² − b² − c²')} = ${sqrt(`${formatNum(v.d)}² − ${formatNum(b)}² − ${formatNum(c)}²`)} = ${formatNum(a)}`));
            break;

        case 'b,c,G':
            b = v.b; c = v.c; a = v.G / b;
            steps.push(step("Kanten b, c und Grundfläche", "b, c sowie die Grundfläche sind gegeben.", `b = ${formatNum(b)}, c = ${formatNum(c)}, G = ${formatNum(v.G)}`, null, true));
            steps.push(step("Kante a", "Die Grundfläche ist G = a · b, umgestellt nach a:", `a = ${frac('G', 'b')} = ${frac(formatNum(v.G), formatNum(b))} = ${formatNum(a)}`));
            break;

        // ── Nur eine Kante direkt gegeben + zwei abgeleitete Größen ─────────
        case 'a,V,O': case 'b,V,O': case 'c,V,O':
        case 'a,V,d': case 'b,V,d': case 'c,V,d':
        case 'a,O,d': case 'b,O,d': case 'c,O,d': {
            const edgeId = ids[0]; // a, b oder c – steht durch die Sortierung immer zuerst
            const [otherX, otherY] = ['a', 'b', 'c'].filter(id => id !== edgeId);
            const known = v[edgeId];
            const pairKey = ids.slice(1).join(',');

            let s, p, extraSteps;

            if (pairKey === 'V,O') {
                p = v.V / known;
                s = (v.O / 2 - p) / known;
                extraSteps = [
                    step(`Produkt von ${otherX} und ${otherY}`, `Aus dem Volumen V = ${edgeId} · ${otherX} · ${otherY} folgt:`,
                        `${otherX} · ${otherY} = ${frac('V', edgeId)} = ${frac(formatNum(v.V), formatNum(known))} = ${formatNum(p)}`),
                    step(`Summe von ${otherX} und ${otherY}`, `Aus der Oberfläche O = 2 · (${edgeId}·${otherX} + ${edgeId}·${otherY} + ${otherX}·${otherY}) folgt:`,
                        `${otherX} + ${otherY} = ${frac(`O/2 − ${otherX}·${otherY}`, edgeId)} = ${frac(`${formatNum(v.O)}/2 − ${formatNum(p)}`, formatNum(known))} = ${formatNum(s)}`)
                ];
            } else if (pairKey === 'V,d') {
                p = v.V / known;
                const q = v.d * v.d - known * known;
                if (q < 2 * p) return { error: "Diese Kombination ergibt keinen gültigen Quader." };
                s = Math.sqrt(q + 2 * p);
                extraSteps = [
                    step(`Produkt von ${otherX} und ${otherY}`, `Aus dem Volumen folgt:`,
                        `${otherX} · ${otherY} = ${frac('V', edgeId)} = ${formatNum(p)}`),
                    step(`Summe von ${otherX} und ${otherY}`, `Aus d² = ${edgeId}² + ${otherX}² + ${otherY}² und (${otherX}+${otherY})² = ${otherX}² + ${otherY}² + 2·${otherX}${otherY} folgt:`,
                        `${otherX} + ${otherY} = ${sqrt(`(d² − ${edgeId}²) + 2 · ${otherX}·${otherY}`)} = ${formatNum(s)}`)
                ];
            } else { // 'O,d'
                const sumSq = v.O + v.d * v.d;
                if (sumSq < known * known) return { error: "Diese Kombination ergibt keinen gültigen Quader." };
                s = -known + Math.sqrt(sumSq);
                if (s <= 0) return { error: "Diese Kombination ergibt keinen gültigen Quader." };
                p = v.O / 2 - known * s;
                extraSteps = [
                    step(`Summe von ${otherX} und ${otherY}`, `Kombiniert man O = 2 · (${edgeId}·(${otherX}+${otherY}) + ${otherX}·${otherY}) mit d² = ${edgeId}² + ${otherX}² + ${otherY}², ergibt sich:`,
                        `${otherX} + ${otherY} = −${edgeId} + ${sqrt('O + d²')} = −${formatNum(known)} + ${sqrt(`${formatNum(v.O)} + ${formatNum(v.d)}²`)} = ${formatNum(s)}`),
                    step(`Produkt von ${otherX} und ${otherY}`, `Aus der Oberflächenformel folgt:`,
                        `${otherX} · ${otherY} = ${frac('O', '2')} − ${edgeId} · (${otherX}+${otherY}) = ${frac(formatNum(v.O), '2')} − ${formatNum(known)} · ${formatNum(s)} = ${formatNum(p)}`)
                ];
            }

            const roots = solveSumProduct(s, p);
            if (!roots) return { error: "Diese Kombination ergibt keinen gültigen Quader – die Werte passen nicht zusammen." };

            const resultMap = { [edgeId]: known, [otherX]: roots[0], [otherY]: roots[1] };
            a = resultMap.a; b = resultMap.b; c = resultMap.c;

            steps.push(step(`Kante ${edgeId} und zwei abgeleitete Größen`, "Diese Werte sind bereits gegeben.",
                ids.map(id => `${id} = ${formatNum(v[id])}`).join(',  '), null, true));
            steps.push(...extraSteps);
            steps.push(step(`Kanten ${otherX} und ${otherY}`, `Sie sind die Lösungen von t² − (Summe) · t + (Produkt) = 0:`,
                `t² − ${formatNum(s)} · t + ${formatNum(p)} = 0\n${otherX} = ${formatNum(roots[0])},  ${otherY} = ${formatNum(roots[1])}`));
            break;
        }

        case 'V,O,G': {
            const cKnown = v.V / v.G;
            const s = (v.O / 2 - v.G) / cKnown;
            const roots = solveSumProduct(s, v.G);
            if (!roots) return { error: "Diese Kombination ergibt keinen gültigen Quader – die Werte passen nicht zusammen." };
            a = roots[0]; b = roots[1]; c = cKnown;
            steps.push(step("Grundfläche, Volumen und Oberfläche", "Diese Werte sind bereits gegeben.", `G = ${formatNum(v.G)}, V = ${formatNum(v.V)}, O = ${formatNum(v.O)}`, null, true));
            steps.push(step("Kante c", "Das Volumen ist V = G · c, umgestellt nach c:", `c = ${frac('V', 'G')} = ${frac(formatNum(v.V), formatNum(v.G))} = ${formatNum(c)}`));
            steps.push(step("Summe der Kanten a und b", "Aus der Oberfläche O = 2 · (G + c·(a+b)) folgt:", `a + b = ${frac('O/2 − G', 'c')} = ${frac(`${formatNum(v.O)}/2 − ${formatNum(v.G)}`, formatNum(c))} = ${formatNum(s)}`));
            steps.push(step("Kanten a und b", "Sie sind die Lösungen von t² − (Summe) · t + G = 0 (die Grundfläche ist bereits ihr Produkt):", `t² − ${formatNum(s)} · t + ${formatNum(v.G)} = 0\na = ${formatNum(a)},  b = ${formatNum(b)}`));
            break;
        }

        case 'V,d,G': {
            const cKnown = v.V / v.G;
            const q = v.d * v.d - cKnown * cKnown;
            if (q < 2 * v.G) return { error: "Diese Kombination ergibt keinen gültigen Quader." };
            const s = Math.sqrt(q + 2 * v.G);
            const roots = solveSumProduct(s, v.G);
            if (!roots) return { error: "Diese Kombination ergibt keinen gültigen Quader – die Werte passen nicht zusammen." };
            a = roots[0]; b = roots[1]; c = cKnown;
            steps.push(step("Grundfläche, Volumen und Raumdiagonale", "Diese Werte sind bereits gegeben.", `G = ${formatNum(v.G)}, V = ${formatNum(v.V)}, d = ${formatNum(v.d)}`, null, true));
            steps.push(step("Kante c", "Das Volumen ist V = G · c, umgestellt nach c:", `c = ${frac('V', 'G')} = ${formatNum(c)}`));
            steps.push(step("Summe der Kanten a und b", "Aus d² = a² + b² + c² und (a+b)² = a² + b² + 2G folgt:", `a + b = ${sqrt('(d² − c²) + 2G')} = ${sqrt(`(${formatNum(v.d)}² − ${formatNum(c)}²) + 2 · ${formatNum(v.G)}`)} = ${formatNum(s)}`));
            steps.push(step("Kanten a und b", "Sie sind die Lösungen von t² − (Summe) · t + G = 0:", `t² − ${formatNum(s)} · t + ${formatNum(v.G)} = 0\na = ${formatNum(a)},  b = ${formatNum(b)}`));
            break;
        }

        default:
            return { error: "Diese Kombination wird aktuell nicht unterstützt." };
    }

    const G = a * b, V = a * b * c, O = 2 * (a * b + b * c + a * c), d = Math.sqrt(a * a + b * b + c * c);

    if (!ids.includes('G')) steps.push(step("Grundfläche", "Länge mal Breite:", `G = a · b = ${formatNum(a)} · ${formatNum(b)} = ${formatNum(G)}`));
    if (!ids.includes('V')) steps.push(step("Volumen", "Länge mal Breite mal Höhe:", `V = a · b · c = ${formatNum(a)} · ${formatNum(b)} · ${formatNum(c)} = ${formatNum(V)}`));
    if (!ids.includes('O')) steps.push(step("Oberfläche", "Zweimal die Summe aller drei Seitenflächen:", `O = 2 · (ab + bc + ac) = ${formatNum(O)}`));
    if (!ids.includes('d')) steps.push(step("Raumdiagonale", "Räumlicher Satz des Pythagoras:", `d = ${sqrt('a² + b² + c²')} = ${formatNum(d)}`));

    return { values: { a, b, c, V, O, d, G }, steps };
}
const shapeResolvers = {
    circle: resolveCircle,
    square: resolveSquare,
    rectangle: resolveRectangle,
    triangle: resolveTriangle,
    rightTriangle: resolveRightTriangle,
    trapezoid: resolveTrapezoid,
    parallelogram: resolveParallelogram,
    rhombus: resolveRhombus,
    cube: resolveCube,
    sphere: resolveSphere,
    cylinder: resolveCylinder,
    cone: resolveCone,
    quadrangularpyramid: resolveQuadPyramid,
    rectangularpyramid: resolveRectPyramid,
    cuboid: resolveCuboid
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
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && settingsModal.classList.contains('show')) {
            settingsModal.classList.remove('show');
        }
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