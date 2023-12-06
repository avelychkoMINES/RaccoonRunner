var btn = document.getElementById("button");
var canvas = document.getElementById("canvas");
var draw = canvas.getContext("2d");

var cur_time_html = document.getElementById("cur_time");
var best_time_html = document.getElementById("best_time");

var character_image = new Image();
var level_one_image = new Image();
var level_two_image = new Image();
var level_three_image = new Image();
var collectable_image = new Image();

var level_one_collectables = [[40,200], [40,300], [40,350], [50,105], [150,105],[250,105],[350,105],[450,100],[550,100],[50,40], [100,45] , [200,45] , [300,45] , [400,45] , [500,45] , [600,45] , [700,45], [400,200]]; //TODO: add locations to add apples
var level_two_collectables = [[1,1]];//TODO: add locations to add apples
var level_three_collectables = [[45,50],[45,100],[45,150],[45,200],[45,250],[45,300],[45,350],[50,50],[100,50],[150,50],[200,50],[250,50],[300,50],[350,50],[400,50],[450,50],[550,50],[500,50],[600,50],[650,50],[700,50],[740,50],[740,100],[740,150],[740,200],[740,250],[740,300],[740,350],[740,400],[740,450],[740,500]];//TODO: add locations to add apples

character_image.src = "images/raccoon.png";  
level_one_image.src = "images/level_one.jpg";  
level_two_image.src = "images/level_two.jpg";  
level_three_image.src = "images/level_three.jpg";  
collectable_image.src = "images/apple.webp";

var raccoon_offset_x = character_image.width / 2; //sets up collision bounds
var raccoon_offset_y = character_image.height / 2;//sets up collision bounds
var collision_radius = raccoon_offset_x- 10;

var x = 0; 
var y = 0; 
var finish_x = 0; 
var finish_y = 0;
var step = 5;
var level_image;
var level_array;
var level;

var curTime = 0;
var bestTime = 0;
var timer; 
var points = 0;

function play() {
    if (btn.value == "Start") {
        canvas.style.display = "inline-block";
        btn.style.display = "none";
        //if play button is pressed, go to level one
        points = 0;
        timer = setInterval(updateTimer, 1000);
        updateTimer();
        levelThree();
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
    x = 10; 
    y = 40;
    finish_x = 790; 
    finish_y = 290;
    level_image = level_one_image;
    level_array = level_one_collectables;
    level = 1;

    update();
}

function levelTwo() {
    x = 317; 
    y = 107; 
    finish_x = 0; 
    finish_y = 297; 
    level_image = level_two_image;
    level_array = level_two_collectables;
    level = 2;

    update();
}

function levelThree() {
    x = 30;
    y = 50; 
    finish_x = 780; 
    finish_y = 295; 
    level_image = level_three_image;
    level_array = level_three_collectables;
    level = 3;

    update();
}

function gameOver() {
    clearInterval(timer);
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
    
    //TODO: draw maze level walls

    //checks collectables and draws them
    for(var i =0; i < level_array.length; i++){
        if(level_array[i] != undefined){
            console.log(character_image.width);
            if(((level_array[i][0] - 20 - collision_radius   <= x + raccoon_offset_x) && (level_array[i][0] + 40 + collision_radius  >= x + raccoon_offset_x)) && ((level_array[i][1] - 20 - collision_radius  <= y + raccoon_offset_y) && (level_array[i][1] + 20 + collision_radius  >= y + raccoon_offset_y))){
                points++;
                delete level_array[i];
            }else if(level_array[i] != undefined){
                draw.drawImage(collectable_image, level_array[i][0], level_array[i][1], 20, 20); //might need to update image size
            }
        }
        
    }

    draw.drawImage(character_image, x, y); //draw character image

    document.getElementById('points').textContent = "Points: " + points;

    //if reached finish, go onto next
    if (level == 1) {
        if (x + character_image.width >= finish_x - step && y + character_image.height >= finish_y - step) {
            levelTwo();
        }
    } else if (level == 2) {
        if (x <= finish_x + 5 && y + character_image.height >= finish_y - step) {
            levelThree();
        }
    } else if (level == 3) {
        if (x + character_image.width >= finish_x - step && y + character_image.height >= finish_y - step) {
            gameOver();
        }
    }
}

//updates timer every second
function updateTimer() {
    curTime = curTime + 1;
    document.getElementById('cur_time').textContent = "Your Time: " + curTime;
}

//TODO: check against maze walls collision
//arrow key listener
//e.preventDefault stops it from scrolling page
document.addEventListener('keydown', function(e) {
    if (e.key == "ArrowRight") {
        e.preventDefault();
        if (x + character_image.width <= canvas.width) {
            x += step;
            update();
        }
    }
    else if (e.key == "ArrowLeft") {
        e.preventDefault();
        if (x - step >= 0) {
            x -= step;
            update();
        }
    }
    else if (e.key == "ArrowUp") {
        e.preventDefault();
        if (y - step >= 0) {
            y -= step;
            update();
        }
    }
    else if (e.key == "ArrowDown") {
        e.preventDefault();
        if (y + step + character_image.height <= canvas.height) {
            y += step;
            update();
        }
    }
});

//TODO: remove, used to check start and finish points
// document.addEventListener("DOMContentLoaded", function () {
//     canvas.addEventListener("click", function (event) {
//         var rect = canvas.getBoundingClientRect();
//         var x = event.clientX - rect.left;
//         var y = event.clientY - rect.top;

//         alert("Coordinates: (" + x + ", " + y + ")");
//     });
// });