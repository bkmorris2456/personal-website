---
title: Ursus brand redesign
created: 2026-11-20T20:44:36-05:00
last_updated: 2026-11-20T22:30:20-05:00
status: active
---

# Ursus brand redesign

## Direction

Ursus is the public identity for Blake Morris’s developer portfolio. The homepage concept informed the horizontal header, split hero, restrained silver mark and compact project grid. The design-system reference informed interaction feedback, motion and loading. The redesign uses the supplied [hero reference](../../src/assets/brand-redesign-references/homepage-concept.png), [design-system reference](../../src/assets/brand-redesign-references/ursus-design-spec-overview.png), and original [bear-and-orbit PNG](../../src/assets/images/ursus-logo.png). The project grid displays Firestore content, including links and technologies where present.

## Tokens and typography

| Token | Value | Role |
| --- | --- | --- |
| Obsidian | `#0B0F0E` | Public background |
| Forest Charcoal | `#151C19` | Cards and other surfaces |
| Graphite | `#222B27` | Elevated or hovered surfaces, technology tags |
| Nordic Green | `#527D65` | Primary actions and featured-card edge |
| Sage Green | `#80A98B` | Focus, sliding indicator and action hover |
| Silver | `#D6D9D5` | Brand and icon accents |
| Off-White | `#E9EDE9` | Main text |
| Cool Gray | `#9AA6A0` | Secondary text |
| Slate Green | `#35433B` | Dividers and borders |

The scoped stylesheet centralizes spacing, radius, interaction timing and theme overrides. The default dark palette follows the reference. The light palette uses the existing saved theme preference and keeps the same hierarchy. Existing Clash Display headings and Satoshi body and control styles use the bundled font declarations and corrected Satoshi paths. White text on Nordic Green measures 4.69:1. Dark text on Sage measures 7.32:1. Cool Gray on Graphite measures 5.78:1. Controls use a separate higher-contrast border and visible focus outlines.

## Navigation, motion and responsive behavior

- The same destinations work on desktop and in the mobile disclosure. The desktop underline slides at 220 ms and follows the visible section. Selecting a section moves focus and sets a shareable fragment such as `#/home#projects`. Back, Forward and direct links restore the section. A layout observer corrects shifts from late content above a linked section until the visitor interacts.
- The mobile disclosure uses an explicit button with expanded state, closes after selecting a destination or clicking outside, and restores the menu button’s focus on Escape. The primary keyboard path starts with a skip link. Profile links and the login route remain accessible.
- Button transitions are 150 ms, card transitions 180 ms, and entry fades with a small vertical offset 240 ms. The branded load indicator has a static logo with an animated border. Reduced motion disables CSS motion and uses instant section scrolling.
- The menu switches to disclosure at 66 rem. Projects go from three columns to two at 56 rem, then to one at 38 rem. The hero, experience, About and Contact stack on narrow screens. Skills flow into the available width. Sticky offsets keep linked headings below the header.

## Files

| File | Change |
| --- | --- |
| [ursus.css](../../src/features/brand/ursus.css) | Scoped tokens, light overrides, typography, controls, surfaces, focus, motion, and responsive layout shared by Home and Login. |
| [UrsusStatus.jsx](../../src/features/brand/UrsusStatus.jsx) | Branded loader and status feedback. |
| [Navbar.jsx](../../src/features/navbar/Navbar.jsx) | Brand, shared destinations, accessible mobile disclosure, scroll state and sliding indicator. Replaces the old DesktopNav and MobileNavMenu components and their navbarStyles module. |
| [navItems.js](../../src/features/navbar/constants/navItems.js) | Shared section fragment links and the existing GitHub and LinkedIn URLs. |
| [Home.jsx](../../src/features/home/Home.jsx) | Reordered public sections, focus and offset restoration, About biography and portrait, and contact destinations. |
| [HeroSection.jsx](../../src/features/home/components/HeroSection.jsx) | Split layout with the original PNG, existing professional introduction and project and contact actions. The longer biography and headshot are in About. |
| [ProjectTabs.jsx](../../src/features/home/components/projects/ProjectTabs.jsx) | Existing Firestore results rendered in a responsive grid, with load, empty and error states. |
| [ProjectCard.jsx](../../src/features/home/components/projects/ProjectCard.jsx) | Compact cards with bundled thumbnails where available, technology tags from supported legacy and current fields, and existing demo and repository links. |
| [projectImages.js](../../src/features/home/components/projects/projectImages.js) | Consolidated the three existing image-key mappings in the project feature. |
| [usePortfolioCollection.js](../../src/features/home/usePortfolioCollection.js) | Shared public request state with cleanup when the consumer unmounts. |
| [ExperienceNodes.jsx](../../src/features/home/components/experience/ExperienceNodes.jsx) | Existing position content in labeled cards with request feedback. |
| [SkillsSection.jsx](../../src/features/home/components/skills/SkillsSection.jsx) and [SkillCard.jsx](../../src/features/home/components/skills/SkillCard.jsx) | Semantic, wrapping list using the existing bundled skills and icons. |
| [ContactForm.jsx](../../src/features/home/components/contact/ContactForm.jsx) | Labeled fields, in-form status and existing EmailJS field names and service configuration. Replaces unused ContactButton component. |
| [Login.jsx](../../src/features/login/Login.jsx) and [App.jsx](../../src/App.jsx) | Branded sign-in presentation and existing theme preference. Auth flow and route definitions retain their behavior. |
| [index.html](../../index.html) and [manifest.json](../../public/manifest.json) | Ursus title, description, tab icon and manifest labels. |
| [Home.test.jsx](../../src/features/home/Home.test.jsx) | Section URLs and focus, reduced motion, mobile menu keyboard behavior, project data states and mocked EmailJS submission. |

The six former public MUI style modules (`contactStyles.js`, `experienceStyles.js`, `heroStyles.js`, `homeStyles.js`, `projectStyles.js`, and `skillsStyles.js`) were replaced by the scoped tokens. The existing MUI theme and admin UI styling remain on the dashboard.

## Functionality and scope

The pre-redesign website had a single public Home route plus login and the lazily loaded admin dashboard. Projects, Experience, Skills, About and Contact are sections within Home. There was no project detail route or project filter implementation in the repository. All projects still render in the order returned by the existing reader. Added technology display uses canonical `stack` or the legacy `techStack` and `technologies` aliases. Firebase config, collections, login checks, dashboard CRUD, the dashboard Tech Stack fix, dependency versions and the deployment base are preserved.

## Validation and remaining work

- All 29 Vitest tests passed, including five new public-portfolio tests. ESLint, the compiler check and an isolated Vite production build passed.
- Chromium at 1440×900, 1100×800, 820×1000, 390×844 and 320×700 had no horizontal overflow. Browser checks covered the logo and fonts, responsive card columns, keyboard focus, the sliding indicator, direct section links with delayed data, Back and Forward, theme persistence, reduced motion, mobile Escape handling, and login and dashboard routes. Browser QA used fixture records and blocked external requests.
- The original PNG is about 1.25 MB and the build still reports a JavaScript chunk above 500 kB. The design keeps the supplied logo file intact.
- Live Firebase reads, real Google sign-in, EmailJS delivery, screen-reader-specific behavior, and browser engines beyond Chromium were outside verification.

Start `npm run dev` and open the printed URL under `/personal-website/`.

## Refinement Pass 1

### Public layout and navigation

- The hero opens with **Blake Morris**. The introductory eyebrow is gone, with top spacing adjusted around the existing title, description and actions.
- The footer shows © followed by the current year and Ursus. It has no dashboard link.
- Public contact displays email and the existing form. The phone text and telephone link were removed. Source, public metadata, rendered browser pages and isolated build output were checked for duplicate telephone references.
- One compact **Admin dashboard** link is next to the theme toggle in the top bar, including on mobile. It opens the existing login. The disclosure menu and footer have no admin links. Route and access logic remain unchanged.
- Light mode previously darkened the entire raster with brightness/sepia while the hero lowered its opacity, leaving the baked-in halo visible. A grayscale contrast/inversion filter isolates the dark mark against the light background, and multiply blending removes the light halo against that surface. The navigation marks and loader use the same light treatment. Dark mode uses the original silver PNG at full opacity.

### Dashboard

The dashboard uses the shared Ursus token palette, typography, spacing and focus styling. Cards, tables, editable fields, selectable tags, project status chips, dialogs, and the return and theme controls support both themes. Portaled dialogs receive their own scoped theme attributes so they use the same colors as the dashboard. Dialog fades use 150 ms and respect reduced motion. Loader, empty states, read errors, validation and save messages use in-context feedback. Firestore calls and payloads, authorization, validation rules, and Tech Stack partial updates retain their behavior.

| File | Refinement |
| --- | --- |
| [Home.jsx](../../src/features/home/Home.jsx) | Dynamic copyright and email-only contact information. |
| [HeroSection.jsx](../../src/features/home/components/HeroSection.jsx) | Starts directly with the name. |
| [Navbar.jsx](../../src/features/navbar/Navbar.jsx) | Single labeled header icon opens login on every viewport. |
| [ursus.css](../../src/features/brand/ursus.css) | Sharp theme-specific logo, shared dialog tokens and public spacing cleanup. |
| [App.jsx](../../src/App.jsx) and [Dashboard.jsx](../../src/features/dashboard/Dashboard.jsx) | Dashboard theme wiring, branded header and loader, plus inline feedback. |
| [dashboardStyles.js](../../src/features/dashboard/styles/dashboardStyles.js) | Token-based admin panels, controls, status, focus, and light/dark dialogs. |
| [DashboardFormModal.jsx](../../src/features/dashboard/components/DashboardFormModal.jsx) and [ViewAllModal.jsx](../../src/features/dashboard/components/ViewAllModal.jsx) | Scoped portal theme, motion preference, feedback and empty table. |
| [TableCard.jsx](../../src/features/dashboard/components/TableCard.jsx) and [SingleSelectTags.jsx](../../src/features/dashboard/components/SingleSelectTags.jsx) | Compact responsive layout, labeled icon controls, visible project status and announced selection state. |
| [useDashboardData.js](../../src/features/dashboard/hooks/useDashboardData.js) and [useDashboardCrud.js](../../src/features/dashboard/hooks/useDashboardCrud.js) | Expose read and mutation outcomes for presentation. Collection access, operation order and payload logic are preserved. |
| [Home.test.jsx](../../src/features/home/Home.test.jsx) and [Dashboard.test.jsx](../../src/features/dashboard/Dashboard.test.jsx) | Verify the public refinements and all three entity workflows against mocks. |

### Validation and limits

- All 35 Vitest tests passed, including six new cases. The dashboard cases cover create, edit, delete and view-all for positions, projects and skills, the existing status-only project payload, and validation before a write.
- ESLint, the compiler check, Git whitespace checks and an isolated production build passed. The existing JavaScript chunk above 500 kB remains.
- Chromium checked Home at 1440, 820, 390 and 320 px, and the dashboard and edit dialog at 1440, 390 and 320 px. Both themes were inspected, along with the single header entry, login and dashboard routes, footer, no telephone links, and no horizontal page overflow. The browser used fixtures and blocked external requests.
- Live sign-in, server-side permissions, production data and live writes were outside verification. No commit, push or deployment was performed.

## About and Contact layout refinement

[Home.jsx](../../src/features/home/Home.jsx) groups the About heading, portrait and biography in a centered 900 px container. [ursus.css](../../src/features/brand/ursus.css) aligns the portrait vertically with the text on wider screens, keeps a 40–48 px column gap, and stacks the portrait above the left-aligned biography at narrow widths. Contact centers its introductory content and the form in a single column capped at 688 px. The form retains its left-aligned fields and submit button. Existing copy, portrait aspect ratio, links and form behavior are preserved.

Chromium verified both themes at 1440, 820, 390 and 320 px, including alignment and absence of horizontal overflow. Native validation and mocked EmailJS success and failure flows passed. All 35 existing Vitest tests, ESLint and the isolated Vite production build passed. The existing chunk-size warning remains. No live email was sent.

## Homepage section heading alignment

Featured Projects, Experience, About, Skills and Contact Me use the shared `u-section-title` style. Each heading spans its section and shares the same centerline, responsive Clash Display typography, section padding and bottom margin. The About group, Contact form and project, experience and skill layouts retain their respective widths and alignment. The current Contact content has no standalone email link, so the existing homepage test now checks the form's email field.

Chromium confirmed heading alignment, typography and spacing and checked for overflow in both themes at 1440, 820, 390 and 320 px. All 35 tests, ESLint and an isolated production build passed. The existing Vite chunk-size warning remains.

## Featured Projects card artwork

Project cards now start with a text title aligned with the description below. The unused title artwork and image-key mapping were removed from the card implementation. Source artwork, project records, technology tags, links and hover behavior were preserved.

All 35 tests, ESLint and an isolated production build passed. Chromium checked title alignment, tags, links and hover behavior at 1440 and 390 px in both themes using fixture records. The existing chunk-size warning remains.
