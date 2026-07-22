// search.js – unterstützt mehrere Such-Instanzen (z.B. Haupt- + zweiter Header)
import { tools } from "./toolsCollection.js";

const searchInputs = document.querySelectorAll('[id^="searchInput"]');

searchInputs.forEach(initSearchInstance);

function initSearchInstance(searchInput) {
    const wrapper = searchInput.parentElement;
    const searchResults = wrapper ? wrapper.querySelector('[id^="searchResults"]') : null;
    if (!wrapper || !searchResults) return;

    // Breite/Position richten sich nach der ganzen Nav-Zeile (Logo bis
    // Login) – exakt wie im ursprünglichen "width: 100%"-Verhalten, nicht
    // nach dem schmaleren Eingabefeld-Wrapper.
    const navRow = searchInput.closest(".navbar, .secondNavList") || wrapper;

    function positionResults() {
        const rect = navRow.getBoundingClientRect();
        searchResults.style.top   = `${Math.round(rect.bottom + 8)}px`;
        searchResults.style.left  = `${Math.round(rect.left)}px`;
        searchResults.style.width = `${Math.round(rect.width)}px`;
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

        // Erst rendern, DANACH positionieren: verhindert eine Berechnung auf
        // Basis eines Layouts, das sich durch den neuen Inhalt noch ändert.
        renderResults(searchResults, matches);
        positionResults();
    }

    searchInput.addEventListener("input", showResultsForCurrentQuery);
    searchInput.addEventListener("focus", showResultsForCurrentQuery);

    document.addEventListener("click", e => {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchResults.style.display = "none";
        }
    });

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