import * as React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';

function Navbar() {

  const [scrolled, setScrolled] = React.useState(false);

  // Track scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <AppBar
        elevation={0} 
        sx={{
          background: 'transparent',
          position: 'fixed', // Keep navbar fixed at the top
          width: '100%',
          zIndex: 1000,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* Box to wrap and add background only to the tabs */}
          <Box
            sx={{
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
              backdropFilter: 'blur(10px)', // Optional blur effect
              transition: 'background-color 0.3s ease',
              borderRadius: 2, // Optional rounded corners for the background
              padding: '1px', // Adds spacing around the tabs
            }}
          >
            <Tabs 
              sx={{ 
                margin: 0, 
                display: 'flex', 
                justifyContent: 'center' // Center the tabs
              }} 
              textColor="inherit"
              indicatorColor="primary"
            >
              {/* Home Tab */}
              <Tab 
                label="Home" 
                component={Link} 
                to="/home" 
                sx={{
                  minWidth: 0,
                  padding: 0,
                  textTransform: 'none',
                  margin: '0 20px',
                  fontSize: '18px',
                  color: 'inherit',
                  '&:hover': {
                    color: '#4caf50',
                    transition: 'color 0.3s',
                  },
                }} 
              />
              {/* Projects Tab */}
              <Tab 
                label="Projects" 
                component={Link} 
                to="projects" 
                sx={{
                  minWidth: 0,
                  padding: 0,
                  textTransform: 'none',
                  margin: '0 20px',
                  fontSize: '18px',
                  color: 'inherit',
                  '&:hover': {
                    color: '#4caf50',
                    transition: 'color 0.3s',
                  },
                }} 
              />
              {/* About Tab */}
              <Tab 
                label="About" 
                component={Link} 
                to="/about" 
                sx={{
                  minWidth: 0,
                  padding: 0,
                  textTransform: 'none',
                  margin: '0 20px',
                  fontSize: '18px',
                  color: 'inherit',
                  '&:hover': {
                    color: '#4caf50',
                    transition: 'color 0.3s',
                  },
                }} 
              />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;