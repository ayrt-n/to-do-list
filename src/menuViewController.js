import inboxSVG from './images/inbox.svg';
import calendarSVG from './images/inbox.svg';
import chevronSVG from './images/chevron-down.svg';
import circleSVG from './images/circle.svg';

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('is-hidden');
});

const loadMenu = (projectsObject) => {
  const inboxBtn = createMenuButton('Inbox', inboxSVG);
  inboxBtn.classList.add('selected');
  inboxBtn.setAttribute('project-index', 0);

  const projectsDiv = document.createElement('div');
  projectsDiv.classList.add('projects');
  const projectsBtn = createMenuButton('Projects', chevronSVG);
  projectsDiv.appendChild(projectsBtn);
  
  for (let i = 1; i < projectsObject.length; i++) {
    const projectBtn = createMenuButton(projectsObject[i].name, circleSVG);
    projectBtn.setAttribute('project-index', i)
    projectBtn.classList.add('sub-item');
    projectsDiv.appendChild(projectBtn);
  }

  menu.appendChild(inboxBtn);
  menu.appendChild(projectsDiv);
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
  loadMenu
};