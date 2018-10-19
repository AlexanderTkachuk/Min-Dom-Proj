// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const formBtn = document.querySelector('.formBtn');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  formBtn.addEventListener('click', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear all tasks
  clearBtn.addEventListener('click', clearAllList);
  //filter tasks events
  filter.addEventListener('keyup', filterTasks);
}

//create and add task
function addTask(e){
  e.preventDefault();
  //create and add Element to task list
  if(taskInput.value === '') {alert('Add the task');}

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="icon fa fa-remove"></i>'

  li.appendChild(link);

  taskList.appendChild(li);
  //store in localstorage
  storeTaskInLocalStorage(taskInput.value);  

  taskInput.value = '';
};

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remover Task1
function removeTask(e) {
  e.preventDefault();

  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you shure?')){
      e.target.parentElement.parentElement.remove();

      //remove from localstorage
      removeTaskFromLocalStorage();
    }
  }
}

//removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
      if(taskItem.textContent == task) {
        task.splice(index, 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all tasks list
function clearAllList(e) {
  e.preventDefault();
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearAllLocalStorage();
}

//clear all local storage
function clearAllLocalStorage() { 
  localStorage.clear();
}

// get tasks from LS
function  getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    //create and add Element to task list
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));

      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="icon fa fa-remove"></i>'

      li.appendChild(link);

      taskList.appendChild(li);
  })
}

//filter 
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}









