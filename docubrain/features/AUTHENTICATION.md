---
title: Authentication
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-21T08:48:19-05:00
status: active
---

# Authentication

**Verified by source.** [Login](../../src/features/login/Login.jsx) opens Firebase Google sign-in and disables its button during loading or sign-in. [AuthContext](../../src/context/AuthContext.jsx) observes auth changes, refreshes the ID token, and accepts only the boolean admin claim. Signed-out state clears the user and admin flag. Claim lookup failures log an error and resolve as non-admin. The provider clears authorization while checking a new account and ignores pending results from older auth events or a disposed subscription. The login page redirects admins to the dashboard, signs out non-admins and displays an error, and reports popup failures.

[ProtectedRoute](../../src/features/login/ProtectedRoute.jsx) guards the lazy dashboard. Signed-out visitors go to Login with the dashboard destination in router state. Signed-in visitors without the admin claim go to Overview. The guard keeps the dashboard unmounted during authorization and revokes access when the observed session changes. [App tests](../../src/App.test.jsx) exercise access and auth transitions with mocked Firebase events. The [Firebase ADR](../decisions/ADR-0002-direct-firebase.md) covers the managed service boundary. Live Google sign-in, claim provisioning and Firestore rule enforcement remain unverified.
