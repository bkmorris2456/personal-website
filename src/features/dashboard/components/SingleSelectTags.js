import { Stack, Chip } from "@mui/material";

export function SingleSelectTags({ options, value, onChange }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {options.map((option) => {
        const selected = value === option;

        return (
          <Chip
            key={option}
            label={option}
            onClick={() => onChange(option)}
            sx={{
              color: selected ? "#050505" : "#f3f3f3",
              backgroundColor: selected
                ? "#6BA36E"
                : "rgba(255,255,255,0.04)",
              border: selected
                ? "1px solid #6BA36E"
                : "1px solid rgba(255,255,255,0.12)",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: selected
                  ? "#7ab47d"
                  : "rgba(255,255,255,0.08)",
              },
            }}
          />
        );
      })}
    </Stack>
  );
}