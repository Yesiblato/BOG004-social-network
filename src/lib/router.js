import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { timelinePage } from './views/timeline.js';

export const showChange = (route) => {
  const mainContainer = document.getElementById('showPages');
  mainContainer.innerHTML = '';
  switch (route) {
    case '':
      mainContainer.appendChild(loginPage());
      // console.log(window.location.hash);
      break;
    case '#/registrate':
      mainContainer.appendChild(registerPage());
      // console.log(window.location.hash);
      break;
    case '#/muro':
      mainContainer.appendChild(timelinePage());
      break;
    default:

      // console.log('el default');
      // console.log(window.location.hash);
      break;
  }
  // console.log(route);
};
