document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".finanzenTypeBtn");
    const tabContents = document.querySelectorAll(".tabContent");
    const errorContainer = document.getElementById("errorMessages");
    const ergebnisKartenOutput = document.getElementById("ergebnisKartenOutput");
    const rechenwegOutput = document.getElementById("rechenwegOutput");
    
    let currentTab = "sparplan";

    // Koppelung von Slider und Nummernfeld
    const syncPairs = [
        { num: "sparStart", slider: "sparStartSlider" },
        { num: "sparRate", slider: "sparRateSlider" },
        { num: "sparZins", slider: "sparZinsSlider" },
        { num: "sparJahre", slider: "sparJahreSlider" },
        { num: "infBetrag", slider: "infBetragSlider" },
        { num: "infRate", slider: "infRateSlider" },
        { num: "infJahre", slider: "infJahreSlider" },
        { num: "renInv", slider: "renInvSlider" },
        { num: "renEnd", slider: "renEndSlider" }
    ];

    syncPairs.forEach(pair => {
        const numEl = document.getElementById(pair.num);
        const sliderEl = document.getElementById(pair.slider);

        if (numEl && sliderEl) {
            // Event: Slider wird bewegt
            sliderEl.addEventListener("input", () => {
                numEl.value = sliderEl.value;
                berechneFinanzen();
            });

            // Event: Zahl wird direkt eingetippt
            numEl.addEventListener("input", () => {
                let val = parseFloat(numEl.value) || 0;
                
                // PRO FEATURE: Dynamisches Limit. Wenn User mehr eintippt als der Slider erlaubt,
                // erweitern wir das Limit des Sliders automatisch!
                let currentMax = parseFloat(sliderEl.max);
                if (val > currentMax) {
                    sliderEl.max = Math.ceil(val * 1.5); // Erhöht das Limit um 50% über den Wert
                }
                
                sliderEl.value = val;
                berechneFinanzen();
            });
        }
    });

    // Tab-Wechsel-Eventhandler
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            currentTab = tab.getAttribute("data-tab");
            document.getElementById(`tab-${currentTab}`).classList.add("active");
            
            berechneFinanzen();
        });
    });

    // Währungsformatierer (z.B. 10.000,00 €)
    function formatEuro(amount) {
        return new Intl.NumberFormat("de-DE", { 
            style: "currency", 
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    function berechneFinanzen() {
        errorContainer.innerText = "";
        ergebnisKartenOutput.innerHTML = "";
        rechenwegOutput.innerHTML = "";

        if (currentTab === "sparplan") {
            const K0 = parseFloat(document.getElementById("sparStart").value) || 0;
            const R = parseFloat(document.getElementById("sparRate").value) || 0;
            const p = parseFloat(document.getElementById("sparZins").value) || 0;
            const jahre = parseFloat(document.getElementById("sparJahre").value) || 0;

            if (K0 < 0 || R < 0 || p < 0 || jahre < 0) {
                errorContainer.innerText = "Bitte gib nur positive Werte ein.";
                return;
            }

            // Exakte Banken-Logik: Monatliche Verzinsung (q = 1 + p / 1200)
            const n = jahre * 12; // Gesamte Monate
            const q = 1 + (p / 100) / 12; // Monatlicher Zinsfaktor
            
            let endkapitalStart = 0;
            let endkapitalRaten = 0;
            
            if (p > 0) {
                // Aufzinsung des Startkapitals
                endkapitalStart = K0 * Math.pow(q, n);
                // Rentenendwert (nachschüssige monatliche Einzahlung)
                endkapitalRaten = R * ((Math.pow(q, n) - 1) / (q - 1));
            } else {
                endkapitalStart = K0;
                endkapitalRaten = R * n;
            }

            const gesamtEndkapital = endkapitalStart + endkapitalRaten;
            const eingezahltesKapital = K0 + (R * n);
            const zinsGewinn = gesamtEndkapital - eingezahltesKapital;

            ergebnisKartenOutput.innerHTML = `
                <div class="ergebnisKarte highlight">
                    <div class="ergebnisKarteTitle">Voraussichtliches Endkapital</div>
                    <div class="ergebnisKarteValue">${formatEuro(gesamtEndkapital)}</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Deine Einzahlungen</div>
                    <div class="ergebnisKarteValue">${formatEuro(eingezahltesKapital)}</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Erwirtschaftete Zinsen</div>
                    <div class="ergebnisKarteValue" style="color: var(--accent-live, #00ffcc);">+ ${formatEuro(zinsGewinn)}</div>
                </div>
            `;

            rechenwegOutput.innerHTML = `<pre><b>Verwendetes Modell:</b> Monatliche Verzinsung & Einzahlung
Monate (n) = ${n}
Zinsfaktor (q) = 1 + (${p}% / 12) = ${q.toFixed(6)}

<b>1. Zinseszins auf Startkapital:</b>
E_start = K0 * q^n 
E_start = ${K0} * ${q.toFixed(4)}^${n} = <b>${formatEuro(endkapitalStart)}</b>

<b>2. Zinseszins auf Sparraten:</b>
E_rate = R * ((q^n - 1) / (q - 1))
E_rate = ${R} * ((... - 1) / ...) = <b>${formatEuro(endkapitalRaten)}</b>

<b>3. Gesamtkapital:</b>
${formatEuro(endkapitalStart)} + ${formatEuro(endkapitalRaten)} = <b>${formatEuro(gesamtEndkapital)}</b></pre>`;

        } else if (currentTab === "inflation") {
            const betrag = parseFloat(document.getElementById("infBetrag").value) || 0;
            const rate = parseFloat(document.getElementById("infRate").value) || 0;
            const jahre = parseFloat(document.getElementById("infJahre").value) || 0;

            if (betrag < 0 || rate < 0 || jahre < 0) {
                errorContainer.innerText = "Bitte gib nur positive Werte ein.";
                return;
            }

            const q = 1 + (rate / 100);
            const kaufkraft = betrag / Math.pow(q, jahre);
            const verlust = betrag - kaufkraft;

            ergebnisKartenOutput.innerHTML = `
                <div class="ergebnisKarte highlight">
                    <div class="ergebnisKarteTitle">Reale Kaufkraft in ${jahre} Jahren</div>
                    <div class="ergebnisKarteValue">${formatEuro(kaufkraft)}</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Kaufkraftverlust</div>
                    <div class="ergebnisKarteValue" style="color: #ff4d4d;">- ${formatEuro(verlust)}</div>
                </div>
            `;

            rechenwegOutput.innerHTML = `<pre><b>Abzinsungsformel:</b>
Kaufkraft = Betrag / (1 + Inflationsrate)^Jahre
Kaufkraft = ${betrag} / (1 + ${rate/100})^${jahre}

Ergebnis = <b>${formatEuro(kaufkraft)}</b></pre>`;

        } else if (currentTab === "rendite") {
            const invest = parseFloat(document.getElementById("renInv").value) || 0;
            const endwert = parseFloat(document.getElementById("renEnd").value) || 0;

            if (invest <= 0 || endwert < 0) {
                errorContainer.innerText = "Das investierte Kapital muss größer als 0 sein.";
                return;
            }

            const gewinn = endwert - invest;
            const roi = (gewinn / invest) * 100;

            ergebnisKartenOutput.innerHTML = `
                <div class="ergebnisKarte highlight">
                    <div class="ergebnisKarteTitle">Return on Investment (ROI)</div>
                    <div class="ergebnisKarteValue" style="color: ${roi >= 0 ? 'var(--accent-live, #00ffcc)' : '#ff4d4d'};">${roi > 0 ? '+' : ''}${roi.toFixed(2)} %</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Absoluter Gewinn / Verlust</div>
                    <div class="ergebnisKarteValue">${gewinn > 0 ? '+' : ''}${formatEuro(gewinn)}</div>
                </div>
            `;

            rechenwegOutput.innerHTML = `<pre><b>ROI Berechnung:</b>
ROI = ((Endwert - Investition) / Investition) * 100
ROI = ((${endwert} - ${invest}) / ${invest}) * 100 
ROI = (${gewinn} / ${invest}) * 100 = <b>${roi.toFixed(2)} %</b></pre>`;
        }
    }

    // Init-Run
    berechneFinanzen();
});