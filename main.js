// Gets Elements 
const gameStartDiv = document.querySelector('.game-start');
const gameScoreDiv = document.querySelector('.game-score');
const gameAreaDiv = document.querySelector('.game-area');
const gameOverDiv = document.querySelector('.game-over');

let keys = {};
let player = {
    x:150,
    y:100,
    width:0,
    heigth:0
};
let game = {
    speed:2,
    movingMultiplayer:4
};

gameStartDiv.addEventListener('click',onGameStart);

function onGameStart(){
    gameStartDiv.classList.add('hide');
    const wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = `${player.y}px`;
    wizard.style.left = `${player.x}px`;
    gameAreaDiv.appendChild(wizard)

    window.requestAnimationFrame(gameAction);

    player.width = wizard.offsetWidth;
    player.heigth = wizard.offsetHeight;

    

}

document.addEventListener('keydown',onKeyDown);
document.addEventListener('keyup',onKeyUp);




function onKeyDown(e){
    keys[e.code] = true;
    console.log(keys)
}

function onKeyUp(e){
    keys[e.code] = false;
    console.log(keys)
}

function gameAction(){
    const wizard = document.querySelector('.wizard');
    console.log(player)
    
    if(keys.ArrowUp && player.y + player.heigth < gameAreaDiv.offsetHeight){ 
        player.y -= game.speed * game.movingMultiplayer
    }

    if(keys.ArrowDown){
        player.y += game.speed * game.movingMultiplayer;
    }

    if(keys.ArrowLeft && player.x + player.width < gameAreaDiv.offsetWidth){
        player.x -= game.speed * game.movingMultiplayer;

    }

    if(keys.ArrowRight){
        player.x += game.speed * game.movingMultiplayer

    }


    wizard.style.top = `${player.y}px`;
    wizard.style.left = `${player.x}px`;




    window.requestAnimationFrame(gameAction);
}
