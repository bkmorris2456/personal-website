import {
  Box,
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

const ACTIONS_WIDTH = "88px";

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
  const dataHeaders = headers.slice(0, headers.length - 1);

  return (
    <Card
      sx={{
        ...dashboardCardSx,
        height: "100%",
        minHeight: 520,
        display: "flex",
      }}
    >
      <CardContent
        sx={{
          p: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexShrink: 0,
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
              flexShrink: 0,
            }}
          >
            Add
          </Button>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", flexShrink: 0 }} />

        {/* Column Headers */}
        <Box
          sx={{
            px: 3,
            pt: 2,
            pb: 1.5,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${dataHeaders.length}, minmax(0, 1fr)) ${ACTIONS_WIDTH}`,
              alignItems: "center",
            }}
          >
            {dataHeaders.map((header) => (
              <Box key={header} sx={{ minWidth: 0, pr: 2 }}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.42)",
                    fontSize: "0.74rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textAlign: "left",
                  }}
                >
                  {header}
                </Typography>
              </Box>
            ))}

            <Box sx={{ width: ACTIONS_WIDTH, textAlign: "right" }}>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.42)",
                  fontSize: "0.74rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                ACTIONS
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Scrollable Body */}
        <Box
          sx={{
            px: 3,
            pb: 2,
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.2) transparent",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,0.16)",
              borderRadius: "999px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(255,255,255,0.24)",
            },
          }}
        >
          {rows.length === 0 ? (
            <Typography sx={{ color: "rgba(255,255,255,0.45)", py: 2 }}>
              {emptyMessage}
            </Typography>
          ) : (
            rows.map((row, index) => (
              <Box key={row.id ?? index}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${dataHeaders.length}, minmax(0, 1fr)) ${ACTIONS_WIDTH}`,
                    alignItems: "start",
                    py: 1.4,
                  }}
                >
                  {row.columns.map((value, valueIndex) => (
                    <Box key={`${row.id}-${valueIndex}`} sx={{ minWidth: 0, pr: 2 }}>
                      <Typography
                        sx={{
                          color: valueIndex === 0 ? "#f3f3f3" : "rgba(255,255,255,0.6)",
                          fontSize: "0.92rem",
                          textAlign: "left",
                          lineHeight: 1.4,
                          overflowWrap: "anywhere",
                          wordBreak: "break-word",
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}

                  <Box
                    sx={{
                      width: ACTIONS_WIDTH,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
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
                  </Box>
                </Box>

                {index !== rows.length - 1 && (
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
                )}
              </Box>
            ))
          )}
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", flexShrink: 0 }} />

        {/* Footer */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#6BA36E",
            flexShrink: 0,
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