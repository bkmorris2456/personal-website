import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import {
  modalTitleSx,
  modalActionsSx,
  viewAllModalPaperSx,
  viewAllModalContentSx,
  viewAllTableContainerSx,
  viewAllTableHeaderCellSx,
  viewAllTablePrimaryCellSx,
  viewAllTableCellSx,
  viewAllCloseButtonSx,
} from "../styles/dashboardStyles";

export function ViewAllModal({ open, title, headers, rows, onClose, mode, transitionDuration }) {
  return (
    <Dialog
      className="ursus-dialog"
      data-mode={mode}
      transitionDuration={transitionDuration}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: viewAllModalPaperSx,
      }}
    >
      <DialogTitle sx={modalTitleSx}>
        {title}
      </DialogTitle>

      <DialogContent sx={viewAllModalContentSx}>
        <TableContainer
          component={Paper}
          sx={viewAllTableContainerSx}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={viewAllTableHeaderCellSx}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length === 0 && (
                <TableRow><TableCell colSpan={headers.length} sx={viewAllTableCellSx}>No records yet.</TableCell></TableRow>
              )}
              {rows.map((row, index) => (
                <TableRow key={row.id ?? index}>
                  {row.columns.map((value, valueIndex) => (
                    <TableCell
                      key={`${row.id}-${valueIndex}`}
                      sx={
                        valueIndex === 0
                          ? viewAllTablePrimaryCellSx
                          : viewAllTableCellSx
                      }
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={modalActionsSx}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={viewAllCloseButtonSx}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}