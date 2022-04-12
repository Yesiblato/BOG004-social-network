import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { timelinePage } from './views/timeline.js';

export const showChange = (route) => {
  const mainContainer = document.getElementById('showPages');
  mainContainer.innerHTML = '';
  switch (route) {
    case '':
      console.log('CASE "", login', window.location.hash);
      return mainContainer.appendChild(loginPage());
      break;
    case '#/registrate':
      console.log('REGISTRATE register', window.location.hash);
      return mainContainer.appendChild(registerPage());
      break;
    case '#/muro':
      console.log('MURO', window.location.hash);
      return mainContainer.appendChild(timelinePage());
      break;
    default:
      console.log('DEFAULT', window.location.hash);
      // console.log('el default');
      // console.log(window.location.hash);
      break;
  }
  // console.log(route);
};
