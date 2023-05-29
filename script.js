var taskListArray= [];

function saveTask(){
    debugger;
   var taskName = ducument.getElementById("textItem").value;
   var todoObject = {
    taskId: taskListArray.length + 1,
    taskName: taskName
   };
   taskListArray.push(todoObject);
}