let numberOfNotes = 0;
function Note(){

    this.title = "Title";
    this.desc = "Description ...";
    this.colors = [
        new Color("whitish", 'rgba(255,255,255,.4)',"black"),
        new Color("more_white", 'rgba(255,255,255,.8)', "black"),
        new Color("purple", 'rgba(150,0,150,.6)', "black"),
        new Color("cyan", "rgba(0,130,200,.8)", "white"),
        new Color("none", "rgba(0,0,0,0)", "black")
    ];
    this.currentColor = 0;
    this.id;

    this.show = function(){
        let note = document.createElement("div");
        note.id = "note" + numberOfNotes++;
        this.id = note.id;
        note.className = "note";
        note.addEventListener("dblclick", this.editData);
        note.addEventListener("contextmenu", this.changeData);
        let content = document.createElement("table");
        let titlerow = document.createElement("tr");
        let titlecol = document.createElement("td");
        titlecol.className='title';
        let title = document.createElement("p");
        title.innerText = this.title;
        let descrow = document.createElement("tr");
        let desccol = document.createElement("td");
        desccol.className='description';
        let descr = document.createElement("p");
        descr.innerText = this.desc;
        let changeColorButton = document.createElement("button");
        changeColorButton.onclick=this.changeColor;
        changeColorButton.innerText="Change Color";
        desccol.appendChild(descr);
        descrow.appendChild(desccol);
        titlecol.appendChild(title);
        titlerow.appendChild(titlecol);
        content.appendChild(titlerow);
        content.appendChild(descrow);
        content.appendChild(changeColorButton);
        note.appendChild(content);

        document.getElementById("panel").appendChild(note);
    };

    this.editData = function(){
        if(noteEdited){
            return;
        }
        noteEdited = true;
        let title = this.getElementsByClassName("title")[0];
        let desc = this.getElementsByClassName("description")[0];

        title.innerHTML = "<input type='text' id='titleEdit' name='title' placeholder='Title'>";
        desc.innerHTML = "<input type='text' id='descEdit' name='description' placeholder='Description'>";
        let note = getNote(this.id);
        title.childNodes[0].addEventListener("keypress", note.handleKeyPress);
        desc.childNodes[0].addEventListener("keypress", note.handleKeyPress);
    };

    this.changeData = function (event){
        if(event != null){
            event.preventDefault();
        }
        let note = getCurrentNote(event);
        let noteObject = getNote(note.id);
        if(!noteEdited){
            if(note) {
                if (confirm("Delete " + note.title + " ?")) {
                    let panel = document.getElementById("panel");
                    panel.removeChild(note);
                }
            }
            return;
        }
        let newTitle = document.getElementById("titleEdit").value;
        let newDescr = document.getElementById("descEdit").value;
        if(newTitle !== ""){
            noteObject.title = newTitle;
        }
        if(newDescr !== ""){
            noteObject.desc = newDescr;
        }
        let title = this.getElementsByClassName("title")[0];
        let desc = this.getElementsByClassName("description")[0];
        title.innerHTML = "<p>" + noteObject.title + "</p>";
        desc.innerHTML = "<p>" + noteObject.desc + "</p>";
        noteEdited = false;
    };

    let getCurrentNote = function (event){
        let path = event.path;
        for(let i=0; i<path.length; i++){
            if(path[i].id.includes("note")){
                return path[i];
            }
        }
    };

    this.handleKeyPress = function (event){
        if (event.keyCode == 13){
            console.log(this);
            event.stopPropagation();
            this.value += "<br>";
        }
    };

    this.changeColor = function(){
        let note = this.parentElement.parentElement;
        let noteObject = getNote(note.id);
        let color = noteObject.colors[(noteObject.currentColor++)%noteObject.colors.length];
        note.style.backgroundColor=color.color;
        note.style.color=color.fontColor;
    }
}