

import { v4 as uuidV4 } from "uuid"

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}


//we want to save the tasks in the local storage, so therefore we create a new variable annotate it as a array of type Task 
const tasks: Task[] = loadTasks()

tasks.forEach(addListItem)


form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed:false,
    createdAt: new Date(),
  }

  tasks.push(newTask)
  saveTasks()

    
 
  //tasks.push(true) ->

 // if I try to push a boolean inside the tasks variable, I will get an typecheck from typescript saying hey this is a Boolean, we expect this to be a task
  
addListItem(newTask)
input.value = ""

})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked 
    saveTasks() })    //now everytime we create a new task its going to be saved to the localstorage

    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)// if the list is null dont append the item
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    //now everytime we create a new task its going to be saved to the localstorage
  }

  function loadTasks():Task[] {
    
    //return JSON.parse(localStorage.getItem("tasks"))// but when we hover over localStorage
    //we will see that a task could be a string or null.. and that localStorage.getItem is expecting to only a string, so we need to do the following

    const taskJSON = localStorage.getItem("tasks") 
    if (taskJSON == null) return [] 
    return JSON.parse(taskJSON ) //json parse can return any so we need to annotate the function with a type Task
  }
