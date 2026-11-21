import {
  Box,
  Alert,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import {
  modalPaperSx,
  modalTitleSx,
  modalDescriptionSx,
  modalHighlightedTextSx,
  modalActionsSx,
  modalCancelButtonSx,
  modalSubmitButtonSx,
  dashboardFeedbackSx,
} from "../styles/dashboardStyles";
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
  mode,
  transitionDuration,
  error,
}) {
  return (
    <Dialog
      className="ursus-dialog"
      data-mode={mode}
      transitionDuration={transitionDuration}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: modalPaperSx,
      }}
    >
      <DialogTitle sx={modalTitleSx}>{modalTitle}</DialogTitle>

      <DialogContent>
        {error && <Alert severity="error" sx={dashboardFeedbackSx(true)}>{error}</Alert>}
        {modalState.mode === "delete" ? (
          <Typography sx={modalDescriptionSx}>
            Are you sure you want to delete{" "}
            <Box component="span" sx={modalHighlightedTextSx}>
              {getItemLabel(modalState.entity, modalState.selectedItem)}
            </Box>
            ?
          </Typography>
        ) : (
          renderFields?.()
        )}
      </DialogContent>

      <DialogActions sx={modalActionsSx}>
        <Button
          onClick={onClose}
          sx={modalCancelButtonSx}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={modalLoading}
          color={modalState.mode === "delete" ? "error" : "primary"}
          sx={modalSubmitButtonSx(
            modalState.mode === "delete"
          )}
        >
          {modalActionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}