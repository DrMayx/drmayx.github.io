function Note(){

    this.x = 10;
    this.y = 10;

    this.show = function(){
        fill(0);
        rect(this.x, this.y, 100, 100);
    }
}