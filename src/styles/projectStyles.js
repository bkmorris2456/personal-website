export const projectTabsWrapperSx = {
  p: "2rem",
};

export const projectCardSx = {
  maxWidth: 350,
  height: "100%",
  backgroundColor: "background.paper",
  color: "text.primary",
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
  },
  "&:hover .project-image": {
    filter: "brightness(0.6)",
  },
};

export const projectImageSx = {
  transition: "filter 0.3s ease",
};

export const projectDescriptionSx = {
  mb: 2,
  color: "text.secondary",
};