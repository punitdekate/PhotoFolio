// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcUsVKQ04JtgkGXGQ3gPlrAjCIFNeA_Wk",
  authDomain: "blogging-app-fad48.firebaseapp.com",
  projectId: "blogging-app-fad48",
  storageBucket: "blogging-app-fad48.appspot.com",
  messagingSenderId: "690649235932",
  appId: "1:690649235932:web:c2dcea39d2ca13c3c70f19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
