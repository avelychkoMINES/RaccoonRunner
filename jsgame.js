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

var level_one_collectables = [[40,200], [40,300], [40,350], [50,105], [150,105],[250,105],[350,105],[450,100],[550,100],[50,40], [100,45] , [200,45] , [300,45] , [400,45] , [500,45] , [600,45] , [700,45], [390,200], [740,110], [740,200], [740,300], [740,400], [630,110],[630,200],[630,300],[630,400],[700,200],[700,300],[580,200],[580,300],[580,400],[735,500],[640,490],[590,490], [590,550],[640,550],[530,550],[530,490], [535,430],[300,260],[200,265],[140,260],[140,360],[140,160],[90,160],[90,225],[300,180], [220,180],[470,165],[550,165], [390,130],[450,220]]; 
var level_two_collectables = [[10,290],[740,50], [730,370],[737,200],[640,110],[735,540],[540,545],[545,250],[545,160],[250,540],[40,50],[40,540],[40,180], [40, 360],[400,50],[735,430], [500,430],[300,430],[135,430],[350,540],[640,540],[640,390],[640,220],[300,210],[405,210],[500,360],[350,360],[140,250],[140,70],[300,370],[200,270],[420,275],[190,360],[300,270],[80,200],[80,300],[250,150],[200,110]];
var level_three_collectables = [[45,50],[45,100],[45,150],[45,200],[45,250],[45,300],[45,350],[45,450],[45,500],[50,50],[100,50],[150,50],[200,50],[250,50],[300,50],[350,50],[400,50],[450,50],[550,50],[500,50],[600,50],[650,50],[700,50],[740,50],[450, 110],[740,100],[740,150],[740,200],[740,250],[740,300],[740,350],[740,400],[740,450],[740,500],[640, 100],[640, 150],[640, 200],[640, 250],[640, 300],[640, 350],[640, 400],[370, 110],[200, 110],[250, 110],[300, 110],[400, 110],[370, 150],[370, 200],[370, 250], [100,370], [150,370], [200,370], [250,360], [300,360], [350,360], [400,360], [140,110], [140,150], [140,200], [140,250], [140,300], [140,350], [140,400], [140,450], [140,500], [140,550], [100,435], [150,435], [200,435], [250,435], [300,435], [350,435], [400,435], [450,435], [500,435], [550,435], [600,435],[700,150],[700,200],[700,250],[700,300],[700,350],[700,400],[100,550],[260,550],[300,550],[350,550],[400,550],[550,550], [600,550],[650,550],[75,480], [250,480], [300,480], [350,480],[230,150], [230,200], [230,250], [240,520],[320,150],[370,150],[600,490],[650,490], [270,275],[320,275], [370,275],[420,275],[470,275],[520,275],[570,275],[580,350],[580,400], [580,300],[400,205],[450,205],[520,200],[520,150],[520,250],[540,500],[520,110],[580,110],[480,300],[480,350],[430,500],[430,450], [430,400]];
var reset_level_one = level_one_collectables;
var reset_level_two = level_two_collectables;
var reset_level_three = level_three_collectables;

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
        //reset collectable locations
        level_one_collectables = [[40,200], [40,300], [40,350], [50,105], [150,105],[250,105],[350,105],[450,100],[550,100],[50,40], [100,45] , [200,45] , [300,45] , [400,45] , [500,45] , [600,45] , [700,45], [390,200], [740,110], [740,200], [740,300], [740,400], [630,110],[630,200],[630,300],[630,400],[700,200],[700,300],[580,200],[580,300],[580,400],[735,500],[640,490],[590,490], [590,550],[640,550],[530,550],[530,490], [535,430],[300,260],[200,265],[140,260],[140,360],[140,160],[90,160],[90,225],[300,180], [220,180],[470,165],[550,165], [390,130],[450,220]]; 
        level_two_collectables = [[10,290],[740,50], [730,370],[737,200],[640,110],[735,540],[540,545],[545,250],[545,160],[250,540],[40,50],[40,540],[40,180], [40, 360],[400,50],[735,430], [500,430],[300,430],[135,430],[350,540],[640,540],[640,390],[640,220],[300,210],[405,210],[500,360],[350,360],[140,250],[140,70],[300,370],[200,270],[420,275],[190,360],[300,270],[80,200],[80,300],[250,150],[200,110]];
        level_three_collectables = [[45,50],[45,100],[45,150],[45,200],[45,250],[45,300],[45,350],[45,450],[45,500],[50,50],[100,50],[150,50],[200,50],[250,50],[300,50],[350,50],[400,50],[450,50],[550,50],[500,50],[600,50],[650,50],[700,50],[740,50],[450, 110],[740,100],[740,150],[740,200],[740,250],[740,300],[740,350],[740,400],[740,450],[740,500],[640, 100],[640, 150],[640, 200],[640, 250],[640, 300],[640, 350],[640, 400],[370, 110],[200, 110],[250, 110],[300, 110],[400, 110],[370, 150],[370, 200],[370, 250], [100,370], [150,370], [200,370], [250,360], [300,360], [350,360], [400,360], [140,110], [140,150], [140,200], [140,250], [140,300], [140,350], [140,400], [140,450], [140,500], [140,550], [100,435], [150,435], [200,435], [250,435], [300,435], [350,435], [400,435], [450,435], [500,435], [550,435], [600,435],[700,150],[700,200],[700,250],[700,300],[700,350],[700,400],[100,550],[260,550],[300,550],[350,550],[400,550],[550,550], [600,550],[650,550],[75,480], [250,480], [300,480], [350,480],[230,150], [230,200], [230,250], [240,520],[320,150],[370,150],[600,490],[650,490], [270,275],[320,275], [370,275],[420,275],[470,275],[520,275],[570,275],[580,350],[580,400], [580,300],[400,205],[450,205],[520,200],[520,150],[520,250],[540,500],[520,110],[580,110],[480,300],[480,350],[430,500],[430,450], [430,400]];
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
            if(((level_array[i][0] -40 - collision_radius   <= x + raccoon_offset_x) && (level_array[i][0] + 40 + collision_radius  >= x + raccoon_offset_x)) && ((level_array[i][1] - 20 - collision_radius  <= y + raccoon_offset_y) && (level_array[i][1] + 20 + collision_radius  >= y + raccoon_offset_y))){
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