import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { logOut } from '../firebase/firebaseFunctions';
import { onAuthStateChanged, User} from "firebase/auth";
import {auth} from '../firebase/firebaseSetup';
import {
  Box,
  Button,
  Dialog, DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material"
import styles from "../styles/home.module.css"
import ClassThumbnail from "../components/ClassThumbnail"

export default function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const screenAR = window.innerWidth/window.innerHeight;

  const handleLogOut = () => {
    logOut();
  }

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
      <Button className={styles.signout} onClick={handleLogOut}>Sign Out</Button>
    </Box>
  );

  let user: User | null;
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        user = u;
        setIsLoggedIn(true);
        handleCloseLoginDialog();

        if (!user.email?.endsWith("athenian.org")) {
          logOut();
          navigate('/signup');
        }
        // ...
      } else {
        // User is signed out
        setIsLoggedIn(false);
        handleOpenLoginDialog();
      }
    })
  }, []);

  var subjectRows = [["Art", "Math", "History"], ["Science", "Literature", "Language"], ["Computer Science & Engineering", "Other"]];
  if (screenAR <= 1) {
    subjectRows = [["Art", "Math"],["History", "Science"],["Literature", "Language"],["Computer Science & Engineering", "Other"]];
  }

  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false);

  }

  const handleOpenLoginDialog = () => {
    setLoginDialogOpen(true);
  }

  return (
    <div>
      <Dialog onClose={(event: object, reason: string) => {
        if (reason !== "backdropClick") {
          handleCloseLoginDialog()
        }
      }} aria-labelledby="simple-dialog-title"
              open={loginDialogOpen}>
        <DialogTitle id="simple-dialog-title">Login to Access Hadrian's Library</DialogTitle>
        <DialogContent >
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/signup")}>Sign Up</Button>
        </DialogContent>
      </Dialog>

      <div className={styles.title}>
        <div className={styles.logoHolder}>
          <img className={styles.logo2} src={require("../images/logo.png")}></img>
          <h1 className={styles.titleText}>Hadrian's Library</h1>
        </div>
        <button className={styles.pfpButton} onClick={toggleDrawer(true)}>
          <img src={require("../images/defaultProfile.webp")} className={styles.pfp}>
          </img>
        </button>
      </div>
      <div>
        {subjectRows.map((m) => {
          return (
            <div className={styles.holder} key={m[0] + " " + m[1] + " " + m[2]}>
              <ClassThumbnail oClick={() => {
                  navigate('/' + m[0]);
                }} jClassName={m[0]} numRows={subjectRows.length}/>
              <ClassThumbnail oClick={() => {
                  navigate('/' + m[1]);
                }} jClassName={m[1]} numRows={subjectRows.length}/>
              {m.length > 2 && 
              <ClassThumbnail oClick={() => {
                  navigate('/' + m[2]);
                }} jClassName={m[2]} numRows={subjectRows.length}/>}
            </div>
          )
        })}
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'}>
        {DrawerList}
      </Drawer>
    </div>
  );
}