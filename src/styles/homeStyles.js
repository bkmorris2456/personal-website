export const homePageSx = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  alignItems: "center",
  backgroundColor: "background.default",
  color: "text.primary",
};

export const homeSectionSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const skillsSectionSx = {
  ...homeSectionSx,
  maxWidth: "800px",
  marginBottom: "8vh",
};

export const projectsSectionSx = {
  ...homeSectionSx,
};

export const contactSectionSx = {
  ...homeSectionSx,
  marginBottom: "16vh",
  marginTop: "8vh",
  width: "100%",
};

export const sectionTitleSx = {
  textAlign: "center",
  fontSize: { xs: "35px", sm: "45px" },
  marginBottom: "2vh",
  marginTop: "2vh",
};

export const contactFormWrapperSx = {
  width: { xs: "90%", sm: "70%", md: "50%" },
  maxWidth: "450px",
};