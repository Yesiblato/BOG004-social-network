// Import the functions you need from the SDKs you need
import { initializeApp } from './firebase-imports.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqNkBNsfpVggjJDBbLUIbxUspRORxQ0XI",
  authDomain: "talent-latam.firebaseapp.com",
  projectId: "talent-latam",
  storageBucket: "talent-latam.appspot.com",
  messagingSenderId: "947331364634",
  appId: "1:947331364634:web:a6f306eead10763c1cdea3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
