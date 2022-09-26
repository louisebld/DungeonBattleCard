// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcYfps58z3GKUy95Q-pV3P3sJwrGXATJo",
  authDomain: "cardgame-2ba61.firebaseapp.com",
  projectId: "cardgame-2ba61",
  storageBucket: "cardgame-2ba61.appspot.com",
  messagingSenderId: "940628266349",
  appId: "1:940628266349:web:af44d4aa158e28c2c99e64",
  measurementId: "G-SW2ZN1RKCK"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }

