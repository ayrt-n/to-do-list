const project = (name) => {
  const todoList = [];

  const addTodo = (todo) => {
    todoList.push(todo);
  };

  const removeAtIndex = (index) => {
    todoList.splice(index, 1);
  };

  return { name, todoList, addTodo, removeAtIndex };
};

export default project;