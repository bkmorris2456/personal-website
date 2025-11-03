import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack
} from "@mui/material";

const ProjectCard = ({
  image,
  title,
  description,
  technologies,
  link,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 350,
        borderRadius: 3,
        boxShadow: 4,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8
        }
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={`${title} screenshot`}
      />

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              variant="outlined"
              size="small"
              sx={{ mb: 0.5 }}
            />
          ))}
        </Stack>
      </CardContent>

      <CardActions>
        {link && (
          <Button size="small" color="secondary" href={link} target="_blank">
            GitHub
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
