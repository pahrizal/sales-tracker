import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// get firebase credential from environment variables
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// Initialize the firebase app
// TODO: check if app already initialized before reinitializing
const firebaseApp = initializeApp(firebaseConfig);

// setup authentication providers
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const googleAuthProvider = provider;
export const firebaseAuth = getAuth(firebaseApp);
export default getDatabase(firebaseApp);
