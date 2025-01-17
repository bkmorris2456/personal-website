import React from "react";
import { Box } from "@mui/material";

const Tag = ({ label }) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        padding: "4px 12px", // Space around the text
        borderRadius: "16px", // Rounded corners
        backgroundColor: "#f5f5f5", // Light gray background
        color: "#333", // Text color
        fontSize: { xs: "12px", sm: "14px" }, // Font size adjusts with screen size
        fontWeight: 500,
        border: "1px solid #ddd", // Optional border
        textAlign: "center",
      }}
    >
      {label}
    </Box>
  );
};

export default Tag;