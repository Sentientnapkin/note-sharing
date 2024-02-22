import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { loginSuccess, logoutSuccess } from '../redux/slices/authSlice';
import { store } from '../redux/store';
import { auth } from "./firebaseSetup";

export const signIn = (email: any, password: any) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      store.dispatch(loginSuccess(user));
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const signUp = (email: any, password: any) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      signInWithEmailAndPassword(auth, email, password)
        .then(r => {console.log(user)})

      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export const logOut = () => {
  signOut(auth).then(() => {
    store.dispatch(logoutSuccess());
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}