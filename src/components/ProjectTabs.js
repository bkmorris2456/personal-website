// src/components/ProjectTabs.js
import React from "react";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../firebase/firestoreService";

// Images
import roomaryImage from "../images/roomary-logo.png";
import moneyMovesImage from "../images/money-moves-demo.png";
import cheatDayImage from "../images/cheat-day-image.png";

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
