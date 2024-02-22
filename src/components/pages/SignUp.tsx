import React from 'react';
import {signUp} from '../../firebase/firebaseFunctions';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import {updateProfile} from "firebase/auth";
import {auth} from "../../firebase/firebaseSetup";
import AuthErrorMessage from "../AuthErrorMessage";

export default function SignUp() {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      const r = await signUp(emailRef.current!.value, passwordRef.current!.value)
      if (r.error !== ''){
        setError(r.error)
      }

      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: usernameRef.current!.value
        }).then(() => {
          // Profile updated!
        }).catch((error) => {
          setError(error.message)
        });
      }
      navigate('/')
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" ref={usernameRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" ref={confirmPasswordRef} />
        </Form.Group>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={() => navigate('/login')}>Already have an account? Login Here</button>
      </Form>
      { error && <AuthErrorMessage message = {error}/> }
    </div>
  );
}