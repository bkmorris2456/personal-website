import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";

import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CircleIcon from "@mui/icons-material/Circle";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/firebase"; // adjust path if needed

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

const emptyPositionForm = {
  title: "",
  company: "",
  description: "",
  location: "",
  start: "",
  end: "",
};

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

function toTimestamp(dateString) {
  if (!dateString) return null;

  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  return Timestamp.fromDate(date);
}

function StatCard({ title, value, subtitle, icon }) {
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

function TableCard({
  title,
  subtitle,
  headers,
  rows,
  viewAllText,
  onAdd,
  onEdit,
  onDelete,
  emptyMessage = "No records yet.",
  addDisabled = false,
}) {
  return (
    <Card sx={{ ...dashboardCardSx, height: "100%" }}>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography sx={{ color: "#f3f3f3", fontWeight: 700, fontSize: "1.3rem" }}>
              {title}
            </Typography>
            <Typography sx={{ ...mutedText, fontSize: "0.92rem" }}>
              {subtitle}
            </Typography>
          </Box>

          <Button
            startIcon={<AddRoundedIcon />}
            onClick={onAdd}
            disabled={addDisabled}
            sx={{
              color: addDisabled ? "rgba(255,255,255,0.35)" : "#6BA36E",
              textTransform: "none",
              borderRadius: "12px",
              border: "1px solid rgba(107,163,110,0.18)",
              backgroundColor: "rgba(107,163,110,0.06)",
              px: 1.6,
              whiteSpace: "nowrap",
            }}
          >
            Add
          </Button>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

        <Box sx={{ px: 3, py: 2 }}>
          <Grid container sx={{ mb: 1.5 }}>
            {headers.map((header) => (
              <Grid item xs key={header}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.42)",
                    fontSize: "0.74rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {header}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {rows.length === 0 ? (
            <Typography sx={{ color: "rgba(255,255,255,0.45)", py: 2 }}>
              {emptyMessage}
            </Typography>
          ) : (
            rows.map((row, index) => (
              <Box key={row.id ?? index}>
                <Grid container alignItems="center" sx={{ py: 1.4 }}>
                  {row.columns.map((value, valueIndex) => (
                    <Grid item xs key={`${row.id}-${valueIndex}`}>
                      <Typography
                        sx={{
                          color: valueIndex === 0 ? "#f3f3f3" : "rgba(255,255,255,0.6)",
                          fontSize: "0.92rem",
                          pr: 1,
                        }}
                      >
                        {value}
                      </Typography>
                    </Grid>
                  ))}

                  <Grid item xs>
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        size="small"
                        sx={{ color: "rgba(255,255,255,0.65)" }}
                        onClick={() => onEdit?.(row.raw)}
                        disabled={!onEdit}
                      >
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        sx={{ color: "rgba(255,255,255,0.65)" }}
                        onClick={() => onDelete?.(row.raw)}
                        disabled={!onDelete}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>

                {index !== rows.length - 1 && (
                  <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
                )}
              </Box>
            ))
          )}
        </Box>

        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#6BA36E",
          }}
        >
          <Typography sx={{ fontSize: "0.92rem", fontWeight: 500 }}>
            {viewAllText}
          </Typography>
          <ChevronRightRoundedIcon fontSize="small" />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [positions, setPositions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activity, setActivity] = useState([]);

  const [loading, setLoading] = useState(true);
  const [savingPosition, setSavingPosition] = useState(false);
  const [deletingPosition, setDeletingPosition] = useState(false);

  const [openPositionModal, setOpenPositionModal] = useState(false);
  const [positionModalMode, setPositionModalMode] = useState("add");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [positionForm, setPositionForm] = useState(emptyPositionForm);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const fetchPositions = async () => {
    try {
      const positionsQuery = query(collection(db, "positions"), orderBy("start", "desc"));
      const snapshot = await getDocs(positionsQuery);

      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setPositions(data);
    } catch (error) {
      console.error("Error fetching positions:", error);
      setPositions([]);
    }
  };

  const fetchProjects = async () => {
    try {
      const snapshot = await getDocs(collection(db, "projects"));

      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  const fetchSkills = async () => {
    try {
      const snapshot = await getDocs(collection(db, "skills"));

      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkills([]);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);

    try {
      await Promise.all([fetchPositions(), fetchProjects(), fetchSkills()]);
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
        item.stack || item.techStack || item.technologies || "",
        item.date || formatDate(item.createdAt) || "",
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

  const handlePositionFormChange = (field, value) => {
    setPositionForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenAddPosition = () => {
    setPositionModalMode("add");
    setSelectedPosition(null);
    setPositionForm(emptyPositionForm);
    setOpenPositionModal(true);
  };

  const handleOpenEditPosition = (position) => {
    setPositionModalMode("edit");
    setSelectedPosition(position);
    setPositionForm({
      title: position.title || "",
      company: position.company || "",
      description: position.description || "",
      location: position.location || "",
      start: formatDateForInput(position.start),
      end: formatDateForInput(position.end),
    });
    setOpenPositionModal(true);
  };

  const handleClosePositionModal = () => {
    if (savingPosition) return;

    setOpenPositionModal(false);
    setSelectedPosition(null);
    setPositionForm(emptyPositionForm);
  };

  const handleSubmitPosition = async () => {
    if (!positionForm.title.trim() || !positionForm.company.trim()) {
      alert("Title and company are required.");
      return;
    }

    if (positionForm.start && positionForm.end) {
      const startDate = new Date(positionForm.start);
      const endDate = new Date(positionForm.end);

      if (startDate > endDate) {
        alert("Start date cannot be after end date.");
        return;
      }
    }

    setSavingPosition(true);

    try {
      const payload = {
        title: positionForm.title.trim(),
        company: positionForm.company.trim(),
        description: positionForm.description.trim(),
        location: positionForm.location.trim(),
        start: toTimestamp(positionForm.start),
        end: toTimestamp(positionForm.end),
      };

      if (positionModalMode === "add") {
        await addDoc(collection(db, "positions"), payload);
      } else if (positionModalMode === "edit" && selectedPosition?.id) {
        await updateDoc(doc(db, "positions", selectedPosition.id), payload);
      }

      await fetchPositions();
      handleClosePositionModal();
    } catch (error) {
      console.error("Error saving position:", error);
      alert("There was an error saving the position.");
    } finally {
      setSavingPosition(false);
    }
  };

  const handleOpenDeletePosition = (position) => {
    setSelectedPosition(position);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    if (deletingPosition) return;

    setOpenDeleteModal(false);
    setSelectedPosition(null);
  };

  const handleDeletePosition = async () => {
    if (!selectedPosition?.id) return;

    setDeletingPosition(true);

    try {
      await deleteDoc(doc(db, "positions", selectedPosition.id));
      await fetchPositions();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting position:", error);
      alert("There was an error deleting the position.");
    } finally {
      setDeletingPosition(false);
    }
  };

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

          <Grid item xs={12} md={8}>
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
            <Card sx={{ ...dashboardCardSx, minHeight: 320 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ color: "#f3f3f3", fontWeight: 700, fontSize: "1.3rem" }}>
                  Recent Activity
                </Typography>

                <Typography sx={{ ...mutedText, fontSize: "0.92rem", mb: 3 }}>
                  See what’s been updated.
                </Typography>

                <Stack spacing={2.2}>
                  {activity.length === 0 ? (
                    <Typography sx={{ color: "rgba(255,255,255,0.45)" }}>
                      No recent activity yet.
                    </Typography>
                  ) : (
                    activity.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        <Stack direction="row" spacing={1.4} alignItems="center">
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              backgroundColor: "rgba(107,163,110,0.08)",
                              border: "1px solid rgba(107,163,110,0.18)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#6BA36E",
                              flexShrink: 0,
                            }}
                          >
                            <AddRoundedIcon sx={{ fontSize: 18 }} />
                          </Box>

                          <Typography
                            sx={{
                              color: "#f3f3f3",
                              fontSize: "0.92rem",
                              lineHeight: 1.5,
                            }}
                          >
                            {item.text}
                          </Typography>
                        </Stack>

                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.42)",
                            fontSize: "0.8rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.time}
                        </Typography>
                      </Box>
                    ))
                  )}
                </Stack>

                <Button
                  sx={{
                    mt: 4,
                    color: "#f3f3f3",
                    textTransform: "none",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    px: 2,
                  }}
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <TableCard
              title="Positions"
              subtitle="Manage your work experience."
              headers={["TITLE", "COMPANY", "DATES", "ACTIONS"]}
              rows={positionRows}
              viewAllText="View all positions"
              onAdd={handleOpenAddPosition}
              onEdit={handleOpenEditPosition}
              onDelete={handleOpenDeletePosition}
              emptyMessage="No positions found yet."
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TableCard
              title="Projects"
              subtitle="Showcase what you've built."
              headers={["PROJECT", "STACK", "DATE", "ACTIONS"]}
              rows={projectRows}
              viewAllText="View all projects"
              onAdd={() => alert("Projects CRUD will be added once you send the project structure.")}
              onEdit={null}
              onDelete={null}
              emptyMessage="No projects found yet."
              addDisabled={false}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TableCard
              title="Skills"
              subtitle="Highlight your technical skills."
              headers={["SKILL", "CATEGORY", "ACTIONS"]}
              rows={skillRows}
              viewAllText="View all skills"
              onAdd={() => alert("Skills CRUD can be added next.")}
              onEdit={null}
              onDelete={null}
              emptyMessage="No skills found yet."
              addDisabled={false}
            />
          </Grid>
        </Grid>
      )}

      <Dialog
        open={openPositionModal}
        onClose={handleClosePositionModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "#0b0b0b",
            color: "#f3f3f3",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {positionModalMode === "add" ? "Add Position" : "Edit Position"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={positionForm.title}
              onChange={(e) => handlePositionFormChange("title", e.target.value)}
              fullWidth
              sx={inputSx}
            />

            <TextField
              label="Company"
              value={positionForm.company}
              onChange={(e) => handlePositionFormChange("company", e.target.value)}
              fullWidth
              sx={inputSx}
            />

            <TextField
              label="Location"
              value={positionForm.location}
              onChange={(e) => handlePositionFormChange("location", e.target.value)}
              fullWidth
              sx={inputSx}
            />

            <TextField
              label="Start Date"
              type="date"
              value={positionForm.start}
              onChange={(e) => handlePositionFormChange("start", e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            />

            <TextField
              label="End Date"
              type="date"
              value={positionForm.end}
              onChange={(e) => handlePositionFormChange("end", e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={inputSx}
            />

            <TextField
              label="Description"
              value={positionForm.description}
              onChange={(e) => handlePositionFormChange("description", e.target.value)}
              fullWidth
              multiline
              minRows={4}
              sx={inputSx}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleClosePositionModal}
            sx={{
              color: "rgba(255,255,255,0.72)",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmitPosition}
            disabled={savingPosition}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              backgroundColor: "#6BA36E",
              color: "#050505",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#7ab47d",
              },
            }}
          >
            {savingPosition
              ? "Saving..."
              : positionModalMode === "add"
              ? "Add Position"
              : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        PaperProps={{
          sx: {
            backgroundColor: "#0b0b0b",
            color: "#f3f3f3",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            minWidth: 420,
            maxWidth: "90vw",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Position</DialogTitle>

        <DialogContent>
          <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
            Are you sure you want to delete{" "}
            <Box component="span" sx={{ color: "#f3f3f3", fontWeight: 700 }}>
              {selectedPosition?.title || "this position"}
            </Box>
            ?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseDeleteModal}
            sx={{
              color: "rgba(255,255,255,0.72)",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDeletePosition}
            disabled={deletingPosition}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 700,
            }}
          >
            {deletingPosition ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}