export const appBarSx = {
  background: "transparent",
  position: "fixed",
  width: "100%",
  zIndex: 1000,
};

export const toolbarSx = {
  display: "flex",
  justifyContent: "space-between",
};

export const getFrostedGlassBoxSx = (scrolled) => ({
  padding: "8px 16px",
  backgroundColor: scrolled ? "rgba(67, 81, 70, 0.75)" : "transparent",
  backdropFilter: scrolled ? "blur(10px)" : "none",
  borderRadius: "24px",
  transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
  display: "flex",
  gap: 2,
  alignItems: "center",
  border: scrolled ? "1px solid" : "1px solid transparent",
  borderColor: scrolled ? "divider" : "transparent",
});

export const mobileMenuButtonSx = {
  display: { xs: "flex", md: "none" },
  backgroundColor: "rgba(67, 81, 70, 0.75)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  border: "1px solid",
  borderColor: "divider",
};

export const desktopNavSx = {
  display: { xs: "none", md: "flex" },
};

export const desktopNavLinkStyle = {
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  fontSize: "18px",
  fontWeight: "bold",
};

export const desktopNavActiveStyle = {
  color: "#4A6958",
};

export const mobileMenuPaperSx = {
  width: 250,
  padding: 1,
  backgroundColor: "rgba(67, 81, 70, 0.75)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid",
  borderColor: "divider",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  overflow: "visible",
};

export const mobileMenuCloseButtonSx = {
  alignSelf: "flex-end",
  marginBottom: 1,
};

export const mobileScrollLinkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontSize: "16px",
  textTransform: "none",
};

export const mobileContactMenuItemSx = {
  position: "relative",
  textDecoration: "none",
  color: "inherit",
  fontSize: "16px",
  textTransform: "none",
};

export const mobileContactPopupMotionStyle = {
  position: "absolute",
  top: 0,
  left: "100%",
  borderRadius: "16px",
  padding: "16px",
  zIndex: 10,
  width: "220px",
};

export const mobileContactPopupSx = {
  backgroundColor: "background.paper",
  color: "text.primary",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "16px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
};

export const mobileContactTextSx = {
  fontSize: "13px",
};

export const mobileContactPhoneSx = {
  ...mobileContactTextSx,
  marginTop: "4px",
};

export const externalLinkStyle = {
  textDecoration: "none",
  color: "inherit",
};