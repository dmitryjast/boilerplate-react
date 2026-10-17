# PLAN

Living document: current work, TODO, open questions, session log.
**Update at the end of every session** (and when switching tasks). Project architecture lives in [DEVELOPMENT.md](DEVELOPMENT.md).

_Last updated: 2026-10-17_

---

## In progress

- Nothing in progress. Cookie consent closed (2026-10-17). Next step — **P1: bugs**.

## TODO (by priority)

### P0 — build is broken ✅ (2026-10-16)
- [x] `auth.api.ts`, `Header.tsx`, `HeaderProfile.tsx` — removed unused imports
- [x] `VerificationForm.tsx` — ref callback no longer returns a value
- [x] `CookiesPopup` — added Deny button (`handleDeny`), close icon class `deny` → `close`

### P1 — bugs
- [x] `HeaderMenu.tsx` — link `/Contacts` → `/contacts` (2026-10-17)
- [ ] `HeaderProfile.tsx` — profile menu links to non-existent `/my-purchases`, `/edit-profile`, `/change-password`, `/billing-info`
- [x] 404 page `pages/NotFoundPage/NotFound.tsx` + route `path="*"` (2026-10-17)
- [ ] `ResetPassword` — invalid link renders a bare `<p>` without Hero/layout
- [x] `Policy` — title passed as a prop from `App.tsx` (2026-10-17)
- [ ] `Modal` ignores `isOpen`/`onClose` (no close on overlay/Esc)
- [ ] Bundle > 500 kB — Vite warning, consider code-splitting pages

### Cookie consent ✅ (2026-10-17)
- [x] Accept / Deny / Manage, categories, footer "Cookie Settings", 12-month expiry, data validation — checked in the browser

### Styles (later, by user's decision)
- [ ] `CookiesPopup` mobile: stacked Accept / Deny / Manage have different widths (fit content)
- [ ] Checkbox labels are grey (`#B1B1B1`, global `.checkbox-wrapper label span` in `main.scss:350`) and look disabled
- [ ] `CheckBox` adds `undefined` to class when no `className` is passed

### P2 — code quality (ESLint: 13 problems)
- [ ] Remove `any` in UI components (`Input`, `TextArea`, `Select`, `CheckBox`, …) — type via `InputHTMLAttributes` etc.
- [ ] `catch (error: any)` in Login/Register/ResetPassword → `AxiosError` / `isAxiosError`
- [ ] `AuthContext.tsx`, `CookieConsentContext.tsx` — react-refresh lint error (provider + hook in one file); accepted for now, project convention
- [ ] `VerificationForm.tsx` — `handleVerifyByToken` used in `useEffect` before declaration + missing deps (react-hooks)
- [ ] Remove duplicated `accessToken` state in context or sync it with `localStorage`
- [ ] Remove template leftovers: `App.css`, `index.css`, `assets/react.svg`, `vite.svg`, `hero.png` (check usage); clean Vite template text from README
- [ ] `InputMasked` — implement or remove

### P3 — new features
- [ ] Page meta (separate task): `<title>`/`<meta>` per page via React 19 hoisting; `<meta name="robots" content="noindex" />` on the 404 page
- [ ] Profile pages: Edit Profile, Change Password, Billing & Shipping, My Purchases (+ backend API?)
- [ ] Content for About / Services / Contacts (contact form on Contacts)
- [ ] Legal pages content — load dynamically from the backend once it has the endpoint (title + content per page instead of the `title` prop in `App.tsx`)
- [ ] Decide on React Query: add `QueryClientProvider` or drop the dependency
- [ ] Tests (Vitest + Testing Library) — at least the auth flow

## Open questions

- Profile pages: which endpoints already exist on the backend (NestJS)?
- React Query — use for all requests or keep plain axios?
- Import aliases (`@/…`) instead of relative paths?

## Session log

### 2026-10-16
- Analyzed the project: stack, structure, routing, auth flow.
- Ran `tsc -b` (6 errors) and `eslint` (18 problems) — added to TODO.
- Created `DEVELOPMENT.md` and `PLAN.md`.
- Closed P0: `npm run build` passes. Added Deny button to CookiesPopup (user's decision).
- Translated `DEVELOPMENT.md` and `PLAN.md` to English.
- Reworked cookie consent after reviewing the Diqoded project (`CookieBar`, `lib/consent.ts`):
  - first version used a module store with window events (`src/utils/consent.ts`) — rejected by the user as a hack, replaced with React context `context/CookieConsentContext.tsx` + `CookiesPopup/CookiesOptions.tsx`;
  - `COOKIE_CATEGORIES` in `data/constants.ts`;
  - `CookiesPopup`: Accept / Deny / Manage (analytics, marketing), close icon only hides; text no longer implies consent by browsing;
  - footer: "Cookie Settings" button reopens the popup;
  - decisions: no policy version field, no in-memory fallback if `localStorage` fails (user's call); no 12-month expiry and no cross-tab sync for now; storage key changed `cookies_accepted` → `cookie_consent`.
- Briefly split contexts into `XContext.ts` + `XProvider.tsx` + `hooks/useX.ts` and moved auth to it — reverted: out of scope, user wants one file per context like the original `AuthContext.tsx`. Auth is unchanged vs `HEAD`.
- Cookie consent review against GDPR/PECR: added 12-month expiry and stored data validation in `CookieConsentProvider`; documented the rule for adding optional services (gate + cleanup on withdrawal) in `DEVELOPMENT.md`.
  - decision: close icon only hides the popup (not a refusal); Deny stores the refusal. Note: CNIL (France) treats closing as refusal — revisit if a project targets the EU.
  - storage stays in `localStorage` (no SSR, single domain).
- Blank page on the running dev server (started before the context file renames): stale Vite module graph, code is fine — verified on a fresh server (port 5179). Fix: restart `npm run dev`.

### 2026-10-17
- Browser check of the cookie popup (temporary dev server on port 5179, user's server untouched):
  - first visit — popup shown; Manage opens categories, nothing pre-ticked except Essential;
  - Save my choice → `{ analytics: true, marketing: false, at }`, popup hidden, stays hidden after reload;
  - footer "Cookie Settings" reopens the popup with the saved choice prefilled;
  - Deny → all `false` stored, hidden after reload;
  - close icon → hidden, nothing stored, shown again after reload;
  - expired (> 12 months) and malformed values → removed, popup shown;
  - 390px width (iframe): buttons stack, Manage panel scrolls inside the popup (`max-height` works), no horizontal overflow.
- IDE error about `CookieConsentProvider.tsx` — stale editor tab of a deleted file, not a code problem.
- Cookie consent closed; style remarks moved to "Styles (later)".
- P1: fixed header menu link `/Contacts` → `/contacts`.
- P1: added 404 page (`NotFoundPage/NotFound.tsx` + empty `.scss`, route `*` last in `App.tsx`); checked in the browser — unknown URL shows it, "Back to Home" works, existing routes unaffected. Meta/noindex moved to P3 as a separate task.
- User committed: `533ca32` Changed cookie popup, `9ed0066` Added 404.
- P1: `Policy` takes `title` prop; routes pass Privacy Policy / Cookies Policy / Terms and Conditions. Dynamic legal pages from the backend added to P3.

### Before 2026-10-16 (from git, branch `dev`)
- `8713b75` Added error output to forgot form
- `0f479fa` Added full auth functionality
- `56b9469` Added verification
- `1660750` Added reset password functionality
- `9a9caf4` Added verification banner and profile component
