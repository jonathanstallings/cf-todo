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
  var div = document.createElement("div");
  var deleteButton = document.createElement("button");

  //Modify elements
  checkBox.type = "checkbox";
  div.setAttribute("contenteditable", "true");
  deleteButton.textContent = "X";
  deleteButton.className = "delete";

  div.textContent = taskString;

  //Append elements to listItem
  listItem.appendChild(checkBox);
  listItem.appendChild(div);
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
  var deleteButton = el.matches("button.delete");
  
  if (checkbox) {
    checkBoxEventHandler(el);
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


var tasksHolderEnterKeyEvent = function (e) {
  // body...
  if (e.keyCode == 13) {
    var el = e.target;

    e.preventDefault();
    if (el.matches("div")) {
      el.blur();
    }
  }
};

/*************************
Event Listeners
**************************/

//Set click handler on add button
addButton.addEventListener("click", addTask);

//Set keypress handler on new-task input
taskInput.addEventListener("keypress", addTaskEnterKeyEvent);

//Set click handler on incompleteTasksHolder
incompleteTasksHolder.addEventListener("click", function(e) {
  taskEventHandler(e, taskCompleted);
});

//Set click handler on completedTasksHolder
completedTasksHolder.addEventListener("click", function(e) {
  taskEventHandler(e, taskIncomplete);
});

//Set keypress handler on incompleteTasksHolder
incompleteTasksHolder.addEventListener("keypress", tasksHolderEnterKeyEvent);

//Set keypress handler on completedTasksHolder
completedTasksHolder.addEventListener("keypress", tasksHolderEnterKeyEvent);
