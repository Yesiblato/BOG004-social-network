import { showChange } from '../../src/lib/router.js';
import { registerPage } from '../../src/lib/views/register.js';

jest.mock('../../src/lib/firebase/firebase-imports.js');

describe('registerPage', () => {
  it('Comprueba que los campos estén llenos correctamente', () => {
    const result = registerPage();
    const email = result.querySelector('#email');
    const pass = result.querySelector('#passwordRegister');
    const name = result.querySelector('#name');
    const lastName = result.querySelector('#lastname');
    const user = result.querySelector('#user');
    const noteError = result.querySelector('#noteError');

    email.value = 'hola';
    pass.value = '';
    name.value = '';
    lastName.value = '';
    user.value = '';
    const btn = result.querySelector('#btn-register');
    btn.dispatchEvent(new Event('click'));

    expect(noteError.textContent).toBe('Todos los campos son obligatorios');
  });
});

describe('arrow back ', () => {
  it('comprueba que nos regresa a la pagina de login', () => {
    const result = registerPage();
    const back = result.querySelector('.back');
    document.body.innerHTML = '<section id="showPages"> </section>';
    const mainContainer = document.querySelector('#showPages');
    back.dispatchEvent(new Event('click'));
    const htmlTemplate = `
    <div id="container-login">
      <div class="mediaLogin">
        <img src="img/logo.png" alt="logo">
        <h2 id="title1">Latam</h2>
        <h2 id="title2">Sin Fronteras</h2>
      </div>
      <form id="login-form">
        <input type="text" placeholder="Correo" id="mail">
        <input type="password" placeholder="Contraseña" id="password">
        <p id="containerErrorP"> </p>
        <button class="btn-inciarSesion">iniciar Sesion</button>
        <button class="btn-google">iniciar Sesion con google</button>
        <a href="#/registrate"> ¿No tienes cuenta? Registrate </a>
      </form>
    </div>
    `;
    expect(showChange('').innerHTML).toEqual(htmlTemplate);
  });
});
