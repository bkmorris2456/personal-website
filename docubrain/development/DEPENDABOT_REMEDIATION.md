---
title: Dependabot remediation ledger
created: 2026-11-20T14:22:39-05:00
last_updated: 2026-11-20T14:22:39-05:00
status: active
---

# Dependabot remediation ledger

**Verified 2026-11-20T14:22:39-05:00.** GitHub REST returned 56 open alerts (2 critical, 21 high, 30 medium, 3 low). All affect package-lock.json. Every installed occurrence of the 14 affected packages was checked with semver against every original advisory range: 56 pass, zero remaining. The final npm audit reports zero vulnerabilities, including development dependencies. **Expected:** these alerts close when the reviewed lockfile reaches GitHub's default branch and is rescanned. Nothing was pushed or dismissed.

## Groups and dependency changes

| Dependency | Original → final | Root cause / dependency path | Alert count |
| --- | --- | --- | --- |
| @grpc/grpc-js | 1.9.15 → 1.14.7 | Firebase Firestore → gRPC; stale ~1.9.0 constraint | 4 |
| axios | 1.16.1 → 1.21.1 | Direct Axios; HTTP request and response handling | 21 |
| body-parser | 1.20.5 → 1.20.9 | Express → body-parser; request parsing | 2 |
| follow-redirects | 1.16.0 → 1.16.3 | Axios → follow-redirects; credential forwarding across redirects | 3 |
| form-data | 4.0.5 → 4.0.6 | Axios → form-data; multipart boundary handling | 1 |
| mysql2 | 3.22.3 → 3.24.6 | Direct MySQL2; SQL handling | 1 |
| postcss | 8.5.14 → 8.5.33 | Vite → PostCSS; CSS parsing | 2 |
| protobufjs | 7.5.8 → 7.6.6 | Firestore → proto-loader → protobufjs; protobuf parsing | 3 |
| proxy-addr | 2.0.7 → 2.0.8 | Express → proxy-addr; proxy trust handling | 1 |
| qs | 6.15.2 → 6.16.2 | Express/body-parser → qs; query parsing | 3 |
| react-router | 7.15.1 → 7.18.6 | react-router-dom → react-router; routing/security boundary | 5 |
| source-map-js | 1.2.1 → 1.2.4 | PostCSS → source-map-js; source-map handling | 1 |
| vite | 8.0.13 → 8.3.8 | Direct Vite; development server handling | 7 |
| websocket-driver | 0.7.4 → 0.8.0 | Firebase database → faye-websocket → websocket-driver; frame limits | 2 |

Additional patched package: nanoid 3.3.12 → 3.3.20, found by npm audit outside the original 56 alerts. Parent packages Express 4.22.2 → 4.22.3 and react-router-dom 7.15.1 → 7.18.6 were updated. Direct security-update minimums now match the installed versions. Firebase stays at 12.13.0.

## Validation by batch

| Batch | Scope | Tests | Compiler | Lint | Production build |
| --- | --- | --- | --- | --- | --- |
| Baseline/tooling | Restore runnable checks | 9 passed | Passed | Passed | Passed |
| 1 | Express parsing/proxy + Firebase websocket/protobuf + gRPC 1.9.16 | 9 passed | Passed | Passed | Passed |
| 1b | Scoped gRPC override to 1.14.7 | 9 passed | Passed | Passed | Passed |
| 2 | Axios, redirects, multipart, MySQL2 | 9 passed | Passed | Passed | Passed |
| 3 | Router, Vite, PostCSS, source maps, nanoid | 9 passed | Passed | Passed | Passed |
| Clean install | npm ci --fetch-retries=0 and repeat checks | 9 passed | Passed | Passed | Passed |

Commands: npm test; npm run typecheck; npm run lint; npm run build. Node 24.21.0 and npm 12.2.1. Tests cover real HashRouter routing with mocked page/Auth components and Firestore reader contracts with mocked services. TypeScript runs in noEmit/allowJs mode with checkJs disabled; this JavaScript repository has no TypeScript source and this is not strict application type coverage. ESLint checks syntax and selected core correctness rules; it replaces the unusable CRA config. Live Firebase auth, persistence, and EmailJS delivery were not exercised. Existing missing-font URLs and large-bundle warnings remain. The generated tracked bundle report is restored after validation.

Clean installation succeeds with zero vulnerabilities. npm warns that emailjs-com is deprecated and blocks three install scripts under the existing allowScripts policy; production compilation still succeeds. No scripts were approved to bypass that policy.

## Compatibility and decisions

- Direct application updates stay within their existing majors. No application source behavior changed.
- Firestore pins gRPC to ~1.9.0, which cannot satisfy the >=1.13.6 security fixes. Registry inspection also found that the latest Firestore retains that pin. The sole override is scoped to @firebase/firestore → @grpc/grpc-js ^1.13.6, resolving 1.14.7. Remove it when upstream supports a secure version. Mocked browser data tests and the production bundle pass; actual Node gRPC RPC interoperability remains unverified.
- websocket-driver 0.8.0 disables obsolete draft75/76 protocols by default and requires websocket-extensions >=0.2.0. Parent faye-websocket's >=0.5.1 constraint accepts it. Modern browser Firebase connections use standardized WebSockets; **inferred** no effect on this browser SPA. No draft protocol usage was found in application source. This release also carries further parser fixes, so it was retained over 0.7.5. [Upstream changelog](https://github.com/faye/websocket-driver-node/blob/main/CHANGELOG.md).
- Vite 8.3.8 updates its native/optional toolchain, including optional WASM @emnapi packages to 2.0.0-beta.2. Native macOS installation and build pass; other-platform optional WASM execution is unverified. No source/config migration was required.
- Do not run npm audit fix --force, suppress alerts, or downgrade Firebase as suggested by the intermediate audit. None was done.

## Alert-by-alert expected resolution

Batch means the first captured batch lockfile free of that alert's vulnerable range. Advisory titles preserve the specific root cause.

| Alert | Package | Severity | Advisory / root cause | First fixed batch |
| --- | --- | --- | --- | --- |
| [#109](https://github.com/bkmorris2456/personal-website/security/dependabot/109) | @grpc/grpc-js | high | [@grpc/grpc-js: An incoming malformed compressed message can cause a client or server crash](https://github.com/advisories/GHSA-99f4-grh7-6pcq) | 1 |
| [#110](https://github.com/bkmorris2456/personal-website/security/dependabot/110) | @grpc/grpc-js | high | [@grpc/grpc-js: A malformed request can cause a server crash](https://github.com/advisories/GHSA-5375-pq7m-f5r2) | 1 |
| [#111](https://github.com/bkmorris2456/personal-website/security/dependabot/111) | vite | medium | [vite: `server.fs.deny` bypass on Windows alternate paths](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) | 3 |
| [#112](https://github.com/bkmorris2456/personal-website/security/dependabot/112) | vite | medium | [launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) | 3 |
| [#113](https://github.com/bkmorris2456/personal-website/security/dependabot/113) | protobufjs | medium | [protobufjs : Schema-derived names can shadow runtime-significant properties](https://github.com/advisories/GHSA-f38q-mgvj-vph7) | 1 |
| [#114](https://github.com/bkmorris2456/personal-website/security/dependabot/114) | protobufjs | high | [protobufjs: Denial of service through unbounded Any expansion during JSON conversion](https://github.com/advisories/GHSA-wcpc-wj8m-hjx6) | 1 |
| [#115](https://github.com/bkmorris2456/personal-website/security/dependabot/115) | form-data | high | [form-data: CRLF injection in form-data via unescaped multipart field names and filenames](https://github.com/advisories/GHSA-hmw2-7cc7-3qxx) | 2 |
| [#116](https://github.com/bkmorris2456/personal-website/security/dependabot/116) | websocket-driver | medium | [websocket-driver: Resource limit bypass via message compression](https://github.com/advisories/GHSA-mp7j-qc5w-4988) | 1 |
| [#117](https://github.com/bkmorris2456/personal-website/security/dependabot/117) | websocket-driver | critical | [websocket-driver: Message corruption via abuse of protocol length headers](https://github.com/advisories/GHSA-xv26-6w52-cph6) | 1 |
| [#118](https://github.com/bkmorris2456/personal-website/security/dependabot/118) | axios | medium | [Axios: Prototype pollution auth subfields can inject Basic auth](https://github.com/advisories/GHSA-xj6q-8x83-jv6g) | 2 |
| [#119](https://github.com/bkmorris2456/personal-website/security/dependabot/119) | axios | medium | [Axios: NO_PROXY bypass for 0.0.0.0 local addresses in axios](https://github.com/advisories/GHSA-f4gw-2p7v-4548) | 2 |
| [#120](https://github.com/bkmorris2456/personal-website/security/dependabot/120) | axios | medium | [Axios: HTTP/2 streamed uploads bypass `maxBodyLength`](https://github.com/advisories/GHSA-mwf2-3pr3-8698) | 2 |
| [#121](https://github.com/bkmorris2456/personal-website/security/dependabot/121) | axios | medium | [Axios form serializer maxDepth bypass via {} metatoken](https://github.com/advisories/GHSA-hcpx-6fm6-wx23) | 2 |
| [#122](https://github.com/bkmorris2456/personal-website/security/dependabot/122) | axios | high | [Axios Node HTTP adapter can use an inherited proxy after interceptor config cloning](https://github.com/advisories/GHSA-gcfj-64vw-6mp9) | 2 |
| [#123](https://github.com/bkmorris2456/personal-website/security/dependabot/123) | protobufjs | medium | [protobufjs: Denial of Service via infinite loop in .proto option parsing](https://github.com/advisories/GHSA-j3f2-48v5-ccww) | 1 |
| [#124](https://github.com/bkmorris2456/personal-website/security/dependabot/124) | axios | medium | [Axios: Fetch adapter `ReadableStream` uploads bypass `maxBodyLength`](https://github.com/advisories/GHSA-jqh4-m9w3-8hp9) | 2 |
| [#125](https://github.com/bkmorris2456/personal-website/security/dependabot/125) | axios | medium | [Axios: Deep formToJSON Key Recursion Can Cause Denial of Service](https://github.com/advisories/GHSA-pmv8-rq9r-6j72) | 2 |
| [#126](https://github.com/bkmorris2456/personal-website/security/dependabot/126) | axios | medium | [Axios: Excessive recursion in formDataToJSON can cause denial of service](https://github.com/advisories/GHSA-42h9-826w-cgv3) | 2 |
| [#127](https://github.com/bkmorris2456/personal-website/security/dependabot/127) | axios | medium | [Axios: Nested axios option objects can consume polluted prototype values](https://github.com/advisories/GHSA-7q8q-rj6j-mhjq) | 2 |
| [#128](https://github.com/bkmorris2456/personal-website/security/dependabot/128) | axios | medium | [Axios: Prototype pollution gadgets can alter axios request construction](https://github.com/advisories/GHSA-mmx7-hfxf-jppx) | 2 |
| [#129](https://github.com/bkmorris2456/personal-website/security/dependabot/129) | react-router | medium | [React Router: RSCErrorHandler Missing Protocol Validation (XSS)](https://github.com/advisories/GHSA-h8fp-f39c-q6mh) | 3 |
| [#131](https://github.com/bkmorris2456/personal-website/security/dependabot/131) | react-router | high | [React Router: Unauthenticated Denial of Service via Inefficient Route Matching](https://github.com/advisories/GHSA-chx6-hx7r-mcp5) | 3 |
| [#132](https://github.com/bkmorris2456/personal-website/security/dependabot/132) | react-router | medium | [React Router: Arbitrary Constructor Injection via deserializeErrors() in React Router SSR Hydration](https://github.com/advisories/GHSA-337j-9hxr-rhxg) | 3 |
| [#133](https://github.com/bkmorris2456/personal-website/security/dependabot/133) | react-router | medium | [React Router: Open redirect via backslash in <Link> and useNavigate (CVE-2025-68470 bypass)](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) | 3 |
| [#134](https://github.com/bkmorris2456/personal-website/security/dependabot/134) | body-parser | low | [body-parser vulnerable to denial of service when invalid limit value silently disables size enforcement](https://github.com/advisories/GHSA-v422-hmwv-36x6) | 1 |
| [#135](https://github.com/bkmorris2456/personal-website/security/dependabot/135) | postcss | high | [PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure](https://github.com/advisories/GHSA-r28c-9q8g-f849) | 3 |
| [#136](https://github.com/bkmorris2456/personal-website/security/dependabot/136) | react-router | high | [React Router: RSC Mode CSRF Bypass Allows Action Execution Before 400 Response](https://github.com/advisories/GHSA-qwww-vcr4-c8h2) | 3 |
| [#139](https://github.com/bkmorris2456/personal-website/security/dependabot/139) | postcss | medium | [PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) | 3 |
| [#141](https://github.com/bkmorris2456/personal-website/security/dependabot/141) | qs | medium | [qs array-limit bypass via bracket-key comma parsing](https://github.com/advisories/GHSA-x5fp-wj9c-mxmx) | 1 |
| [#142](https://github.com/bkmorris2456/personal-website/security/dependabot/142) | mysql2 | medium | [MySQL2: Unbounded zlib inflate in compressed MySQL protocol handler allows decompression-bomb DoS](https://github.com/advisories/GHSA-rgwj-5xj2-c3m3) | 2 |
| [#143](https://github.com/bkmorris2456/personal-website/security/dependabot/143) | qs | medium | [qs: Denial of Service via Attacker Controlled isBuffer](https://github.com/advisories/GHSA-4mjr-xmp4-gh2g) | 1 |
| [#144](https://github.com/bkmorris2456/personal-website/security/dependabot/144) | axios | high | [Axios: ReDoS in fromDataURI data: URL parser freezes the Node event loop (DoS)](https://github.com/advisories/GHSA-c29m-xwm3-cm6r) | 2 |
| [#145](https://github.com/bkmorris2456/personal-website/security/dependabot/145) | axios | high | [Axios: Denial of Service via Unhandled 'error' Event in HTTP/2 ClientHttp2Session Initialization](https://github.com/advisories/GHSA-542g-h47m-68v8) | 2 |
| [#146](https://github.com/bkmorris2456/personal-website/security/dependabot/146) | axios | high | [Axios: Prototype Pollution Gadget in axios toFormData Options](https://github.com/advisories/GHSA-x97p-jq2g-jp4f) | 2 |
| [#147](https://github.com/bkmorris2456/personal-website/security/dependabot/147) | axios | high | [Axios: ReDoS (O(N²)) in shouldBypassProxy host normalization, reachable via untrusted redirect Location](https://github.com/advisories/GHSA-mghh-pgcx-3jjj) | 2 |
| [#148](https://github.com/bkmorris2456/personal-website/security/dependabot/148) | axios | high | [Axios: HTTP/2 adapter bypasses configured DNS lookup and proxy controls](https://github.com/advisories/GHSA-3pq3-5fj3-cg6v) | 2 |
| [#149](https://github.com/bkmorris2456/personal-website/security/dependabot/149) | axios | high | [Axios: Node HTTP adapter prototype-pollution gadget allows request socket hijack via inherited createConnection](https://github.com/advisories/GHSA-m8m8-qj5v-23w3) | 2 |
| [#150](https://github.com/bkmorris2456/personal-website/security/dependabot/150) | axios | medium | [Axios: CIDR-form NO_PROXY entries are ignored, causing proxy exclusion bypass for internal IP ranges](https://github.com/advisories/GHSA-44g4-m2mj-wpvx) | 2 |
| [#151](https://github.com/bkmorris2456/personal-website/security/dependabot/151) | axios | medium | [Axios: Fetch Adapter Header Injection via Inherited FormData getHeaders](https://github.com/advisories/GHSA-4hqw-qxg8-jxx2) | 2 |
| [#152](https://github.com/bkmorris2456/personal-website/security/dependabot/152) | @grpc/grpc-js | low | [@grpc/grpc-js: The server transmits some error messages thrown by method handlers to the client in status messages](https://github.com/advisories/GHSA-f596-whhp-79r4) | 1b |
| [#153](https://github.com/bkmorris2456/personal-website/security/dependabot/153) | @grpc/grpc-js | high | [@grpc/grpc-js: In certain configurations, getAuthContext can return unauthorized certificates as though they were authorized](https://github.com/advisories/GHSA-m9gg-hp2v-232j) | 1b |
| [#154](https://github.com/bkmorris2456/personal-website/security/dependabot/154) | axios | medium | [Axios: Header Injection via Inherited headers After Minimal Interceptor](https://github.com/advisories/GHSA-j8rh-479h-cp32) | 2 |
| [#156](https://github.com/bkmorris2456/personal-website/security/dependabot/156) | follow-redirects | high | [follow-redirects sensitiveHeaders regex escaping can expose credential headers](https://github.com/advisories/GHSA-8r9p-f939-6h3c) | 2 |
| [#157](https://github.com/bkmorris2456/personal-website/security/dependabot/157) | follow-redirects | high | [follow-redirects array-form headers bypass cross-origin credential stripping](https://github.com/advisories/GHSA-q3jh-wrc6-jgq8) | 2 |
| [#158](https://github.com/bkmorris2456/personal-website/security/dependabot/158) | vite | medium | [launch-editor: escapeCmdArgs() omits % escaping on Windows](https://github.com/advisories/GHSA-698v-4r3x-3vcv) | 3 |
| [#159](https://github.com/bkmorris2456/personal-website/security/dependabot/159) | vite | high | [launch-editor: `fs.existsSync()` existence check can be bypassed on Windows](https://github.com/advisories/GHSA-587h-7wmj-h5pm) | 3 |
| [#160](https://github.com/bkmorris2456/personal-website/security/dependabot/160) | vite | medium | [launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors](https://github.com/advisories/GHSA-r825-w8mm-5pxw) | 3 |
| [#161](https://github.com/bkmorris2456/personal-website/security/dependabot/161) | vite | low | [Vite: Cross origin script execution through Vite custom middleware](https://github.com/advisories/GHSA-9jrq-w75r-8gcw) | 3 |
| [#162](https://github.com/bkmorris2456/personal-website/security/dependabot/162) | vite | medium | [Vite: Files outside `server.fs.allow` could be served when project paths match system paths on non-Windows machine](https://github.com/advisories/GHSA-rq7h-c2jc-7f22) | 3 |
| [#163](https://github.com/bkmorris2456/personal-website/security/dependabot/163) | axios | medium | [Axios: Prototype-Pollution Gadget in the Default Instance Allows Inherited Object.prototype.method to Override HTTP Method](https://github.com/advisories/GHSA-9fr6-4gfg-395g) | 2 |
| [#164](https://github.com/bkmorris2456/personal-website/security/dependabot/164) | axios | medium | [Axios: Prototype pollution gadget in fetch adapter can alter outbound requests](https://github.com/advisories/GHSA-vh66-26gq-q6x8) | 2 |
| [#165](https://github.com/bkmorris2456/personal-website/security/dependabot/165) | proxy-addr | critical | [proxy-addr vulnerable to IP spoofing via IPv4-mapped IPv6 trust subnet](https://github.com/advisories/GHSA-jqcg-44mw-7w3h) | 1 |
| [#166](https://github.com/bkmorris2456/personal-website/security/dependabot/166) | source-map-js | high | [source-map-js allows event-loop denial of service through indexed source-map section offsets](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) | 3 |
| [#167](https://github.com/bkmorris2456/personal-website/security/dependabot/167) | body-parser | high | [body-parser vulnerable to Denial of Service via trailing bytes after a compressed request body](https://github.com/advisories/GHSA-27r3-jxmh-p828) | 1 |
| [#168](https://github.com/bkmorris2456/personal-website/security/dependabot/168) | qs | medium | [qs : qs.stringify with arrayFormat 'comma' throws an uncaught TypeError on array elements carrying a non-callable own toString (DoS)](https://github.com/advisories/GHSA-6pq8-jhm2-2vcw) | 1 |
| [#169](https://github.com/bkmorris2456/personal-website/security/dependabot/169) | follow-redirects | high | [follow-redirects: Cross-realm sensitiveHeaders arrays are discarded and custom credentials can follow redirects](https://github.com/advisories/GHSA-mrwp-f3q8-3g9p) | 2 |
