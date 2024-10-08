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
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <React.Fragment>
      <AppBar sx={{background: '#0B300F'}}>
        <Toolbar>
          <Typography>Blake Morris</Typography>
          <Tabs sx={{marginLeft: 'auto'}} textColor="inherit">
            <Tab label="Home" component={Link} to="/home" className="tab-label" />
            <Tab label="Projects" component={Link} to="/projects" className="tab-label" />
            <Tab label="About" component={Link} to="/about" className="tab-label" />
            <Tab label="Resume" component={Link} to="/resume" className="tab-label" />
            <Tab label="Applications" component={Link} to="/applications" className="tab-label" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );

}

export default Navbar;