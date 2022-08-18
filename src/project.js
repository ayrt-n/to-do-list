const project = (name) => {
  const todoList = [];

  const addTodo = (todo) => {
    todoList.push(todo);
  };

  const removeTodo = (index) => {
    todoList.splice(index, 1);
  };

  const toggleTodoStatus = (index) => {
    const todo = todoList[index];
    todo.toggleStatus()
  }

  const editTodo = (index, title, description, dueDate, priority) => {
    const todo = todoList[index];
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
  };

  return { name, todoList, addTodo, removeTodo, toggleTodoStatus, editTodo };
};

export default project;