import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, getFirestore, collection, addDoc, getDocs,
} from './firebase/firebase-imports.js';

// Creación de usuario
export const fnCreateuser = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
        });
      return userCredential;
    });
};

// Inicio de sesión con correo y contraseña
export const fnSignIn = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return userCredential;
    });
};

// Inicio de sesión con Google
export const fnSingGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  console.log('provider: ', provider);
  return signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(`El usuario ${user} se ha autenticado!!!`);
      console.log('credenciales: ', credential, token);
      return result;
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // eslint-disable-next-line no-console
      console.log(error);
      console.log('primero ', errorCode, 'segundo ', errorMessage);
    });
};

export const postPage = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, 'latam'));
  // let postList = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // postList.push(data);
    const agregar = addDoc(`${doc.id} => ${data.usuario} ${data.post}`);
    console.log(agregar);
  });
  //console.log(postList)
  return postList;
}
