import * as React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import DesktopNav from "./components/DesktopNav";
import MobileNavMenu from "./components/MobileNavMenu.jsx";
import {
  appBarSx,
  toolbarSx,
  getFrostedGlassBoxSx,
  mobileMenuButtonSx,
} from "../../styles/navbarStyles.js";

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

          <IconButton sx={mobileMenuButtonSx} onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MobileNavMenu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} />
    </React.Fragment>
  );
}

export default Navbar;