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

function main() {
    var facile = document.getElementById("facile");
    var moyen = document.getElementById("moyen");
    var difficile = document.getElementById("difficile");
    var retour = document.getElementById("retour");

    
    facile.addEventListener('click', change);
    moyen.addEventListener('click', change);
    difficile.addEventListener('click', change);
    retour.addEventListener('click', retourMenu);
}

main();