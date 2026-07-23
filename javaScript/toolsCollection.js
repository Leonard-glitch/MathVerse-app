const BASE = window.MV_BASE || '';

export const groups = [
    { id: "arithmetik",    title: "Arithmetik",    icon: "fa-percent" },
    { id: "zahlensysteme", title: "Zahlensysteme", icon: "fa-calculator" },
    { id: "algebra",       title: "Algebra",       icon: "fa-bar-chart" },
    { id: "geometrie",     title: "Geometrie",     icon: "fa-circle-o" },
    { id: "statistik",     title: "Statistik",     icon: "fa-line-chart" },
    { id: "einheiten",     title: "Einheiten",     icon: "fa-arrows-h" },
    { id: "finanzen",      title: "Finanzen",      icon: "fa-money" }
];

export const tools = [
    {
        id:       "card1",
        title:    "Zahlen Analyse",
        group:    "statistik",
        filename: "zahlenAnalyse.html",
        url:      `${BASE}/Tools/Zahlenanalyse/zahlenAnalyse.html`,
        tags:     ["zahlen", "analyse", "algebra", "mathematik", "summe", "max", "maximum", "min", "minimum", "durchschnitt", "ggT", "kgV", "median", "modus", "spannweite", "varianz", "standardabweichung", "statistik"],
        info:     "Analysiert eine Zahlenliste und liefert umfassende statistische Kennzahlen wie Summe, Mittelwerte (Durchschnitt, Median, Modus), Streuungsmaße (Varianz, Standardabweichung, Spannweite) sowie ggT und kgV.",
        image: {
            big:   `${BASE}/pictures/Zahlen Analyse2.png`,
            small: `${BASE}/pictures/icons/zahlenAnalyse-icon.png`
        }
    },
    {
        id:       "card2",
        title:    "Zahlensystem Umrechner",
        group:    "zahlensysteme",
        filename: "zsystUmrechner.html",
        url:      `${BASE}/Tools/Zahlensystemumrechner/zsystUmrechner.html`,
        tags:     ["zahlensystem", "umrechner", "dual", "binär", "hex", "oktal", "dezimal"],
        info:     "Rechnet Zahlen zwischen Zahlensystemen (Basis 2–20) um – inklusive Nachkommastellen und vollem Rechenweg.",
        image: {
            big:   `${BASE}/pictures/Zahlensystem Umrechner1.png`,
            small: `${BASE}/pictures/icons/zsystUmrechner-icon.png`
        }
    },
    {
        id:       "card3",
        title:    "Zahlensystem Rechner",
        group:    "zahlensysteme",
        filename: "zsystRechner.html",
        url:      `${BASE}/Tools/Zahlensystemrechner/zsystRechner.html`,
        tags:     ["zahlensystem", "rechner", "addition", "subtraktion", "multiplikation", "division", "dual"],
        info:     "Führt Grundrechenarten (+, −, ×, ÷) direkt in einem beliebigen Zahlensystem durch und zeigt den schriftlichen Rechenweg.",
        image: {
            big:   `${BASE}/pictures/Zahlensystem Rechner1.png`,
            small: `${BASE}/pictures/icons/zsystRechner-icon.png`
        }
    },
    {
        id:       "card4",
        title:    "Einheiten Umrechner",
        group:    "einheiten",
        filename: "einheitenUmrechner.html",
        url:      `${BASE}/Tools/Einheiten Umrechner/einheitenUmrechner.html`,
        tags:     ["umrechner", "einheiten", "länge", "gewicht", "temperatur", "zeit"],
        info:     "Vielseitiger Umrechner für verschiedenste Maßeinheiten – inklusive Advanced Mode für internationale und spezialisierte Messsysteme.",
        image: {
            big:   `${BASE}/pictures/einheitenUmrechner1.png`,
            small: `${BASE}/pictures/icons/einheitenUmrechner-icon.png`
        }
    },
    {
        id:       "card5",
        title:    "Prozentrechnung",
        group:    "arithmetik",
        filename: "prozentrechner.html",
        url:      `${BASE}/Tools/Prozentrechner/prozentrechner.html`,
        tags:     ["prozent", "prozentrechnung", "rabatt", "mehrwertsteuer", "rechner", "anteil", "prozentsatz", "grundwert", "veränderung", "erhöhung", "verminderung", "netto", "brutto", "skonto", "rechenweg", "advanced"],
        info:     "Umfassender Prozentrechner mit Advanced Mode: Berechnet Anteil, Prozentsatz, Grundwert, prozentuale Veränderungen, Erhöhungen/Verminderungen, MwSt (Netto/Brutto) sowie Rabatte inklusive detailliertem Rechenweg.",
        image: {
            big:   `${BASE}/pictures/Prozentrechnung_Thumbnail3.png`,
            small: `${BASE}/pictures/icons/prozentrechner-icon.png`
        }
    },
    {
        id:       "card6",
        title:    "Bruchrechner",
        group:    "arithmetik",
        filename: "bruchRechner.html",
        url:      `${BASE}/Tools/Bruchrechner/bruchRechner.html`,
        tags:     ["bruch", "bruchrechner", "addieren", "subtrahieren", "multiplizieren", "dividieren", "kürzen", "erweitern", "gemischte zahlen"],
        info:     "Führt alle Grundrechenarten mit Brüchen durch – inklusive Kürzen, Erweitern, gemischten Zahlen und vollständigem Rechenweg.",
        image: {
            big:   `${BASE}/pictures/bruchrechner-big2.png`,
            small: `${BASE}/pictures/icons/bruchrechner-icon.png`
        }
    },
    {
        id:       "card7",
        title:    "Dreisatzrechner",
        group:    "arithmetik",
        filename: "dreisatz.html",
        url:      `${BASE}/Tools/Dreisatz Rechner/dreisatz.html`,
        tags:     ["dreisatz", "verhältnis", "proportional", "antiproportional", "mathematik"],
        info:      "Berechnet den Dreisatz bei proportionalen und antiproportionalen Zuordnungen – inklusive Schritt-für-Schritt-Lösungsweg.",
        image: {
            big:   `${BASE}/pictures/Dreisatzrechner1.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card8",
        title:    "Dezimal ↔ Bruch Umrechner",
        group:    "arithmetik",
        filename: "dezBruchConverter.html",
        url:      `${BASE}/Tools/DezBruchConverter/dezBruchConverter.html`,
        tags:     ["dezimal", "bruch", "umrechner"],
        info:      "Wandelt Brüche in Dezimalzahlen und Dezimalzahlen in Brüche um – inklusive Schritt-für-Schritt-Lösungsweg.",
        image: {
            big:   `${BASE}/pictures/DezBruchConverter1.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card9",
        title:    "Formel Umformer",
        group:    "algebra",
        filename: "formelUmformer.html",
        url:      `${BASE}/Tools/Formel Umformer/formelUmformer.html`,
        tags:     ["formel", "umformer", "algebra"],
        info:      "Formt mathematische Formeln um – inklusive Schritt-für-Schritt-Lösungsweg.",
        image: {
            big:   `${BASE}/pictures/Formel Umformer2.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card10",
        title:    "Gleichungslöser",
        group:    "algebra",
        filename: "gleichungslöser.html",
        url:      `${BASE}/Tools/Gleichungslöser/gleichungslöser.html`,
        tags:     ["gleichung", "linear", "lösen", "algebra", "lineare-gleichungen", "verfahren"],
        info:      "Löst allgemeine und lineare Gleichungssysteme – inklusive automatischer Auswahl des besten Lösungsverfahrens.",
        image: {
            big:   `${BASE}/pictures/Gleichungslöser2.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card11",
        title:    "Finanzrechner",
        group:    "finanzen",
        filename: "finanzrechner.html",
        url:      `${BASE}/Tools/Finanzrechner/finanzrechner.html`,
        tags:     ["finanzen", "rechner", "investition", "sparplan", "rendite", "inflation", "zinseszins"],
        info:      "All-in-One-Finanzrechner mit drei spezialisierten Tools: Berechnet den langfristigen Vermögensaufbau per Sparplan (Zinseszins), ermittelt den realen Kaufkraftverlust durch Inflation oder analysiert die genaue Performance (ROI & CAGR) von Investments – inklusive Live-Diagrammen und transparentem Rechenweg.",
        image: {
            big:   `${BASE}/pictures/Finanzrechner7.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card12",
        title:    "Geometrie Rechner",
        group:    "geometrie",
        filename: "geometrieRechner.html",
        url:      `${BASE}/Tools/Geometrie Rechner/geometrieRechner.html`,
        tags:     ["geometrie", "2d", "3d", "kreis", "rechteck", "quadrat", "dreieck", "rechtwinkliges dreieck", "trapez", "parallelogramm", "raute","würfel", "quader", "kugel", "zylinder", "kegel", "quadratische pyramide", "rechteckige pyramide"],
        info:      "Geometrie Rechner welcher mit 2D und 3D Figuren rechnet - inklusive Rechenweg und live Form-Vorschau",
        image: {
            big:   `${BASE}/pictures/Geometrie Rechner1.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
    },
    {
        id:       "card13",
        title:    "Funktionsrechner",
        group:    "algebra",
        filename: "funktionsrechner.html",
        url:      `${BASE}/Tools/Funktionsrechner/funktionsrechner.html`,
        tags:     ["funktionen", "koordinatensystem", "graph", "nullstelle", "schnittpunkte"],
        info:     "Erstelle und analysiere mathematische Funktionen mit interaktivem Koordinatensystem.",
        image: {
            big:   `${BASE}/pictures/Funktionsrechner2.png`,
            small: `${BASE}/pictures/icons/meinTool-icon.png`
        }
     }


    // -----------------------------------------------------------------------
    // Neues Tool hinzufügen? Schema:
    // {
    //     id:       "card14",
    //     title:    "Tool Titel",
    //     group:    "eine-der-gruppen-ids",
    //     filename: "meinTool.html",
    //     url:      `${BASE}/Tools/MeinTool/meinTool.html`,
    //     tags:     ["tag1", "tag2"],
    //     info:     "Kurzbeschreibung für den Tooltip.",
    //     image: {
    //         big:   `${BASE}/pictures/meinTool-big.jpg`,
    //         small: `${BASE}/pictures/icons/meinTool-icon.png`
    //     }
    // }
    // -----------------------------------------------------------------------
];