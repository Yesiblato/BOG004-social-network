import { showChange } from './lib/router.js';

const beginning = () => {
  showChange(window.location.hash);
  window.addEventListener('hashchange', () => showChange(window.location.hash));
};
window.addEventListener('load', beginning());

export const mostrarErrores = (errorCode) => {
  const mensajeError = document.querySelector("#noteError");
  if (errorCode === 'auth/invalid-email') {
    mensajeError.innerText='El correo no es válido';
  
  } else if (errorCode === 'auth/weak-password') {
    mensajeError.innerText='su contraseña es debil';
  
  } else if (errorCode === 'auth/email-already-in-use') {
    mensajeError.innerText='el correo ya esta en uso';
    
  }
}

// const back = document.querySelector('.back');
// back.addEventListener('click', () => {
//   // e.preventDefault();
//   showChange('');
//   window.history.back();
// });
