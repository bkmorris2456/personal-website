import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const SkillCard = ({ name, iconClass }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        borderRadius: 3,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
        p: 2,
        width: "100%",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
        },
      }}
    >
      <Box
        component="i"
        className={iconClass}
        sx={{
          fontSize: { xs: 30, sm: 35, md: 40 },
          mr: 2,
        }}
      />
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h6"
          fontWeight={100}
          sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
