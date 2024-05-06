import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import styles from '../styles/profile.module.css';
import Button from '@mui/material/Button'

export default function Profile() {
  const realPassword = "importThisfromSomeWhere1234"
  const [password, setPassword] = useState<string>("************");
  const [isPasswordHidden, setIsPasswordHidden] = useState<string>("Reveal");
  function displayPass() {
    if (password === "************") {
      setPassword(realPassword);
      setIsPasswordHidden("Hide")
    }
    else {
      setPassword("************")
      setIsPasswordHidden("Reveal")
    }
  }
  return (
    <div>
      <BackButton/>
      <h1 className={styles.title}>Account Profile</h1>
      <p>Username: Sebastian V</p>
      <p className={styles.password}>Password: {password}</p>
      <Button variant={"contained"} className={styles.passButton} onClick={displayPass}>{isPasswordHidden} Password</Button>
      <h2>My Uploads</h2>
    </div>
  );
}