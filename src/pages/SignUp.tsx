import React from 'react';
import styles from '../styles/authentication.module.css';
import {signUp} from '../firebase/firebaseFunctions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {updateProfile} from "firebase/auth";
import {auth} from "../firebase/firebaseSetup";
import AuthErrorMessage from "../components/AuthErrorMessage";
import GoogleSignInButton from "../components/GoogleSignInButton";

export default function SignUp() {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    // replace true with verifying that email ends in athenian.org
    if (emailRef.current!.value.endsWith("athenian.org") && passwordRef.current!.value === confirmPasswordRef.current!.value) {
      const r = await signUp(emailRef.current!.value, passwordRef.current!.value)
      if (r.error !== ''){
        setError(r.error)
      } else {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: usernameRef.current!.value
          }).then(() => {
            // Profile updated!
          }).catch((error) => {
            console.error(error)
            setError(error.message)
          });
        }
        navigate('/')
      }
    }
    else if (!emailRef.current!.value.endsWith("athenian.org)") && passwordRef.current!.value === confirmPasswordRef.current!.value){
      setError('Please use an Athenian email')
    }
    else {
      setError('Passwords do not match')
    }
  }

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <h2>Be sure to use an Athenian account, Non-Athenian accounts will be redirected to here.</h2>
      <div>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          inputRef={usernameRef}
          fullWidth
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          inputRef={emailRef}
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          inputRef={passwordRef}
          type="password"
          fullWidth
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          inputRef={confirmPasswordRef}
          type="password"
          fullWidth
        />

        <Button onClick={handleSignUp}>Sign Up</Button>
        <Button onClick={() => navigate('/login')}>Already have an account? Login Here</Button>
        <GoogleSignInButton />
      </div>
      { error!== "" && <AuthErrorMessage message = {error}/> }
    </div>
  );
}