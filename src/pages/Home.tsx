import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { logOut } from '../firebase/firebaseFunctions';
import { onAuthStateChanged, User} from "firebase/auth";
import {auth} from '../firebase/firebaseSetup';
import {Autocomplete, Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material"
import styles from "../styles/home.module.css"
import ClassThumbnail from "../components/ClassThumbnail"

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const artDesc = "Art explores creative expression through various mediums such as painting, sculpture, and digital media. It encompasses aesthetics, history, and cultural significance, reflecting human experiences and emotions. Art education fosters creativity and innovation while nurturing individuality and cultural awareness. It offers a lens into diverse perspectives and societal narratives.";
  const mathDesc = "Mathematics is the study of numbers, shapes, patterns, and structures. It involves logical reasoning and problem-solving, exploring concepts like algebra, geometry, calculus, and statistics. Math is fundamental in understanding the natural world, technology, and scientific phenomena. It provides tools for modeling and predicting patterns in various disciplines.";
  const historyDesc = "History is the study of past events, societies, and civilizations through critical analysis of sources and narratives. It explores how societies evolve, conflicts arise, and cultures develop over time. By examining the past, historians seek to understand the complexities of human experience and its impact on shaping our present world."
  const scienceDesc = "Science explores the natural world through observation, experimentation, and analysis. It encompasses various disciplines like biology, chemistry, physics, and more. Scientists seek to understand phenomena, formulate theories, and apply knowledge for practical purposes. Science drives innovation, technology, and our understanding of the universe, from atoms to galaxies."
  const literatureDesc = "Literature is the study of written works created by individuals or groups, encompassing various genres like fiction, poetry, drama, and non-fiction. This academic subject explores themes, styles, and cultural contexts within literary texts, fostering critical analysis and interpretation. It examines how language, narrative, and symbolism convey meaning and reflect societal values.";
  const languageDesc = "Foreign language studies explore languages spoken outside one's native tongue. It encompasses linguistic analysis, cultural context, and practical communication skills. Students delve into grammar, vocabulary, phonetics, and socio-cultural aspects to enhance cross-cultural understanding and global communication. These classes provide rich cultural experiences.";
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <img src={require('../images/logo.png')} className={styles.logo1}></img>
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
        <ClassThumbnail oClick={() => {navigate('/Art');}} jClassName={"Art"} desc={artDesc}/>
        <ClassThumbnail oClick={() => {navigate('/Math');}} jClassName={"Math"} desc={mathDesc}/>
        <ClassThumbnail oClick={() => {navigate('/History');}} jClassName={"History"} desc={historyDesc}/>
      </div>
      <div className={styles.holder}>
        <ClassThumbnail oClick={() => {navigate('/Science');}} jClassName={"Science"} desc={scienceDesc}/>
        <ClassThumbnail oClick={() => {navigate('/Literature');}} jClassName={"Literature"} desc={literatureDesc}/>
        <ClassThumbnail oClick={() => {navigate('/Language');}} jClassName={"Language"} desc={languageDesc}/>
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