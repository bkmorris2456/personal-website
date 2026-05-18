import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import {
  projectCardSx,
  projectImageSx,
  projectDescriptionSx,
} from "../../../../styles/projectStyles";

const ProjectCard = ({
  image,
  title,
  description,
  technologies,
  demoLink,
  githubLink,
}) => {
  return (
    <Card sx={projectCardSx}>
      <CardMedia
        className="project-image"
        component="img"
        height="180"
        image={image}
        alt={`${title} screenshot`}
        sx={projectImageSx}
      />

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>

        <Typography variant="body2" sx={projectDescriptionSx}>
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        {githubLink && (
          <Button size="small" color="secondary" href={githubLink} target="_blank">
            GitHub
          </Button>
        )}

        {demoLink && (
          <Button size="small" color="primary" href={demoLink} target="_blank">
            Demo
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;