// Import the functions you need from the SDKs you need


import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1DggReV_uVHDYQA9CefhEyyso0x9OsRE",
  authDomain: "my-app-cc13c.firebaseapp.com",
  projectId: "my-app-cc13c",
  storageBucket: "my-app-cc13c.appspot.com",
  messagingSenderId: "431331744530",
  appId: "1:431331744530:web:155f6f2868815885e6f1cb"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};

