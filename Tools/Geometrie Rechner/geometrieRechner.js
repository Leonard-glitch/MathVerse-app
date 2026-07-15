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
        }else if(currentType==="3d"){
           formSelectContainer.innerHTML = `
                <option value="cube">Würfel</option>
                <option value="cuboid">Quader</option>
                <option value="sphere">Kugel</option>
                <option value="cylinder">Zylinder</option>
                <option value="cone">Kegel</option>
                <option value="pyramid">Pyramide</option>
            `;
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