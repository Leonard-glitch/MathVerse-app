
/*Favorite Herz Klickbar*/
/* Favorite Herz Klickbar */

const hearts = document.querySelectorAll(".favorite");

const favoritesContainer = document.querySelector(".favoritenDiv .cardsContainer");
const allToolsContainer = document.getElementById("allToolsContainer");

hearts.forEach(heart => {

    heart.addEventListener("click", function(event){

        event.preventDefault();

        const card = heart.closest(".card");
        const cardId = card.dataset.id;

        const allCards = document.querySelectorAll(`.card[data-id="${cardId}"]`);

        const isActive = heart.classList.contains("active");

        if(isActive){

            /* ---------- FAVORIT ENTFERNEN ---------- */

            allCards.forEach(c => {

                const h = c.querySelector(".favorite");

                h.classList.remove("fa-heart","active");
                h.classList.add("fa-heart-o");

                /* Favoritenkarte zurück zur Kategorie */
                if(favoritesContainer.contains(c) && c.originalContainer){
                    c.originalContainer.appendChild(c);
                }

            });

        } else {

            /* ---------- FAVORIT SETZEN ---------- */

            allCards.forEach(c => {

                const h = c.querySelector(".favorite");

                h.classList.add("fa-heart","active");
                h.classList.remove("fa-heart-o");

                const parent = c.parentElement;

                /* Karte aus Unterkategorie → Favoriten */
                if(parent !== favoritesContainer && parent !== allToolsContainer){

                    if(!c.originalContainer){
                        c.originalContainer = parent;
                    }

                    favoritesContainer.prepend(c);

                }

                /* Karte in All Tools → nur nach oben */
                if(parent === allToolsContainer){
                    allToolsContainer.prepend(c);
                }

            });

        }

    });

});


/*Group Star Klickbar*/

const stars=document.querySelectorAll(".star");

stars.forEach(function(star){ /* for Each geht jedes hearts durch*/

    star.addEventListener("click", function(event){

        event.preventDefault();

        star.classList.toggle("fa-star");
        star.classList.toggle("fa-star-o");

        star.classList.toggle("active");

    });


});