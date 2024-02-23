import React from 'react';
import {signUp} from '../../firebase/firebaseFunctions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
    if (passwordRef.current!.value === confirmPasswordRef.current!.value) {
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
    } else {
      setError('Passwords do not match')
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" ref={usernameRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm password" ref={confirmPasswordRef} />
        </Form.Group>

        <Button onClick={handleSignUp}>Sign Up</Button>
        <Button onClick={() => navigate('/login')}>Already have an account? Login Here</Button>
      </Form>
      { error!== "" && <AuthErrorMessage message = {error}/> }
    </div>
  );
}