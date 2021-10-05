// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from "firebase";
import 'firebase/auth';
import 'firebase/storages';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6LHJadAicaORnv8wzwMnvBQ4zolkv_8U",
  authDomain: "devspeaks-88ebb.firebaseapp.com",
  projectId: "devspeaks-88ebb",
  storageBucket: "devspeaks-88ebb.appspot.com",
  messagingSenderId: "621919424291",
  appId: "1:621919424291:web:aad124672d395527928696",
  measurementId: "G-3D3GFYL6VR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);