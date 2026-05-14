const units={
    length:{
        mm:0.001,
        cm:0.01,
        dem:0.1,
        m:1,
        km: 1000,

        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344
    },

    mass:{
        g: 1,
        kg: 1000,
        t: 1000000,

        oz: 28.3495,
        lb:453.592
    },

    time: {
        ms: 0.001,
        s: 1,
        min: 60,
        h: 3600,
        d: 86400,
        wk: 604800
    }
}

const einheitA=document.getElementById("einheitA");
const einheitZ=document.getElementById("einheitZ");

const unitsButtons=document.querySelectorAll(".btnUnits");

unitsButtons.forEach(button => {
    button.addEventListener("click", function() {

        // 1. alles deaktivieren
        unitsButtons.forEach(b => b.classList.remove("active"));

        // 2. aktuellen aktiv machen
        button.classList.add("active");


        const type = button.dataset.category;

        console.log(type);

        let keys;

        if(type=="btnMass"){
            keys = Object.keys(units.mass);
        }
        if(type=="btnLength"){
            keys = Object.keys(units.length);
        }
        if(type=="btnTime"){
            keys = Object.keys(units.time);
        }

        console.log(keys);

        einheitA.innerHTML="";

        keys.forEach(unit => {
            einheitA.innerHTML += `<option value="${unit}">${unit}</option>`;
            einheitZ.innerHTML += `<option value="${unit}">${unit}</option>`;
        });

        // DEFAULTS setzen
        unitA.value = Object.keys(units[category])[0];
        unitZ.value = Object.keys(units[category])[1];

    })
})

einheitA.addEventListener("change", function() {
  console.log(this.value);
});