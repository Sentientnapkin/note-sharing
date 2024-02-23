import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "./firebaseSetup";

export const signIn = async (email: any, password: any) => {
  try {
    const userCredential = await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
    })
     // Signed in
    const user = userCredential.user;
    return {
      user: user,
      error: ''
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      user: null,
      error: errorMessage
    };
  }
}

export const signUp = async (email: any, password: any) => {
  try {
    const userCredential = await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(auth, email, password);
      })
    // Signed up
    const user = userCredential.user;
    return {
      user: user,
      error: ''
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      user: null,
      error: errorMessage
    };
  }
}

export const logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}