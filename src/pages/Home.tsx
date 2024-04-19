import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { logOut } from '../firebase/firebaseFunctions';
import { onAuthStateChanged, User} from "firebase/auth";
import {auth} from '../firebase/firebaseSetup';
import {Autocomplete, Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material"
import styles from "../styles/home.module.css"
import JoClassButton from "../components/joClassButton"

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <img src={'./logo.png'} className={styles.logo1}></img>
      <List>
        {['Account', 'Settings', 'Help'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
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
    navigate('/Math');
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
        <button className={styles.pfpButton} onClick={toggleDrawer(true)}>
          <img src={"./defaultProfile.webp"} className={styles.pfp}>
          </img>
        </button>
      </div>
      <div className={styles.holder}>
        <JoClassButton oClick={handleGenericTopic} jClassName={"Art"}/>
        <JoClassButton oClick={handleGenericTopic} jClassName={"Math"}/>
        <JoClassButton oClick={handleGenericTopic} jClassName={"History"}/>
      </div>
      <div className={styles.holder}>
        <JoClassButton oClick={handleGenericTopic} jClassName={"Science"}/>
        <JoClassButton oClick={handleGenericTopic} jClassName={"Literature"}/>
        <JoClassButton oClick={handleGenericTopic} jClassName={"Language"}/>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
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