

class FormulaError extends Error {}

// Rundet auf 10 Nachkommastellen, um JS-Fließkommafehler zu eliminieren
// (gleiches Prinzip wie exaktRunden() im Zahlensystem-Umrechner).
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

// ==========================================================================
// 2. TOKENIZER
// ==========================================================================

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

// ==========================================================================
// 3. PARSER (rekursiver Abstieg, Grammatik = Whitelist)
// ==========================================================================

function parseEquation(tokens) {
    let pos = 0;
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
                advance();
                const e = parseExpression();
                expect("PIPE", "Die Betragsstriche wurden nicht geschlossen.");
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

// ==========================================================================
// 4. AST-HILFSFUNKTIONEN
// ==========================================================================

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

// ==========================================================================
// 5. SIMPLIFY (Doppel-Minus auflösen, Zahlen zusammenfassen – für einen
//    sauberen, schulischen Rechenweg statt "4 − 10" oder "−(−x)")
// ==========================================================================

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

    if (symbolicTerms.length === 0) return numNode(constantSum);

    // Bevorzugt einen positiven symbolischen Term als Start. Gibt es keinen,
    // aber eine positive Konstante, führt die Konstante (z.B. "5 − λ_2" statt
    // "−λ_2 + 5"). Nur wenn beides fehlt, wird der erste Term negiert.
    const firstPosIdx = symbolicTerms.findIndex(t => t.sign === 1);
    const leadWithConstant = firstPosIdx === -1 && hasConstant && constantSum > 0;

    let result, remainingSymbolic;

    if (firstPosIdx !== -1) {
        result = symbolicTerms[firstPosIdx].node;
        remainingSymbolic = symbolicTerms.filter((_, i) => i !== firstPosIdx);
    } else if (leadWithConstant) {
        result = numNode(constantSum);
        remainingSymbolic = symbolicTerms;
    } else {
        result = { type: "neg", arg: symbolicTerms[0].node };
        remainingSymbolic = symbolicTerms.slice(1);
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
            if (left.type === "num" && right.type === "num") return numNode(left.value * right.value);
            if (left.type === "num" && left.value === 0) return numNode(0);
            if (right.type === "num" && right.value === 0) return numNode(0);
            if (left.type === "num" && left.value === 1) return right;
            if (right.type === "num" && right.value === 1) return left;
            return { type: "mul", left, right };
        }

        case "div": {
            const left = simplify(node.left), right = simplify(node.right);
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

        case "sqrt":
            return { type: "sqrt", arg: simplify(node.arg), index: node.index ? simplify(node.index) : null };

        case "abs":
            return { type: "abs", arg: simplify(node.arg) };

        case "func":
            return { type: "func", name: node.name, arg: simplify(node.arg), base: node.base ? simplify(node.base) : null };

        default:
            return node;
    }
}


// Versucht, einen Ausdruck vollständig numerisch auszuwerten – nur möglich,
// wenn er ausschließlich Zahlen/Konstanten enthält (keine Variablen).
// Wird ausschließlich für Definitionsbereich-Prüfungen genutzt.
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

// ==========================================================================
// 6. RENDERER (AST -> HTML im Design der anderen Rechenwege)
// ==========================================================================

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

// ==========================================================================
// 7. SOLVER – eine Ebene der Ziel-Seite umkehren ("peelOnce"), dann
//    wiederholen bis die Variable isoliert ist ("isolate")
// ==========================================================================

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

    let guard = 0;
    while (!((curLeft.type === "var" && curLeft.name === varName) ||
             (curRight.type === "var" && curRight.name === varName))) {
        if (++guard > 60) return null; // Sicherheitsnetz gegen Endlosschleifen

        const varOnLeft = containsVar(curLeft, varName);
        const targetNode = varOnLeft ? curLeft : curRight;
        const otherNode = varOnLeft ? curRight : curLeft;

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
    if (countVarOccurrences(eq.left, varName) + countVarOccurrences(eq.right, varName) !== 1) return false;
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

// ==========================================================================
// 8. UI-ANBINDUNG
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const selectVariable = document.getElementById("selectVariable");
    const btn = document.getElementById("buttonZahlenInput");
    const errorMessages = document.getElementById("errorMessages");
    const loesungOutput = document.getElementById("loesungOutput");
    const rechenwegOutput = document.getElementById("rechenwegOutput");
    const tipp = document.getElementById("tipp");
    const rechenwegDiv = document.querySelector(".rechenwegDiv");

    let currentEquation = null;

    function resetOutput() {
        loesungOutput.innerHTML = "";
        rechenwegOutput.innerHTML = "";
        rechenwegDiv.style.display = "none";
        tipp.textContent = "";
    }

    function disableSelection() {
        selectVariable.innerHTML = '<option value=""> ...</option>';
        selectVariable.disabled = true;
        btn.disabled = true;
    }

    function showError(msg) {
        errorMessages.textContent = msg;
        errorMessages.style.display = "block";
        resetOutput();
        disableSelection();
    }

    function hideError() {
        errorMessages.style.display = "none";
    }

    function showSolveError(msg) {
        errorMessages.textContent = msg;
        errorMessages.style.display = "block";
        loesungOutput.innerHTML = "";
        rechenwegOutput.innerHTML = "";
        rechenwegDiv.style.display = "none";
        tipp.textContent = "";
    }

    function analyzeFormula(latex) {
        resetOutput();

        if (!latex || !latex.trim()) {
            hideError();
            disableSelection();
            currentEquation = null;
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
                currentEquation = null;
                disableSelection();
                hideError();
                tipp.textContent = (varNames.length === 1 && findSpecificSolveIssue(eq, varNames[0]))
                    || "Diese Gleichung enthält keine Variable, die sich eindeutig isolieren lässt – z. B. weil eine Variable mehrfach vorkommt, im Wurzelindex steht oder gleichzeitig in Basis und Exponent auftritt.";
                return;
            }

            currentEquation = eq;
            selectVariable.innerHTML = solvable
                .map(name => `<option value="${name}">${name.replace("_", " ")}</option>`)
                .join("");
            selectVariable.disabled = false;
            btn.disabled = false;
            hideError();

        } catch (err) {
            currentEquation = null;
            const msg = err instanceof FormulaError ? err.message : "Deine Formel konnte nicht verarbeitet werden. Bitte überprüfe die Eingabe.";
            showError(msg);
        }
    }

    function renderSolution() {
        if (!currentEquation) return;
        const varName = selectVariable.value;
        if (!varName) return;

        const result = isolate(currentEquation, varName);
        if (!result) {
            showSolveError("Diese Variable lässt sich mit den aktuell unterstützten Umformungen nicht isolieren.");
            return;
        }
        if (result.error) {
            showSolveError(result.error);
            return;
        }

        hideError();

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
        const mf = document.getElementById("mathInput");
        if (!mf) return;

        try {
            if (window.mathVirtualKeyboard) {
                window.mathVirtualKeyboard.layouts = [

"numeric",

"alphabetic",

"greek"

];
            }
        } catch (e) { /* Version-abhängig, kein Blocker */ }

        let debounceTimer = null;
        mf.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => analyzeFormula(mf.value), 400);
        });

        mf.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                btn.click();
            }
        });
    });

    btn.addEventListener("click", renderSolution);
    disableSelection();
});