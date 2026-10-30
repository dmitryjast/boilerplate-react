# PLAN

Living document: current work, TODO, open questions, session log.
**Update at the end of every session** (and when switching tasks). Project architecture lives in [DEVELOPMENT.md](DEVELOPMENT.md).

_Last updated: 2026-10-29_

---

## In progress

- Nothing in progress. Boilerplate is SaaS-only; header shows "Go to Dashboard" for logged-in users, `/dashboard` is a stub with Logout. Next step — remaining **P1** (`Modal`, bundle size).

## TODO (by priority)

### P0 — build is broken ✅ (2026-10-16)
- [x] `auth.api.ts`, `Header.tsx`, `HeaderProfile.tsx` — removed unused imports
- [x] `VerificationForm.tsx` — ref callback no longer returns a value
- [x] `CookiesPopup` — added Deny button (`handleDeny`), close icon class `deny` → `close`

### P1 — bugs
- [x] `HeaderMenu.tsx` — link `/Contacts` → `/contacts` (2026-10-17)
- [x] `HeaderProfile.tsx` — dead profile menu links removed: logged-in user sees "Go to Dashboard" button (2026-10-29)
- [ ] Login / Register — add cross-links ("Forgot password?", "Sign up", "Sign in"); header no longer links to `/forgot`
- [x] 404 page `pages/NotFoundPage/NotFound.tsx` + route `path="*"` (2026-10-17)
- [x] `ResetPassword` — link without `token`/`userId` now shows the normal page layout + link to `/forgot` (2026-10-17)
- [x] `Policy` — title passed as a prop from `App.tsx` (2026-10-17)
- [x] Guest on a public page was redirected to `/login` after failed `/auth/refresh` — `axios.ts` now redirects only from protected paths (`protectedRoutes`: `/dashboard`, `/verify-email`) (2026-10-30)
- [ ] Header has no mobile layout: at 390px menu + actions overflow (page `scrollWidth` 740px) — burger menu needed
- [ ] `Modal` ignores `isOpen`/`onClose` (no close on overlay/Esc)
- [ ] Bundle > 500 kB — Vite warning, consider code-splitting pages
- [ ] `ResetPassword` — treat non-numeric `userId` in the link as an invalid link (optional)

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
- [ ] Reset password: validate the link on page open — backend `POST /auth/reset-password/validate` `{ userId, token }` (doesn't consume the token, same response for any failure, rate limit) + frontend "Checking link…" → form / "expired" with link to `/forgot`. Keep the 401 handling on submit. Workflow: read the backend from here, write a spec, the backend chat implements it
- [ ] Page meta (separate task): `<title>`/`<meta>` per page via React 19 hoisting; `<meta name="robots" content="noindex" />` on the 404 page
- [ ] Dashboard: layout (sidebar + user menu with Settings and Logout); Edit Profile and Change Password pages inside the dashboard (+ backend API?)
- [ ] Content for About / Services / Contacts (contact form on Contacts)
- [ ] Legal pages content — load dynamically from the backend once it has the endpoint (title + content per page instead of the `title` prop in `App.tsx`)
- [ ] Decide on React Query: add `QueryClientProvider` or drop the dependency
- [ ] Tests (Vitest + Testing Library) — at least the auth flow

## Open questions

- Profile pages: which endpoints already exist on the backend (NestJS)?
- SEO for SaaS public pages (landing, pricing): separate landing (Next/Astro) + SPA app on `app.` subdomain, or prerender public pages in Vite?
- NestJS backend: shared core (auth, users) + optional modules (`subscriptions` for SaaS, `orders`/`products` for a future Next.js e-commerce frontend)?
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
- P1: `ResetPassword` without `token`/`userId` — message inside the page layout (Hero + breadcrumbs) with a link to `/forgot` instead of a bare `<p>`.
- Backend note (userId must be a number, ValidationPipe `transform`/`whitelist`): checked — frontend already sends `Number(userId)` / `user.id` and no extra fields; nothing to change. Edge case `?userId=abc` → `NaN` → 400 shows "Something went wrong" on reset (not fixed, optional).

### 2026-10-29
- Discussed boilerplate reuse for SaaS / Ecom projects. First idea: core + optional `ecom`/`saas` modules removed at setup (folders `src/modules/*` created) — then dropped: e-commerce needs SSR/SEO → separate Next.js boilerplate. This repo is **SaaS-only**; `src/modules` removed.
- `HeaderProfile`: logged-in user sees a "Go to Dashboard" button instead of the profile DropDown (My Purchases / Billing & Shipping removed). Logout is not on the public site — it lives in the dashboard (common SaaS practice).
- Added `pages/DashboardPage/Dashboard.tsx` (+ empty `.scss`), protected route `/dashboard`, stub with a Logout button.
- `tsc -b` and eslint on changed files pass.
- Header for guests: `DropDown` replaced with a "Sign In" text link + "Sign Up" button (`/register`); "Forgot Password" removed from the header. `DropDown` component untouched. Wrapper class `profile-wrapper` → `header-actions` (styles in `Header.scss` already targeted it); added `align-items`, `gap: 24px`, `.button { width: fit-content }` inside `.header-actions`.
- Browser (temp server 5179): desktop header OK (Sign In 51px, Sign Up 131px). Found: guest redirected from `/` to `/login`, header overflows at 390px — added to P1. Logged-in state ("Go to Dashboard", `/dashboard`, Logout) not checked — no test account.

### 2026-10-30
- P1: `axios.ts` — failed refresh redirects to `/login` only from protected paths (`startsWith` check on `protectedRoutes`); public pages stay. Browser (temp server 5179): `/`, `/about-us`, `/privacy-policy`, unknown URL stay for a guest; `/dashboard` → `/login`.
- Started fixing all P1 items by mistake (user meant only the first one) — reverted, nothing else changed.

### Before 2026-10-16 (from git, branch `dev`)
- `8713b75` Added error output to forgot form
- `0f479fa` Added full auth functionality
- `56b9469` Added verification
- `1660750` Added reset password functionality
- `9a9caf4` Added verification banner and profile component
