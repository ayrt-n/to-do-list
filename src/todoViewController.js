import trashSvg from './images/garbage.svg';

// Module handles manipulating main content div which holds projects and todo lists
const contentDiv = document.getElementById('content');

// Toggle radio button styling to select/deselect
const toggleTodoButton = (target) => {
  target.classList.toggle('selected');
};

// Clear main content div
const clearProjects = () => {
  contentDiv.innerHTML = '';
};

// Create and display multiple projects given project array
// Projects start at index 1 to skip general inbox
const loadAllProjects = (projectsObject) => {
  for (let i = 1; i < projectsObject.length; i++) {
    loadProject(projectsObject[i], i);
  }
};

// Create and display a project in the main content div
// Should receive a project object
const loadProject = (project, projectIndex) => {
  const header = createProjectHeader(project, projectIndex);
  const todosDiv = document.createElement('div');
  todosDiv.classList.add('todos');
  todosDiv.appendChild(header);
  todosDiv.id = project.name.toLowerCase();
  
  project.todoList.forEach((todo, todoIndex) => {
    const todoListItem = createTodoListItem(todo, projectIndex, todoIndex);
    todosDiv.appendChild(todoListItem);
  });

  const addTask = createAddTaskButton(projectIndex);

  todosDiv.appendChild(addTask);
  contentDiv.appendChild(todosDiv);
};

// Clear DOM and rebuild the given project in its containing div
const reloadProject = (project, projectIndex) => {
  const projectDiv = document.getElementById(project.name.toLowerCase());
  projectDiv.innerHTML = '';

  const header = createProjectHeader(project, projectIndex);
  projectDiv.appendChild(header);

  project.todoList.forEach((todo, todoIndex) => {
    const todoListItem = createTodoListItem(todo, projectIndex, todoIndex);
    projectDiv.appendChild(todoListItem);
  });

  const addTask = createAddTaskButton(projectIndex);
  projectDiv.appendChild(addTask);
};

// Create project header with associated buttons
const createProjectHeader = (project, projectIndex) => {
  const projectHeader = document.createElement('h1');
  projectHeader.classList.add('project-header');
  projectHeader.innerHTML = project.name;
  projectHeader.setAttribute('project-index', projectIndex);

  if (!(projectIndex === 0 || projectIndex === '0')) {
    projectHeader.setAttribute('data-action', 'editProject');
    projectHeader.classList.add('pointer');
  }

  return projectHeader;
}

// Create radio button element for todo list item
const createRadioButton = (todo, projectIndex, todoIndex) => {
  const radioDiv = document.createElement('div');
  radioDiv.classList.add('radio');
  radioDiv.setAttribute('todo-index', todoIndex);
  radioDiv.setAttribute('project-index', projectIndex);
  radioDiv.setAttribute('data-action', 'toggleTodoStatus');
  
  if (todo.status === 1) {
    radioDiv.classList.add('selected');
  }

  return radioDiv;
};

// Create div to display details of the todo list item
const createTodoItem = (todo, projectIndex, todoIndex) => {
  const projectDetails = document.createElement('div');
  projectDetails.classList.add('project-details');
  projectDetails.setAttribute('project-index', projectIndex);
  projectDetails.setAttribute('todo-index', todoIndex);
  projectDetails.setAttribute('data-action', 'viewTodoDetails');

  const title = document.createElement('div');
  title.classList.add('title');
  title.innerHTML = todo.title;

  const dueDate = document.createElement('div');
  dueDate.classList.add('due-date', 'sub-title');
  dueDate.innerHTML = todo.dueDate;

  projectDetails.appendChild(title);
  projectDetails.appendChild(dueDate);

  return projectDetails;
};

// Create trash icon for todo list item
const createTrashIcon = (projectIndex, todoIndex) => {
  const trashIcon = document.createElement('img');
  trashIcon.src = trashSvg;
  trashIcon.classList.add('small-icon', 'delete');
  trashIcon.setAttribute('todo-index', todoIndex);
  trashIcon.setAttribute('project-index', projectIndex);
  trashIcon.setAttribute('data-action', 'deleteTodo');
  
  return trashIcon;
};

// Create the complete todo list element for the DOM
const createTodoListItem = (todo, projectIndex, todoIndex) => {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const radioButton = createRadioButton(todo, projectIndex, todoIndex);
  const trashIcon = createTrashIcon(projectIndex, todoIndex);
  const todoDetails = createTodoItem(todo, projectIndex, todoIndex);

  todoDiv.appendChild(radioButton);
  todoDiv.appendChild(todoDetails);
  todoDiv.appendChild(trashIcon);

  return todoDiv;
}

// Create the add task button
const createAddTaskButton = (projectIndex) => {
  const addTodoDiv = document.createElement('div');
  addTodoDiv.classList.add('add-todo');
  addTodoDiv.setAttribute('project-index', projectIndex);
  addTodoDiv.setAttribute('data-action', 'displayNewTodoModal');

  const plusDiv = document.createElement('div');
  plusDiv.classList.add('plus');
  const plus = document.createTextNode('+')
  plusDiv.appendChild(plus);

  addTodoDiv.appendChild(plusDiv);
  const taskTextNode = document.createTextNode('Add task')
  addTodoDiv.appendChild(taskTextNode);

  return addTodoDiv;
};

export {
  loadProject,
  loadAllProjects,
  reloadProject,
  clearProjects,
  toggleTodoButton
}