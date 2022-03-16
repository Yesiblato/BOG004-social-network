import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

// Creacion de un user
// const auth = getAuth();
export const crearUsuario = (email, password) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      //console.log(user);
      sendEmailVerification(auth.currentUser)
        .then(() => {
        // Email verification sent!
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      if (errorCode == 'auth/invalid-email') {
        alert('El correo no es válido');
      } else if (errorCode == 'auth/weak-password') {
        alert('Su contraseña es débil');
      } else if (errorCode == 'auth/email-already-in-use') {
        alert('El correo ya esta en uso');
      }
    });
};

// Enviar mensaje de verificación al usuario
