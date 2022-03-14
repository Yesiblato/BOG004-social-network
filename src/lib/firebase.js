// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmWQdXf4TohtKvSTbEE9Rhlwt7r6Qgi_k",
  authDomain: "latam-sinfronteras.firebaseapp.com",
  projectId: "latam-sinfronteras",
  storageBucket: "latam-sinfronteras.appspot.com",
  messagingSenderId: "38260461068",
  appId: "1:38260461068:web:fc8c0452d3a0210ae56829",
  measurementId: "G-GF08YHX42T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//creacion de un user

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });