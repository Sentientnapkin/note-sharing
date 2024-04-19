import React, {useRef} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from '../styles/authentication.module.css';
import { useNavigate } from "react-router-dom";
import {signIn, googleSignIn} from "../firebase/firebaseFunctions";
import AuthErrorMessage from "../components/AuthErrorMessage";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import GoogleSignInButton from "../components/GoogleSignInButton";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const r = await signIn(emailRef.current!.value, passwordRef.current!.value)
    if (r.error !== ''){
      setError(r.error)
    } else {
      navigate('/')
    }
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.textFieldContainer}>
        <TextField
          inputRef={emailRef}
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          className={styles.textField}
        />
        <FormControl
          sx={{ m: 1, width: '25ch' }}
          variant="outlined"
          className={styles.textField}
        >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            inputRef={passwordRef}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <div className={styles.buttonContainer}>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={() => navigate('/signup')}>Don't have an account? Sign Up Here</Button>
          <GoogleSignInButton />
        </div>
      </div>
      { error!== "" && <AuthErrorMessage message = {error}/> }
    </div>
  );
}