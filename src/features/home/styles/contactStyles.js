export const contactButtonWrapperSx = {
  position: "relative",
};

export const contactMenuItemSx = {
  textDecoration: "none",
  color: "inherit",
  fontSize: "16px",
  textTransform: "none",
};

export const contactPopupMotionStyle = {
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  borderRadius: "8px",
  padding: "16px",
  zIndex: 10,
};

export const contactPopupSx = {
  backgroundColor: "background.paper",
  color: "text.primary",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  border: "1px solid",
  borderColor: "divider",
};

export const contactPopupTextSx = {
  fontSize: "13px",
  textAlign: "left",
  color: "text.primary",
};

export const contactPopupPhoneSx = {
  ...contactPopupTextSx,
  marginTop: "8px",
};

export const contactFormContainerSx = {
  width: "100%",
};

export const contactFormSx = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  width: "100%",
  maxWidth: "150vw",
  margin: "auto",
  padding: "1rem",
};