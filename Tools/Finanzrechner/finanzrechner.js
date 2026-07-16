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

    // Setzt die CSS-Variable --slider-progress passend zum aktuellen Wert,
    // damit der gefüllte Teil des Reglers (Akzentfarbe) korrekt angezeigt wird.
    function updateSliderProgress(sliderEl) {
        const min = parseFloat(sliderEl.min) || 0;
        const max = parseFloat(sliderEl.max) || 100;
        const val = parseFloat(sliderEl.value) || 0;
        const pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
        sliderEl.style.setProperty("--slider-progress", `${Math.min(100, Math.max(0, pct))}%`);
    }

    // Koppelung von Slider und Nummernfeld
    const syncPairs = [
        { num: "sparStart", slider: "sparStartSlider", tab: "sparplan" },
        { num: "sparRate", slider: "sparRateSlider", tab: "sparplan" },
        { num: "sparZins", slider: "sparZinsSlider", tab: "sparplan" },
        { num: "sparJahre", slider: "sparJahreSlider", tab: "sparplan" },
        { num: "infBetrag", slider: "infBetragSlider", tab: "inflation" },
        { num: "infRate", slider: "infRateSlider", tab: "inflation" },
        { num: "infJahre", slider: "infJahreSlider", tab: "inflation" },
        { num: "renInv", slider: "renInvSlider", tab: "rendite" },
        { num: "renEnd", slider: "renEndSlider", tab: "rendite" },
        { num: "renJahre", slider: "renJahreSlider", tab: "rendite" }
    ];

    syncPairs.forEach(pair => {
        const numEl = document.getElementById(pair.num);
        const sliderEl = document.getElementById(pair.slider);

        if (numEl && sliderEl) {
            pair.originalMax = sliderEl.max; // Ausgangswert merken, bevor er dynamisch erweitert wird
            updateSliderProgress(sliderEl); // Initialzustand beim Laden setzen

            // Event: Slider wird bewegt
            sliderEl.addEventListener("input", () => {
                numEl.value = sliderEl.value;
                updateSliderProgress(sliderEl);
                berechneFinanzen();
            });

            // Event: Zahl wird direkt eingetippt
            numEl.addEventListener("input", () => {
                const raw = numEl.value.trim();

                // Leerer/ungültiger Zwischenzustand (z. B. direkt nach "Alles markieren" beim
                // Neu-Eintippen): Slider bewusst NICHT anfassen, sonst springt der Thumb kurz
                // auf 0. Die Berechnung selbst verträgt leere Felder (interner ||0-Fallback).
                if (raw === "" || isNaN(parseFloat(raw))) {
                    berechneFinanzen();
                    return;
                }

                let val = parseFloat(raw);

                // PRO FEATURE: Dynamisches Limit. Wenn User mehr eintippt als der Slider erlaubt,
                // erweitern wir das Limit des Sliders automatisch!
                let currentMax = parseFloat(sliderEl.max);
                if (val > currentMax) {
                    sliderEl.max = Math.ceil(val * 1.5); // Erhöht das Limit um 50% über den Wert
                }
                
                sliderEl.value = val;
                updateSliderProgress(sliderEl);
                berechneFinanzen();
            });

            // Beim Verlassen des Feldes auf die im HTML definierten Grenzen klemmen
            // (verhindert unsinnige Werte wie 99999 Jahre) – bewusst nicht live beim
            // Tippen, damit z. B. Dezimaleingaben nicht unterbrochen werden.
            numEl.addEventListener("blur", () => {
                let val = parseFloat(numEl.value);
                if (isNaN(val)) val = parseFloat(numEl.min) || 0;

                const hardMin = numEl.min !== "" ? parseFloat(numEl.min) : -Infinity;
                const hardMax = numEl.max !== "" ? parseFloat(numEl.max) : Infinity;
                const clamped = Math.min(Math.max(val, hardMin), hardMax);

                // Slider-Limit defensiv mitziehen, falls es (noch) kleiner als der
                // geklemmte Wert ist – Absicherung für Fälle, in denen die dynamische
                // Erweiterung aus dem input-Handler übersprungen wurde.
                if (clamped > parseFloat(sliderEl.max)) {
                    sliderEl.max = clamped;
                }

                // Slider immer nachziehen: beim Tippen eines leeren Zwischenzustands
                // wurde er oben bewusst nicht synchronisiert.
                sliderEl.value = clamped;
                updateSliderProgress(sliderEl);

                if (clamped !== val || numEl.value === "") {
                    numEl.value = clamped;
                    berechneFinanzen();
                }
            });
        }
    });

    // Reset-Button: nur Felder des aktuell aktiven Tabs zurücksetzen
    document.getElementById("resetCalculator")?.addEventListener("click", () => {
        syncPairs.filter(pair => pair.tab === currentTab).forEach(pair => {
            const numEl = document.getElementById(pair.num);
            const sliderEl = document.getElementById(pair.slider);
            if (numEl) numEl.value = numEl.defaultValue;
            if (sliderEl) {
                sliderEl.max = pair.originalMax;
                sliderEl.value = sliderEl.defaultValue;
                updateSliderProgress(sliderEl);
            }
        });
        berechneFinanzen();
    });

    // ── Währungsauswahl ──────────────────────────────────────────────────
    // Global gespeichert über window.MV (wie Theme/Design), damit künftige
    // Finanz-Tools dieselbe Einstellung automatisch übernehmen.
    const currencySelect = document.getElementById("currencySelect");

    if (currencySelect) {
        currencySelect.innerHTML = Object.entries(window.MV.CURRENCIES)
            .map(([code, name]) => `<option value="${code}">${code} – ${name}</option>`)
            .join("");
        currencySelect.value = window.MV.getCurrency();

        currencySelect.addEventListener("change", () => {
            window.MV.setCurrency(currencySelect.value);
            updateCurrencyLabels();
            berechneFinanzen();
        });
    }

    // Aktualisiert alle statischen Währungs-Labels (Einheiten-Symbole neben
    // den Eingabefeldern, Min/Max-Beschriftungen unter den Reglern)
    function updateCurrencyLabels() {
        const symbol = window.MV.getCurrencySymbol();
        document.querySelectorAll(".currencyUnit").forEach(el => {
            el.textContent = symbol;
        });
        document.querySelectorAll(".currencyRangeLabel").forEach(el => {
            el.textContent = window.MV.formatCurrencyCompact(parseFloat(el.dataset.value));
        });
    }

    // Hält das Dropdown synchron, falls die Währung anderswo geändert wurde:
    // (a) UserArea in einem anderen Tab -> storage-Event,
    // (b) diese Seite lag im bfcache und wird per Zurück/Vor wiederhergestellt -> pageshow.
    function refreshCurrencyFromStorage() {
        if (!currencySelect) return;
        currencySelect.value = window.MV.getCurrency();
        updateCurrencyLabels();
        berechneFinanzen();
    }

    window.addEventListener("mv:staterestore", refreshCurrencyFromStorage);

    // Tab-Wechsel-Eventhandler
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
                t.tabIndex = -1;
            });
            tabContents.forEach(c => {
                c.classList.remove("active");
                c.hidden = true;
            });

            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            tab.tabIndex = 0;

            currentTab = tab.getAttribute("data-tab");
            const panel = document.getElementById(`tab-${currentTab}`);
            panel.classList.add("active");
            panel.hidden = false;

            berechneFinanzen();
        });
    });

    function zeigeFehler(msg) {
        errorContainer.textContent = msg;
        errorContainer.hidden = false;
    }

    function versteckeFehler() {
        errorContainer.hidden = true;
        errorContainer.textContent = "";
    }

    // Währungsformatierer (z.B. 10.000,00 €)
    // Delegiert an die zentrale, währungsbewusste Formatierung in window.MV
    // (Funktionsname bewusst beibehalten, um alle bestehenden Aufrufstellen
    // unangetastet zu lassen – formatiert jetzt in der vom Nutzer gewählten Währung).
    function formatEuro(amount) {
        return window.MV.formatCurrency(amount);
    }

    // Kompakte Formatierung für Achsenbeschriftungen (ohne Nachkommastellen)
    function formatEuroCompact(amount) {
        return window.MV.formatCurrencyCompact(amount);
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

    // Rechenweg im gleichen Step-Container-Format wie Bruchrechner/DezBruchConverter
    function renderRechenwegSteps(steps) {
        rechenwegOutput.innerHTML = steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return `
                <div class="step-container ${isLast ? "final-step" : ""}">
                    <div class="step-title">${step.title}</div>
                    ${step.text ? `<div class="step-text">${step.text}</div>` : ""}
                    ${step.formula ? `<div class="step-formula-box">${step.formula}</div>` : ""}
                    ${step.solution ? `<div class="step-sub-solution">${step.solution}</div>` : ""}
                </div>`;
        }).join("");
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

            const sparSteps = [{
                title: "Grundlagen",
                text: "Es wird mit monatlicher Verzinsung und nachschüssiger monatlicher Einzahlung gerechnet.",
                formula: `Monate: n = ${jahre} × 12 = ${n}\nZinsfaktor: q = 1 + (${p}% / 12) = ${q.toFixed(6)}`
            }];

            if (p > 0) {
                sparSteps.push({
                    title: "Zinseszins auf das Startkapital",
                    text: "Das Startkapital wird über die gesamte Laufzeit verzinst:",
                    formula: `E_start = K₀ × q^n\nE_start = ${K0} × ${q.toFixed(4)}^${n} = ${formatEuro(endkapitalStart)}`,
                    solution: `Endkapital aus Startkapital: ${formatEuro(endkapitalStart)}`
                });
                sparSteps.push({
                    title: "Zinseszins auf die Sparraten",
                    text: "Für die monatlichen Einzahlungen gilt die Rentenendwertformel:",
                    formula: `E_rate = R × ((q^n − 1) / (q − 1))\nE_rate = ${R} × ((${q.toFixed(4)}^${n} − 1) / (${q.toFixed(4)} − 1)) = ${formatEuro(endkapitalRaten)}`,
                    solution: `Endkapital aus Sparraten: ${formatEuro(endkapitalRaten)}`
                });
            } else {
                sparSteps.push({
                    title: "Kapitalentwicklung ohne Verzinsung",
                    text: "Bei 0% Rendite wächst das Kapital nur durch die Einzahlungen selbst:",
                    formula: `E_start = K₀ = ${formatEuro(endkapitalStart)}\nE_rate = R × n = ${R} × ${n} = ${formatEuro(endkapitalRaten)}`
                });
            }

            sparSteps.push({
                title: "Gesamtkapital",
                text: "Beide Anteile ergeben zusammen das Endkapital:",
                formula: `${formatEuro(endkapitalStart)} + ${formatEuro(endkapitalRaten)} = ${formatEuro(gesamtEndkapital)}`,
                solution: `Endgültiges Ergebnis: ${formatEuro(gesamtEndkapital)}`
            });

            renderRechenwegSteps(sparSteps);

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

            // Exakten Endpunkt ergänzen, falls die Laufzeit nicht ganzzahlig ist
            // (z.B. 10.5 Jahre) – sonst würde die Kurve am letzten vollen Jahr
            // enden und den tatsächlichen Endwert nie erreichen.
            if (!Number.isInteger(jahre)) {
                chartJahre.push(jahre);
                chartKapital.push(gesamtEndkapital);
                chartEingezahlt.push(eingezahltesKapital);
            }

            renderChart({
                primary: chartKapital,
                secondary: chartEingezahlt,
                xLabels: chartJahre.map(j => `${Number.isInteger(j) ? j : j.toFixed(1)}J`),
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

            renderRechenwegSteps([
                {
                    title: "Abzinsungsfaktor bestimmen",
                    text: "Der jährliche Abzinsungsfaktor ergibt sich aus der Inflationsrate:",
                    formula: `q = 1 + ${rate}/100 = ${q.toFixed(4)}`
                },
                {
                    title: "Kaufkraft berechnen",
                    text: "Der heutige Betrag wird durch den Abzinsungsfaktor hoch Anzahl Jahre geteilt:",
                    formula: `Kaufkraft = Betrag / q^Jahre\nKaufkraft = ${betrag} / ${q.toFixed(4)}^${jahre} = ${formatEuro(kaufkraft)}`,
                    solution: `Reale Kaufkraft: ${formatEuro(kaufkraft)} (Kaufkraftverlust: ${formatEuro(verlust)})`
                }
            ]);

            // Chart-Daten: Kaufkraftentwicklung pro Jahr
            const chartJahre = [], chartKaufkraft = [], chartNominal = [];
            for (let j = 0; j <= jahre; j++) {
                chartJahre.push(j);
                chartKaufkraft.push(betrag / Math.pow(q, j));
                chartNominal.push(betrag);
            }

            // Exakten Endpunkt ergänzen, falls die Laufzeit nicht ganzzahlig ist
            if (!Number.isInteger(jahre)) {
                chartJahre.push(jahre);
                chartKaufkraft.push(kaufkraft);
                chartNominal.push(betrag);
            }

            renderChart({
                primary: chartKaufkraft,
                secondary: chartNominal,
                xLabels: chartJahre.map(j => `${Number.isInteger(j) ? j : j.toFixed(1)}J`),
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

           renderRechenwegSteps([
                {
                    title: "Gesamtrendite (ROI) berechnen",
                    text: "Der ROI setzt den Gewinn ins Verhältnis zum eingesetzten Kapital:",
                    formula: `ROI = ((Endwert − Investition) / Investition) × 100\nROI = ((${endwert} − ${invest}) / ${invest}) × 100 = ${roi.toFixed(2)} %`,
                    solution: `Gesamtrendite: ${roi.toFixed(2)} %`
                },
                {
                    title: "Jährliche Rendite (CAGR) berechnen",
                    text: `Die CAGR verteilt die Gesamtrendite gleichmäßig auf die ${jahre} Jahre Anlagedauer:`,
                    formula: `CAGR = ((Endwert / Investition)^(1/Jahre) − 1) × 100\nCAGR = ((${endwert} / ${invest})^(1/${jahre}) − 1) × 100 = ${cagr.toFixed(2)} %`,
                    solution: `Jährliche Rendite: ${cagr.toFixed(2)} % p.a.`
                }
            ]);

            // Chart-Daten: angenommene gleichmäßige Wertsteigerung (CAGR) über die Anlagedauer
            const chartJahre = [], chartWert = [], chartStart = [];
            for (let j = 0; j <= jahre; j++) {
                chartJahre.push(j);
                chartWert.push(invest * Math.pow(1 + cagr / 100, j));
                chartStart.push(invest);
            }

            // Exakten Endpunkt ergänzen, falls die Laufzeit nicht ganzzahlig ist
            if (!Number.isInteger(jahre)) {
                chartJahre.push(jahre);
                chartWert.push(endwert);
                chartStart.push(invest);
            }

            renderChart({
                primary: chartWert,
                secondary: chartStart,
                xLabels: chartJahre.map(j => `${Number.isInteger(j) ? j : j.toFixed(1)}J`),
                primaryLabel: "Angenommene Wertentwicklung",
                secondaryLabel: "Startkapital",
                title: "Wertentwicklung",
                subtitle: `Gleichmäßige Verzinsung (CAGR) über ${jahre} Jahre`
            });
        }
    }

    // Init-Run
    updateCurrencyLabels();
    berechneFinanzen();
});