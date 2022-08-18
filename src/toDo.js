const todo = (title, description, dueDate, priority) => {
  let status = 0;

  const getStatus = () => {
    return status;
  };

  const toggleStatus = () => {
    status = status === 0 ? 1 : 0;
  };

  // Return todo proprties
  // Status of zero is incomplete, status of one is complete
  return { title, description, dueDate, priority, getStatus, toggleStatus };
}

export default todo;