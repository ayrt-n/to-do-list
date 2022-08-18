import trashSvg from './images/garbage.svg';

// Module to load project and associated todos to DOM
const contentDiv = document.getElementById('content');

const loadProject = (project) => {
  const header = document.createElement('h1');
  header.innerHTML = project.name;
  const todosDiv = document.createElement('div');
  todosDiv.classList.add('todos');
  
  project.todoList.forEach(todo => {
    const todoListItem = createTodoListItem(todo);
    todosDiv.appendChild(todoListItem);
  });

  const addTask = createAddTaskButton();

  contentDiv.appendChild(header);
  contentDiv.appendChild(todosDiv);
  contentDiv.appendChild(addTask);
};

// Create radio button element for todo list item
const createRadioButton = () => {
  const containerDiv = document.createElement('div');
  const radioDiv = document.createElement('div');
  radioDiv.classList.add('radio');
  const selectDiv = document.createElement('div');

  radioDiv.appendChild(selectDiv);
  containerDiv.appendChild(radioDiv);

  return containerDiv;
};

// Create div to display details of the todo list item
const createTodoItem = (todo) => {
  const projectDetails = document.createElement('div');
  projectDetails.classList.add('project-details');

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
const createTrashIcon = () => {
  const containerDiv = document.createElement('div');
  const trashIcon = document.createElement('img');
  trashIcon.src = trashSvg;
  trashIcon.classList.add('small-icon');

  containerDiv.appendChild(trashIcon);
  return containerDiv;
};

// Create the complete todo list element for the DOM
const createTodoListItem = (todo) => {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const radioButton = createRadioButton();
  const trashIcon = createTrashIcon();
  const todoDetails = createTodoItem(todo);
  

  todoDiv.appendChild(radioButton);
  todoDiv.appendChild(todoDetails);
  todoDiv.appendChild(trashIcon);

  return todoDiv;
}

// Create the add task button
const createAddTaskButton = () => {
  const addTodoDiv = document.createElement('div');
  addTodoDiv.classList.add('add-todo');

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