---
title: ADR-0001 Static hosting and hash routing
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# ADR-0001 Static hosting and hash routing

**Status:** In use. **Historical evidence timestamp:** 2026-05-19T22:13:00-04:00 (Git author time for commit 6d54008, Pages deployment restoration). Original hash-routing decision time is unknown.

**Context and problem.** Git history records restoring GitHub Pages publication after moving from CRA to Vite.

**Decision and implementation.** [Vite](../../vite.config.mjs) uses the repository subpath and [package scripts](../../package.json) publish dist with gh-pages. [App](../../src/App.jsx) uses HashRouter for browser routes and lazy-loads the dashboard.

**Alternatives and rationale.** CRA was the previous build system. Alternatives considered and original hash-routing rationale are unknown.

**Consequences.** The browser handles fragment routes while static hosting serves the base path. Asset paths depend on Vite's configured host subpath. See [development workflow](../references/DEVELOPMENT_WORKFLOW.md).
