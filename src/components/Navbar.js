import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function Navbar() {

  return (
    <React.Fragment>
      <AppBar sx={{background: '#0B300F'}}>
        <Toolbar>
          <Typography>Blake Morris</Typography>
          <Tabs sx={{marginLeft: 'auto'}} textColor="inherit">
            <Tab label="Home"/>
            <Tab label="Projects"/>
            <Tab label="About"/>
            <Tab label="Resume"/>
            <Tab label="Applications"/>
          </Tabs>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );

}

export default Navbar;