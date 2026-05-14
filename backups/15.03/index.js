
/*Favorite Herz Klickbar*/

const hearts = document.querySelectorAll(".favorite");
const favoritesContainer = document.querySelector(".favoritenDiv .cardsContainer");

hearts.forEach(function(heart){

    heart.addEventListener("click", function(event){

        event.preventDefault();

        heart.classList.toggle("fa-heart");
        heart.classList.toggle("fa-heart-o");
        heart.classList.toggle("active");

        const card = heart.closest(".card");

        if(heart.classList.contains("active")){

            if(!card.originalContainer){
                card.originalContainer = card.parentElement;
            }

            favoritesContainer.prepend(card);

        } else {

            card.originalContainer.appendChild(card);

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