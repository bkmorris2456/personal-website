import { act, renderHook } from "@testing-library/react";
import { addDoc, updateDoc } from "firebase/firestore";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useDashboardCrud } from "./useDashboardCrud";
import { useDashboardModal } from "./useDashboardModal";

vi.mock("../../../firebase/firebase", () => ({ db: "test-db" }));
vi.mock("firebase/firestore", () => ({
  collection: (_db, name) => name,
  doc: (_db, name, id) => `${name}/${id}`,
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
}));

const project = {
  id: "project-1",
  title: "Portfolio",
  description: ["First line", "Second line"],
  status: "In Progress",
  imageKey: "portfolio",
};

function renderDashboardForm() {
  return renderHook(() => {
    const modal = useDashboardModal({ modalLoading: false });
    const crud = useDashboardCrud({ ...modal, fetchAllData: async () => {} });
    return { ...modal, ...crud };
  }).result;
}

beforeEach(() => vi.clearAllMocks());

describe("project Tech Stack", () => {
  test.each([
    ["string", { stack: " React ", technologies: ["Legacy"] }, " React "],
    ["array", { stack: ["React", "Firebase"] }, "React, Firebase"],
    ["empty array", { stack: [], technologies: ["Legacy"] }, ""],
    ["techStack alias", { techStack: ["React"], technologies: ["Legacy"] }, "React"],
    ["technologies alias", { technologies: ["Firebase"] }, "Firebase"],
    ["missing", {}, ""],
    ["unsupported", { stack: { framework: "React" } }, ""],
    ["unsupported with alias", { stack: 42, techStack: "React" }, "React"],
    ["mixed array", { stack: ["React", 42, null, "Firebase"] }, "React, Firebase"],
  ])("displays a %s stack and preserves it on a status-only save", async (_label, fields, display) => {
    const form = renderDashboardForm();
    act(() => form.current.handleOpenEdit("project", { ...project, ...fields }));
    expect(form.current.formState.stack).toBe(display);

    act(() => form.current.handleFormChange("status", "Complete"));
    await act(() => form.current.handleSubmitModal());

    expect(updateDoc).toHaveBeenCalledExactlyOnceWith("projects/project-1", { status: "Complete" });
    expect(addDoc).not.toHaveBeenCalled();
  });

  test("preserves stack when editing another field", async () => {
    const form = renderDashboardForm();
    act(() => form.current.handleOpenEdit("project", { ...project, technologies: ["React"] }));
    act(() => form.current.handleFormChange("title", " Updated portfolio "));
    await act(() => form.current.handleSubmitModal());

    expect(updateDoc).toHaveBeenCalledExactlyOnceWith("projects/project-1", { title: "Updated portfolio" });
  });

  test("closes an unchanged submission without writing", async () => {
    const form = renderDashboardForm();
    act(() => form.current.handleOpenEdit("project", { ...project, stack: ["React"] }));
    await act(() => form.current.handleSubmitModal());

    expect(updateDoc).not.toHaveBeenCalled();
    expect(form.current.modalState.open).toBe(false);
  });

  test.each([
    ["replaces", " React, Firebase ", "React, Firebase"],
    ["clears", "", ""],
  ])("%s Tech Stack text on an intentional edit", async (_label, input, savedStack) => {
    const form = renderDashboardForm();
    const legacyProject = { ...project, technologies: ["React"] };
    act(() => form.current.handleOpenEdit("project", legacyProject));
    act(() => form.current.handleFormChange("stack", input));
    await act(() => form.current.handleSubmitModal());

    expect(updateDoc).toHaveBeenCalledExactlyOnceWith("projects/project-1", { stack: savedStack });
    act(() => form.current.handleOpenEdit("project", { ...legacyProject, stack: savedStack }));
    expect(form.current.formState.stack).toBe(savedStack);
  });

  test.each([
    ["blank", undefined, ""],
    ["populated", " React, Firebase ", "React, Firebase"],
  ])("creates a project with a %s stack", async (_label, input, savedStack) => {
    const form = renderDashboardForm();
    act(() => form.current.handleOpenAdd("project"));
    act(() => {
      form.current.handleFormChange("title", " New project ");
      if (input !== undefined) form.current.handleFormChange("stack", input);
    });
    await act(() => form.current.handleSubmitModal());

    expect(addDoc).toHaveBeenCalledExactlyOnceWith("projects", {
      title: "New project",
      stack: savedStack,
      description: "",
      status: "",
    });
    expect(updateDoc).not.toHaveBeenCalled();
  });
});
