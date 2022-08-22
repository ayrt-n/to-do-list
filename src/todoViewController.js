// Toggle radio button styling to select/deselect
const toggleTodoButton = (target) => {
  target.classList.toggle('selected');
};

// Remove todo from todo list
const removeTodoItem = (target) => {
  target.parentElement.remove();
};

export {
  toggleTodoButton,
  removeTodoItem
}