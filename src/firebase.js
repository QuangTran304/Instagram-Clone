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

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firebase.firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, firstName, lastName, photoURL, username } = user;
    try {
      await userRef.set({
        firstName,
        lastName,
        email,
        photoURL,
        username,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firebase.firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export { database, auth, storage };