---
title: Featured Projects tag alignment
created: 2026-11-21T07:44:51-05:00
last_updated: 2026-11-21T07:50:09-05:00
status: active
---

# Featured Projects tag alignment

- **Implemented.** [ProjectCard](../../src/features/home/components/projects/ProjectCard.jsx) renders technology tags after optional project links. [Ursus styles](../../src/features/brand/ursus.css) use an automatic top margin for the tags and retain bottom alignment for links when tags are absent.
- **Verified.** All 35 tests, ESLint, and the production build passed. The main chunk still exceeds Vite's size warning threshold. Headless Edge checked cards rendered from the component with sample content at 1280, 768, and 375 px in light and dark modes. Same-row heights, title and tag alignment, bottom padding, and tag wrapping passed.
- No follow-up required. No commit, push, or deployment.
