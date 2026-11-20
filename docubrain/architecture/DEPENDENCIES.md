---
title: Dependencies and configuration
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-20T14:28:28-05:00
status: active
---

# Dependencies and configuration

**Verified.** [Manifest](../../package.json) declares React 18, React Router 7, MUI 5 and Emotion, Motion, Firebase 12, EmailJS, React Scroll, React Icons, intersection observer and Web Vitals. Vite 8, its React plugin, the bundle visualizer and gh-pages support local builds and publication. Source imports framer-motion, which is provided transitively by motion in the [lockfile](../../package-lock.json).

Browser integration configuration is in [Firebase initialization](../../src/firebase/firebase.js) and the [contact form](../../src/features/home/components/contact/ContactForm.jsx). Runtime services require network access and deployed provider settings. No app environment-variable reads were found in the inspected source. Firebase provider enablement, Firestore rules and EmailJS template configuration are **unknown**.

Legacy manifest entries include Express, CORS, MySQL and dotenv. The checked-in browser application exposes no corresponding server entry point. See [development commands](../references/DEVELOPMENT_WORKFLOW.md).

**Verified 2026-11-20.** Compatible security updates remove the vulnerable ranges for all 56 original Dependabot alerts; npm audit reports zero vulnerabilities. A scoped Firestore gRPC override is required because upstream pins an affected minor. Vitest/jsdom, ESLint and TypeScript now support repeatable validation. See the [remediation ledger](../development/DEPENDABOT_REMEDIATION.md) for versions, all alert IDs, compatibility changes and test limits.
