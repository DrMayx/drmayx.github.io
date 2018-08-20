var s;
var scl = 20;
var food;

function setup(){
    createCanvas(600, 600);
    s = new Snake();
    frameRate(10);
    pickLocation();
}

function draw(){
    background(51);
    if(s.alive) {
        s.death();
        s.update();
        s.show();
    }else{
        restart();
    }
    if(s.eat(food)){
        pickLocation();
    }
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);

    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function keyPressed(){
    if(s.alive) {
        if (keyCode === UP_ARROW && s.yspeed!=1) {
            s.dir(0, -1);
        } else if (keyCode === DOWN_ARROW && s.yspeed!=-1) {
            s.dir(0, 1);
        } else if (keyCode === RIGHT_ARROW && s.xspeed!=-1) {
            s.dir(1, 0);
        } else if (keyCode === LEFT_ARROW && s.xspeed!=1) {
            s.dir(-1, 0);
        }
    }
}

function restart(){
    frameRate(0);
    var bottomDiv = document.createElement("div");
    bottomDiv.id = "buttonContainer";
    var backButton = document.createElement("input");
    backButton.type="submit";
    backButton.name="back";
    backButton.method="post";
    backButton.value="Back";
    backButton.addEventListener("click", goBack);
    var restartButton = document.createElement("input");
    restartButton.type="button";
    restartButton.value="Play Again";
    restartButton.addEventListener("click", refreshPage);
    bottomDiv.appendChild(backButton);
    bottomDiv.appendChild(restartButton);
    document.body.appendChild(bottomDiv);
}

function refreshPage(){
    window.location.reload();
}

function goBack(){
    console.log("qweqwe")
    history.go(-1);
}

