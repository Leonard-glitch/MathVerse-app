
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
    const areaOn = given.has('A') ? "area-active" : "";
    const perimeterOn = given.has('u') ? "perimeter-active" : "";
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
    <text class="sketchLabel ${on('u')}" x="120" y="214">U</text>
</svg>`;
}

function sketchSquare(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    const perimeterOn = given.has('u') ? "perimeter-active" : "";
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
    <text class="sketchLabel ${on('u')}" x="45" y="45">U</text>
</svg>`;
}

function sketchRectangle(given) {
    const on = id => given.has(id) ? "is-active" : "";
    const areaOn = given.has('A') ? "area-active" : "";
    const perimeterOn = given.has('u') ? "perimeter-active" : "";
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
    <text class="sketchLabel ${on('u')}" x="40" y="55">U</text>
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
    const perimeterOn = given.has('u') ? "perimeter-active" : "";
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
    <text class="sketchLabel ${on('u')}" x="65" y="180">U</text>
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