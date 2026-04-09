import React from "react";
import { Grid, Container } from "@mui/material";
import SkillCard from "./SkillCard";

const SkillsSection = ({ skills }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          width: "100%",
        }}
      >
        {skills.map((skill) => (
          <Grid
            item
            xs={10}
            sm={6}
            md={4}
            lg={3}
            key={skill.name}
          >
            <SkillCard {...skill} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SkillsSection;
