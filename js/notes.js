"use strict";

var notes = [];
var setup = function() {
    var paragraph = document.createElement("h3");
    paragraph.innerText = "Not-A-Pad by DrMayx.";
    var panel = document.getElementById("panel");
    panel.appendChild(paragraph);
    addNoteButton();
    createCanvas(window.innerWidth/2, window.innerHeight/2);
};

var draw = function(){
    background(100,200,237);
    for(var i = 0; i<notes.length; i++){
        notes[i].show();
    }
};
var addNoteButton = function() {
    var button = document.createElement("input");
    button.onclick=createNewNote;
    button.type="button";
    button.id="createNewNoteButton";
    button.value="Create new note";
    document.getElementById("panel").appendChild(button);
};

var createNewNote = function(){
    console.log("creating new note...");
    var n = new Note();
    notes.push(n);
};