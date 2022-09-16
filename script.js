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
  return { id: Date.now().toString(), todo: todoItem, isComplete: false };
}

function fetchTodoList() {
  clearContent(todoContainer);
  document.getElementById("left-task").innerHTML =
    lists.length + " task pending";

  for (let i = 0; i < lists.length; i++) {
    console.log(lists[i].todo);
    todoContainer.innerHTML += `
    <li data-todo-id=${lists[i].id}>
    <input type="checkbox"  id="checkbox" />
        ${lists[i].todo}
        <span class="closeBtn" >\u00D7</span>
    </li>
    `;
  }

  // lists.forEach((list) => {
  //   const listElement = document.createElement("li");
  //   listElement.dataset.todoId = list.id;
  //   listElement.innerText = list.todo;
  //   todoContainer.appendChild(listElement);
  // });

  // var myNodelist = document.getElementsByTagName("li");
  // var i;
  // for (i = 0; i < myNodelist.length; i++) {
  //   var span = document.createElement("SPAN");
  //   var checkbox = document.createElement("INPUT");
  //   var txt = document.createTextNode("\u00D7");
  //   span.className = "closeBtn";
  //   span.appendChild(txt);
  //   myNodelist[i].appendChild(span);
  //   myNodelist[i].appendChild(checkbox);
  // }

  for (var i = 0; i < deleteTodoBtn.length; i++) {
    deleteTodoBtn[i].onclick = function () {
      const id = this.parentNode.getAttribute("data-todo-id");
      deleteTodo(id);
      this.parentNode.remove();
    };
  }
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
