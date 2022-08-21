const modal = document.getElementById('modal');
const modalCard = document.getElementsByClassName('modal-card')[0];
const modalContent = document.getElementsByClassName('modal-content')[0];
const closeModalBtn = document.getElementById('close-modal');

const viewTodoModal = (todo) => {
  modalContent.innerHTML = '';
  createTodoViewModal(todo);
  modal.style.display = 'block';
};

// Create more details modal and append to modal content div
const createTodoViewModal = (todo) => {
  modalContent.innerHTML = '';

  const header = document.createElement('h1');
  header.innerHTML = todo.title

  const priority = createModalTextSection('Priority', todo.priority);
  const dueDate = createModalTextSection('Due date', todo.dueDate);
  const description = createModalTextSection('Description', todo.description);

  modalContent.appendChild(header);
  modalContent.appendChild(priority);
  modalContent.appendChild(dueDate);
  modalContent.appendChild(description);
};

// Create a standard modal text element with title and text content
const createModalTextSection = (title, content) => {
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

export default viewTodoModal;