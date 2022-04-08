/* eslint-disable import/no-unresolved */
export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
export {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, onSnapshot, updateDoc,
  serverTimestamp, query, orderBy,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';
export {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

// export {  getFirestore, collection, addDoc, getDocs, getAuth,
//    createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
//   GoogleAuthProvider, signInWithPopup }