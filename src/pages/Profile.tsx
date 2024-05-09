import React, { useRef, useState } from 'react';
import BackButton from '../components/BackButton';
import styles from '../styles/profile.module.css';
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';

export default function Profile() {
  const realPassword = "importThisfromSomeWhere1234"
  const realPhone = "555-555-5555";
  const [textInput, setTextInput] = useState('');

  const handleTextInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTextInput(event.target.value);
  };
  const [password, setPassword] = useState<string>("************");
  const [isPasswordHidden, setIsPasswordHidden] = useState<string>("Reveal");
  function displayPass() {
    console.log(textInput)
    if (password === "************" && textInput === realPhone) {
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
      <TextField value= {textInput} onChange= {handleTextInputChange} id="outlined-basic" label="Phone #" variant="outlined" />
      <Button variant={"contained"} className={styles.passButton} onClick={displayPass}>{isPasswordHidden} Password</Button>
      <h2>My Uploads</h2>
    </div>
  );
}