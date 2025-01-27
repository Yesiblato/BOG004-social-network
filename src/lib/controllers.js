import { app } from './firebase/firebase.js';

import {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, getFirestore, collection, addDoc, getDocs, deleteDoc, doc,
  query, orderBy, getDoc, onSnapshot, updateDoc, serverTimestamp, signOut,
  setDoc,
} from './firebase/firebase-imports.js';
import { showChange } from './router.js';

// Creación de usuario

export const fnCreateuser = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      sendEmailVerification(auth.currentUser)
        .then(() => {
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
      console.log('userCreditial ', userCredential);
      return userCredential;
    });
};

// Inicio de sesión con Google
export const fnSingGoogle = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
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

// Cerrar sesión
export const signOff = () => {
  const auth = getAuth();
  signOut(auth).then((userCredential) => {
    // Sign-out successful.
    console.log('credential', userCredential);
    localStorage.removeItem('user');
    window.location.href = '';
    // showChange('');
    history.pushState(null, '#/muro', '');
  }).catch((error) => {
    console.log('error de cierre de sesion', error);
  });
};

// Creacion de post
export const postPage = async (post) => {
  try {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    const email = user.email;
    const likes = [];
    const photo = user.photoURL;
    const name = user.displayName;
    const date = serverTimestamp();
    const userId = user.uid;
    const collectionPost = await addDoc(collection(db, 'post'), {
      post, email, photo, name, date, likes,
    });
    console.log('COLLECTIONPOST', collectionPost);
    return collectionPost;
  } catch (e) {
    console.log('error', e);
  };
};

// Obtener el post de la base de datos
export const getPost = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(query(collection(db, 'post'), orderBy('date', 'desc')));
  const postList = [];
  querySnapshot.forEach((item) => {
    const data = item.data();
    const id = item.id;
    const likes = data.likes;

    postList.push({
      data, id, likes,
    });
  });
  return postList;
};

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

export const updatePost = (id, newField, userId) => {
  const db = getFirestore();
  updateDoc(doc(db, 'post', id), newField);
};

// Actualizacion de post en tiempo real
export const onGetPost = () => {
  const db = getFirestore();
  const posts = [];
  onSnapshot(collection(db, 'post'), (querySnapshot) => {
    querySnapshot.forEach((item) => {
      posts.push(item.data());
    });
  });
  return posts;
};

export const fnLikes = async (id) => {
  try {
    const db = getFirestore();
    const collectionLikes = doc(collection(db, 'post'), id);

    const auth = getAuth();
    const user = auth.currentUser;
    const postLikes = await getDoc(collectionLikes);
    let likes = postLikes.data().likes;
    if (likes === undefined) {
      likes = [];
    }
    const index = likes.indexOf(user.email);
    if (index === -1) {
      likes.push(user.email);
    } else {
      likes.splice(index);
    }

    await setDoc(
      collectionLikes,
      {
        likes,
      },
      { merge: true },
    );
    console.log('Document update with ID: ', collectionLikes.id);
    getPost();
  } catch (e) {
    console.log('Error adding document: ', e);
  }
  getPost();
};
