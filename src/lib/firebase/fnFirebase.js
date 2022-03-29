/* eslint-disable import/no-cycle */
import { fnCreateuser, fnSignIn } from '../controllers.js';
import {
  GoogleAuthProvider, signInWithPopup,
} from './firebase-imports.js';
import { showChange } from '../router.js';
// import { mostrarErrores } from '../../main.js';

// Creacion de un usuarios.
export const createUser = (email, password, name, lastName) => {
  fnCreateuser(email, password)
    .then(() => {
      const viewModal = `
      <div class='modal-container'>
        <div class='modal modal-close'>
          <p class='close'>x</p>
          <img src="img/logo.png" alt="logo">
          <h2 id="title1" >Latam</h2>
          <h2 id="title2">Sin Frontera</h2>
          <h3>¡Gracias ${name} por unirte a Latam sin fronteras!</h3>
          <h3>Confirma tu correo electrónico</h3>
          <h3>Acabamos de enviarte un mensaje de confirmación a ${lastName}</h3>
        </div> 
      </div>
      `;
      const bringContainer = document.querySelector('.containerPrincipal');
      bringContainer.innerHTML = viewModal;
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
      console.log('error de login' + mensajeError);
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
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  console.log('provider: ', provider);
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(`El usuario ${user} se ha autenticado!!!`);
      console.log('credenciales: ', credential, token);
      window.location = '#/muro';
      // showChange('#/muro')
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // eslint-disable-next-line no-console
      console.log(error);
      console.log('primero ', errorCode, 'segundo ', errorMessage);
    });
};
