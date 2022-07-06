/* eslint-disable import/no-unresolved */
export { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
export {
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, onSnapshot, updateDoc,
  serverTimestamp, query, orderBy, setDoc,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
export {
  getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
