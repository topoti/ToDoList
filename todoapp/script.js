const inputtdl = document.querySelector('.textarea')
const buttontdl = document.querySelector('.buttoninput')
const listtdl = document.querySelector('.todolist')

const activeButton = document.getElementById("activeButton");
const allButton = document.getElementById("allButton");
const doneButton = document.getElementById("doneButton");
const clearButton = document.getElementById("clearButton");
const number = document.getElementById("number");

const currentList = [];
const updatedList = [];

let item = 0;
const currentDate = new Date();
let index = 1;


function clickButton(e) {
    e.preventDefault()
    addTodo()
}

// adding todoList
function addTodo() {
    const itemall = document.createElement('div')
    itemall.classList.add('itemall')

    const item = document.createElement('p')
    item.classList.add('item')
    item.innerText = inputtdl.value
    itemall.appendChild(item)

    if (inputtdl.value === '') return

    const checkbutton = document.createElement("button")
    checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>'
    checkbutton.classList.add("check-button")
    itemall.appendChild(checkbutton)

    const trashbutton = document.createElement("button")
    trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    trashbutton.classList.add("trash-button")
    itemall.appendChild(trashbutton)

    listtdl.appendChild(itemall)
    inputtdl.value = ''
}

// checking and delete todoList 
function okdel(e) {
    const item = e.target

    // check
    if (item.classList[0] === 'check-button') {
        const todolist = item.parentElement
        todolist.classList.toggle('checklist')
    }

    // delete
    if (item.classList[0] === 'trash-button') {
        const todolist = item.parentElement
        todolist.remove()
    }
}

buttontdl.addEventListener('click', clickButton)
listtdl.addEventListener('click', okdel)


activeButton.addEventListener("click", function () {
    activeButton.style.background = "green";
    currentState();
  });
  
  allButton.addEventListener("click", function () {
    allButton.style.background = "green";
    currentState();
  });
  
  doneButton.addEventListener("click", function () {
    doneButton.style.background = "green";
    currentState();
  });
  
  clearButton.addEventListener("click", function () {
    for(let i=0;i<updatedList.length;i++)
    {
      if(updatedList[i].active==false)
      {
        updatedList.splice(updatedList.indexOf(updatedList[i]), 1);
        i--;
      }
    }
    currentState();
  });
  
  function currentState() {
    if (allButton.style.background == "green") {
      allButtonPressed(1);
    }
    if (doneButton.style.background == "green") {
      allButtonPressed(2);
    }
    if (activeButton.style.background == "green") {
      allButtonPressed(3);
    }
  }
  
  function showItem() {
    if (item > 1) number.innerHTML = `${item} items left`;
    else if (item == 1) number.innerHTML = `${item} item left`;
    else number.innerHTML = "";
  }





function updateList() {
    if ( inputtdl.value == "") {
      return;
    }
    item = item + 1;
    showItem();
    const newEntry = {};
  
    const some = {a: 'sakib'}
    function ab(ob) {
      ob.a = {}
    }
    ab({...some});
  
    newEntry.id =Date.now();
    newEntry.text =  inputtdl.value;
    inputtdl.value = "";
    newEntry.active = true;
    updatedList.push(newEntry);
  
    allButtonPressed(4);
  }
  
  function allButtonPressed(a) {
    const list = document.getElementById("list");
    list.innerHTML = "";
    for (let i = 0; i < updatedList.length; i++) {
      if (a == 2) {
        if (updatedList[i].active == true) continue;
      }
      if (a == 3) {
        if (updatedList[i].active == false) continue;
      }
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fas", "fa-trash");
      const doneIcon = document.createElement("i");
      doneIcon.classList.add("fas", "fa-check-circle");
      const listItem = document.createElement("li");
  
      const itemText = document.createElement("span");
      itemText.innerText = updatedList[i].text;
      itemText.style.color = "black";
      itemText.style.background = "white";
      itemText.style.marginLeft = "30px";
      itemText.style.marginRight = "30px";
  
      const doneButton = document.createElement("button");
      doneButton.innerText = "Done";
      doneButton.style.color = "green";
  
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.style.color = "red";
  
      doneButton.innerHTML = "";
      doneButton.appendChild(doneIcon);
  
      deleteButton.innerHTML = "";
      deleteButton.appendChild(trashIcon);
  
      itemText.addEventListener("dblclick", function () {
        itemText.contentEditable = true;
        itemText.focus();
      });
      if(updatedList[i].active==false)
      {
        listItem.done = true;
        listItem.style.textDecoration = "line-through";
        listItem.style.background = "grey";
      }
      doneButton.addEventListener("click", function () {
        if (listItem.done != true) {
          item--;
          showItem();
        }
        for (let i = 0; i < updatedList.length; i++) {
          if (updatedList[i].id == listItem.id) {
            updatedList[i].active = false;
          }
          console.log(updatedList);
        }
        listItem.done = true;
        listItem.style.textDecoration = "line-through";
        listItem.style.background = "grey";
        currentState();
      });
      deleteButton.addEventListener("click", function () {
        if (listItem.done != true) {
          item--;
          showItem();
        }
        for (let i = 0; i < updatedList.length; i++) {
          if (updatedList[i].id == listItem.id) {
            updatedList.splice(updatedList.indexOf(updatedList[i]), 1);
          }
          console.log(updatedList);
        }
        listItem.done = false;
        listItem.remove();
        currentState();
      });
      listItem.id = updatedList[i].id;
      listItem.append(doneButton);
      listItem.append(itemText);
      listItem.append(deleteButton);
      list.append(listItem);
    }
    if(a==4)
    {
      currentState();
    }
  }
  