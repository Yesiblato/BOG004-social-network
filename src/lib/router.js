//import { page } from "./views/index.js"; 
import {registerPage} from "../lib/views/register.js"
import {loginPage} from "../lib/views/login.js"

export const showChange = (route) => {
  const mainContainer = document.getElementById("showPages")
  mainContainer.innerHTML= "";
  switch (route) {
    case "#/": {return mainContainer.appendChild(loginPage())}
    case "#/registrate": {return mainContainer.appendChild(registerPage())}
      break;
  
    default:
      break;
  }
  //console.log(route);
};
