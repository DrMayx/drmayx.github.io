let dashboardHidden = false;
let x = 0;
let __currentlyEditedTitle;
let isEditing = false;

function prepareActivityInput(){
	let activityInput = document.getElementById("activity-input");
	activityInput.addEventListener("keyup", 
		function(event){
			if (event.keyCode === 13) {
				event.preventDefault();
				document.getElementById("activity-add-button").click();
			}
		});
}

function toggleActivityTracker(){
	isEditing = false;
	dashboardHidden = !dashboardHidden;
	let dashboard = document.getElementById("dashboard");
	dashboard.hidden = dashboardHidden;
	let activityTracker = document.getElementById("activity-tracker");
	activityTracker.hidden = !dashboardHidden;
	if(dashboardHidden) populateActivities();
}

function populateActivities()
{
	let currentActivities = window.localStorage.getItem("activities");
	let activities = makeDictFrom(currentActivities);
	let fields = Object.getOwnPropertyNames(activities);
	
	let activityTracker = document.getElementById("activity-tracker");
	
	let activitiesTable = document.getElementById("activities-tracker-table");
	if(activitiesTable === null || activitiesTable == undefined){
		activitiesTable = document.createElement("table");		
		activitiesTable.className = "activities-tracker-table";
		activitiesTable.id = "activities-tracker-table";
	}
	
	let activitiesBody = document.getElementById("activities-tracker-body");
	if(activitiesBody === null || activitiesBody == undefined){
		activitiesBody = document.createElement("div");		
		activitiesBody.className = "activities-tracker-body";
		activitiesBody.id = "activities-tracker-body";
	}
	
	activitiesBody.innerHTML = "";
	
	for (let i = 0; i < fields.length; i++){
		let isOdd = i%2 ? "-odd" : ""; 
		let row = document.createElement("div");
		row.className = "activities-tracker-row" + isOdd;
		
		let title = document.createElement("p");
		title.className = "activities-tracker-title no-border";
		title.innerHTML = fields[i];
		
		let count = document.createElement("p");
		count.className = "activities-tracker-counter no-border";
		count.innerHTML = activities[fields[i]];
		
		let editbox = document.createElement("div");
		editbox.className = "activities-tracker-edit-box no-border";

		let plus = document.createElement("div");
		plus.className = "activities-tracker-plus-button";
		plus.innerHTML = "&#x2b;";
		plus.addEventListener("click", function(){changeCounter(fields[i], 1)});
		
		let minus = document.createElement("div");
		minus.className = "activities-tracker-minus-button";
		minus.innerHTML = "&#x2212;";
		minus.addEventListener("click", function(){changeCounter(fields[i], -1)});
		
		let remove = document.createElement("div");
		remove.className = "activities-tracker-remove-button";
		remove.innerHTML = "&#x26A0;";
		remove.addEventListener("click", function(){removeActivity(fields[i])});
		
		let edit = document.createElement("div");
		edit.className = "activities-tracker-edit-button";
		edit.innerHTML = "&#x270E;";
		edit.addEventListener("click", function(){editActivity(this)});
		
		editbox.appendChild(edit);
		editbox.appendChild(plus);
		editbox.appendChild(minus);
		editbox.appendChild(remove);
		row.appendChild(title);
		
		row.appendChild(editbox);
		row.appendChild(count);
		activitiesBody.appendChild(row);
	}
	
	activitiesTable.appendChild(activitiesBody);
	activityTracker.appendChild(activitiesTable);
	document.getElementById("activity-input").value = "";
	
	addActivityPicker(activityTracker);
}

function addActivity(){
	let currentActivities = window.localStorage.getItem("activities");
	
	if(currentActivities===undefined){
		currentActivities = "";
	}
	
	let activities = makeDictFrom(currentActivities);
	
	let addedActivity = document.getElementById("activity-input").value;
	if ( addedActivity.length < 1 ) return;
	
	if(activities[addedActivity] === undefined ){
		activities[addedActivity] = 0;
	}
	else{return;}
	
	currentActivities = dictToString(activities);
		
	window.localStorage.setItem("activities", currentActivities);
	document.getElementById("activity-input").value = "";
	populateActivities();
}

function removeActivity(activity){
	let currentActivities = window.localStorage.getItem("activities");
	let activities = makeDictFrom(currentActivities);
	
	if(activities[activity] === undefined ){return;}
	if(confirm("Delete " + activity + " ?")){
		delete activities[activity];
		
		currentActivities = dictToString(activities);
		window.localStorage.setItem("activities", currentActivities);
	}
	populateActivities();
}

function changeCounter(activity, change){
	let currentActivities = window.localStorage.getItem("activities");
	let activities = makeDictFrom(currentActivities);
	
	if(activities[activity] === undefined ){return;}
	activities[activity] = parseInt(activities[activity]) + change;
	if(activities[activity] < 0) activities[activity] = 0;
	
	currentActivities = dictToString(activities);
	window.localStorage.setItem("activities", currentActivities);
	populateActivities();
}

function editActivity(caller){
	
	if (isEditing) return;
	isEditing = true;
	
	let title = caller.parentElement.parentElement.children[0];
	
	let inputTitle = document.createElement("input");
	inputTitle.type = "text";
	inputTitle.className = "activity-tracker-title-input";
	inputTitle.value = title.innerHTML;
	__currentlyEditedTitle = title.innerHTML;
	inputTitle.addEventListener("keyup", 
			function(event){
				if (event.keyCode === 13) {
					event.preventDefault();
					
					let currentActivities = window.localStorage.getItem("activities");
					let editTitle = event.srcElement.value;
					let editCount = event.srcElement.parentElement.parentElement.children[2].innerHTML;
					let activityOld = __currentlyEditedTitle + ":" + editCount + ";";
					let activityNew = editTitle + ":" + editCount + ";";
					
					if ( editTitle.length > 0 ){
						currentActivities = currentActivities.replace(activityOld, activityNew);
						window.localStorage.setItem("activities", currentActivities);
					}
					
					delete event.srcElement;
					isEditing = false;
					populateActivities();
				}
			});
	
	title.innerHTML = "";
	title.appendChild(inputTitle);
	inputTitle.focus();
	
}

function getRandomActivity(){
	if(getCurrentActivity() != "Your activity for today") return;
	let currentActivities = window.localStorage.getItem("activities");
	let outputPanel = document.getElementById("activities-picker-output-panel");
	
	
	if(currentActivities === null){
		outputPanel.innerHTML = "No Activities Available";
	}
	
	let fullActivities = makeDictFrom(currentActivities);
	let activities = Object.getOwnPropertyNames(fullActivities);
	let weights = [];
	for (let i = 0; i < activities.length; i++){
		let w = fullActivities[activities[i]];

		weights.push(parseInt(w));
	}
	
	let min = Math.min(...weights);
	let max = Math.max(...weights);
	
	for (let i = 0; i < weights.length; i++) weights[i] = max - ( weights[i] - min) + 1;
	
	let dataToPickFrom = [];
	for (let i = 0; i < activities.length; i++){
		if (activities[i].includes("?")) weights[i] -= 1;
		for(let j = 0; j < weights[i]; j++){
			dataToPickFrom.push(activities[i]);
		}
	}
	
	let picked = dataToPickFrom[Math.floor(Math.random() * Math.floor(dataToPickFrom.length))];
	
	setCurrentActivity(picked);
	populateActivities();
}

function makeDictFrom(s){
	if(s === undefined || s === null || s.length < 3) return {};
	let data = s.split(";");
	let dict = {};
	if(data.length > 0){
		for(let i=0;i<data.length;i++){
			if(data[i] == "" ) continue;
			let d = data[i].split(":");
			dict[d[0]] = d[1];
		}
	}
	return dict;
}

function dictToString(obj){
	if(obj === undefined || obj === null) return "";
	let fields = Object.getOwnPropertyNames(obj);
	let data = "";
	for ( let i = 0; i < fields.length; i++){
		data += fields[i] + ":" + obj[fields[i]] + ";";
	}
	return data;
}

function clearLocalStorage(){
	localStorage.clear();
}

function addActivityPicker(activityTracker){
	let oldPicker = document.getElementById("activities-picker");
	if(oldPicker !== null) oldPicker.parentNode.removeChild(oldPicker);
	let picker = document.createElement("div");
	let pickerText = document.createElement("p");
	let pickerButton = document.createElement("div");
	
	picker.className = "activities-picker";
	picker.id = "activities-picker";
	pickerText.className = "activities-picker-output";
	pickerText.id = "activities-picker-output-panel";
	pickerText.innerHTML = getCurrentActivity();
	pickerButton.className = "activities-picker-button";
	pickerButton.innerHTML = "Reveal";
	pickerButton.addEventListener("click", function(){getRandomActivity()});
	
	picker.appendChild(pickerText);
	picker.appendChild(pickerButton);
	activityTracker.appendChild(picker);	
}

function getCurrentActivity(){
	let currentActivity = window.localStorage.getItem("currentActivity");
	if (currentActivity === null) return "Your activity for today";
	let activity = currentActivity.split(";");
	
	let today = formatDate(new Date());
	let activityFullDate = new Date(activity[1]);
	let activityDate = formatDate(activityFullDate);
	if (today != activityDate){
		return "Your activity for today";
	}
	return activity[0];
}

function setCurrentActivity(activity){

	let currentActivities = window.localStorage.getItem("activities");
	let currentActivity = window.localStorage.getItem("currentActivity");
	
	if ( currentActivities === null){
		return;
	}

	let activities = makeDictFrom(currentActivities);
	if (activities[activity] === undefined) return ;
	
	let data = activity + ";" + new Date();
	window.localStorage.setItem("currentActivity", data);
}

function formatDate(date){
	return date.getFullYear() + "." + date.getMonth() + "." + date.getDate();
}

function prepareSearchBar(){
	let searchBar = document.getElementById("customSearchbar");
	searchBar.addEventListener("keyup", passToURL);
	searchBar.focus();
}

function passToURL(event){
	if (event.keyCode === 13) {
		event.preventDefault();
		window.location = "https://www.google.com/search?q=" + document.getElementById("customSearchbar").value;
	}
}










