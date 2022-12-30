// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCVeeCeWWCrFSzDk5d1cxEK9xc-pv4-SY",
  authDomain: "wakanda-shop.firebaseapp.com",
  projectId: "wakanda-shop",
  storageBucket: "wakanda-shop.appspot.com",
  messagingSenderId: "846177135981",
  appId: "1:846177135981:web:d2eca3c26e83c4058efe64",
  measurementId: "G-PSCPTYHNVK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

// export the db and auth

export {db, auth}