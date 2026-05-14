
let favoriten = JSON.parse(localStorage.getItem("favoriten")) || [];
// Wir speichern die Reihenfolge der IDs pro Container
let containerOrders = JSON.parse(localStorage.getItem("containerOrders")) || {};

const hearts = document.querySelectorAll(".favorite");
const favoritesContainer = document.getElementById("favoritenContainer");
const allToolsContainer = document.getElementById("allToolsContainer");

// --- 1. INITIALISIERUNG BEIM LADEN ---

function sortContainer(container) {
    const containerId = container.id;
    const cards = Array.from(container.querySelectorAll(".card"));
    const savedOrder = containerOrders[containerId];

    cards.sort((a, b) => {
        const idA = a.dataset.id;
        const idB = b.dataset.id;

        // 1. Check den Favoriten-Status (Wichtig für All Tools)
        const isFavA = favoriten.includes(idA);
        const isFavB = favoriten.includes(idB);

        // Wenn einer ein Favorit ist und der andere nicht, hat der Favorit Vorrang
        if (isFavA && !isFavB) return -1;
        if (!isFavA && isFavB) return 1;

        // 2. Wenn beide den gleichen Status haben (beide Fav oder beide nicht),
        // dann nutze die gespeicherte Reihenfolge
        if (savedOrder) {
            const indexA = savedOrder.indexOf(idA);
            const indexB = savedOrder.indexOf(idB);
            
            // Falls IDs in der gespeicherten Order sind, sortiere danach
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
        }

        // 3. Fallback: Falls gar nichts greift, sortiere nach der Position im favoriten-Array
        if (isFavA && isFavB) {
            return favoriten.indexOf(idA) - favoriten.indexOf(idB);
        }

        return 0;
    });
    
    // Karten neu im DOM anhängen
    cards.forEach(card => container.appendChild(card));
}

// Speichert die aktuelle Reihenfolge der IDs eines Containers
function saveCurrentOrder(container) {
    const containerId = container.id;
    const cards = Array.from(container.querySelectorAll(".card"));
    containerOrders[containerId] = cards.map(c => c.dataset.id);
    localStorage.setItem("containerOrders", JSON.stringify(containerOrders));
}

// Favoriten-Status initial setzen und Karten verschieben
document.querySelectorAll(".card").forEach(card => {
    const cardId = card.dataset.id;
    const heart = card.querySelector(".favorite");
    
    if (favoriten.includes(cardId)) {
        heart.classList.add("fa-heart", "active");
        heart.classList.remove("fa-heart-o");

        const parent = card.parentElement;
        if (parent !== favoritesContainer && parent !== allToolsContainer) {
            if (!card.originalContainer) card.originalContainer = parent;
            if (!favoritesContainer.querySelector(`.card[data-id="${cardId}"]`)) {
                favoritesContainer.appendChild(card);
            }
        }
    } else {
        heart.classList.add("fa-heart-o");
        heart.classList.remove("fa-heart", "active");
    }
});

// Alle relevanten Container sortieren
sortContainer(favoritesContainer);
sortContainer(allToolsContainer);
// Auch die Unterkategorien sortieren, damit dort die Reihenfolge bleibt
document.querySelectorAll(".cardsContainer").forEach(sortContainer);


// --- 2. CLICK-EVENT LOGIK ---
hearts.forEach(heart => {
    heart.addEventListener("click", function(event) {
        event.preventDefault();
        const card = heart.closest(".card");
        const cardId = card.dataset.id;
        const wasActive = heart.classList.contains("active");

        const allInstances = document.querySelectorAll(`.card[data-id="${cardId}"]`);

        if (!wasActive) {
            if (!favoriten.includes(cardId)) favoriten.push(cardId);
            
            allInstances.forEach(c => {
                const h = c.querySelector(".favorite");
                h.classList.add("fa-heart", "active");
                h.classList.remove("fa-heart-o");

                const parent = c.parentElement;
                if (parent !== favoritesContainer && parent !== allToolsContainer) {
                    if (!c.originalContainer) c.originalContainer = parent;
                    favoritesContainer.prepend(c); // Neue Favoriten nach oben
                }
            });
        } else {
            favoriten = favoriten.filter(id => id !== cardId);
            
            allInstances.forEach(c => {
                const h = c.querySelector(".favorite");
                h.classList.remove("fa-heart", "active");
                h.classList.add("fa-heart-o");

                if (favoritesContainer.contains(c) && c.originalContainer) {
                    c.originalContainer.appendChild(c);
                    saveCurrentOrder(c.originalContainer); // Reihenfolge in Ursprungskategorie merken
                }
            });
        }

        // Sortierung und Speicherung
        sortContainer(favoritesContainer);
        sortContainer(allToolsContainer);
        
        saveCurrentOrder(favoritesContainer);
        saveCurrentOrder(allToolsContainer);
        
        localStorage.setItem("favoriten", JSON.stringify(favoriten));
    });
});

/*Group Star Klickbar*/

const stars=document.querySelectorAll(".star");

const allGroups=document.getElementById("groupsContainer");


const favoritenGroup = document.querySelector('[data-id="favoritenGroupStar"]');
const favoritenStar = favoritenGroup.querySelector(".star");

favoritenStar.classList.add("fa-star", "active");
favoritenStar.classList.remove("fa-star-o");


stars.forEach(function(star){

    star.addEventListener("click", function(event2){


        const group = star.closest("[data-id]");
        const groupId = group.dataset.id;


        const wasActive2 = star.classList.contains("active");

        /* Stern aktivieren*/

        if(!wasActive2){

            const h = star;

                h.classList.add("fa-star","active");
                h.classList.remove("fa-star-o");

                const activeGroups = allGroups.querySelectorAll(".restFuncionsDiv .star.active");

                    if(activeGroups.length === 1){ // Nur die aktuelle Gruppe ist aktiv → kein anderer Sterb davor
                        allGroups.prepend(group);
                    } else if(activeGroups.length > 1){
                        const lastActive = activeGroups[activeGroups.length - 2].closest(".restFuncionsDiv");
                        lastActive.after(group);
                    }
        }

        else{

            const h = star;

                h.classList.add("fa-star-o");
                h.classList.remove("fa-star","active");
               
                const activeGroups = allGroups.querySelectorAll(".restFuncionsDiv .star.active");

                    if(activeGroups.length === 0){
                        allGroups.prepend(group);
                    } else {
                        const lastActive = activeGroups[activeGroups.length - 1].closest(".restFuncionsDiv");
                        lastActive.after(group);
                    }       
        }
    });
});






function toggleFavorit(cardId){

    if(favoriten.includes(cardId)){
        //entfernen
        favoriten = favoriten.filter(id => id !== cardId);
    } else {
        //hinzufügen
        favoriten.push(cardId);
    }
    //Änderung speichern
    localStorage.setItem("favoriten", JSON.stringify(favoriten));
}