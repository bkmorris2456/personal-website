import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icon Imports
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

// Firebase Imports
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

// Component Imports
import { StatCard } from "./components/StatCard";
import { TableCard } from "./components/TableCard";

// Dashboard Feature Imports
import { inputSx } from "./styles/dashboardStyles";
import {
  collectionMap,
  emptyForms,
  projectStatusOptions,
  skillCategoryOptions,
} from "./config/dashboardConfig";
import {
  formatDate,
  formatEndDate,
  getEditFormValues,
  getEntityDisplayName,
  buildPayload,
  validateForm,
} from "./utils/dashboardUtils";
import { SingleSelectTags } from "./components/SingleSelectTags";
import { ViewAllModal } from "./components/ViewAllModal";
import { DashboardFormModal } from "./components/DashboardFormModal";
import { DashboardFormFields } from "./components/DashboardFormFields";
import { useDashboardData } from "./hooks/useDashboardData";

// Dashboard Page
export default function Dashboard() {
  const {
    positions,
    projects,
    skills,
    loading,
    fetchAllData,
  } = useDashboardData();
  const [activity, setActivity] = useState([]);
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

      <DashboardFormModal
        open={modalState.open}
        modalState={modalState}
        modalTitle={modalTitle}
        modalActionText={modalActionText}
        modalLoading={modalLoading}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        renderFields={() => (
          <DashboardFormFields
            entity={modalState.entity}
            formState={formState}
            handleFormChange={handleFormChange}
          />
        )}
      />

      {/* View All Modal */}
      <ViewAllModal
        open={viewAllState.open}
        title={viewAllState.title}
        headers={viewAllState.headers}
        rows={viewAllState.rows}
        onClose={handleCloseViewAll}
      />
    </Box>
  );
}