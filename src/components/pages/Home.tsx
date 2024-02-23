import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { logOut } from '../../firebase/firebaseFunctions';
import { onAuthStateChanged, User} from "firebase/auth";
import {auth} from '../../firebase/firebaseSetup';


export default function Home() {
  let user: User | null;
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        user = u;
        // ...
      } else {
        // User is signed out
        navigate('/signup');
        // ...
      }
    })
  }, []);

  return (
    <div>
      <h1>Welcome to Athenian High School's Note Sharing Website</h1>
      <p>Here you can find notes from your classmates, or share your own notes with others.</p>
      <p>Click on the "Notes" tab to get started.</p>
      <button onClick={logOut}>Sign Out</button>
    </div>
  );
}