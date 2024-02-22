import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { loginSuccess, logoutSuccess } from '../redux/slices/authSlice';
import { store } from '../redux/store';
import { auth } from "./firebaseSetup";

export const signIn = async (email: any, password: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    store.dispatch(loginSuccess(user));
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed up
    const user = userCredential.user;
    return await signIn(email, password);
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
    store.dispatch(logoutSuccess());
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}