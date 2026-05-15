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
      <CardContent
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            width: "100%",
          }}
        >
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              textAlign: "left",
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                color: "#f3f3f3",
                fontWeight: 700,
                fontSize: "2rem",
                lineHeight: 1,
                mb: 0.5,
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                color: "#f3f3f3",
                fontWeight: 600,
                fontSize: "1rem",
                lineHeight: 1.2,
                mb: 0.35,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                ...mutedText,
                fontSize: "0.9rem",
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}