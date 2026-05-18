import { Box } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { sectionNavItems } from "../constants/navItems";
import {
  desktopNavSx,
  desktopNavLinkStyle,
  desktopNavActiveStyle,
} from "../../../styles/navbarStyles";

function DesktopNav({ sx }) {
  return (
    <Box sx={{ ...sx, ...desktopNavSx }}>
      {sectionNavItems.map((item) => (
        <ScrollLink
          key={item.to}
          to={item.to}
          smooth
          duration={500}
          spy
          offset={-70}
          style={desktopNavLinkStyle}
          activeStyle={desktopNavActiveStyle}
        >
          {item.label}
        </ScrollLink>
      ))}

      <RouterLink to="/login" style={desktopNavLinkStyle}>
        Dashboard
      </RouterLink>
    </Box>
  );
}

export default DesktopNav;