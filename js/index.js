// Game Constnts & Variable Here 
let inputDir = {x: 0, y: 0};
let board = document.getElementById('board')
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let hiscore = localStorage.getItem('hiscore');
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y: 15}
]
let food = {x:6, y: 7}
// Game Function
function main(ctime){

window.requestAnimationFrame(main)


if((ctime - lastPaintTime)/1000 < 1/speed){
    return;
}

lastPaintTime = ctime;
gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you Bump into the Wall 
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
    return true;
    }
}

function gameEngine(){
    // Part 1: Updating the snake array & Food 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.load();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert('Game Over . Press any key to play again!');
        snakeArr = [{x:13, y: 15}];
        window.location.reload()
        musicSound.play();
        score = 0;
    }



    // If you have eaten the food,  increment the score and regenreate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscore){
            localStorage.setItem('hiscore',score)
        }
        score_number.innerHTML = score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y:Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>= 0; i--) {
        // const element = [i];
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    // Part 2: Display the snake Array 
    // Display the snake 
    board.innerHTML = '';
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        board.appendChild(snakeElement);
        if( index === 0 ){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
    })
    // Display the Food 

    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}




// Main Logic Starts Here 

if(hiscore === null){
    localStorage.setItem('hiscore',0)
}else{
    highScoreNumber.innerHTML = hiscore;
}
// localStorage.clear()

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':
        console.log('ArrowUp')
        inputDir.x = 0;
        inputDir.y = -1;
            break;

        case 'ArrowDown':
        console.log('ArrowDown')
        inputDir.x = 0;
        inputDir.y = 1;
            break;

        case 'ArrowLeft':
        console.log('ArrowLeft')
        inputDir.x = -1;
        inputDir.y = 0;
            break;

        case 'ArrowRight':
        console.log('ArrowRight')
        inputDir.x = 1;
        inputDir.y = 0;
            break;


        default:
            break;
    }
});


// Modal Code Here 
// Get the modal
var modal = document.getElementById("myModal");
// Easy speed Selection
easy.onclick = function() {
    modal.style.display = "none";
    musicSound.play();
    speed = 4
}

// Medium speed Selection

medium.onclick = function() {
    modal.style.display = "none";
    musicSound.play();
    speed = 6
}

// Hard speed Selection

hard.onclick = function() {
  modal.style.display = "none";
  musicSound.play();
  speed = 10
}


// The Code for mobile device 
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            console.log('left Swipe');
            inputDir.x = -1;
            inputDir.y = 0;
        } else {
            /* right swipe */
            console.log('Right Swipe');
            inputDir.x = 1;
            inputDir.y = 0;
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            console.log('Up Swipe');
            inputDir.x = 0;
            inputDir.y = -1;
        } else { 
            /* down swipe */
            console.log('down Swipe');
            inputDir.x = 0;
            inputDir.y = 1;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
