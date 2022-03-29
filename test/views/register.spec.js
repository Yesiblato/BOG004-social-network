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
