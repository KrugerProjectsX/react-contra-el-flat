// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRYVKG8nUvrDcWrnFptjM_nEqgZVVBBYM",
  authDomain: "contra-el-piso-project.firebaseapp.com",
  projectId: "contra-el-piso-project",
  storageBucket: "contra-el-piso-project.appspot.com",
  messagingSenderId: "613869459717",
  appId: "1:613869459717:web:b5ec5b8f599070b6f9bf6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);