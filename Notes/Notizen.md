
TOOLS:

----Einheiten Umrechner----

(https://www.convertworld.com/de/ + google Umrechner)
No Advanced Mode + Extencion:

-Länge
-Masse
-Zeit
-Fläche
-Geschwindigkeit

Advanced Mode:

-Temperatur
-Volumen
-Datengröße
-Druck
-Energie
-Dezimalpräfixe (mega, giga, peta...)
-Flächenwinkel
-Frequenz(vielleicht)
-Kraftstoffverbrauch(vielleicht)



----Prozent Rechner----

(https://www.blitzrechner.de/prozent/)
No Advanced Mode + Extencion:

-Grundwert
-Prozent
-Prozentsatz

Advanced Mode:

-Prozentuale Veränderung
-Erhöhung/Vermindung um ...%
-Mehrwertsteuer
-Rabattrechner (Skonto)



----Dreisatz Rechner----

https://www.finanz-tools.de/dreisatz-rechner

basierend auf Prozentrechner und Einheiten Umrechner. Keine Liveergebnisse. Mit Button(oder submit button wie bei allen tools). Rechenweg style wie Zahlensystem Umrechner





----Zahlen Analyse----

+ Primfaktorzerlegung
+ Ziffernsumme
+ Primzahltest



----Dezimal<-->Bruch----





----Finanzrechner----

+ Auf irgendwas Rechtliches prüfen
+ !!Mobile fixen!!



----Geometrie Rechner----

+ A, U usw. Im Rechenweg ausschreiben


--------======Responsive=====-------------

-, User Font Size Einstellung an Responsive anpassen!


-------======Performance=====-------------

-, Bilder sind zu hochwärtig... Ladne zu lange
-, Links maybe





-------======To-Dos für Claude=====-------------

# ToolCollection--> Titel, Info, Tags 




<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Undo & Redo Buttons</title>
    <style>
        /* Container für die Buttons */
        .action-buttons {
            display: flex;
            gap: 12px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        /* Basis-Styling für beide Buttons */
        .btn-action {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 18px;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
        }

        /* Hover-Effekt (Mauszeiger drüber) */
        .btn-action:hover {
            background-color: #f9fafb;
            border-color: #d1d5db;
            color: #111827;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        /* Aktiv-Effekt (beim Klicken) */
        .btn-action:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        /* Styling für die SVG-Icons */
        .btn-action svg {
            width: 16px;
            height: 16px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2.5;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
    </style>
</head>
<body>

    <div class="action-buttons">
        <!-- Rückgängig Button -->
        <button class="btn-action" onclick="console.log('Undo geklickt')">
            <svg viewBox="0 0 24 24"><path d="M3 7v6h6M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>
            Rückgängig
        </button>

        <!-- Wiederholen Button -->
        <button class="btn-action" onclick="console.log('Redo geklickt')">
            Weiter
            <svg viewBox="0 0 24 24"><path d="M21 7v6h-6M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/></svg>
        </button>
    </div>

</body>
</html>


