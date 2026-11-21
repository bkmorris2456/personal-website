---
title: Public portfolio
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-21T08:31:50-05:00
status: active
---

# Public portfolio

**Verified.** [Home](../../src/features/home/Home.jsx) presents Overview, Firestore-backed Experience and Featured Projects, the developer biography and portrait, Technologies Used, and Contact. [Project cards](../../src/features/home/components/projects/ProjectCard.jsx) display technology tags from supported current and legacy fields and still offer available Demo and GitHub links. There are no separate detail routes or project filters.

The Overview, Ursus brand, and skip links target `/personal-website/#/home#overview`. The hero receives focus and the Overview link is marked active at the top of the page.

Featured Projects cards stretch to equal heights within each grid row. Titles and descriptions flow from the top, and technology tags wrap at the bottom below any project links.

Technologies Used groups 27 badges under Languages, Frameworks & Libraries, Backend & Databases, and Tools & Testing. Category cards use two columns on desktop and tablet and stack on mobile. The Skills navigation link targets the section.

The public collection hook exposes loading, empty and error states without changing the readers or collection paths. The contact form retains its EmailJS field names and reports submission status inline.

See the [redesign record](../development/URSUS_BRAND_REDESIGN.md) for component details, automated and browser validation, and limits on live provider verification.
