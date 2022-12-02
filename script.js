// Création du monde
let world = [
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'FOOD', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'SNAKE', 'SNAKE', 'SNAKE', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
  ];

  // Création du serpent et de la pomme, avec des coordonnées prédéfinies 
let snake = [[8,1], [8,2], [8,3]];
let food = [[1,8]];

// Création des différentes variables et récupération du canvas
let score = 0;
var interval;
var canvas = document.getElementById('mycanvas1');
var ctx = canvas.getContext('2d');
let direction;
var url;
var time;
var facile = document.getElementById("facile");
var moyen = document.getElementById("moyen");
var difficile = document.getElementById("difficile");
var retour = document.getElementById("retour");

// Récupération des boutons réessayer et retour
document.getElementById("reessayer").addEventListener("click", restart);
document.getElementById("retour").addEventListener("click", retourAuMenu);

// Remplissage du canvas
ctx.fillStyle = "#B97A57"; // Les remplissages
ctx.fillRect(0,0,canvas.width,canvas.height);

// Fonction creerDamier qui permet de dessiner le damier ainsi que la pomme et le serpent
function creerDamier() {
    // pixelX et pixelY commencent à 10 afin de créer un contour
    let pixelX=10;
    let pixelY=10;
    for (let i=0; i<world.length; i++){
        for (let j=0; j<world.length; j++){
            // Choix de la couleur afin d'alterner le vert foncé et le vert clair
            if ((j+i)%2 == 0) {
                ctx.fillStyle = "#A2D149";
            }
            else {
                ctx.fillStyle = "#AAD751";
            }
            // Dessin du damier
            ctx.beginPath();
            ctx.fillRect(pixelX, pixelY , 30, 30);
            // Dessin de la pomme
            if (world[i][j] == "FOOD") {
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.fillRect(pixelX+5, pixelY+5, 20, 20);
            }
            // Dessin du serpent
            if (world[i][j] == "SNAKE") {
                ctx.fillStyle = "blue";
                ctx.beginPath();
                ctx.fillRect(pixelX+5, pixelY+5, 20, 20);
                // Dessin d'un rond blanc sur la tête du serpent afin de la discerner 
                if ((i==snake[snake.length-1][0]) && (j==snake[snake.length-1][1])){
                    ctx.beginPath();
                    ctx.fillStyle = "white";
                    ctx.arc(pixelX+15, pixelY+15, 5, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            pixelX+=30;
        }
        pixelY+=30;
        pixelX=10;
    }
}

// Fonction move qui permet au serpent de se déplacer
function move() {
    console.log('INTERVAL !');
    // Test afin de savoir si la tête du serpent est située sur la pomme
    if (snake[snake.length-1][0] == food[0][0] && snake[snake.length-1][1] == food[0][1]) {
        // Ajoute 1 au score
        score += 1;
        document.getElementById("score").textContent = "Score : " + score;
        apparitionPomme();
        allongeSerpent();
    }
    // Test afin de savoir si le prochain déplacement du serpent sort du damier
    if (snake[snake.length-1][0]-1 < 0 || snake[snake.length-1][0]+1 > 9 || snake[snake.length-1][1]+1 > 9 || snake[snake.length-1][1]-1 < 0) {
        perdre();
    } else {
        // Test afin de savoir si le serpent se déplace en haut
        if (direction === 'UP') {
            // Test afin de savoir si le serpent se touche
            if (world[snake[snake.length-1][0]-1][snake[snake.length-1][1]] === "SNAKE") {
                perdre();
            }
            else{
                // Permet au serpent d'avancer en haut
                snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
                let oldPosition = snake.shift();
                world[oldPosition[0]][oldPosition[1]] = "EMPTY";
                world[snake[snake.length-1][0]][snake[snake.length-1][1]] = "SNAKE";
                creerDamier();
            }
        }
        // Test afin de savoir si le serpent se déplace à gauche
        else if (direction === 'LEFT') {
            if (world[snake[snake.length-1][0]][snake[snake.length-1][1]-1] === "SNAKE"){
                perdre();
            }
            else {
                // Permet au serpent d'avancer à gauche
                snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
                let oldPosition = snake.shift();
                world[oldPosition[0]][oldPosition[1]] = "EMPTY";
                world[snake[snake.length-1][0]][snake[snake.length-1][1]] = "SNAKE";
                creerDamier();
            }
        }
        // Test afin de savoir si le serpent se déplace à droite
        else if (direction === 'RIGHT') {
            if (world[snake[snake.length-1][0]][snake[snake.length-1][1]+1] === "SNAKE") {
                perdre();
            }
            else {
                // Permet au serpent d'avancer à droite
                snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
                let oldPosition = snake.shift();
                world[oldPosition[0]][oldPosition[1]] = "EMPTY";
                world[snake[snake.length-1][0]][snake[snake.length-1][1]] = "SNAKE";
                creerDamier();
            }
            }
        // Test afin de savoir si le serpent se déplace en bas
        else if (direction === 'DOWN') {
            if (world[snake[snake.length-1][0]+1][snake[snake.length-1][1]] === "SNAKE") {
                perdre();
            }
            else {
                // Permet au serpent d'avancer en bas
                snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
                let oldPosition = snake.shift();
                world[oldPosition[0]][oldPosition[1]] = "EMPTY";
                world[snake[snake.length-1][0]][snake[snake.length-1][1]] = "SNAKE";
                creerDamier();
            }
        }
    }
}

// Fonction step qui enregistre la flèche directionnelle qui a été appuyée afin de connaître la direction du serpent
function step(key) { 
    // Test afin de savoir si la touche directionnelle appuyée est la flèche du haut
    if (key.code == "ArrowUp") {
        direction = 'UP';
    }
    // Test afin de savoir si la touche directionnelle appuyée est la flèche de gauche
    else if (key.code == "ArrowLeft") {
        direction = 'LEFT';
    }
    // Test afin de savoir si la touche directionnelle appuyée est la flèche de droite
    else if (key.code == "ArrowRight") {
        direction = 'RIGHT';
    }
    // Test afin de savoir si la touche directionnelle appuyée est la flèche du bas
    else if (key.code == "ArrowDown") {
        direction = 'DOWN';
    }
}

// Fonction apparitionPomme qui permet de faire réapparaître la pomme si elle a été mangée
function apparitionPomme() {
    // Choix aléatoire des nouvelles coordonnées de la pomme
    let x=Math.floor(Math.random(11)*10);
    let y=Math.floor(Math.random(11)*10);
    // Test afin de savoir si la case n'est pas vide. Si la case n'est pas vide, il faut prendre différentes coordonnées
    if (world[x][y]!="EMPTY") {
        apparitionPomme();
    }
    // Ecriture de "FOOD" dans le tableau world afin de pouvoir dessiner la pomme
    world[x][y]="FOOD";
    food[0][0] = x;
    food[0][1] = y;
}

// Fonction allongeSerpent qui permet d'allonger le serpent quand il mange une pomme
function allongeSerpent(){
    // Test afin de savoir si la direction est "RIGHT" afin d'ajouter la queue aux bonnes coordonnées
    if (direction=='RIGHT'){
        let x = snake[0][0];
        let y = snake[0][1]-1;
        // Ajout de la queue du serpent dans le tableau snake
        snake.unshift([x,y]);
        // Ecriture de "SNAKE" dans le tableau world afin de pouvoir dessiner la queue
        world[x][y] = "SNAKE";
    }
    // Test afin de savoir si la direction est "LEFT" afin d'ajouter la queue aux bonnes coordonnées
    if (direction=='LEFT'){
        let x = snake[0][0];
        let y = snake[0][1]+1;
        snake.unshift([x,y]);
        world[x][y] = "SNAKE";
    }
    // Test afin de savoir si la direction est "UP" afin d'ajouter la queue aux bonnes coordonnées
    if (direction=='UP'){
        let x = snake[0][0]+1;
        let y = snake[0][1];
        snake.unshift([x,y]);
        world[x][y] = "SNAKE";
    }
    // Test afin de savoir si la direction est "DOWN" afin d'ajouter la queue aux bonnes coordonnées
    if (direction=='DOWN'){
        let x = snake[0][0];
        let y = snake[0][1]-1;
        snake.unshift([x,y]);
        world[x][y] = "SNAKE";
    }
}

// Fonction perdre qui permet d'arrêter le jeu
function perdre() {
    // Permet de faire apparaître le bouton reessayer
    document.getElementById("reessayer").style.display = "block";
    canvas.style.opacity = "0.75";
    ctx.fillStyle = "#BB0B0B";
    ctx.textAlign = "center";
    ctx.font = '56px comica';
    ctx.fillText('Game Over', 160, 160);
    // Permet d'arrêter l'avancement automatique du serpent
    clearInterval(interval);
}

// Fonction qui réinitialise l'état du jeu
function reinitialiseJeu() {
    // Permet de faire disparaître le bouton reessayer
    document.getElementById("reessayer").style.display = "none";
    canvas.style.opacity = 1;
    // Réinitialisation du monde
    for(let i = 0; i < world.length; i++) {
        for(let j = 0; j < world.length; j++) {
            world[i][j] = "EMPTY";
        }
    }
    // Réinitialisation du serpent
    snake = [[8,1], [8,2], [8,3]];
    world[snake[0][0]][snake[0][1]] = "SNAKE";
    world[snake[1][0]][snake[1][1]] = "SNAKE";
    world[snake[2][0]][snake[2][1]] = "SNAKE";
    // Réinitialisation de la pomme
    food = [[1,8]];
    world[food[0][0]][food[0][1]] = "FOOD";
    // Réinitialisation de la direction
    direction = "";
    // Réinitialisation du score
    score = 0;
    document.getElementById("score").textContent = "Score : " + score;

    main();
}

// Fonction restart qui permet de recommencer le jeu
function restart() {
    reinitialiseJeu();
    interval = setInterval(move, time);
}

// Fonction retourAuMenu qui permet de retourner au menu d'accueil
function retourAuMenu() {
    clearInterval(interval);
    // Récupération des boutons facile, moyen et difficile (easy, medium et hard sur le menu d'accueil)
    document.getElementById("facile").style.display = "block";
    document.getElementById("moyen").style.display = "block";
    document.getElementById("difficile").style.display = "block";
    document.getElementById("menuJeu").style.display = "none";
    var menuJeu = document.getElementById("menuJeu");
    menuJeu.style.display = "none";
    facile.style.display = "block";
    moyen.style.display = "block";
    difficile.style.display = "block";
    reinitialiseJeu();
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
            interval = setInterval(move, time);
        })
        .catch(function (err) {
            console.log(err);
        });
    }

// Fonction main
function main() {
    // Création du damier
    creerDamier();
    // Création de l'évènement "keydown" qui va enregistrer la touche appuyée
    var key = addEventListener("keydown", step);
    facile.addEventListener('click', modeFacile);
    moyen.addEventListener('click', modeMoyen);
    difficile.addEventListener('click', modeDifficile);
    retour.addEventListener('click', retourAuMenu);
}

main();
