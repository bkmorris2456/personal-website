import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import emailjs from "emailjs-com";
import { getPositions, getProjects } from "../../firebase/firestoreService";
import Home from "./Home";

vi.mock("../../firebase/firestoreService", () => ({
  getPositions: vi.fn(),
  getProjects: vi.fn(),
}));
vi.mock("emailjs-com", () => ({ default: { sendForm: vi.fn() } }));

function Location() {
  const { pathname, hash } = useLocation();
  return <output data-testid="location">{pathname}{hash}</output>;
}

function renderHome(initialEntry = "/home") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Home mode="dark" toggleTheme={vi.fn()} />
      <Location />
    </MemoryRouter>,
  );
}

const scrollIntoView = vi.fn();
let originalScrollIntoView;

beforeEach(() => {
  vi.resetAllMocks();
  getPositions.mockResolvedValue([]);
  getProjects.mockResolvedValue([]);
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false })));
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  originalScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = scrollIntoView;
});
afterEach(() => {
  cleanup();
  Element.prototype.scrollIntoView = originalScrollIntoView;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

test("project navigation updates the section URL, focus and scroll behavior", async () => {
  renderHome();
  fireEvent.click(screen.getByRole("link", { name: "View Projects" }));

  expect(screen.getByTestId("location")).toHaveTextContent("/home#projects");
  expect(screen.getByRole("region", { name: "Featured Projects" })).toHaveFocus();
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  await screen.findByText("No projects to show yet.");
});

test("section links are instant with reduced motion and support direct entry", async () => {
  window.matchMedia.mockReturnValue({ matches: true });
  renderHome("/home#experience");
  expect(screen.getByRole("region", { name: "Experience" })).toHaveFocus();
  expect(scrollIntoView).toHaveBeenLastCalledWith({ behavior: "instant" });

  fireEvent.click(screen.getByRole("link", { name: "Get in Touch" }));
  expect(scrollIntoView).toHaveBeenLastCalledWith({ behavior: "instant" });
  await screen.findByText("No positions to show yet.");
});

test("mobile disclosure closes on Escape with focus restored", async () => {
  renderHome();
  const toggle = screen.getByRole("button", { name: "Open navigation" });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  const mobile = screen.getByRole("navigation", { name: "Mobile" });
  expect(within(mobile).queryByRole("link", { name: /dashboard/i })).not.toBeInTheDocument();
  expect(within(mobile).getByRole("link", { name: "Skills" })).toHaveAttribute("href", "/home#skills");

  fireEvent.keyDown(mobile, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
  await screen.findByText("No projects to show yet.");
});

test("Firestore projects render links and technology tags from both supported shapes", async () => {
  getProjects.mockResolvedValue([
    { id: "one", title: "First test project", stack: "React, Firebase, React", githubLink: "https://example.com/code" },
    { id: "two", title: "Second test project", technologies: ["Vite"], demoLink: "https://example.com/demo" },
  ]);
  getPositions.mockRejectedValue(new Error("offline"));
  renderHome();
  expect(screen.getByText("Loading projects…")).toBeInTheDocument();

  const first = (await screen.findByRole("heading", { name: "First test project" })).closest("article");
  expect(within(first).getAllByRole("listitem")).toHaveLength(2);
  expect(within(first).getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://example.com/code");
  const second = screen.getByRole("heading", { name: "Second test project" }).closest("article");
  expect(within(second).getByText("Vite")).toBeInTheDocument();
  expect(within(second).getByRole("link", { name: "Demo" })).toHaveAttribute("href", "https://example.com/demo");
  expect(await screen.findByText("Unable to load positions right now.")).toBeInTheDocument();
});

test("contact submits the original form fields and reports success", async () => {
  emailjs.sendForm.mockImplementation((_service, _template, form) => {
    expect(Object.fromEntries(new FormData(form))).toEqual({
      name: "Test visitor",
      email: "visitor@example.com",
      message: "Test message",
    });
    return Promise.resolve();
  });
  renderHome("/home#contact");
  fireEvent.change(screen.getByLabelText("Your Name"), { target: { value: "Test visitor" } });
  fireEvent.change(screen.getByLabelText("Your Email"), { target: { value: "visitor@example.com" } });
  fireEvent.change(screen.getByLabelText("Your Message"), { target: { value: "Test message" } });
  fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
  expect(await screen.findByText("Message sent.")).toBeInTheDocument();
  expect(screen.getByLabelText("Your Message")).toHaveValue("");
  expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
});

test("the only dashboard link sits next to the theme toggle", async () => {
  renderHome();
  const dashboard = screen.getByRole("link", { name: "Admin dashboard" });
  const theme = screen.getByRole("button", { name: "Toggle light and dark mode" });
  expect(dashboard).toHaveAttribute("href", "/login");
  expect(dashboard.closest("header")).not.toBeNull();
  expect(dashboard.nextElementSibling).toBe(theme);
  expect(document.querySelectorAll('a[href="/login"], a[href="/dashboard"]')).toHaveLength(1);
  await screen.findByText("No projects to show yet.");
});

test("footer uses the current year, the hero opens with the name, and the contact form remains available", async () => {
  renderHome();
  expect(screen.getByRole("contentinfo")).toHaveTextContent(`© ${new Date().getFullYear()} Ursus`);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Blake Morris");
  expect(screen.queryByText(/hello, i[’']m/i)).not.toBeInTheDocument();
  expect(document.querySelector('a[href^="tel:"]')).toBeNull();
  expect(screen.queryByText(/\(\d{3}\)\s*\d{3}-\d{4}/)).not.toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "Your Email" })).toHaveAttribute("type", "email");
  expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  await screen.findByText("No projects to show yet.");
});
