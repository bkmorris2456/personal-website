import { useMemo, useState } from "react";

import { emptyForms } from "../config/dashboardConfig";
import {
  getEditFormValues,
  getEntityDisplayName,
} from "../utils/dashboardUtils";

export function useDashboardModal({ modalLoading }) {
  const [modalState, setModalState] = useState({
    open: false,
    entity: null,
    mode: null,
    selectedItem: null,
  });

  const [formState, setFormState] = useState({});

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

  const handleCloseModal = ({ force = false } = {}) => {
    if (modalLoading && !force) return;

    setModalState({
      open: false,
      entity: null,
      mode: null,
      selectedItem: null,
    });

    setFormState({});
  };

  const modalTitle = useMemo(() => {
    if (!modalState.entity || !modalState.mode) return "";

    const entityName = getEntityDisplayName(modalState.entity);

    if (modalState.mode === "add") return `Add ${entityName}`;
    if (modalState.mode === "edit") return `Edit ${entityName}`;
    if (modalState.mode === "delete") return `Delete ${entityName}`;

    return entityName;
  }, [modalState.entity, modalState.mode]);

  const modalActionText = useMemo(() => {
    if (modalLoading) {
      if (modalState.mode === "delete") return "Deleting...";
      return "Saving...";
    }

    if (modalState.mode === "add") {
      return `Add ${getEntityDisplayName(modalState.entity)}`;
    }

    if (modalState.mode === "edit") return "Save Changes";
    if (modalState.mode === "delete") return "Delete";

    return "Submit";
  }, [modalLoading, modalState.entity, modalState.mode]);

  return {
    modalState,
    formState,
    handleFormChange,
    handleOpenAdd,
    handleOpenEdit,
    handleOpenDelete,
    handleCloseModal,
    modalTitle,
    modalActionText,
  };
}