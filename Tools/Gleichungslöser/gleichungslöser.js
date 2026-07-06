const errorMessages=document.getElementById("errorMessages");
const ausgabeContainer=document.getElementById("ausgabeContainer");
const rechenwegOutput=document.getElementById("rechenwegOutput");
const typeButtons=document.querySelectorAll(".gleichungTypeBtn");

let currentType = "allgemein"; 

typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        typeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentType = btn.dataset.type;
        if(currentType==="allgemein"){
            document.getElementById("allgemeineGleichungsContainer").style.display="flex";
            document.getElementById("lineareGleichungsContainer").style.display="none";
        }else if(currentType==="linear"){
            document.getElementById("allgemeineGleichungsContainer").style.display="none";
            document.getElementById("lineareGleichungsContainer").style.display="flex";
        }
    });
});



const btnAddInput    = document.getElementById("btnAddInput");
const btnDeleteInput = document.getElementById("btnDeleteInput");
const container=document.querySelector(".inputsContainer");

const maxZusatzInputs = 10;
let anzahlZusatzInputs = 0;


btnAddInput.addEventListener("click", () => {
    if (anzahlZusatzInputs >= maxZusatzInputs) {
        showError(`Maximale Anzahl von ${maxZusatzInputs + 2} Eingabefeldern erreicht!`);
        setTimeout(() => { hideError(); }, 3000);
        return;
    }
    anzahlZusatzInputs++;

    const wrapperInput = document.createElement("div");
    wrapperInput.className = "inputRow zusatzElement"; 
    wrapperInput.innerHTML = `
        <span class="rowNumber">${anzahlZusatzInputs + 2}&#41;</span><math-field id="mathInput" class="zahlenInputfeld" placeholder="z.B.: $$a+7b=6 $$"></math-field>
    `;

    container.appendChild(wrapperInput);

    hideError();
});

btnDeleteInput.addEventListener("click", () => {
    const zusatzElemente = container.querySelectorAll(".zusatzElement");

    if (zusatzElemente.length >= 1) {
        container.removeChild(zusatzElemente[zusatzElemente.length - 1]);

        anzahlZusatzInputs--;
    } else {
        showError("Die Standard-Eingabefelder können nicht gelöscht werden!");
        setTimeout(() => { hideError(); }, 3000);
    }
});

function showError(message) {
    errorMessages.textContent = message;
    errorMessages.style.display = "block";
}

function hideError() {
    errorMessages.style.display = "none";
}



const procedureSelect = document.getElementById("selectProcedure");
const expandBtn=document.querySelector(".expandBtn");

expandBtn.addEventListener("click", () => {
    if (procedureSelect.style.display === "none" || procedureSelect.style.display === "") {
        procedureSelect.style.display = "block";
        expandBtn.innerHTML=`<i class="fa fa-chevron-up"></i>`;
    } else {
        procedureSelect.style.display = "none";
        expandBtn.innerHTML=`<i class="fa fa-chevron-down"></i>`;
    }
});