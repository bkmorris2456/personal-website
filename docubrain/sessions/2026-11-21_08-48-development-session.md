---
title: Canonical routing and dashboard authorization
created: 2026-11-21T08:48:19-05:00
last_updated: 2026-11-21T08:48:19-05:00
status: active
---

# Canonical routing and dashboard authorization

**Objective.** Standardize public URLs and preserve continuous scrolling on the RoutingAdjustments branch. The approved history behavior keeps the URL fixed during manual scrolling and restores explicit section destinations on Back and Forward.

**Implemented.** [Route metadata](../../src/routing/routes.js) centralizes public identifiers, navigation labels, application paths and legacy resolution. [App](../../src/App.jsx) uses one public portfolio view and replaces old or unknown URLs with canonical ones. [Section navigation](../../src/features/home/useSectionNavigation.js) coordinates focus, smooth scrolling, reduced motion, sticky-header spacing and active highlighting. Login and dashboard return links lead to Overview.

**Implemented.** [ProtectedRoute](../../src/features/login/ProtectedRoute.jsx) gates dashboard loading and mounting on a verified Firebase user with the boolean admin claim. The [auth observer](../../src/context/AuthContext.jsx) invalidates outstanding claim lookups on newer events and cleanup. The login route preserves the dashboard destination in router state and keeps Google popup sign-in.

**Validation.** All 54 Vitest tests, ESLint, TypeScript compiler checking and an isolated production build passed. Vite reported its existing chunk-size warning. Chromium-based Edge exercised the production build under the Pages base at 1280, 1057 and 375 px. It covered each section by click, direct URL and reload, focus and header clearance, history and active highlight, a persistent portfolio mount, mobile menu behavior, legacy and unknown routes, Login to Overview and signed-out dashboard access. A separate build with a fixture auth adapter exercised admin and non-admin dashboard access, dashboard return navigation and sign-out at 1280 and 375 px. The browser used local files and blocked external requests.

**Open follow-up.** Live Google sign-in and deployed Firestore rules remain unverified. No Firebase settings, Firestore rules, deployment workflows or remote branches were changed.
