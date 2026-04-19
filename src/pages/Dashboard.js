import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";

// Icon Imports
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CircleIcon from "@mui/icons-material/Circle";

// Firebase Imports
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getPositions, getProjects, getSkills } from "../firebase/firestoreService";

// Component Imports
import { StatCard } from "../components/dashboard/StatCard";
import { TableCard } from "../components/dashboard/TableCard";

// Dashboard Styling variables
const dashboardCardSx = {
  backgroundColor: "#0b0b0b",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "20px",
  boxShadow: "none",
};

const mutedText = {
  color: "rgba(255,255,255,0.58)",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#f3f3f3",
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.02)",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.18)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6BA36E",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.6)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#6BA36E",
  },
};

const modalPaperSx = {
  backgroundColor: "#0b0b0b",
  color: "#f3f3f3",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
};

const collectionMap = {
  position: "positions",
  project: "projects",
  skill: "skills",
};

const emptyForms = {
  position: {
    title: "",
    company: "",
    description: "",
    location: "",
    start: "",
    end: "",
  },
  project: {
    title: "",
    stack: "",
    description: "",
    date: "",
    status: "",
  },
  skill: {
    name: "",
    category: "",
  },
};

// Formats datetime to something readable
function formatDate(value) {
  if (!value) return "Present";

  try {
    const date = value?.toDate ? value.toDate() : new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    return "";
  }
}

// Utility formatter, converting date value to HTML string compatible with HTML date inputs
function formatDateForInput(value) {
  if (!value) return "";

  try {
    const date = value?.toDate ? value.toDate() : new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    return "";
  }
}

// Takes date string from input, converts to Firestore Timestamp
function toTimestamp(dateString) {
  if (!dateString) return null;

  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  return Timestamp.fromDate(date);
}

function getEditFormValues(entity, item) {
  switch (entity) {
    case "position":
      return {
        title: item.title || "",
        company: item.company || "",
        description: Array.isArray(item.description)
          ? item.description.join("\n")
          : item.description || "",
        location: item.location || "",
        start: formatDateForInput(item.start),
        end: formatDateForInput(item.end),
      };

    case "project":
      return {
        title: item.title || item.project || "",
        stack: item.stack || item.techStack || item.technologies || "",
        description: Array.isArray(item.description)
          ? item.description.join("\n")
          : item.description || "",
        date: formatDateForInput(item.date || item.createdAt),
        status: item.status || "",
      };

    case "skill":
      return {
        name: item.name || item.skill || "",
        category: item.category || "",
      };

    default:
      return {};
  }
}

function getEntityDisplayName(entity) {
  switch (entity) {
    case "position":
      return "Position";
    case "project":
      return "Project";
    case "skill":
      return "Skill";
    default:
      return "Item";
  }
}

function getItemLabel(entity, item) {
  if (!item) return "this item";

  switch (entity) {
    case "position":
      return item.title || "this position";
    case "project":
      return item.title || item.project || "this project";
    case "skill":
      return item.name || item.skill || "this skill";
    default:
      return "this item";
  }
}

function buildPayload(entity, formState) {
  switch (entity) {
    case "position":
      return {
        title: formState.title.trim(),
        company: formState.company.trim(),
        description: formState.description.trim(),
        location: formState.location.trim(),
        start: toTimestamp(formState.start),
        end: toTimestamp(formState.end),
      };

    case "project":
      return {
        title: formState.title.trim(),
        stack: formState.stack.trim(),
        description: formState.description.trim(),
        date: toTimestamp(formState.date),
        status: formState.status.trim(),
      };

    case "skill":
      return {
        name: formState.name.trim(),
        category: formState.category.trim(),
      };

    default:
      return {};
  }
}

function validateForm(entity, formState) {
  if (entity === "position") {
    if (!formState.title.trim() || !formState.company.trim()) {
      return "Title and company are required.";
    }

    if (formState.start && formState.end) {
      const startDate = new Date(formState.start);
      const endDate = new Date(formState.end);

      if (startDate > endDate) {
        return "Start date cannot be after end date.";
      }
    }
  }

  if (entity === "project") {
    if (!formState.title.trim()) {
      return "Project title is required.";
    }
  }

  if (entity === "skill") {
    if (!formState.name.trim()) {
      return "Skill name is required.";
    }
  }

  return "";
}

function renderModalFields(entity, formState, handleFormChange) {
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

          <TextField
            label="Status"
            value={formState.status}
            onChange={(e) => handleFormChange("status", e.target.value)}
            fullWidth
            sx={inputSx}
          />

          <TextField
            label="Date"
            type="date"
            value={formState.date}
            onChange={(e) => handleFormChange("date", e.target.value)}
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

          <TextField
            label="Category"
            value={formState.category}
            onChange={(e) => handleFormChange("category", e.target.value)}
            fullWidth
            sx={inputSx}
          />
        </Stack>
      );

    default:
      return null;
  }
}

// Dashboard Page
export default function Dashboard() {
  const [positions, setPositions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activity, setActivity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  const [modalState, setModalState] = useState({
    open: false,
    entity: null, // "position" | "project" | "skill"
    mode: null, // "add" | "edit" | "delete"
    selectedItem: null,
  });

  const [formState, setFormState] = useState({});

  // Function retrieving all relevant data from Firestore database
  const fetchAllData = async () => {
    setLoading(true);

    try {
      const [positionsData, projectsData, skillsData] = await Promise.all([
        getPositions(),
        getProjects(),
        getSkills(),
      ]);

      setPositions(positionsData);
      setProjects(projectsData);
      setSkills(skillsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPositions([]);
      setProjects([]);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const generatedActivity = [
      ...positions.slice(0, 3).map((item) => ({
        text: `Updated position "${item.title || "Untitled Position"}"`,
        time: `${formatDate(item.start)} - ${formatDate(item.end)}`,
      })),
    ];

    setActivity(generatedActivity);
  }, [positions]);

  const statCards = useMemo(
    () => [
      {
        title: "Positions",
        value: positions.length,
        subtitle: "Total work experiences",
        icon: <WorkOutlineRoundedIcon />,
      },
      {
        title: "Projects",
        value: projects.length,
        subtitle: "Projects completed",
        icon: <FolderOpenRoundedIcon />,
      },
      {
        title: "Skills",
        value: skills.length,
        subtitle: "Technologies used",
        icon: <AutoAwesomeRoundedIcon />,
      },
    ],
    [positions.length, projects.length, skills.length]
  );

  const positionRows = useMemo(() => {
    return positions.map((item) => ({
      id: item.id,
      columns: [
        item.title || "",
        item.company || "",
        `${formatDate(item.start)} - ${item.end ? formatDate(item.end) : "Present"}`,
      ],
      raw: item,
    }));
  }, [positions]);

  const projectRows = useMemo(() => {
    return projects.slice(0, 5).map((item) => ({
      id: item.id,
      columns: [
        item.project || item.title || "Untitled Project",
        item.stack || item.techStack || item.technologies || item.status || "",
        formatDate(item.date || item.createdAt) || "",
      ],
      raw: item,
    }));
  }, [projects]);

  const skillRows = useMemo(() => {
    return skills.slice(0, 5).map((item) => ({
      id: item.id,
      columns: [item.skill || item.name || "", item.category || "", ""],
      raw: item,
    }));
  }, [skills]);

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenAdd = (entity) => {
    setModalState({
      open: true,
      entity,
      mode: "add",
      selectedItem: null,
    });

    setFormState(emptyForms[entity]);
  };

  const handleOpenEdit = (entity, item) => {
    setModalState({
      open: true,
      entity,
      mode: "edit",
      selectedItem: item,
    });

    setFormState(getEditFormValues(entity, item));
  };

  const handleOpenDelete = (entity, item) => {
    setModalState({
      open: true,
      entity,
      mode: "delete",
      selectedItem: item,
    });

    setFormState({});
  };

  const handleCloseModal = () => {
    if (modalLoading) return;

    setModalState({
      open: false,
      entity: null,
      mode: null,
      selectedItem: null,
    });

    setFormState({});
  };

  const handleSubmitModal = async () => {
    const { entity, mode, selectedItem } = modalState;
    if (!entity || !mode) return;

    if (mode === "delete") {
      if (!selectedItem?.id) return;

      setModalLoading(true);

      try {
        await deleteDoc(doc(db, collectionMap[entity], selectedItem.id));
        await fetchAllData();
        handleCloseModal();
      } catch (error) {
        console.error(`Error deleting ${entity}:`, error);
        alert(`There was an error deleting the ${entity}.`);
      } finally {
        setModalLoading(false);
      }

      return;
    }

    const validationError = validateForm(entity, formState);
    if (validationError) {
      alert(validationError);
      return;
    }

    setModalLoading(true);

    try {
      const payload = buildPayload(entity, formState);

      if (mode === "add") {
        await addDoc(collection(db, collectionMap[entity]), payload);
      } else if (mode === "edit" && selectedItem?.id) {
        await updateDoc(doc(db, collectionMap[entity], selectedItem.id), payload);
      }

      await fetchAllData();
      handleCloseModal();
    } catch (error) {
      console.error(`Error saving ${entity}:`, error);
      alert(`There was an error saving the ${entity}.`);
    } finally {
      setModalLoading(false);
    }
  };

  const modalTitle = (() => {
    if (!modalState.entity || !modalState.mode) return "";

    const entityName = getEntityDisplayName(modalState.entity);

    if (modalState.mode === "add") return `Add ${entityName}`;
    if (modalState.mode === "edit") return `Edit ${entityName}`;
    if (modalState.mode === "delete") return `Delete ${entityName}`;

    return entityName;
  })();

  const modalActionText = (() => {
    if (modalLoading) {
      if (modalState.mode === "delete") return "Deleting...";
      return "Saving...";
    }

    if (modalState.mode === "add") return `Add ${getEntityDisplayName(modalState.entity)}`;
    if (modalState.mode === "edit") return "Save Changes";
    if (modalState.mode === "delete") return "Delete";

    return "Submit";
  })();

  return (
    <Box
      className="dashboard-container"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        px: { xs: 2, md: 4, lg: 6 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Typography
        sx={{
          color: "#f3f3f3",
          fontSize: { xs: "2rem", md: "2.4rem" },
          fontWeight: 700,
          mb: 4,
          letterSpacing: "-0.03em",
        }}
      >
        Dashboard
      </Typography>

      {loading ? (
        <Box
          sx={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "#6BA36E" }} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {statCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.title}>
              <StatCard {...card} />
            </Grid>
          ))}

          <Grid item xs={12} md={12}>
            <Card sx={{ ...dashboardCardSx, minHeight: 320 }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 3,
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ color: "#f3f3f3", fontWeight: 700, fontSize: "1.3rem" }}>
                      Overview
                    </Typography>
                    <Typography sx={{ ...mutedText, fontSize: "0.92rem" }}>
                      A quick look at your portfolio progress.
                    </Typography>
                  </Box>

                  <Button
                    sx={{
                      color: "#f3f3f3",
                      textTransform: "none",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      px: 2,
                    }}
                  >
                    This Year
                  </Button>
                </Box>

                <Stack direction="row" spacing={3} sx={{ mb: 2, flexWrap: "wrap" }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircleIcon sx={{ color: "#6BA36E", fontSize: 12 }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                      Projects
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircleIcon sx={{ color: "#ffffff", fontSize: 12, opacity: 0.7 }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
                      Positions
                    </Typography>
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    height: 220,
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.01) 100%)",
                    p: 2,
                  }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 700 220" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#6BA36E"
                      strokeWidth="3"
                      points={`20,190 140,175 260,155 380,130 500,100 680,${
                        180 - Math.min(projects.length * 15, 100)
                      }`}
                    />
                    <polyline
                      fill="none"
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="3"
                      points={`20,192 140,184 260,172 380,155 500,135 680,${
                        185 - Math.min(positions.length * 15, 100)
                      }`}
                    />
                  </svg>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <TableCard
              title="Positions"
              headers={["TITLE", "COMPANY", "DATES", "ACTIONS"]}
              rows={positionRows}
              viewAllText="View all positions"
              onAdd={() => handleOpenAdd("position")}
              onEdit={(item) => handleOpenEdit("position", item)}
              onDelete={(item) => handleOpenDelete("position", item)}
              emptyMessage="No positions found yet."
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TableCard
              title="Projects"
              headers={["PROJECT", "STATUS", "DATE", "ACTIONS"]}
              rows={projectRows}
              viewAllText="View all projects"
              onAdd={() => handleOpenAdd("project")}
              onEdit={(item) => handleOpenEdit("project", item)}
              onDelete={(item) => handleOpenDelete("project", item)}
              emptyMessage="No projects found yet."
              addDisabled={false}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TableCard
              title="Skills"
              headers={["SKILL", "CATEGORY", "ACTIONS"]}
              rows={skillRows}
              viewAllText="View all skills"
              onAdd={() => handleOpenAdd("skill")}
              onEdit={(item) => handleOpenEdit("skill", item)}
              onDelete={(item) => handleOpenDelete("skill", item)}
              emptyMessage="No skills found yet."
              addDisabled={false}
            />
          </Grid>
        </Grid>
      )}

      <Dialog
        open={modalState.open}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: modalPaperSx,
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>{modalTitle}</DialogTitle>

        <DialogContent>
          {modalState.mode === "delete" ? (
            <Typography sx={{ color: "rgba(255,255,255,0.72)", mt: 1 }}>
              Are you sure you want to delete{" "}
              <Box component="span" sx={{ color: "#f3f3f3", fontWeight: 700 }}>
                {getItemLabel(modalState.entity, modalState.selectedItem)}
              </Box>
              ?
            </Typography>
          ) : (
            renderModalFields(modalState.entity, formState, handleFormChange)
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseModal}
            sx={{
              color: "rgba(255,255,255,0.72)",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmitModal}
            disabled={modalLoading}
            color={modalState.mode === "delete" ? "error" : "primary"}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 700,
              backgroundColor: modalState.mode === "delete" ? undefined : "#6BA36E",
              color: modalState.mode === "delete" ? undefined : "#050505",
              "&:hover":
                modalState.mode === "delete"
                  ? undefined
                  : {
                      backgroundColor: "#7ab47d",
                    },
            }}
          >
            {modalActionText}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}