const modal = document.getElementById('modal');
const modalContent = document.getElementsByClassName('modal-content')[0];
const modalHeader = document.getElementsByClassName('modal-header')[0];
const closeModalBtn = document.getElementById('close-modal');

// Close modal if window clicked
window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
}

// Close modal if close button is clicked
closeModalBtn.onclick = () => {
  modal.classList.remove('active');
}

// Display more detail modal given a todo object
const displayTodoModal = (todo) => {
  modalContent.innerHTML = '';
  modalHeader.innerHTML = 'Todo details';
  const todoModal = _createTodoModal(todo);
  modalContent.appendChild(todoModal);
  modal.classList.add('active');
};

// Display new todo form in a modal
const displayNewTodoModal = (projectIndex) => {
  modalContent.innerHTML = '';
  modalHeader.innerHTML = 'New todo';
  const todoForm = _createNewTodoModal(projectIndex);
  modalContent.appendChild(todoForm);
  modal.classList.add('active');
};

// Display new project form in a modal
const displayNewProjectModal = () => {
  modalContent.innerHTML = '';
  modalHeader.innerHTML = 'New project';
  const projectForm = _createNewProjectModal();
  modalContent.appendChild(projectForm);
  modal.classList.add('active');
}

const _createNewProjectModal = () => {
  const projectTitle = _createTitleField();
  const submitBtn = _createBtn('Add project');
  const form = document.createElement('form');
  form.id = 'new-project-form';

  form.appendChild(projectTitle);
  form.appendChild(submitBtn);

  return form;
};

const _createNewTodoModal = (projectIndex) => {
  const todoTitle = _createTitleField();
  const todoPriority = _createPriorityField();
  const todoDueDate = _createDueDateField();
  const todoDescription = _createDescriptionField();
  const submitBtn = _createBtn('Add todo');
  const hiddenProjectInput = _createHiddenProjectField(projectIndex);

  const form = document.createElement('form')
  form.id = 'new-todo-form';

  form.appendChild(todoTitle);
  form.appendChild(todoPriority);
  form.appendChild(todoDueDate);
  form.appendChild(todoDescription);
  form.appendChild(hiddenProjectInput);
  form.appendChild(submitBtn);

  return form;
};

// Create more details modal and append to modal content div
const _createTodoModal = (todo) => {
  const todoTitle = _createModalTextSection('Todo', todo.title);
  const priority = _createModalTextSection('Priority', todo.priority);
  const dueDate = _createModalTextSection('Due date', todo.dueDate);
  const description = _createModalTextSection('Description', todo.description);
  const editBtn = _createBtn('Edit todo');

  const div = document.createElement('div');

  div.appendChild(todoTitle);
  div.appendChild(priority);
  div.appendChild(dueDate);
  div.appendChild(description);
  div.appendChild(editBtn);

  return div;
};

// Create a standard modal text element with title and text content
const _createModalTextSection = (title, content) => {
  const div = document.createElement('div');
  div.classList.add('field');

  const sectionTitle = document.createElement('p');
  sectionTitle.classList.add('label');
  sectionTitle.textContent = title;

  const sectionContent = document.createElement('p');
  sectionContent.textContent = content;

  div.appendChild(sectionTitle);
  div.appendChild(sectionContent);

  return div;
};

const _createTitleField = () => {
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('field');

  const titleLabel = document.createElement('label');
  titleLabel.classList.add('label');
  titleLabel.setAttribute('for', 'title');
  titleLabel.innerHTML = 'Title';
  const titleInput = document.createElement('input');
  titleInput.id = 'title';
  titleInput.setAttribute('type', 'text');
  titleInput.classList.add('input')

  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);

  return titleDiv;
};

const _createPriorityField = () => {
  const priorityDiv = document.createElement('div');
  priorityDiv.classList.add('field');
  const priorityOptions = ['Low', 'Medium', 'High'];
  const priorityLabel = document.createElement('label');
  priorityLabel.setAttribute('for', 'priority');
  priorityLabel.classList.add('label');
  priorityLabel.innerHTML = 'Priority';
  const controlDiv = document.createElement('div');
  controlDiv.classList.add('control');
  const selectDiv = document.createElement('div');
  selectDiv.classList.add('select');
  const priorityInput = document.createElement('select');
  priorityInput.id = 'priority';
  for (let i = 0; i < priorityOptions.length; i++) {
    const priorityOption = document.createElement('option');
    priorityOption.value = priorityOptions[i];
    priorityOption.text = priorityOptions[i];
    priorityInput.appendChild(priorityOption);
  }

  selectDiv.appendChild(priorityInput);
  controlDiv.appendChild(selectDiv);

  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(controlDiv);

  return priorityDiv;
};

const _createDueDateField = () => {
  const dueDateDiv = document.createElement('div');
  dueDateDiv.classList.add('field');
  const dueDateLabel = document.createElement('label');
  dueDateLabel.setAttribute('for', 'duedate');
  dueDateLabel.classList.add('label');
  dueDateLabel.innerHTML = 'Due date';
  const controlDiv = document.createElement('div');
  controlDiv.classList.add('control');
  const dateDiv = document.createElement('div');
  dateDiv.classList.add('date');
  const dueDateInput = document.createElement('input');
  dueDateInput.id = 'duedate';
  dueDateInput.setAttribute('type', 'date');
  dueDateInput.setAttribute('max', '9999-12-31');

  dateDiv.appendChild(dueDateInput);
  controlDiv.appendChild(dateDiv);

  dueDateDiv.appendChild(dueDateLabel);
  dueDateDiv.appendChild(controlDiv);

  return dueDateDiv;
};

const _createDescriptionField = () => {
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('field');
  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'description');
  descriptionLabel.classList.add('label');
  descriptionLabel.innerHTML = 'Description';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.id = 'description';
  descriptionInput.classList.add('textarea');

  descriptionDiv.appendChild(descriptionLabel);
  descriptionDiv.appendChild(descriptionInput);

  return descriptionDiv;
};

const _createBtn = (buttonText) => {
  const fieldDiv = document.createElement('div');
  fieldDiv.classList.add('field')
  const button = document.createElement('button');
  button.classList.add('button');
  button.innerHTML = buttonText;

  fieldDiv.appendChild(button);
  return fieldDiv;
}

const _createHiddenProjectField = (projectIndex) => {
  const hiddenField = document.createElement('input');
  hiddenField.setAttribute('type', 'hidden');
  hiddenField.value = projectIndex;
  hiddenField.id = 'project-index';

  return hiddenField;
}

export {
  displayTodoModal,
  displayNewTodoModal,
  displayNewProjectModal
};