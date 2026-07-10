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
            document.getElementById("mathInputAllgemein")?.dispatchEvent(new Event("input"));
        }else if(currentType==="linear"){
            document.getElementById("allgemeineGleichungsContainer").style.display="none";
            document.getElementById("lineareGleichungsContainer").style.display="flex";
            validateLinearSystem();
        }
    });
});
extractCoefficient(node);


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
        <span class="rowNumber">${anzahlZusatzInputs + 2}&#41;</span><math-field class="zahlenInputfeld lgsGleichungInput" placeholder="z.B.: $$a+7b=6 $$"></math-field>
    `;

    container.appendChild(wrapperInput);

    hideError();
    validateLinearSystem();
});

btnDeleteInput.addEventListener("click", () => {
    const zusatzElemente = container.querySelectorAll(".zusatzElement");

    if (zusatzElemente.length >= 1) {
        container.removeChild(zusatzElemente[zusatzElemente.length - 1]);

        anzahlZusatzInputs--;
        validateLinearSystem();
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








class FormulaError extends Error {}

function exaktRunden(n) {
    return Math.round(n * 1e10) / 1e10;
}


const BLACKLIST_CHECKS = [
    { re: /\\int|\\iint|\\iiint|\\oint/, msg: "Integrale werden nicht unterstützt." },
    { re: /\\sum/, msg: "Summenzeichen werden nicht unterstützt." },
    { re: /\\prod/, msg: "Produktzeichen werden nicht unterstützt." },
    { re: /\\lim/, msg: "Grenzwerte werden nicht unterstützt." },
    { re: /\\begin\{(matrix|pmatrix|bmatrix|vmatrix|Vmatrix|cases|array)\}/, msg: "Matrizen/Fallunterscheidungen werden nicht unterstützt." },
    { re: /\\vec|\\overrightarrow/, msg: "Vektoren werden nicht unterstützt." },
    { re: /\\det/, msg: "Determinanten werden nicht unterstützt." },
    { re: /\\in\b|\\notin|\\subset|\\subseteq|\\cup|\\cap|\\emptyset|\\forall|\\exists/, msg: "Mengenlehre wird nicht unterstützt." },
    { re: /\\Rightarrow|\\Leftrightarrow|\\rightarrow|\\wedge|\\vee|\\neg/, msg: "Logikoperatoren werden nicht unterstützt." },
    { re: /\\leq|\\geq|\\neq|\\approx|\\equiv|[<>]/, msg: "Ungleichungen werden nicht unterstützt – nur Gleichungen mit \"=\"." },
    { re: /\\partial|\\nabla|\\prime/, msg: "Ableitungen werden nicht unterstützt." },
    { re: /\\Im\b|\\Re\b|\\overline\{|\\bar\{|\\mathbb\{C\}/, msg: "Komplexe Zahlen werden nicht unterstützt." },
    { re: /\\binom|\\choose/, msg: "Binomialkoeffizienten werden nicht unterstützt." }
];

function checkBlacklist(latex) {
    for (const { re, msg } of BLACKLIST_CHECKS) {
        if (re.test(latex)) throw new FormulaError(msg);
    }
}

const GREEK_LETTERS = {
    alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε",
    zeta: "ζ", eta: "η", theta: "θ", iota: "ι", kappa: "κ",
    lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", rho: "ρ",
    sigma: "σ", tau: "τ", upsilon: "υ", phi: "φ", chi: "χ",
    psi: "ψ", omega: "ω",

    Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ",
    Pi: "Π", Sigma: "Σ", Phi: "Φ", Psi: "Ψ", Omega: "Ω"
};

//Tokenizer

function tokenize(latex) {
    const tokens = [];
    let i = 0;
    const n = latex.length;

    while (i < n) {
        const ch = latex[i];

        if (/\s/.test(ch)) { i++; continue; }

        if (ch === "\\") {
            let j = i + 1;
            while (j < n && /[a-zA-Z]/.test(latex[j])) j++;
            const cmd = latex.slice(i + 1, j);
            i = j;

            switch (cmd) {
                case "left": case "right": continue; // transparent
                case "cdot": case "times": tokens.push({ type: "MUL" }); continue;
                case "div": tokens.push({ type: "DIV" }); continue;
                case "frac": tokens.push({ type: "FRAC" }); continue;
                case "sqrt": tokens.push({ type: "SQRT" }); continue;
                case "pi": tokens.push({ type: "CONST", name: "pi" }); continue;
                case "sin": case "cos": case "tan":
                case "ln": case "exp":
                    tokens.push({ type: "FUNC", name: cmd }); continue;
                case "log":
                    tokens.push({ type: "FUNC", name: "log" }); continue;
                case "arcsin": tokens.push({ type: "FUNC", name: "asin" }); continue;
                case "arccos": tokens.push({ type: "FUNC", name: "acos" }); continue;
                case "arctan": tokens.push({ type: "FUNC", name: "atan" }); continue;
                default:
                    if (GREEK_LETTERS.hasOwnProperty(cmd)) {
                        tokens.push({ type: "LETTER", value: GREEK_LETTERS[cmd] });
                        continue;
                    }
                    throw new FormulaError("Dieses mathematische Element wird aktuell nicht unterstützt.");
            }
        }

        if (ch === "{") { tokens.push({ type: "LBRACE" }); i++; continue; }
        if (ch === "}") { tokens.push({ type: "RBRACE" }); i++; continue; }
        if (ch === "[") { tokens.push({ type: "LBRACKET" }); i++; continue; }
        if (ch === "]") { tokens.push({ type: "RBRACKET" }); i++; continue; }
        if (ch === "(") { tokens.push({ type: "LPAREN" }); i++; continue; }
        if (ch === ")") { tokens.push({ type: "RPAREN" }); i++; continue; }
        if (ch === "|") { tokens.push({ type: "PIPE" }); i++; continue; }
        if (ch === "^") { tokens.push({ type: "CARET" }); i++; continue; }
        if (ch === "_") { tokens.push({ type: "UNDERSCORE" }); i++; continue; }
        if (ch === "+") { tokens.push({ type: "PLUS" }); i++; continue; }
        if (ch === "-") { tokens.push({ type: "MINUS" }); i++; continue; }
        if (ch === "*") { tokens.push({ type: "MUL" }); i++; continue; }
        if (ch === "/") { tokens.push({ type: "DIV" }); i++; continue; }
        if (ch === "=") { tokens.push({ type: "EQUALS" }); i++; continue; }

        if (/[0-9]/.test(ch) || ((ch === "." || ch === ",") && /[0-9]/.test(latex[i + 1] || ""))) {
            let j = i;
            let raw = "";
            while (j < n && /[0-9]/.test(latex[j])) { raw += latex[j]; j++; }
            if (latex[j] === "." || latex[j] === ",") {
                raw += "."; j++;
                while (j < n && /[0-9]/.test(latex[j])) { raw += latex[j]; j++; }
            }
            tokens.push({ type: "NUM", value: parseFloat(raw), raw });
            i = j;
            continue;
        }

        if (/[a-zA-Z]/.test(ch)) {
            tokens.push({ type: "LETTER", value: ch });
            i++;
            continue;
        }

        throw new FormulaError(`Das Zeichen „${ch}" wird nicht erkannt. Bitte überprüfe deine Eingabe.`);
    }

    tokens.push({ type: "EOF" });
    return tokens;
}


//parseEquation

function parseEquation(tokens) {
    let pos = 0;
    let openPipes = 0;
    const peek = () => tokens[pos];
    const advance = () => tokens[pos++];
    const expect = (type, msg) => {
        if (peek().type !== type) throw new FormulaError(msg || `Erwartet: ${type}`);
        return advance();
    };
    const atomStartTypes = ["NUM", "LETTER", "CONST", "LPAREN", "PIPE", "FRAC", "SQRT", "FUNC"];
    const startsAtom = (t) => atomStartTypes.includes(t);

    function parseExpression() {
        let node = parseTerm();
        while (peek().type === "PLUS" || peek().type === "MINUS") {
            const op = advance().type;
            const rhs = parseTerm();
            node = { type: op === "PLUS" ? "add" : "sub", left: node, right: rhs };
        }
        return node;
    }

    function parseTerm() {
        let node = parseFactor();
        while (true) {
            const t = peek().type;
            if (t === "MUL") { advance(); node = { type: "mul", left: node, right: parseFactor() }; }
            else if (t === "DIV") { advance(); node = { type: "div", left: node, right: parseFactor() }; }
            else if (t === "PIPE" && openPipes > 0) { break; } // schließendes Betragsstrich-Zeichen, keine implizite Multiplikation
            else if (startsAtom(t)) { node = { type: "mul", left: node, right: parseFactor() }; }
            else break;
        }
        return node;
    }

    function parseFactor() {
        if (peek().type === "MINUS") {
            advance();
            return { type: "neg", arg: parseFactor() };
        }
        return parsePower();
    }

    function parsePower() {
        let base = parseAtom();
        if (peek().type === "CARET") {
            advance();
            const exp = parseExponent();
            return { type: "pow", base, exp };
        }
        return base;
    }

    function parseExponent() {
        if (peek().type === "LBRACE") {
            advance();
            const e = parseExpression();
            expect("RBRACE", "Der Exponent wurde nicht richtig geschlossen.");
            return e;
        }
        return parseFactor();
    }

    function parseSubscriptRaw() {
        if (peek().type === "LBRACE") {
            advance();
            let text = "";
            while (peek().type !== "RBRACE") {
                if (peek().type === "EOF") throw new FormulaError("Der Index wurde nicht geschlossen.");
                const t = advance();
                if (t.type === "LETTER") text += t.value;
                else if (t.type === "NUM") text += t.raw;
                else throw new FormulaError("Der Index enthält ein ungültiges Zeichen.");
            }
            advance();
            return text;
        }
        const t = advance();
        if (t.type === "LETTER") return t.value;
        if (t.type === "NUM") return t.raw;
        throw new FormulaError("Der Index enthält ein ungültiges Zeichen.");
    }

    function parseSubscriptExpr() {
        if (peek().type === "LBRACE") {
            advance();
            const e = parseExpression();
            expect("RBRACE", "Die Basis des Logarithmus wurde nicht richtig geschlossen.");
            return e;
        }
        return parseAtom();
    }

    function parseFuncArgNoParens() {
        let node = parseFactor();
        while (startsAtom(peek().type)) {
            node = { type: "mul", left: node, right: parseFactor() };
        }
        return node;
    }

    function parseAtom() {
        const t = peek();

        switch (t.type) {
            case "NUM":
                advance();
                return { type: "num", value: t.value, raw: t.raw };

            case "CONST":
                advance();
                return { type: "const", name: t.name };

            case "LETTER": {
                advance();
                if (t.value === "e" && peek().type !== "UNDERSCORE") {
                    return { type: "const", name: "e" };
                }
                let name = t.value;
                if (peek().type === "UNDERSCORE") {
                    advance();
                    name += "_" + parseSubscriptRaw();
                }
                return { type: "var", name };
            }

            case "LPAREN": {
                advance();
                const e = parseExpression();
                expect("RPAREN", "Eine runde Klammer wurde nicht geschlossen.");
                return e;
            }

            case "PIPE": {
                openPipes++;
                advance();
                const e = parseExpression();
                expect("PIPE", "Die Betragsstriche wurden nicht geschlossen.");
                openPipes--;
                return { type: "abs", arg: e };
            }

            case "FRAC": {
                advance();
                expect("LBRACE", "Der Bruch ist unvollständig – der Zähler fehlt.");
                const num = parseExpression();
                expect("RBRACE", "Der Zähler des Bruchs wurde nicht richtig abgeschlossen.");
                expect("LBRACE", "Der Bruch ist unvollständig – der Nenner fehlt.");
                const den = parseExpression();
                expect("RBRACE", "Der Nenner des Bruchs wurde nicht richtig abgeschlossen.");
                return { type: "div", left: num, right: den };
            }

            case "SQRT": {
                advance();
                let index = null;
                if (peek().type === "LBRACKET") {
                    advance();
                    index = parseExpression();
                    expect("RBRACKET", "Der Wurzelindex wurde nicht geschlossen.");
                }
                expect("LBRACE", "Der Inhalt der Wurzel fehlt.");
                const arg = parseExpression();
                expect("RBRACE", "Die Wurzel wurde nicht richtig geschlossen.");
                return { type: "sqrt", arg, index };
            }

            case "FUNC": {
                advance();
                let base = null;
                if (t.name === "log" && peek().type === "UNDERSCORE") {
                    advance();
                    base = parseSubscriptExpr();
                }
                if (peek().type === "LPAREN") {
                    advance();
                    const arg = parseExpression();
                    expect("RPAREN", "Die Klammer nach der Funktion wurde nicht geschlossen.");
                    return { type: "func", name: t.name, arg, base };
                }
                if (!startsAtom(peek().type) && peek().type !== "MINUS") {
                    throw new FormulaError(`Nach der Funktion „${t.name}" fehlt ein Argument (z. B. eine Zahl, Variable oder Klammer).`);
                }
                const arg = parseFuncArgNoParens();
                return { type: "func", name: t.name, arg, base };
            }

            default:
                throw new FormulaError("Die Formel enthält an dieser Stelle ein unerwartetes Element.");
        }
    }

    const left = parseExpression();
    expect("EQUALS", "Deine Formel muss genau ein Gleichheitszeichen (=) enthalten.");
    const right = parseExpression();
    if (peek().type === "EQUALS") {
        throw new FormulaError("Es darf nur ein Gleichheitszeichen (=) vorkommen.");
    }
    if (peek().type !== "EOF") {
        throw new FormulaError("Am Ende der Formel befinden sich überzählige Zeichen. Bitte überprüfe deine Eingabe.");
    }
    return { left, right };
}


//AST-HILFSFUNKTIONEN

function getChildren(node) {
    switch (node.type) {
        case "num": case "var": case "const": return [];
        case "add": case "sub": case "mul": case "div": return [node.left, node.right];
        case "neg": return [node.arg];
        case "pow": return [node.base, node.exp];
        case "sqrt": return node.index ? [node.arg, node.index] : [node.arg];
        case "abs": return [node.arg];
        case "func": return node.base ? [node.arg, node.base] : [node.arg];
        default: return [];
    }
}

function containsVar(node, name) {
    if (node.type === "var" && node.name === name) return true;
    return getChildren(node).some(c => containsVar(c, name));
}

function countVarOccurrences(node, name) {
    let count = (node.type === "var" && node.name === name) ? 1 : 0;
    for (const c of getChildren(node)) count += countVarOccurrences(c, name);
    return count;
}

function collectVariableNames(eq) {
    const set = new Set();
    (function walk(node) {
        if (node.type === "var") set.add(node.name);
        getChildren(node).forEach(walk);
    })(eq.left);
    (function walk(node) {
        if (node.type === "var") set.add(node.name);
        getChildren(node).forEach(walk);
    })(eq.right);
    return Array.from(set);
}

function isConstNum(node, val) {
    return node.type === "num" && node.value === val;
}

function numNode(v) {
    const r = exaktRunden(v);
    return { type: "num", value: r, raw: String(r) };
}


//AST-HILFSFUNKTIONEN

function flattenTerms(node, sign, terms) {
    if (node.type === "add") {
        flattenTerms(node.left, sign, terms);
        flattenTerms(node.right, sign, terms);
    } else if (node.type === "sub") {
        flattenTerms(node.left, sign, terms);
        flattenTerms(node.right, -sign, terms);
    } else if (node.type === "neg") {
        flattenTerms(node.arg, -sign, terms);
    } else {
        terms.push({ sign, node });
    }
}

// Struktureller Schlüssel eines Ausdrucks, um gleichartige Terme (z.B. 3x
// und 2x, oder 3·√x und √x) unabhängig vom Vorfaktor zu erkennen.
function structuralKey(node) {
    switch (node.type) {
        case "num": return `num:${node.value}`;
        case "const": return `const:${node.name}`;
        case "var": return `var:${node.name}`;
        case "neg": return `neg:${structuralKey(node.arg)}`;
        case "add": return `add:${structuralKey(node.left)}:${structuralKey(node.right)}`;
        case "sub": return `sub:${structuralKey(node.left)}:${structuralKey(node.right)}`;
        case "mul": return `mul:${structuralKey(node.left)}:${structuralKey(node.right)}`;
        case "div": return `div:${structuralKey(node.left)}:${structuralKey(node.right)}`;
        case "pow": return `pow:${structuralKey(node.base)}:${structuralKey(node.exp)}`;
        case "sqrt": return `sqrt:${structuralKey(node.arg)}:${node.index ? structuralKey(node.index) : ""}`;
        case "abs": return `abs:${structuralKey(node.arg)}`;
        case "func": return `func:${node.name}:${structuralKey(node.arg)}:${node.base ? structuralKey(node.base) : ""}`;
        default: return "?";
    }
}

// Zerlegt einen Term in Vorfaktor und "Basis" (z.B. 3·x -> Vorfaktor 3, Basis x).
function extractCoefficient(node) {
    if (node.type === "mul") {
        if (node.left.type === "num") {
            const inner = extractCoefficient(node.right);
            return { coeff: node.left.value * inner.coeff, base: inner.base };
        }
        if (node.right.type === "num") {
            const inner = extractCoefficient(node.left);
            return { coeff: node.right.value * inner.coeff, base: inner.base };
        }
    }
    if (node.type === "div" && node.right.type === "num" && node.right.value !== 0) {
        const inner = extractCoefficient(node.left);
        return { coeff: inner.coeff / node.right.value, base: inner.base };
    }
    return { coeff: 1, base: node };
}

function combineAddSub(node) {
    const terms = [];
    flattenTerms(node, 1, terms);

    let constantSum = 0;
    let hasConstant = false;
    const symbolicTerms = [];

    terms.forEach(t => {
        if (t.node.type === "num") {
            constantSum += t.sign * t.node.value;
            hasConstant = true;
        } else {
            symbolicTerms.push(t);
        }
    });
    constantSum = exaktRunden(constantSum);

    // Gleichartige Terme zusammenfassen (z.B. 3x + 2x -> 5x, 2x − x -> x),
    // damit eine Variable auch bei mehreren Vorfaktoren isolierbar bleibt.
    const groups = [];
    const groupIndexByKey = new Map();

    symbolicTerms.forEach(t => {
        const { coeff, base } = extractCoefficient(t.node);
        const key = structuralKey(base);
        const signedCoeff = t.sign * coeff;

        if (groupIndexByKey.has(key)) {
            groups[groupIndexByKey.get(key)].coeff += signedCoeff;
        } else {
            groupIndexByKey.set(key, groups.length);
            groups.push({ base, coeff: signedCoeff });
        }
    });

    const combinedTerms = groups
        .map(g => ({ coeff: exaktRunden(g.coeff), base: g.base }))
        .filter(g => g.coeff !== 0)
        .map(g => {
            if (g.coeff === 1)  return { sign: 1,  node: g.base };
            if (g.coeff === -1) return { sign: -1, node: g.base };
            return g.coeff > 0
                ? { sign: 1,  node: { type: "mul", left: numNode(g.coeff), right: g.base } }
                : { sign: -1, node: { type: "mul", left: numNode(-g.coeff), right: g.base } };
        });

    if (combinedTerms.length === 0) return numNode(constantSum);

    // Bevorzugt einen positiven symbolischen Term als Start. Gibt es keinen,
    // aber eine positive Konstante, führt die Konstante (z.B. "5 − λ_2" statt
    // "−λ_2 + 5"). Nur wenn beides fehlt, wird der erste Term negiert.
    const firstPosIdx = combinedTerms.findIndex(t => t.sign === 1);
    const leadWithConstant = firstPosIdx === -1 && hasConstant && constantSum > 0;

    let result, remainingSymbolic;

    if (firstPosIdx !== -1) {
        result = combinedTerms[firstPosIdx].node;
        remainingSymbolic = combinedTerms.filter((_, i) => i !== firstPosIdx);
    } else if (leadWithConstant) {
        result = numNode(constantSum);
        remainingSymbolic = combinedTerms;
    } else {
        result = { type: "neg", arg: combinedTerms[0].node };
        remainingSymbolic = combinedTerms.slice(1);
    }

    remainingSymbolic.forEach(t => {
        result = t.sign === 1
            ? { type: "add", left: result, right: t.node }
            : { type: "sub", left: result, right: t.node };
    });

    if (hasConstant && constantSum !== 0 && !leadWithConstant) {
        result = constantSum > 0
            ? { type: "add", left: result, right: numNode(constantSum) }
            : { type: "sub", left: result, right: numNode(-constantSum) };
    }

    return result;
}

function simplify(node) {
    switch (node.type) {
        case "num": case "var": case "const":
            return node;

        case "neg": {
            const arg = simplify(node.arg);
            if (arg.type === "neg") return arg.arg;
            if (arg.type === "sub") return simplify({ type: "sub", left: arg.right, right: arg.left });
            if (arg.type === "num") return numNode(-arg.value);
            return { type: "neg", arg };
        }

        case "add":
        case "sub": {
            const left = simplify(node.left), right = simplify(node.right);
            return combineAddSub({ type: node.type, left, right });
        }

        case "mul": {
            const left = simplify(node.left), right = simplify(node.right);

            // Distributivgesetz: a·(b±c) -> a·b ± a·c (und gespiegelt (b±c)·a)
            if (left.type === "add" || left.type === "sub") {
                return simplify({ type: left.type, left: { type: "mul", left: left.left, right }, right: { type: "mul", left: left.right, right } });
            }
            if (right.type === "add" || right.type === "sub") {
                return simplify({ type: right.type, left: { type: "mul", left, right: right.left }, right: { type: "mul", left, right: right.right } });
            }

            if (left.type === "num" && right.type === "num") return numNode(left.value * right.value);
            if (left.type === "num" && left.value === 0) return numNode(0);
            if (right.type === "num" && right.value === 0) return numNode(0);
            if (left.type === "num" && left.value === 1) return right;
            if (right.type === "num" && right.value === 1) return left;

            // Koeffizienten-Folding bei verschachtelter Multiplikation: a·(b·c) -> (a·b)·c,
            // falls a und b Zahlen sind – sonst bleiben z.B. 2·(3·x) und 6·x strukturell
            // verschieden und combineAddSub kann gleichartige Terme nicht zusammenfassen.
            if (left.type === "num" && right.type === "mul") {
                if (right.left.type === "num")  return simplify({ type: "mul", left: numNode(left.value * right.left.value),  right: right.right });
                if (right.right.type === "num") return simplify({ type: "mul", left: numNode(left.value * right.right.value), right: right.left });
            }
            if (right.type === "num" && left.type === "mul") {
                if (left.left.type === "num")  return simplify({ type: "mul", left: numNode(right.value * left.left.value),  right: left.right });
                if (left.right.type === "num") return simplify({ type: "mul", left: numNode(right.value * left.right.value), right: left.left });
            }

            return { type: "mul", left, right };
        }

        case "div": {
            const left = simplify(node.left), right = simplify(node.right);

            // Distribution bei Division durch eine Zahl: (a±b)/c -> a/c ± b/c
            if ((left.type === "add" || left.type === "sub") && right.type === "num" && right.value !== 0) {
                return simplify({ type: left.type, left: { type: "div", left: left.left, right }, right: { type: "div", left: left.right, right } });
            }

            if (left.type === "num" && right.type === "num" && right.value !== 0) return numNode(left.value / right.value);
            if (left.type === "num" && left.value === 0 && right.type !== "num") return numNode(0);
            if (right.type === "num" && right.value === 1) return left;
            return { type: "div", left, right };
        }

        case "pow": {
            const base = simplify(node.base), exp = simplify(node.exp);
            if (base.type === "num" && exp.type === "num") return numNode(Math.pow(base.value, exp.value));
            if (exp.type === "num" && exp.value === 1) return base;
            if (exp.type === "num" && exp.value === 0 && !(base.type === "num" && base.value === 0)) return numNode(1);
            return { type: "pow", base, exp };
        }

        case "sqrt": {
            const arg = simplify(node.arg);
            const index = node.index ? simplify(node.index) : null;
            const numeric = tryEvalNumeric({ type: "sqrt", arg, index });
            return numeric !== null ? numNode(numeric) : { type: "sqrt", arg, index };
        }

        case "abs": {
            const arg = simplify(node.arg);
            const numeric = tryEvalNumeric({ type: "abs", arg });
            return numeric !== null ? numNode(numeric) : { type: "abs", arg };
        }

        case "func": {
            const arg = simplify(node.arg);
            const base = node.base ? simplify(node.base) : null;
            const numeric = tryEvalNumeric({ type: "func", name: node.name, arg, base });
            return numeric !== null ? numNode(numeric) : { type: "func", name: node.name, arg, base };
        }

        default:
            return node;
    }
}


function tryEvalNumeric(node) {
    switch (node.type) {
        case "num": return node.value;
        case "const": return node.name === "pi" ? Math.PI : Math.E;
        case "var": return null;
        case "neg": { const a = tryEvalNumeric(node.arg); return a === null ? null : -a; }
        case "add": { const a = tryEvalNumeric(node.left), b = tryEvalNumeric(node.right); return (a === null || b === null) ? null : a + b; }
        case "sub": { const a = tryEvalNumeric(node.left), b = tryEvalNumeric(node.right); return (a === null || b === null) ? null : a - b; }
        case "mul": { const a = tryEvalNumeric(node.left), b = tryEvalNumeric(node.right); return (a === null || b === null) ? null : a * b; }
        case "div": { const a = tryEvalNumeric(node.left), b = tryEvalNumeric(node.right); return (a === null || b === null || b === 0) ? null : a / b; }
        case "pow": {
            const a = tryEvalNumeric(node.base), b = tryEvalNumeric(node.exp);
            if (a === null || b === null) return null;
            if (a < 0 && !Number.isInteger(b)) return null; // z.B. (-4)^0.5 ist nicht reell
            return Math.pow(a, b);
        }
        case "sqrt": {
            const a = tryEvalNumeric(node.arg);
            const n = node.index ? tryEvalNumeric(node.index) : 2;
            if (a === null || n === null || (a < 0 && n % 2 === 0)) return null;
            return a < 0 ? -Math.pow(-a, 1 / n) : Math.pow(a, 1 / n);
        }
        case "abs": { const a = tryEvalNumeric(node.arg); return a === null ? null : Math.abs(a); }
        case "func": {
            const a = tryEvalNumeric(node.arg);
            if (a === null) return null;
            switch (node.name) {
                case "sin": return Math.sin(a);
                case "cos": return Math.cos(a);
                case "tan": return Math.tan(a);
                case "asin": return (a < -1 || a > 1) ? null : Math.asin(a);
                case "acos": return (a < -1 || a > 1) ? null : Math.acos(a);
                case "atan": return Math.atan(a);
                case "ln": return a > 0 ? Math.log(a) : null;
                case "exp": return Math.exp(a);
                case "log": {
                    const base = node.base ? tryEvalNumeric(node.base) : 10;
                    return (base === null || base <= 0 || base === 1 || a <= 0) ? null : Math.log(a) / Math.log(base);
                }
                default: return null;
            }
        }
        default: return null;
    }
}


//RENDERER

const FUNC_LABELS = {
    sin: "sin", cos: "cos", tan: "tan",
    asin: "sin⁻¹", acos: "cos⁻¹", atan: "tan⁻¹",
    ln: "ln", log: "log", exp: "exp"
};

const FUNC_INVERSE = {
    sin: "asin", cos: "acos", tan: "atan",
    asin: "sin", acos: "cos", atan: "tan",
    ln: "exp", exp: "ln"
};

function formatVarName(name) {
    const idx = name.indexOf("_");
    if (idx === -1) return name;
    return `${name.slice(0, idx)}<sub>${name.slice(idx + 1)}</sub>`;
}

function formatNumber(node) {
    return node.raw !== undefined && node.raw !== null ? node.raw : String(node.value);
}

function renderExpr(node) {
    switch (node.type) {
        case "num": return formatNumber(node);
        case "const": return node.name === "pi" ? "π" : "e";
        case "var": return formatVarName(node.name);

        case "neg": {
            const a = node.arg;
            const inner = (a.type === "add" || a.type === "sub") ? `(${renderExpr(a)})` : renderExpr(a);
            return `−${inner}`;
        }

        case "add":
            return `${renderExpr(node.left)} + ${renderExpr(node.right)}`;

        case "sub": {
            const r = (node.right.type === "add" || node.right.type === "sub")
                ? `(${renderExpr(node.right)})` : renderExpr(node.right);
            return `${renderExpr(node.left)} − ${r}`;
        }

        case "mul": {
            const wrap = (n) => (n.type === "add" || n.type === "sub" || n.type === "neg") ? `(${renderExpr(n)})` : renderExpr(n);
            return `${wrap(node.left)} · ${wrap(node.right)}`;
        }

        case "div":
            return `<span class="fu-frac"><span class="fu-frac-num">${renderExpr(node.left)}</span><span class="fu-frac-bar"></span><span class="fu-frac-den">${renderExpr(node.right)}</span></span>`;

        case "pow": {
            const b = node.base;
            const wrapBase = (
                b.type === "add" || b.type === "sub" || b.type === "mul" ||
                b.type === "div" || b.type === "neg" || b.type === "pow" ||
                (b.type === "num" && b.value < 0)
            );
            const baseHtml = wrapBase ? `(${renderExpr(b)})` : renderExpr(b);
            return `${baseHtml}<sup class="fu-exp">${renderExpr(node.exp)}</sup>`;
        }

        case "sqrt": {
            const idx = node.index ? `<sup class="fu-sqrt-index">${renderExpr(node.index)}</sup>` : "";
            return `<span class="fu-sqrt">${idx}<span class="fu-sqrt-symbol">√</span><span class="fu-sqrt-radicand">${renderExpr(node.arg)}</span></span>`;
        }

        case "abs":
            return `<span class="fu-abs">${renderExpr(node.arg)}</span>`;

        case "func": {
            const label = FUNC_LABELS[node.name] || node.name;
            const baseHtml = node.base ? `<sub>${renderExpr(node.base)}</sub>` : "";
            return `${label}${baseHtml}(${renderExpr(node.arg)})`;
        }

        default:
            return "?";
    }
}

// Kompakte Operanden-Darstellung für die "| Operation"-Kurzschreibweise
// (setzt Klammern, damit z.B. ": 2 · π" nicht missverständlich wirkt)
function opnd(node) {
    if (node.type === "add" || node.type === "sub" || node.type === "mul" || node.type === "div" || node.type === "neg") {
        return `(${renderExpr(node)})`;
    }
    return renderExpr(node);
}


//SOLVER

function peelOnce(node, other, varName) {
    switch (node.type) {
        case "add": {
            const inLeft = containsVar(node.left, varName);
            const keep = inLeft ? node.left : node.right;
            const move = inLeft ? node.right : node.left;
            return {
                opLabel: `− ${opnd(move)}`,
                newSubject: keep,
                newOther: { type: "sub", left: other, right: move }
            };
        }

        case "sub": {
            if (containsVar(node.left, varName)) {
                const B = node.right;
                return {
                    opLabel: `+ ${opnd(B)}`,
                    newSubject: node.left,
                    newOther: { type: "add", left: other, right: B }
                };
            }
            const A = node.left;
            return {
                opLabel: `− ${opnd(A)}`,
                newSubject: { type: "neg", arg: node.right },
                newOther: { type: "sub", left: other, right: A }
            };
        }

        case "neg": {
            return {
                opLabel: `· (−1)`,
                newSubject: node.arg,
                newOther: { type: "neg", arg: other }
            };
        }

         case "mul": {
            const inLeft = containsVar(node.left, varName);
            const keep = inLeft ? node.left : node.right;
            const divisor = inLeft ? node.right : node.left;

            const divisorVal = tryEvalNumeric(divisor);
            if (divisorVal === 0) {
                return { domainError: "Division durch 0 ist nicht möglich." };
            }

            return {
                opLabel: `: ${opnd(divisor)}`,
                newSubject: keep,
                newOther: { type: "div", left: other, right: divisor },
                note: divisorVal === null ? `Angenommen, ${renderExpr(divisor)} ≠ 0.` : undefined
            };
        }

        case "div": {
            const A = node.left, B = node.right;

            const bVal = tryEvalNumeric(B);
            if (bVal === 0) {
                return { domainError: "Division durch 0 ist nicht möglich." };
            }

            return {
                opLabel: `· ${opnd(B)}`,
                newSubject: A,
                newOther: { type: "mul", left: other, right: B }
            };
        }
        case "pow": {
            const inBase = containsVar(node.base, varName);
            const inExp = containsVar(node.exp, varName);
            if (inBase && !inExp) {
                const isSquare = isConstNum(node.exp, 2);
                const expVal = node.exp.type === "num" ? node.exp.value : null;
                const isEven = expVal !== null && Number.isInteger(expVal) && expVal % 2 === 0;

                const otherVal = tryEvalNumeric(other);
                if (isEven && otherVal !== null && otherVal < 0) {
                    return { domainError: "Diese Gleichung hat keine reelle Lösung – eine gerade Potenz kann nicht negativ werden." };
                }

                return {
                    opLabel: isSquare ? `√` : `${opnd(node.exp)}√`,
                    newSubject: node.base,
                    newOther: { type: "sqrt", arg: other, index: isSquare ? null : node.exp },
                    note: isEven ? "Es wird der positive Lösungszweig angenommen." : undefined
                };
            }
            if (inExp && !inBase) {
                const baseIsTen = isConstNum(node.base, 10);

                const baseVal = tryEvalNumeric(node.base);
                if (baseVal !== null && (baseVal <= 0 || baseVal === 1)) {
                    return { domainError: "Diese Gleichung hat keine gültige Logarithmus-Basis (muss positiv und ≠ 1 sein)." };
                }
                const otherVal = tryEvalNumeric(other);
                if (otherVal !== null && otherVal <= 0) {
                    return { domainError: "Diese Gleichung hat keine reelle Lösung – der Logarithmus ist nur für positive Zahlen definiert." };
                }

                return {
                    opLabel: baseIsTen ? `log( )` : `log_${opnd(node.base)}( )`,
                    newSubject: node.exp,
                    newOther: { type: "func", name: "log", base: node.base, arg: other }
                };
            }
            return null; // Variable in Basis UND Exponent -> nicht unterstützt
        }

        case "sqrt": {
            if (!containsVar(node.arg, varName)) return null; // Variable im Wurzelindex -> nicht unterstützt
            const isSquare = !node.index;
            const n = node.index || { type: "num", value: 2, raw: "2" };

            const nVal = n.type === "num" ? n.value : null;
            const isEvenRoot = nVal !== null && Number.isInteger(nVal) && nVal % 2 === 0;
            const otherVal = tryEvalNumeric(other);
            if (isEvenRoot && otherVal !== null && otherVal < 0) {
                return { domainError: "Diese Gleichung hat keine reelle Lösung – eine Wurzel kann nicht negativ sein." };
            }

            return {
                opLabel: isSquare ? `( )²` : `( )^${opnd(n)}`,
                newSubject: node.arg,
                newOther: { type: "pow", base: other, exp: n }
            };
        }

        case "abs": {
            const otherVal = tryEvalNumeric(other);
            if (otherVal !== null && otherVal < 0) {
                return { domainError: "Diese Gleichung hat keine reelle Lösung – ein Betrag kann nicht negativ sein." };
            }
            return {
                opLabel: `Betrag auflösen`,
                newSubject: node.arg,
                newOther: other,
                note: "Angenommen, der Inhalt des Betrags ist ≥ 0."
            };
        }

        case "func": {
            if (node.name === "log") {
                const base = node.base || { type: "num", value: 10, raw: "10" };

                const baseVal = tryEvalNumeric(base);
                if (baseVal !== null && (baseVal <= 0 || baseVal === 1)) {
                    return { domainError: "Diese Gleichung hat keine gültige Logarithmus-Basis (muss positiv und ≠ 1 sein)." };
                }
                const otherVal = tryEvalNumeric(other);
                if (otherVal !== null && otherVal <= 0) {
                    return { domainError: "Diese Gleichung hat keine reelle Lösung – der Logarithmus ist nur für positive Zahlen definiert." };
                }

                return {
                    opLabel: `${opnd(base)}^( )`,
                    newSubject: node.arg,
                    newOther: { type: "pow", base, exp: other }
                };
            }
            const invName = FUNC_INVERSE[node.name];
            if (!invName) return null;

            const otherVal = tryEvalNumeric(other);
            if (node.name === "exp" && otherVal !== null && otherVal <= 0) {
                return { domainError: "Diese Gleichung hat keine reelle Lösung – der natürliche Logarithmus ist nur für positive Zahlen definiert." };
            }
            if ((node.name === "sin" || node.name === "cos") && otherVal !== null && (otherVal < -1 || otherVal > 1)) {
                return { domainError: "Diese Gleichung hat keine reelle Lösung – Sinus- und Kosinuswerte liegen immer zwischen −1 und 1." };
            }

            return {
                opLabel: `${FUNC_LABELS[invName]}( )`,
                newSubject: node.arg,
                newOther: { type: "func", name: invName, arg: other, base: null }
            };
        }

        default:
            return null;
    }
}



function isolate(eq, varName) {
    const steps = [];
    let curLeft = eq.left;
    let curRight = eq.right;

    if (!containsVar(curLeft, varName) && !containsVar(curRight, varName)) return null;

    // Variable auf BEIDEN Seiten (z.B. "5x + 2 = 3x + 10"): zuerst alle
    // Variablen-Terme der rechten Seite auf die linke bringen und
    // zusammenfassen ("Variablen zusammenfassen" wie in der Schule).
    if (containsVar(curLeft, varName) && containsVar(curRight, varName)) {
        const rightTerms = [];
        flattenTerms(curRight, 1, rightTerms);
        const rightVarTerm = rightTerms.find(t => containsVar(t.node, varName));

        const beforeLeft = curLeft, beforeRight = curRight;
        const opLabel = rightVarTerm.sign === 1 ? `− ${opnd(rightVarTerm.node)}` : `+ ${opnd(rightVarTerm.node)}`;
        const buildOp = rightVarTerm.sign === 1 ? "sub" : "add";

        const newLeft = simplify({ type: buildOp, left: curLeft, right: rightVarTerm.node });
        const newRight = simplify({ type: buildOp, left: curRight, right: rightVarTerm.node });

        if (countVarOccurrences(newLeft, varName) + countVarOccurrences(newRight, varName) !== 1) {
            return null;
        }

        steps.push({ beforeLeft, beforeRight, opLabel });
        curLeft = newLeft;
        curRight = newRight;
    }

    let guard = 0;
    while (!((curLeft.type === "var" && curLeft.name === varName) ||
             (curRight.type === "var" && curRight.name === varName))) {
        if (++guard > 60) return null; // Sicherheitsnetz gegen Endlosschleifen

        const varOnLeft = containsVar(curLeft, varName);
        const targetNode = varOnLeft ? curLeft : curRight;
        const otherNode = varOnLeft ? curRight : curLeft;

        // Sicherheitsnetz: peelOnce geht davon aus, dass die Variable NUR
        // im targetNode steckt. Mehrfach-Vorkommen innerhalb einer Seite
        // (z.B. "x + sin(x)"), die combineAddSub nicht zusammenfassen
        // konnte, würden sonst zu falschen Ergebnissen führen.
        if (countVarOccurrences(targetNode, varName) !== 1) return null;

        const result = peelOnce(targetNode, otherNode, varName);
        if (!result) return null;
        if (result.domainError) return { error: result.domainError };

        steps.push({ beforeLeft: curLeft, beforeRight: curRight, opLabel: result.opLabel, note: result.note });

        const newSubject = simplify(result.newSubject);
        const newOther = simplify(result.newOther);

        if (varOnLeft) { curLeft = newSubject; curRight = newOther; }
        else { curRight = newSubject; curLeft = newOther; }
    }

    const varIsLeft = curLeft.type === "var" && curLeft.name === varName;
    const headlineResult = varIsLeft ? curRight : curLeft;

    return { steps, finalLeft: curLeft, finalRight: curRight, headlineResult };
}

function canSolveFor(eq, varName) {
    if (countVarOccurrences(eq.left, varName) + countVarOccurrences(eq.right, varName) === 0) return false;
    return isolate(eq, varName) !== null;
}

function hasVarInSqrtIndex(node, varName) {
    if (!node) return false;
    if (node.type === "sqrt" && node.index && containsVar(node.index, varName)) return true;
    return getChildren(node).some(child => hasVarInSqrtIndex(child, varName));
}

function findSpecificSolveIssue(eq, varName) {
    const totalOccurrences = countVarOccurrences(eq.left, varName) + countVarOccurrences(eq.right, varName);

    if (totalOccurrences > 1) {
        return `Die Variable ${formatVarName(varName)} kommt mehrfach in der Gleichung vor (u. a. möglich, wenn sie gleichzeitig in Basis und Exponent auftritt). Aktuell können nur Gleichungen gelöst werden, in denen die gesuchte Variable genau einmal vorkommt.`;
    }
    if (totalOccurrences === 0) return null;

    if (hasVarInSqrtIndex(eq.left, varName) || hasVarInSqrtIndex(eq.right, varName)) {
        return `Die Variable ${formatVarName(varName)} befindet sich im Wurzelindex. Das Auflösen nach einer Variable an dieser Stelle wird aktuell nicht unterstützt.`;
    }

    return `Diese Art von Gleichung wird für ${formatVarName(varName)} aktuell noch nicht unterstützt.`;
}


// UI-ANBINDUNG MODUS 1 (Allgemeine Gleichungen)


document.addEventListener("DOMContentLoaded", () => {
    const selectVariable = document.getElementById("selectVariableAllgemein");
    const btn            = document.getElementById("buttonZahlenInput");
    const loesungOutput  = document.getElementById("loesungOutput");
    const tipp           = document.getElementById("tipp");
    const rechenwegDiv    = document.querySelector(".rechenwegDiv");

    if (!selectVariable || !btn) return;

    let currentEquationAllgemein = null;

    function resetOutputAllgemein() {
        loesungOutput.innerHTML = "";
        rechenwegOutput.innerHTML = "";
        rechenwegDiv.style.display = "none";
        tipp.textContent = "";
    }

    function disableSelectionAllgemein() {
        selectVariable.innerHTML = '<option value=""> ...</option>';
        selectVariable.disabled = true;
        btn.disabled = true;
    }

    function showErrorAllgemein(msg) {
        errorMessages.textContent = msg;
        errorMessages.style.display = "block";
        resetOutputAllgemein();
        disableSelectionAllgemein();
    }

    function hideErrorAllgemein() {
        errorMessages.style.display = "none";
    }

    function showSolveErrorAllgemein(msg) {
        errorMessages.textContent = msg;
        errorMessages.style.display = "block";
        loesungOutput.innerHTML = "";
        rechenwegOutput.innerHTML = "";
        rechenwegDiv.style.display = "none";
        tipp.textContent = "";
    }

    function analyzeFormulaAllgemein(latex) {
        resetOutputAllgemein();

        if (!latex || !latex.trim()) {
            hideErrorAllgemein();
            disableSelectionAllgemein();
            currentEquationAllgemein = null;
            return;
        }

        try {
            checkBlacklist(latex);
            const tokens = tokenize(latex);
            const eq = parseEquation(tokens);
            eq.left = simplify(eq.left);
            eq.right = simplify(eq.right);

            const varNames = collectVariableNames(eq);
            const solvable = varNames.filter(name => canSolveFor(eq, name));

            if (solvable.length === 0) {
                currentEquationAllgemein = null;
                disableSelectionAllgemein();
                hideErrorAllgemein();
                tipp.textContent = (varNames.length === 1 && findSpecificSolveIssue(eq, varNames[0]))
                    || "Diese Gleichung enthält keine Variable, die sich eindeutig isolieren lässt – z. B. weil eine Variable mehrfach vorkommt, im Wurzelindex steht oder gleichzeitig in Basis und Exponent auftritt.";
                return;
            }

            currentEquationAllgemein = eq;
            selectVariable.innerHTML = solvable
                .map(name => `<option value="${name}">${name.replace("_", " ")}</option>`)
                .join("");
            selectVariable.disabled = false;
            btn.disabled = false;
            hideErrorAllgemein();

        } catch (err) {
            currentEquationAllgemein = null;
            const msg = err instanceof FormulaError ? err.message : "Deine Formel konnte nicht verarbeitet werden. Bitte überprüfe die Eingabe.";
            showErrorAllgemein(msg);
        }
    }

    function renderSolutionAllgemein() {
        if (!currentEquationAllgemein) return;
        const varName = selectVariable.value;
        if (!varName) return;

        const result = isolate(currentEquationAllgemein, varName);
        if (!result) {
            showSolveErrorAllgemein("Diese Variable lässt sich mit den aktuell unterstützten Umformungen nicht isolieren.");
            return;
        }
        if (result.error) {
            showSolveErrorAllgemein(result.error);
            return;
        }

        hideErrorAllgemein();

        loesungOutput.innerHTML = `${formatVarName(varName)} = ${renderExpr(result.headlineResult)}`;

        const rows = result.steps.map(st => {
            const noteHtml = st.note ? `<div class="umformHinweis">${st.note}</div>` : "";
            return `
                <div class="umformZeile">
                    <span class="umformGleichung">${renderExpr(st.beforeLeft)} = ${renderExpr(st.beforeRight)}</span>
                    <span class="umformOperation">| ${st.opLabel}</span>
                </div>${noteHtml}`;
        }).join("");

        const finalRow = `
            <div class="umformZeile umformFinal">
                <span class="umformGleichung">${renderExpr(result.finalLeft)} = ${renderExpr(result.finalRight)}</span>
            </div>`;

        rechenwegOutput.innerHTML = `<div class="umformBox">${rows}${finalRow}</div>`;
        rechenwegDiv.style.display = "flex";
    }

    // ── MathLive-Feld anbinden ───────────────────────────────────────────
    customElements.whenDefined("math-field").then(() => {
        const mf = document.getElementById("mathInputAllgemein");
        if (!mf) return;

        try {
            if (window.mathVirtualKeyboard) {
                window.mathVirtualKeyboard.layouts = ["numeric", "alphabetic", "greek"];
            }
        } catch (e) { /* Version-abhängig, kein Blocker */ }

        let debounceTimer = null;
        mf.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => analyzeFormulaAllgemein(mf.value), 400);
        });

        mf.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (currentType === "allgemein") btn.click();
            }
        });
    });

    // Modus-Weiche: der Button ist zwischen beiden Modi geteilt.
    // "linear" wird in einer späteren Phase ergänzt.
    btn.addEventListener("click", () => {
        if (currentType === "allgemein") renderSolutionAllgemein();
    });

    disableSelectionAllgemein();
});


// MODUS 2 GRUNDGERÜST (Lineare Gleichungssysteme)


const selectVariableLinear = document.getElementById("selectVariableLinear");
const btnLoesen            = document.getElementById("buttonZahlenInput");
const loesungOutput        = document.getElementById("loesungOutput");
const tipp                 = document.getElementById("tipp");
const rechenwegDiv          = document.querySelector(".rechenwegDiv");

let currentLgsEquations = null; // Array aus { left, right } (bereits simplify()t)
let currentLgsVarNames  = null;

function resetOutputLinear() {
    loesungOutput.innerHTML = "";
    rechenwegOutput.innerHTML = "";
    rechenwegDiv.style.display = "none";
    tipp.textContent = "";
}

function disableLinearSolution() {
    selectVariableLinear.innerHTML = '<option value="all">Alle</option><option value="">...</option>';
    selectVariableLinear.disabled = true;
    if (currentType === "linear") btnLoesen.disabled = true;
}

// ── Linearitätsprüfung ────────────────────────────────────────────────────
// Prüft, ob ein Teilausdruck IRGENDEINE Variable enthält (unabhängig vom Namen).
function hasAnyVariable(node) {
    if (node.type === "var") return true;
    return getChildren(node).some(hasAnyVariable);
}

// Findet den ersten nichtlinearen Baustein (Produkt zweier Variablen,
// Variable im Exponenten/unter der Wurzel/in einer Funktion/im Nenner).
// Reine Additionen/Subtraktionen sowie Konstante·Variable bleiben linear.
function findNonlinearReason(node) {
    if (!node) return null;
    switch (node.type) {
        case "mul": {
            if (hasAnyVariable(node.left) && hasAnyVariable(node.right)) return "mul";
            return findNonlinearReason(node.left) || findNonlinearReason(node.right);
        }
        case "div":
            if (hasAnyVariable(node.right)) return "div";
            return findNonlinearReason(node.left) || findNonlinearReason(node.right);
        case "pow":
            if (hasAnyVariable(node.base) && !isConstNum(node.exp, 1)) return "pow";
            if (hasAnyVariable(node.exp)) return "pow";
            return findNonlinearReason(node.base) || findNonlinearReason(node.exp);
        case "sqrt":
            if (hasAnyVariable(node.arg)) return "sqrt";
            return findNonlinearReason(node.arg) || (node.index ? findNonlinearReason(node.index) : null);
        case "func":
            if (hasAnyVariable(node.arg)) return "func";
            return findNonlinearReason(node.arg) || (node.base ? findNonlinearReason(node.base) : null);
        case "abs":
            if (hasAnyVariable(node.arg)) return "abs";
            return findNonlinearReason(node.arg);
        default:
            for (const c of getChildren(node)) {
                const r = findNonlinearReason(c);
                if (r) return r;
            }
            return null;
    }
}

// ── Eine einzelne Zeile parsen ────────────────────────────────────────────
function parseLgsLine(latex, rowNumber) {
    if (!latex || !latex.trim()) {
        return { errorMsg: `Gleichung ${rowNumber}: Bitte gib eine vollständige Gleichung ein.` };
    }
    try {
        checkBlacklist(latex);
        const tokens = tokenize(latex);
        const eq = parseEquation(tokens);
        eq.left = simplify(eq.left);
        eq.right = simplify(eq.right);

        if (findNonlinearReason(eq.left) || findNonlinearReason(eq.right)) {
            return { errorMsg: `Gleichung ${rowNumber}: Diese Gleichungsart wird derzeit noch nicht unterstützt – im Modus „Lineare Gleichungssysteme" sind nur lineare Terme erlaubt (keine Multiplikation zweier Variablen, keine Potenzen, Wurzeln oder Funktionen einer Variable).` };
        }

        return { eq };
    } catch (err) {
        const msg = err instanceof FormulaError ? err.message : "Diese Gleichung konnte nicht verarbeitet werden. Bitte überprüfe die Eingabe.";
        return { errorMsg: `Gleichung ${rowNumber}: ${msg}` };
    }
}

function getLgsFields() {
    return Array.from(document.querySelectorAll(".lgsGleichungInput"));
}

// ── Gesamtes System validieren ────────────────────────────────────────────
function validateLinearSystem() {
    resetOutputLinear();
    hideError();

    const fields = getLgsFields();
    const allFilled = fields.every(f => f.value && f.value.trim() !== "");
    const equations = [];

    for (let i = 0; i < fields.length; i++) {
        const result = parseLgsLine(fields[i].value, i + 1);
        if (result.errorMsg) {
            currentLgsEquations = null;
            currentLgsVarNames = null;
            disableLinearSolution();
            // Fehler erst zeigen, wenn wirklich alle Felder befüllt sind –
            // sonst blitzt bei jeder Zwischeneingabe ein Fehler auf.
            if (allFilled) showError(result.errorMsg);
            return;
        }
        equations.push(result.eq);
    }

    const varSet = new Set();
    equations.forEach(eq => collectVariableNames(eq).forEach(name => varSet.add(name)));
    const varNames = Array.from(varSet);

    if (varNames.length === 0) {
        currentLgsEquations = null;
        currentLgsVarNames = null;
        disableLinearSolution();
        return;
    }

    if (equations.length < varNames.length) {
        currentLgsEquations = null;
        currentLgsVarNames = null;
        disableLinearSolution();
        showError("Die Anzahl der Gleichungen reicht nicht aus, um alle Variablen zu bestimmen.");
        return;
    }

    if (equations.length > varNames.length) {
        currentLgsEquations = null;
        currentLgsVarNames = null;
        disableLinearSolution();
        showError("Es befinden sich mehr Gleichungen als Variablen im System – dieser Fall wird aktuell noch nicht unterstützt.");
        return;
    }

    currentLgsEquations = equations;
    currentLgsVarNames  = varNames;

    selectVariableLinear.innerHTML = `<option value="all">Alle</option>` +
        varNames.map(name => `<option value="${name}">${name.replace("_", " ")}</option>`).join("");
    selectVariableLinear.disabled = false;
    if (currentType === "linear") btnLoesen.disabled = false;
    hideError();
}

// ── Eingabe-Events (Delegation, da Zeilen dynamisch hinzukommen) ─────────
let lgsDebounce = null;
container.addEventListener("input", (e) => {
    if (!e.target.classList || !e.target.classList.contains("lgsGleichungInput")) return;
    clearTimeout(lgsDebounce);
    lgsDebounce = setTimeout(validateLinearSystem, 400);
});

disableLinearSolution();



// EINSETZUNGSVERFAHREN – baut auf isolate()/simplify() aus der Formel-


// AST-Substitution: ersetzt jedes Vorkommen von varName durch replacement.
// Spiegelt exakt die Knotentypen aus getChildren()/simplify().
function substituteVar(node, varName, replacement) {
    switch (node.type) {
        case "num": case "const":
            return node;
        case "var":
            return node.name === varName ? replacement : node;
        case "add": case "sub": case "mul": case "div":
            return {
                type: node.type,
                left: substituteVar(node.left, varName, replacement),
                right: substituteVar(node.right, varName, replacement)
            };
        case "neg":
            return { type: "neg", arg: substituteVar(node.arg, varName, replacement) };
        case "pow":
            return {
                type: "pow",
                base: substituteVar(node.base, varName, replacement),
                exp: substituteVar(node.exp, varName, replacement)
            };
        case "sqrt":
            return {
                type: "sqrt",
                arg: substituteVar(node.arg, varName, replacement),
                index: node.index ? substituteVar(node.index, varName, replacement) : null
            };
        case "abs":
            return { type: "abs", arg: substituteVar(node.arg, varName, replacement) };
        case "func":
            return {
                type: "func", name: node.name,
                arg: substituteVar(node.arg, varName, replacement),
                base: node.base ? substituteVar(node.base, varName, replacement) : null
            };
        default:
            return node;
    }
}

// Erkennt, ob eine "übrig gebliebene" Gleichung bereits variablenfrei ist
// (z.B. "0 = 0" oder "0 = 5") und unterscheidet die beiden Schulfälle.
function findDegenerateMessage(eqs) {
    for (const eq of eqs) {
        if (collectVariableNames(eq).length === 0) {
            const l = tryEvalNumeric(eq.left);
            const r = tryEvalNumeric(eq.right);
            if (l !== null && r !== null) {
                return Math.abs(l - r) < 1e-9
                    ? "Dieses Gleichungssystem hat unendlich viele Lösungen."
                    : "Dieses Gleichungssystem hat keine Lösung.";
            }
        }
    }
    return null;
}

function solveLinearSystemSubstitution(equations, varNames, targetVar) {
    let eqs = equations.map(eq => ({ left: eq.left, right: eq.right }));
    let remainingVars = varNames.slice();
    const steps = [];
    const solvedValues = {};
    const eliminationOrder = [];
    // Zielvariable möglichst zuletzt eliminieren, damit sie am Ende direkt
    // (ohne Rückwärtseinsetzung) aus der letzten Gleichung folgt.
    const avoidVar = (targetVar && targetVar !== "all") ? targetVar : null;

    while (remainingVars.length > 0) {
        let chosen = null;
        const orderedVars = avoidVar && remainingVars.length > 1
            ? [...remainingVars.filter(v => v !== avoidVar), avoidVar]
            : remainingVars;

        for (let i = 0; i < eqs.length && !chosen; i++) {
            for (const vName of orderedVars) {
                if (canSolveFor(eqs[i], vName)) {
                    chosen = { eqIndex: i, varName: vName };
                    break;
                }
            }
        }

        if (!chosen) {
            return { error: findDegenerateMessage(eqs) || "Dieses Gleichungssystem lässt sich mit dem Einsetzungsverfahren aktuell nicht lösen." };
        }

        const { eqIndex, varName } = chosen;
        const isolated = isolate(eqs[eqIndex], varName);

        if (!isolated) {
            return { error: "Diese Variable lässt sich mit den aktuell unterstützten Umformungen nicht isolieren." };
        }
        if (isolated.error) {
            return { error: isolated.error };
        }

        const expr = simplify(isolated.headlineResult);
        steps.push({ type: "isolate", varName, isolateSteps: isolated.steps, resultExpr: expr });

        eqs.splice(eqIndex, 1);
        remainingVars = remainingVars.filter(v => v !== varName);

        const applied = [];
        eqs = eqs.map(otherEq => {
            const leftHas  = containsVar(otherEq.left, varName);
            const rightHas = containsVar(otherEq.right, varName);
            if (!leftHas && !rightHas) return otherEq;

            const newLeft  = leftHas  ? simplify(substituteVar(otherEq.left,  varName, expr)) : otherEq.left;
            const newRight = rightHas ? simplify(substituteVar(otherEq.right, varName, expr)) : otherEq.right;
            applied.push({ after: { left: newLeft, right: newRight } });
            return { left: newLeft, right: newRight };
        });

        if (applied.length > 0) {
            steps.push({ type: "substitute", varName, expr, applied });
        }

        solvedValues[varName] = expr;
        eliminationOrder.push(varName);
    }

    // Rückwärts einsetzen: die zuletzt eliminierte Variable ist bereits eine
    // reine Zahl; ihr Wert wird nun in die vorherigen Ausdrücke eingesetzt.
    const finalValues = {};
    for (let i = eliminationOrder.length - 1; i >= 0; i--) {
        const vName = eliminationOrder[i];
        let expr = solvedValues[vName];
        for (const [otherVar, otherVal] of Object.entries(finalValues)) {
            if (containsVar(expr, otherVar)) {
                expr = simplify(substituteVar(expr, otherVar, otherVal));
            }
        }
        finalValues[vName] = expr;
        if (avoidVar && vName === avoidVar) break; // Rest wird für die Zielvariable nicht mehr gebraucht
    }

    return { steps, values: finalValues, eliminationOrder };
}

// ── Rechenweg-Rendering (gleiche Notation wie Modus 1: umformZeile/umformBox) ──
function renderLgsSubstitutionRechenweg(equations, result, targetVar, varNames) {
    let html = `<div class="lgsSchrittTitel">Ausgangssystem</div><div class="umformBox">`;
    equations.forEach((eq, i) => {
        html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(eq.left)} = ${renderExpr(eq.right)}</span><span class="umformOperation">(${i + 1})</span></div>`;
    });
    html += `</div>`;

    result.steps.forEach(step => {
        if (step.type === "isolate") {
            html += `<div class="lgsSchrittTitel">Nach ${formatVarName(step.varName)} auflösen</div><div class="umformBox">`;
            step.isolateSteps.forEach(st => {
                const noteHtml = st.note ? `<div class="umformHinweis">${st.note}</div>` : "";
                html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(st.beforeLeft)} = ${renderExpr(st.beforeRight)}</span><span class="umformOperation">| ${st.opLabel}</span></div>${noteHtml}`;
            });
            html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(step.varName)} = ${renderExpr(step.resultExpr)}</span></div></div>`;
        } else if (step.type === "substitute") {
            html += `<div class="lgsSchrittTitel">${formatVarName(step.varName)} = ${renderExpr(step.expr)} einsetzen</div><div class="umformBox">`;
            step.applied.forEach(a => {
                html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(a.after.left)} = ${renderExpr(a.after.right)}</span></div>`;
            });
            html += `</div>`;
        }
    });

    html += `<div class="lgsSchrittTitel">Ergebnis</div><div class="umformBox">`;
    if (targetVar === "all") {
        varNames.forEach(vName => {
            html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(vName)} = ${renderExpr(result.values[vName])}</span></div>`;
        });
    } else {
        html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(targetVar)} = ${renderExpr(result.values[targetVar])}</span></div>`;
    }
    html += `</div>`;

    return html;
}

function showSolveErrorLinear(msg) {
    errorMessages.textContent = msg;
    errorMessages.style.display = "block";
    loesungOutput.innerHTML = "";
    rechenwegOutput.innerHTML = "";
    rechenwegDiv.style.display = "none";
    tipp.textContent = "";
}

// AUTOMATISCH – wählt anhand von Variablenanzahl und Gleichungsstruktur

function chooseAutomaticProcedure(equations, varNames) {
    const n = varNames.length;

    // Normalisierbarkeit zuerst prüfen: Gauß und Addition brauchen die
    // Koeffizientenform, Einsetzung kommt auch ohne sie aus.
    const canonicals = equations.map(normalizeToCanonical);
    if (canonicals.some(c => c === null)) {
        return { procedure: "substitution", reason: "Das Einsetzungsverfahren kommt mit der Struktur dieses Systems am besten zurecht." };
    }

    if (n >= 3) {
        return { procedure: "gaussian", reason: "Bei drei oder mehr Variablen bleibt das Gauß-Verfahren am übersichtlichsten." };
    }

    // Steht dieselbe Variable in mindestens zwei Gleichungen bereits pur
    // isoliert da (z.B. "y = 2x+3" und "y = -x+9")?
    const isolatedCount = {};
    equations.forEach(eq => {
        if (eq.left.type === "var")  isolatedCount[eq.left.name]  = (isolatedCount[eq.left.name]  || 0) + 1;
        if (eq.right.type === "var") isolatedCount[eq.right.name] = (isolatedCount[eq.right.name] || 0) + 1;
    });
    if (Object.values(isolatedCount).some(c => c >= 2)) {
        return { procedure: "equalization", reason: "Eine Variable steht in mehreren Gleichungen bereits isoliert – das Gleichsetzungsverfahren passt hier am besten." };
    }

    // Additionsverfahren ist konkurrenzlos günstig, wenn eine Variable ohne
    // jede Skalierung wegfällt (Koeffizienten bereits gleich oder exakt
    // entgegengesetzt) – das braucht dann nur eine Addition/Subtraktion,
    // keine einzige Multiplikation. Das schlägt selbst einen Koeffizienten von 1.
    if (n === 2) {
        const [c1, c2] = canonicals;
        const freeVar = varNames.find(v => {
            const { kA, kB } = computeEliminationFactors(c1.coeffs[v] || 0, c2.coeffs[v] || 0);
            return Math.abs(kA) === 1 && Math.abs(kB) === 1;
        });
        if (freeVar) {
            return { procedure: "addition", reason: `Bei ${formatVarName(freeVar)} heben sich die Koeffizienten direkt auf – das Additionsverfahren braucht hier keinerlei Skalierung.` };
        }
    }

    const hasUnitCoefficient = canonicals.some(c =>
        varNames.some(v => Math.abs(c.coeffs[v] || 0) === 1)
    );

    if (hasUnitCoefficient) {
        return { procedure: "substitution", reason: "Mindestens eine Variable hat den Koeffizienten 1 – das Einsetzungsverfahren führt hier am schnellsten zum Ziel." };
    }

    return { procedure: "addition", reason: "Da keine Variable den Koeffizienten 1 hat, vermeidet das Additionsverfahren unnötige Brüche beim Isolieren." };
}



// ── Klick-Handler (eigener Listener, rührt Phase-2-Code für "allgemein" nicht an) ──
btnLoesen.addEventListener("click", () => {
    if (currentType !== "linear") return;
    if (!currentLgsEquations || !currentLgsVarNames) return;

    const targetVar = selectVariableLinear.value;
    if (!targetVar) return;

    let verfahren = procedureSelect.value;
    let autoNote = "";

    if (verfahren === "automatic") {
        const choice = chooseAutomaticProcedure(currentLgsEquations, currentLgsVarNames);
        verfahren = choice.procedure;
        const verfahrenNamen = {
            substitution: "Einsetzungsverfahren",
            equalization: "Gleichsetzungsverfahren",
            addition: "Additionsverfahren",
            gaussian: "Gauß-Verfahren"
        };
        autoNote = `<div class="lgsAutoNote"><strong>Automatisch gewählt: ${verfahrenNamen[verfahren]}.</strong> ${choice.reason}</div>`;
    }

    let result, rechenwegHtml;

    if (verfahren === "substitution") {
        result = solveLinearSystemSubstitution(currentLgsEquations, currentLgsVarNames, targetVar);
        if (!result.error) rechenwegHtml = renderLgsSubstitutionRechenweg(currentLgsEquations, result, targetVar, currentLgsVarNames);
    } else if (verfahren === "equalization") {
        result = solveLinearSystemEqualization(currentLgsEquations, currentLgsVarNames, targetVar);
        if (!result.error) rechenwegHtml = renderLgsEqualizationRechenweg(currentLgsEquations, result, targetVar, currentLgsVarNames);
    } else if (verfahren === "addition") {
        result = solveLinearSystemAddition(currentLgsEquations, currentLgsVarNames, targetVar);
        if (!result.error) rechenwegHtml = renderLgsAdditionRechenweg(currentLgsEquations, result, targetVar, currentLgsVarNames);
    } else if (verfahren === "gaussian") {
        result = solveLinearSystemGauss(currentLgsEquations, currentLgsVarNames, targetVar);
        if (!result.error) rechenwegHtml = renderLgsGaussRechenweg(currentLgsEquations, result, targetVar, currentLgsVarNames);
    } else {
        showSolveErrorLinear("Dieses Lösungsverfahren ist aktuell nicht verfügbar.");
        return;
    }

    if (result.error) {
        showSolveErrorLinear(result.error);
        return;
    }

    hideError();

    if (targetVar === "all") {
        loesungOutput.innerHTML = currentLgsVarNames
            .map(vName => `${formatVarName(vName)} = ${renderExpr(result.values[vName])}`)
            .join(", &nbsp; ");
    } else {
        loesungOutput.innerHTML = `${formatVarName(targetVar)} = ${renderExpr(result.values[targetVar])}`;
    }

    rechenwegOutput.innerHTML = autoNote + rechenwegHtml;
    rechenwegDiv.style.display = "flex";
});



// GLEICHSETZUNGSVERFAHREN – isoliert dieselbe Variable in allen Gleichungen,


function solveLinearSystemEqualization(equations, varNames, targetVar) {
    let eqs = equations.map(eq => ({ left: eq.left, right: eq.right }));
    let remainingVars = varNames.slice();
    const steps = [];
    const isolatedExprByVar = {};
    const eliminationOrder = [];
    const avoidVar = (targetVar && targetVar !== "all") ? targetVar : null;

    while (eqs.length > 1) {
        let chosenVar = null;
        let chosenIndices = null;
        const orderedVars = avoidVar && remainingVars.length > 1
            ? [...remainingVars.filter(v => v !== avoidVar), avoidVar]
            : remainingVars;

        for (const vName of orderedVars) {
            const containingIdx = [];
            let allIsolatable = true;

            eqs.forEach((eq, i) => {
                const hasVar = containsVar(eq.left, vName) || containsVar(eq.right, vName);
                if (hasVar) {
                    containingIdx.push(i);
                    if (!canSolveFor(eq, vName)) allIsolatable = false;
                }
            });

            if (allIsolatable && containingIdx.length >= 2) {
                chosenVar = vName;
                chosenIndices = containingIdx;
                break;
            }
        }

        if (!chosenVar) {
            return { error: findDegenerateMessage(eqs) || "Dieses Gleichungssystem lässt sich mit dem Gleichsetzungsverfahren aktuell nicht lösen." };
        }

        const isolatedResults = chosenIndices.map(i => ({ idx: i, result: isolate(eqs[i], chosenVar) }));
        for (const ir of isolatedResults) {
            if (!ir.result) return { error: "Diese Variable lässt sich mit den aktuell unterstützten Umformungen nicht isolieren." };
            if (ir.result.error) return { error: ir.result.error };
        }

        const exprs = isolatedResults.map(ir => simplify(ir.result.headlineResult));

        steps.push({
            type: "isolateMultiple",
            varName: chosenVar,
            entries: isolatedResults.map((ir, k) => ({ isolateSteps: ir.result.steps, resultExpr: exprs[k] }))
        });

        const newEquations = [];
        for (let k = 1; k < exprs.length; k++) {
            newEquations.push({ left: exprs[0], right: exprs[k] });
        }
        steps.push({ type: "equalize", varName: chosenVar, newEquations });

        isolatedExprByVar[chosenVar] = exprs[0];

        const remainingEqs = eqs.filter((_, i) => !chosenIndices.includes(i));
        eqs = [...remainingEqs, ...newEquations];
        remainingVars = remainingVars.filter(v => v !== chosenVar);
        eliminationOrder.push(chosenVar);
    }

    if (eqs.length !== 1 || remainingVars.length !== 1) {
        return { error: "Dieses Gleichungssystem lässt sich mit dem Gleichsetzungsverfahren aktuell nicht lösen." };
    }

    const lastVar = remainingVars[0];
    const finalIsolate = isolate(eqs[0], lastVar);
    if (!finalIsolate) return { error: "Diese Variable lässt sich mit den aktuell unterstützten Umformungen nicht isolieren." };
    if (finalIsolate.error) return { error: finalIsolate.error };

    const lastValue = simplify(finalIsolate.headlineResult);
    steps.push({ type: "finalSolve", varName: lastVar, isolateSteps: finalIsolate.steps, resultExpr: lastValue });

    const values = { [lastVar]: lastValue };
    for (let i = eliminationOrder.length - 1; i >= 0; i--) {
        if (avoidVar && Object.prototype.hasOwnProperty.call(values, avoidVar)) break;
        const vName = eliminationOrder[i];
        let expr = isolatedExprByVar[vName];
        for (const [otherVar, otherVal] of Object.entries(values)) {
            if (containsVar(expr, otherVar)) {
                expr = simplify(substituteVar(expr, otherVar, otherVal));
            }
        }
        values[vName] = expr;
    }

    return { steps, values, eliminationOrder: [...eliminationOrder, lastVar] };
}

// ── Rechenweg-Rendering (gleiche umformZeile/umformBox-Notation) ──────────
function renderLgsEqualizationRechenweg(equations, result, targetVar, varNames) {
    let html = `<div class="lgsSchrittTitel">Ausgangssystem</div><div class="umformBox">`;
    equations.forEach((eq, i) => {
        html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(eq.left)} = ${renderExpr(eq.right)}</span><span class="umformOperation">(${i + 1})</span></div>`;
    });
    html += `</div>`;

    result.steps.forEach(step => {
        if (step.type === "isolateMultiple") {
            html += `<div class="lgsSchrittTitel">Nach ${formatVarName(step.varName)} auflösen</div>`;
            step.entries.forEach(entry => {
                html += `<div class="umformBox">`;
                entry.isolateSteps.forEach(st => {
                    const noteHtml = st.note ? `<div class="umformHinweis">${st.note}</div>` : "";
                    html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(st.beforeLeft)} = ${renderExpr(st.beforeRight)}</span><span class="umformOperation">| ${st.opLabel}</span></div>${noteHtml}`;
                });
                html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(step.varName)} = ${renderExpr(entry.resultExpr)}</span></div></div>`;
            });
        } else if (step.type === "equalize") {
            html += `<div class="lgsSchrittTitel">Gleichsetzen (${formatVarName(step.varName)})</div><div class="umformBox">`;
            step.newEquations.forEach(eq => {
                html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(eq.left)} = ${renderExpr(eq.right)}</span></div>`;
            });
            html += `</div>`;
        } else if (step.type === "finalSolve") {
            html += `<div class="lgsSchrittTitel">Nach ${formatVarName(step.varName)} auflösen</div><div class="umformBox">`;
            step.isolateSteps.forEach(st => {
                const noteHtml = st.note ? `<div class="umformHinweis">${st.note}</div>` : "";
                html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(st.beforeLeft)} = ${renderExpr(st.beforeRight)}</span><span class="umformOperation">| ${st.opLabel}</span></div>${noteHtml}`;
            });
            html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(step.varName)} = ${renderExpr(step.resultExpr)}</span></div></div>`;
        }
    });

    html += `<div class="lgsSchrittTitel">Ergebnis</div><div class="umformBox">`;
    if (targetVar === "all") {
        varNames.forEach(vName => {
            html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(vName)} = ${renderExpr(result.values[vName])}</span></div>`;
        });
    } else {
        html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(targetVar)} = ${renderExpr(result.values[targetVar])}</span></div>`;
    }
    html += `</div>`;

    return html;
}




// ADDITIONSVERFAHREN – normalisiert Gleichungen zu Koeffizienten pro


// Zerlegt eine Gleichung in Koeffizienten pro Variable + Konstante.
// Gibt null zurück, wenn ein Term nicht in "Zahl · Variable"-Form vorliegt
// (z.B. eine Variable im Nenner) – aktuell nicht normalisierbar.
function normalizeToCanonical(eq) {
    const diffTerms = [];
    flattenTerms(eq.left, 1, diffTerms);
    flattenTerms(eq.right, -1, diffTerms);

    let constantSum = 0;
    const coeffs = {};

    for (const t of diffTerms) {
        if (t.node.type === "num") {
            constantSum += t.sign * t.node.value;
            continue;
        }
        const { coeff, base } = extractCoefficient(t.node);
        if (base.type !== "var") return null;
        coeffs[base.name] = exaktRunden((coeffs[base.name] || 0) + t.sign * coeff);
    }

    return { coeffs, constant: exaktRunden(-constantSum) };
}

function gcdNum(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b > 1e-9) { const t = a % b; a = b; b = t; }
    return a || 1;
}

// Berechnet Faktoren kA, kB mit kA·cA + kB·cB = 0 (die Variable hebt sich
// beim Addieren auf), bevorzugt kleine ganzzahlige Faktoren via ggT.
function computeEliminationFactors(cA, cB) {
    if (Number.isInteger(cA) && Number.isInteger(cB)) {
        const g = gcdNum(cA, cB) || 1;
        let kA = exaktRunden(cB / g);
        let kB = exaktRunden(-cA / g);
        if (kA < 0) { kA = -kA; kB = -kB; }
        return { kA, kB };
    }
    return { kA: cB, kB: -cA };
}

function formatFactorForDisplay(k) {
    return k < 0 ? `(${k})` : `${k}`;
}

function scaleEquation(eq, factor) {
    if (factor === 1) return { left: eq.left, right: eq.right };
    if (factor === -1) {
        return {
            left: simplify({ type: "neg", arg: eq.left }),
            right: simplify({ type: "neg", arg: eq.right })
        };
    }
    const mulNode = (n) => simplify({ type: "mul", left: numNode(factor), right: n });
    return { left: mulNode(eq.left), right: mulNode(eq.right) };
}

function addEquations(eqA, eqB) {
    return {
        left: simplify({ type: "add", left: eqA.left, right: eqB.left }),
        right: simplify({ type: "add", left: eqA.right, right: eqB.right })
    };
}

function solveLinearSystemAddition(equations, varNames, targetVar) {
    let workingEquations = equations.map(eq => ({ left: eq.left, right: eq.right }));
    let remainingVars = varNames.slice();
    const steps = [];
    const referenceEquations = {};
    const eliminationOrder = [];
    const avoidVar = (targetVar && targetVar !== "all") ? targetVar : null;

    while (workingEquations.length > 1) {
        let chosenVar = null;
        let candidates = null;
        const orderedVars = avoidVar && remainingVars.length > 1
            ? [...remainingVars.filter(v => v !== avoidVar), avoidVar]
            : remainingVars;

        for (const vName of orderedVars) {
            const found = [];
            let normalizationFailed = false;

            workingEquations.forEach((eq, i) => {
                const canon = normalizeToCanonical(eq);
                if (canon === null) { normalizationFailed = true; return; }
                const c = canon.coeffs[vName] || 0;
                if (c !== 0) found.push({ index: i, coeff: c });
            });

            if (normalizationFailed) {
                return { error: "Dieses Gleichungssystem enthält Terme, die für das Additionsverfahren aktuell nicht verarbeitet werden können (z. B. eine Variable im Nenner)." };
            }

            if (found.length >= 2) {
                chosenVar = vName;
                candidates = found;
                break;
            }
        }

        if (!chosenVar) {
            return { error: findDegenerateMessage(workingEquations) || "Dieses Gleichungssystem lässt sich mit dem Additionsverfahren aktuell nicht lösen." };
        }

        // Pivot = erste Gleichung mit dieser Variable; ALLE weiteren
        // Gleichungen mit dieser Variable werden paarweise gegen den Pivot
        // eliminiert, damit die Variable wirklich überall verschwindet
        // (nicht nur aus einem einzelnen Paar).
        const pivot = candidates[0];
        const pivotEq = workingEquations[pivot.index];
        const eliminationSteps = [];
        const newEquations = [];

        for (let k = 1; k < candidates.length; k++) {
            const other = candidates[k];
            const otherEq = workingEquations[other.index];
            const { kA, kB } = computeEliminationFactors(pivot.coeff, other.coeff);

            const scaledA = scaleEquation(pivotEq, kA);
            const scaledB = scaleEquation(otherEq, kB);
            const newEq = addEquations(scaledA, scaledB);

            if (containsVar(newEq.left, chosenVar) || containsVar(newEq.right, chosenVar)) {
                return { error: "Dieses Gleichungssystem lässt sich mit dem Additionsverfahren aktuell nicht lösen." };
            }

            eliminationSteps.push({ eqA: pivotEq, eqB: otherEq, kA, kB, scaledA, scaledB, newEq });
            newEquations.push(newEq);
        }

        steps.push({ type: "eliminate", varName: chosenVar, eliminationSteps });
        referenceEquations[chosenVar] = pivotEq;

        const involvedIndices = candidates.map(c => c.index);
        const keepIndices = workingEquations.map((_, i) => i).filter(i => !involvedIndices.includes(i));
        workingEquations = [...keepIndices.map(i => workingEquations[i]), ...newEquations];
        remainingVars = remainingVars.filter(v => v !== chosenVar);
        eliminationOrder.push(chosenVar);
    }

    if (workingEquations.length !== 1 || remainingVars.length !== 1) {
        return { error: "Dieses Gleichungssystem lässt sich mit dem Additionsverfahren aktuell nicht lösen." };
    }

    const lastVar = remainingVars[0];
    const finalIsolate = isolate(workingEquations[0], lastVar);
    if (!finalIsolate) return { error: "Diese Variable lässt sich mit den aktuell unterstützten Umformungen nicht isolieren." };
    if (finalIsolate.error) return { error: finalIsolate.error };

    const values = { [lastVar]: simplify(finalIsolate.headlineResult) };
    steps.push({ type: "finalSolve", varName: lastVar, isolateSteps: finalIsolate.steps, resultExpr: values[lastVar] });

    for (let i = eliminationOrder.length - 1; i >= 0; i--) {
        if (avoidVar && Object.prototype.hasOwnProperty.call(values, avoidVar)) break;
        const vName = eliminationOrder[i];
        let refEq = referenceEquations[vName];
        const substSteps = [];

        Object.entries(values).forEach(([otherVar, otherVal]) => {
            if (containsVar(refEq.left, otherVar) || containsVar(refEq.right, otherVar)) {
                refEq = {
                    left: simplify(substituteVar(refEq.left, otherVar, otherVal)),
                    right: simplify(substituteVar(refEq.right, otherVar, otherVal))
                };
                substSteps.push({ varName: otherVar, value: otherVal, afterEq: refEq });
            }
        });

        const backIsolate = isolate(refEq, vName);
        if (!backIsolate) return { error: "Diese Variable lässt sich mit den aktuell unterstützten Umformungen nicht isolieren." };
        if (backIsolate.error) return { error: backIsolate.error };

        values[vName] = simplify(backIsolate.headlineResult);
        steps.push({ type: "backSubstitute", varName: vName, refEq: referenceEquations[vName], substSteps, isolateSteps: backIsolate.steps, resultExpr: values[vName] });
    }

    return { steps, values, eliminationOrder: [...eliminationOrder, lastVar] };
}

// ── Rechenweg-Rendering ────────────────────────────────────────────────────
function renderLgsAdditionRechenweg(equations, result, targetVar, varNames) {
    let html = `<div class="lgsSchrittTitel">Ausgangssystem</div><div class="umformBox">`;
    equations.forEach((eq, i) => {
        html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(eq.left)} = ${renderExpr(eq.right)}</span><span class="umformOperation">(${i + 1})</span></div>`;
    });
    html += `</div>`;

    result.steps.forEach(step => {
        if (step.type === "eliminate") {
            html += `<div class="lgsSchrittTitel">${formatVarName(step.varName)} eliminieren</div>`;
            step.eliminationSteps.forEach(sub => {
                html += `<div class="umformBox">`;
                const labelA = sub.kA === 1 ? "" : ` &nbsp;| &middot; ${formatFactorForDisplay(sub.kA)}`;
                const labelB = sub.kB === 1 ? "" : ` &nbsp;| &middot; ${formatFactorForDisplay(sub.kB)}`;

                html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(sub.eqA.left)} = ${renderExpr(sub.eqA.right)}</span><span class="umformOperation">I${labelA}</span></div>`;
                html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(sub.eqB.left)} = ${renderExpr(sub.eqB.right)}</span><span class="umformOperation">II${labelB}</span></div>`;

                if (sub.kA !== 1 || sub.kB !== 1) {
                    html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(sub.scaledA.left)} = ${renderExpr(sub.scaledA.right)}</span><span class="umformOperation">I'</span></div>`;
                    html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(sub.scaledB.left)} = ${renderExpr(sub.scaledB.right)}</span><span class="umformOperation">II'</span></div>`;
                }

                html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${renderExpr(sub.newEq.left)} = ${renderExpr(sub.newEq.right)}</span><span class="umformOperation">I' + II'</span></div>`;
                html += `</div>`;
            });
        } else if (step.type === "finalSolve" || step.type === "backSubstitute") {
            const titel = step.type === "finalSolve"
                ? `Nach ${formatVarName(step.varName)} auflösen`
                : `${formatVarName(step.varName)} durch Einsetzen bestimmen`;
            html += `<div class="lgsSchrittTitel">${titel}</div><div class="umformBox">`;

            if (step.type === "backSubstitute") {
                html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(step.refEq.left)} = ${renderExpr(step.refEq.right)}</span></div>`;
                step.substSteps.forEach(s => {
                    html += `<div class="umformZeile"><span class="umformGleichung">${formatVarName(s.varName)} = ${renderExpr(s.value)} einsetzen: ${renderExpr(s.afterEq.left)} = ${renderExpr(s.afterEq.right)}</span></div>`;
                });
            }

            step.isolateSteps.forEach(st => {
                const noteHtml = st.note ? `<div class="umformHinweis">${st.note}</div>` : "";
                html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(st.beforeLeft)} = ${renderExpr(st.beforeRight)}</span><span class="umformOperation">| ${st.opLabel}</span></div>${noteHtml}`;
            });
            html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(step.varName)} = ${renderExpr(step.resultExpr)}</span></div></div>`;
        }
    });

    html += `<div class="lgsSchrittTitel">Ergebnis</div><div class="umformBox">`;
    if (targetVar === "all") {
        varNames.forEach(vName => {
            html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(vName)} = ${renderExpr(result.values[vName])}</span></div>`;
        });
    } else {
        html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(targetVar)} = ${renderExpr(result.values[targetVar])}</span></div>`;
    }
    html += `</div>`;

    return html;
}



// GAUSS-VERFAHREN – klassische Vorwärtselimination auf der erweiterten


const ROW_LABELS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function formatGaussNum(n) {
    return exaktRunden(n).toString().replace("-", "−");
}

// Baut aus einer Matrixzeile [c1, c2, ..., cn, konstante] wieder eine
// AST-Gleichung "c1·var1 + c2·var2 + ... = konstante" für isolate().
function rowToEquationNode(row, varNames) {
    const n = varNames.length;
    let leftNode = null;
    for (let j = 0; j < n; j++) {
        const c = row[j];
        if (c === 0) continue;
        const term = c === 1
            ? { type: "var", name: varNames[j] }
            : { type: "mul", left: numNode(c), right: { type: "var", name: varNames[j] } };
        leftNode = leftNode === null ? term : { type: "add", left: leftNode, right: term };
    }
    if (leftNode === null) leftNode = numNode(0);
    return { left: simplify(leftNode), right: numNode(row[n]) };
}

function solveLinearSystemGauss(equations, varNames, targetVar) {
    // Zielvariable als letzte Spalte einsortieren: löst sich dadurch als
    // letzte Zeile direkt (keine Rückwärtseinsetzung für andere Variablen nötig).
    const avoidVar = (targetVar && targetVar !== "all") ? targetVar : null;
    const orderedVarNames = avoidVar && varNames.includes(avoidVar)
        ? [...varNames.filter(v => v !== avoidVar), avoidVar]
        : varNames;
    const n = orderedVarNames.length;

    const initialMatrix = equations.map(eq => {
        const canon = normalizeToCanonical(eq);
        if (!canon) return null;
        return [...orderedVarNames.map(v => exaktRunden(canon.coeffs[v] || 0)), canon.constant];
    });

    if (initialMatrix.some(r => r === null)) {
        return { error: "Dieses Gleichungssystem enthält Terme, die für das Gauß-Verfahren aktuell nicht verarbeitet werden können (z. B. eine Variable im Nenner)." };
    }

    let matrix = initialMatrix.map(r => r.slice());
    let rowLabels = ROW_LABELS.slice(0, n);
    const steps = [];

    for (let pivotCol = 0; pivotCol < n; pivotCol++) {
        let pivotRow = pivotCol;
        let maxAbs = Math.abs(matrix[pivotRow][pivotCol]);
        for (let r = pivotCol + 1; r < n; r++) {
            if (Math.abs(matrix[r][pivotCol]) > maxAbs) {
                maxAbs = Math.abs(matrix[r][pivotCol]);
                pivotRow = r;
            }
        }

        if (maxAbs < 1e-9) {
            let hasContradiction = false;
            let hasRedundant = false;
            for (let r = pivotCol; r < n; r++) {
                const allZeroCoeffs = matrix[r].slice(pivotCol, n).every(c => Math.abs(c) < 1e-9);
                if (allZeroCoeffs) {
                    if (Math.abs(matrix[r][n]) > 1e-9) hasContradiction = true;
                    else hasRedundant = true;
                }
            }
            if (hasContradiction) return { error: "Dieses Gleichungssystem hat keine Lösung." };
            if (hasRedundant) return { error: "Dieses Gleichungssystem hat unendlich viele Lösungen." };
            return { error: "Dieses Gleichungssystem hat keine eindeutige Lösung." };
        }

        if (pivotRow !== pivotCol) {
            const labelA = rowLabels[pivotCol];
            const labelB = rowLabels[pivotRow];
            [matrix[pivotCol], matrix[pivotRow]] = [matrix[pivotRow], matrix[pivotCol]];
            [rowLabels[pivotCol], rowLabels[pivotRow]] = [rowLabels[pivotRow], rowLabels[pivotCol]];
            steps.push({ type: "swap", labelA, labelB, matrix: matrix.map(r => r.slice()), labels: rowLabels.slice() });
        }

        for (let r = pivotCol + 1; r < n; r++) {
            const factor = exaktRunden(matrix[r][pivotCol] / matrix[pivotCol][pivotCol]);
            if (factor === 0) continue;
            for (let c = pivotCol; c <= n; c++) {
                matrix[r][c] = exaktRunden(matrix[r][c] - factor * matrix[pivotCol][c]);
            }
            steps.push({
                type: "eliminate", targetRow: r, pivotRow: pivotCol, factor,
                matrix: matrix.map(rr => rr.slice()), labels: rowLabels.slice()
            });
        }
    }

    for (let i = 0; i < n; i++) {
        if (Math.abs(matrix[i][i]) < 1e-9) {
            return { error: "Dieses Gleichungssystem hat keine eindeutige Lösung." };
        }
    }

    const values = {};
    for (let i = n - 1; i >= 0; i--) {
        const vName = orderedVarNames[i];
        let eq = rowToEquationNode(matrix[i], orderedVarNames);
        const substApplied = [];

        for (let j = i + 1; j < n; j++) {
            const otherVar = orderedVarNames[j];
            const val = values[otherVar];
            if (containsVar(eq.left, otherVar) || containsVar(eq.right, otherVar)) {
                eq = {
                    left: simplify(substituteVar(eq.left, otherVar, val)),
                    right: simplify(substituteVar(eq.right, otherVar, val))
                };
                substApplied.push({ varName: otherVar, value: val, afterEq: eq });
            }
        }

        const isoResult = isolate(eq, vName);
        if (!isoResult) return { error: "Diese Variable lässt sich mit den aktuell unterstützten Umformungen nicht isolieren." };
        if (isoResult.error) return { error: isoResult.error };

        values[vName] = simplify(isoResult.headlineResult);
        steps.push({
            type: "backSubstitute", varName: vName,
            baseEq: rowToEquationNode(matrix[i], orderedVarNames),
            substApplied, isolateSteps: isoResult.steps, resultExpr: values[vName]
        });
        if (avoidVar && vName === avoidVar) break; // Rest wird für die Zielvariable nicht mehr gebraucht
    }

    return { steps, values, initialMatrix, initialLabels: ROW_LABELS.slice(0, n), varNamesUsed: orderedVarNames };
}

// ── Matrix-Rendering (eigene Tabellen-Notation neben umformBox) ──────────
function renderGaussMatrix(matrix, labels, varNames, opLabel) {
    const n = varNames.length;
    let html = `<div class="gaussMatrixBlock">`;
    if (opLabel) html += `<div class="gaussOpLabel">${opLabel}</div>`;
    html += `<table class="gaussMatrix"><thead><tr><td></td>`;
    varNames.forEach(v => { html += `<td class="gaussHeaderCell">${formatVarName(v)}</td>`; });
    html += `<td></td><td class="gaussHeaderCell">=</td></tr></thead><tbody>`;
    matrix.forEach((row, i) => {
        html += `<tr><td class="gaussRowLabel">${labels[i]}</td>`;
        for (let j = 0; j < n; j++) {
            html += `<td class="gaussCell">${formatGaussNum(row[j])}</td>`;
        }
        html += `<td class="gaussSep">|</td><td class="gaussCell gaussConst">${formatGaussNum(row[n])}</td></tr>`;
    });
    html += `</tbody></table></div>`;
    return html;
}

function renderLgsGaussRechenweg(equations, result, targetVar, varNames) {
    const matrixVarNames = result.varNamesUsed || varNames;

    let html = `<div class="lgsSchrittTitel">Ausgangssystem</div><div class="umformBox">`;
    equations.forEach((eq, i) => {
        html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(eq.left)} = ${renderExpr(eq.right)}</span><span class="umformOperation">(${result.initialLabels[i]})</span></div>`;
    });
    html += `</div>`;

    html += `<div class="lgsSchrittTitel">Erweiterte Koeffizientenmatrix</div>`;
    html += renderGaussMatrix(result.initialMatrix, result.initialLabels, matrixVarNames, null);

    result.steps.forEach(step => {
        if (step.type === "swap") {
            html += renderGaussMatrix(step.matrix, step.labels, matrixVarNames, `${step.labelA} ↔ ${step.labelB} tauschen`);
        } else if (step.type === "eliminate") {
            const labels = step.labels;
            const opSign = step.factor >= 0 ? "−" : "+";
            const absFactor = Math.abs(step.factor);
            const factorLabel = absFactor === 1 ? "" : `${formatGaussNum(absFactor)}·`;
            const opLabel = `${labels[step.targetRow]} → ${labels[step.targetRow]} ${opSign} ${factorLabel}${labels[step.pivotRow]}`;
            html += renderGaussMatrix(step.matrix, step.labels, matrixVarNames, opLabel);
        }
    });

    html += `<div class="lgsSchrittTitel">Rückwärtseinsetzen</div>`;
    result.steps.filter(s => s.type === "backSubstitute").forEach(step => {
        html += `<div class="umformBox">`;
        html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(step.baseEq.left)} = ${renderExpr(step.baseEq.right)}</span></div>`;
        step.substApplied.forEach(s => {
            html += `<div class="umformZeile"><span class="umformGleichung">${formatVarName(s.varName)} = ${renderExpr(s.value)} einsetzen: ${renderExpr(s.afterEq.left)} = ${renderExpr(s.afterEq.right)}</span></div>`;
        });
        step.isolateSteps.forEach(st => {
            const noteHtml = st.note ? `<div class="umformHinweis">${st.note}</div>` : "";
            html += `<div class="umformZeile"><span class="umformGleichung">${renderExpr(st.beforeLeft)} = ${renderExpr(st.beforeRight)}</span><span class="umformOperation">| ${st.opLabel}</span></div>${noteHtml}`;
        });
        html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(step.varName)} = ${renderExpr(step.resultExpr)}</span></div></div>`;
    });

    html += `<div class="lgsSchrittTitel">Ergebnis</div><div class="umformBox">`;
    if (targetVar === "all") {
        varNames.forEach(vName => {
            html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(vName)} = ${renderExpr(result.values[vName])}</span></div>`;
        });
    } else {
        html += `<div class="umformZeile umformFinal"><span class="umformGleichung">${formatVarName(targetVar)} = ${renderExpr(result.values[targetVar])}</span></div>`;
    }
    html += `</div>`;

    return html;
}