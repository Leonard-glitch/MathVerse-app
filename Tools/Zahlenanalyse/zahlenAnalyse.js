const zahlenInput=document.getElementById("zahlenInput");
const buttonInput=document.getElementById("buttonZahlenInput");

const errorMessages=document.getElementById("errorMessages");

const ausgabeSumme=document.getElementById("ausgabeSumme");
const ausgabeMax=document.getElementById("ausgabeMax");
const ausgabeMin=document.getElementById("ausgabeMin");
const ausgabeDurchschnitt=document.getElementById("ausgabeDurchschnitt");

const errorBox=document.querySelector(".falscheEingabestyle");

function zahlenAnalyse(arr){


    if(arr.length === 0 || arr.some(num => isNaN(num))){
    alert("Bitte gültige Zahlen eingeben!");
    return;
    }

    let sum=0;
    let max= arr[0];
    let min= arr[0];
    let average=0;

    for(let i=0; i<arr.length; i++){

        sum += arr[i];

        if(arr[i]>max){
            max= arr[i];
        }

        if(arr[i]< min){
            min= arr[i];
        }
    }

    average= sum/arr.length;

        return{
            sum: sum,
            max: max,
            min: min,
            average: average
        };

}



function validateInput(inputString) {
    if (inputString.trim() === "") {
        return "Bitte eine Zahl eingeben!";
    }

    const teile = inputString.split(",");

    if (teile.some(t => t.trim() === "")) {
        return "Keine leeren Werte oder doppelte Kommas erlaubt!";
    }

    const zahlenArray = teile.map(t => Number(t.trim()));

    if (zahlenArray.some(num => isNaN(num))) {
        return "Bitte gültige Zahlen eingeben!";
    }

    return zahlenArray;
}




buttonInput.addEventListener("click", function() {

    const validationResult = validateInput(zahlenInput.value);

    if (typeof validationResult === "string") {
        errorBox.style.display = "block";
        errorMessages.textContent = validationResult;
        return;
    }

    errorBox.style.display = "none";

    const result = zahlenAnalyse(validationResult);

    ausgabeSumme.textContent = result.sum;
    ausgabeMax.textContent = result.max;
    ausgabeMin.textContent = result.min;
    ausgabeDurchschnitt.textContent = result.average;
});

zahlenInput.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        buttonInput.click();
    }

});

zahlenInput.addEventListener("focus", function() {
    zahlenInput.select();
});

zahlenInput.addEventListener("input", function(){

    errorBox.style.display = "none";

});