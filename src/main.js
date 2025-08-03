import { nanoid } from 'nanoid'

const formElem = document.querySelector('.header-form');
const taskListElem = document.querySelector('.tasks-list');

const taskKey = 'tasks'; 
const storageArr = JSON.parse(localStorage.getItem(taskKey)) || [];
formElem.addEventListener('submit', handleFormElem);
function handleFormElem(event) {
  event.preventDefault();
  const taskName = event.currentTarget.elements.taskName.value;
  const taskDescr = event.currentTarget.elements.taskDescription.value;
  console.log(taskName, taskDescr);
  const taskObj = {
    title: taskName.trim(),
    description: taskDescr.trim(),
    id: nanoid(),
  };
  const markup = createTask(taskObj);
  taskListElem.insertAdjacentHTML('afterbegin', markup);
  storageArr.push(taskObj);
  localStorage.setItem(taskKey, JSON.stringify(storageArr));
}
function createTask({ title, description, id }) {
  return `<li class="task-list-item data-id="${id}"><button class="task-list-item-btn">Delete</button><h3>${title}</h3><p>${description}</p></li>`
}
function initTasks() {
  const markUpList = storageArr.map(createTask).join('');
  taskListElem.insertAdjacentHTML('afterbegin', markUpList);
}
initTasks(storageArr);
const listOfTasks = document.querySelector('.tasks-list');

listOfTasks.addEventListener('click', handleDelete);
function handleDelete(event) {
  if (!event.target.classList.contains('task-list-item-btn')) {
    return;
  }
  const btnDelete = event.target;
  const id = btnDelete.closest('li').dataset.id;
  console.log(id);  
}
