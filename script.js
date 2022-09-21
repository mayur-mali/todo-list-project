var todoContainer = document.getElementById("myList");
const LIST_KEY = "todo.list";

// setting up the localStorage
let lists = JSON.parse(localStorage.getItem(LIST_KEY)) || [];

//get access of deleteButton
let deleteTodoBtn = document.getElementsByClassName("closeBtn");

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

// get access of todo_add_button
var todoAddBtn = document.getElementById("add-todo-btn");

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
  let todoValues = document.querySelector("input").value;
  // check if input is not empty if it's empty then return back and nothing add into list
  if (todoValues == null || todoValues.length === 0) return;
  // if user inter somthing then createtodo
  const list = createTodo(todoValues);
  // after create todo push into list array
  lists.push(list);
  // call fetchLetest Todo
  fetchTodoList("all");
  save();
}
// add todo via click on enter button
window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  if (key == 13) {
    addToDoToList();
    document.querySelector("input").value = "";
  }
});

// save todo into localStorage
function save() {
  localStorage.setItem(LIST_KEY, JSON.stringify(lists));
}

// create new instance of todo
function createTodo(todoItem) {
  return { id: Date.now().toString(), todo: todoItem, isComplete: "pending" };
}

// fetch todo and display on page
function fetchTodoList(filter) {
  // clear previous lists
  clearContent(todoContainer);
  // get access of left task and add value into it
  document.getElementById("left-task").innerHTML = lists.length + " task left";
  // create empty li
  let li = "";
  // check if lists not empty
  if (lists) {
    lists.forEach((list, id) => {
      var status = list.isComplete == "complete" ? "checked" : "pending";
      if (filter == list.isComplete || filter == "all") {
        li += `
        <li data-todo-id=${list.id}>
        <label class="container">
        <input type="checkbox" id="${id}" onclick="isComplete(this)" ${status}>
        <span class="checkmark"></span>
        <h3>  ${list.todo}</h3>
        </label>
      <span class="closeBtn" >\u00D7</span>
      </li>
      `;
      }
    });
  }
  // after create li insert into todoContainer
  todoContainer.innerHTML = li || `<span>No task </span>`;

  // access delete Todo Button and add event listener on each button
  for (var i = 0; i < deleteTodoBtn.length; i++) {
    deleteTodoBtn[i].onclick = function () {
      // get parentId
      const id = this.parentNode.getAttribute("data-todo-id");
      // insert that id into deleteTodo
      deleteTodo(id);
      // after delete todo also remove from front end
      this.parentNode.remove();
    };
  }
}

// delete todo_function
function deleteTodo(id) {
  // getting all todos from localStorage
  const todos = JSON.parse(localStorage.getItem("todo.list"));
  // find todo index via given id
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    // delete todo from localStorage
    deleteItem = todos.splice(todoIndex, 1);
  }
  // after delete todo set remaining todos into exsting list
  localStorage.setItem(LIST_KEY, JSON.stringify(todos));
}

// mark todo_when click on checkbox
function isComplete(seletedTask) {
  if (seletedTask.checked) {
    // when checkbox is checked set iscomplete value to true
    lists[seletedTask.id].isComplete = "complete";
  } else {
    // when checkbox is unchecked set iscomplete value to false
    lists[seletedTask.id].isComplete = "pending";
  }
  // after seting value into todos update todo
  localStorage.setItem(LIST_KEY, JSON.stringify(lists));
}

// mark all todo_as a complete function
function markAllCompleted() {
  for (var i = 0; i < lists.length; i++) {
    lists[i].isComplete = "complete";
  }
  localStorage.setItem(LIST_KEY, JSON.stringify(lists));
  document.location.reload();
}

function clearCompleted() {}

// remove previous lists from dom
function clearContent(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// function for continuing to access todos list
function render() {
  fetchTodoList("all");
}
render();
