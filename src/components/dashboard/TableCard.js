import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  Button,
  Divider,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const dashboardCardSx = {
  backgroundColor: "#0b0b0b",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "20px",
  boxShadow: "none",
};

const mutedText = {
  color: "rgba(255,255,255,0.58)",
};

export function TableCard({
  title,
  subtitle,
  headers,
  rows,
  viewAllText,
  onAdd,
  onEdit,
  onDelete,
  emptyMessage = "No records yet.",
  addDisabled = false,
}) {
  return (
    <Card sx={{ ...dashboardCardSx, height: "100%" }}>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography sx={{ color: "#f3f3f3", fontWeight: 700, fontSize: "1.3rem" }}>
              {title}
            </Typography>
            <Typography sx={{ ...mutedText, fontSize: "0.92rem" }}>
              {subtitle}
            </Typography>
          </Box>

          <Button
            startIcon={<AddRoundedIcon />}
            onClick={onAdd}
            disabled={addDisabled}
            sx={{
              color: addDisabled ? "rgba(255,255,255,0.35)" : "#6BA36E",
              textTransform: "none",
              borderRadius: "12px",
              border: "1px solid rgba(107,163,110,0.18)",
              backgroundColor: "rgba(107,163,110,0.06)",
              px: 1.6,
              whiteSpace: "nowrap",
            }}
          >
            Add
          </Button>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

        <Box sx={{ px: 3, py: 2 }}>
          <Grid container sx={{ mb: 1.5 }}>
            {headers.map((header) => (
              <Grid item xs key={header}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.42)",
                    fontSize: "0.74rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {header}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {rows.length === 0 ? (
            <Typography sx={{ color: "rgba(255,255,255,0.45)", py: 2 }}>
              {emptyMessage}
            </Typography>
          ) : (
            rows.map((row, index) => (
              <Box key={row.id ?? index}>
                <Grid container alignItems="center" sx={{ py: 1.4 }}>
                  {row.columns.map((value, valueIndex) => (
                    <Grid item xs key={`${row.id}-${valueIndex}`}>
                      <Typography
                        sx={{
                          color: valueIndex === 0 ? "#f3f3f3" : "rgba(255,255,255,0.6)",
                          fontSize: "0.92rem",
                          pr: 1,
                        }}
                      >
                        {value}
                      </Typography>
                    </Grid>
                  ))}

                  <Grid item xs>
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        size="small"
                        sx={{ color: "rgba(255,255,255,0.65)" }}
                        onClick={() => onEdit?.(row.raw)}
                        disabled={!onEdit}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        sx={{ color: "rgba(255,255,255,0.65)" }}
                        onClick={() => onDelete?.(row.raw)}
                        disabled={!onDelete}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>

                {index !== rows.length - 1 && (
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
                )}
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#6BA36E",
          }}
        >
          <Typography sx={{ fontSize: "0.92rem", fontWeight: 500 }}>
            {viewAllText}
          </Typography>
          <ChevronRightRoundedIcon fontSize="small" />
        </Box>
      </CardContent>
    </Card>
  );
}