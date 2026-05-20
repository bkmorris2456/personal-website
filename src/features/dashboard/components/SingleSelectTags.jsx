import { Stack, Chip } from "@mui/material";

import {
  selectTagsContainerSx,
  selectTagChipSx,
} from "../styles/dashboardStyles";

export function SingleSelectTags({
  options,
  value,
  onChange,
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={selectTagsContainerSx}
    >
      {options.map((option) => {
        const selected = value === option;

        return (
          <Chip
            key={option}
            label={option}
            onClick={() => onChange(option)}
            sx={selectTagChipSx(selected)}
          />
        );
      })}
    </Stack>
  );
}