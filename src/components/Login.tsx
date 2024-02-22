import {useRef} from "react";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import {signIn} from "../firebase/firebaseFunctions";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    signIn(emailRef.current!.value, passwordRef.current!.value)
    navigate('/')
  }

  return (
      <div>
        <h1>Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={passwordRef} />
          </Form.Group>
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => navigate('/signup')}>Don't have an account? Sign Up Here</button>
        </Form>
      </div>
  );
}