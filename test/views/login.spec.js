import { loginPage } from '../../src/lib/views/login.js';

jest.mock('../../src/lib/firebase/firebase-imports.js');

describe('loginPage', () => {
  it('Comprueba que los campos estén llenos correctamente', () => {
    const result = loginPage();
    const email = result.querySelector('#mail');
    const pass = result.querySelector('#password');
    const parrafoError = result.querySelector('#containerErrorP');

    email.value = 'hola';
    pass.value = '';

    const btn = result.querySelector('.btn-inciarSesion');
    btn.dispatchEvent(new Event('click'));

    expect(parrafoError.textContent).toBe('Todos los campos son obligatorios');
  });
});
