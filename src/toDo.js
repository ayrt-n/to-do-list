function Todo(title, description, dueDate, priority, status = 0) {
  this.title = title;
  this.description = description;
  // Set due date if provided, otherwise set to N/A
  this.dueDate = dueDate || 'N/A'; 
  this.priority = priority;
  // Completed status of the todo - incomplete (0) is default value for new todo, completed (1)
  this.status = status;
}

// toggleStatus switches todo from incomplete (0) to complete (1) and vice versa
Todo.prototype.toggleStatus = function() {
  this.status = this.status === 0 ? 1 : 0;
}

export default Todo;