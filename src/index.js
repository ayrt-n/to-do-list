import Todo from "./todo";
import project from "./project";
import { loadMenu, toggleMenuSelect } from "./menuViewController";
import { displayTodoModal, displayNewTodoModal, displayNewProjectModal } from "./modalViewController";
import { toggleTodoButton, loadProject, loadAllProjects, reloadProject, clearProjects } from "./todoViewController";
import { loadProjectsFromLocalStorage, setObject, getObject } from "./localStorage";

// Load projects from local storage or generates new projects object
const projects = loadProjectsFromLocalStorage();

// By default load the project at index 0 (inbox) 
loadMenu(projects);
loadProject(projects[0], 0);

// Menu event listener
menu.addEventListener('click', (e) => {
  // Guard clause to check if target is a menu-item
  let menuItem = e.target.closest('.menu-item');
  if (!menuItem) return;
  if (!menu.contains(menuItem)) return;

  const menuAction = menuItem.getAttribute('data-action');

  if (menuAction === 'displayNewProjectModal') {
    displayNewProjectModal();
  } else if (menuAction === 'loadAllProjects') {
    clearProjects();
    loadAllProjects(projects);
    toggleMenuSelect(menuItem);
  } else if (menuAction === 'loadProject') {
    const projectIndex = menuItem.getAttribute('project-index');
    clearProjects();
    loadProject(projects[projectIndex], projectIndex);
    toggleMenuSelect(menuItem);
  }
});

// Main content div contains todo lists and related functionality
const mainContentDiv = document.getElementById('content');

mainContentDiv.addEventListener('click', (e) => {
  // Guard clause if element selected is not a todo item
  let projectElem = e.target.closest('[project-index]')
  if (!projectElem) return;

  const projectIndex = projectElem.getAttribute('project-index');
  const todoIndex = projectElem.getAttribute('todo-index');
  const todoItem = projects[projectIndex].getTodo(todoIndex);
  const dataAction = projectElem.getAttribute('data-action');

  // Determine what action to perform based on element clicked
  if (dataAction === 'toggleTodoStatus') {
    // If radio button, toggle radio button and toggle status of the todo and save
    toggleTodoButton(projectElem); 
    todoItem.toggleStatus();
    setObject('projects', projects);
  } else if (dataAction === 'viewTodoDetails') {
    // If title, display modal with full todo details
    displayTodoModal(todoItem);
  } else if (dataAction === 'deleteTodo') {
    // If delete icon, prompt user to confirm deletion and then delete and save if accepted
    if (confirm('Are you sure you want to delete this item?') === true) {
      projects[projectIndex].removeTodo(todoIndex);
      reloadProject(projects[projectIndex], projectIndex);
      setObject('projects', projects);
    }
  } else if (dataAction === 'displayNewTodoModal') {
    // If add todo button, display modal with form to add new todo
    displayNewTodoModal(projectIndex);
  }
});

// Modal content div contains ability to create and edit new todos and projects
const modalContentDiv = document.getElementsByClassName('modal-content')[0];

modalContentDiv.addEventListener('click', (e) => {
  // Guard clause, only element which should have impact are buttons
  if (!e.target.matches('.button')) return;

  e.preventDefault(); // Stop button from submitting
  
  // If button is to add new todo, create new todo, add to project object, and refresh the projects view
  if (e.target.innerText === 'Add todo') {
    const todoItem = new Todo(document.getElementById('title').value,
                              document.getElementById('description').value,
                              document.getElementById('duedate').value,
                              document.getElementById('priority').value);

    const projectIndex = document.getElementById('project-index').value;
    projects[projectIndex].addTodo(todoItem);
    reloadProject(projects[projectIndex], projectIndex);

  // Else if button is to add new project, create a new project, add to project object, and refresh the menu view
  } else if (e.target.innerText === 'Add project') {
    const titleValue = document.getElementById('title').value
    const projectItem = project(titleValue);

    projects.push(projectItem)
    loadMenu(projects);
  }

  setObject('projects', projects); // Save projects object
  modal.classList.remove('active'); // Close modal
});