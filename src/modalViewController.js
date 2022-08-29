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

// Close modal on button click/submit
modalContent.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    modal.classList.remove('active');
  }
});

// Display more detail modal given a todo object
const displayTodoModal = (todo, projectIndex, todoIndex) => {
  modalContent.innerHTML = '';
  modalHeader.innerHTML = 'Todo details';
  const todoModal = _createTodoModal(todo);
  todoModal.setAttribute('project-index', projectIndex);
  todoModal.setAttribute('todo-index', todoIndex);
  modalContent.appendChild(todoModal);
  modal.classList.add('active');
};

const displayTodoFormModal = (modalTitle, todo = {}, projectIndex, todoIndex) => {
  modalContent.innerHTML = '';
  modalHeader.innerHTML = modalTitle;

  const todoForm = _createTodoForm(todo, projectIndex, todoIndex)
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

const _createTodoForm = (todo, projectIndex, todoIndex) => {
  const todoTitle = _createTitleField(todo.title);
  const todoPriority = _createPriorityField(todo.priority);
  const todoDueDate = _createDueDateField(todo.dueDate);
  const todoDescription = _createDescriptionField(todo.description);
  // If todo is empty, new object and create button for creating new todo
  // Otherwise, todo already exists and create button for editing todo
  const submitBtn = Object.keys(todo).length === 0 ? _createBtn('Add todo') : _createBtn('Save changes');

  const todoForm = document.createElement('form');
  todoForm.id = 'todo-form';
  todoForm.setAttribute('project-index', projectIndex);
  todoForm.setAttribute('todo-index', todoIndex);

  todoForm.appendChild(todoTitle);
  todoForm.appendChild(todoPriority);
  todoForm.appendChild(todoDueDate);
  todoForm.appendChild(todoDescription);
  todoForm.appendChild(submitBtn);

  return todoForm;
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

const _createFormFieldDiv = () => {
  const fieldDiv = document.createElement('div');
  fieldDiv.classList.add('field');

  return fieldDiv;
};

const _createFormLabel = (labelValue, forValue) => {
  const label = document.createElement('label');
  label.classList.add('label');
  label.setAttribute('for', forValue);
  label.innerHTML = labelValue;

  return label;
};

const _createControlDiv = () => {
  const controlDiv = document.createElement('div');
  controlDiv.classList.add('control');

  return controlDiv
}

const _createTitleField = (titleValue) => {
  const titleDiv = _createFormFieldDiv();
  const titleLabel = _createFormLabel('Title', 'title');

  const titleInput = document.createElement('input');
  titleInput.id = 'title';
  titleInput.setAttribute('type', 'text');
  titleInput.classList.add('input');

  // Set value if one was provided
  if (titleValue) { titleInput.value = titleValue; } 

  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);

  return titleDiv;
};

const _createPriorityField = (priorityValue) => {
  const priorityDiv = _createFormFieldDiv();
  const priorityLabel = _createFormLabel('Priority', 'priority');
  const controlDiv = _createControlDiv();

  const selectDiv = document.createElement('div');
  selectDiv.classList.add('select');

  const priorityInput = document.createElement('select');
  priorityInput.id = 'priority';
  const priorityOptions = ['Low', 'Medium', 'High'];
  for (let i = 0; i < priorityOptions.length; i++) {
    const priorityOption = document.createElement('option');
    priorityOption.value = priorityOptions[i];
    priorityOption.text = priorityOptions[i];
    priorityInput.appendChild(priorityOption);
  }

  if (priorityValue) { priorityInput.value = priorityValue; }

  selectDiv.appendChild(priorityInput);
  controlDiv.appendChild(selectDiv);

  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(controlDiv);

  return priorityDiv;
};

const _createDueDateField = (dueDateValue) => {
  const dueDateDiv = _createFormFieldDiv();
  const dueDateLabel = _createFormLabel('Due date', 'duedate');
  const controlDiv = _createControlDiv();

  const dateDiv = document.createElement('div');
  dateDiv.classList.add('date');

  const dueDateInput = document.createElement('input');
  dueDateInput.id = 'duedate';
  dueDateInput.setAttribute('type', 'date');
  dueDateInput.setAttribute('max', '9999-12-31');

  if (dueDateValue) { dueDateInput.value = dueDateValue; }

  dateDiv.appendChild(dueDateInput);
  controlDiv.appendChild(dateDiv);

  dueDateDiv.appendChild(dueDateLabel);
  dueDateDiv.appendChild(controlDiv);

  return dueDateDiv;
};

const _createDescriptionField = (descriptionValue) => {
  const descriptionDiv = _createFormFieldDiv();
  const descriptionLabel = _createFormLabel('Description', 'description');
  const descriptionInput = document.createElement('textarea');
  descriptionInput.id = 'description';
  descriptionInput.classList.add('textarea');

  if (descriptionValue) { descriptionInput.value = descriptionValue; }

  descriptionDiv.appendChild(descriptionLabel);
  descriptionDiv.appendChild(descriptionInput);

  return descriptionDiv;
};

const _createBtn = (buttonText) => {
  const fieldDiv = _createFormFieldDiv();
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
  hiddenField.setAttribute('project-index', projectIndex);

  return hiddenField;
}

export {
  displayTodoModal,
  displayNewProjectModal,
  displayTodoFormModal
};

// displayEditTodoModal({title: 'Hi', priority: 'Medium', description: 'Hi again'}, 1);