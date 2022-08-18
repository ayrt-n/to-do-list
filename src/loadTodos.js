import trashSvg from './images/garbage.svg';

// Module to load project and associated todos to DOM
const contentDiv = document.getElementById('content');

const loadProject = (project) => {
  const header = document.createElement('h1');
  header.innerHTML = project.name;
  const todosDiv = document.createElement('div');
  todosDiv.classList.add('todos');
  todosDiv.setAttribute('project', project.name.toLowerCase());
  
  project.todoList.forEach((todo, index) => {
    const todoListItem = createTodoListItem(todo, index);
    todosDiv.appendChild(todoListItem);
  });

  const addTask = createAddTaskButton();

  contentDiv.appendChild(header);
  contentDiv.appendChild(todosDiv);
  contentDiv.appendChild(addTask);
};

// Create radio button element for todo list item
const createRadioButton = (todo) => {
  const radioDiv = document.createElement('div');
  radioDiv.classList.add('radio');
  const selectDiv = document.createElement('div');

  if (todo.getStatus() === 1) {
    selectDiv.classList.add('selected');
  }

  radioDiv.appendChild(selectDiv);
  return radioDiv;
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
  const trashIcon = document.createElement('img');
  trashIcon.src = trashSvg;
  trashIcon.classList.add('small-icon');

  return trashIcon;
};

// Create the complete todo list element for the DOM
const createTodoListItem = (todo, index) => {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  todoDiv.setAttribute('todo-index', index)

  const radioButton = createRadioButton(todo);
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