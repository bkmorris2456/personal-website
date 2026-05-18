import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../../../../firebase/firestoreService";
import { projectTabsWrapperSx } from "../../../../styles/projectStyles";

import roomaryImage from "../../../../assets/images/roomary-logo.webp";
import moneyMovesImage from "../../../../assets/images/money-moves-demo.webp";
import cheatDayImage from "../../../../assets/images/cheat-day-image.webp";

const projectImages = {
  roomary: roomaryImage,
  moneymoves: moneyMovesImage,
  cheatday: cheatDayImage,
};

const ProjectTabs = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    loadData();
  }, []);

  return (
    <Box sx={projectTabsWrapperSx}>
      <Grid container spacing={3} justifyContent="center">
        {projects.map((project) => (
          <Grid item key={project.id || project.title}>
            <ProjectCard
              image={projectImages[project.imageKey]}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              demoLink={project.demoLink}
              githubLink={project.githubLink}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectTabs;