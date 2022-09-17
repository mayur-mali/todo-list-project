var todoContainer = document.getElementById("myList");

const LIST_KEY = "todo.list";

let lists = JSON.parse(localStorage.getItem(LIST_KEY)) || [];
let deleteTodoBtn = document.getElementsByClassName("closeBtn");

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
  fetchTodoList();
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
  return { id: Date.now().toString(), todo: todoItem };
}

function fetchTodoList() {
  clearContent(todoContainer);
  document.getElementById("left-task").innerHTML =
    lists.length + " task pending";

  for (let i = 0; i < lists.length; i++) {
    console.log(lists[i].todo);
    todoContainer.innerHTML += `
    <li data-todo-id=${lists[i].id}">
    <input type="checkbox"  onchange="checkTodo(${lists[i].id})" />
      <h3 class="task-des" id="${lists[i].id}">${lists[i].todo}</h3>  
        <span class="closeBtn" >\u00D7</span>
    </li>
    `;
  }

  for (var i = 0; i < deleteTodoBtn.length; i++) {
    deleteTodoBtn[i].onclick = function () {
      const id = this.parentNode.getAttribute("data-todo-id");
      deleteTodo(id);
      this.parentNode.remove();
    };
  }
}

function checkTodo(id) {
  var task = document.querySelectorAll(".task-des");
  task.forEach((item) => {
    if (item.id == id) {
      item.classList.toggle("checked");
    }
  });
}

function deleteTodo(id) {
  const todos = JSON.parse(localStorage.getItem("todo.list"));
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    deleteItem = todos.splice(todoIndex, 1);
  }
  localStorage.setItem(LIST_KEY, JSON.stringify(todos));
  document.location.href = "/";
}

function clearContent(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function render() {
  fetchTodoList();
}
render();
