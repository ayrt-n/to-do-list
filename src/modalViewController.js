const modal = document.getElementById('modal');
const modalCard = document.getElementsByClassName('modal-card')[0];
const modalContent = document.getElementsByClassName('modal-content')[0];
const closeModalBtn = document.getElementById('close-modal');

// Close modal if window clicked
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
}

// Close modal if close button is clicked
closeModalBtn.onclick = () => {
  modal.style.display = 'none';
}

// Display more detail modal given a todo object
const displayTodoModal = (todo) => {
  modalContent.innerHTML = '';
  const todoModal = _createTodoModal(todo);
  modalContent.appendChild(todoModal);
  modal.style.display = 'block';
};

// Display new todo form in a modal
const displayNewTodoModal = () => {
  modalContent.innerHTML = '';
  const todoForm = _createNewTodoModal();
  modalContent.appendChild(todoForm);
  modal.style.display = 'block';
};

const _createNewTodoModal = () => {
  const todoTitle = _createTitleField();
  const todoPriority = _createPriorityField();
  const todoDueDate = _createDueDateField();
  const todoDescription = _createDescriptionField();

  const form = document.createElement('form')
  form.id = 'new-todo-form';

  form.appendChild(todoTitle);
  form.appendChild(todoPriority);
  form.appendChild(todoDueDate);
  form.appendChild(todoDescription);

  return form;
};

// Create more details modal and append to modal content div
const _createTodoModal = (todo) => {
  const header = document.createElement('h1');
  header.innerHTML = todo.title

  const priority = _createModalTextSection('Priority', todo.priority);
  const dueDate = _createModalTextSection('Due date', todo.dueDate);
  const description = _createModalTextSection('Description', todo.description);

  const div = document.createElement('div');

  div.appendChild(header);
  div.appendChild(priority);
  div.appendChild(dueDate);
  div.appendChild(description);

  return div;
};

// Create a standard modal text element with title and text content
const _createModalTextSection = (title, content) => {
  const div = document.createElement('div');

  const sectionTitle = document.createElement('p');
  sectionTitle.classList.add('title');
  sectionTitle.innerHTML = title;

  const sectionContent = document.createElement('p');
  sectionContent.innerHTML = content

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
  const priorityInput = document.createElement('select');
  priorityInput.id = 'priority';
  priorityInput.classList.add('select');
  for (let i = 0; i < priorityOptions.length; i++) {
    const priorityOption = document.createElement('option');
    priorityOption.value = priorityOptions[i];
    priorityOption.text = priorityOptions[i];
    priorityInput.appendChild(priorityOption);
  }

  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(priorityInput);

  return priorityDiv;
};

const _createDueDateField = () => {
  const dueDateDiv = document.createElement('div');
  dueDateDiv.classList.add('field');
  const dueDateLabel = document.createElement('label');
  dueDateLabel.setAttribute('for', 'duedate');
  dueDateLabel.classList.add('label');
  dueDateLabel.innerHTML = 'Due date';
  const dueDateInput = document.createElement('input');
  dueDateInput.id = 'duedate';
  dueDateInput.setAttribute('type', 'date');

  dueDateDiv.appendChild(dueDateLabel);
  dueDateDiv.appendChild(dueDateInput);

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

export {
  displayTodoModal,
  displayNewTodoModal,
};