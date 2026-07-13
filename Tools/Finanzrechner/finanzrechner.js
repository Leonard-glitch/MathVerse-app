document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".finanzenTypeBtn");
    const tabContents = document.querySelectorAll(".tabContent");
    const errorContainer = document.getElementById("errorMessages");
    const ergebnisKartenOutput = document.getElementById("ergebnisKartenOutput");
    const rechenwegOutput = document.getElementById("rechenwegOutput");

    const chartGrid = document.getElementById("chartGrid");
    const chartAreaPath = document.getElementById("chartAreaPath");
    const chartSecondaryPath = document.getElementById("chartSecondaryPath");
    const chartPrimaryPath = document.getElementById("chartPrimaryPath");
    const chartEndPoint = document.getElementById("chartEndPoint");
    const chartTitleEl = document.getElementById("chartTitle");
    const chartSubtitleEl = document.getElementById("chartSubtitle");
    const chartLegendEl = document.getElementById("chartLegend");
    
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
        { num: "renEnd", slider: "renEndSlider" },
        { num: "renJahre", slider: "renJahreSlider" }
    ];

    syncPairs.forEach(pair => {
        const numEl = document.getElementById(pair.num);
        const sliderEl = document.getElementById(pair.slider);

        if (numEl && sliderEl) {
            pair.originalMax = sliderEl.max; // Ausgangswert merken, bevor er dynamisch erweitert wird

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

    // Reset-Button: alle Felder (inkl. dynamisch erweiterter Slider-Limits) zurücksetzen
    document.getElementById("resetCalculator")?.addEventListener("click", () => {
        syncPairs.forEach(pair => {
            const numEl = document.getElementById(pair.num);
            const sliderEl = document.getElementById(pair.slider);
            if (numEl) numEl.value = numEl.defaultValue;
            if (sliderEl) {
                sliderEl.max = pair.originalMax;
                sliderEl.value = sliderEl.defaultValue;
            }
        });
        berechneFinanzen();
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

    function zeigeFehler(msg) {
        errorContainer.textContent = msg;
        errorContainer.hidden = false;
    }

    function versteckeFehler() {
        errorContainer.hidden = true;
        errorContainer.textContent = "";
    }

    // Kompakte Formatierung für Achsenbeschriftungen (ohne Nachkommastellen)
    function formatEuroCompact(amount) {
        return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(amount) + " €";
    }

    function buildLinePath(coords) {
        return coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(" ");
    }

    function buildAreaPath(coords, baselineY) {
        if (coords.length === 0) return "";
        const first = coords[0];
        const last = coords[coords.length - 1];
        return `${buildLinePath(coords)} L${last.x.toFixed(2)},${baselineY.toFixed(2)} L${first.x.toFixed(2)},${baselineY.toFixed(2)} Z`;
    }

    // Rendert die Kurve für den aktuell aktiven Tab (Grid, Flächen-/Linienpfade, Legende)
    function renderChart({ primary, secondary, xLabels, primaryLabel, secondaryLabel, title, subtitle }) {
        chartTitleEl.textContent = title;
        chartSubtitleEl.textContent = subtitle;

        const width = 720, height = 260;
        const left = 54, right = 12, top = 18, bottom = 30;
        const chartW = width - left - right;
        const chartH = height - top - bottom;

        const allValues = secondary ? [...primary, ...secondary] : primary;
        let minVal = Math.min(0, ...allValues);
        let maxVal = Math.max(...allValues);
        if (minVal === maxVal) maxVal = minVal + 1;
        const pad = (maxVal - minVal) * 0.08;
        minVal -= pad;
        maxVal += pad;
        if (Math.min(...allValues) >= 0) minVal = Math.max(0, minVal);

        const n = primary.length;
        const xStep = n > 1 ? chartW / (n - 1) : 0;
        const xOf = i => left + i * xStep;
        const yOf = v => top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
        const baselineY = top + chartH;

        const primaryCoords = primary.map((v, i) => ({ x: xOf(i), y: yOf(v) }));
        const secondaryCoords = secondary ? secondary.map((v, i) => ({ x: xOf(i), y: yOf(v) })) : null;

        // Gitternetzlinien + Y-Achsen-Beschriftung (5 Stufen)
        const gridCount = 4;
        let gridHtml = "";
        for (let g = 0; g <= gridCount; g++) {
            const val = minVal + (maxVal - minVal) * (g / gridCount);
            const y = yOf(val);
            gridHtml += `<line class="chartGridLine" x1="${left}" y1="${y.toFixed(2)}" x2="${width - right}" y2="${y.toFixed(2)}" />`;
            gridHtml += `<text class="chartAxisLabel" x="${left - 8}" y="${(y + 3).toFixed(2)}" text-anchor="end">${formatEuroCompact(val)}</text>`;
        }

        // X-Achsen-Beschriftung (max. 6 Labels, immer inkl. letztem Punkt)
        const labelStep = Math.max(1, Math.ceil(n / 6));
        xLabels.forEach((lbl, i) => {
            if (i % labelStep === 0 || i === n - 1) {
                gridHtml += `<text class="chartAxisLabel" x="${xOf(i).toFixed(2)}" y="${(height - bottom + 18).toFixed(2)}" text-anchor="middle">${lbl}</text>`;
            }
        });
        chartGrid.innerHTML = gridHtml;

        chartAreaPath.setAttribute("d", buildAreaPath(primaryCoords, baselineY));
        chartPrimaryPath.setAttribute("d", buildLinePath(primaryCoords));

        if (secondaryCoords) {
            chartSecondaryPath.setAttribute("d", buildLinePath(secondaryCoords));
            chartSecondaryPath.style.display = "";
        } else {
            chartSecondaryPath.style.display = "none";
        }

        const lastPoint = primaryCoords[primaryCoords.length - 1];
        chartEndPoint.setAttribute("cx", lastPoint.x.toFixed(2));
        chartEndPoint.setAttribute("cy", lastPoint.y.toFixed(2));
        chartEndPoint.style.display = "";

        let legendHtml = `<span class="legendItem"><span class="legendDot" style="background: var(--finance-accent);"></span>${primaryLabel}</span>`;
        if (secondaryLabel) {
            legendHtml += `<span class="legendItem"><span class="legendDot" style="background: var(--finance-blue);"></span>${secondaryLabel}</span>`;
        }
        chartLegendEl.innerHTML = legendHtml;
    }

    function berechneFinanzen() {
        versteckeFehler();
        ergebnisKartenOutput.innerHTML = "";
        rechenwegOutput.innerHTML = "";

        if (currentTab === "sparplan") {
            const K0 = parseFloat(document.getElementById("sparStart").value) || 0;
            const R = parseFloat(document.getElementById("sparRate").value) || 0;
            const p = parseFloat(document.getElementById("sparZins").value) || 0;
            const jahre = parseFloat(document.getElementById("sparJahre").value) || 0;

            if (K0 < 0 || R < 0 || p < 0 || jahre < 0) {
                zeigeFehler("Bitte gib nur positive Werte ein.");
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

            // Chart-Daten: Kapitalentwicklung pro Jahr
            const chartJahre = [], chartKapital = [], chartEingezahlt = [];
            for (let j = 0; j <= jahre; j++) {
                const nJ = j * 12;
                const kapitalJ = p > 0
                    ? K0 * Math.pow(q, nJ) + R * ((Math.pow(q, nJ) - 1) / (q - 1))
                    : K0 + R * nJ;
                chartJahre.push(j);
                chartKapital.push(kapitalJ);
                chartEingezahlt.push(K0 + R * nJ);
            }

            renderChart({
                primary: chartKapital,
                secondary: chartEingezahlt,
                xLabels: chartJahre.map(j => `${j}J`),
                primaryLabel: "Gesamtkapital",
                secondaryLabel: "Einzahlungen",
                title: "Kapitalentwicklung",
                subtitle: `Verlauf über ${jahre} Jahre`
            });

        } else if (currentTab === "inflation") {
            const betrag = parseFloat(document.getElementById("infBetrag").value) || 0;
            const rate = parseFloat(document.getElementById("infRate").value) || 0;
            const jahre = parseFloat(document.getElementById("infJahre").value) || 0;

            if (betrag < 0 || rate < 0 || jahre < 0) {
                zeigeFehler("Bitte gib nur positive Werte ein.");
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

            // Chart-Daten: Kaufkraftentwicklung pro Jahr
            const chartJahre = [], chartKaufkraft = [], chartNominal = [];
            for (let j = 0; j <= jahre; j++) {
                chartJahre.push(j);
                chartKaufkraft.push(betrag / Math.pow(q, j));
                chartNominal.push(betrag);
            }

            renderChart({
                primary: chartKaufkraft,
                secondary: chartNominal,
                xLabels: chartJahre.map(j => `${j}J`),
                primaryLabel: "Reale Kaufkraft",
                secondaryLabel: "Nomineller Betrag",
                title: "Kaufkraftentwicklung",
                subtitle: `Verlauf über ${jahre} Jahre`
            });

        } else if (currentTab === "rendite") {
            const invest = parseFloat(document.getElementById("renInv").value) || 0;
            const endwert = parseFloat(document.getElementById("renEnd").value) || 0;
            const jahre = parseFloat(document.getElementById("renJahre").value) || 0;

            if (invest <= 0 || endwert < 0) {
                zeigeFehler("Das investierte Kapital muss größer als 0 sein.");
                return;
            }
            if (jahre <= 0) {
                zeigeFehler("Die Anlagedauer muss größer als 0 sein.");
                return;
            }

            const gewinn = endwert - invest;
            const roi = (gewinn / invest) * 100;
            const cagr = (Math.pow(endwert / invest, 1 / jahre) - 1) * 100;

            ergebnisKartenOutput.innerHTML = `
                <div class="ergebnisKarte highlight">
                    <div class="ergebnisKarteTitle">Gesamtrendite (ROI)</div>
                    <div class="ergebnisKarteValue" style="color: ${roi >= 0 ? 'var(--accent-live, #00ffcc)' : '#ff4d4d'};">${roi > 0 ? '+' : ''}${roi.toFixed(2)} %</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Jährliche Rendite (CAGR)</div>
                    <div class="ergebnisKarteValue" style="color: ${cagr >= 0 ? 'var(--accent-live, #00ffcc)' : '#ff4d4d'};">${cagr > 0 ? '+' : ''}${cagr.toFixed(2)} % p.a.</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Absoluter Gewinn / Verlust</div>
                    <div class="ergebnisKarteValue">${gewinn > 0 ? '+' : ''}${formatEuro(gewinn)}</div>
                </div>
            `;

            rechenwegOutput.innerHTML = `<pre><b>Gesamtrendite (ROI):</b>
                ROI = ((Endwert - Investition) / Investition) * 100
                ROI = ((${endwert} - ${invest}) / ${invest}) * 100 = <b>${roi.toFixed(2)} %</b>

                <b>Jährliche Rendite (CAGR) über ${jahre} Jahre:</b>
                CAGR = ((Endwert / Investition)^(1 / Jahre) - 1) * 100
                CAGR = ((${endwert} / ${invest})^(1/${jahre}) - 1) * 100 = <b>${cagr.toFixed(2)} % p.a.</b></pre>`;

            // Chart-Daten: angenommene gleichmäßige Wertsteigerung (CAGR) über die Anlagedauer
            const chartJahre = [], chartWert = [], chartStart = [];
            for (let j = 0; j <= jahre; j++) {
                chartJahre.push(j);
                chartWert.push(invest * Math.pow(1 + cagr / 100, j));
                chartStart.push(invest);
            }

            renderChart({
                primary: chartWert,
                secondary: chartStart,
                xLabels: chartJahre.map(j => `${j}J`),
                primaryLabel: "Angenommene Wertentwicklung",
                secondaryLabel: "Startkapital",
                title: "Wertentwicklung",
                subtitle: `Gleichmäßige Verzinsung (CAGR) über ${jahre} Jahre`
            });
        }
    }

    // Init-Run
    berechneFinanzen();
});