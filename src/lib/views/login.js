import { signIn, signInGoogle } from '../firebase/fnFirebase.js';
// import { showChange } from '../router.js';

export const loginPage = () => {
  const viewLogin = ` 
    <div id ="container-login">
      <img src="img/logo.png" alt="logo">
      <h2 id="title1">Latam</h2>
      <h2 id="title2">Sin Frontera</h2>
      <form id="login-form">
        <input type="text" placeholder="Correo" id="mail">
        <input type="password" placeholder="Contraseña" id="password">
        <p id = "containerErrorP"> </p>
        <button class="btn-inciarSesion">iniciar Sesion</button>
        <button class="btn-google">iniciar Sesion con google</button>
        <a href="#/registrate"> ¿No tienes cuenta? Registrate </a>
      </form>
    </div>
    `;
  const container = document.createElement('div');
  container.setAttribute('class', 'containerPrincipal');
  container.innerHTML = viewLogin;

  container.querySelector('.btn-inciarSesion').addEventListener('click', (e) => {
    e.preventDefault();
    const email = container.querySelector('#mail').value;
    const password = container.querySelector('#password').value;
    console.log(email, password);
    if (email === '' || password === '') {
      const parrafoError = container.querySelector('#containerErrorP');
      parrafoError.innerHTML = 'Todos los campos son obligatorios';
      document.getElementById('container-login').reset();
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

// document.getElementById("btn-inciarSesion").addEventListener("click", dataLogin);
