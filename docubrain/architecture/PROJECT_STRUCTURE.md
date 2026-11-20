---
title: Project structure
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# Project structure

**Verified.**

| Location | Responsibility |
| --- | --- |
| [index.html](../../index.html) and [src/index.jsx](../../src/index.jsx) | HTML mount, React root, theme and global CSS |
| [src/App.jsx](../../src/App.jsx) and [src/context](../../src/context/) | Routes and auth context |
| [src/features/home](../../src/features/home/) and [src/features/navbar](../../src/features/navbar/) | Public sections, desktop and mobile navigation |
| [src/features/login](../../src/features/login/) | Login and route guard |
| [src/features/dashboard](../../src/features/dashboard/) | Management page, components, hooks, form config, data helpers and styling |
| [src/firebase](../../src/firebase/) | Managed service initialization and shared collection reads |
| [src/theme](../../src/theme/), [fonts](../../src/assets/fonts/), and [global CSS](../../src/index.css) | MUI theme, local Satoshi and Clash Display fonts, and base styles |
| [public](../../public/) and [assets](../../src/assets/) | Public files and imported media |
| [package.json](../../package.json), [lockfile](../../package-lock.json), and [Vite config](../../vite.config.mjs) | Scripts, dependency resolution and build settings |

Feature-local style modules supply MUI `sx` objects. Dashboard hooks separate fetch state, display derivation, modal state, and writes. [App.css](../../src/App.css) provides shell styles. See the [feature index](../features/FEATURE_INDEX.md).
