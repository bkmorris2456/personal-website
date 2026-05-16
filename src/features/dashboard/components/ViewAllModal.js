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

import { modalPaperSx } from "../styles/dashboardStyles";

export function ViewAllModal({ open, title, headers, rows, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          ...modalPaperSx,
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>

      <DialogContent
        sx={{
          maxHeight: "60vh",
          overflow: "auto",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            overflowX: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: "#0b0b0b",
                      color: "rgba(255,255,255,0.55)",
                      borderColor: "rgba(255,255,255,0.08)",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.id ?? index}>
                  {row.columns.map((value, valueIndex) => (
                    <TableCell
                      key={`${row.id}-${valueIndex}`}
                      sx={{
                        color:
                          valueIndex === 0
                            ? "#f3f3f3"
                            : "rgba(255,255,255,0.65)",
                        borderColor: "rgba(255,255,255,0.06)",
                        whiteSpace: "nowrap",
                      }}
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

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            fontWeight: 700,
            backgroundColor: "#6BA36E",
            color: "#050505",
            "&:hover": {
              backgroundColor: "#7ab47d",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}