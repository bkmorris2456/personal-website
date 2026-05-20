// ===== Page Layout =====

export const dashboardPageSx = {
  minHeight: "100vh",
  backgroundColor: "#050505",
  px: { xs: 2, md: 4, lg: 6 },
  py: { xs: 3, md: 4 },
};

export const dashboardHeaderSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  mb: 2,
};

export const returnButtonSx = {
  color: "#6BA36E",
  textTransform: "none",
  fontWeight: 700,
  mb: 2,
  px: 0,
  minWidth: "unset",
  justifyContent: "flex-start",

  "&:hover": {
    backgroundColor: "transparent",
    color: "#7ab47d",
  },
};

export const dashboardTitleSx = {
  color: "#f3f3f3",
  fontSize: {
    xs: "2rem",
    md: "2.4rem",
  },
  fontWeight: 700,
  letterSpacing: "-0.03em",
  textAlign: "left",
  width: "100%",
};

export const loadingContainerSx = {
  minHeight: "50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const loadingSpinnerSx = {
  color: "#6BA36E",
};

// ===== Shared Components =====

export const dashboardCardSx = {
  backgroundColor: "#0b0b0b",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "20px",
  boxShadow: "none",
};

export const mutedText = {
  color: "rgba(255,255,255,0.58)",
};

// ===== Inputs / Forms =====

export const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#f3f3f3",
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.02)",

    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
    },

    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.18)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#6BA36E",
    },
  },

  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.6)",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6BA36E",
  },
};

// ===== Modals =====

export const modalPaperSx = {
  backgroundColor: "#0b0b0b",
  color: "#f3f3f3",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
};

export const formFieldsStackSx = {
  mt: 1,
};

export const formFieldLabelSx = {
  color: "rgba(255,255,255,0.6)",
  mb: 1,
};

// ===== Modal Content =====

export const modalTitleSx = {
  fontWeight: 700,
};

export const modalDescriptionSx = {
  color: "rgba(255,255,255,0.72)",
  mt: 1,
};

export const modalHighlightedTextSx = {
  color: "#f3f3f3",
  fontWeight: 700,
};

export const modalActionsSx = {
  px: 3,
  pb: 3,
};

export const modalCancelButtonSx = {
  color: "rgba(255,255,255,0.72)",
  textTransform: "none",
};

export const modalSubmitButtonSx = (isDelete = false) => ({
  textTransform: "none",
  borderRadius: "12px",
  fontWeight: 700,

  ...(isDelete
    ? {}
    : {
        backgroundColor: "#6BA36E",
        color: "#050505",

        "&:hover": {
          backgroundColor: "#7ab47d",
        },
      }),
});

// ===== Tag Selection =====

export const selectTagsContainerSx = {
  flexWrap: "wrap",
};

export const selectTagChipSx = (selected = false) => ({
  color: selected ? "#050505" : "#f3f3f3",

  backgroundColor: selected
    ? "#6BA36E"
    : "rgba(255,255,255,0.04)",

  border: selected
    ? "1px solid #6BA36E"
    : "1px solid rgba(255,255,255,0.12)",

  fontWeight: 600,

  "&:hover": {
    backgroundColor: selected
      ? "#7ab47d"
      : "rgba(255,255,255,0.08)",
  },
});

// ===== Stat Cards =====

export const statCardSx = {
  ...dashboardCardSx,
  height: "100%",
};

export const statCardContentSx = {
  p: 3,
  height: "100%",
  display: "flex",
  alignItems: "center",
};

export const statCardIconSx = {
  width: 54,
  height: 54,
  minWidth: 54,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6BA36E",
  backgroundColor: "rgba(107,163,110,0.08)",
  border: "1px solid rgba(107,163,110,0.18)",
  flexShrink: 0,
};

export const statCardValueSx = {
  color: "#f3f3f3",
  fontWeight: 800,
  fontSize: "2.4rem",
  lineHeight: 1,
  letterSpacing: "-0.04em",
};

export const statCardTitleSx = {
  color: "#d9d9d9",
  fontWeight: 700,
  fontSize: "1.55rem",
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
};

// ===== Table Cards =====

export const tableCardSx = {
  ...dashboardCardSx,
  height: "100%",
  minHeight: 520,
  display: "flex",
};

export const tableCardContentSx = {
  p: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
};

export const tableHeaderContainerSx = {
  p: 3,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 2,
  flexShrink: 0,
};

export const tableTitleSx = {
  color: "#f3f3f3",
  fontWeight: 700,
  fontSize: "1.3rem",
};

export const tableSubtitleSx = {
  ...mutedText,
  fontSize: "0.92rem",
};

export const tableAddButtonSx = (disabled = false) => ({
  color: disabled
    ? "rgba(255,255,255,0.35)"
    : "#6BA36E",

  textTransform: "none",
  borderRadius: "12px",
  border: "1px solid rgba(107,163,110,0.18)",
  backgroundColor: "rgba(107,163,110,0.06)",
  px: 1.6,
  whiteSpace: "nowrap",
  flexShrink: 0,
});

export const tableDividerSx = {
  borderColor: "rgba(255,255,255,0.06)",
  flexShrink: 0,
};

export const tableColumnHeaderSx = {
  color: "rgba(255,255,255,0.42)",
  fontSize: "0.74rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textAlign: "left",
};

export const tableRowPrimaryTextSx = {
  color: "#f3f3f3",
  fontSize: "0.92rem",
  lineHeight: 1.4,
  textAlign: "left",
  width: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export const tableRowTextSx = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.92rem",
  lineHeight: 1.4,
  textAlign: "left",
  width: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export const tableIconButtonSx = {
  color: "rgba(255,255,255,0.65)",
};

export const tableFooterButtonSx = {
  color: "#6BA36E",
  textTransform: "none",
  fontSize: "0.92rem",
  fontWeight: 500,
  px: 0,
  minWidth: "unset",
};

export const tablePaginationSx = {
  "& .MuiPaginationItem-root": {
    color: "rgba(255,255,255,0.7)",
  },

  "& .Mui-selected": {
    backgroundColor:
      "rgba(107,163,110,0.22) !important",

    color: "#6BA36E",
  },
};

// ===== View All Modal =====

export const viewAllModalPaperSx = {
  ...modalPaperSx,
  maxHeight: "80vh",
};

export const viewAllModalContentSx = {
  maxHeight: "60vh",
  overflow: "auto",
};

export const viewAllTableContainerSx = {
  backgroundColor: "transparent",
  boxShadow: "none",
  overflowX: "auto",
};

export const viewAllTableHeaderCellSx = {
  backgroundColor: "#0b0b0b",
  color: "rgba(255,255,255,0.55)",
  borderColor: "rgba(255,255,255,0.08)",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

export const viewAllTablePrimaryCellSx = {
  color: "#f3f3f3",
  borderColor: "rgba(255,255,255,0.06)",
  whiteSpace: "nowrap",
};

export const viewAllTableCellSx = {
  color: "rgba(255,255,255,0.65)",
  borderColor: "rgba(255,255,255,0.06)",
  whiteSpace: "nowrap",
};

export const viewAllCloseButtonSx = {
  textTransform: "none",
  borderRadius: "12px",
  fontWeight: 700,
  backgroundColor: "#6BA36E",
  color: "#050505",

  "&:hover": {
    backgroundColor: "#7ab47d",
  },
};