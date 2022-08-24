import todo from "./todo";
import project from "./project";
import burger from "./menuController";
import { loadProject, reloadProject } from "./loadTodos";
import { displayTodoModal, displayNewTodoModal } from "./modalViewController";
import { toggleTodoButton, removeTodoItem } from "./todoViewController";

const inbox = project('Inbox');
const testTodo1 = todo('A dynamically generated task', 'N/a', 'Whenever', 'High');
const testTodo2 = todo('A dynamically generated task', 'N/a', 'Whenever', 'High');
const testTodo3 = todo('A dynamically generated task', 'N/a', 'Whenever', 'High');
inbox.addTodo(testTodo1);
inbox.addTodo(testTodo2);
inbox.addTodo(testTodo3);

inbox.toggleTodoStatus(2);


loadProject(inbox);

const work = project('Work');
const work1 = todo('A dynamically generated work task', 'N/a', 'Whenever', 'High');
const work2 = todo('A dynamically generated work task', 'N/a', 'Whenever', 'High');
work.addTodo(work1);
work.addTodo(work2);

loadProject(work);

const projects = {
  inbox,
  work
}

// Main content div contains todo lists and related functionality
const mainContentDiv = document.getElementById('content');

mainContentDiv.addEventListener('click', (e) => {
  // Guard clause if element selected is not a todo item
  if (!e.target.hasAttribute('project')) return;

  const projectName = e.target.getAttribute('project');
  const todoIndex = e.target.getAttribute('todo-index');
  const todoItem = projects[projectName].getTodo(todoIndex);

  // Event delegation to determine which task to run
  if (e.target.matches('.radio')) {
    toggleTodoButton(e.target);
    projects[projectName].toggleTodoStatus(todoIndex);
  } else if (e.target.matches('.title')) {
    displayTodoModal(todoItem);
  } else if (e.target.matches('.delete')) {
    projects[projectName].removeTodo(todoIndex);
    console.log(projects[projectName]);
    reloadProject(projects[projectName]);
  } else if (e.target.matches('.add-todo')) {
    displayNewTodoModal(projectName);
  }
});

// Modal content div contains ability to create and edit new todos and projects
const modalContentDiv = document.getElementsByClassName('modal-content')[0];

modalContentDiv.addEventListener('click', (e) => {
  // Guard clause, only element which should have impact are buttons
  if (!e.target.matches('.button')) return;

  // Create todo item using form input data
  const titleValue = document.getElementById('title').value;
  const priorityValue = document.getElementById('priority').value;
  const dueDateValue = document.getElementById('duedate').value;
  const descriptionValue = document.getElementById('description').value;
  const projectValue = document.getElementById('project').value;
  const todoItem = todo(titleValue, descriptionValue, dueDateValue, priorityValue);

  modal.style.display = 'none';

  // Add todo item to project todo list and refresh DOM
  projects[projectValue].addTodo(todoItem);
  reloadProject(projects[projectValue]);
});