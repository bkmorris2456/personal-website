export const authPageSx = {
  minHeight: "100vh",
  backgroundColor: "background.default",
  color: "text.primary",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: 2,
};

export const authCardSx = {
  width: "100%",
  maxWidth: 420,
  backgroundColor: "background.paper",
  color: "text.primary",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "20px",
  boxShadow: "none",
};

export const authCardContentSx = {
  p: 4,
};

export const authTitleSx = {
  fontSize: "1.8rem",
  fontWeight: 700,
  mb: 1,
};

export const authSubtitleSx = {
  color: "text.secondary",
  mb: 3,
};

export const authErrorSx = {
  mb: 2,
  borderRadius: "12px",
};

export const authButtonSx = {
  textTransform: "none",
  borderRadius: "12px",
  fontWeight: 700,
  backgroundColor: "primary.main",
  color: "background.default",
  "&:hover": {
    backgroundColor: "primary.light",
  },
};

export const authSpinnerSx = {
  color: "primary.main",
};

export const authButtonSpinnerSx = {
  color: "background.default",
};