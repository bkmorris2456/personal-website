import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

// Dashboard Feature Imports
import { dashboardCardSx } from "../styles/dashboardStyles";

export function StatCard({ title, value, icon }) {
  return (
    <Card sx={{ ...dashboardCardSx, height: "100%" }}>
      <CardContent
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 54,
              height: 54,
              minWidth: 54,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6BA36E",
              backgroundColor: "rgba(107,163,110,0.08)",
              border: "1px solid rgba(107,163,110,0.18)",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>

          <Stack
            direction="row"
            spacing={1.2}
            alignItems="baseline"
          >
            <Typography
              sx={{
                color: "#f3f3f3",
                fontWeight: 800,
                fontSize: "2.4rem",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                color: "#d9d9d9",
                fontWeight: 700,
                fontSize: "1.55rem",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}