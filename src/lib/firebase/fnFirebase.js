import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from './firebase-imports.js';

// Creacion de un user
export const crearUsuario = (email, password, name, lastName) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      alert(`Hola ${name} ${lastName} bienvenido a Latam sin fronteras, confirma tu correo.`);
      sendEmailVerification(auth.currentUser)
        .then(() => {
        // Email verification sent!
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      if (errorCode === 'auth/invalid-email') {
        alert('El correo no es válido');
      } else if (errorCode === 'auth/weak-password') {
        alert('Su contraseña es débil');
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('El correo ya esta en uso');
      }
    });
};

// Enviar mensaje de verificación al usuario
