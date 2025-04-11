import { auth } from "./firebase"; 
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider); //select which to sign in

  return result;
}

export const doSignOut = async () => {
  return signOut(auth);
}
