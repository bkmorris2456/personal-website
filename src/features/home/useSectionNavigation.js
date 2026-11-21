import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { sectionIds, sectionNavItems } from "../../routing/routes";

export default function useSectionNavigation(sectionId) {
  const { key, state } = useLocation();
  const navigation = useNavigationType();
  const shouldAnimate = navigation === "PUSH" || (navigation === "REPLACE" && state?.scrollToSection === true);
  const [active, setActive] = useState(sectionId);
  const scrollingToSection = useRef(false);

  useLayoutEffect(() => {
    let frame;
    const update = () => {
      if (scrollingToSection.current) return;
      const header = document.querySelector(".u-header");
      // Match the heading offset while allowing for rounding at fractional zoom.
      const boundary = (header?.getBoundingClientRect().bottom ?? 0) + 24;
      const sections = sectionNavItems.map(({ id }) => document.getElementById(id)).filter(Boolean);
      const visible = sections.findLast((section) => section.getBoundingClientRect().top <= boundary);
      const atBottom = window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? sectionIds.contact : visible?.id ?? sectionIds.overview);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const content = document.querySelector(".u-main");
    const observer = typeof ResizeObserver === "function" && content ? new ResizeObserver(schedule) : null;
    observer?.observe(content);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scrollend", schedule);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("scrollend", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useLayoutEffect(() => {
    const section = document.getElementById(sectionId);
    const main = section?.closest(".u-main");
    if (!main) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smooth = shouldAnimate && !reduced;
    scrollingToSection.current = smooth;
    setActive(sectionId);
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });

    let previousTop = section.offsetTop;
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(() => {
      const top = section.offsetTop;
      if (top !== previousTop && document.activeElement === section) {
        section.scrollIntoView({ behavior: "instant" });
      }
      previousTop = top;
    }) : null;

    const finishScrolling = () => { scrollingToSection.current = false; };
    const yieldToVisitor = () => {
      finishScrolling();
      observer?.disconnect();
    };
    const inputEvents = ["wheel", "touchstart", "pointerdown", "keydown"];
    observer?.observe(main);
    window.addEventListener("scrollend", finishScrolling, { once: true });
    // A no-op scroll or a browser without scrollend still needs to release tracking.
    const timeout = smooth ? window.setTimeout(finishScrolling, 1000) : undefined;
    inputEvents.forEach((event) => window.addEventListener(event, yieldToVisitor, { passive: true, once: true }));
    return () => {
      finishScrolling();
      observer?.disconnect();
      window.clearTimeout(timeout);
      window.removeEventListener("scrollend", finishScrolling);
      inputEvents.forEach((event) => window.removeEventListener(event, yieldToVisitor));
    };
  }, [sectionId, key, shouldAnimate]);

  return active;
}
