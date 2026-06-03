import { tools } from "./toolsCollection.js";

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if (searchInput && searchResults) {

    searchInput.addEventListener("input", () => {

        const query = searchInput.value
            .trim()
            .toLowerCase();

        if (query.length === 0) {
            searchResults.style.display = "none";
            searchResults.innerHTML = "";
            return;
        }

        const matches = tools.filter(tool => {

            const titleMatch =
                tool.title.toLowerCase().includes(query);

            const tagMatch =
                tool.tags.some(tag =>
                    tag.toLowerCase().includes(query)
                );

            return titleMatch || tagMatch;
        });

        renderResults(matches);
    });

    document.addEventListener("click", e => {

        if (!searchResults.contains(e.target)
            && e.target !== searchInput) {

            searchResults.style.display = "none";
        }
    });
}

function renderResults(results) {

    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="searchResult">
                Keine Ergebnisse gefunden
            </div>
        `;

        searchResults.style.display = "block";
        return;
    }

    searchResults.innerHTML = "";

    results.forEach(tool => {

        const result = document.createElement("a");

        result.href = tool.url;

        result.classList.add("searchResult");

        result.innerHTML = `
            <div class="searchResultTitle">
                ${tool.title}
            </div>

            <div class="searchResultTags">
                ${tool.tags.map(tag => `#${tag}`).join(" ")}
            </div>
        `;

        searchResults.appendChild(result);
    });

    searchResults.style.display = "block";
}