import Todo from "./todo";
import project from "./project";
import { loadMenu, toggleMenuSelect } from "./menuViewController";
import { displayTodoModal, displayNewTodoModal } from "./modalViewController";
import { toggleTodoButton, loadProject, loadProjects, reloadProject, clearProjects } from "./todoViewController";
import { loadProjectsFromLocalStorage, setObject, getObject } from "./localStorage";

// Load projects from local storage or generates new projects object
const projects = loadProjectsFromLocalStorage();

// By default load the project at index 0 (inbox) 
loadMenu(projects);
loadProject(projects[0], 0);

// Menu event listener
menu.addEventListener('click', (e) => {
  if (e.target.matches('.menu-item')) {
    const projectIndex = e.target.getAttribute('project-index');

    if (projectIndex) {
      clearProjects();
      loadProject(projects[projectIndex], projectIndex);
      toggleMenuSelect(e.target);
    } else {
      clearProjects();
      loadProjects(projects);
      toggleMenuSelect(e.target);
    }
  }
});

// Main content div contains todo lists and related functionality
const mainContentDiv = document.getElementById('content');

mainContentDiv.addEventListener('click', (e) => {
  // Guard clause if element selected is not a todo item
  if (!e.target.hasAttribute('project-index')) return;

  const projectIndex = e.target.getAttribute('project-index');
  const todoIndex = e.target.getAttribute('todo-index');
  const todoItem = projects[projectIndex].getTodo(todoIndex);

  // Event delegation to determine which task to run
  if (e.target.matches('.radio')) {
    toggleTodoButton(e.target); 
    projects[projectIndex].toggleTodoStatus(todoIndex);
    setObject('projects', projects); // Save projects object
  } else if (e.target.matches('.title')) {
    displayTodoModal(todoItem);
  } else if (e.target.matches('.delete')) {
    projects[projectIndex].removeTodo(todoIndex);
    reloadProject(projects[projectIndex], projectIndex);
    setObject('projects', projects); // Save projects object
  } else if (e.target.matches('.add-todo')) {
    displayNewTodoModal(projectIndex);
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
  const projectIndex = document.getElementById('project-index').value;
  const todoItem = new Todo(titleValue, descriptionValue, dueDateValue, priorityValue);

  modal.style.display = 'none';

  // Add todo item to project todo list and refresh DOM
  projects[projectIndex].addTodo(todoItem);
  reloadProject(projects[projectIndex], projectIndex);
  setObject('projects', projects); // Save projects object
});