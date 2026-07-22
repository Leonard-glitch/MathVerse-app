// search.js – unterstützt mehrere Such-Instanzen (z.B. Haupt- + zweiter Header)
import { tools } from "./toolsCollection.js";

const searchInputs = document.querySelectorAll('[id^="searchInput"]');

searchInputs.forEach(initSearchInstance);

function initSearchInstance(searchInput) {
    const wrapper = searchInput.parentElement;
    const searchResults = wrapper ? wrapper.querySelector('[id^="searchResults"]') : null;
    if (!wrapper || !searchResults) return;

    // Breite/Position richten sich nach dem Eingabefeld-Wrapper selbst,
    // nicht nach der ganzen Nav-Zeile – sonst reicht das Dropdown über
    // Logo/Login statt exakt unter dem Suchfeld zu sitzen.
    function positionResults() {
        const rect = wrapper.getBoundingClientRect();
        searchResults.style.top   = `${rect.bottom + 8}px`;
        searchResults.style.left  = `${rect.left}px`;
        searchResults.style.width = `${rect.width}px`;
    }

    function showResultsForCurrentQuery() {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length === 0) {
            searchResults.style.display = "none";
            searchResults.innerHTML = "";
            return;
        }

        const matches = tools.filter(tool => {
            const titleMatch = tool.title.toLowerCase().includes(query);
            const tagMatch   = tool.tags.some(tag => tag.toLowerCase().includes(query));
            return titleMatch || tagMatch;
        });

        positionResults();
        renderResults(searchResults, matches);
    }

    // Tippen -> Ergebnisse neu berechnen
    searchInput.addEventListener("input", showResultsForCurrentQuery);

    // Erneuter Fokus (z.B. nach Klick weg und zurück) -> bereits getippte
    // Query sofort wieder anzeigen, ohne erneut tippen zu müssen
    searchInput.addEventListener("focus", showResultsForCurrentQuery);

    document.addEventListener("click", e => {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchResults.style.display = "none";
        }
    });

    // position:fixed folgt der Seite nicht automatisch -> bei Scroll/Resize
    // (inkl. Tab-bedingtem Auto-Scroll) neu positionieren statt zu schließen,
    // damit das Dropdown am Eingabefeld "kleben" bleibt.
    window.addEventListener("scroll", () => {
        if (searchResults.style.display === "block") positionResults();
    }, { capture: true, passive: true });

    window.addEventListener("resize", () => {
        if (searchResults.style.display === "block") positionResults();
    }, { passive: true });
}

function renderResults(searchResults, results) {

    if (results.length === 0) {
        searchResults.innerHTML = `<div class="searchResult">Keine Ergebnisse gefunden</div>`;
        searchResults.style.display = "block";
        return;
    }

    searchResults.innerHTML = "";

    results.forEach(tool => {
        const result = document.createElement("a");
        result.href  = tool.url;
        result.classList.add("searchResult");

        result.innerHTML = `
            <div class="searchResultTitle">${tool.title}</div>
            <div class="searchResultTags">${tool.tags.map(tag => `#${tag}`).join(" ")}</div>
        `;

        searchResults.appendChild(result);
    });

    searchResults.style.display = "block";
}