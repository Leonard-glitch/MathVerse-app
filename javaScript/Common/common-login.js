
localStorage.setItem('currentUserName', 'Leolegend6260')

const userName= localStorage.getItem('currentUserName');

//Change from Login/Register to User Area if user is logged in

const navUserArea=document.getElementById("navUserArea");

function changeNavUserArea(){
    const userAccount = document.createElement("a");
    userAccount.href = "/MathVerse-app/html/userArea.html";
    userAccount.target = "_self";
    userAccount.classList.add("userAccount");
    const displayName =
    userName.length > 10
        ? userName.substring(0, 10) + "..."
        : userName;

    userAccount.innerHTML = `
        <span class="userName">${displayName}</span>
        <i class="fa fa-cog settings-icon"></i>
    `;

    // 1. Container leeren
    navUserArea.innerHTML = "";
    
    // 2. Das echte Element-Objekt hinzufügen
    navUserArea.appendChild(userAccount);
}

if(userName){
    changeNavUserArea(); 
}
