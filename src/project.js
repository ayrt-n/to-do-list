const project = (name) => {
  const todoList = [];

  const addTodo = (todo) => {
    todoList.push(todo);
  };

  const addTodoList = (todoArray) => {
    for (let i = 0; i < todoArray.length; i++) {
      addTodo(todoArray[i]);
    }
  }

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

  const getTodo = (index) => {
    return todoList[index];
  };

  return { name, todoList, addTodo, addTodoList, removeTodo, toggleTodoStatus, editTodo, getTodo };
};

export default project;