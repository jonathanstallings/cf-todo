//Goal: Add interactivity to Todo app

//Declare Variables
var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add-button");
var incompleteTasksHolder = document.querySelector("#incomplete-tasks ul");
var completedTasksHolder = document.querySelector("#completed-tasks ul");

//New Task List Item
var createNewTaskElement = function (taskString) {
  //Create list item
  var listItem = document.createElement("li");
  //input(checkbox)
  var checkBox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label");
  //input(text)
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
  //Each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.textContent = "Edit";
  editButton.className = "edit";
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  
  label.textContent = taskString;
  
  //Each elemetn needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
};

//Add a new task
var addTask = function () {
  //Check to see if taskInput has a value
  if (taskInput.value) {
    console.log("Add task. . .");
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted); //not yet defined
    
    taskInput.value = "";
  } else {
    //Do nothing if taskInput is empty
    console.log("Empty taskInput");
  }
};

//Edit an existing task
var editTask = function () {
  console.log("Edit task. . .");
  
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editButton = this;
  var containsClass = listItem.classList.contains("editMode");
  
  //If the class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
    //label text becomes input's value
    label.textContent = editInput.value;
    editButton.textContent = "Edit";
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = lable.textContent;
    editButton.textContent = "Save";
  }
  //Toggle .editMode
  listItem.classList.toggle("editMode");
};

//Delete an existing task
var deleteTask = function () {
  console.log("Delete task. . .");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
};

//Mark a task as completed
var taskCompleted = function () {
  console.log("Task completed. . .");
  //Append the task li to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete); //Not yet defined
};

//Mark a task as incompleted
var taskIncomplete = function () {
  console.log("Task incomplete. . .");
  //Append the task li to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Bind events to list item's children
var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editbutton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind edittask to editButton
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

var enterKeyEvent = function () {
  //Capture enter key as click
  if (event.keyCode == 13) {
    console.log("Enter keypress");
    addButton.click();
  }
};

/*Event Handlers**********************/

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

//Set the keypress handler from taskInput to the addTask function
taskInput.addEventListener("keypress", enterKeyEvent);

//New Idea: ability to save edits to incomplted task items with enter keypress

//cycle over the incompleteTasksHolder ul list items
for (i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over the completedTasksHolder ul list items
for (i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
