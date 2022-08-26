import Todo from "./todo";
import project from "./project";
import { loadMenu } from "./menuController";
import { loadProject, reloadProject } from "./loadTodos";
import { displayTodoModal, displayNewTodoModal } from "./modalViewController";
import { toggleTodoButton } from "./todoViewController";
import { loadProjectsFromLocalStorage, setObject, getObject } from "./localStorage";

// Load projects from local storage or generates new projects object
const projects = loadProjectsFromLocalStorage();

// By default load the inbox project 
loadMenu(projects);
loadProject(projects['inbox']);

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
    setObject('projects', projects); // Save projects object
  } else if (e.target.matches('.title')) {
    displayTodoModal(todoItem);
  } else if (e.target.matches('.delete')) {
    projects[projectName].removeTodo(todoIndex);
    reloadProject(projects[projectName]);
    setObject('projects', projects); // Save projects object
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
  const todoItem = new Todo(titleValue, descriptionValue, dueDateValue, priorityValue);

  modal.style.display = 'none';

  // Add todo item to project todo list and refresh DOM
  projects[projectValue].addTodo(todoItem);
  reloadProject(projects[projectValue]);
  setObject('projects', projects); // Save projects object
});