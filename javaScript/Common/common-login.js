
let userName=null;
if (localStorage.getItem('isLoggedIn') === 'true') {
    
    userName = localStorage.getItem('mv-username');
}

//Change from Login/Register to User Area if user is logged in

const navUserArea=document.getElementById("navUserArea");

function changeNavUserArea(){

    const safeName = userName;

    const userAccount = document.createElement("a");
    userAccount.href = "/MathVerse-app/html/userArea.html";
    userAccount.target = "_self";
    userAccount.classList.add("userAccount");
    
    // Namenskürzung (Nutzt jetzt den safeName)
    const displayName = safeName.length > 10
        ? safeName.substring(0, 10) + "..."
        : safeName;

    userAccount.innerHTML = `
        <span class="userName">${displayName}</span>
        <i class="fa fa-cog settings-icon"></i>
    `;

    // 1. Container leeren
    navUserArea.innerHTML = "";
    
    // 2. Das echte Element-Objekt hinzufügen
    navUserArea.appendChild(userAccount);
}

// 3. Nur ausführen, wenn der User eingeloggt ist UND wir das Navigations-Element auf der Seite finden
if (localStorage.getItem('isLoggedIn') === 'true' && navUserArea) {
    changeNavUserArea(); 
}
