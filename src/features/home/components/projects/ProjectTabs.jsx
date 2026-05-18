// src/components/ProjectTabs.js
import React from "react";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../../../../firebase/firestoreService";

// Images
import roomaryImage from "../../../../assets/images/roomary-logo.webp";
import moneyMovesImage from "../../../../assets/images/money-moves-demo.webp";
import cheatDayImage from "../../../../assets/images/cheat-day-image.webp";

const ProjectTabs = () => {

    const [projects, setProjects] = useState([]);

    const projectImages = {
      roomary: roomaryImage,
      moneymoves: moneyMovesImage,
      cheatday: cheatDayImage,
    };

    useEffect(() => {
        const loadData = async () => {
            const data = await getProjects();
            setProjects(data);
        };

        loadData();
    }, []);

  return (
    <div style={{ padding: "2rem" }}>

      <Grid container spacing={3} justifyContent="center">
        {projects.map((project, index) => (
          <Grid item key={index}>
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
    </div>
  );
};

export default ProjectTabs;
