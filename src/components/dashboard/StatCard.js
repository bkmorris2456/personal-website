import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

const dashboardCardSx = {
  backgroundColor: "#0b0b0b",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "20px",
  boxShadow: "none",
};

const mutedText = {
  color: "rgba(255,255,255,0.58)",
};

export function StatCard({ title, value, subtitle, icon }) {
  return (
    <Card sx={{ ...dashboardCardSx, height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6BA36E",
              backgroundColor: "rgba(107,163,110,0.08)",
              border: "1px solid rgba(107,163,110,0.18)",
            }}
          >
            {icon}
          </Box>

          <Box>
            <Typography
              sx={{
                color: "#f3f3f3",
                fontWeight: 700,
                fontSize: "2rem",
                lineHeight: 1,
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                color: "#f3f3f3",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              {title}
            </Typography>

            <Typography sx={{ ...mutedText, fontSize: "0.9rem" }}>
              {subtitle}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}