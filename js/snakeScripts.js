"use strict";

let s;
let scl = 20;
let food;
let started=false;
let userName = "";

function getStarted() {
    if(started){
        console.log("started already!");
        return;
    }
    let nameFromPanel=document.getElementById("UserNamePanel").value
    userName = userName !== "" ? nameFromPanel !== "" ? nameFromPanel : userName : nameFromPanel;
    if(userName!==""){
        localStorage.setItem("username", userName);
        refreshPage();
        started = true;
    }
}

function setup(){
    createCanvas(600, 600);
    showHigscores();
    let nameTmp = localStorage.getItem("username");

    if(nameTmp !== null && nameTmp !== ""){
        userName = nameTmp;
    }
    document.getElementById("UserNamePanel").placeholder = userName !== "" ? userName : "UserName";

}

function draw(){
    background(51);
    if(started) {
        if (s.alive) {
            s.death();
            s.update();
            s.show();
        } else {
            started=false;
            restart();
        }
        if (s.eat(food)) {
            pickLocation();
        }
        fill(255, 0, 100);
        rect(food.x, food.y, scl, scl);
    }
}

function pickLocation(){
    let cols = floor(width/scl);
    let rows = floor(height/scl);

    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function keyPressed(){
    if(s!== undefined && s.alive && started) {
        if ((keyCode === UP_ARROW || keyCode === 87 )&& s.yspeed!=1) {
            s.dir(0, -1);
        } else if ((keyCode === DOWN_ARROW || keyCode === 83 )&& s.yspeed!=-1) {
            s.dir(0, 1);
        } else if ((keyCode === RIGHT_ARROW || keyCode === 68 ) && s.xspeed!=-1) {
            s.dir(1, 0);
        } else if ((keyCode === LEFT_ARROW || keyCode === 65 )&& s.xspeed!=1) {
            s.dir(-1, 0);
        }
    }
}

function restart(){
    frameRate(0);
    let youDied = document.createElement("h2");
    youDied.innerText="You Died! Your score is " + s.total + ".";
    document.getElementById("name").appendChild(youDied);
    let bottomDiv = document.createElement("div");
    bottomDiv.id = "buttonContainer";
    let restartButton = document.createElement("input");
    restartButton.type="button";
    restartButton.value="Play Again";
    restartButton.addEventListener("click", refreshPage);
    bottomDiv.appendChild(restartButton);
    document.getElementById("name").appendChild(bottomDiv);
}

function refreshPage(){
    s = new Snake();
    frameRate(10);
    pickLocation();
    document.getElementById("name").innerText="";
}

function goBack(){
    localStorage.setItem("username", "");
    started = false;
    history.go(-1);
}

function showHigscores(){
    let path = location.pathname.substr(1).replace("snake.html", "static/highscores/highscores.txt");
    console.log(path);
    fetch(path)
        .then(response => response.text())
        .then(text => console.log(text))
}
