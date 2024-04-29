import React from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";

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
        Help content
      </TabPanel>
    </div>
  );
}