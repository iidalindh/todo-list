class ToDoValues {
  constructor(_name, _checked, _createDate) {
    this.name = _name;
    this.checked = _checked;
    this.createDate = _createDate;
  }
}

let toDoList = [];
let date = new Date();

let newTodo = new ToDoValues("Tvätta", false, date.toLocaleString());
let newTodo2 = new ToDoValues("Städa", false, date.toLocaleString());
let newTodo3 = new ToDoValues("Diska", false, date.toLocaleString());
toDoList.push(newTodo);
toDoList.push(newTodo2);
toDoList.push(newTodo3);
let listContainer = document.createElement("div");
listContainer.className = "listContainer";

printList();

function printList() {
  listContainer.innerHTML = "";

  for (let i = 0; i < toDoList.length; i++) {
    let currentTodoItem = toDoList[i];

    let ulElement = document.createElement("ul");
    ulElement.className = "itemsUl";

    let liElement = document.createElement("li");
    liElement.className = "liElement";
    liElement.innerHTML = currentTodoItem.name;

    let checkButton = document.createElement("input");
    let styling = liElement;

    if (currentTodoItem.checked == true) {
      styling.style.textDecoration = "line-through";
      checkButton.checked = true;
    } else {
      styling.style.textDecoration = "none";
      currentTodoItem.checked = false;
    }

    checkButton.addEventListener("change", function check() {
      if (checkButton.checked == true) {
        styling.style.textDecoration = "line-through";
        currentTodoItem.checked = true;
      } else {
        styling.style.textDecoration = "none";
        currentTodoItem.checked = false;
      }
    });

    checkButton.className = "checkButtons";
    checkButton.setAttribute("type", "checkbox");

    let removeButton = document.createElement("button");
    removeButton.addEventListener("click", function remove() {
      toDoList.splice(i, 1);
      printList();
    });
    removeButton.className = "removeButtons";
    removeButton.setAttribute("type", "button");
    removeButton.innerHTML = '<i class="far fa-trash-alt"></i>';

    let checkButtonContainer = document.createElement("li");
    let removeButtonContainer = document.createElement("li");
    let dateContainer = document.createElement("li");

    checkButtonContainer.appendChild(checkButton);
    removeButtonContainer.appendChild(removeButton);
    dateContainer.id = "date";
    dateContainer.innerHTML = currentTodoItem.createDate;

    listContainer.appendChild(ulElement);
    ulElement.appendChild(liElement);
    ulElement.appendChild(checkButtonContainer);
    ulElement.appendChild(removeButtonContainer);
    ulElement.appendChild(dateContainer);
  }
}

document.getElementById("container").appendChild(listContainer);

document.getElementById("toDoForm").addEventListener("submit", addToList);
let inputField = document.getElementById("inputField");

function addToList(e) {
  e.preventDefault();
  let date = new Date();
  let text = inputField.value;
  if (text !== "") {
    let newItem = new ToDoValues(text, false, date.toLocaleString());
    toDoList.push(newItem);
    printList();
    inputField.value = "";
  }
}

document.getElementById("sortBtn").addEventListener("click", sortList);

function sortList() {
  toDoList.sort(function (a, b) {
    var dateA = new Date(a.createDate),
      dateB = new Date(b.createDate);
    return dateB - dateA;
  });
  printList();
}
