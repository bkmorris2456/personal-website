import React from "react";
import { Grid, Container } from "@mui/material";
import SkillCard from "./SkillCard";
import { skillsContainerSx, skillsGridSx } from "../../../../styles/skillsStyles";

const SkillsSection = ({ skills }) => {
  return (
    <Container maxWidth="lg" sx={skillsContainerSx}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="stretch"
        sx={skillsGridSx}
      >
        {skills.map((skill) => (
          <Grid item xs={10} sm={6} md={4} lg={3} key={skill.name}>
            <SkillCard {...skill} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SkillsSection;