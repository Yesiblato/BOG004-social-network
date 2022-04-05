import { app } from './firebase/firebase.js';

import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, getFirestore, collection, addDoc, getDocs, deleteDoc, doc,
  getDoc,
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

// Creacion de post
export const postPage = async (post) => {
  const db = getFirestore();
  const collectionPost = await addDoc(collection(db, 'post'), { post });
  return collectionPost;
};

// Obtener el post de la base de datos
export const getPost = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, 'post'));
  const postList = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    console.log(data);
    postList.push({ data, id });
  });
  console.log('holaaaaaaa', postList);
  return postList;
};

// Eliminando post
export const deletePost = (id) => {
  const db = getFirestore();
  deleteDoc(doc(db, 'post', id));
};

//Obteniendo un post
export const getAPost = (id) => {
  const db = getFirestore();
  getDoc(doc(db, 'post', id));
};

// // Actualizacion de post en tiempo real
// export const onGetP, ost = () => {
//   const db = getFirestore();
//   const prueba = onSnapshot(collection(db, "post"), (doc) => {
//     // console.log("Current data: ", doc.data());
//   // onSnapshot(collection(db, 'post'), callback);
//   });
// };
// // expot const onGetPost = onSnapshot(doc(db, "post"), (doc) => {
// //   console.log("Current data: ", doc.data());
