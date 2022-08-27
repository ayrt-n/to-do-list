import project from "./project";
import Todo from "./todo";

const loadProjectsFromLocalStorage = () => {
  let result;
  const localProjects = getObject('projects');

  if (localProjects) {
    // Turn the parsed JSON projects object into a array of projects and todos
    result = createProjects(localProjects);
  } else {
    // If no projects saved in local storage, create a new projects array
    result = createNewProjectsObject();
  }

  return result;
};

// Iterate through the project attributes saved in localStorage and rebuild the project array
// Should receive an array of project attributes in string form and will return array of project objects
const createProjects = (projectsObject) => {
  let projects = [];

  for (let i = 0; i < projectsObject.length; i++) {
    projects.push(createProject(projectsObject[i]));
  }

  return projects;
};

// Unable to store project methods in localStorage so need to recreate each project using the attributes
// saved in localStorage and return the new project object 
const createProject = (projectObject) => {
  const projectTmp = project(projectObject.name);
  const todosTmp = createTodoList(projectObject.todoList);
  projectTmp.addTodoList(todosTmp);

  return projectTmp;
};

// Unable to store todo methods in localStorage so need to recreate each todo using the attributes
// saved in localStorage and return the new todo object
const createTodoList = (todoList) => {
  const todoListTmp = [];

  for (let i = 0; i < todoList.length; i++) {
    const todoItem = new Todo(todoList[i].title,
                              todoList[i].description,
                              todoList[i].dueDate,
                              todoList[i].priority,
                              todoList[i].status);
    todoListTmp.push(todoItem);
  }

  return todoListTmp
};

// Creates and returns a new projects array with empty default projects
const createNewProjectsObject = () => {
  let projects = [];
  projects.push(project('Inbox'));
  projects.push(project('Personal'));
  projects.push(project('Work'));

  return projects;
}

// Save object to localStorage (requires object to be transformed to string)
const setObject = (key, object) => {
  const objString = JSON.stringify(object);
  localStorage.setItem(key, objString);
};

// Retrieve object from localStorage (object must be parsed once loaded from localStorage)
const getObject = (key) => {
  const objString = localStorage.getItem(key);
  return objString && JSON.parse(objString);
};

export {
  loadProjectsFromLocalStorage,
  getObject,
  setObject
};