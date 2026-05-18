import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  skillCardSx,
  skillIconSx,
  skillContentSx,
  skillTitleSx,
} from "../../../../styles/skillsStyles";

const SkillCard = ({ name, icon }) => {
  return (
    <Card sx={skillCardSx}>
      <Box sx={skillIconSx}>{icon}</Box>

      <CardContent sx={skillContentSx}>
        <Typography variant="h6" fontWeight={100} sx={skillTitleSx}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SkillCard;