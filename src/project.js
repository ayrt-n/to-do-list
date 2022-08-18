const project = (name) => {
  const todoList = [];

  const addTodo = (todo) => {
    todoList.push(todo);
  };

  const removeAtIndex = (index) => {
    todoList.splice(index, 1);
  };

  return { todoList, addTodo, removeAtIndex };
};