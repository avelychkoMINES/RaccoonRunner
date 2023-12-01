var btn = document.getElementById("button");
var canvas = document.getElementById("canvas");
var draw = canvas.getContext("2d");

var cur_time_html = document.getElementById("cur_time");
var best_time_html = document.getElementById("best_time");

var character_image = new Image();
var level_one_image = new Image();
var level_two_image = new Image();
var level_three_image = new Image();

character_image.src = "images/raccoon.png";  
level_one_image.src = "images/level_one.jpg";  
level_two_image.src = "images/level_two.jpg";  
level_three_image.src = "images/level_three.jpg";  

var x = 0; 
var y = 0; 
var finish_x = 0; 
var finish_y = 0;
var step = 5;
var level_image;

var curTime = 0;
var bestTime = 0;

function play() {
    if (btn.value == "Start") {
        canvas.style.display = "inline-block";
        btn.style.display = "none";
        //if play button is pressed, go to level one
        levelOne();
    }
    else {
        mainMenu();
    }
}

//screens
function mainMenu() {
    btn.value = "Start";
    btn.innerHTML = "Start Game";
    canvas.style.display = "none";
    btn.style.display = "inline-block";
    cur_time_html.innerHTML = "";
    best_time_html.innerHTML = "";
    curTime = 0; //reset current time if game was restarted
}


function levelOne() {
    x = 0; //TODO: set where the start is
    y = 0; //TODO: set where the start is
    finish_x = canvas.width; //TODO: set where the end is
    finish_y = canvas.height; //TODO: set where the end is
    level_image = level_one_image;

    update();
    //TODO: if reached exit, go to level two
    if (x + character_image.width >= finish_x && y + character_image.height >= finish_y) {
        levelTwo();
    }
}

function levelTwo() {
    x = 0; //TODO: set where the start is 
    y = 0; //TODO: set where the start is
    finish_x = 0; //TODO: set where the end is
    finish_y = 0; //TODO: set where the end is
    level_image = level_two_image;

    update();
    //TODO: if reached exit, go to level three
    if (x + character_image.width / 2 >= finish_x && y + character_image.height / 2 >= finish_y) {
        levelThree();
    }
}

function levelThree() {
    x = 0; //TODO: set where the start is
    y = 0; //TODO: set where the start is
    finish_x = 0; //TODO: set where the end is
    finish_y = 0; //TODO: set where the end is
    level_image = level_three_image;

    update();
    //TODO: if reached exit, display results
    if (x + character_image.width >= finish_x && y + character_image.height >= finish_y) {
        gameOver();
    }
}

function gameOver() {
    btn.value = "Restart";
    btn.innerHTML = "Restart Game";
    canvas.style.display = "none";
    btn.style.display = "inline-block";
    document.getElementById("instructions").style.display = "none";
    
    //check if current time is better than best time
    if (bestTime == 0 || bestTime > curTime) {
        bestTime = curTime;
    }

    cur_time_html.innerHTML = "Your Time: <br><b>" + curTime + "</b>";
    best_time_html.innerHTML = "Best Time: <br><b>" + bestTime + "</b>";
}

//character
character_image.onload = function() {
    update();
};

function update() {
    draw.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    draw.drawImage(level_image, 0, 0, canvas.width, canvas.height); //draw level image
    draw.drawImage(character_image, x, y); //draw character image
    //TODO: draw maze level walls
}


//TODO: check against maze walls collision
//arrow key listener
document.addEventListener('keydown', function(e) {
    if (e.key == "ArrowRight") {
        if (x + character_image.width <= canvas.width) {
            x += step;
            update();
        }
    }
    else if (e.key == "ArrowLeft") {
        if (x - step >= 0) {
            x -= step;
            update();
        }
    }
    else if (e.key == "ArrowUp") {
        if (y - step >= 0) {
            y -= step;
            update();
        }
    }
    else if (e.key == "ArrowDown") {
        if (y + step + character_image.height <= canvas.height) {
            y += step;
            update();
        }
    }
});