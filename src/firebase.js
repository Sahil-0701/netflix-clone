import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCwRXWIO6leQEE0hMjgq4IJ1BGJXuTepgg",
  authDomain: "netflix-clone-59ab6.firebaseapp.com",
  projectId: "netflix-clone-59ab6",
  storageBucket: "netflix-clone-59ab6.firebasestorage.app",
  messagingSenderId: "574210061081",
  appId: "1:574210061081:web:94c7231b663815a64c0b88",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};
export const logout = () => {
  signOut(auth);
};
/*export {auth, db, login, signup, logout};*/
