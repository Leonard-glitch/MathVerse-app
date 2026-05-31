const button_calc = document.querySelectorAll("button");
const error = document.getElementById("errorMessages");

button_calc.forEach(button => {
  button.addEventListener("click", (b) => {
    const tool = b.target.closest(".tool");
    if (!tool) return; 

    const type = tool.dataset.type;
    const p = Number(tool.querySelector('[data-role="p"]')?.value.replace(',', '.') || NaN);
    const G = Number(tool.querySelector('[data-role="G"]')?.value.replace(',', '.') || NaN);
    const A = Number(tool.querySelector('[data-role="A"]')?.value.replace(',', '.') || NaN);

    const outputContainer = tool.querySelector(".formulaErgebnis");
    const ergebnisOutput = tool.querySelector(".ergebnisText");
    const rechenwegContainer = document.getElementById("rechenwegOutput");

    let ergebnis;
    let rechenweg;
    error.style.display = "none"; 
    outputContainer.style.display = "none";
    rechenwegContainer.innerHTML = "";

    if (type === "share-of") {
      if (isNaN(p) || isNaN(G)) return showError("Falsche Eingabe");
      ergebnis = (p / 100) * G;
      rechenweg = `(${p}% / 100) * ${G} = ${ergebnis}`;
      ergebnis=`${p}% von ${G} = <span class="ergebnisOutput">${ergebnis}</span>`;
    } 
    else if (type === "percent-of") {
      if (isNaN(A) || isNaN(G) || G === 0) return showError("Falsche Eingabe");
      ergebnis = (A / G) * 100;
      rechenweg = `(${A} / ${G}) * 100 = ${ergebnis}`;
      ergebnis=`${A} von ${G} sind <span class="ergebnisOutput">${ergebnis}</span>%`;
    } 
    else if (type === "basis-value-of") {
      if (isNaN(A) || isNaN(p) || p === 0) return showError("Falsche Eingabe");
      ergebnis = A / (p / 100);
      rechenweg = `${A} / (${p}% / 100) = ${ergebnis}`;
      ergebnis=`${A} sind ${p}% von <span class="ergebnisOutput">${ergebnis}</span>`;
    }

    console.log({ type, p, G, A, ergebnis, rechenweg });

    if (ergebnis !== undefined) {

      
      if (outputContainer) outputContainer.style.display = "flex";
      if (ergebnisOutput) ergebnisOutput.innerHTML = ergebnis;

      if (rechenwegContainer) rechenwegContainer.innerHTML = rechenweg;
    }
  });
});

const inputs=document.querySelectorAll(".zahlenInputfeld");

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




function showError(msg) {
  error.textContent = msg;
  error.style.display = "block";
}