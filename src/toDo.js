const todo = (title, description, dueDate, priority) => {
  // Return todo proprties
  // Status of zero is incomplete, status of one is complete
  return { title, description, dueDate, priority, status: 0 };
}

export default todo;