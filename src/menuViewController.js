import inboxSVG from './images/inbox.svg';
import agendaSVG from './images/agenda.svg';
import calendarSVG from './images/inbox.svg';
import chevronSVG from './images/chevron-down.svg';
import circleSVG from './images/circle.svg';
import plusSVG from './images/plus.svg';

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('is-hidden');
});

menu.addEventListener('click', (e) => {
  const menuItem = e.target.closest('.menu-item');

  if (menuItem) {
    menu.classList.add('is-hidden');
  }
});

const loadMenu = (projectsObject) => {
  menu.innerHTML = ''; 

  const inboxBtn = createMenuButton('Inbox', inboxSVG);
  inboxBtn.classList.add('selected');
  inboxBtn.setAttribute('data-action', 'loadProject');
  inboxBtn.setAttribute('project-index', 0);

  const projectsDiv = document.createElement('div');
  projectsDiv.classList.add('projects');
  const projectsBtn = createMenuButton('Projects', agendaSVG);
  projectsBtn.setAttribute('data-action', 'loadAllProjects');
  projectsDiv.appendChild(projectsBtn);
  
  for (let i = 1; i < projectsObject.length; i++) {
    const projectBtn = createMenuButton(projectsObject[i].name, circleSVG);
    projectBtn.setAttribute('data-action', 'loadProject');
    projectBtn.setAttribute('project-index', i)
    projectBtn.classList.add('sub-item');
    projectsDiv.appendChild(projectBtn);
  }

  const newProjectBtn = createMenuButton('Add project', plusSVG);
  newProjectBtn.setAttribute('data-action', 'displayNewProjectModal');
  projectsDiv.appendChild(newProjectBtn);

  menu.appendChild(inboxBtn);
  menu.appendChild(projectsDiv);
};

// Toggles which menu item is displayed as selected. Should receive the target menu item element as input
const toggleMenuSelect = (menuItem) => {
  // Remove select from the previously selected element
  const prevSelect = document.querySelector('.menu-item.selected');
  if (prevSelect) { prevSelect.classList.remove('selected'); }

  // Toggle menu item selected
  menuItem.classList.add('selected');
};

const createMenuButton = (text, icon) => {
  const menuItem = document.createElement('div');
  menuItem.classList.add('menu-item');
  const menuIcon = document.createElement('img');
  menuIcon.src = icon;
  menuIcon.classList.add('small-icon');
  const menuText = document.createElement('p');
  menuText.innerHTML = text;

  menuItem.appendChild(menuIcon);
  menuItem.appendChild(menuText);

  return menuItem;
};

export {
  loadMenu,
  toggleMenuSelect
};