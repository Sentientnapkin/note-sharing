import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import styles from '../styles/settings.module.css'
import BackButton from '../components/BackButton';

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
      <BackButton path={"/"}></BackButton>
      <Tabs className={styles.tabs} value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Privacy" {...a11yProps(0)} />
        <Tab label="Help" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div className={styles.page}>
          <h1>Privacy Policy</h1>
          <p className={styles.para}>At Hadrian's Library, we are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you use our note-sharing website.</p>
          <h3>1. The Information We Collect</h3>
          <ul>
            <li>Personal Information: When you register for an account on our website, we may collect personal information such as your name, email address, school affiliation, and any other information you choose to provide. </li>
            <li>Note Contributions: Any notes, documents, or other materials you upload or share on our website.</li>
          </ul>
          <h3>2. How We Use Your Information</h3>
          <ul>
            <li>To Provide Services: We use your personal information to create and manage your account, facilitate note-sharing, and provide customer support.</li>
            <li>Communication: We may use your email address to send you important updates, newsletters, or other communications related to our services.</li>
            <li>Legal Compliance: We may use your information to comply with legal obligations or respond to lawful requests from authorities.</li>
          </ul>
          <h3>3. Information Sharing and Disclosure</h3>
          <ul>
            <li>Third-Party Service Providers: We may share your information with third-party service providers who assist us in operating our website.</li>
            <li>Legal Compliance: We may disclose your information if required by law or in response to legal processes, such as court orders or subpoenas.</li>
            <li>Consent: We may share your information with your consent or as otherwise described at the time of collection.</li>
          </ul>
          <h3>4. Data Security</h3>
          <p className={styles.para}>We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, etc.</p>
          <h3>5. Your Rights</h3>
          <ul>
            <li>Access and Correction: You have the right to access and correct any inaccuracies in your personal information stored on our website.</li>
            <li>Deletion: You may request the deletion of your account and associated personal information, subject to certain legal limitations and obligations.</li>
          </ul>
          <h3>7. Changes to this Privacy Policy</h3>
          <p className={styles.para}>We reserve the right to update or modify this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          <h3>8. Contact Us</h3>
          <p className={styles.para}>For any questions or concerns you may have about our website, including this Privacy Policy, see the Contact Us tab by clicking "Help" at the top of your screen.</p>
          <p className={styles.para}>By using our website, you agree to the terms of this Privacy Policy</p>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
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