import Todo from "./todo";
import project from "./project";
import { loadMenu, toggleMenuSelect } from "./menuViewController";
import { displayTodoModal, displayTodoFormModal, displayProjectForm } from "./modalViewController";
import { toggleTodoButton, loadProject, loadAllProjects, reloadProject, clearProjects } from "./todoViewController";
import { loadProjectsFromLocalStorage, setObject } from "./localStorage";

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

  switch (menuAction) {
    case 'displayNewProjectModal':
      displayProjectForm('New project');
      break;
    case 'loadAllProjects':
      clearProjects();
      loadAllProjects(projects);
      toggleMenuSelect(menuItem);
      break;
    case 'loadProject':
      const projectIndex = menuItem.getAttribute('project-index');
      clearProjects();
      loadProject(projects[projectIndex], projectIndex);
      toggleMenuSelect(menuItem);
      break;
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

  switch (dataAction) {
    case 'toggleTodoStatus':
      // Toggle radio button element, toggle status of the todo and save
      toggleTodoButton(projectElem); 
      todoItem.toggleStatus();
      setObject('projects', projects);
      break;
    case 'deleteTodo':
      // Prompt user to confirm deletion and then delete and save if accepted
      if (confirm('Are you sure you want to delete this item?') === true) {
        projects[projectIndex].removeTodo(todoIndex);
        reloadProject(projects[projectIndex], projectIndex);
        setObject('projects', projects);
      }
      break;
    case 'editProject':
      displayProjectForm('Edit project', projects[projectIndex], projectIndex);
      break;
    case 'viewTodoDetails':
      // Display modal with full todo details
      displayTodoModal(todoItem, projectIndex, todoIndex);
      break;
    case 'displayNewTodoModal':
      // Display modal with form to add new todo
      displayTodoFormModal('New todo', {}, projectIndex);
      break;
  }
});

// Modal content div contains ability to create and edit new todos and projects
const modalContentDiv = document.getElementsByClassName('modal-content')[0];

modalContentDiv.addEventListener('click', (e) => {
  // Guard clause, only element which should have impact are buttons
  if (!e.target.matches('.button')) return;

  e.preventDefault(); // Stop button from submitting
  
  switch (e.target.innerText) {
    case 'Add todo': {
      const form = e.target.closest('form');
      const projectIndex = form.getAttribute('project-index');
      const todoItem = new Todo(document.getElementById('title').value,
                                document.getElementById('description').value,
                                document.getElementById('duedate').value,
                                document.getElementById('priority').value);
  
      projects[projectIndex].addTodo(todoItem);
      reloadProject(projects[projectIndex], projectIndex);
      break;
    }
    case 'Add project': {
      const titleValue = document.getElementById('title').value
      const projectItem = project(titleValue);
  
      projects.push(projectItem);
      loadMenu(projects);
      clearProjects();
      loadProject(projects[(projects.length - 1)], projects.length - 1);
      break;
    }
    case 'Edit todo': {
      const editDiv = modalContentDiv.querySelector('[project-index]');
      const projectIndex = editDiv.getAttribute('project-index');
      const todoIndex = editDiv.getAttribute('todo-index');
  
      const todoItem = projects[projectIndex].getTodo(todoIndex);
      displayTodoFormModal('Edit todo', todoItem, projectIndex, todoIndex);
      break;
    }
    case 'Save changes': {
      const form = e.target.closest('form');
      const todoIndex = form.getAttribute('todo-index');
      const projectIndex = form.getAttribute('project-index');
      
      projects[projectIndex].editTodo(todoIndex,
                                      document.getElementById('title').value,
                                      document.getElementById('description').value,
                                      document.getElementById('duedate').value,
                                      document.getElementById('priority').value)
  
      reloadProject(projects[projectIndex], projectIndex);
      break;
    }
  }

  setObject('projects', projects); // Save projects object
});