//Goal: Add interactivity to Todo app

/*************************
Cache DOM Elements
**************************/

var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add-button");
var incompleteTasksHolder = document.querySelector("#incomplete-tasks ul");
var completedTasksHolder = document.querySelector("#completed-tasks ul");

/*************************
Functions
**************************/

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

var addTask = function () {
  //Add a new task

  if (taskInput.value) {
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);

    //Clear taskInput text
    taskInput.value = "";
  }
};

var editTask = function (el) {
  //Edit an existing task

  var listItem = el.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editButton = el;
  var editMode = listItem.classList.contains("editMode");

  if (editMode) {
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

var deleteTask = function (el) {
  //Delete an existing task

  var listItem = el.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
};

var taskCompleted = function (el) {
  //Mark a task as completed

  //Append the task li to the #completed-tasks
  var listItem = el.parentNode;
  completedTasksHolder.appendChild(listItem);
};

var taskIncomplete = function (el) {
  //Mark a task as incompleted

  //Append the task li to the #incomplete-tasks
  var listItem = el.parentNode;
  incompleteTasksHolder.appendChild(listItem);
};

var taskEventHandler = function (e, checkBoxEventHandler) {
  //Examine event and send to appropriate handler
  var el = e.target;
  var checkbox = el.matches("input[type=checkbox]");
  var editButton = el.matches("button.edit");
  var deleteButton = el.matches("button.delete");
  
  if (checkbox) {
    checkBoxEventHandler(el);
  } else if (editButton) {
    editTask(el);
  } else if (deleteButton) {
    deleteTask(el);
  }
};

var addTaskEnterKeyEvent = function (e) {
  //Capture enter key as addButton click
  if (e.keyCode == 13) {
    addButton.click();
  }
};

var editTaskEnterKeyEvent = function (e) {
  //Capture enter key as editButton click
  var el = e.target;
  var editButton = el.parentNode.querySelector("button.edit");
  
  if (e.keyCode == 13 && el.matches("input[type=text]")) {
    editButton.click();
  }
};

var dblclickEvent = function (e) {
  //Capture double-click event as editButton click
  var el = e.target;
  var editButton = el.parentNode.querySelector("button.edit");
  
  if (el.matches("label")) {
    editButton.click();
  }
};

/*************************
Event Listeners
**************************/

//Set click handler on add button
addButton.addEventListener("click", addTask);

//Set keypress handler on new-task input
taskInput.addEventListener("keypress", addTaskEnterKeyEvent);

//Set keypress handlers on each task holder
// incompleteTasksHolder.addEventListener("keypress", editTaskEnterKeyEvent);
// completedTasksHolder.addEventListener("keypress", editTaskEnterKeyEvent);

//Set click handler on incompleteTasksHolder
incompleteTasksHolder.addEventListener("click", function(e) {
  taskEventHandler(e, taskCompleted);
});

//Set click handler on completedTasksHolder
completedTasksHolder.addEventListener("click", function(e) {
  taskEventHandler(e, taskIncomplete);
});

//Set double-click handlers on each task holder
// incompleteTasksHolder.addEventListener("dblclick", dblclickEvent);
// completedTasksHolder.addEventListener("dblclick", dblclickEvent);
