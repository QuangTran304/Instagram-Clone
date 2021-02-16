import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD1q68FCFm9WSoUvnL6FgrOhwEe_RjZ-5k",
  authDomain: "instagram-clone-1edb8.firebaseapp.com",
  projectId: "instagram-clone-1edb8",
  storageBucket: "instagram-clone-1edb8.appspot.com",
  messagingSenderId: "941282746618",
  appId: "1:941282746618:web:4cb5c661f5f36c1bfc2943"
});

const database = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { database, auth, storage };