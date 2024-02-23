import React, {useRef} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {signIn} from "../../firebase/firebaseFunctions";
import AuthErrorMessage from "../AuthErrorMessage";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    const r = await signIn(emailRef.current!.value, passwordRef.current!.value)
    if (r.error !== ''){
      setError(r.error)
    } else {
      navigate('/')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
        </Form.Group>

        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={() => navigate('/signup')}>Don't have an account? Sign Up Here</Button>
      </Form>
      { error!== "" && <AuthErrorMessage message = {error}/> }
    </div>
  );
}