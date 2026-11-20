import * as React from "react";
import { AppBar, Box, Toolbar, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

import DesktopNav from "./components/DesktopNav";
import MobileNavMenu from "./components/MobileNavMenu.jsx";
import { externalNavItems } from "./constants/navItems";
import {
  appBarSx,
  toolbarSx,
  toolbarActionsSx,
  desktopSocialLinksSx,
  desktopNavLinkStyle,
  getFrostedGlassBoxSx,
  mobileMenuButtonSx,
  themeToggleButtonSx,
} from "./styles/navbarStyles.js";

function Navbar({ toggleTheme, mode }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar elevation={0} sx={appBarSx}>
        <Toolbar sx={toolbarSx}>
          <DesktopNav sx={getFrostedGlassBoxSx(scrolled)} />

          <Box sx={toolbarActionsSx}>
            <Box sx={desktopSocialLinksSx}>
              {externalNavItems.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={desktopNavLinkStyle}
                >
                  {label}
                </a>
              ))}
            </Box>

            <IconButton
              onClick={toggleTheme}
              sx={themeToggleButtonSx}
              aria-label="Toggle light and dark mode"
            >
              {mode === "dark" ? (
                <DarkModeRoundedIcon />
              ) : (
                <LightModeRoundedIcon />
              )}
            </IconButton>

            <IconButton sx={mobileMenuButtonSx} onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileNavMenu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} />
    </React.Fragment>
  );
}

export default Navbar;
