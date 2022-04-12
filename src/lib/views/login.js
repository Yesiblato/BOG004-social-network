/* eslint-disable import/no-cycle */
import { signIn, signInGoogle } from '../firebase/fnFirebase.js';
// import { showChange } from '../router.js';

export const loginPage = () => {
  const viewLogin = ` 
  <div id ="container-login">
      <div class="mediaLogin">
        <img src="img/logo.png" alt="logo">
        <h2 id="title1">Latam</h2>
        <h2 id="title2">Sin Fronteras</h2>
      </div>
      <form id="login-form">
        <input type="text" placeholder="Correo" id="mail">
        <input type="password" placeholder="Contraseña" id="password">
        <p id= "containerErrorP"> </p>
        <button class="btn-inciarSesion">iniciar Sesion</button>
        <button class="btn-google">iniciar Sesion con google</button>
        <a href="#/registrate"> ¿No tienes cuenta? Registrate </a>
      </form>
  </div>
  `;
  const container = document.createElement('div');
  container.setAttribute('class', 'containerPrincipal');
  container.innerHTML = viewLogin;

  const inputEmailLogin = container.querySelector('#mail');
  inputEmailLogin.addEventListener('change', () => {
    container.querySelector('#containerErrorP').innerText = '';
  });

  container.querySelector('.btn-inciarSesion').addEventListener('click', (e) => {
    e.preventDefault();
    const email = container.querySelector('#mail').value;
    const password = container.querySelector('#password').value;
    console.log(email, password);
    if (email === '' || password === '') {
      const parrafoError = container.querySelector('#containerErrorP');
      parrafoError.innerHTML = 'Todos los campos son obligatorios';
    } else {
      signIn(email, password);
    }
  });

  container.querySelector('.btn-google').addEventListener('click', (e) => {
    console.log('btn google');
    e.preventDefault();
    signInGoogle();
  });

  return container;
};
