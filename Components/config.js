import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { getFirestore } from "firebase/firestore";

const firebaseConfig ={
    apiKey : "AIzaSyDuEp46hP3rB70nSStW-2b0H9I9342mCbs" , 
    authDomain : "testfirebase-6752f.firebaseapp.com" , 
    projectId : "testfirebase-6752f" , 
    storageBucket : "testfirebase-6752f.appspot.com" , 
    messagingSenderId : "697425270298" , 
    appId : "1:697425270298:web:a0ba11d4fa844ef21ba3a3" , 
    measurementId : "G-961BEZP5DN" 
};
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};
const app = initializeApp(firebaseConfig);
export {app};
export const db = getFirestore(app)
