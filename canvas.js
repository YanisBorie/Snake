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
var canvas = document.getElementById('mycanvas1');
var ctx = canvas.getContext('2d');
let direction;


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

function main() {
    creerDamier();
    var key = addEventListener("keydown", step);
    setInterval(move, 500);
}

main();