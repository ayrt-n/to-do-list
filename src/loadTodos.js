import trashSvg from './images/garbage.svg';

// Module to load project and associated todos to DOM
const contentDiv = document.getElementById('content');

const loadProject = (project) => {
  const header = document.createElement('h1');
  header.innerHTML = project.name;
  const todosDiv = document.createElement('div');
  todosDiv.classList.add('todos');
  todosDiv.appendChild(header);
  
  project.todoList.forEach((todo, index) => {
    const todoListItem = createTodoListItem(todo, project, index);
    todosDiv.appendChild(todoListItem);
  });

  const addTask = createAddTaskButton(project);

  todosDiv.appendChild(addTask);
  contentDiv.appendChild(todosDiv);
};

// Create radio button element for todo list item
const createRadioButton = (todo, project, index) => {
  const radioDiv = document.createElement('div');
  radioDiv.classList.add('radio');
  radioDiv.setAttribute('todo-index', index);
  radioDiv.setAttribute('project', project.name.toLowerCase());
  
  if (todo.getStatus() === 1) {
    radioDiv.classList.add('selected');
  }

  return radioDiv;
};

// Create div to display details of the todo list item
const createTodoItem = (todo, project, index) => {
  const projectDetails = document.createElement('div');
  projectDetails.classList.add('project-details');

  const title = document.createElement('div');
  title.classList.add('title');
  title.innerHTML = todo.title;
  title.setAttribute('project', project.name.toLowerCase());
  title.setAttribute('todo-index', index);

  const dueDate = document.createElement('div');
  dueDate.classList.add('due-date', 'sub-title');
  dueDate.innerHTML = todo.dueDate;

  projectDetails.appendChild(title);
  projectDetails.appendChild(dueDate);

  return projectDetails;
};

// Create trash icon for todo list item
const createTrashIcon = (project, index) => {
  const trashIcon = document.createElement('img');
  trashIcon.src = trashSvg;
  trashIcon.classList.add('small-icon', 'delete');
  trashIcon.setAttribute('todo-index', index);
  trashIcon.setAttribute('project', project.name.toLowerCase());
  
  return trashIcon;
};

// Create the complete todo list element for the DOM
const createTodoListItem = (todo, project, index) => {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const radioButton = createRadioButton(todo, project, index);
  const trashIcon = createTrashIcon(project, index);
  const todoDetails = createTodoItem(todo, project, index);

  todoDiv.appendChild(radioButton);
  todoDiv.appendChild(todoDetails);
  todoDiv.appendChild(trashIcon);

  return todoDiv;
}

// Create the add task button
const createAddTaskButton = (project) => {
  const addTodoDiv = document.createElement('div');
  addTodoDiv.classList.add('add-todo');
  addTodoDiv.setAttribute('project', project.name.toLowerCase());

  const plusDiv = document.createElement('div');
  plusDiv.classList.add('plus');
  const plus = document.createTextNode('+')
  plusDiv.appendChild(plus);

  addTodoDiv.appendChild(plusDiv);
  const taskTextNode = document.createTextNode('Add task')
  addTodoDiv.appendChild(taskTextNode);

  return addTodoDiv;
};

export default loadProject;