/* eslint-disable import/no-cycle */
import { createUser } from '../firebase/fnFirebase.js';
import { showChange } from '../router.js';

export const registerPage = () => {
  const viewRegister = ` 
      <div id="containerBack">
        <img class="back" src="img/back.png" alt="atras"> 
      </div>
      <div class="container-register">
        <div class="mediaRegister">
          <img src="img/logo.png" alt="logo">
          <h2 id="title1" >Latam</h2>
          <h2 id="title2">Sin Fronteras</h2>
        </div>
        <div class="formRegister">
        <input type="text" placeholder="Correo electrónico" id="email" class = "input-register" >
        <input type="text" placeholder="Nombre" id="name" class = "input-register" >
        <input type="text" placeholder="Apellido" id="lastname" class = "input-register" >
        <input type="text" placeholder="Usuario" id="user" class = "input-register" >
        <input type="password" name="" placeholder="Contraseña" id="passwordRegister" class = "input-register" >
        <p id = "noteError"></p>
        <button type="button" id="btn-register">Registrate</button>
        </div>
      </div>
        `;
  const container = document.createElement('div');
  container.setAttribute('class', 'containerPrincipal');
  container.innerHTML = viewRegister;

  const inputEmail = container.querySelector('#email');
  inputEmail.addEventListener('change', () => {
    container.querySelector('#noteError').innerText = '';
  });

  const back = container.querySelector('.back');
  back.addEventListener('click', () => {
    // showChange('');
    // window.history.back();
    window.location.href = '';
  });

  const botonRegistrar = container.querySelector('#btn-register');
  botonRegistrar.addEventListener('click', () => {
    const email = container.querySelector('#email').value;
    const password = container.querySelector('#passwordRegister').value;
    const name = container.querySelector('#name').value;
    const lastname = container.querySelector('#lastname').value;
    const userName = container.querySelector('#user').value;
    if (email === '' || password === '' || name === '' || lastname === '' || userName === '') {
      const noteError = container.querySelector('#noteError');
      noteError.innerHTML = 'Todos los campos son obligatorios';
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      createUser(email, password, name, lastname);
    }
    // window.name = name;
    // window.lastname = lastname;
  });
  return container;
};
