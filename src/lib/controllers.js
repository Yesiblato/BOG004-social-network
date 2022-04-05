import { app } from './firebase/firebase.js';

import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, getFirestore, collection, addDoc, getDocs, deleteDoc, doc,
  getDoc, onSnapshot, updateDoc,
} from './firebase/firebase-imports.js';
// import { async } from 'regenerator-runtime';

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
  querySnapshot.forEach((item) => {
    console.log('item ', item);
    const data = item.data();
    const id = item.id;
    console.log(data);
    postList.push({ data, id });
  });
  // console.log('holaaaaaaa', postList);
  return postList;
};

// export const getPost = async () => {
//   const db = getFirestore();
//   await onSnapshot((collection(db, 'post')), (snapshot) => {
//     const postList = [];
//     snapshot.forEach((item) => {
//       console.log('item ', item);
//       const data = item.data();
//       const id = item.id;
//       console.log(data);
//       postList.push({ data, id });
//     });
//     console.log('PostList', postList);
//     return postList;
//   });
// };

// console.log('Salida getPost Copntroller', getPost());

// Eliminando post
export const deletePost = (id) => {
  const db = getFirestore();
  return deleteDoc(doc(db, 'post', id));
};

// Obteniendo un post
export const getAPost = (id) => {
  const db = getFirestore();
  return getDoc(doc(db, 'post', id));
};

export const updatePost = (id, newField) => {
  const db = getFirestore();
  updateDoc(doc(db, 'post', id), newField);
};

// Actualizacion de post en tiempo real
export const onGetPost = () => {
  const db = getFirestore();
  const posts = [];
  onSnapshot(collection(db, "post"), (querySnapshot) => {
    querySnapshot.forEach((item) => {
      posts.push(item.data());
    });
    // console.log("Current data: ", doc.data());
    // onSnapshot(collection(db, 'post'), callback);
  });
  return posts;
};
// // expot const onGetPost = onSnapshot(doc(db, "post"), (doc) => {
// //   console.log("Current data: ", doc.data());
