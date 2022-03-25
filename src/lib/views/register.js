import { createUser } from '../firebase/fnFirebase.js';
import { showChange } from '../router.js';

export const registerPage = () => {
  const viewRegister = ` 
      <div id="containerBack">
        <img class="back" src="img/back.png" alt="atras"> 
      </div>
      <div class="container-register">
        <img src="img/logo.png" alt="logo">
        <h2 id="title1" >Latam</h2>
        <h2 id="title2">Sin Frontera</h2>
        <input type="text" placeholder="Correo electrónico" id="email">
        <input type="text" placeholder="Nombre" id="name">
        <input type="text" placeholder="Apellido" id="lastname">
        <input type="text" placeholder="Usuario" id="user">
        <input type="password" name="" placeholder="Contraseña" id="passwordRegister">
        <p id = "noteError"></p>
        <button type="button" id="btn-register">Registrate</button>
      </div>
        `;
  const container = document.createElement('div');
  container.setAttribute('class', 'containerPrincipal');
  container.innerHTML = viewRegister;

  const back = container.querySelector('.back');
  back.addEventListener('click', () => {
    showChange('');
    window.history.back();
  });

  const botonRegistrar = container.querySelector('#btn-register');
  botonRegistrar.addEventListener('click', () => {
    const email = container.querySelector('#email').value;
    const password = container.querySelector('#passwordRegister').value;
    const name = container.querySelector('#name').value;
    const lastname = container.querySelector('#lastname').value;
    const userName = container.querySelector('#user').value;
    if (email === '' || password === '' || name === '' || lastname === '' || userName === '') {
      const prueba = container.querySelector('#noteError');
      prueba.innerHTML = 'Todos los campos son obligatorios';
      // alert('Todos los campos son obligatorios');
    } else {
      createUser(email, password, name, lastname);
    }
    // window.name = name;
    // window.lastname = lastname;
  });
  return container;
};
