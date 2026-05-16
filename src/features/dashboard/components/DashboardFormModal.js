import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { modalPaperSx } from "../styles/dashboardStyles";
import { getItemLabel } from "../utils/dashboardUtils";

export function DashboardFormModal({
  open,
  modalState,
  modalTitle,
  modalActionText,
  modalLoading,
  onClose,
  onSubmit,
  renderFields,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: modalPaperSx,
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>{modalTitle}</DialogTitle>

      <DialogContent>
        {modalState.mode === "delete" ? (
          <Typography sx={{ color: "rgba(255,255,255,0.72)", mt: 1 }}>
            Are you sure you want to delete{" "}
            <Box component="span" sx={{ color: "#f3f3f3", fontWeight: 700 }}>
              {getItemLabel(modalState.entity, modalState.selectedItem)}
            </Box>
            ?
          </Typography>
        ) : (
          renderFields?.()
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "rgba(255,255,255,0.72)",
            textTransform: "none",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={modalLoading}
          color={modalState.mode === "delete" ? "error" : "primary"}
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            fontWeight: 700,
            backgroundColor:
              modalState.mode === "delete" ? undefined : "#6BA36E",
            color: modalState.mode === "delete" ? undefined : "#050505",
            "&:hover":
              modalState.mode === "delete"
                ? undefined
                : {
                    backgroundColor: "#7ab47d",
                  },
          }}
        >
          {modalActionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}