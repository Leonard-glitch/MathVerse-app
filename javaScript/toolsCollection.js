
export const groups = [
    { id: "arithmetik",    title: "Arithmetik",    icon: "fa-percent" },
    { id: "zahlensysteme", title: "Zahlensysteme", icon: "fa-calculator" },
    { id: "algebra",       title: "Algebra",       icon: "fa-bar-chart" },
    { id: "geometrie",     title: "Geometrie",     icon: "fa-circle-o" },
    { id: "statistik",     title: "Statistik",     icon: "fa-line-chart" },
    { id: "einheiten",     title: "Einheiten",     icon: "fa-arrows-h" }
];

export const tools = [
    {
        id:       "card1",
        title:    "Zahlen Analyse",
        group:    "algebra",
        filename: "zahlenAnalyse.html",
        url:      "/MathVerse-app/Tools/Zahlenanalyse/zahlenAnalyse.html",
        tags:     ["zahlen", "analyse", "algebra", "mathematik", "summe", "max", "maximum", "min", "minimum", "durchschnitt", "ggT", "kgV"],
        info:     "Analysiert eine kommagetrennte Zahlenliste und gibt Summe, Maximum, Minimum und Durchschnitt aus.",
        image: {
            big:   "/MathVerse-app/pictures/51R9beEdSfL.jpg",
            small: "/MathVerse-app/pictures/icons/zahlenAnalyse-icon.png"
        }
    },
    {
        id:       "card2",
        title:    "Zahlensystem Umrechner",
        group:    "zahlensysteme",
        filename: "zsystUmrechner.html",
        url:      "/MathVerse-app/Tools/Zahlensystemumrechner/zsystUmrechner.html",
        tags:     ["zahlensystem", "umrechner", "dual", "binär", "hex", "oktal", "dezimal"],
        info:     "Rechnet Zahlen zwischen Zahlensystemen (Basis 2–20) um – inklusive Nachkommastellen und vollem Rechenweg.",
        image: {
            big:   "/MathVerse-app/pictures/ZahlensystemeUmwandeln Temp1.jpg",
            small: "/MathVerse-app/pictures/icons/zsystUmrechner-icon.png"
        }
    },
    {
        id:       "card3",
        title:    "Zahlensystem Rechner",
        group:    "zahlensysteme",
        filename: "zsystRechner.html",
        url:      "/MathVerse-app/Tools/Zahlensystemrechner/zsystRechner.html",
        tags:     ["zahlensystem", "rechner", "addition", "subtraktion", "multiplikation", "division", "dual"],
        info:     "Führt Grundrechenarten (+, −, ×, ÷) direkt in einem beliebigen Zahlensystem durch und zeigt den schriftlichen Rechenweg.",
        image: {
            big:   "/MathVerse-app/pictures/beispiel-addition.png",
            small: "/MathVerse-app/pictures/icons/zsystRechner-icon.png"
        }
    },
    {
        id:       "card4",
        title:    "Einheiten Umrechner",
        group:    "einheiten",
        filename: "einheitenUmrechner.html",
        url:      "/MathVerse-app/Tools/Einheiten Umrechner/einheitenUmrechner.html",
        tags:     ["umrechner", "einheiten", "länge", "gewicht", "temperatur", "zeit"],
        info:     "Vielseitiger Umrechner für verschiedenste Maßeinheiten – inklusive Advanced Mode für internationale und spezialisierte Messsysteme.",
        image: {
            big:   "/MathVerse-app/pictures/hqdefault.jpg",
            small: "/MathVerse-app/pictures/icons/einheitenUmrechner-icon.png"
        }
    },
    {
        id:       "card5",
        title:    "Prozentrechnung",
        group:    "arithmetik",
        filename: "prozentrechner.html",
        url:      "/MathVerse-app/Tools/Prozentrechner/prozentrechner.html",
        tags:     ["prozent", "prozentrechnung", "rabatt", "mehrwertsteuer", "rechner"],
        info:     "Berechnet Anteil, Prozentsatz und Grundwert – drei Formeln auf einen Blick, mit sofortigem Rechenweg.",
        image: {
            big:   "/MathVerse-app/pictures/Prozentrechnung_Thumbnail.png",
            small: "/MathVerse-app/pictures/icons/prozentrechner-icon.png"
        }
    },
    {
        id:       "card6",
        title:    "Bruchrechner",
        group:    "arithmetik",
        filename: "bruchRechner.html",
        url:      "/MathVerse-app/Tools/Bruchrechner/bruchRechner.html",
        tags:     ["bruch", "bruchrechner", "addieren", "subtrahieren", "multiplizieren", "dividieren", "kürzen", "erweitern", "gemischte zahlen"],
        info:     "Führt alle Grundrechenarten mit Brüchen durch – inklusive Kürzen, Erweitern, gemischten Zahlen und vollständigem Rechenweg.",
        image: {
            big:   "/MathVerse-app/pictures/bruchrechner-big.png",
            small: "/MathVerse-app/pictures/icons/bruchrechner-icon.png"
        }
    },
    {
        id:       "card7",
        title:    "Dreisatzrechner",
        group:    "arithmetik",
        filename: "dreisatz.html",
        url:      "/MathVerse-app/Tools/Dreisatz Rechner/dreisatz.html",
        tags:     ["dreisatz", "verhältnis", "proportional", "antiproportional", "mathematik"],
        info:      "Berechnet den Dreisatz bei proportionalen und antiproportionalen Zuordnungen – inklusive Schritt-für-Schritt-Lösungsweg.",
        image: {
            big:   "/MathVerse-app/pictures/dreisatz.jpg",
            small: "/MathVerse-app/pictures/icons/meinTool-icon.png"
        }
    },
    {
        id:       "card8",
        title:    "Dezimal ↔ Bruch Umrechner",
        group:    "arithmetik",
        filename: "dezBruchConverter.html",
        url:      "/MathVerse-app/Tools/DezBruchConverter/dezBruchConverter.html",
        tags:     ["dezimal", "bruch", "umrechner"],
        info:      "Wandelt Brüche in Dezimalzahlen und Dezimalzahlen in Brüche um – inklusive Schritt-für-Schritt-Lösungsweg.",
        image: {
            big:   "/MathVerse-app/pictures/DezimalBruchConverter.png",
            small: "/MathVerse-app/pictures/icons/meinTool-icon.png"
        }
    }

    // -----------------------------------------------------------------------
    // Neues Tool hinzufügen? Schema:
    // {
    //     id:       "card6",
    //     title:    "Tool Titel",
    //     group:    "eine-der-gruppen-ids",
    //     filename: "meinTool.html",
    //     url:      "/MathVerse-app/Tools/MeinTool/meinTool.html",
    //     tags:     ["tag1", "tag2"],
    //     info:     "Kurzbeschreibung für den Tooltip.",
    //     image: {
    //         big:   "/MathVerse-app/pictures/meinTool-big.jpg",
    //         small: "/MathVerse-app/pictures/icons/meinTool-icon.png"
    //     }
    // }
    // -----------------------------------------------------------------------
];