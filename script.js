const Gameboard = document.getElementById('gameboard');
console.log(Gameboard);
const context = Gameboard.getContext('2d');
const WIDTH = Gameboard.width;
const HEIGHT = Gameboard.height;
const scorett = document.getElementById('scoreVal');
console.log(scorett);

const UNIT = 25;

let foodX;
let foodY;

let xVel = 25;
let yVel = 0;
let score = 0;
let active  = true;
let started = false;

let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];


startGame();

function startGame(){
    context.fillStyle = 'black';
    context.fillRect(0,0,WIDTH,HEIGHT);

    createFood();
    displayFood();
    // drawSnake();
    // moveSnake();
    // clearBoard();
    drawSnake();
    nextTick();
    
}

window.addEventListener('keydown',keyPress);

function clearBoard(){
    context.fillStyle = 'black';
    context.fillRect(0,0,WIDTH,HEIGHT);

}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
    


}
function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,UNIT,UNIT);
}

function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = 'black'
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
    

}

function moveSnake(){
    const head = {x:snake[0].x+xVel,
                     y:snake[0].y+yVel}
         snake.unshift(head)

         if(snake[0].x==foodX && snake[0].y==foodY){
            createFood();
            score += 1;
            scorett.textContent = score;
         }
         else
         snake.pop();            
}

function nextTick(){
    if(active){
    setTimeout(() => {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        nextTick();
        checkGameOver();
        



    },300);
}
else{
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "White";
    context.textAlign  = "center";
    context.fillText("Game over !!" ,WIDTH/2,HEIGHT/2);
}
}

function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    }
    const LEFT = 37;
    const RIGHT = 38;
    const UP = 39;
    const DOWN = 40;


    switch (true){
        case (event.keyCode ==LEFT ):
            xVel=-UNIT;
            yVel=0;
            break;
            case(event.keyCode ==RIGHT  ):
            xVel =UNIT;
            yVel=0;
            break;
            case(event.keyCode ==UP  ):
            xVel=0;
            yVel=-UNIT;
            break;
            case(event.keyCode ==DOWN):
            xVel=0;
            yVel=UNIT;
            break;
    }

}

function checkGameOver(){
    switch (true){
        case(snake[0].x<0):
        case(snake[0].x>WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>HEIGHT):
        active = false;
        break;
    }
}