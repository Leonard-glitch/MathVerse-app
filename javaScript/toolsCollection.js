const BASE = window.MV_BASE || '';

export const groups = [
    { id: "arithmetik",    title: "Arithmetic",    icon: "fa-percent" },
    { id: "zahlensysteme", title: "Number Systems", icon: "fa-calculator" },
    { id: "algebra",       title: "Algebra",       icon: "fa-bar-chart" },
    { id: "geometrie",     title: "Geometry",      icon: "fa-circle-o" },
    { id: "statistik",     title: "Statistics",    icon: "fa-line-chart" },
    { id: "einheiten",     title: "Units",         icon: "fa-arrows-h" },
    { id: "finanzen",      title: "Finance",       icon: "fa-money" }
];

export const tools = [
    {
        id:       "card1",
        title:    "Number Analysis",
        group:    "statistik",
        filename: "numberAnalysis.html",
        url:      `${BASE}/Tools/NumberAnalysis/numberAnalysis.html`,
        tags:     ["numbers", "analysis", "algebra", "math", "sum", "max", "maximum", "min", "minimum", "average", "gcd", "lcm", "median", "mode", "range", "variance", "standard deviation", "statistics"],
        info:     "Analyzes a list of numbers and provides comprehensive statistical measures such as sum, averages, median, mode, spread, variance, standard deviation, gcd, and lcm.",
        image: {
            big:   `${BASE}/pictures/Zahlen Analyse-appIcon.png`,
            small: `${BASE}/pictures/icons/zahlenAnalyse-icon.png`
        }
    },
    {
        id:       "card2",
        title:    "Number System Converter",
        group:    "zahlensysteme",
        filename: "numberSystemConverter.html",
        url:      `${BASE}/Tools/NumberSystemConverter/numberSystemConverter.html`,
        tags:     ["number system", "converter", "dual", "binary", "hex", "octal", "decimal"],
        info:     "Converts numbers between numeral systems (base 2–20), including fractional values and full calculation steps.",
        image: {
            big:   `${BASE}/pictures/Zahlensystem Umrechner-appIcon.png`,
            small: `${BASE}/pictures/icons/zsystUmrechner-icon.png`
        }
    },
    {
        id:       "card3",
        title:    "Number System Calculator",
        group:    "zahlensysteme",
        filename: "numberSystemCalculator.html",
        url:      `${BASE}/Tools/NumberSystemCalculator/numberSystemCalculator.html`,
        tags:     ["number system", "calculator", "addition", "subtraction", "multiplication", "division", "dual"],
        info:     "Performs basic arithmetic operations (+, −, ×, ÷) in any numeral system and shows the written calculation steps.",
        image: {
            big:   `${BASE}/pictures/Zahlensystem Rechner-appIcon.png`,
            small: `${BASE}/pictures/icons/zsystRechner-icon.png`
        }
    },
    {
        id:       "card4",
        title:    "Unit Converter",
        group:    "einheiten",
        filename: "unitConverter.html",
        url:      `${BASE}/Tools/UnitConverter/unitConverter.html`,
        tags:     ["converter", "units", "length", "weight", "temperature", "time"],
        info:     "Versatile converter for many measurement units, including an advanced mode for international and specialized systems.",
        image: {
            big:   `${BASE}/pictures/Einheiten Umrechner-appIcon.png`,
            small: `${BASE}/pictures/icons/einheitenUmrechner-icon.png`
        }
    },
    {
        id:       "card5",
        title:    "Percentage Calculator",
        group:    "arithmetik",
        filename: "percentageCalculator.html",
        url:      `${BASE}/Tools/PercentageCalculator/percentageCalculator.html`,
        tags:     ["percent", "percentage calculation", "discount", "value added tax", "calculator", "share", "percentage", "base value", "change", "increase", "decrease", "net", "gross", "cash discount", "calculation steps", "advanced"],
        info:     "Comprehensive percentage calculator with an advanced mode: calculates shares, percentages, base values, percentage changes, increases/decreases, VAT (net/gross), and discounts with detailed calculation steps.",
        image: {
            big:   `${BASE}/pictures/Prozentrechner-appIcon.png`,
            small: `${BASE}/pictures/icons/prozentrechner-icon.png`
        }
    },
    {
        id:       "card6",
        title:    "Fraction Calculator",
        group:    "arithmetik",
        filename: "fractionCalculator.html",
        url:      `${BASE}/Tools/FractionCalculator/fractionCalculator.html`,
        tags:     ["fraction", "fraction calculator", "add", "subtract", "multiply", "divide", "simplify", "expand", "mixed numbers"],
        info:     "Performs all basic arithmetic operations with fractions, including simplification, expansion, mixed numbers, and full calculation steps.",
        image: {
            big:   `${BASE}/pictures/Bruchrechner-appIcon.png`,
            small: `${BASE}/pictures/icons/bruchrechner-icon.png`
        }
    },
    {
        id:       "card7",
        title:    "Ratio Calculator",
        group:    "arithmetik",
        filename: "ratioCalculator.html",
        url:      `${BASE}/Tools/RatioCalculator/ratioCalculator.html`,
        tags:     ["ratio", "proportion", "direct proportion", "inverse proportion", "math"],
        info:     "Calculates ratios for direct and inverse proportional relationships, including step-by-step solutions.",
        image: {
            big:   `${BASE}/pictures/Dreisatzrechner-appIcon.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card8",
        title:    "Decimal ↔ Fraction Converter",
        group:    "arithmetik",
        filename: "decimalFractionConverter.html",
        url:      `${BASE}/Tools/DecimalFractionConverter/decimalFractionConverter.html`,
        tags:     ["decimal", "fraction", "converter"],
        info:     "Converts fractions to decimals and decimals to fractions, including step-by-step solutions.",
        image: {
            big:   `${BASE}/pictures/DezBruchConverter-appIcon.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card9",
        title:    "Formula Transformer",
        group:    "algebra",
        filename: "formulaTransformer.html",
        url:      `${BASE}/Tools/FormulaTransformer/formulaTransformer.html`,
        tags:     ["formula", "transformer", "algebra"],
        info:     "Rearranges mathematical formulas, including step-by-step solutions.",
        image: {
            big:   `${BASE}/pictures/Formel Umformer-appIcon.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card10",
        title:    "Equation Solver",
        group:    "algebra",
        filename: "equationSolver.html",
        url:      `${BASE}/Tools/EquationSolver/equationSolver.html`,
        tags:     ["equation", "linear", "solve", "algebra", "linear equations", "method"],
        info:     "Solves general and linear equation systems, including automatic selection of the best solving method.",
        image: {
            big:   `${BASE}/pictures/Gleichungslöser-appIcon.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card11",
        title:    "Finance Calculator",
        group:    "finanzen",
        filename: "financeCalculator.html",
        url:      `${BASE}/Tools/FinanceCalculator/financeCalculator.html`,
        tags:     ["finance", "calculator", "investment", "savings plan", "return", "inflation", "compound interest"],
        info:     "All-in-one finance calculator with three specialized tools: calculates long-term wealth growth through a savings plan (compound interest), determines real purchasing power loss through inflation, or analyzes investment performance (ROI & CAGR) with live charts and transparent calculation steps.",
        image: {
            big:   `${BASE}/pictures/Finanzrechner-appIcon.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card12",
        title:    "Geometry Calculator",
        group:    "geometrie",
        filename: "geometryCalculator.html",
        url:      `${BASE}/Tools/GeometryCalculator/geometryCalculator.html`,
        tags:     ["geometry", "2d", "3d", "circle", "rectangle", "square", "triangle", "right triangle", "trapezoid", "parallelogram", "rhombus", "cube", "cuboid", "sphere", "cylinder", "cone", "square pyramid", "rectangular pyramid"],
        info:     "Geometry calculator for 2D and 3D figures, including calculation steps and live shape previews.",
        image: {
            big:   `${BASE}/pictures/Geometrie Rechner-appIcon.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card13",
        title:    "Function Calculator",
        group:    "algebra",
        filename: "funktionsrechner.html",
        url:      `${BASE}/Tools/Funktionsrechner/funktionsrechner.html`,
        tags:     ["functions", "coordinate system", "graph", "root", "intersections"],
        info:     "Create and analyze mathematical functions with an interactive coordinate system.",
        image: {
            big:   `${BASE}/pictures/Funktionsrechner2-appIcon.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card14",
        title:    "Math Calculator",
        group:    "arithmetik",
        filename: "mathCalculator.html",
        url:      `${BASE}/Tools/MathCalculator/mathCalculator.html`,
        tags:     ["calculator", "arithmetic", "trigonometry", "algebra", "advanced", "advanced"],
        info:     "Scientific calculator with standard and advanced modes for complex calculations.",
        image: {
            big:   `${BASE}/pictures/Mathe Rechner-appIcon.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    }

    // -----------------------------------------------------------------------
    // Add a new tool? Schema:
    // {
    //     id:       "card14",
    //     title:    "Tool title",
    //     group:    "one-of-the-group-ids",
    //     filename: "myTool.html",
    //     url:      `${BASE}/Tools/MyTool/myTool.html`,
    //     tags:     ["tag1", "tag2"],
    //     info:     "Short description for the tooltip.",
    //     image: {
    //         big:   `${BASE}/pictures/myTool-big.jpg`,
    //         small: `${BASE}/pictures/icons/myTool-icon.png`
    //     }
    // }
    // -----------------------------------------------------------------------
];