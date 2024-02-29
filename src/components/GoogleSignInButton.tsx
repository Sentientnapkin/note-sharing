import React from 'react';
import Button from '@mui/material/Button';
import {googleSignIn} from "../firebase/firebaseFunctions";
import styles from '../styles/GoogleSignInButton.module.css';
import {useNavigate} from "react-router-dom";

export default function GoogleSignInButton() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const r = await googleSignIn()
    if (r.error === ''){
      navigate('/')
    }
  }

  return (
    <div className={styles.container}>
      <Button onClick={handleClick} className={styles.button}>
        <img src={"./GoogleIcon.png"} alt="Google Icon" className={styles.icon} />
        Continue with Google
      </Button>
    </div>
  )
}