export const skillsContainerSx = {
  py: 6,
  display: "flex",
  justifyContent: "center",
};

export const skillsGridSx = {
  width: "100%",
};

export const skillCardSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: "background.paper",
  color: "text.primary",
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
  p: 2,
  width: "100%",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
  },
};

export const skillIconSx = {
  fontSize: { xs: 30, sm: 35, md: 40 },
  mr: 2,
  display: "flex",
  alignItems: "center",
  color: "primary.main",
};

export const skillContentSx = {
  p: 0,
};

export const skillTitleSx = {
  fontSize: { xs: "1rem", sm: "1.1rem" },
};