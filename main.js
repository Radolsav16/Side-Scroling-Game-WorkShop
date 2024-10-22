// Gets Elements 
const gameStartDiv = document.querySelector('.game-start');
const gameScoreDiv = document.querySelector('.game-score');
const gamePoints = document.querySelector('.points');
const gameAreaDiv = document.querySelector('.game-area');
const gameOverDiv = document.querySelector('.game-over');

const coordinatesMax = {
    top:15,
    bottom:540,
    left:15,
    rigth:1000
}

let keys = {};
let player = {
    x:150,
    y:100,
    width:0,
    heigth:0,
    lastTimeFireBall:0
};

let scene = {
    score:0
}

let game = {
    speed:2,
    movingMultiplayer:4,
    fireMultiplyer:5,
    fireInterval : 200
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
}

function onKeyUp(e){
    keys[e.code] = false;
}

function addFireBall(player){
   
    let fireball = document.createElement('div');
    
    fireball.classList.add('fire-ball');

    fireball.style.top = (player.y + player.heigth / 3 - 5) + 'px';
    fireball.x = player.x + player.width;
    fireball.style.left = fireball.x + 'px';



    gameAreaDiv.appendChild(fireball);
 }

function gameAction(timestamp){
    const wizard = document.querySelector('.wizard');
    

   


    scene.score++;


    if(keys.Space && timestamp - player.lastTimeFireBall > game.fireInterval){
        wizard.classList.add('wizard-fire');
        addFireBall(player)
        player.lastTimeFireBall = timestamp
    }else{
        wizard.classList.remove('wizard-fire');

    }
    
    
    let isinAir = (player.y + player.heigth) <= gameAreaDiv.offsetHeight;

    if(isinAir){
        player.y += game.speed;
    }

    
    
    if(keys.ArrowUp &&  player.y > coordinatesMax.top){ 
        player.y -= game.speed * game.movingMultiplayer
    }

    if(keys.ArrowDown && player.y < coordinatesMax.bottom){
        player.y += game.speed * game.movingMultiplayer;
    }

    if(keys.ArrowLeft && player.x > coordinatesMax.left){
        player.x -= game.speed * game.movingMultiplayer;

    }

    if(keys.ArrowRight && player.x  < coordinatesMax.rigth){
        player.x += game.speed * game.movingMultiplayer

    }

    const fireballs = document.querySelectorAll('.fire-ball');

   
    

    fireballs.forEach((fireball)=>{
        fireball.x += game.speed * game.fireMultiplyer;
        fireball.style.left = fireball.x + 'px';

        if(fireball.x + fireball.offsetWidth > gameAreaDiv.offsetWidth){
            fireball.parentElement.removeChild(fireball)
        }
    })


    wizard.style.top = `${player.y}px`;
    wizard.style.left = `${player.x}px`;

   



    gameScoreDiv.textContent = `${scene.score} pts.`;



    window.requestAnimationFrame(gameAction);
}
