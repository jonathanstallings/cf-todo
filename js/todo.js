//Goal: Add interactivity to Todo app

//Cache DOM Element Variables
var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add-button");
var incompleteTasksHolder = document.querySelector("#incomplete-tasks ul");
var completedTasksHolder = document.querySelector("#completed-tasks ul");

//New Task List Item
var createNewTaskElement = function (taskString) {
  //Create necessary elements
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input"); //checkbox
  var label = document.createElement("label");
  var editInput = document.createElement("input"); //text
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  //Modify elements
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.textContent = "Edit";
  editButton.className = "edit";
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";

  label.textContent = taskString;

  //Append elements to listItem
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

    taskInput.value = "";
  } else {
    //Do nothing if taskInput is empty
    console.log("Empty taskInput");
  }
};

//Edit an existing task
var editTask = function (el) {
  console.log("Edit task. . .");

  var listItem = el.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editButton = el;
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
    editInput.value = label.textContent;
    editButton.textContent = "Save";
  }
  //Toggle .editMode
  listItem.classList.toggle("editMode");
};

//Delete an existing task
var deleteTask = function (el) {
  console.log("Delete task. . .");
  var listItem = el.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
};

//Mark a task as completed
var taskCompleted = function (el) {
  console.log("Task completed. . .");
  //Append the task li to the #completed-tasks
  var listItem = el.parentNode;
  completedTasksHolder.appendChild(listItem);
};

//Mark a task as incompleted
var taskIncomplete = function (el) {
  console.log("Task incomplete. . .");
  //Append the task li to the #incomplete-tasks
  var listItem = el.parentNode;
  incompleteTasksHolder.appendChild(listItem);
};

//Determine event type and funnel to appropriate handler
var handleTaskEvents = function (e, checkBoxEventHandler) {
  var el = e.target;
  var checkbox = el.matches("input[type=checkbox]");
  var editButton = el.matches("button.edit");
  var deleteButton = el.matches("button.delete");

  console.log(el);

  if (editButton) {
    editTask(el);
  } else if (deleteButton) {
    deleteTask(el);
  } else if (checkbox) {
    checkBoxEventHandler(el);
  }
};

var enterKeyEvent = function (e) {
  //Capture enter key as click
  if (e.keyCode == 13) {
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

//Set click handler on incompleteTasksHolder
incompleteTasksHolder.addEventListener("click", function(e) {
  handleTaskEvents(e, taskCompleted);
}, false);

//Set click handler on completedTasksHolder
completedTasksHolder.addEventListener("click", function(e) {
  handleTaskEvents(e, taskIncomplete);
}, false);

// //Set up event listener to call taskCompleted with event delegation
// if (incompleteTasksHolder.addEventListener) { // If event listeners work
//   incompleteTasksHolder.addEventListener('click', function(e) {
//     taskCompleted(e);
//   }, false);
// } else { //Otherwise use old IE model
//   incompleteTasksHolder.attachEvent('onclick', function(e) {
//     taskCompleted(e);
//   });
// }
