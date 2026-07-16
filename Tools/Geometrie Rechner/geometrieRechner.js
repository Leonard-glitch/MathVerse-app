
// ── CONFIGURATION: Hier definierst du alle Formen und ihre benötigten Inputs ──
const shapeConfig = {
    // --- 2D FIGUREN ---
    circle: {
        name: 'Kreis',
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
        ]
    },
    rightTriangle: {
        name: 'Rechtwinkliges Dreieck',
        type: 2,
        inputs: [
            { id: 'a', label: 'Kathete a' },
            { id: 'b', label: 'Kathete b' },
            { id: 'c', label: 'Hypotenuse c' },
            { id: 'alpha', label: 'Winkel α' },
            { id: 'beta', label: 'Winkel β' },
            { id: 'A', label: 'Fläche (A)' }
        ]
    },
    trapezoid: {
        name: 'Trapez',
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
        type: 3,
        inputs: [
            { id: 'a', label: 'Seite a' },
            { id: 'b', label: 'Seite b' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'A', label: 'Fläche (A)' }
        ]
    },

    // --- 3D KÖRPER ---
    cube: {
        name: 'Würfel',
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
        type: 2,
        inputs: [
            { id: 'r', label: 'Radius (r)' },
            { id: 'd', label: 'Durchmesser (d)' },
            { id: 'h', label: 'Höhe (h)' },
            { id: 'V', label: 'Volumen (V)' },
            { id: 'O', label: 'Oberfläche (O)' },
            { id: 'M', label: 'Mantelfläche (M)' },
            { id: 'G', label: 'Grundfläche (G)' }
        ]
    },
    cone: {
        name: 'Kegel',
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
        ]
    },
    quadrangularpyramid: {
        name: 'Quadratische Pyramide',
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

let currentType = "2d"; 

typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        typeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentType = btn.dataset.type;
        if(currentType==="2d"){
            formSelectContainer.innerHTML = `
                <option value="circle">Kreis</option>
                <option value="rectangle">Rechteck</option>
                <option value="square">Quadrat</option>
                <option value="triangle">Allgemeines Dreieck</option>
                <option value="right_triangle">Rechtwinkliges Dreieck</option>
                <option value="trapezoid">Trapez</option>
                <option value="parallelogram">Parallelogramm</option>
            `;
        setCurrentInputType("circle");
        }else if(currentType==="3d"){
           formSelectContainer.innerHTML = `
                <option value="cube">Würfel</option>
                <option value="cuboid">Quader</option>
                <option value="sphere">Kugel</option>
                <option value="cylinder">Zylinder</option>
                <option value="cone">Kegel</option>
                <option value="quadrangularpyramid">Quadratische Pyramide</option>
                <option value="rectangularpyramid">Rechteckige Pyramide</option>
            `;
        setCurrentInputType("square");
        }
    });
});



function showError(message) {
    errorMessages.textContent = message;
    errorMessages.style.display = "block";
}

function hideError() {
    errorMessages.style.display = "none";
}



document.addEventListener('DOMContentLoaded', () => {
    // Elemente aus dem DOM holen
    const advancedSettingsBtn = document.getElementById('advancedSettingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const decimalPlacesSelect = document.getElementById('decimalPlaces');

    // Globale Variable für deine Berechnungen (Standard: 2)
    let currentDecimalPlaces = 2; 

    // Modal öffnen
    advancedSettingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('show');
    });

    // Modal schließen (Klick auf das X)
    closeModalBtn.addEventListener('click', () => {
        settingsModal.classList.remove('show');
    });

    // Modal schließen (Klick irgendwo auf den abgedunkelten Hintergrund)
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.classList.remove('show');
        }
    });

    // Einstellungen speichern
    saveSettingsBtn.addEventListener('click', () => {
        // Wert auslesen und als Zahl speichern
        currentDecimalPlaces = parseInt(decimalPlacesSelect.value, 10);
        
        // Hier kannst du später eine Funktion aufrufen, 
        // die deine Ausgabe aktualisiert z.B. updateResults();
        
        // Modal wieder schließen
        settingsModal.classList.remove('show');
    });
});

function addThirdInput(){
    document.querySelector(".inputContainer").insertAdjacentHTML('beforeend', `
    <div class="inputRow" id="inputRow3">
        <div class="inputSelectDiv">
            <select name="selectInput" id="selectInputRow3" class="selection">
                <option value="r">Radius</option>
                <option value="r">langer Durchmesser d</option>
            </select>
        </div>
        <input type="number" id="zahlenInputRow3" placeholder="Zahl" class="zahlenInputfeld">
    </div>`);
}

function deleteThirdInput(){
    const row = document.getElementById("inputRow3");
    if (row) {
        row.remove();
    }
}

const numbInputTypeBtn = document.querySelectorAll(".numbInputTypeBtn");
let currentType2 = "2Inputs"; 

numbInputTypeBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        numbInputTypeBtn.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const currentType = btn.dataset.type;
        const thirdInput = document.getElementById("zahlenInputRow3");

        if (currentType === "2Inputs" && thirdInput) {
            deleteThirdInput();
        } else if (currentType === "3Inputs" && !thirdInput) {
            addThirdInput();
        }
    });
});


formSelectContainer.addEventListener("change", (event) => {
    const selectedShape = event.target.value;
    setCurrentInputType(selectedShape);
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
}

function populateDropdowns(shapeKey) {
    const shape = shapeConfig[shapeKey];
    if (!shape) return;

    // Wir holen uns alle Select-Elemente, die GERADE im Container aktiv sind
    const selects = inputsContainer.querySelectorAll(".inputContainer .selection");

    selects.forEach((select, index) => {
        // Zuerst löschen wir alte Optionen raus
        select.innerHTML = "";

        // Jetzt fügen wir für jeden Input aus der Config eine Option hinzu
        shape.inputs.forEach((input) => {
            const option = document.createElement("option");
            option.value = input.id;
            option.textContent = input.label;
            select.appendChild(option);
        });

        // Smarter Bonus: Wenn wir mehrere Inputs haben (z.B. Typ 2 oder 3),
        // wählen wir automatisch für das zweite Feld auch die zweite Option aus,
        // damit nicht überall standardmäßig das Gleiche ausgewählt ist.
        if (selects.length > 1 && index < shape.inputs.length) {
            select.selectedIndex = index;
        }
    });
}

setCurrentInputType("circle");