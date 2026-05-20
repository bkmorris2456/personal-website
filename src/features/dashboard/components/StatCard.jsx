import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import {
  statCardSx,
  statCardContentSx,
  statCardIconSx,
  statCardValueSx,
  statCardTitleSx,
} from "../styles/dashboardStyles";

export function StatCard({ title, value, icon }) {
  return (
    <Card sx={statCardSx}>
      <CardContent sx={statCardContentSx}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={statCardIconSx}>
            {icon}
          </Box>

          <Stack direction="row" spacing={1.2} alignItems="baseline">
            <Typography sx={statCardValueSx}>
              {value}
            </Typography>

            <Typography sx={statCardTitleSx}>
              {title}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}