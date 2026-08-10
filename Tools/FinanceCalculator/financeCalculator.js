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

    // Sets the CSS variable --slider-progress to match the current value,
    // so that the filled part of the slider (accent color) is displayed correctly.
    function updateSliderProgress(sliderEl) {
        const min = parseFloat(sliderEl.min) || 0;
        const max = parseFloat(sliderEl.max) || 100;
        const val = parseFloat(sliderEl.value) || 0;
        const pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
        sliderEl.style.setProperty("--slider-progress", `${Math.min(100, Math.max(0, pct))}%`);
    }

    // Pairing of slider and number field
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
            pair.originalMax = sliderEl.max; // Store original value before it gets dynamically expanded
            updateSliderProgress(sliderEl); // Set initial state on load

            // Event: Slider is moved
            sliderEl.addEventListener("input", () => {
                numEl.value = sliderEl.value;
                updateSliderProgress(sliderEl);
                berechneFinanzen();
            });

            // Event: Number is directly typed in
            numEl.addEventListener("input", () => {
                const raw = numEl.value.trim();

                // Empty/invalid intermediate state (e.g., right after "Select all" when re-typing):
                // Intentionally DO NOT touch the slider, otherwise the thumb briefly jumps to 0.
                // The calculation itself handles empty fields (internal ||0 fallback).
                if (raw === "" || isNaN(parseFloat(raw))) {
                    berechneFinanzen();
                    return;
                }

                let val = parseFloat(raw);

                // PRO FEATURE: Dynamic limit. If the user types in more than the slider allows,
                // we automatically expand the slider limit!
                let currentMax = parseFloat(sliderEl.max);
                if (val > currentMax) {
                    sliderEl.max = Math.ceil(val * 1.5); // Increases limit by 50% above the value
                }
                
                sliderEl.value = val;
                updateSliderProgress(sliderEl);
                berechneFinanzen();
            });

            // On leaving the field, clamp to limits defined in HTML
            // (prevents absurd values like 99999 years) – intentionally not live while
            // typing, so decimal inputs aren't interrupted.
            numEl.addEventListener("blur", () => {
                let val = parseFloat(numEl.value);
                if (isNaN(val)) val = parseFloat(numEl.min) || 0;

                const hardMin = numEl.min !== "" ? parseFloat(numEl.min) : -Infinity;
                const hardMax = numEl.max !== "" ? parseFloat(numEl.max) : Infinity;
                const clamped = Math.min(Math.max(val, hardMin), hardMax);

                // Defensively adjust slider limit if it is (still) smaller than the
                // clamped value – fallback for cases where dynamic expansion from
                // input handler was skipped.
                if (clamped > parseFloat(sliderEl.max)) {
                    sliderEl.max = clamped;
                }

                // Always update slider: when typing an empty intermediate state,
                // it was intentionally not synchronized above.
                sliderEl.value = clamped;
                updateSliderProgress(sliderEl);

                if (clamped !== val || numEl.value === "") {
                    numEl.value = clamped;
                    berechneFinanzen();
                }
            });
        }
    });

    // Reset button: only reset fields of currently active tab
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

    // ── Currency Selection ───────────────────────────────────────────────
    // Globally saved via window.MV (like Theme/Design) so future financial
    // tools will automatically adopt the same setting.
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

    // Updates all static currency labels (unit symbols next to
// input fields, min/max labels below sliders)
function updateCurrencyLabels() {
    const symbol = window.MV.getCurrencySymbol();
    document.querySelectorAll(".currencyUnit").forEach(el => {
        el.textContent = symbol;
    });
    document.querySelectorAll(".currencyRangeLabel").forEach(el => {
        el.textContent = window.MV.formatCurrencyCompact(parseFloat(el.dataset.value));
    });
}

// Keeps the dropdown synchronized if the currency was changed elsewhere:
// (a) UserArea in another tab -> storage event,
// (b) this page was in bfcache and is restored via back/forward -> pageshow.
function refreshCurrencyFromStorage() {
    if (!currencySelect) return;
    currencySelect.value = window.MV.getCurrency();
    updateCurrencyLabels();
    berechneFinanzen();
}

window.addEventListener("mv:staterestore", refreshCurrencyFromStorage);

// Tab switch event handler
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

// Currency formatter (e.g. $10,000.00 / 10.000,00 €)
// Delegates to central currency-aware formatting in window.MV
// (Function name intentionally retained to keep existing call sites untouched –
// now formats in the user-selected currency).
function formatEuro(amount) {
    return window.MV.formatCurrency(amount);
}

// Compact formatting for axis labels (without decimal places)
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

// Renders the chart for the currently active tab (grid, area/line paths, legend)
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

    // Grid lines + Y-axis labels (5 levels)
    const gridCount = 4;
    let gridHtml = "";
    for (let g = 0; g <= gridCount; g++) {
        const val = minVal + (maxVal - minVal) * (g / gridCount);
        const y = yOf(val);
        gridHtml += `<line class="chartGridLine" x1="${left}" y1="${y.toFixed(2)}" x2="${width - right}" y2="${y.toFixed(2)}" />`;
        gridHtml += `<text class="chartAxisLabel" x="${left - 8}" y="${(y + 3).toFixed(2)}" text-anchor="end">${formatEuroCompact(val)}</text>`;
    }

    // X-axis labels (max. 6 labels, always including last point)
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

// Calculation steps in the same step-container format as Fraction Calculator / DecFractionConverter
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
                zeigeFehler("Please enter positive values only.");
                return;
            }

            // Exact banking logic: Monthly compounding (q = 1 + p / 1200)
            const n = jahre * 12; // Total months
            const q = 1 + (p / 100) / 12; // Monthly interest factor
            
            let endkapitalStart = 0;
            let endkapitalRaten = 0;
            
            if (p > 0) {
                // Compounding of initial capital
                endkapitalStart = K0 * Math.pow(q, n);
                // Future value of an annuity (ordinary monthly deposits)
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
                    <div class="ergebnisKarteTitle">Expected Final Capital</div>
                    <div class="ergebnisKarteValue">${formatEuro(gesamtEndkapital)}</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Your Contributions</div>
                    <div class="ergebnisKarteValue">${formatEuro(eingezahltesKapital)}</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Interest Earned</div>
                    <div class="ergebnisKarteValue" style="color: var(--accent-live, #00ffcc);">+ ${formatEuro(zinsGewinn)}</div>
                </div>
            `;

            const sparSteps = [{
                title: "Basics",
                text: "Calculated with monthly compounding and ordinary monthly deposits.",
                formula: `Months: n = ${jahre} × 12 = ${n}\nInterest factor: q = 1 + (${p}% / 12) = ${q.toFixed(6)}`
            }];

            if (p > 0) {
                sparSteps.push({
                    title: "Compound interest on initial capital",
                    text: "The initial capital earns interest over the entire term:",
                    formula: `E_start = K₀ × q^n\nE_start = ${K0} × ${q.toFixed(4)}^${n} = ${formatEuro(endkapitalStart)}`,
                    solution: `Final capital from initial deposit: ${formatEuro(endkapitalStart)}`
                });
                sparSteps.push({
                    title: "Compound interest on savings installments",
                    text: "For monthly deposits, the future value of an annuity formula applies:",
                    formula: `E_rate = R × ((q^n − 1) / (q − 1))\nE_rate = ${R} × ((${q.toFixed(4)}^${n} − 1) / (${q.toFixed(4)} − 1)) = ${formatEuro(endkapitalRaten)}`,
                    solution: `Final capital from savings installments: ${formatEuro(endkapitalRaten)}`
                });
            } else {
                sparSteps.push({
                    title: "Capital growth without interest",
                    text: "At 0% return, capital grows solely through deposits:",
                    formula: `E_start = K₀ = ${formatEuro(endkapitalStart)}\nE_rate = R × n = ${R} × ${n} = ${formatEuro(endkapitalRaten)}`
                });
            }

            sparSteps.push({
                title: "Total capital",
                text: "Both portions combined yield the total final capital:",
                formula: `${formatEuro(endkapitalStart)} + ${formatEuro(endkapitalRaten)} = ${formatEuro(gesamtEndkapital)}`,
                solution: `Final result: ${formatEuro(gesamtEndkapital)}`
            });

            renderRechenwegSteps(sparSteps);

            // Chart data: Capital development per year
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

            // Append exact endpoint if investment period is non-integer
            // (e.g., 10.5 years) – otherwise the curve would stop at the last full year
            // and never reach the actual end value.
            if (!Number.isInteger(jahre)) {
                chartJahre.push(jahre);
                chartKapital.push(gesamtEndkapital);
                chartEingezahlt.push(eingezahltesKapital);
            }

            renderChart({
                primary: chartKapital,
                secondary: chartEingezahlt,
                xLabels: chartJahre.map(j => `${Number.isInteger(j) ? j : j.toFixed(1)}Y`),
                primaryLabel: "Total Capital",
                secondaryLabel: "Deposits",
                title: "Capital Growth",
                subtitle: `Progress over ${jahre} years`
            });

        } else if (currentTab === "inflation") {
            const betrag = parseFloat(document.getElementById("infBetrag").value) || 0;
            const rate = parseFloat(document.getElementById("infRate").value) || 0;
            const jahre = parseFloat(document.getElementById("infJahre").value) || 0;

            if (betrag < 0 || rate < 0 || jahre < 0) {
                zeigeFehler("Please enter positive values only.");
                return;
            }

            const q = 1 + (rate / 100);
            const kaufkraft = betrag / Math.pow(q, jahre);
            const verlust = betrag - kaufkraft;

            ergebnisKartenOutput.innerHTML = `
                <div class="ergebnisKarte highlight">
                    <div class="ergebnisKarteTitle">Real Purchasing Power in ${jahre} Years</div>
                    <div class="ergebnisKarteValue">${formatEuro(kaufkraft)}</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Loss of Purchasing Power</div>
                    <div class="ergebnisKarteValue" style="color: #ff4d4d;">- ${formatEuro(verlust)}</div>
                </div>
            `;

            renderRechenwegSteps([
                {
                    title: "Determine discount factor",
                    text: "The annual discount factor is derived from the inflation rate:",
                    formula: `q = 1 + ${rate}/100 = ${q.toFixed(4)}`
                },
                {
                    title: "Calculate purchasing power",
                    text: "Today's amount is divided by the discount factor raised to the power of years:",
                    formula: `Purchasing power = Amount / q^Years\nPurchasing power = ${betrag} / ${q.toFixed(4)}^${jahre} = ${formatEuro(kaufkraft)}`,
                    solution: `Real purchasing power: ${formatEuro(kaufkraft)} (Loss: ${formatEuro(verlust)})`
                }
            ]);

            // Chart data: Purchasing power development per year
            const chartJahre = [], chartKaufkraft = [], chartNominal = [];
            for (let j = 0; j <= jahre; j++) {
                chartJahre.push(j);
                chartKaufkraft.push(betrag / Math.pow(q, j));
                chartNominal.push(betrag);
            }

            // Append exact endpoint if investment period is non-integer
            if (!Number.isInteger(jahre)) {
                chartJahre.push(jahre);
                chartKaufkraft.push(kaufkraft);
                chartNominal.push(betrag);
            }

            renderChart({
                primary: chartKaufkraft,
                secondary: chartNominal,
                xLabels: chartJahre.map(j => `${Number.isInteger(j) ? j : j.toFixed(1)}Y`),
                primaryLabel: "Real Purchasing Power",
                secondaryLabel: "Nominal Amount",
                title: "Purchasing Power Trajectory",
                subtitle: `Progress over ${jahre} years`
            });

        } else if (currentTab === "rendite") {
            const invest = parseFloat(document.getElementById("renInv").value) || 0;
            const endwert = parseFloat(document.getElementById("renEnd").value) || 0;
            const jahre = parseFloat(document.getElementById("renJahre").value) || 0;

            if (invest <= 0 || endwert < 0) {
                zeigeFehler("Invested capital must be greater than 0.");
                return;
            }
            if (jahre <= 0) {
                zeigeFehler("Investment duration must be greater than 0.");
                return;
            }

            const gewinn = endwert - invest;
            const roi = (gewinn / invest) * 100;
            const cagr = (Math.pow(endwert / invest, 1 / jahre) - 1) * 100;

            ergebnisKartenOutput.innerHTML = `
                <div class="ergebnisKarte highlight">
                    <div class="ergebnisKarteTitle">Total Return (ROI)</div>
                    <div class="ergebnisKarteValue" style="color: ${roi >= 0 ? 'var(--accent-live, #00ffcc)' : '#ff4d4d'};">${roi > 0 ? '+' : ''}${roi.toFixed(2)} %</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Annual Return (CAGR)</div>
                    <div class="ergebnisKarteValue" style="color: ${cagr >= 0 ? 'var(--accent-live, #00ffcc)' : '#ff4d4d'};">${cagr > 0 ? '+' : ''}${cagr.toFixed(2)} % p.a.</div>
                </div>
                <div class="ergebnisKarte">
                    <div class="ergebnisKarteTitle">Absolute Profit / Loss</div>
                    <div class="ergebnisKarteValue">${gewinn > 0 ? '+' : ''}${formatEuro(gewinn)}</div>
                </div>
            `;

           renderRechenwegSteps([
                {
                    title: "Calculate Total Return (ROI)",
                    text: "ROI relates profit to the capital invested:",
                    formula: `ROI = ((Final Value − Investment) / Investment) × 100\nROI = ((${endwert} − ${invest}) / ${invest}) × 100 = ${roi.toFixed(2)} %`,
                    solution: `Total Return: ${roi.toFixed(2)} %`
                },
                {
                    title: "Calculate Annual Return (CAGR)",
                    text: `CAGR distributes total return evenly over the ${jahre}-year investment period:`,
                    formula: `CAGR = ((Final Value / Investment)^(1/Years) − 1) × 100\nCAGR = ((${endwert} / ${invest})^(1/${jahre}) − 1) × 100 = ${cagr.toFixed(2)} %`,
                    solution: `Annual Return: ${cagr.toFixed(2)} % p.a.`
                }
            ]);

            // Chart data: Assumed steady value increase (CAGR) over investment duration
            const chartJahre = [], chartWert = [], chartStart = [];
            for (let j = 0; j <= jahre; j++) {
                chartJahre.push(j);
                chartWert.push(invest * Math.pow(1 + cagr / 100, j));
                chartStart.push(invest);
            }

            // Append exact endpoint if investment period is non-integer
            if (!Number.isInteger(jahre)) {
                chartJahre.push(jahre);
                chartWert.push(endwert);
                chartStart.push(invest);
            }

            renderChart({
                primary: chartWert,
                secondary: chartStart,
                xLabels: chartJahre.map(j => `${Number.isInteger(j) ? j : j.toFixed(1)}Y`),
                primaryLabel: "Assumed Performance",
                secondaryLabel: "Initial Capital",
                title: "Value Development",
                subtitle: `Constant Return Rate (CAGR) over ${jahre} years`
            });
        }
    }

    // Init run
    updateCurrencyLabels();
    berechneFinanzen();
});