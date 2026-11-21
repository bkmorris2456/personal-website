---
title: Portfolio section history
created: 2026-11-21T08:58:27-05:00
last_updated: 2026-11-21T08:58:27-05:00
status: active
---

# Portfolio section history

**Implemented.** Portfolio menu links, the brand link, the skip link, and hero actions now use React Router replacement navigation. Link state allows [section scrolling](../../src/features/home/useSectionNavigation.js) to animate explicit selection while direct entry, browser history, and legacy redirects preserve immediate restoration. Manual scrolling continues to update only the active highlight. Login and Dashboard retain separate page navigation.

**Validation.** All 55 Vitest tests, ESLint, type checking and the isolated production build passed. The build reported its existing chunk-size warning. Chromium-based Edge verified all six section links, direct URLs and reloads, legacy redirects, and manual scrolling with stable URL and history at 1280, 1057 and 375 px. Back returned to a separate local test origin after section clicks, and Forward restored the last selected section. Back and Forward worked across Login and the portfolio at all widths and across Dashboard and the portfolio with fixture authentication at 1280 and 375 px.

**Open follow-up.** Live provider and deployed Firestore rule verification remain open from the [routing session](2026-11-21_08-48-development-session.md). Changes remain local and uncommitted.
