---
title: Public portfolio
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# Public portfolio

**Verified by source.** [Home](../../src/features/home/Home.jsx) assembles the [hero](../../src/features/home/components/HeroSection.jsx), experience, skills, project cards and contact. [ExperienceNodes](../../src/features/home/components/experience/ExperienceNodes.jsx) loads positions, displaying company, title, dates and descriptions. [ProjectTabs](../../src/features/home/components/projects/ProjectTabs.jsx) resolves bundled images by imageKey and renders one card per fetched project. [ProjectCard](../../src/features/home/components/projects/ProjectCard.jsx) conditionally shows Demo and GitHub links. The technologies prop has no rendered output. Unknown image keys have no mapped asset.

Both Firestore-backed sections begin with empty arrays and populate after successful mount-time reads. Neither adds a loading or error UI or catches a rejected request. Experience maps normalised descriptions and shows Present for open-ended positions. Skills pass [bundled entries](../../src/features/home/constants/skills.jsx) to [SkillsSection](../../src/features/home/components/skills/SkillsSection.jsx) and do not consume dashboard Skill edits.

See [direct Firebase integration](../decisions/ADR-0002-direct-firebase.md) and [data flow](../architecture/DATA_FLOW.md). No dedicated feature test was found. Live reads and layout were not verified.
