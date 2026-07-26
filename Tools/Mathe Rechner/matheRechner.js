// Selektiere die relevanten Elemente
const advancedCheckbox = document.querySelector('.advancedMode input[type="checkbox"]');
const targetContainer = document.getElementById('quickAccessContainer');

// 1. Template für den Advanced Mode
const quickAccessContainerAdvanced = `
    <div class="customInputContainerRow">
        <button class="padButton" id="btn-adv-sq">x²</button>
        <button class="padButton" id="btn-adv-pow">xʸ</button>
        <button class="padButton" id="btn-adv-sqrt">√</button>
        <button class="padButton" id="btn-adv-cbrt">³√</button>
    </div>
    
    <div class="customInputContainerRow">
        <button class="padButton" id="btn-adv-sin">sin</button>
        <button class="padButton" id="btn-adv-cos">cos</button>
        <button class="padButton" id="btn-adv-tan">tan</button>
        <button class="padButton" id="btn-adv-pi">π</button>
    </div>
    
    <div class="customInputContainerRow">
        <button class="padButton" id="btn-adv-asin">asin</button>
        <button class="padButton" id="btn-adv-acos">acos</button>
        <button class="padButton" id="btn-adv-atan">atan</button>
        <button class="padButton" id="btn-adv-e">e</button>
    </div>
    
    <div class="customInputContainerRow">
        <button class="padButton" id="btn-adv-ln">ln</button>
        <button class="padButton" id="btn-adv-log">log</button>
        <button class="padButton" id="btn-adv-exp">eˣ</button>
        <button class="padButton" id="btn-adv-tenpow">10ˣ</button>
    </div>
    
    <div class="customInputContainerRow">
        <button class="padButton" id="btn-adv-inv">1/x</button>
        <button class="padButton" id="btn-adv-percent">%</button>
        <button class="padButton" id="btn-adv-fact">!</button>
        <button class="padButton" id="btn-adv-mod">mod</button>
    </div>
    
    <div class="customInputContainerRow">
        <button class="padButton" id="btn-adv-abs">abs</button>
        <button class="padButton" id="btn-adv-floor">floor</button>
        <button class="padButton" id="btn-adv-ceil">ceil</button>
        <button class="padButton" id="btn-adv-ans">Ans</button>
    </div>`;

// 2. Template für den Standard-Modus (deaktiviert)
const quickAccessContainerStandard = `
<div class="customInputContainerRow">
    <button class="padButton" id="btn-std-sq">x²</button>
    <button class="padButton" id="btn-std-sqrt">√</button>
    <button class="padButton" id="btn-std-sin">sin</button>
    <button class="padButton" id="btn-std-cos">cos</button>
</div>
<div class="customInputContainerRow">
    <button class="padButton" id="btn-std-tan">tan</button>
    <button class="padButton" id="btn-std-pi">π</button>
    <button class="padButton" id="btn-std-percent">%</button>
    <div style="flex: 1;"></div>
</div>`;

// Funktion zum Umschalten
function updateAdvancedMode() {
    // Container vor jedem Befüllen einmal leeren
    targetContainer.innerHTML = '';

    if (advancedCheckbox.checked) {
        // Wenn aktiv: Advanced-Inhalt rein
        targetContainer.innerHTML = quickAccessContainerAdvanced;
    } else {
        // Wenn deaktiviert: Standard-Inhalt rein
        targetContainer.innerHTML = quickAccessContainerStandard;
    }
}

// Event-Listener verknüpfen
advancedCheckbox.addEventListener('change', updateAdvancedMode);

// Einmal initial beim Laden ausführen
updateAdvancedMode();