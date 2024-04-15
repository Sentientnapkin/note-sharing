import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { logOut } from '../../firebase/firebaseFunctions';
import { onAuthStateChanged, User} from "firebase/auth";
import {auth} from '../../firebase/firebaseSetup';
import {Autocomplete, Button, TextField} from "@mui/material"
import styles from "../../styles/home.module.css"


export default function Home() {
  let user: User | null;
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        user = u;
        // ...
      } else {
        // User is signed out
        navigate('/signup');
        // ...
      }
    })
  }, []);

  const handleGenericTopic = () => {
    navigate('/topic/1');
  }

  return (
    <div>
      <div className={styles.title}>
        <h1>Hadrian's Library</h1>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={classes}
          sx={{ width: 900 }}
          renderInput={(params) => <TextField {...params} label="Topic" />}
        />
      </div>
      <p>Here you can find notes from your classmates, or share your own notes with others.</p>
      <p>Click on the "Notes" tab to get started.</p>
      <Button onClick={handleGenericTopic}> To Generic Topic </Button>
      <Button onClick={logOut}>Sign Out</Button>
    </div>
  );
}
const classes = [
  {label: 'Computer Science'},
  {label: 'Advanced Computer Science'},
  {label: 'Computational Thinking'},
  {label: 'Data Structures & Algorithms'},
  {label: 'Software Engineering'},
];