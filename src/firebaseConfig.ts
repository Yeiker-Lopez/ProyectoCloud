// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADUDs86ziLXk4zQNDP9thVPKwu5yVGEgY",
  authDomain: "proyectoau-2fddb.firebaseapp.com",
  projectId: "proyectoau-2fddb",
  storageBucket: "proyectoau-2fddb.appspot.com",
  messagingSenderId: "83547391079",
  appId: "1:83547391079:web:1499d404908511d9f700c2",
  measurementId: "G-FC7TNE1GHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//import {  } from "module";
//src/firebaseConfig.ts
// import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";

// const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


