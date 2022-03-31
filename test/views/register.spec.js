import { showChange } from '../../src/lib/router.js';
import { registerPage } from '../../src/lib/views/register.js';
import { loginPage }
 from '../../src/lib/views/login.js'
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
    const mainContainer = document.querySelector('#showPages')
    loginPage
    back.dispatchEvent(new Event('click'));
    const htmlTemplate = `
    <div class="containerPrincipal">.
    <div id="container-login">
      <div class="mediaLogin">
        <img alt="logo" src="img/logo.png" />
        <h2 id="title1">Latam</h2>
        <h2 id="title2">Sin Fronteras</h2>
      </div>
      <form id="login-form">
        <input id="mail" placeholder="Correo" type="text" />
        <input id="password" placeholder="Contraseña" type="password" />
        <p id="containerErrorP"> </p>
        <button class="btn-inciarSesion">iniciar Sesion</button>
        <button class="btn-google">iniciar Sesion con google</button>
        <a href="#/registrate"> ¿No tienes cuenta? Registrate </a>
      </form>
    </div>
    </div>
    `;
    expect(showChange('')).toEqual(htmlTemplate)
  });
});