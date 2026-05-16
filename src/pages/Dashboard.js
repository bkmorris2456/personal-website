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
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate } from "react-router-dom";

// Icon Imports
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
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
import { db, auth } from "../firebase/firebase";
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
    status: "",
  },
  skill: {
    name: "",
    category: "",
  },
};

const projectStatusOptions = ["Designing", "Ongoing", "Complete"];
const skillCategoryOptions = ["Frontend", "Backend", "Database", "Framework", "Version Control", "Editor"];

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

function formatEndDate(value) {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "Present"
  ) {
    return "Present";
  }

  const formatted = formatDate(value);
  return formatted || "Present";
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

function SingleSelectTags({ options, value, onChange }) {
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

  const [viewAllState, setViewAllState] = useState({
    open: false,
    title: "",
    headers: [],
    rows: [],
  });

  const handleOpenViewAll = (title, headers, rows) => {
  setViewAllState({
    open: true,
    title,
    headers,
    rows,
  });
  };

  const handleCloseViewAll = () => {
    setViewAllState({
      open: false,
      title: "",
      headers: [],
      rows: [],
    });
  };

  const navigate = useNavigate();

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

  const completedProjectsCount = useMemo(() => {
    return projects.filter(
      (project) => project.status?.toLowerCase() === "complete"
    ).length;
  }, [projects]);

  const statCards = useMemo(
    () => [
      {
        title: "Positions Worked",
        value: positions.length,
        icon: <WorkOutlineRoundedIcon />,
      },
      {
        title: "Projects Completed",
        value: completedProjectsCount,
        icon: <FolderOpenRoundedIcon />,
      },
      {
        title: "Skills Attained",
        value: skills.length,
        icon: <AutoAwesomeRoundedIcon />,
      },
    ],
    [positions.length, completedProjectsCount, skills.length]
  );

  const positionRows = useMemo(() => {
    return positions.map((item) => ({
      id: item.id,
      columns: [
        item.title || "",
        item.company || "",
        `${formatDate(item.start)} - ${formatEndDate(item.end)}`,
      ],
      raw: item,
    }));
  }, [positions]);

  const projectRows = useMemo(() => {
    return projects.map((item) => ({
      id: item.id,
      columns: [
        item.project || item.title || "Untitled Project",
        item.status || "",
      ],
      raw: item,
    }));
  }, [projects]);

  const skillRows = useMemo(() => {
    return skills.map((item) => ({
      id: item.id,
      columns: [item.skill || item.name || "", item.category || ""],
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Button
          onClick={() => navigate("/home")}
          startIcon={<ArrowBackRoundedIcon />}
          sx={{
            color: "#6BA36E",
            textTransform: "none",
            fontWeight: 700,
            mb: 2,
            px: 0,
            minWidth: "unset",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#7ab47d",
            },
          }}
        >
          Return to Home
        </Button>

        <Typography
          sx={{
            color: "#f3f3f3",
            fontSize: { xs: "2rem", md: "2.4rem" },
            fontWeight: 700,
            letterSpacing: "-0.03em",
            textAlign: "left",
            width: "100%",
          }}
        >
          Dashboard
        </Typography>
      </Box>

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

          <Grid item xs={12} md={12} lg={4}>
            <TableCard
              title="Positions"
              headers={["TITLE", "COMPANY", "DATES", "ACTIONS"]}
              rows={positionRows}
              viewAllText="View all positions"
              onViewAll={() =>
                handleOpenViewAll("Positions", ["TITLE", "COMPANY", "DATES"], positionRows)
              }
              onAdd={() => handleOpenAdd("position")}
              onEdit={(item) => handleOpenEdit("position", item)}
              onDelete={(item) => handleOpenDelete("position", item)}
              emptyMessage="No positions found yet."
            />
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <TableCard
              title="Projects"
              headers={["PROJECT", "STATUS", "ACTIONS"]}
              rows={projectRows}
              viewAllText="View all projects"
              onViewAll={() =>
                handleOpenViewAll("Projects", ["PROJECT", "STATUS"], projectRows)
              }
              onAdd={() => handleOpenAdd("project")}
              onEdit={(item) => handleOpenEdit("project", item)}
              onDelete={(item) => handleOpenDelete("project", item)}
              emptyMessage="No projects found yet."
              addDisabled={false}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <TableCard
              title="Skills"
              headers={["SKILL", "CATEGORY", "ACTIONS"]}
              rows={skillRows}
              viewAllText="View all skills"
              onViewAll={() =>
                handleOpenViewAll("Skills", ["SKILL", "CATEGORY"], skillRows)
              }
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

      {/* View All Modal */}
      <Dialog
        open={viewAllState.open}
        onClose={handleCloseViewAll}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            ...modalPaperSx,
            maxHeight: "80vh",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {viewAllState.title}
        </DialogTitle>

        <DialogContent
          sx={{
            maxHeight: "60vh",
            overflow: "auto",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
              overflowX: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {viewAllState.headers.map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        backgroundColor: "#0b0b0b",
                        color: "rgba(255,255,255,0.55)",
                        borderColor: "rgba(255,255,255,0.08)",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {viewAllState.rows.map((row, index) => (
                  <TableRow key={row.id ?? index}>
                    {row.columns.map((value, valueIndex) => (
                      <TableCell
                        key={`${row.id}-${valueIndex}`}
                        sx={{
                          color:
                            valueIndex === 0
                              ? "#f3f3f3"
                              : "rgba(255,255,255,0.65)",
                          borderColor: "rgba(255,255,255,0.06)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseViewAll}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 700,
              backgroundColor: "#6BA36E",
              color: "#050505",
              "&:hover": {
                backgroundColor: "#7ab47d",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}