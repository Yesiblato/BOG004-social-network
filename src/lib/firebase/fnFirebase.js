/* eslint-disable import/no-cycle */
import { fnCreateuser, fnSignIn, fnSingGoogle } from '../controllers.js';
import { showChange } from '../router.js';
// import { mostrarErrores } from '../../main.js';

// Creacion de un usuarios.
export const createUser = (email, password, name, lastName) => {
  fnCreateuser(email, password)
    .then(() => {
      const viewModal = `
      <div class='modal-container'>
        <div class='modal modal-close'>
          <p class='close'>x</p>.
          <div class='containerImg'>
            <img src="img/logo.png" alt="logo">
          </div>  
          <h2 id="title1" >Latam</h2>
          <h2 id="title2">Sin Fronteras</h2>
          <h3>¡Gracias ${name} ${lastName} por unirte a Latam sin fronteras!</h3>
          <h3>Confirma tu correo electrónico</h3>
          <h3>Acabamos de enviarte un mensaje de confirmación a ${email}</h3>
        </div> 
      </div>
      `;
      const bringContainer = document.querySelector('.containerPrincipal');
      bringContainer.innerHTML = viewModal;
      const close = bringContainer.querySelector('.close');
      const modal = bringContainer.querySelector('.modal');
      const modalC = bringContainer.querySelector('.modal-container');
      modalC.style.opacity = '1';
      modalC.style.visibility = 'visible';
      modal.classList.toggle('modal-close');
      close.addEventListener('click', () => {
        modal.classList.toggle('modal-close');
        showChange('#/muro');
      });
      // alert(`Hola ${name} ${lastName} bienvenido a Latam sin fronteras, confirma tu correo.`);
      // video de modal voy en minuto 19 https://www.youtube.com/watch?v=c3MbFWr-NT4
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      const mensajeError = document.querySelector('#noteError');
      if (errorCode === 'auth/invalid-email') {
        mensajeError.innerText = 'El correo no es válido';
      } else if (errorCode === 'auth/weak-password') {
        mensajeError.innerText = 'Su contraseña es debil';
      } else if (errorCode === 'auth/email-already-in-use') {
        mensajeError.innerText = 'El correo ya esta en uso';
      }
    });
};

// Inicio de Sesion con Email y  Contraseña.
export const signIn = (email, password) => {
  fnSignIn(email, password)
    .then(() => {
      showChange('#/muro');
      // window.history.pushState(null, ' ', '#/muro');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      const mensajeError = document.querySelector('#containerErrorP');
      if (errorCode === 'auth/invalid-email') {
        mensajeError.innerText = 'La dirección de correo electrónico no es válida';
      } else if (errorCode === 'auth/user-disabled') {
        mensajeError.innerText = 'El usuario correspondiente al correo electrónico dado ha sido deshabilitado';
      } else if (errorCode === 'auth/user-not-found') {
        mensajeError.innerText = 'No hay un usuario correspondiente al correo electrónico dado';
      } else if (errorCode === 'auth/wrong-password') {
        mensajeError.innerText = 'La contraseña no es válida';
      }
    });
};

// Inicio de Sesion con Google.
export const signInGoogle = () => {
  fnSingGoogle()
    .then(() => {
      window.location = '#/muro';
      // showChange('#/muro')
    // ...
    }).catch(() => {

    });
};

