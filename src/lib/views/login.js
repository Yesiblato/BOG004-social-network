import { showChange } from '../router.js';
export const loginPage = () => {
  const viewLogin = ` 
    <div id ="container-login">
      <img src="img/logo.png" alt="logo">
      <h2 id="title1">Latam</h2>
      <h2 id="title2">Sin Frontera</h2>
      <form id="login-form">
        <input type="text" placeholder="Correo" id="mail">
        <input type="password" placeholder="Contraseña" id="password">
        <input type="button" class="btn-inciarSesion" placeholder="iniciar Sesion">
        <input type="button" class="btn-google" placeholder="iniciar Sesion con google">
        <a href="#/registrate"> ¿No tienes cuenta? Registrate </a>
      </form>
    </div>
    `;
  const container = document.createElement('div');
  container.setAttribute("class", "containerPrincipal")
  container.innerHTML = viewLogin;

  container.querySelector(".btn-inciarSesion").addEventListener("click", () => {
    showChange('#/muro');
     const mail = container.querySelector('#mail').value;
   const password = container.querySelector('#password').value;
   console.log(mail,password);
   history.pushState(null , ' ' , '#/muro')
  });
  
 
 return container;
};


// document.getElementById("btn-inciarSesion").addEventListener("click", dataLogin);
