import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { logOut } from '../firebase/firebaseFunctions';
import { onAuthStateChanged, User} from "firebase/auth";
import {auth} from '../firebase/firebaseSetup';
import {Autocomplete, Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material"
import styles from "../styles/home.module.css"
import ClassThumbnail from "../components/ClassThumbnail"

export default function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <img src={require('../images/logo.png')} className={styles.logo1}></img>
      <List>
        {['Profile', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate("/" + text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button className={styles.signout} onClick={logOut}>Sign Out</Button>
    </Box>
  );

  let user: User | null;
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

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.logoHolder}>
          <img className={styles.logo2} src={require("../images/logo.png")}></img>
          <h1 className={styles.titleText}>Hadrian's Library</h1>
        </div>
        {/*
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={classes}
          sx={{ width: 900 }}
          renderInput={(params) => <TextField {...params} label="Topic" />}
        />
        */}
        <button className={styles.pfpButton} onClick={toggleDrawer(true)}>
          <img src={require("../images/defaultProfile.webp")} className={styles.pfp}>
          </img>
        </button>
      </div>
      <div className={styles.holder}>
        <ClassThumbnail oClick={() => {navigate('/Art');}} jClassName={"Art"}/>
        <ClassThumbnail oClick={() => {navigate('/Math');}} jClassName={"Math"}/>
        <ClassThumbnail oClick={() => {navigate('/History');}} jClassName={"History"}/>
      </div>
      <div className={styles.holder}>
        <ClassThumbnail oClick={() => {navigate('/Science');}} jClassName={"Science"}/>
        <ClassThumbnail oClick={() => {navigate('/Literature');}} jClassName={"Literature"}/>
        <ClassThumbnail oClick={() => {navigate('/Language');}} jClassName={"Language"}/>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'}>
        {DrawerList}
      </Drawer>
    </div>
  );
}