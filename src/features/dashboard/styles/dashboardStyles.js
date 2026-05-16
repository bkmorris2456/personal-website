export const dashboardCardSx = {
  backgroundColor: "#0b0b0b",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "20px",
  boxShadow: "none",
};

export const mutedText = {
  color: "rgba(255,255,255,0.58)",
};

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

export const modalPaperSx = {
  backgroundColor: "#0b0b0b",
  color: "#f3f3f3",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
};