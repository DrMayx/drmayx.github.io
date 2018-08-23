"use strict";

var notes = [];
var noteEdited = false;
window.onload = function (){
    var paragraph = document.createElement("h2");
    paragraph.innerText = "Not-A-Pad by DrMayx.";
    var panel = document.getElementById("panel");
    var usage = document.createElement("p");
    usage.innerHTML = "<b>DoubleClick on notes title or description to change it.<br>Rightclick on it to save.";
    panel.appendChild(paragraph);
    panel.appendChild(usage);
    addNoteButton();
    restoreNotes();
};

var addNoteButton = function() {
    var navigation = document.createElement("div");
    navigation.id="navigation";
    var button = document.createElement("input");
    button.onclick=createNewNote;
    button.type="button";
    button.value="Create new note";
    navigation.appendChild(button);
    var backButton = document.createElement("input");
    backButton.type="button";
    backButton.value="Back";
    backButton.onclick=goBack;
    navigation.appendChild(backButton);
    document.getElementById("panel").appendChild(navigation);
};

var createNewNote = function(){
    var n = new Note();
    n.show();
    notes.push(n);
    saveAllNotes();
};

var getNote = function(noteId){
    for(var i = 0; i < notes.length; i++){
        if(notes[i].id===noteId){
            return notes[i];
        }
    }
    return undefined;
};

function goBack(){
    history.go(-1);
}

function saveAllNotes(){
    let data = getAllNotes();
    localStorage.setItem("notes", data);
}

function getAllNotes() {
    let notes = document.getElementsByClassName("note");
    if(notes.length<1){
        return "";
    }
    let notesString = "[";
    for(let i=0; i<notes.length; i++){
        notesString += getNotesData(notes[i]) + addCommaIfNotLast(i, notes.length);
    }
    return notesString + "]";
}

function addCommaIfNotLast(i, len) {
    if(i!==len-1){
        return ",";
    }
    return "";
}

function getNotesData(noteHTML) {
    let note, id, title, description, color;
    id = noteHTML.id;
    note = getNote(id);
    title = note.title;
    description = note.desc;
    color = note.currentColor;
    return JSON.stringify({
        id: id,
        title: title,
        description: description,
        currentColor: color
    });
}

function restoreNotes() {
    let JSONnotes = localStorage.getItem("notes")
    if( JSONnotes === null || JSONnotes === ""){
        return;
    }
    let notesFromJSON = JSON.parse(JSONnotes);

    //console.log(JSONnotes);
    for(let i=0; i<notesFromJSON.length; i++) {
        let n = new Note();
        n.id = notesFromJSON[i].id;
        n.currentColor = notesFromJSON[i].currentColor-1;
        n.desc = notesFromJSON[i].description;
        n.title = notesFromJSON[i].title;
        n.show();
        notes.push(n);
        let noteHTML = document.getElementById(n.id);
        let button = noteHTML.getElementsByTagName("button")[0];
        n.changeColor.call(button);
        n.editData.call(noteHTML);
        n.changeData.call(noteHTML, noteHTML);
    }
}
