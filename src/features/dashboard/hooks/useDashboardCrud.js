import { useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";
import { collectionMap } from "../config/dashboardConfig";
import { buildPayload, validateForm } from "../utils/dashboardUtils";

export function useDashboardCrud({
  modalState,
  formState,
  fetchAllData,
  handleCloseModal,
}) {
  const [modalLoading, setModalLoading] = useState(false);

  const handleSubmitModal = async () => {
    const { entity, mode, selectedItem } = modalState;
    if (!entity || !mode) return;

    if (mode === "delete") {
      if (!selectedItem?.id) return;

      setModalLoading(true);

      try {
        await deleteDoc(doc(db, collectionMap[entity], selectedItem.id));
        await fetchAllData();
        handleCloseModal({ force: true });
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
      handleCloseModal({ force: true });
    } catch (error) {
      console.error(`Error saving ${entity}:`, error);
      alert(`There was an error saving the ${entity}.`);
    } finally {
      setModalLoading(false);
    }
  };

  return {
    modalLoading,
    handleSubmitModal,
  };
}