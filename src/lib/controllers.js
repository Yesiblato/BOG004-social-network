import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from './firebase/firebase-imports.js';

export const fnCreateuser = (email , password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
        });
        return userCredential
      })
  }
