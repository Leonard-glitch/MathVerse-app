// ==========================================================================
// 1. DATA CONFIGURATION (Zentrale Datenquelle)
// ==========================================================================

const groups = [
    { id: "arithmetik", title: "Arithmetik" },
    { id: "zahlensysteme", title: "Zahlensysteme" },
    { id: "algebra", title: "Algebra" },
    { id: "geometrie", title: "Geometrie" },
    { id: "statistik", title: "Statistik" },
    { id: "einheiten", title: "Einheiten" }
];

const tools = [
    {
        id: "card1", 
        title: "Zahlen Analyse",
        image: "./pictures/51R9beEdSfL.jpg",
        link: "./Tools/Zahlenanalyse/zahlenAnalyse.html",
        group: "algebra"
    },
    {
        id: "card2",
        title: "Zahlensystem Umrechner",
        image: "./pictures/ZahlensystemeUmwandeln Temp1.jpg",
        link: "./Tools/Zahlensystemumrechner/zsystUmrechner.html",
        group: "zahlensysteme"
    },
    {
        id: "card3",
        title: "Zahlensystem Rechner",
        image: "./pictures/beispiel-addition.png",
        link: "./Tools/Zahlensystemrechner/zsystRechner.html",
        group: "zahlensysteme"
    },
    {
        id: "card4",
        title: "Einheiten Umrechner",
        image: "./pictures/hqdefault.jpg",
        link: "./Tools/Einheiten Umrechner/einheitenUmrechner.html",
        group: "einheiten",
    },
    {
        id: "card5",
        title: "Prozentrechnung",
        image: "./pictures/Prozentrechnung_Thumbnail.png",
        link: "./Tools/Prozentrechner/prozentrechner.html",
        group: "arithmetik",
    }
];

// ==========================================================================
// 2. STATE MANAGEMENT & INITIALIZATION
// ==========================================================================

let favoriten = JSON.parse(localStorage.getItem("favoriten")) || [];
let containerOrders = JSON.parse(localStorage.getItem("containerOrders")) || {};
let pinnedGroups = JSON.parse(localStorage.getItem("pinnedGroups")) || [];

const groupsContainer = document.getElementById("groupsContainer");

// Applikations-Start
initMathVerse();

function initMathVerse() {
    if (!groupsContainer) return;
    groupsContainer.innerHTML = "";

    // 1. Struktur-Kategorien im DOM aufbauen
    createGroupDOM({ id: "favoriten", title: "Favoriten" }, "favoritenGroupStar");
    groups.forEach(group => createGroupDOM(group, `${group.id}GroupStar`));
    createGroupDOM({ id: "allTools", title: "All Tools" }, "allToolsGroupStar");

    // Favoriten-Stern ist standardmäßig immer aktiv gepinnt
    const favStar = document.querySelector('[data-id="favoritenGroupStar"] .star');
    if (favStar) {
        favStar.className = "fa fa-star star active";
    }

    // 2. Karten generieren und an ihre Startpositionen verteilen
    buildAndDistributeCards();

    // 3. Gruppen-Sterne Sortierung initial anwenden
    sortGroupsByPins();

    // 4. Live-Suche aktivieren
    initSearch();

    applyCollapsibleLogic();
}

// ==========================================================================
// 3. STRUCTURE GENERATION
// ==========================================================================

function createGroupDOM(group, groupDataId) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "restFuncionsDiv";
    groupDiv.dataset.id = groupDataId;
    groupDiv.dataset.groupId = group.id; // Wichtig für native Sortierung bei Entpinnung

    const cardTitleDiv = document.createElement("div");
    cardTitleDiv.className = "cardTitleDiv";

    const starIcon = document.createElement("i");
    if (pinnedGroups.includes(groupDataId) || groupDataId === "favoritenGroupStar") {
        starIcon.className = "fa fa-star star active";
    } else {
        starIcon.className = "fa fa-star-o star";
    }
    
    starIcon.addEventListener("click", (e) => handleGroupStarClick(e, groupDataId));

    const header = document.createElement("h2");
    header.className = "favoritenHeader2";
    header.textContent = group.title;

    cardTitleDiv.appendChild(starIcon);
    cardTitleDiv.appendChild(header);

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cardsContainer";
    cardsContainer.id = `${group.id}Container`;
    if (group.id === "allTools") cardsContainer.dataset.alltools = "true";

    groupDiv.appendChild(cardTitleDiv);
    groupDiv.appendChild(cardsContainer);
    groupsContainer.appendChild(groupDiv);
}

// ==========================================================================
// 4. CARD ENGINE & DOM MOVE LOGIC
// ==========================================================================

function createCardElement(tool, isAllToolsView = false) {
    const card = document.createElement("a");
    card.href = tool.link;
    card.className = "card";
    card.dataset.id = tool.id;
    card.dataset.view = isAllToolsView ? "all" : "category";

    const isFav = favoriten.includes(tool.id);
    const heartClass = isFav ? "fa-heart active" : "fa-heart-o";

    card.innerHTML = `
        <div class="cardTop">
            <img src="${tool.image}" class="cardImg" alt="${tool.title}">
            <i class="fa fa-info-circle info"></i>
            <i class="fa ${heartClass} favorite"></i>
        </div>
        <p class="cardText">${tool.title}</p>
    `;

    const heart = card.querySelector(".favorite");
    heart.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        handleHeartClick(tool.id);
    });

    return card;
}

function buildAndDistributeCards() {
    const favContainer = document.getElementById("favoritenContainer");
    const allToolsContainer = document.getElementById("allToolsContainer");

    tools.forEach(tool => {
        // 1. Erstelle die bewegliche Kategorie-Karte
        const catCard = createCardElement(tool, false);
        catCard.dataset.originalContainer = `${tool.group}Container`; // Problem 3 gelöst via dataset

        // 2. Initialplatzierung prüfen (Favoriten-Array-Reihenfolge respektieren!)
        if (favoriten.includes(tool.id)) {
            if (favContainer) favContainer.appendChild(catCard);
        } else {
            const targetContainer = document.getElementById(`${tool.group}Container`);
            if (targetContainer) targetContainer.appendChild(catCard);
        }

        // 3. Erstelle separate Instanz für "All Tools"
        const allToolsCard = createCardElement(tool, true);
        if (allToolsContainer) allToolsContainer.appendChild(allToolsCard);
    });

    // Alle Container initial sortieren anhand des Speichers
    document.querySelectorAll(".cardsContainer").forEach(sortContainer);
}

function handleHeartClick(toolId) {
    const wasActive = favoriten.includes(toolId);
    const favContainer = document.getElementById("favoritenContainer");
    
    // Präziser Selektor verhindert das Auswählen der "All Tools"-Karte (Problem 4 gelöst)
    const catCard = document.querySelector(`.card[data-id="${toolId}"][data-view="category"]`);

    let affectedContainers = new Set();

    if (!wasActive) {
        // Zu Favoriten hinzufügen
        favoriten.push(toolId);
        if (catCard && favContainer) {
            // Jede neu favorisierte Karte wird ans Ende geschoben, um die Array-Reihenfolge stabil zu halten
            favContainer.appendChild(catCard); 
            affectedContainers.add(favContainer);
        }
    } else {
        // Aus Favoriten entfernen
        favoriten = favoriten.filter(id => id !== toolId);
        
        if (catCard && catCard.dataset.originalContainer) {
            const origContainer = document.getElementById(catCard.dataset.originalContainer);
            if (origContainer) {
                origContainer.appendChild(catCard);
                affectedContainers.add(origContainer);
            }
        }
    }

    if (favContainer) affectedContainers.add(favContainer);
    const allToolsContainer = document.getElementById("allToolsContainer");
    if (allToolsContainer) affectedContainers.add(allToolsContainer);

    // localStorage Update für Favoriten
    localStorage.setItem("favoriten", JSON.stringify(favoriten));

    // Herz-Synchronisation über alle Instanzen hinweg
    document.querySelectorAll(`.card[data-id="${toolId}"] .favorite`).forEach(heart => {
        if (!wasActive) {
            heart.className = "fa fa-heart favorite active";
        } else {
            heart.className = "fa fa-heart-o favorite";
        }
    });

    // Performance-Optimierung (Problem 6): Nur betroffene Container sortieren und genau 1x abspeichern
    affectedContainers.forEach(container => {
        sortContainer(container);
        containerOrders[container.id] = Array.from(container.querySelectorAll(".card")).map(c => c.dataset.id);
    });
    localStorage.setItem("containerOrders", JSON.stringify(containerOrders));
applyCollapsibleLogic(); // <-- HIER HINZUFÜGEN
}

// ==========================================================================
// 5. SORTING & RECOVERY
// ==========================================================================

function sortContainer(container) {
    const containerId = container.id;
    const cards = Array.from(container.querySelectorAll(".card"));
    const savedOrder = containerOrders[containerId];

    cards.sort((a, b) => {
        const idA = a.dataset.id;
        const idB = b.dataset.id;

        // 1. Sonderlogik für den "All Tools" Container (Favoriten nach oben)
        if (container.dataset.alltools === "true") {
            const isFavA = favoriten.includes(idA);
            const isFavB = favoriten.includes(idB);
            if (isFavA && !isFavB) return -1;
            if (!isFavA && isFavB) return 1;
        }

        // 2. Logik für den Favoriten-Container selbst (Chronologie des Hinzufügens wahren)
        if (containerId === "favoritenContainer") {
            return favoriten.indexOf(idA) - favoriten.indexOf(idB);
        }

        // 3. Benutzerdefinierte Reihenfolge aus dem Speicher anwenden
        if (savedOrder) {
            const indexA = savedOrder.indexOf(idA);
            const indexB = savedOrder.indexOf(idB);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
        }

        return 0;
    });
    
    // DOM-Nodes in korrekter Reihenfolge neu anhängen
    cards.forEach(card => container.appendChild(card));
}

// ==========================================================================
// 6. ORIGINAL GROUP PIN SYSTEM
// ==========================================================================

function handleGroupStarClick(event, groupId) {
    event.preventDefault();
    if (groupId === "favoritenGroupStar") return;

    const star = event.currentTarget;
    const wasActive = star.classList.contains("active");

    if (!wasActive) {
        star.className = "fa fa-star star active";
        if (!pinnedGroups.includes(groupId)) {
            pinnedGroups.push(groupId);
        }
    } else {
        star.className = "fa fa-star-o star";
        pinnedGroups = pinnedGroups.filter(id => id !== groupId);
    }

    localStorage.setItem("pinnedGroups", JSON.stringify(pinnedGroups));
    sortGroupsByPins();
}

function sortGroupsByPins() {
    const allGroups = Array.from(groupsContainer.querySelectorAll(".restFuncionsDiv"));
    
    // Native Reihenfolge der IDs erstellen, um entpinnte Gruppen exakt einsortieren zu können
    const nativeOrder = ["favoriten", ...groups.map(g => g.id), "allTools"];

    allGroups.sort((a, b) => {
        const idA = a.dataset.id;
        const idB = b.dataset.id;

        if (idA === "favoritenGroupStar") return -1;
        if (idB === "favoritenGroupStar") return 1;

        const isPinnedA = pinnedGroups.includes(idA);
        const isPinnedB = pinnedGroups.includes(idB);

        if (isPinnedA && !isPinnedB) return -1;
        if (!isPinnedA && isPinnedB) return 1;
        
        if (isPinnedA && isPinnedB) {
            return pinnedGroups.indexOf(idA) - pinnedGroups.indexOf(idB);
        }

        // Problem 5 gelöst: Fallback für unangepinnte Gruppen auf die native Definitions-Reihenfolge
        const grpA = a.dataset.groupId;
        const grpB = b.dataset.groupId;
        return nativeOrder.indexOf(grpA) - nativeOrder.indexOf(grpB);
    });

    allGroups.forEach(group => groupsContainer.appendChild(group));
}

// ==========================================================================
// 7. SEARCH ENGINE
// ==========================================================================

function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", function() {
        const query = this.value.toLowerCase().trim();

        // 1. Einzelne Karten filtern
        document.querySelectorAll(".card").forEach(card => {
            const title = card.querySelector(".cardText").textContent.toLowerCase();
            if (title.includes(query)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
        
        // 2. Gruppen-Sichtbarkeit regeln (Problem 2 gelöst)
        document.querySelectorAll(".restFuncionsDiv").forEach(groupDiv => {
            const container = groupDiv.querySelector(".cardsContainer");
            const totalCardsInGroup = container ? container.querySelectorAll(".card").length : 0;
            const visibleCardsInGroup = groupDiv.querySelectorAll('.card:not([style*="display: none"])').length;
            
            if (query !== "") {
                // Während der Suche: Zeige Gruppe nur, wenn sie Treffer enthält
                groupDiv.style.display = visibleCardsInGroup === 0 ? "none" : "block";
            } else {
                // Suche leer: Stelle Ursprungszustand wieder her (Leere Gruppen bleiben leer, aber sichtbar)
                groupDiv.style.display = "block";
            }
        });
        applyCollapsibleLogic();
    });
}

function applyCollapsibleLogic() {
    document.querySelectorAll(".restFuncionsDiv").forEach(groupDiv => {
        const container = groupDiv.querySelector(".cardsContainer");
        if (!container) return;

        // 1. ZUSTAND MERKEN: Schauen, ob diese Gruppe vor dem Klick offen war
        const wasExpanded = container.classList.contains("expanded") || groupDiv.classList.contains("is-expanded");

        // Alten Button entfernen, falls vorhanden
        const existingBtn = groupDiv.querySelector(".expand-btn");
        if (existingBtn) existingBtn.remove();
        
        // Klassen kurz zurücksetzen für eine exakte Messung
        container.classList.remove("collapsible", "expanded");
        groupDiv.classList.remove("is-expanded");

        // Messmodus aktivieren
        container.classList.add("collapsible");

        // Wenn der Inhalt die erlaubte CSS-Max-Height überschreitet
        if (container.scrollHeight > container.clientHeight) {
            
            // Button erstellen (Bleibt durch CSS fest unten in der Mitte)
            const expandBtn = document.createElement("div");
            expandBtn.className = "expand-btn";
            expandBtn.innerHTML = '<i class="fa fa-chevron-down"></i>'; // Startet als Pfeil nach unten
            expandBtn.style.display = "flex";

            expandBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = container.classList.contains("expanded");
                
                if (isExpanded) {
                    // Zuklappen
                    container.classList.remove("expanded");
                    groupDiv.classList.remove("is-expanded");
                    // Sanfter Scroll zurück zum Gruppen-Anfang
                    groupDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    // Aufklappen
                    container.classList.add("expanded");
                    groupDiv.classList.add("is-expanded");
                }
            });

            // Button an das Gruppen-Div anhängen
            groupDiv.appendChild(expandBtn);

            // 2. ZUSTAND WIEDERHERSTELLEN: Wenn sie offen war, Klassen sofort wieder draufwerfen
            if (wasExpanded) {
                container.classList.add("expanded");
                groupDiv.classList.add("is-expanded");
            }

        } else {
            // Passt der Inhalt komplett rein, entfernen wir die Begrenzung
            container.classList.remove("collapsible");
        }
    });
}