import { Timestamp } from "firebase/firestore";

export function formatDate(value) {
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

export function formatEndDate(value) {
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

export function formatDateForInput(value) {
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

export function toTimestamp(dateString) {
  if (!dateString) return null;

  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  return Timestamp.fromDate(date);
}

export function getEditFormValues(entity, item) {
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

export function getEntityDisplayName(entity) {
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

export function getItemLabel(entity, item) {
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

export function buildPayload(entity, formState) {
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

export function validateForm(entity, formState) {
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

  if (entity === "project" && !formState.title.trim()) {
    return "Project title is required.";
  }

  if (entity === "skill" && !formState.name.trim()) {
    return "Skill name is required.";
  }

  return "";
}