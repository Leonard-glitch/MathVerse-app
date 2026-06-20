import { tools, groups } from './toolsCollection.js';

const groupsContainer = document.getElementById("groupsContainer");

// Applikations-Start
initMathVerse();

function initMathVerse() {
    if (!groupsContainer) return;
    groupsContainer.innerHTML = "";

    createGroupDOM({ id: "favoriten", title: "Favoriten" }, "favoritenGroupStar");
    groups.forEach(group => createGroupDOM(group, `${group.id}GroupStar`));
    createGroupDOM({ id: "allTools", title: "All Tools" }, "allToolsGroupStar");

    const favStar = document.querySelector('[data-id="favoritenGroupStar"] .star');
    if (favStar) favStar.className = "fa fa-star star active";

    buildAndDistributeCards();
    sortGroupsByPins();
    initSearch();
    applyCollapsibleLogic();
}

// ==========================================================================
// 2. STRUCTURE GENERATION
// ==========================================================================

function createGroupDOM(group, groupDataId) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "restFuncionsDiv";
    groupDiv.dataset.id = groupDataId;
    groupDiv.dataset.groupId = group.id;

    const cardTitleDiv = document.createElement("div");
    cardTitleDiv.className = "cardTitleDiv";

    const starIcon = document.createElement("i");
    const pinnedGroups = window.MV.getPinnedGroups();
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
// 3. CARD ENGINE
// ==========================================================================

function createCardElement(tool, isAllToolsView = false) {
    const card = document.createElement("a");
    card.href = tool.url;
    card.className = "card";
    card.dataset.id = tool.id;
    card.dataset.view = isAllToolsView ? "all" : "category";

    const isFav = window.MV.getFavorites().includes(tool.id);
    const heartClass = isFav ? "fa-heart active" : "fa-heart-o";

    card.innerHTML = `
        <div class="cardTop">
            <img src="${tool.image.big}" class="cardImg" alt="${tool.title}">
            <i class="fa fa-info-circle info"></i>
            <i class="fa ${heartClass} favorite"></i>
        </div>
        <p class="cardText">${tool.title}</p>
    `;

    // ── Herz-Klick ──────────────────────────────────────────────────────────
    const heart = card.querySelector(".favorite");
    heart.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!window.MV.isLoggedIn()) {
            window.MV.showLoginPrompt("Melde dich an, um Tools als Favorit zu speichern.");
            return;
        }

        handleHeartClick(tool.id);
    });

    // ── Info-Tooltip ─────────────────────────────────────────────────────────
    const infoIcon = card.querySelector(".info");
    if (infoIcon && tool.info) {
        let hoverTimer = null;

        infoIcon.addEventListener("mouseenter", () => {
            hoverTimer = setTimeout(() => showGlobalTooltip(infoIcon, tool.info), 2000);
        });

        infoIcon.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimer);
            hoverTimer = null;
            if (!infoIcon._pinned) hideGlobalTooltip();
        });

        infoIcon.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(hoverTimer);
            hoverTimer = null;
            if (infoIcon._pinned) {
                infoIcon._pinned = false;
                hideGlobalTooltip();
            } else {
                infoIcon._pinned = true;
                showGlobalTooltip(infoIcon, tool.info);
            }
        });
    }

    return card;
}

function buildAndDistributeCards() {
    const favContainer      = document.getElementById("favoritenContainer");
    const allToolsContainer = document.getElementById("allToolsContainer");
    const favoriten         = window.MV.getFavorites();

    tools.forEach(tool => {
        const catCard = createCardElement(tool, false);
        catCard.dataset.originalContainer = `${tool.group}Container`;

        if (favoriten.includes(tool.id)) {
            if (favContainer) favContainer.appendChild(catCard);
        } else {
            const targetContainer = document.getElementById(`${tool.group}Container`);
            if (targetContainer) targetContainer.appendChild(catCard);
        }

        const allToolsCard = createCardElement(tool, true);
        if (allToolsContainer) allToolsContainer.appendChild(allToolsCard);
    });

    document.querySelectorAll(".cardsContainer").forEach(sortContainer);
}

// ==========================================================================
// 4. HEART / FAVORITE LOGIC
// ==========================================================================

function handleHeartClick(toolId) {
    const isNowFav     = window.MV.toggleFavorite(toolId);
    const favContainer = document.getElementById("favoritenContainer");
    const catCard      = document.querySelector(`.card[data-id="${toolId}"][data-view="category"]`);
    let affectedContainers = new Set();

    if (isNowFav) {
        if (catCard && favContainer) {
            favContainer.appendChild(catCard);
            affectedContainers.add(favContainer);
        }
    } else {
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

    syncHeartIcons(toolId, isNowFav);

    const containerOrders = window.MV.getContainerOrders();
    affectedContainers.forEach(container => {
        sortContainer(container);
        containerOrders[container.id] = Array.from(
            container.querySelectorAll(".card")
        ).map(c => c.dataset.id);
    });
    window.MV.setContainerOrders(containerOrders);

    applyCollapsibleLogic();
}

function syncHeartIcons(toolId, isActive) {
    document.querySelectorAll(`.card[data-id="${toolId}"] .favorite`).forEach(heart => {
        heart.className = `fa ${isActive ? "fa-heart active" : "fa-heart-o"} favorite`;
    });
}

// ==========================================================================
// 5. SORTING
// ==========================================================================

function sortContainer(container) {
    const containerId = container.id;
    const favoriten   = window.MV.getFavorites();
    const savedOrder  = window.MV.getContainerOrders()[containerId];
    const cards       = Array.from(container.querySelectorAll(".card"));

    cards.sort((a, b) => {
        const idA = a.dataset.id;
        const idB = b.dataset.id;

        if (container.dataset.alltools === "true") {
            const isFavA = favoriten.includes(idA);
            const isFavB = favoriten.includes(idB);
            if (isFavA && !isFavB) return -1;
            if (!isFavA && isFavB) return 1;
        }

        if (containerId === "favoritenContainer") {
            return favoriten.indexOf(idA) - favoriten.indexOf(idB);
        }

        if (savedOrder) {
            const indexA = savedOrder.indexOf(idA);
            const indexB = savedOrder.indexOf(idB);
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
        }

        return 0;
    });

    cards.forEach(card => container.appendChild(card));
}

// ==========================================================================
// 6. GROUP PIN SYSTEM
// ==========================================================================

function handleGroupStarClick(event, groupId) {
    event.preventDefault();

    if (!window.MV.isLoggedIn()) {
        window.MV.showLoginPrompt("Melde dich an, um Gruppen anzupinnen.");
        return;
    }

    if (groupId === "favoritenGroupStar") return;

    const star      = event.currentTarget;
    const wasActive = star.classList.contains("active");
    let pinnedGroups = window.MV.getPinnedGroups();

    if (!wasActive) {
        star.className = "fa fa-star star active";
        if (!pinnedGroups.includes(groupId)) pinnedGroups.push(groupId);
    } else {
        star.className = "fa fa-star-o star";
        pinnedGroups = pinnedGroups.filter(id => id !== groupId);
    }

    window.MV.setPinnedGroups(pinnedGroups);
    sortGroupsByPins();
}

function sortGroupsByPins() {
    const allGroups    = Array.from(groupsContainer.querySelectorAll(".restFuncionsDiv"));
    const nativeOrder  = ["favoriten", ...groups.map(g => g.id), "allTools"];
    const pinnedGroups = window.MV.getPinnedGroups();

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

        const grpA = a.dataset.groupId;
        const grpB = b.dataset.groupId;
        return nativeOrder.indexOf(grpA) - nativeOrder.indexOf(grpB);
    });

    allGroups.forEach(group => groupsContainer.appendChild(group));
}

// ==========================================================================
// 7. SEARCH
// ==========================================================================

function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();

        document.querySelectorAll(".card").forEach(card => {
            const title = card.querySelector(".cardText").textContent.toLowerCase();
            card.style.display = title.includes(query) ? "flex" : "none";
        });

        document.querySelectorAll(".restFuncionsDiv").forEach(groupDiv => {
            const visibleCards = groupDiv.querySelectorAll('.card:not([style*="display: none"])').length;
            groupDiv.style.display = (query !== "" && visibleCards === 0) ? "none" : "block";
        });

        applyCollapsibleLogic();
    });
}

// ==========================================================================
// 8. COLLAPSIBLE LOGIC
// ==========================================================================

function applyCollapsibleLogic() {
    document.querySelectorAll(".restFuncionsDiv").forEach(groupDiv => {
        const container = groupDiv.querySelector(".cardsContainer");
        if (!container) return;

        const wasExpanded = container.classList.contains("expanded") ||
                            groupDiv.classList.contains("is-expanded");

        const existingBtn = groupDiv.querySelector(".expand-btn");
        if (existingBtn) existingBtn.remove();

        container.classList.remove("collapsible", "expanded");
        groupDiv.classList.remove("is-expanded");
        container.classList.add("collapsible");

        if (container.scrollHeight > container.clientHeight) {
            const expandBtn = document.createElement("div");
            expandBtn.className = "expand-btn";
            expandBtn.innerHTML = '<i class="fa fa-chevron-down"></i>';
            expandBtn.style.display = "flex";

            expandBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isExpanded = container.classList.contains("expanded");
                if (isExpanded) {
                    container.classList.remove("expanded");
                    groupDiv.classList.remove("is-expanded");
                    groupDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
                } else {
                    container.classList.add("expanded");
                    groupDiv.classList.add("is-expanded");
                }
            });

            groupDiv.appendChild(expandBtn);

            if (wasExpanded) {
                container.classList.add("expanded");
                groupDiv.classList.add("is-expanded");
            }
        } else {
            container.classList.remove("collapsible");
        }
    });
}

// ==========================================================================
// 9. GLOBAL TOOLTIP SINGLETON
// ==========================================================================

let _globalTooltip  = null;
let _activeInfoIcon = null;

function getGlobalTooltip() {
    if (!_globalTooltip) {
        _globalTooltip = document.createElement("div");
        _globalTooltip.className = "info-tooltip";
        _globalTooltip.innerHTML = `<span class="info-tooltip-text"></span>`;
        document.body.appendChild(_globalTooltip);

        document.addEventListener("click", (e) => {
            if (!e.target.classList.contains("info")) {
                if (_activeInfoIcon) _activeInfoIcon._pinned = false;
                hideGlobalTooltip();
            }
        });

        window.addEventListener("scroll", () => {
            if (_activeInfoIcon) _activeInfoIcon._pinned = false;
            hideGlobalTooltip();
        }, { capture: true, passive: true });
    }
    return _globalTooltip;
}

function showGlobalTooltip(infoIcon, text) {
    const tooltip = getGlobalTooltip();

    if (_activeInfoIcon && _activeInfoIcon !== infoIcon) {
        _activeInfoIcon._pinned = false;
    }
    _activeInfoIcon = infoIcon;

    tooltip.querySelector(".info-tooltip-text").textContent = text;
    tooltip.classList.remove("visible");

    positionGlobalTooltip(tooltip, infoIcon);
    tooltip.classList.add("visible");
}

function hideGlobalTooltip() {
    if (_globalTooltip) {
        _globalTooltip.classList.remove("visible", "tooltip-above", "tooltip-below");
    }
    _activeInfoIcon = null;
}

function positionGlobalTooltip(tooltip, infoIcon) {
    const TT_WIDTH     = 220;
    const MARGIN       = 10;
    const ARROW_OFFSET = 10;

    const rect     = infoIcon.getBoundingClientRect();
    tooltip.style.width    = TT_WIDTH + "px";
    tooltip.style.position = "fixed";

    const ttHeight = tooltip.offsetHeight || 80;

    let top, arrowClass;

    if (rect.top >= ttHeight + ARROW_OFFSET + MARGIN) {
        top        = rect.top - ttHeight - ARROW_OFFSET;
        arrowClass = "tooltip-above";
    } else {
        top        = rect.bottom + ARROW_OFFSET;
        arrowClass = "tooltip-below";
    }

    let left = rect.left + rect.width / 2 - TT_WIDTH / 2;
    left = Math.max(MARGIN, Math.min(left, window.innerWidth - TT_WIDTH - MARGIN));

    const arrowLeft        = rect.left + rect.width / 2 - left;
    const arrowLeftClamped = Math.max(16, Math.min(arrowLeft, TT_WIDTH - 16));

    tooltip.style.top  = top  + "px";
    tooltip.style.left = left + "px";
    tooltip.style.setProperty("--arrow-left", arrowLeftClamped + "px");
    tooltip.classList.remove("tooltip-above", "tooltip-below");
    tooltip.classList.add(arrowClass);
}

// ==========================================================================
// 10. CROSS-TAB SYNC
// ==========================================================================

window.addEventListener("storage", (e) => {
    if (e.key !== "currentUser" && e.key !== "isLoggedIn") return;

    const favoriten = window.MV.getFavorites();
    tools.forEach(tool => {
        syncHeartIcons(tool.id, favoriten.includes(tool.id));
    });

    // Bei Logout/Login in einem anderen Tab gleich neu aufbauen,
    // da Favoriten/Pins komplett anders aussehen können.
    initMathVerse();
});