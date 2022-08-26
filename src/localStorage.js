import project from "./project";
import todo from "./todo";

const loadProjectsFromLocalStorage = () => {
  let result;
  const localProjects = getObject('projects');

  if (localProjects) {
    // Turn the parsed JSON projects object into a fully functioning list of projects with working functions
    result = createProjects(localProjects);
  } else {
    // If no projects saved in local storage, create a new projects object and return
    result = createNewProjectsObject();
  }

  return result;
};

const createProjects = (projectsObject) => {
  let projects = {};

  for (let project in projectsObject) {
    projects[project] = createProject(projectsObject[project]);
  }

  return projects;
};

const createProject = (projectObject) => {
  const projectTmp = project(projectObject.name);
  const todosTmp = createTodoList(projectObject.todoList);
  projectTmp.addTodoList(todosTmp);

  return projectTmp;
};

const createTodoList = (todoList) => {
  const todoListTmp = [];

  for (let i = 0; i < todoList.length; i++) {
    const todoItem = todo(todoList[i].title, todoList[i].description, todoList[i].dueDate, todoList[i].priority);
    todoListTmp.push(todoItem);
  }

  return todoListTmp
};

const createNewProjectsObject = () => {
  let projects = {};
  projects['inbox'] = project('Inbox');
  projects['personal'] = project('Personal');
  projects['work'] = project('Work');

  return projects;
}

const setObject = (key, object) => {
  const objString = JSON.stringify(object);
  localStorage.setItem(key, objString);
};

const getObject = (key) => {
  const objString = localStorage.getItem(key);
  return objString && JSON.parse(objString);
};

export {
  loadProjectsFromLocalStorage,
  getObject,
  setObject
};