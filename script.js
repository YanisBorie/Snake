var url;
var time;
var facile = document.getElementById("facile");
var moyen = document.getElementById("moyen");
var difficile = document.getElementById("difficile");
var retour = document.getElementById("retour");

function retourMenu() {
    var menuJeu = document.getElementById("menuJeu");
    menuJeu.style.display = "none";
    facile.style.display = "block";
    moyen.style.display = "block";
    difficile.style.display = "block";

}

function change() {
    var menuJeu = document.getElementById("menuJeu");
    facile.style.display = "none";
    moyen.style.display = "none";
    difficile.style.display = "none";

    menuJeu.style.display = "flex";
}

function modeFacile() {
    url = "./Difficultes/facile.json";
    difficulte(url);
    change();
}

function modeMoyen() {
    url = "./Difficultes/moyen.json";
    difficulte(url);
    change();
}

function modeDifficile() {
    url = "./Difficultes/difficile.json";
    difficulte(url);
    change();
}

function difficulte(url) {
    //console.log(url);
    fetch(url)
        .then(function(response) {
            if (response.ok) {
                return response.json(); // une promesse
            } else {
                throw ("Error " + response.status);
            }
        })
        .then (function(data) {
            // traitement des données reçues
            if(url === "./Difficultes/facile.json") {
                document.getElementById("difficulte").innerHTML = "Difficulté : Facile";
            }
            if(url === "./Difficultes/moyen.json") {
                document.getElementById("difficulte").innerHTML = "Difficulté : Moyenne";
            }
            if(url === "./Difficultes/difficile.json") {
                document.getElementById("difficulte").innerHTML = "Difficulté : Difficile";
            }
            time = data.delay;
            lancement();
        })
        .catch(function (err) {
            console.log(err);
        });

}

function main() {

    facile.addEventListener('click', modeFacile);
    moyen.addEventListener('click', modeMoyen);
    difficile.addEventListener('click', modeDifficile);
    retour.addEventListener('click', retourMenu);
    
}

main();