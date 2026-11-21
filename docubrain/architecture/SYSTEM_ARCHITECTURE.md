---
title: System architecture
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-21T08:58:27-05:00
status: active
---

# System architecture

**Verified.** GitHub Pages is the configured static host for the Vite output. React runs in the browser and calls Firebase Auth, Firestore, and EmailJS directly. The checked-in application has no custom backend or server API. Firebase initialization exports shared auth, database and Google provider instances. The analytics initialization is commented out. See [Vite config](../../vite.config.mjs) and [Firebase initialization](../../src/firebase/firebase.js).

[App](../../src/App.jsx) uses HashRouter under the GitHub Pages base. One portfolio route renders all sections and selects the scroll target from the canonical pathname inside the hash. In-page section links replace the current history entry. Login and Dashboard remain separate page destinations. [Route metadata](../../src/routing/routes.js) defines public section IDs and labels and normalizes old URLs. Login handles Google sign-in. The dashboard guard resolves identity and authorizes the admin claim before rendering the lazy dashboard.

[Root component](../../src/index.jsx) owns palette mode and persists it to localStorage. [AuthContext](../../src/context/AuthContext.jsx) owns the observed Firebase user, admin claim and loading state. Portfolio sections and dashboard hooks own their own read results. Form, pagination and dialog state are local to the dashboard feature. Firestore stores content across sessions.

The client recognises the Firebase custom claim `admin === true`. Firestore rules determine what the browser can read or write. **Unknown.** Deployed rules, claim provisioning and live service settings are outside the checked-in evidence. See [authentication](../features/AUTHENTICATION.md), [data flow](DATA_FLOW.md), [structure](PROJECT_STRUCTURE.md), and [dependencies](DEPENDENCIES.md).
