import React from "react";
import { Box, useTheme } from "@mui/material";

const Tag = ({ label }) => {
  const theme = useTheme(); // Access the theme

  return (
    <Box
      sx={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "16px",
        backgroundColor: theme.palette.primary.main, // Use theme color
        color: theme.palette.bright.main, // White text color
        fontSize: { xs: "12px", sm: "14px" },
        fontWeight: 500,
        border: `1px solid ${theme.palette.primary.dark || "#183924"}`, // Slightly darker green border
        textAlign: "center",
      }}
    >
      {label}
    </Box>
  );
};

export default Tag;
