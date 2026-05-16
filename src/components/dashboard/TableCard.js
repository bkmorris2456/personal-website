import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  Button,
  Divider,
  Pagination
} from "@mui/material";
import { useMemo, useState } from "react";

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
  onViewAll,
  onAdd,
  onEdit,
  onDelete,
  emptyMessage = "No records yet.",
  addDisabled = false,
  rowsPerPage = 5,
}) {
  const dataHeaders = headers.slice(0, headers.length - 1);

  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [rows, page, rowsPerPage]);

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
            paginatedRows.map((row, index) => (
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

                {index !== paginatedRows.length - 1 && (
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
            gap: 2,
            color: "#6BA36E",
            flexShrink: 0,
          }}
        >
          <Button
            onClick={onViewAll}
            sx={{
              color: "#6BA36E",
              textTransform: "none",
              fontSize: "0.92rem",
              fontWeight: 500,
              px: 0,
              minWidth: "unset",
            }}
            endIcon={<ChevronRightRoundedIcon fontSize="small" />}
          >
            {viewAllText}
          </Button>

          {pageCount > 1 && (
            <Pagination
              count={pageCount}
              page={page}
              onChange={(e, value) => setPage(value)}
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "rgba(255,255,255,0.7)",
                },
                "& .Mui-selected": {
                  backgroundColor: "rgba(107,163,110,0.22) !important",
                  color: "#6BA36E",
                },
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}