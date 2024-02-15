// Création du monde
let world = [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'FOOD', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'SNAKE', 'SNAKE', 'SNAKE', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
];

// Création du serpent et de la pomme, avec des coordonnées prédéfinies 
let snake = [[9, 2], [9, 3], [9, 4]];
let food = [[2, 9]];

//Copie du world
let saveWorld = [
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'FOOD', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'SNAKE', 'SNAKE', 'SNAKE', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
    ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
];;

// Création des différentes variables et récupération du canvas
let score = 0;
var interval;
var canvas = document.getElementById('mycanvas1');
var ctx = canvas.getContext('2d');
let direction;
var url;
var time;
// Récupération des boutons facile, moyen et difficile
var menuDifficulty = document.getElementById("menuDifficulty");

// Récupération des boutons réessayer et retour et ajout des listeners
document.getElementById("reessayer").addEventListener("click", restart);



// Fonction creerDamier qui permet de dessiner le damier ainsi que la pomme et le serpent
function creerDamier() {
    // pixelX et pixelY commencent à 10 afin de créer un contour
    let pixelX = 10;
    let pixelY = 10;
    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world.length; j++) {
            // Choix de la couleur afin d'alterner le vert foncé et le vert clair
            if ((j + i) % 2 == 0) {
                ctx.fillStyle = "#E3E1E5";
            }
            else {
                ctx.fillStyle = "white";
            }
            // Dessin du damier
            ctx.beginPath();
            ctx.fillRect(pixelX, pixelY, 30, 30);
            // Dessin des murs
            if (world[i][j] == "WALL") {
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.fillRect(pixelX, pixelY, 30, 30);
            }
            // Dessin de la pomme
            if (world[i][j] == "FOOD") {
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.fillRect(pixelX + 5, pixelY + 5, 20, 20);
            }
            // Dessin du serpent
            if (world[i][j] == "SNAKE") {
                ctx.fillStyle = "#FF4081";
                ctx.beginPath();
                ctx.fillRect(pixelX + 5, pixelY + 5, 20, 20);
                // Dessin d'un rond blanc sur la tête du serpent afin de la discerner 
                if ((i == snake[snake.length - 1][0]) && (j == snake[snake.length - 1][1])) {
                    ctx.beginPath();
                    ctx.fillStyle = "white";
                    ctx.arc(pixelX + 15, pixelY + 15, 5, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            pixelX += 30;
        }
        pixelY += 30;
        pixelX = 10;
    }
}

// Fonction move qui permet au serpent de se déplacer
function move() {
    let nextX, nextY;
    // Trouver les coordonnées du prochain mouvement du serpent en fonction de la direction
    if (direction === 'UP') {
        nextX = snake[snake.length - 1][0] - 1;
        nextY = snake[snake.length - 1][1];
    } else if (direction === 'LEFT') {
        nextX = snake[snake.length - 1][0];
        nextY = snake[snake.length - 1][1] - 1;
    } else if (direction === 'RIGHT') {
        nextX = snake[snake.length - 1][0];
        nextY = snake[snake.length - 1][1] + 1;
    } else if (direction === 'DOWN') {
        nextX = snake[snake.length - 1][0] + 1;
        nextY = snake[snake.length - 1][1];
    }
    // Test afin de savoir si la tête du serpent est située sur la pomme
    if (snake[snake.length - 1][0] == food[0][0] && snake[snake.length - 1][1] == food[0][1]) {
        // Ajoute 1 au score
        score += 1;
        document.getElementById("score").textContent = "Score : " + score;
        allongeSerpent();
        apparitionPomme();
    }
    // Test afin de savoir si le prochain déplacement du serpent sera sur un mur
    if (world[nextX][nextY] === 'WALL') {
        perdre();
        return;
    } else {
        // Test afin de savoir si le serpent se déplace en haut
        if (direction === 'UP') {
            // Test afin de savoir si le serpent se touche
            if (world[snake[snake.length - 1][0] - 1][snake[snake.length - 1][1]] === "SNAKE") {
                perdre();
            }
            else {
                // Permet au serpent d'avancer en haut
                snake.push([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]]);
                let oldPosition = snake.shift();
                world[oldPosition[0]][oldPosition[1]] = "EMPTY";
                world[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = "SNAKE";
                creerDamier();
            }
        }
        // Test afin de savoir si le serpent se déplace à gauche
        else if (direction === 'LEFT') {
            if (world[snake[snake.length - 1][0]][snake[snake.length - 1][1] - 1] === "SNAKE") {
                perdre();
            }
            else {
                // Permet au serpent d'avancer à gauche
                snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1]);
                let oldPosition = snake.shift();
                world[oldPosition[0]][oldPosition[1]] = "EMPTY";
                world[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = "SNAKE";
                creerDamier();
            }
        }
        // Test afin de savoir si le serpent se déplace à droite
        else if (direction === 'RIGHT') {
            if (world[snake[snake.length - 1][0]][snake[snake.length - 1][1] + 1] === "SNAKE") {
                perdre();
            }
            else {
                // Permet au serpent d'avancer à droite
                snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1]);
                let oldPosition = snake.shift();
                world[oldPosition[0]][oldPosition[1]] = "EMPTY";
                world[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = "SNAKE";
                creerDamier();
            }
        }
        // Test afin de savoir si le serpent se déplace en bas
        else if (direction === 'DOWN') {
            if (world[snake[snake.length - 1][0] + 1][snake[snake.length - 1][1]] === "SNAKE") {
                perdre();
            }
            else {
                // Permet au serpent d'avancer en bas
                snake.push([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]]);
                let oldPosition = snake.shift();
                world[oldPosition[0]][oldPosition[1]] = "EMPTY";
                world[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = "SNAKE";
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
    let x;
    let y;
    // Test afin de savoir si la case n'est pas vide. Si la case n'est pas vide, il faut prendre différentes coordonnées
    do {
        x = Math.floor(Math.random() * (12 - 2)) + 2;
        y = Math.floor(Math.random() * (12 - 2)) + 2;
    } while (world[x][y] != "EMPTY");

    // Ecriture de "FOOD" dans le tableau world afin de pouvoir dessiner la pomme
    world[x][y] = "FOOD";
    food[0][0] = x;
    food[0][1] = y;
}

// Fonction allongeSerpent qui permet d'allonger le serpent quand il mange une pomme
function allongeSerpent() {
    // Test afin de savoir si la direction est "RIGHT" afin d'ajouter la queue aux bonnes coordonnées
    if (direction == 'RIGHT') {
        let x = snake[0][0];
        let y = snake[0][1] - 1;
        // Ajout de la queue du serpent dans le tableau snake
        snake.unshift([x, y]);
        // Ecriture de "SNAKE" dans le tableau world afin de pouvoir dessiner la queue
        world[x][y] = "SNAKE";
    }
    // Test afin de savoir si la direction est "LEFT" afin d'ajouter la queue aux bonnes coordonnées
    if (direction == 'LEFT') {
        let x = snake[0][0];
        let y = snake[0][1] + 1;
        snake.unshift([x, y]);
        world[x][y] = "SNAKE";
    }
    // Test afin de savoir si la direction est "UP" afin d'ajouter la queue aux bonnes coordonnées
    if (direction == 'UP') {
        let x = snake[0][0] + 1;
        let y = snake[0][1];
        snake.unshift([x, y]);
        world[x][y] = "SNAKE";
    }
    // Test afin de savoir si la direction est "DOWN" afin d'ajouter la queue aux bonnes coordonnées
    if (direction == 'DOWN') {
        let x = snake[0][0];
        let y = snake[0][1] - 1;
        snake.unshift([x, y]);
        world[x][y] = "SNAKE";
    }
}

// Fonction perdre qui permet d'arrêter le jeu
function perdre() {
    // Permet de faire apparaître le menu de GAME OVER
    document.getElementById('popupBackground').style.animation = '1.25s fondu both';
    document.getElementById('popupBackground').style.display = 'flex';
    document.getElementById("popup").style.display = "flex";
    // Permet d'arrêter l'avancement automatique du serpent
    clearInterval(interval);
}

// Fonction qui permet de réinitialiser l'état du jeu
function reinitialiseJeu() {
    // Permet de faire disparaître le bouton reessayer
    document.getElementById("popupBackground").style.display = "none";
    document.getElementById("popup").style.display = "none";
    // Réinitialisation du monde
    for (let i = 0; i < world.length; i++) {
        for (let j = 0; j < world.length; j++) {
            world[i][j] = saveWorld[i][j];
        }
    }
    // Réinitialisation du serpent
    snake = [[9, 2], [9, 3], [9, 4]];
    world[snake[0][0]][snake[0][1]] = "SNAKE";
    world[snake[1][0]][snake[1][1]] = "SNAKE";
    world[snake[2][0]][snake[2][1]] = "SNAKE";
    // Réinitialisation de la pomme
    food = [[2, 9]];
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
    // Affectation de la vitesse du serpent
    interval = setInterval(move, time);
}

// Fonction retourAuMenu qui permet de retourner au menu d'accueil
function retourAuMenu() {
    clearInterval(interval);
    // Apparition du menu et disparition de la page de jeu
    document.getElementById("menuDifficulty").style.display = "flex";
    document.getElementById("menuJeu").style.display = "none";
    var menuJeu = document.getElementById("menuJeu");
    menuJeu.style.display = "none";
    menuDifficulty.style.display = "flex";
    reinitialiseJeu();
}

// Fonction change qui permet de passer du menu à la page de jeu
function change() {
    var menuJeu = document.getElementById("menuJeu");
    menuDifficulty.style.display = "none"
    menuJeu.style.display = "flex";
}

// Fonction modeFacile qui permet de choisir la difficulté facile
function modeFacile() {
    url = "./Difficultes/facile.json";
    difficulte(url);
    change();
}

// Fonction modeMoyen qui permet de choisir la difficulté moyen
function modeMoyen() {
    url = "./Difficultes/moyen.json";
    difficulte(url);
    change();
}

// Fonction modeDifficile qui permet de choisir la difficulté difficile
function modeDifficile() {
    url = "./Difficultes/difficile.json";
    difficulte(url);
    change();
}

// Fonction difficulte qui permet d'accéder au fichier json correspondant à la difficulté sélectionnée
function difficulte(url) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json(); // une promesse
            } else {
                throw ("Error " + response.status);
            }
        })
        .then(function (data) {
            // traitement des données reçues
            if (url === "./Difficultes/facile.json") {
                document.getElementById("difficulte").innerHTML = "Difficulté : Facile";
            }
            if (url === "./Difficultes/moyen.json") {
                document.getElementById("difficulte").innerHTML = "Difficulté : Moyenne";
            }
            if (url === "./Difficultes/difficile.json") {
                document.getElementById("difficulte").innerHTML = "Difficulté : Difficile";
            }
            // Affecte à time la vitesse du serpent 
            time = data.delay;
            // Affectation de la vitesse du serpent
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
}

main();
