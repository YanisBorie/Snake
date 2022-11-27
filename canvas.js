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
let snake = [[8,1], [8,2], [8,3]];
let food = [[1,8]];
let score = 0;
var interval;
var canvas = document.getElementById('mycanvas1');
var ctx = canvas.getContext('2d');
let direction;

document.getElementById("reessayer").addEventListener("click", restart);

ctx.fillStyle = "#B97A57"; // Les remplissages
ctx.fillRect(0,0,canvas.width,canvas.height);

function creerDamier() {
    let pixelX=10;
    let pixelY=10;
    for (let i=0; i<world.length; i++){
        for (let j=0; j<world.length; j++){
            if ((j+i)%2 == 0) {
                ctx.fillStyle = "#A2D149";
            }
            else {
                ctx.fillStyle = "#AAD751";
            }
            ctx.beginPath();
            ctx.fillRect(pixelX, pixelY , 30, 30);
            if (world[i][j] == "FOOD") {
                console.log("food");
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.fillRect(pixelX+5, pixelY+5, 20, 20);
            }

            if (world[i][j] == "SNAKE") {
                console.log("snake")
                ctx.fillStyle = "blue";
                ctx.beginPath();
                ctx.fillRect(pixelX+5, pixelY+5, 20, 20);
            }
            pixelX+=30;
        }
        pixelY+=30;
        pixelX=10;
    }
}

function move() {
    if (snake[2][0] == food[0][0] && snake[2][1] == food[0][1]) {
        console.log("test");
        score += 1;
        document.getElementById("score").textContent = "Score : " + score;
        apparitionPomme();
    }
    if (snake[2][0] < 0 || snake[2][0] > 9 || snake[2][1] > 9 || snake[2][1] < 0) {
        document.getElementById("reessayer").style.display = "block";
        console.log("GAME OVER");
        clearInterval(interval);
    } else {
        if (direction === 'UP') {
            snake.push([snake[2][0]-1,snake[2][1]]);
            let oldPosition = snake.shift();
            world[oldPosition[0]][oldPosition[1]] = "EMPTY";
            world[snake[2][0]][snake[2][1]] = "SNAKE";
            creerDamier();
        }
        else if (direction === 'LEFT') {
            snake.push([snake[2][0],snake[2][1]-1]);
            let oldPosition = snake.shift();
            world[oldPosition[0]][oldPosition[1]] = "EMPTY";
            world[snake[2][0]][snake[2][1]] = "SNAKE";
            creerDamier();
        }
        else if (direction === 'RIGHT') {
            snake.push([snake[2][0],snake[2][1]+1]);
            let oldPosition = snake.shift();
            world[oldPosition[0]][oldPosition[1]] = "EMPTY";
            world[snake[2][0]][snake[2][1]] = "SNAKE";
            creerDamier();
        }
        else if (direction === 'DOWN') {
            snake.push([snake[2][0]+1,snake[2][1]]);
            let oldPosition = snake.shift();
            world[oldPosition[0]][oldPosition[1]] = "EMPTY";
            world[snake[2][0]][snake[2][1]] = "SNAKE";
            creerDamier();
        }
    }
}

function step(key) {
    console.log(key.code);
    if (key.code == "ArrowUp") {
        direction = 'UP';
    }
    else if (key.code == "ArrowLeft") {
        direction = 'LEFT';
    }
    else if (key.code == "ArrowRight") {
        direction = 'RIGHT';
    }
    else if (key.code == "ArrowDown") {
        direction = 'DOWN';
    }
}

function apparitionPomme() {
    let x=Math.floor(Math.random(11)*10);
    let y=Math.floor(Math.random(11)*10);
    if (world[x][y]!="EMPTY") {
        apparitionPomme();
    }
    world[x][y]="FOOD";
    food[0][0] = x;
    food[0][1] = y;
}

function restart() {
    document.getElementById("reessayer").style.display = "none";
    for(let i = 0; i < world.length; i++) {
        for(let j = 0; j < world.length; j++) {
            world[i][j] = "EMPTY";
        }
    }
    snake = [[8,1], [8,2], [8,3]];
    world[snake[0][0]][snake[0][1]] = "SNAKE";
    world[snake[1][0]][snake[1][1]] = "SNAKE";
    world[snake[2][0]][snake[2][1]] = "SNAKE";
    food = [[1,8]];
    world[food[0][0]][food[0][1]] = "FOOD";
    direction = "";
    score = 0;
    document.getElementById("score").textContent = "Score : " + score;
    main();
}

function main() {
    creerDamier();
    var key = addEventListener("keydown", step);
    interval = setInterval(move, 500);
}

main();
