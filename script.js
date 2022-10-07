var todoContainer = document.getElementById("myList");
const LIST_KEY = "todo.list";

// setting up the localStorage
let todoList = JSON.parse(localStorage.getItem(LIST_KEY)) || [];

// get access of todo_add_button
var todoAddBtn = document.getElementById("add-todo-btn");

//get access of deleteButton
let deleteTodoBtn = document.getElementById("deleteButton");

// add event listener to add button
todoAddBtn.addEventListener("click", function () {
  // add todo in list
  addToDoToList();
  // clear input after todo_created
  document.querySelector("input").value = "";
});

// add todo_into list function
function addToDoToList() {
  // get input value
  let todoValue = document.querySelector("input").value;
  // check if input is not empty if it's empty then return back and nothing add into list
  if (todoValue == null || todoValue.length === 0) return;
  // if user inter somthing then createtodo
  const todo = {
    id: Date.now().toString(),
    todo: todoValue,
    isComplete: "pending",
  };
  // after create todo push into list array
  todoList.push(todo);

  localStorage.setItem(LIST_KEY, JSON.stringify(todoList));
  render();
}
// add todo via click on enter button
window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  if (key == 13) {
    addToDoToList();
    document.querySelector("input").value = "";
  }
});

// fetch todo and display on page
function fetchTodoList(filter) {
  // get access of left task and add value into it
  document.getElementById("left-task").innerHTML =
    todoList.length + " Total Task";
  // create empty li
  let li = "";
  // check if todoList not empty
  if (todoList) {
    todoList.forEach((list, id) => {
      var status = list.isComplete == "complete" ? "checked" : "pending";
      if (filter == list.isComplete || filter == "all") {
        li += `
        <li data-todo-id=${list.id} >
        <label class="inputLable">
          <input type="checkbox" id="${id}" onclick="isComplete(this)" ${status}>
          <span class="checkmark"></span>
          <h3>  ${list.todo}</h3>
        </label>
      <span class="deleteBtn" id="deleteButton" onclick="deleteTodo(${id})">\u00D7</span>
      </li>
      `;
      }
    });
  }
  // after create li insert into todoContainer
  todoContainer.innerHTML = li || `<span>No task</span>`;
}

// delete todo_function
function deleteTodo(todoIndex) {
  // remove the todo from array of localStorage
  todoList.splice(todoIndex, 1);
  // after delete todo set remaining todos into exsting list
  localStorage.setItem(LIST_KEY, JSON.stringify(todoList));
  render();
}

// mark todo_when click on checkbox
function isComplete(seletedTask) {
  if (seletedTask.checked) {
    // when checkbox is checked set iscomplete value to true
    todoList[seletedTask.id].isComplete = "complete";
  } else {
    // when checkbox is unchecked set iscomplete value to false
    todoList[seletedTask.id].isComplete = "pending";
  }
  // after seting value into todos update todo
  localStorage.setItem(LIST_KEY, JSON.stringify(todoList));
}

// mark all todo_as a complete function
function markAllCompleted() {
  for (var i = 0; i < todoList.length; i++) {
    todoList[i].isComplete = "complete";
  }
  localStorage.setItem(LIST_KEY, JSON.stringify(todoList));
  render();
}

function emptyList() {
  localStorage.clear();
  document.location.reload();
}

// get filter
filters = document.querySelectorAll(".status-filter span");

// filter by status
filters.forEach((task) => {
  task.addEventListener("click", function () {
    document.querySelector("span.active").classList.remove("active");
    task.classList.add("active");
    fetchTodoList(task.id);
  });
});

// function for fetchingToDo after every reload
function render() {
  fetchTodoList("all");
}
render();
