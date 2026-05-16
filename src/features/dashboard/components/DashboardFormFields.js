import {
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { inputSx } from "../styles/dashboardStyles";

import {
  projectStatusOptions,
  skillCategoryOptions,
} from "../config/dashboardConfig";

import { SingleSelectTags } from "./SingleSelectTags";

export function DashboardFormFields({
  entity,
  formState,
  handleFormChange,
}){

  if(!entity) return null;

  switch (entity) {
    case "position":
      return (
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={formState.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            fullWidth
            sx={inputSx}
          />

          <TextField
            label="Company"
            value={formState.company}
            onChange={(e) => handleFormChange("company", e.target.value)}
            fullWidth
            sx={inputSx}
          />

          <TextField
            label="Location"
            value={formState.location}
            onChange={(e) => handleFormChange("location", e.target.value)}
            fullWidth
            sx={inputSx}
          />

          <TextField
            label="Start Date"
            type="date"
            value={formState.start}
            onChange={(e) => handleFormChange("start", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={inputSx}
          />

          <TextField
            label="End Date"
            type="date"
            value={formState.end}
            onChange={(e) => handleFormChange("end", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={inputSx}
          />

          <TextField
            label="Description"
            value={formState.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            fullWidth
            multiline
            minRows={4}
            sx={inputSx}
          />
        </Stack>
      );

    case "project":
      return (
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Project Title"
            value={formState.title}
            onChange={(e) => handleFormChange("title", e.target.value)}
            fullWidth
            sx={inputSx}
          />

          <TextField
            label="Tech Stack"
            value={formState.stack}
            onChange={(e) => handleFormChange("stack", e.target.value)}
            fullWidth
            sx={inputSx}
          />

          <Box>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}>
              Status
            </Typography>
            <SingleSelectTags
              options={projectStatusOptions}
              value={formState.status}
              onChange={(value) => handleFormChange("status", value)}
            />
          </Box>

          <TextField
            label="Description"
            value={formState.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            fullWidth
            multiline
            minRows={4}
            sx={inputSx}
          />
        </Stack>
      );

    case "skill":
      return (
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Skill Name"
            value={formState.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            fullWidth
            sx={inputSx}
          />

          <Box>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}>
              Category
            </Typography>
            <SingleSelectTags
              options={skillCategoryOptions}
              value={formState.category}
              onChange={(value) => handleFormChange("category", value)}
            />
          </Box>
        </Stack>
      );

    default:
      return null;
  }
}