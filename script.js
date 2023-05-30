// getting all the element
const inputField = document.getElementById("inputField");
const addButton = document.getElementById("addButton");
const activeButton = document.getElementById("activeButton");
const allButton = document.getElementById("allButton");
const completeButton = document.getElementById("completeButton");
const clearButton = document.getElementById("clearButton");
const number = document.getElementById("number");
const currentList = [];
const updatedList = [];
let item = 0;
const currentDate = new Date();
let index = 1;

// function
addButton.addEventListener("click", function () {
  updateList();
});

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    updateList();
  }
});


activeButton.addEventListener("click", function () {
    allButton.style.background = "black";
    completeButton.style.background = "black";
    activeButton.style.background = "green";
    currentState();
  });
  
  allButton.addEventListener("click", function () {
    allButton.style.background = "green";
    completeButton.style.background = "black";
    activeButton.style.background = "black";
    currentState();
  });
  
  completeButton.addEventListener("click", function () {
    allButton.style.background = "black";
    completeButton.style.background = "green";
    activeButton.style.background = "black";
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
  if (completeButton.style.background == "green") {
    allButtonPressed(2);
  }
  if (activeButton.style.background == "green") {
    allButtonPressed(3);
  }
}

function showItem() {
  if (item > 1) 
  {
    number.innerHTML = `${item} items left`;
    }
  else if (item == 1) 
  {
    number.innerHTML = `${item} item left`;
  }
  else number.innerHTML = "";
}

function updateList() {
  if (inputField.value == "") {
    return;
  }
  item = item + 1;
  showItem();
  const newEntry = {};

  newEntry.id =Date.now();
  newEntry.text = inputField.value;
  inputField.value = "";
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
    doneIcon.classList.add("fas", "fa-check");
    const listItem = document.createElement("li");

    const itemText = document.createElement("span");
    itemText.innerText = updatedList[i].text;
    itemText.style.color = "black";
    itemText.style.background = "white";
    itemText.style.marginLeft = "50px";
    itemText.style.marginRight = "50px";

    const completeButton = document.createElement("button");
    completeButton.innerText = "Done";

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";

    completeButton.innerHTML = "";
    completeButton.appendChild(doneIcon);

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
      listItem.style.background = "gray";
    }
    completeButton.addEventListener("click", function () {
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
      listItem.style.background = "gray";
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
    listItem.append(completeButton);
    listItem.append(itemText);
    listItem.append(deleteButton);
    list.append(listItem);
  }
  if(a==4)
  {
    currentState();
  }
}
