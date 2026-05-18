export const heroWrapperSx = {
  flex: 1,
  p: { xs: 2, sm: 4, md: 6 },
  maxWidth: "1200px",
  mx: "auto",
  marginBottom: "10vh",
};

export const heroTitleGridSx = {
  display: "flex",
  justifyContent: "center",
};

export const heroTitleSx = {
  textAlign: "center",
  marginTop: "10vh",
  marginBottom: "10vh",
  fontSize: { xs: "35px", sm: "45px" },
};

export const heroImageGridSx = {
  display: "flex",
  justifyContent: "center",
};

export const heroImageSx = {
  borderRadius: "50%",
  width: { xs: "200px", sm: "350px" },
  height: { xs: "200px", sm: "350px" },
  objectFit: "cover",
};

export const heroBodyTextSx = {
  textAlign: "justify",
  fontSize: { xs: "14px", sm: "16px" },
  color: "text.secondary",
};

export const heroParagraphSx = {
  ...heroBodyTextSx,
  marginBottom: "2vh",
};