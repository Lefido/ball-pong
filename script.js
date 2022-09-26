


const affScore_p1 = document.querySelector('.score-p1');
const affScore_p2 = document.querySelector('.score-p2');

const life_p1 = document.querySelector('.life-p1')
const life_p2 = document.querySelector('.life-p2')

const game_over = document.querySelector('.game-over');


// Ball 
const body = document.querySelector('body'); // Affectation du Body Html a la variable body
const ball = document.querySelector('.ball'); // Affectation de la Ball Html a la variable ball

var bx = body.offsetWidth /2; // Position x de la ball
var by = body.offsetHeight / 2; // Position y de la ball

var score_p1 = 0
var score_p2 = 0

var vie_p1 = 3
var vie_p2 = 3


var bvx = 4; // Vitesse x de la Ball
var bvy = 2; // Vitesse y de la Ball

var speed_ball = 0;
var modulo = 3;


ball.style.left = bx + "px";
ball.style.top = by + "px";


// star

var running = false;
var map = {}; // You could also use an array

const button = document.querySelector(".start")
button.addEventListener("click", function() {
    if (running) {
        running = false;
        ball.style.visibility = "hidden"
        button.style.visibility = "visible"
        map = {}; // You could also use an array
        bvx = 4;
    } else {
        running = true;
        game_over.style.visibility = "hidden";
        ball.style.visibility = "visible"
        button.style.visibility = "hidden"
       
        bx = body.offsetWidth /2; // Position x de la ball
        by = body.offsetHeight / 2;
        map = {}; // You could also use an array
        bvx = 4;
        if (vie_p1 === 0 || vie_p2 === 0) {
            vie_p1 = 3;
            vie_p2 = 3;
            score_p1 = 0
            score_p2 = 0
            life_p1.innerHTML = vie_p1;
            life_p2.innerHTML = vie_p2;
            affScore_p1.innerHTML = score_p1
            affScore_p2.innerHTML = score_p2
        }
     
    }
})


// Player 1

const player_1 = document.querySelector(".player-1");

var pl1_y = player_1.offsetTop - (player_1.offsetHeight /2) - 10
var pl1_vy = 10;

// Player 1

const player_2 = document.querySelector(".player-2");

var pl2_y = player_2.offsetTop - (player_2.offsetHeight / 2) - 10
var pl2_vy = 10;


setInterval(start, 10); // Execution toute les 100 ms

function start() {

    

    if (running) {
        playBall();
        keyPressed();
    }

    
   
    movePlayer_1();
    movePlayer_2();
    colisionBall();

}

function keyPressed(){

    

    onkeydown = onkeyup = function(e){ e = e || e.event; // to deal with IE
    map[e.code] = e.type == 'keydown'; /* insert conditional here */ }

    // console.log(map);

     // Move player 1

    if (map["KeyQ"]) {
        // console.log("P1 Monte")
        pl1_y -= pl1_vy

        if (pl1_y <= 0) {
            pl1_y = 0;
        }
    } else if (map["KeyA"]) {

        pl1_y += pl1_vy

        if (pl1_y >= body.offsetHeight - player_1.offsetHeight - 10) {
            pl1_y = body.offsetHeight - player_1.offsetHeight -10
        }

    }

        // Move player 2

    if (map["NumpadSubtract"]) {

        pl2_y -= pl2_vy

        if (pl2_y <= 0) {
            pl2_y = 0
        }

    }

    if (map["NumpadAdd"]) {

        pl2_y += pl2_vy

        if (pl2_y >= body.offsetHeight - player_2.offsetHeight - 10 ) {
            pl2_y = body.offsetHeight - player_2.offsetHeight - 10
        }

    }



}




function playBall() {

    bx = bx + bvx;
    by = by + bvy;

    if (bx >= body.offsetWidth - 5 || bx <= 0) {

        if (bx <= 0) {

            bx = 0
            // alert("Le player 2 à gagné !");
            button.style.visibility = "visible";
            ball.style.visibility = "hidden";
            vie_p1 -= 1
            life_p1.innerHTML = vie_p1
            running = false;

            if (vie_p1<=0) {
                game_over.innerHTML = "PLAYER 1 PERDU"
                game_over.style.visibility = "visible";
            }
            
           
            
        }

        if (bx >= body.offsetWidth - 5) {
            bx = body.offsetWidth - 5
            // alert("Le player 1 à gagné !");
            button.style.visibility = "visible";
            ball.style.visibility = "hidden";
            vie_p2 -= 1
            life_p2.innerHTML = vie_p2
            running = false;

            if (vie_p2<=0) {
                game_over.innerHTML = "PLAYER 2 PERDU"
                game_over.style.visibility = "visible";
            }
            
        }

        bvx = - bvx
    }

    if (by >= (body.offsetHeight ) - ball.offsetHeight / 2 - 5 || by <= 0) {

        if (by >= body.offsetHeight - ball.offsetHeight / 2 - 5) {
            by = body.offsetHeight - ball.offsetHeight /2 - 5
        }

        if (by <= 0) {
            by = 0
        }
        
        bvy = - bvy
    }

    ball.style.left = bx + "px"
    ball.style.top = by + "px"


}

function movePlayer_1() {

    player_1.style.top = pl1_y + "px"

}

function movePlayer_2() {

    player_2.style.top = pl2_y + "px"

}

function colisionBall() {



if (bx >= player_1.offsetLeft 
    && bx <= player_1.offsetLeft + player_1.offsetWidth
    && by >= player_1.offsetTop 
    && by <=  player_1.offsetTop + player_1.offsetHeight
    ) {

    bx = player_1.offsetLeft + player_1.offsetWidth
    bvx =- bvx
    score_p1 += 10
    affScore_p1.innerHTML = score_p1
    
    speed_ball +=1
    console.log(speed_ball, speed_ball % modulo );

    if (speed_ball % modulo === 0) {
        if (bvx <0 ) {
            bvx -= 1
        } else {
            bvx += 1
        }
        
    }


}

if (bx >= player_2.offsetLeft 
    && bx <= player_2.offsetLeft + player_2.offsetWidth
    && by >= player_2.offsetTop 
    && by <=  player_2.offsetTop + player_2.offsetHeight
    ) {


    bvx =- bvx
    score_p2 += 10
    affScore_p2.innerHTML = score_p2
    speed_ball +=1

    console.log(speed_ball, speed_ball % modulo );

    if (speed_ball % modulo === 0) {
        if (bvx <0 ) {
            bvx -= 1
        } else {
            bvx += 1
        }
    }

}

}



