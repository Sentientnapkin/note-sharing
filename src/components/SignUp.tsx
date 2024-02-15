import React from 'react';
import {signUp} from '../firebase/firebaseFunctions';
import Form from 'react-bootstrap/Form';
import { userContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { user, setUser } = React.useContext(userContext);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSignUp = () => {
    setUser(signUp(emailRef.current!.value, passwordRef.current!.value))
    navigate('/')
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef} />
        </Form.Group>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={() => navigate('/login')}>Already have an account? Login Here</button>
      </Form>
    </div>
  );
}