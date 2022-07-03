import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCJQgiV-FL699d_u2ecvGWqZPQGCaR0mB8",
  authDomain: "healthbridge-80333.firebaseapp.com",
  databaseURL: "https://healthbridge-80333-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "healthbridge-80333",
  storageBucket: "gs://healthbridge-80333.appspot.com",
  messagingSenderId: "819145423531",
  appId: "1:819145423531:web:a07f40d2f3579fe96815ee",
  measurementId: "G-DJLN11VYEG"
})

export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider();
export const firestore = app.firestore();
export const database = firebase.database();
export const storage = firebase.storage();


export default app

