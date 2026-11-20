---
title: Development workflow
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-20T14:28:28-05:00
status: active
---

# Development workflow

**Verified from repository configuration.** Use a Node release compatible with the Vite version locked in [package-lock.json](../../package-lock.json). Install dependencies with `npm ci`, launch development with `npm run dev` (or `npm start`), and build with `npm run build`. Use `npm run preview` to serve the build locally at the configured [base path](../../vite.config.mjs), /personal-website/. The visualizer emits bundle-stats.html. Build in a disposable copy if you need to preserve the tracked report.

[Package scripts](../../package.json) configure `npm run deploy` to run the build and publish dist using gh-pages. GitHub Pages publication settings and currently deployed revision are unknown. Running deploy is a publication operation.

Run `npm test` (Vitest, nine route/data contract tests), `npm run typecheck` (TypeScript noEmit/allowJs; checkJs disabled), and `npm run lint` (ESLint syntax/core correctness rules) before `npm run build`. The JavaScript application has no strict type-checking coverage. See the [security ledger](../development/DEPENDABOT_REMEDIATION.md) for batch validation and limitations. Live Firebase and EmailJS workflows require authorized service configuration. Repository-local emulator and staging procedures were not found.
