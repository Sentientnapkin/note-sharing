import {useRef} from "react";
import { signIn, signUp } from "./firebaseFunctions"
import {getAuth} from "firebase/auth";

export default function LoginScreen() {
  const auth = getAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Login</h1>

    </div>
  );
}