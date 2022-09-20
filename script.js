var todoContainer = document.getElementById("myList");
const LIST_KEY = "todo.list";

let lists = JSON.parse(localStorage.getItem(LIST_KEY)) || [];
let deleteTodoBtn = document.getElementsByClassName("closeBtn");
filters = document.querySelectorAll(".status-filter span");

filters.forEach((task) => {
  task.addEventListener("click", function () {
    document.querySelector("span.active").classList.remove("active");
    task.classList.add("active");
    fetchTodoList(task.id);

    // console.log(task.id);
  });
});

var todoAddBtn = document.getElementById("add-todo-btn");
todoAddBtn.addEventListener("click", function () {
  addToDoToList();
  document.querySelector("input").value = "";
});

function addToDoToList() {
  let todoValues = document.querySelector("input").value;
  if (todoValues == null || todoValues.length === 0) return;
  const list = createTodo(todoValues);
  lists.push(list);
  fetchTodoList("all");
  save();
}

window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  if (key == 13) {
    addToDoToList();
    document.querySelector("input").value = "";
  }
});

function save() {
  localStorage.setItem(LIST_KEY, JSON.stringify(lists));
}

function createTodo(todoItem) {
  return { id: Date.now().toString(), todo: todoItem, isComplete: "pending" };
}

function fetchTodoList(filter) {
  clearContent(todoContainer);
  document.getElementById("left-task").innerHTML = lists.length + " task left";
  let li = "";
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

  todoContainer.innerHTML = li || `<span>No task </span>`;

  for (var i = 0; i < deleteTodoBtn.length; i++) {
    deleteTodoBtn[i].onclick = function () {
      const id = this.parentNode.getAttribute("data-todo-id");
      deleteTodo(id);
      this.parentNode.remove();
    };
  }
}

function deleteTodo(id) {
  // console.log(id);
  const todos = JSON.parse(localStorage.getItem("todo.list"));
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    deleteItem = todos.splice(todoIndex, 1);
  }
  localStorage.setItem(LIST_KEY, JSON.stringify(todos));
  // document.location.reload();
}

function isComplete(seletedTask) {
  if (seletedTask.checked) {
    lists[seletedTask.id].isComplete = "complete";
  } else {
    lists[seletedTask.id].isComplete = "pending";
  }
  localStorage.setItem(LIST_KEY, JSON.stringify(lists));
}

function markAllCompleted() {
  for (var i = 0; i < lists.length; i++) {
    lists[i].isComplete = "complete";
  }
  localStorage.setItem(LIST_KEY, JSON.stringify(lists));
  document.location.reload();
}

function clearCompleted() {}

function clearContent(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function render() {
  fetchTodoList("all");
}
render();
