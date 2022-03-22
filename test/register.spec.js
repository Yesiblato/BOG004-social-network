import { registerPage } from '../src/lib/views/register.js';

// jest.mocks('../src/lib/__mocks__/firebase-imports.js');
describe('registerPage', () => {
  it('', () => {
    const result = registerPage();
    const email = result.querySelector('#email');
    const pass = result.querySelector('#passwordRegister');
    const name = result.querySelector('#name');
    const lastName = result.querySelector('#lastname');
    const user = result.querySelector('#user');

    email.value = '';
    pass.value = '';
    name.value = '';
    lastName.value = '';
    user.value = '';

    const btn = result.querySelector('btn-register');
    btn.dispatchEvent(new Event('click'));

    expect(alert).toBe('Todos los campos son obligatorios');
  });
});
