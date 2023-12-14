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

var level_one_collectables = [[50,17],[50,72],[50,159],[50,284],[171,248],[171,160],[116,158],[222,70],[278,69],[280,157],[280,245],[348,286],[351,249],[493,247],[495,163],[438,159],[349,159],[345,71],[434,74],[543,72],[542,14],[293,14],[546,160]]; 
var level_two_collectables = [[76,19],[77,122],[149,123],[148,18],[277,20],[200,127],[226,179],[149,216],[276,178],[275,122],[277,71],[277,322],[366,321],[459,318],[365,248],[453,248],[451,182],[489,105],[366,178],[366,72],[454,70],[456,16]];
var level_three_collectables = [[43,163],[40,33],[43,305],[95,247],[96,124],[97,33],[170,68],[169,124],[260,31],[258,72],[259,160],[168,162],[167,194],[169,250],[151,288],[154,325],[223,321],[307,322],[259,249],[307,249],[310,191],[476,213],[397,248],[477,156],[525,86],[397,86]];

var reset_level_one = level_one_collectables;
var reset_level_two = level_two_collectables;
var reset_level_three = level_three_collectables;

character_image.src = "images/raccoon.png";  
level_one_image.src = "images/one.jpg";  
level_two_image.src = "images/two.jpg";  
level_three_image.src = "images/three.jpg";  
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
        //reset collectable locations
        level_one_collectables = [[50,17],[50,72],[50,159],[50,284],[171,248],[171,160],[116,158],[222,70],[278,69],[280,157],[280,245],[348,286],[351,249],[493,247],[495,163],[438,159],[349,159],[345,71],[434,74],[543,72],[542,14],[293,14],[546,160]]; 
        level_two_collectables = [[76,19],[77,122],[149,123],[148,18],[277,20],[200,127],[226,179],[149,216],[276,178],[275,122],[277,71],[277,322],[366,321],[459,318],[365,248],[453,248],[451,182],[489,105],[366,178],[366,72],[454,70],[456,16]];
        level_three_collectables = [[43,163],[40,33],[43,305],[95,247],[96,124],[97,33],[170,68],[169,124],[260,31],[258,72],[259,160],[168,162],[167,194],[169,250],[151,288],[154,325],[223,321],[307,322],[259,249],[307,249],[310,191],[476,213],[397,248],[477,156],[525,86],[397,86]];
        canvas.style.display = "inline-block";
        btn.style.display = "none";
        //if play button is pressed, go to level one
        points = 0;
        timer = setInterval(updateTimer, 1000);
        updateTimer();
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
    x = 0; 
    y = 0; 
    finish_x = canvas.width/2; 
    finish_y = canvas.height/2; 
    level_image = level_one_image;
    level_array = level_one_collectables;
    level = 1;

    update();
}

function levelTwo() {
    x = 0; 
    y = 0; 
    finish_x = 569; 
    finish_y = 102; 
    level_image = level_two_image;
    level_array = level_two_collectables;
    level = 2;

    update();
}

function levelThree() {
    x = 1; 
    y = 160; 
    finish_x = 569; 
    finish_y = 157; 
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
    character_image.width /= 2; // Resize width by half
    character_image.height /= 2; // Resize height by half
    raccoon_offset_x = character_image.width / 2; // Update collision bounds
    raccoon_offset_y = character_image.height / 2; // Update collision bounds
    update();
};

function update() {
    draw.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    draw.drawImage(level_image, 0, 0, canvas.width, canvas.height); // draw level image

    // checks collectables and draws them
    for (var i = 0; i < level_array.length; i++) {
        if (level_array[i] != undefined) {
            if (
                ((level_array[i][0] - 40 - collision_radius <= x + raccoon_offset_x) &&
                    (level_array[i][0] + 40 + collision_radius >= x + raccoon_offset_x)) &&
                ((level_array[i][1] - 20 - collision_radius <= y + raccoon_offset_y) &&
                    (level_array[i][1] + 20 + collision_radius >= y + raccoon_offset_y))
            ) {
                points++;
                delete level_array[i];
            } else if (level_array[i] != undefined) {
                draw.drawImage(collectable_image, level_array[i][0], level_array[i][1], 20, 20); // might need to update image size
            }
        }
    }

    draw.drawImage(character_image, x, y); // draw character image


    document.getElementById('points').textContent = 'Points: ' + points;

    //if reached finish, go onto next
    if (level == 1) {
        if (x + character_image.width >= finish_x - step && y + character_image.height >= finish_y - step) {
            levelTwo();
        } 
    } else if (level == 2) {
        if (x <= finish_x + 5 && y + character_image.height >= finish_y - step) {
            levelThree();
        } 
    } else {
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

// check against maze walls collision
// Level One obstacles
var level_one_obstacles = [
    "levelOneObstacle1",
    "levelOneObstacle2",
    "levelOneObstacle3",
    "levelOneObstacle4",
    "levelOneObstacle5",
    "levelOneObstacle6",
    "levelOneObstacle7",
    "levelOneObstacle8",
    "levelOneObstacle9",
    "levelOneObstacle10",
    "levelOneObstacle11",
    "levelOneObstacle12",
    "levelOneObstacle13",
    "levelOneObstacle14",
    "levelOneObstacle15",
    "levelOneObstacle16",
    "levelOneObstacle17",
    "levelOneObstacle18",
    "levelOneObstacle19",
    "levelOneObstacle20"
];

// Updated isLevelOneObstacle function to handle multiple obstacles
function isLevelOneObstacle(x, y) {
    for (var i = 0; i < level_one_obstacles.length; i++) {
        var obstacleArea = document.getElementById(level_one_obstacles[i]).coords.split(",").map(Number);
        if (
            x >= obstacleArea[0] && x <= obstacleArea[2] &&
            y >= obstacleArea[1] && y <= obstacleArea[3]
        ) {
            return true; // Point is within the bounds of at least one obstacle
        }
    }
    return false; // Point is not within the bounds of any obstacle
}

var level_two_obstacles = [
    "levelTwoObstacle1",
    "levelTwoObstacle2",
    "levelTwoObstacle3",
    "levelTwoObstacle4",
    "levelTwoObstacle5",
    "levelTwoObstacle6",
    "levelTwoObstacle7",
    "levelTwoObstacle8",
    "levelTwoObstacle9",
    "levelTwoObstacle10",
    "levelTwoObstacle11",
    "levelTwoObstacle12",
    "levelTwoObstacle13",
    "levelTwoObstacle14",
    "levelTwoObstacle15",
    "levelTwoObstacle16",
    "levelTwoObstacle17",
    "levelTwoObstacle18",
    "levelTwoObstacle19",
    "levelTwoObstacle20"
];

// Updated isLevelTwoObstacle function to handle multiple obstacles
function isLevelTwoObstacle(x, y) {
    for (var i = 0; i < level_two_obstacles.length; i++) {
        var obstacleArea = document.getElementById(level_two_obstacles[i]).coords.split(",").map(Number);
        if (
            x >= obstacleArea[0] && x <= obstacleArea[2] &&
            y >= obstacleArea[1] && y <= obstacleArea[3]
        ) {
            return true; // Point is within the bounds of at least one obstacle
        }
    }
    return false; // Point is not within the bounds of any obstacle
}

var level_three_obstacles = [
    "levelThreeObstacle1",
    "levelThreeObstacle2",
    "levelThreeObstacle3",
    "levelThreeObstacle4",
    "levelThreeObstacle5",
    "levelThreeObstacle6",
    "levelThreeObstacle7",
    "levelThreeObstacle8",
    "levelThreeObstacle9",
    "levelThreeObstacle10",
    "levelThreeObstacle11",
    "levelThreeObstacle12",
    "levelThreeObstacle13",
    "levelThreeObstacle14",
    "levelThreeObstacle15",
    "levelThreeObstacle16",
    "levelThreeObstacle17",
    "levelThreeObstacle18",
    "levelThreeObstacle19",
    "levelThreeObstacle20",
    "levelThreeObstacle21",
    "levelThreeObstacle22",
    "levelThreeObstacle23",
    "levelThreeObstacle24",
    "levelThreeObstacle25",
    "levelThreeObstacle26",
    "levelThreeObstacle27",
    "levelThreeObstacle28",
    "levelThreeObstacle29",
    "levelThreeObstacle30",
    "levelThreeObstacle31"

];

// Updated isLevelThreeObstacle function to handle multiple obstacles
function isLevelThreeObstacle(x, y) {
    for (var i = 0; i < level_three_obstacles.length; i++) {
        var obstacleArea = document.getElementById(level_three_obstacles[i]).coords.split(",").map(Number);
        if (
            x >= obstacleArea[0] && x <= obstacleArea[2] &&
            y >= obstacleArea[1] && y <= obstacleArea[3]
        ) {
            return true; // Point is within the bounds of at least one obstacle
        }
    }
    return false; // Point is not within the bounds of any obstacle
}

// Arrow key listener
document.addEventListener('keydown', function(e) {
    if (e.key == "ArrowRight") {
        e.preventDefault();
        if (x + character_image.width <= canvas.width) {
            if (level === 1 && !isLevelOneObstacle(x + step, y)) {
                x += step;
                checkLevelCompletion();
            } else if (level === 2 && !isLevelTwoObstacle(x + step, y)) {
                x += step;
                checkLevelCompletion();
            } else if (level === 3 && !isLevelThreeObstacle(x + step, y)) {
                x += step;
                checkLevelCompletion();
            } else {
                alert("Stay on the path!");
            }
            update();
        }
    }
    else if (e.key == "ArrowLeft") {
        e.preventDefault();
        if (x - step >= 0) {
            if (level === 1 && !isLevelOneObstacle(x - step, y)) {
                x -= step;
                checkLevelCompletion();
            } else if (level === 2 && !isLevelTwoObstacle(x - step, y)) {
                x -= step;
                checkLevelCompletion();
            } else if (level === 3 && !isLevelThreeObstacle(x - step, y)) {
                x -= step;
                checkLevelCompletion();
            } else {
                alert("Stay on the path!");
            }
            update();
        }
    }
    else if (e.key == "ArrowUp") {
        e.preventDefault();
        if (y - step >= 0) {
            if (level === 1 && !isLevelOneObstacle(x, y - step)) {
                y -= step;
                checkLevelCompletion();
            } else if (level === 2 && !isLevelTwoObstacle(x, y - step)) {
                y -= step;
                checkLevelCompletion();
            } else if (level === 3 && !isLevelThreeObstacle(x, y - step)) {
                y -= step;
                checkLevelCompletion();
            } else {
                alert("Stay on the path!");
            }
            update();
        }
    }
    else if (e.key == "ArrowDown") {
        e.preventDefault();
        if (y + step + character_image.height <= canvas.height) {
            if (level === 1 && !isLevelOneObstacle(x, y + step)) {
                y += step;
                checkLevelCompletion();
            } else if (level === 2 && !isLevelTwoObstacle(x, y + step)) {
                y += step;
                checkLevelCompletion();
            } else if (level === 3 && !isLevelThreeObstacle(x, y + step)) {
                y += step;
                checkLevelCompletion();
            } else {
                alert("Stay on the path!");
            }
            update();
        }
    }
});

