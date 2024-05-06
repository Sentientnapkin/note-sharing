import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import styles from '../styles/settings.module.css'

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Preferences" {...a11yProps(0)} />
        <Tab label="Privacy" {...a11yProps(1)} />
        <Tab label="Help" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Preferences content
      </TabPanel>
      <TabPanel value={value} index={1}>
        Privacy content
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={styles.page}>
          <h1>Help</h1>
          <h2>Contact Our Support Team</h2>
          <p className={styles.para}>Email: support@support.support</p>
          <p className={styles.para}>Phone: 555-555-5555</p>
          <h2>What is this site for?</h2>
          <p className={styles.para}>This site is dedicated to helping students better understand their classes by allowing them to see other peoples' notes from the same class. This will allow students to have more in depth notes, as well as view any missed content from missed (or skipped) classes. The goal is to elevate education and engagement in every class across the Athenian Upper School</p>
          <h2>How do I contribute?</h2>
          <p className={styles.para}>Feel free to upload your notes from any class to the appropriate class page. Please keep the notes relevant and accurate to what happened that day in class. Remember, everything you upload is tied to your account, so irrelevant uploads and/or inappropriate uploads will result in a ban from using this service.</p>
        </div>
      </TabPanel>
    </div>
  );
}