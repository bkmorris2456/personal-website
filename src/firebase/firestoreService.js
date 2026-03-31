// services/firestoreService.js
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// Fetch Positions
export const getPositions = async () => {
  const snapshot = await getDocs(collection(db, "positions"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Fetch Projects
export const getProjects = async () => {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};