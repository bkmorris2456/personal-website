const text = "var(--text)";
const muted = "var(--muted)";
const accent = "var(--accent-text)";
const border = "var(--border)";
const surface = "var(--charcoal)";
const elevated = "var(--graphite)";
const displayFont = "ClashDisplay, Satoshi, sans-serif";

const focusSx = {
  "&:focus-visible, &.Mui-focusVisible": {
    outline: "2px solid var(--focus)",
    outlineOffset: 2,
  },
};
const buttonSx = {
  ...focusSx,
  minHeight: 44,
  borderRadius: ".5rem",
  fontWeight: 700,
  textTransform: "none",
  transition: "background var(--quick) var(--ease), border-color var(--quick) var(--ease)",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
};
const secondaryButtonSx = {
  ...buttonSx,
  color: text,
  border: "1px solid var(--input-border)",
  "&:hover": { bgcolor: elevated, borderColor: accent },
};
const primaryButtonSx = {
  ...buttonSx,
  bgcolor: "var(--nordic)",
  color: "var(--action-text)",
  boxShadow: "none",
  "&:hover": { bgcolor: "var(--sage)", color: "var(--on-sage)", boxShadow: "none" },
};

export const dashboardPageSx = { py: { xs: 3, md: 4 } };
export const dashboardHeaderSx = { mb: 3, display: "grid", gap: 0.5 };
export const dashboardTitleSx = { fontFamily: displayFont, fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: 700 };
export const loadingContainerSx = { minHeight: "35vh", display: "grid", placeItems: "center" };

export const dashboardCardSx = {
  bgcolor: surface,
  backgroundImage: "none",
  color: text,
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  boxShadow: "none",
};
export const mutedText = { color: muted };
export const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: text,
    borderRadius: ".5rem",
    bgcolor: "var(--obsidian)",
    "& fieldset": { borderColor: "var(--input-border)" },
    "&:hover fieldset": { borderColor: accent },
    "&.Mui-focused fieldset": { borderColor: "var(--focus)" },
  },
  "& .MuiInputLabel-root": { color: muted },
  "& .MuiInputLabel-root.Mui-focused": { color: accent },
};

export const modalPaperSx = {
  ...dashboardCardSx,
  m: { xs: 1, sm: 4 },
  width: { xs: "calc(100% - 16px)", sm: undefined },
  "& .MuiDialogContent-root": { px: { xs: 2, sm: 3 } },
};
export const formFieldsStackSx = { mt: 1 };
export const formFieldLabelSx = { color: muted, mb: 1, fontWeight: 700 };
export const modalTitleSx = { fontFamily: displayFont, fontWeight: 700 };
export const modalDescriptionSx = { color: muted, mt: 1 };
export const modalHighlightedTextSx = { color: text, fontWeight: 700 };
export const modalActionsSx = { px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } };
export const modalCancelButtonSx = secondaryButtonSx;
export const modalSubmitButtonSx = (isDelete) => isDelete
  ? { ...secondaryButtonSx, color: "var(--danger)", bgcolor: "var(--danger-bg)",
      "&:hover": { bgcolor: "var(--danger-bg)", borderColor: "var(--danger)" } }
  : primaryButtonSx;

export const dashboardFeedbackSx = (isError) => ({
  mb: 2,
  border: "1px solid",
  borderColor: isError ? "var(--danger)" : border,
  borderRadius: "var(--radius)",
  bgcolor: isError ? "var(--danger-bg)" : elevated,
  color: isError ? "var(--danger)" : text,
  "& .MuiAlert-icon": { color: isError ? "var(--danger)" : accent },
});
export const selectTagsContainerSx = { flexWrap: "wrap" };
export const selectTagChipSx = (selected) => ({
  ...focusSx,
  minHeight: 44,
  fontWeight: 700,
  color: selected ? "var(--action-text)" : text,
  bgcolor: selected ? "var(--nordic)" : surface,
  border: "1px solid",
  borderColor: selected ? "var(--nordic)" : "var(--input-border)",
  "&:hover, &.Mui-focusVisible": {
    bgcolor: selected ? "var(--sage)" : elevated,
    color: selected ? "var(--on-sage)" : text,
  },
});

export const statCardSx = { ...dashboardCardSx, height: "100%" };
export const statCardContentSx = { p: 2, "&:last-child": { pb: 2 } };
export const statCardIconSx = {
  width: 44, height: 44, flexShrink: 0, borderRadius: ".5rem",
  display: "grid", placeItems: "center", color: accent, bgcolor: elevated,
};
export const statCardValueSx = { color: text, fontFamily: displayFont, fontWeight: 700, fontSize: "1.9rem", lineHeight: 1 };
export const statCardTitleSx = { color: muted, fontWeight: 700, fontSize: ".95rem", lineHeight: 1.3 };

export const tableCardSx = { ...dashboardCardSx, height: "100%", display: "flex", minWidth: 0 };
export const tableCardContentSx = { p: 0, "&:last-child": { pb: 0 }, width: "100%", display: "flex", flexDirection: "column" };
export const tableHeaderContainerSx = {
  p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexShrink: 0,
};
export const tableTitleSx = { color: text, fontFamily: displayFont, fontWeight: 700, "&&": { fontSize: "1.35rem" } };
export const tableSubtitleSx = { ...mutedText, fontSize: ".9375rem" };
export const tableAddButtonSx = { ...secondaryButtonSx, whiteSpace: "nowrap", flexShrink: 0, px: 1.25 };
export const tableDividerSx = { borderColor: border, flexShrink: 0 };
export const tableColumnHeaderSx = { color: muted, fontSize: ".8125rem", fontWeight: 700, textAlign: "left", overflowWrap: "anywhere" };
export const tableRowPrimaryTextSx = {
  color: text, fontSize: ".9375rem", lineHeight: 1.4, textAlign: "left", overflowWrap: "anywhere",
};
export const tableRowTextSx = { ...tableRowPrimaryTextSx, color: muted };
export const tableStatusSx = {
  ...tableRowTextSx, bgcolor: elevated, color: text, borderRadius: "999px",
  px: { xs: 0.5, sm: 1 }, py: 0.25, fontSize: ".8125rem",
};
export const tableIconButtonSx = {
  ...focusSx, minWidth: 44, minHeight: 44, borderRadius: ".5rem", color: muted,
  "&:hover": { bgcolor: elevated, color: text },
};
export const tableFooterButtonSx = { ...buttonSx, color: accent, px: 0, minWidth: 0 };
export const tablePaginationSx = {
  "& .MuiPaginationItem-root": { ...focusSx, color: muted },
  "& .MuiPaginationItem-root.Mui-selected": { bgcolor: elevated, color: accent },
};

export const viewAllModalPaperSx = { ...modalPaperSx, maxHeight: "85dvh" };
export const viewAllModalContentSx = { maxHeight: "65dvh", overflow: "auto" };
export const viewAllTableContainerSx = { bgcolor: "transparent", boxShadow: "none", overflowX: "auto" };
export const viewAllTableHeaderCellSx = { bgcolor: surface, color: muted, borderColor: border, fontWeight: 700, whiteSpace: "nowrap" };
export const viewAllTableCellSx = { color: muted, borderColor: border, overflowWrap: "anywhere" };
export const viewAllTablePrimaryCellSx = { ...viewAllTableCellSx, color: text };
export const viewAllCloseButtonSx = primaryButtonSx;
