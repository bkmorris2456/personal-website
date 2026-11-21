import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Close, DarkModeRounded, DashboardOutlined, LightModeRounded, Menu } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/ursus-logo.png";
import { externalNavItems, sectionNavItems, sectionPath } from "./constants/navItems";

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let frame;
    const update = () => {
      const header = document.querySelector(".u-header");
      const boundary = (header?.getBoundingClientRect().bottom ?? 0) + 24;
      const sections = sectionNavItems.map(({ to }) => document.getElementById(to)).filter(Boolean);
      // Navigation order matches the page, so the last heading above the header wins.
      const visible = sections.findLast((section) => section.getBoundingClientRect().top <= boundary);
      const atBottom = window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? "contact" : visible?.id ?? "home");
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const content = document.querySelector(".u-main");
    const observer = typeof ResizeObserver === "function" && content ? new ResizeObserver(schedule) : null;
    observer?.observe(content);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
  }, []);

  return active;
}

function ProfileLinks({ iconsOnly }) {
  return externalNavItems.map(({ label, href, Icon }) => (
    <a key={label} className={iconsOnly ? "u-icon u-desktop-action" : undefined} href={href}
      target="_blank" rel="noopener noreferrer" aria-label={label} title={iconsOnly ? label : undefined}>
      <Icon aria-hidden="true" />
      {!iconsOnly && label}
    </a>
  ));
}

export default function Navbar({ toggleTheme, mode }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const desktop = useRef(null);
  const indicator = useRef(null);
  const menuButton = useRef(null);
  const header = useRef(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.key]);

  useLayoutEffect(() => {
    const nav = desktop.current;
    const marker = indicator.current;
    const move = () => {
      const link = nav.querySelector('[aria-current="location"]');
      if (!link?.offsetWidth) return;
      marker.style.transform = `translateX(${link.offsetLeft + 6}px) scaleX(${link.offsetWidth - 12})`;
      marker.style.opacity = "1";
    };
    move();
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(move) : null;
    observer?.observe(nav);
    nav.querySelectorAll("a").forEach((link) => observer?.observe(link));
    window.addEventListener("resize", move);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", move);
    };
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!header.current.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const links = (mobile = false) => sectionNavItems.map(({ label, to }) => (
    <Link key={to} to={sectionPath(to)} aria-current={active === to ? "location" : undefined}
      onClick={mobile ? () => setOpen(false) : undefined}>
      {label}
    </Link>
  ));

  return (
    <header className="u-header" ref={header}>
      <Link className="u-button u-skip" to={sectionPath("home")}>Skip to content</Link>
      <div className="u-container u-bar">
        <Link className="u-brand" to={sectionPath("home")} aria-label="Ursus overview">
          <img src={logo} alt="" width="48" height="46" />
          <span>URSUS</span>
        </Link>
        <nav className="u-nav" aria-label="Primary" ref={desktop}>
          {links()}
          <span className="u-indicator" ref={indicator} aria-hidden="true" />
        </nav>
        <div className="u-header-actions">
          <ProfileLinks iconsOnly />
          <Link className="u-icon" to="/login" aria-label="Admin dashboard" title="Admin dashboard">
            <DashboardOutlined aria-hidden="true" />
          </Link>
          <button className="u-icon" type="button" onClick={toggleTheme}
            aria-label="Toggle light and dark mode" aria-pressed={mode === "light"}>
            {mode === "light" ? <LightModeRounded /> : <DarkModeRounded />}
          </button>
          <button className="u-icon u-menu-toggle" ref={menuButton} type="button" aria-expanded={open}
            aria-controls="ursus-mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      <div className="u-mobile" id="ursus-mobile-nav" hidden={!open}>
        <nav className="u-container" aria-label="Mobile">
          {links(true)}
          <ProfileLinks />
        </nav>
      </div>
    </header>
  );
}
