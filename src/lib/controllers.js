import { app } from './firebase/firebase.js';

import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, getFirestore, collection, addDoc, getDocs, deleteDoc, doc,
  query, orderBy, getDoc, onSnapshot, updateDoc, serverTimestamp, onAuthStateChanged, signOut,
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
  // console.log('auth', auth);
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('userCreditial ', userCredential);
      return userCredential;
    });
};

// Inicio de sesión con Google
export const fnSingGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // console.log('provider: ', provider);
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


// // console.log('intentoooooooo');
// // Perfil del usuario activo
// //export const userProfile = () => {
// const auth = getAuth();
// const user = auth.currentUser;
// console.log('perfil de usuario', user);
// console.log('usuario de perfil', getAuth());
// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const name = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;
//   console.log('prueba user', name, email, photoURL, emailVerified);
//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
//   }
// //};
export const observador = () =>{
const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log('user OnAuth', user);
      const uid = user.uid;
      window.location.hash = '#/muro';
      // ...
    } else { 
      // User is signed out
      // ...
    }
  });
};
// Cerrar sesión
export const signOff = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.hash = '';
  }).catch((error) => {
    console.log('error de cierre de sesion', error);
    // An error happened.
  });
};

// Creacion de post
export const postPage = async (post) => {
  try {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('user', user);
    const collectionPost = await addDoc(collection(db, 'post'), { post });
    // getPost();
    return collectionPost;
  } catch (e) {
    // console.log('error', e);
  }
  // return getPost();
};

// Obtener el post de la base de datos
export const getPost = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(query(collection(db, 'post'), orderBy('date')));
  const postList = [];
  querySnapshot.forEach((item) => {
    // console.log('item ', item.data());
    const data = item.data();
    const id = item.id;
    const email = item.email;
    const name = item.name;
    const photo = item.photoURL;
    // const post = item.post;
    const date = serverTimestamp();
    console.log('datos del usuario ', data, id, email, name, photo, date);
    postList.push({
      data, id, email, name, photo, date,
    });
  });
  // console.log('holaaaaaaa', postList);
  console.log('array de post ', postList);
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
