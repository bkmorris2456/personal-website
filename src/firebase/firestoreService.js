// services/firestoreService.js
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// Fetch Positions
export const getPositions = async () => {
    const snapshot = await getDocs(collection(db, "positions"));
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            // Convert Firestore Timestamp to readable string
            start: data.start?.toDate().toLocaleDateString("en-US", { month: "long", year: "numeric" }) ?? "",
            // Convert end Timestamp if it exists, otherwise "Present"
            end: data.end?.toDate().toLocaleDateString("en-US", { month: "long", year: "numeric" }) ?? "Present",
            // description as array so your existing .map() still works
            description: typeof data.description === "string" ? [data.description] : data.description ?? [],
        };
    });
};

// Fetch Projects
export const getProjects = async () => {
  const snapshot = await getDocs(collection(db, "projects"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};