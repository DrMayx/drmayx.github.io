"use strict";

function Snake(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.alive = true;
    this.total = 0;
    this.tail = [];

    this.death = function(){
        for(let i = 0; i<this.tail.length; i++){
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if(d<1){
                this.die();
            }
        }
    }

    this.update = function(){
        for(let i =0; i<this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
        }
        this.tail[this.total-1] = createVector(this.x, this.y);
        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl;

        if(this.x<0 || this.y < 0 || this.x > 600 || this.y > 600){
            this.die();
        }
    }

    this.eat = function (food) {
        let d = dist(this.x, this.y, food.x, food.y);
        if(d<2){
            this.total++;
            return true;
        }else{
            return false;
        }
    }

    this.show = function(){
        fill(255);
        for(let i = 0; i < this.total; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    this.dir = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }

    this.die = function(){
        addAndTrimScores();
        this.alive = false;
        this.xspeed = 0;
        this.yspeed = 0;
        this.x=295;
        this.y=295;
    }
}