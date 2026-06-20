const inputContainer=document.getElementById("cardDezimalContainer");
const outputContainer=document.getElementById("cardBruchContainer");
const swapBtn=document.getElementById("swapBtn");

const cardDez=`
<div class="card">
    <h2>Dezimal</h2>
    <input type="number" id="inputFeld3" placeholder="20" class="zahlenInputfeld">
</div>`

const cardBruch=`
<div class="card">
    <h2>Bruch</h2>
        <div class="bruchEingabe">
            <input type="number" id="zaehler1" placeholder="Zähler" class="zahlenInputfeld">
                <div class="bruchStrich"></div>
            <input type="number" id="nenner1"  placeholder="Nenner" class="zahlenInputfeld">
        </div>
</div>`

let input=cardDez;
function swapCards(){
    if(input==cardDez){
        inputContainer.innerHTML=cardBruch;
        outputContainer.innerHTML=cardDez;
        input=cardBruch;
    }else if(input==cardBruch){
        inputContainer.innerHTML=cardDez;
        outputContainer.innerHTML=cardBruch;
        input=cardDez;
    }
}

swapBtn.addEventListener("click", () => {

    swapBtn.classList.add("rotate");

    setTimeout(() => {
        swapBtn.classList.remove("rotate");
    }, 350);

    swapCards();
});