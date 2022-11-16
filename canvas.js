let world = [
    ['EMPTY', 'FOOD', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'SNAKE', 'SNAKE', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'SNAKE', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
    ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
  ];
var canvas = document.getElementById('mycanvas1');
var ctx = canvas.getContext('2d');


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

function main() {
    creerDamier();
}

main();