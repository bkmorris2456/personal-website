---
title: Development workflow
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# Development workflow

**Verified from repository configuration.** Use a Node release compatible with the Vite version locked in [package-lock.json](../../package-lock.json). Install dependencies with `npm ci`, launch development with `npm run dev` (or `npm start`), and build with `npm run build`. Use `npm run preview` to serve the build locally at the configured [base path](../../vite.config.mjs), /personal-website/. The visualizer emits bundle-stats.html. Build in a disposable copy if you need to preserve the tracked report.

[Package scripts](../../package.json) configure `npm run deploy` to run the build and publish dist using gh-pages. GitHub Pages publication settings and currently deployed revision are unknown. Running deploy is a publication operation.

There is no npm test script. [Legacy test](../../src/App.test.js) and [setup](../../src/setupTests.js) remain, and no current runner is configured. See the [session index](../sessions/SESSION_INDEX.md) for actual validation results. Live Firebase and EmailJS workflows require authorized service configuration. Repository-local emulator and staging procedures were not found.
