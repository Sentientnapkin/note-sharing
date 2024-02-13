import {useRef} from "react";
import { signIn } from "../firebase/firebaseFunctions"
import {getAuth} from "firebase/auth";

export default function Login() {
  const auth = getAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Login</h1>

    </div>
  );
}