// selectors
const todoinput = document.getElementById("todo-input");
const todobutton = document.getElementById("todo-button");
const todolist = document.querySelector(".todo-list");
const filteroption = document.querySelector(".filter-todo")

// event listener
document.addEventListener("DOMContentLoaded",gettodo);
todobutton.addEventListener("click", addtodo);
todolist.addEventListener("click", deletecheck);
filteroption.addEventListener("click",filtertodo)

// functions
function addtodo(event) {
   event.preventDefault();

    // todo div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");

    
    // Add todos to local localStorage
    savelocaltodos(todoinput.value);

    // Creating li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoinput.value;
// Clearing input clicking completed button.
    todoinput.value = "";
    tododiv.appendChild(newTodo);

    // completed button
    const completedbutton = document.createElement("button");
    completedbutton.innerHTML = '<i class = "fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);

    // trash button
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    // append to list
    todolist.appendChild(tododiv);
}

// The parentElement property returns the parent element of the specified element.
// document.body.parentNode; // Returns the <html> element

function deletecheck(e) {
    const item = e.target;
    // delete todo
    if (item.classList[0] === "trash-btn") {
        const removeelement = item.parentElement;
        // animations
        removeelement.classList.add("fall");
        removelocaltodos(removeelement);
        removeelement.addEventListener("transitionend",function(){
            removeelement.remove();
        });
    }

    // check todo
    if (item.classList[0] === "complete-btn") {
        const check = item.parentElement;
        check.classList.toggle("completed");
    }
}


function filtertodo(e) {
    const todos = todolist.childNodes;
    todos.forEach( function(todo) {
        switch(e.target.value){
            case "all":
               todo.style.display = "flex";  //don't use block.
             break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";      
                } else {
                    todo.style.display = "none";
                }
            break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";      
                } else {
                    todo.style.display = "none";
                }
            break;    
        }
    });
}

function savelocaltodos(inputvalues) {

    // check-->Do I already have thing in there?

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 

    todos.push(inputvalues);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function gettodo() {
    let todos;
    // check-->Do I already have thing in there?

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    todos.forEach(function(todo){
      
    // todo div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");

   // Creating li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    tododiv.appendChild(newTodo);

    // completed button
    const completedbutton = document.createElement("button");
    completedbutton.innerHTML = '<i class = "fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);

    // trash button
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    // append to list
    todolist.appendChild(tododiv);
    });
}

function removelocaltodos(todo) {
    let todos;
    // check-->Do I already have thing in there?

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
}

// Example of above
const fruits = ["apple","banana","donut","babyboy"];
const donutindex = fruits.indexOf("donut");
console.log(donutindex);

fruits.splice(donutindex,1);
console.log(fruits);