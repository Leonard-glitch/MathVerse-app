// ==========================================================================
// PROZENTRECHNER – Grundrechenarten + Advanced Mode
// ==========================================================================

const button_calc = document.querySelectorAll("button");
const error = document.getElementById("errorMessages");
const advancedCheckbox = document.querySelector(".advancedMode input[type='checkbox']");
const advancedToolsGroup = document.getElementById("advancedToolsGroup");

// Liest ein Eingabefeld innerhalb eines .tool-Blocks aus und wandelt es in eine Zahl um.
// Leere/Whitespace-Eingaben werden bewusst zu NaN (nicht zu 0), damit "Falsche Eingabe"
// auch bei versehentlich geleerten Feldern zuverlässig greift.
function getVal(tool, role) {
    const el = tool.querySelector(`[data-role="${role}"]`);
    if (!el) return NaN;
    const raw = el.value.trim();
    if (raw === "") return NaN;
    return Number(raw.replace(",", "."));
}

// Liest den Wert eines <select> innerhalb eines .tool-Blocks aus (z.B. Richtung bei MwSt).
function getSelectVal(tool, role) {
    const el = tool.querySelector(`[data-role="${role}"]`);
    return el ? el.value : undefined;
}

// Rundet auf 2 Nachkommastellen, killt typische Floating-Point-Reste (z.B. 49.999999998)
function round2(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

button_calc.forEach(button => {
  button.addEventListener("click", (b) => {
    const tool = b.target.closest(".tool");
    if (!tool) return;

    const type = tool.dataset.type;

    const outputContainer = tool.querySelector(".formulaErgebnis");
    const ergebnisOutput = tool.querySelector(".ergebnisText");
    const rechenwegContainer = document.getElementById("rechenwegOutput");

    let ergebnis;
    let rechenweg;
    error.style.display = "none";
    outputContainer.style.display = "none";
    rechenwegContainer.innerHTML = "";

    if (type === "share-of") {
      const p = getVal(tool, "p");
      const G = getVal(tool, "G");
      if (isNaN(p) || isNaN(G)) return showError("Falsche Eingabe");

      const result = round2((p / 100) * G);
      rechenweg = `(${p}% / 100) * ${G} = ${result}`;
      ergebnis = `${p}% von ${G} = <span class="ergebnisOutput">${result}</span>`;
    }
    else if (type === "percent-of") {
      const A = getVal(tool, "A");
      const G = getVal(tool, "G");
      if (isNaN(A) || isNaN(G) || G === 0) return showError("Falsche Eingabe");

      const result = round2((A / G) * 100);
      rechenweg = `(${A} / ${G}) * 100 = ${result}`;
      ergebnis = `${A} von ${G} sind <span class="ergebnisOutput">${result}</span>%`;
    }
    else if (type === "basis-value-of") {
      const A = getVal(tool, "A");
      const p = getVal(tool, "p");
      if (isNaN(A) || isNaN(p) || p === 0) return showError("Falsche Eingabe");

      const result = round2(A / (p / 100));
      rechenweg = `${A} / (${p}% / 100) = ${result}`;
      ergebnis = `${A} sind ${p}% von <span class="ergebnisOutput">${result}</span>`;
    }
    else if (type === "percent-change") {
      const alt = getVal(tool, "alt");
      const neu = getVal(tool, "neu");
      if (isNaN(alt) || isNaN(neu) || alt === 0) return showError("Falsche Eingabe");

      const result = round2(((neu - alt) / alt) * 100);
      const richtung = result >= 0 ? "Zunahme" : "Abnahme";
      rechenweg = `((${neu} - ${alt}) / ${alt}) * 100 = ${result}%`;
      ergebnis = `${alt} → ${neu}: <span class="ergebnisOutput">${result}%</span> (${richtung})`;
    }
    else if (type === "increase-decrease") {
      const G = getVal(tool, "G");
      const p = getVal(tool, "p");
      const op = getSelectVal(tool, "op");
      if (isNaN(G) || isNaN(p)) return showError("Falsche Eingabe");

      const sign = op === "decrease" ? "-" : "+";
      const faktor = op === "decrease" ? (1 - p / 100) : (1 + p / 100);
      const result = round2(G * faktor);
      const opText = op === "decrease" ? "vermindert" : "erhöht";
      rechenweg = `${G} * (1 ${sign} ${p}/100) = ${result}`;
      ergebnis = `${G} ${opText} um ${p}% = <span class="ergebnisOutput">${result}</span>`;
    }
    else if (type === "vat") {
      const wert = getVal(tool, "wert");
      const steuersatz = getVal(tool, "steuersatz");
      const direction = getSelectVal(tool, "direction");
      if (isNaN(wert) || isNaN(steuersatz)) return showError("Falsche Eingabe");

      if (direction === "gross-to-net") {
        const netto = round2(wert / (1 + steuersatz / 100));
        const mwst = round2(wert - netto);
        rechenweg = `${wert} / (1 + ${steuersatz}/100) = ${netto}`;
        ergebnis = `${wert} brutto − ${steuersatz}% MwSt = <span class="ergebnisOutput">${netto}</span> netto (MwSt: ${mwst})`;
      } else {
        const brutto = round2(wert * (1 + steuersatz / 100));
        const mwst = round2(brutto - wert);
        rechenweg = `${wert} * (1 + ${steuersatz}/100) = ${brutto}`;
        ergebnis = `${wert} netto + ${steuersatz}% MwSt = <span class="ergebnisOutput">${brutto}</span> brutto (MwSt: ${mwst})`;
      }
    }
    else if (type === "discount") {
      const G = getVal(tool, "G");
      const p = getVal(tool, "p");
      if (isNaN(G) || isNaN(p)) return showError("Falsche Eingabe");

      const rabattbetrag = round2(G * (p / 100));
      const endpreis = round2(G - rabattbetrag);
      rechenweg = `${G} - (${G} * ${p}/100) = ${endpreis}`;
      ergebnis = `${G} − ${p}% Rabatt = <span class="ergebnisOutput">${endpreis}</span> (Rabatt: ${rabattbetrag})`;
    }

    console.log({ type, ergebnis, rechenweg });

    if (ergebnis !== undefined) {
      if (outputContainer) outputContainer.style.display = "flex";
      if (ergebnisOutput) ergebnisOutput.innerHTML = ergebnis;
      if (rechenwegContainer) rechenwegContainer.innerHTML = rechenweg;
    }
  });
});

const inputs = document.querySelectorAll(".zahlenInputfeld");

inputs.forEach(input => {
  // Hide error on typing
  input.addEventListener("input", () => {
    error.style.display = "none";
  });

  // Handle Enter Key
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const tool = input.closest(".tool");
      const btn = tool?.querySelector("button");
      if (btn) btn.click();
    }
  });
});

// Auswahl-Dropdowns (Richtung/Operation) sollen Fehler beim Ändern ebenfalls ausblenden
document.querySelectorAll(".selectPercent").forEach(select => {
  select.addEventListener("change", () => {
    error.style.display = "none";
  });
});

function showError(msg) {
  error.textContent = msg;
  error.style.display = "block";
}

// ==========================================================================
// ADVANCED MODE – gleiche Logik/Speicherung wie beim Einheiten Umrechner
// (window.MV.bindAdvancedToggle, Key = "prozentrechner")
// ==========================================================================

function updateAdvancedVisibility(isAdvanced) {
  if (advancedToolsGroup) advancedToolsGroup.classList.toggle("visible", isAdvanced);
}

document.addEventListener("DOMContentLoaded", () => {
  window.MV.bindAdvancedToggle(advancedCheckbox, "prozentrechner", (isChecked) => {
    updateAdvancedVisibility(isChecked);
  });
});