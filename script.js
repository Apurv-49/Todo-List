document.addEventListener("DOMContentLoaded",()=>{
  const input = document.getElementById("todo-input");
  const button = document.getElementById("add-task-btn");
  const todolist = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(tasks => {
    renderTask(tasks)
  });

  button.addEventListener("click",()=>{
    const tasktext=input.value.trim()
    if(tasktext==="") return
    const newtask={
      id:Date.now(),
      text:tasktext,
      completed:false
    }
    tasks.push(newtask)
    saveTasks()
    renderTask(newtask)
    input.value="" // clear text
  
  })

  function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
  }
  function renderTask(task){
    const li=document.createElement("li")
    if (task.completed) li.classList.add("completed");
    li.setAttribute("data-id",task.id)
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    todolist.appendChild(li)

    li.addEventListener("click",(e)=>{
      if(e.target.tagName==="BUTTON") return
      task.completed=!task.completed
      li.classList.toggle("completed");
      saveTasks()
    })

    li.querySelector("button").addEventListener("click",(e)=>{
      e.stopPropagation()
      tasks = tasks.filter((t) => t.id !== task.id); 
      li.remove()
      saveTasks()
    })
  }

})
