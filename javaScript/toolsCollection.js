// ==========================================================================
// MATHVERSE – ZENTRALE TOOL-DATENQUELLE
// Alle anderen Dateien importieren von hier.
// Neue Tools: NUR HIER eintragen, der Rest passiert automatisch.
// ==========================================================================

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
        id:       "card1",                          // Favoriten-Key in localStorage
        title:    "Zahlen Analyse",
        group:    "algebra",                        // Muss einer group.id entsprechen
        filename: "zahlenAnalyse.html",             // Dateiname der Tool-Seite (für toolFavorite.js)
        url:      "/MathVerse-app/Tools/Zahlenanalyse/zahlenAnalyse.html",
        tags:     ["zahlen", "analyse", "algebra", "mathematik"],
        info:     "Analysiert eine kommagetrennte Zahlenliste und gibt Summe, Maximum, Minimum und Durchschnitt aus.",
        image: {
            big:   "/MathVerse-app/pictures/51R9beEdSfL.jpg",            // Homepage-Cards
            small: "/MathVerse-app/pictures/icons/zahlenAnalyse-icon.png" // UserArea, Suchvorschläge usw.
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