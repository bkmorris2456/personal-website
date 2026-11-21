import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  Button,
  Divider,
  Pagination,
} from "@mui/material";

import { useMemo, useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import {
  tableCardSx,
  tableCardContentSx,
  tableHeaderContainerSx,
  tableTitleSx,
  tableSubtitleSx,
  tableAddButtonSx,
  tableDividerSx,
  tableColumnHeaderSx,
  tableRowPrimaryTextSx,
  tableRowTextSx,
  tableStatusSx,
  tableIconButtonSx,
  tableFooterButtonSx,
  tablePaginationSx,
} from "../styles/dashboardStyles";

const ACTIONS_WIDTH = "92px";

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

  const gridTemplateColumns = `repeat(${dataHeaders.length}, minmax(0, 1fr)) ${ACTIONS_WIDTH}`;

  const tableCellSx = {
    minWidth: 0,
    pr: { xs: 0.75, sm: 2 },
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
  };

  return (
    <Card sx={tableCardSx}>
      <CardContent sx={tableCardContentSx}>
        {/* Top Header */}
        <Box sx={tableHeaderContainerSx}>
          <Box>
            <Typography component="h2" sx={tableTitleSx}>
              {title}
            </Typography>

            {subtitle && (
              <Typography sx={tableSubtitleSx}>
                {subtitle}
              </Typography>
            )}
          </Box>

          <Button
            startIcon={<AddRoundedIcon />}
            onClick={onAdd}
            disabled={addDisabled}
            sx={tableAddButtonSx}
          >
            Add
          </Button>
        </Box>

        <Divider sx={tableDividerSx} />

        {/* Column Headers */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2 },
            pt: 2,
            pb: 1.5,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns,
              alignItems: "center",
            }}
          >
            {dataHeaders.map((header) => (
              <Box key={header} sx={tableCellSx}>
                <Typography sx={tableColumnHeaderSx}>
                  {header}
                </Typography>
              </Box>
            ))}

            <Box sx={{ width: ACTIONS_WIDTH, textAlign: "right" }}>
              <Typography sx={tableColumnHeaderSx}>
                ACTIONS
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Scrollable Body */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2 },
            pb: 2,
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--input-border) transparent",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "var(--input-border)",
              borderRadius: "999px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "var(--muted)",
            },
          }}
        >
          {rows.length === 0 ? (
            <Typography
              sx={{
                color: "var(--muted)",
                py: 2,
              }}
            >
              {emptyMessage}
            </Typography>
          ) : (
            paginatedRows.map((row, index) => (
              <Box key={row.id ?? index}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns,
                    alignItems: "start",
                    py: 1.4,
                  }}
                >
                  {row.columns.map((value, valueIndex) => (
                    <Box
                      key={`${row.id}-${valueIndex}`}
                      sx={tableCellSx}
                    >
                      <Typography
                        sx={
                          valueIndex === 0
                            ? tableRowPrimaryTextSx
                            : dataHeaders[valueIndex] === "STATUS" && value
                              ? tableStatusSx
                              : tableRowTextSx
                        }
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
                        sx={tableIconButtonSx}
                        aria-label={`Edit ${row.columns[0]}`}
                        onClick={() => onEdit?.(row.raw)}
                        disabled={!onEdit}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        sx={tableIconButtonSx}
                        aria-label={`Delete ${row.columns[0]}`}
                        onClick={() => onDelete?.(row.raw)}
                        disabled={!onDelete}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                </Box>

                {index !== paginatedRows.length - 1 && (
                  <Divider
                    sx={{
                      borderColor: "var(--border)",
                    }}
                  />
                )}
              </Box>
            ))
          )}
        </Box>

        <Divider sx={tableDividerSx} />

        {/* Footer */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2 },
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          <Button
            onClick={onViewAll}
            sx={tableFooterButtonSx}
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
              sx={tablePaginationSx}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}