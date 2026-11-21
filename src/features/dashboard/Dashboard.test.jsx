import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getPositions, getProjects, getSkills } from "../../firebase/firestoreService";
import Dashboard from "./Dashboard";

vi.mock("../../firebase/firebase", () => ({ db: "test-db" }));
vi.mock("../../firebase/firestoreService", () => ({
  getPositions: vi.fn(),
  getProjects: vi.fn(),
  getSkills: vi.fn(),
}));
vi.mock("firebase/firestore", () => ({
  collection: (_db, name) => name,
  doc: (_db, name, id) => `${name}/${id}`,
  addDoc: vi.fn(),
  deleteDoc: vi.fn(),
  updateDoc: vi.fn(),
}));

const records = [
  ["Positions", "Position", "positions", "Title", "Developer", { id: "position", title: "Developer", company: "Company" }],
  ["Projects", "Project", "projects", "Project Title", "Portfolio", { id: "project", title: "Portfolio", stack: ["React", "Vite"], status: "Ongoing" }],
  ["Skills", "Skill", "skills", "Skill Name", "React", { id: "skill", name: "React", category: "Frontend" }],
];

function renderDashboard(mode = "dark") {
  render(<MemoryRouter><Dashboard mode={mode} /></MemoryRouter>);
}

function table(title) {
  return within(screen.getByRole("heading", { name: title }).closest(".MuiCard-root"));
}

beforeEach(() => {
  vi.resetAllMocks();
  [getPositions, getProjects, getSkills].forEach((read, index) => read.mockResolvedValue([records[index][5]]));
});
afterEach(cleanup);

test.each(records)("%s create, edit, delete and view-all controls remain functional", async (
  heading, entity, collection, inputLabel, recordName, record,
) => {
  renderDashboard(entity === "Project" ? "light" : "dark");
  await screen.findByRole("heading", { name: heading });
  fireEvent.click(table(heading).getByRole("button", { name: "Add" }));
  let dialog = await screen.findByRole("dialog", { name: `Add ${entity}` });
  fireEvent.change(within(dialog).getByLabelText(inputLabel), { target: { value: "New name" } });
  if (entity === "Position") fireEvent.change(within(dialog).getByLabelText("Company"), { target: { value: "New company" } });
  fireEvent.click(within(dialog).getByRole("button", { name: `Add ${entity}` }));
  await screen.findByText("Record saved.");
  expect(addDoc).toHaveBeenCalledWith(collection, expect.objectContaining({ [entity === "Skill" ? "name" : "title"]: "New name" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

  fireEvent.click(table(heading).getByRole("button", { name: `Edit ${recordName}` }));
  dialog = await screen.findByRole("dialog", { name: `Edit ${entity}` });
  if (entity === "Project") {
    expect(within(dialog).getByLabelText("Tech Stack")).toHaveValue("React, Vite");
    expect(dialog.closest(".ursus-dialog")).toHaveAttribute("data-mode", "light");
    fireEvent.click(within(dialog).getByRole("button", { name: "Complete" }));
  } else {
    fireEvent.change(within(dialog).getByLabelText(inputLabel), { target: { value: "Updated name" } });
  }
  fireEvent.click(within(dialog).getByRole("button", { name: "Save Changes" }));
  await screen.findByText("Record saved.");
  const patch = entity === "Project" ? { status: "Complete" } :
    expect.objectContaining({ [entity === "Skill" ? "name" : "title"]: "Updated name" });
  expect(updateDoc).toHaveBeenCalledExactlyOnceWith(`${collection}/${record.id}`, patch);
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

  fireEvent.click(table(heading).getByRole("button", { name: `View all ${collection}` }));
  dialog = await screen.findByRole("dialog", { name: heading });
  expect(within(dialog).getByRole("table")).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

  fireEvent.click(table(heading).getByRole("button", { name: `Delete ${recordName}` }));
  dialog = await screen.findByRole("dialog", { name: `Delete ${entity}` });
  fireEvent.click(within(dialog).getByRole("button", { name: "Delete" }));
  await screen.findByText("Record deleted.");
  expect(deleteDoc).toHaveBeenCalledExactlyOnceWith(`${collection}/${record.id}`);
});

test("a validation error stays visible in the dialog without attempting a write", async () => {
  renderDashboard();
  await screen.findByRole("heading", { name: "Projects" });
  fireEvent.click(table("Projects").getByRole("button", { name: "Add" }));
  const dialog = await screen.findByRole("dialog", { name: "Add Project" });
  fireEvent.click(within(dialog).getByRole("button", { name: "Add Project" }));

  expect(within(dialog).getByRole("alert")).toHaveTextContent("Project title is required.");
  expect(addDoc).not.toHaveBeenCalled();
});
