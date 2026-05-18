import { Box } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { sectionNavItems } from "../constants/navItems";

function DesktopNav({ sx }) {
  return (
    <Box
      sx={{
        ...sx,
        display: { xs: "none", md: "flex" },
      }}
    >
      {sectionNavItems.map((item) => (
        <ScrollLink
          key={item.to}
          to={item.to}
          smooth
          duration={500}
          spy
          offset={-70}
          style={{
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          activeStyle={{ color: "#4caf50" }}
        >
          {item.label}
        </ScrollLink>
      ))}

      <RouterLink
        to="/login"
        style={{
          textDecoration: "none",
          color: "inherit",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Dashboard
      </RouterLink>
    </Box>
  );
}

export default DesktopNav;