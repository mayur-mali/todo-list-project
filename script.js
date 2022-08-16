var todoContainer = document.getElementById("myList");
const LIST_KEY = "todo.list";
let lists = JSON.parse(localStorage.getItem(LIST_KEY)) || [];
let deleteTodoBtn = document.getElementsByClassName("closeBtn");
var todoAddBtn = document.getElementById("add-todo-btn");
todoAddBtn.addEventListener("click", function () {
  addToDoToList();
});

for (let i = 0; i < deleteTodoBtn.length; i++) {
  deleteTodoBtn[i].addEventListener("click", function () {
    console.log("delete");
  });
}

function addToDoToList() {
  let todoValues = document.querySelector("input").value;
  if (todoValues == null || todoValues.length === 0) return;
  const list = createTodo(todoValues);
  lists.push(list);
  console.log(lists);
  fetchTodoList();
  save();
}
window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  if (key == 13) {
    addToDoToList();
  }
});

function save() {
  localStorage.setItem(LIST_KEY, JSON.stringify(lists));
}

function createTodo(todoItem) {
  return { id: Date.now().toString(), todo: todoItem, isComplete: false };
}

// function deleteTodo() {
//   var j;
//   for (j = 0; j < close.length; j++) {
//     close[j].onclick = function () {
//       console.log("hello");
//     };
//   }
// }

function fetchTodoList() {
  clearContent(todoContainer);
  document.getElementById("left-task").innerHTML =
    lists.length + " task pending";
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.todoId = list.id;
    listElement.innerText = list.todo;
    todoContainer.appendChild(listElement);
  });
  var myNodelist = document.getElementsByTagName("li");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "closeBtn";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
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
