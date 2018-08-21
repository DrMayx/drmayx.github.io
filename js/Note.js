var numberOfNotes = 0;
function Note(){

    this.x = 10;
    this.y = 10;
    this.width = 100;
    this.height = 100;
    this.title = "Title";
    this.desc = "Description ...\nbla bla bla";
    this.id;

    this.show = function(){
        var note = document.createElement("div");
        note.id = "note" + numberOfNotes++;
        this.id = note.id;
        note.className = "note";
        note.addEventListener("dblclick", this.editData);
        note.addEventListener("contextmenu", this.changeData);
        var content = document.createElement("table");
        var titlerow = document.createElement("tr");
        var titlecol = document.createElement("td");
        var title = document.createElement("p");
        title.innerText = this.title;
        title.className = "title";
        var descrow = document.createElement("tr");
        var desccol = document.createElement("td");
        var descr = document.createElement("p");
        descr.innerText = this.desc;
        descr.className = "description";
        descr.addEventListener("dblclick", this.editDescr);
        desccol.appendChild(descr);
        descrow.appendChild(desccol);
        titlecol.appendChild(title);
        titlerow.appendChild(titlecol);
        content.appendChild(titlerow);
        content.appendChild(descrow);
        note.appendChild(content);

        document.getElementById("panel").appendChild(note);
    };

    this.registerEventListeners = function(){
        //this.
        console.log("09090")
    };

    this.editData = function(){
        if(noteEdited){
            return;
        }
        noteEdited = true;
        var title = this.getElementsByClassName("title")[0];
        var desc = this.getElementsByClassName("description")[0];

        title.innerHTML = "<input type='text' id='titleEdit' name='title' placeholder='Title'>";
        desc.innerHTML = "<input type='text' id='descEdit' name='description' placeholder='Description'>";
    };

    this.changeData = function (event){
        if(event != null){
            event.preventDefault();
        }
        let note = getCurrentNote(event);
        if(!noteEdited){
            if(note) {
                if (confirm("Delete " + note.title + " ?")) {
                    var panel = document.getElementById("panel");
                    panel.removeChild(note);
                }
            }
            return;
        }

        var newTitle = document.getElementById("titleEdit").value;
        var newDescr = document.getElementById("descEdit").value;
        if(newTitle !== ""){
            note.title = newTitle;
        }
        if(newDescr !== ""){
            note.desc = newDescr;
        }
        var title = this.getElementsByClassName("title")[0];
        var desc = this.getElementsByClassName("description")[0];
        title.innerHTML = "<p class='title'>" + note.title + "</p>";
        desc.innerHTML = "<p class='description'>" + note.desc + "</p>";
        noteEdited = false;
    }

    var getCurrentNote = function (event){
        var path = event.path;
        for(var i=0; i<path.length; i++){
            if(path[i].id.includes("note")){
                return path[i];
            }
        }
    }
}