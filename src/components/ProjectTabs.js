// src/components/ProjectTabs.js
import React from "react";
import { Grid, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import projects from "../components/projects.json";
import projectImages from "../components/projectImages";

const ProjectTabs = () => {
  return (
    <div style={{ padding: "2rem" }}>

      <Grid container spacing={3} justifyContent="center">
        {projects.map((project, index) => (
          <Grid item key={index}>
            <ProjectCard
              image={projectImages[project.id]}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              demoLink={project.demoLink}
              githubLink={project.githubLink}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProjectTabs;
