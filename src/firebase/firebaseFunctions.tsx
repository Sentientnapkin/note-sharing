import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {auth} from "./firebaseSetup";

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

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const userCredential = await setPersistence(auth, browserLocalPersistence)
      .then( () => {
        return signInWithPopup(auth, provider);
      })
    return {
      user: userCredential.user,
      error: ''
    }
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

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