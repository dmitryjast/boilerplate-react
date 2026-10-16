# PLAN

Living document: current work, TODO, open questions, session log.
**Update at the end of every session** (and when switching tasks). Project architecture lives in [DEVELOPMENT.md](DEVELOPMENT.md).

_Last updated: 2026-10-16_

---

## In progress

- Cookie consent done (context + expiry + validation), waiting for user review / browser check. Next step — **P1: bugs**.

## TODO (by priority)

### P0 — build is broken ✅ (2026-10-16)
- [x] `auth.api.ts`, `Header.tsx`, `HeaderProfile.tsx` — removed unused imports
- [x] `VerificationForm.tsx` — ref callback no longer returns a value
- [x] `CookiesPopup` — added Deny button (`handleDeny`), close icon class `deny` → `close`

### P1 — bugs
- [ ] `HeaderMenu.tsx` — link `/Contacts` → `/contacts`
- [ ] `HeaderProfile.tsx` — profile menu links to non-existent `/my-purchases`, `/edit-profile`, `/change-password`, `/billing-info`
- [ ] No 404 route (`path="*"`)
- [ ] `ResetPassword` — invalid link renders a bare `<p>` without Hero/layout
- [ ] `Policy` — same "Policy page" title for all three legal routes
- [ ] `Modal` ignores `isOpen`/`onClose` (no close on overlay/Esc)
- [ ] Check `CookiesPopup` layout in the browser (desktop + ≤860px, Manage panel open)
- [ ] Bundle > 500 kB — Vite warning, consider code-splitting pages

### P2 — code quality (ESLint: 13 problems)
- [ ] Remove `any` in UI components (`Input`, `TextArea`, `Select`, `CheckBox`, …) — type via `InputHTMLAttributes` etc.
- [ ] `catch (error: any)` in Login/Register/ResetPassword → `AxiosError` / `isAxiosError`
- [ ] `AuthContext.tsx`, `CookieConsentContext.tsx` — react-refresh lint error (provider + hook in one file); accepted for now, project convention
- [ ] `VerificationForm.tsx` — `handleVerifyByToken` used in `useEffect` before declaration + missing deps (react-hooks)
- [ ] Remove duplicated `accessToken` state in context or sync it with `localStorage`
- [ ] Remove template leftovers: `App.css`, `index.css`, `assets/react.svg`, `vite.svg`, `hero.png` (check usage); clean Vite template text from README
- [ ] `InputMasked` — implement or remove

### P3 — new features
- [ ] Profile pages: Edit Profile, Change Password, Billing & Shipping, My Purchases (+ backend API?)
- [ ] Content for About / Services / Contacts (contact form on Contacts)
- [ ] Legal pages content
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

### Before 2026-10-16 (from git, branch `dev`)
- `8713b75` Added error output to forgot form
- `0f479fa` Added full auth functionality
- `56b9469` Added verification
- `1660750` Added reset password functionality
- `9a9caf4` Added verification banner and profile component
