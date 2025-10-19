// src/Config/Firebase.js

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBk9hbgNml9omsavK9nMPnP0DQsBdyyGMc",
  authDomain: "hackathon-1-7aab3.firebaseapp.com",
  projectId: "hackathon-1-7aab3",
  storageBucket: "hackathon-1-7aab3.appspot.com",
  messagingSenderId: "36077898375",
  appId: "1:36077898375:web:70b890fdcfd4a1a5198622",
  measurementId: "G-FW1BXY1YV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// ✅ Sign Up Function
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ✅ Sign In Function
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ✅ Auth State Observer
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({ isSignedIn: true, user });
    } else {
      callback({ isSignedIn: false, user: null });
    }
  });
};

// ✅ Sign Out Function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
