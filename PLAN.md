# PLAN

Living document: current work, TODO, open questions, session log.
**Update at the end of every session** (and when switching tasks). Project architecture lives in [DEVELOPMENT.md](DEVELOPMENT.md).

_Last updated: 2026-11-09_

---

## In progress

- Nothing in progress. Boilerplate is SaaS-only; header shows "Go to Dashboard" for logged-in users, `/dashboard` is a stub with Logout. P1 closed.

## TODO (by priority)

### P0 — build is broken ✅ (2026-10-16)
- [x] `auth.api.ts`, `Header.tsx`, `HeaderProfile.tsx` — removed unused imports
- [x] `VerificationForm.tsx` — ref callback no longer returns a value
- [x] `CookiesPopup` — added Deny button (`handleDeny`), close icon class `deny` → `close`

### P1 — bugs
- [x] `HeaderMenu.tsx` — link `/Contacts` → `/contacts` (2026-10-17)
- [x] `HeaderProfile.tsx` — dead profile menu links removed: logged-in user sees "Go to Dashboard" button (2026-10-29)
- [x] Login / Register cross-links: "Forgot password?" (right under the password field) + "Don't have an account? Sign up" on Login, "Already have an account? Sign in" on Register, "Remember your password? Sign in" on Forgot (2026-10-30)
- [x] 404 page `pages/NotFoundPage/NotFound.tsx` + route `path="*"` (2026-10-17)
- [x] `ResetPassword` — link without `token`/`userId` now shows the normal page layout + link to `/forgot` (2026-10-17)
- [x] `Policy` — title passed as a prop from `App.tsx` (2026-10-17)
- [x] Guest on a public page was redirected to `/login` after failed `/auth/refresh` — `axios.ts` now redirects only from protected paths (`protectedRoutes`: `/dashboard`, `/verify-email`) (2026-10-30)
- [x] Header mobile layout — `HeaderMobileMenu` (burger ≤1024px, slide-in panel from the right) + footer breakpoints (2026-10-30)
- [x] `Modal` ignores `isOpen`/`onClose` — now a centered dialog with overlay, closes on overlay / Esc / X, locks body scroll; `CookiesPopup` no longer uses it (2026-11-09)
- [x] Bundle > 500 kB — resolved by excluding `/elements` from production (677 → 481 kB, no warning) (2026-10-30); code-splitting pages still possible later
- [x] `ResetPassword` — non-numeric `userId` in the link shows "Invalid reset link" (2026-11-09)

### Cookie consent ✅ (2026-10-17)
- [x] Accept / Deny / Manage, categories, footer "Cookie Settings", 12-month expiry, data validation — checked in the browser

### Styles (later, by user's decision)
- [x] `CookiesPopup` mobile: stacked Accept / Deny / Manage have different widths — reworked tablet/mobile layout (2026-11-09)
- [x] Checkbox labels are grey and look disabled — now `--color-text`, 14px (2026-10-30, SaaS restyle)
- [x] Page content sections get `section-<page> pt-60 pb-120`; auth forms limited to 480px (2026-10-30)
- [x] `HeroPage` `background` prop removed from the component and all pages (2026-10-30)
- [x] `CheckBox` adds `undefined` to class when no `className` is passed — fixed in all UI components (2026-11-09)

### P2 — code quality (ESLint: 13 problems)
- [x] Remove `any` in UI components (`Input`, `TextArea`, `Select`, `CheckBox`, `DatePicker`, `Button`) (2026-11-09)
- [ ] `VerificationForm` uses `<Button variant='checkout'>` — no `.btn-checkout` styles (e-commerce leftover); pick `primary` or a banner-specific variant
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
- [ ] Content for Home (SaaS landing), Features, Pricing (plans + FAQ on Accordion), About, Contact (contact form)
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
- SaaS restyle (user chose "strict neutral" + compact page header): Inter font; tokens in `main.scss` `:root` (text `#0F172A`, secondary `#64748B`, background-2 `#F8FAFC`, border `#E2E8F0`, accent `#4F46E5` / hover `#4338CA`, error `#DC2626`, `--radius` 8px, `--radius-lg` 12px, shadows, focus ring); headings h1 56 → h6 18, weight 600; inputs/selects/textarea 44px, 1px border, focus ring; buttons 44px, primary indigo, secondary white with border; global `form` gap 16px. Restyled header, footer, breadcrumbs, compact `HeroPage` (no image, 40px title), DropDown, Accordion, CookiesPopup, ScrollToTop, VerificationBanner, Slider, DatePicker, ErrorMessage, Elements page. New icons `checkbox.svg`, `checkbox-on.svg`, `icon-arrow.svg`; new favicon. Logo untouched (user's request).
- Browser (temp server 5179): home, login, register, elements, cookie popup checked on desktop. Mobile not re-checked (header overflow is a known P1).
- SaaS page set agreed: Home, Features, Pricing, About, Contact, Legal (Privacy / Cookies / Terms), 404, auth pages, Dashboard (+ Settings later); no blog/changelog for the demo.
- `ServicesPage` → `FeaturesPage` (`/features`), new `PricingPage` (`/pricing`, stub), `/contacts` → `/contact`; header menu Features · Pricing · About · Contact; footer columns Navigation (Features, Pricing, About, Contact) / Contact Information.
- `/elements` route only in dev (`import.meta.env.DEV`).
- Removed `background` prop from `HeroPage` and all pages; content sections got `section-<page> pt-60 pb-120`; auth pages (Login, Register, Forgot, ResetPassword + new `ResetPassword.scss`, VerifyEmail) limit content to 480px.
- Browser: login, pricing checked; `/features`, `/contact`, `/about-us`, `/elements` (dev) open; old `/services` → 404.
- Footer: one "Navigation" column; left column `flex: 2`, text wrapped in `.footer-description` (`max-width: 360px`).
- Breakpoints agreed: container + 20px (`1360px`) → `1024px` (covers most of mobile) → `767px` (what 1024 didn't cover) → specific (e.g. `400px`).
- `HeaderProfile.tsx` → `HeaderMobileMenu.tsx` (git mv): desktop auth actions + burger (≤1024px) + slide-in panel (360px, full width ≤767px) that reuses `HeaderMenu` and the auth actions; closes on link click, overlay, Esc, X; locks body scroll. Footer: wraps at ≤1024px (first column full width), single column + stacked bottom row at ≤767px.
- Browser (iframes 390 / 900px): burger shown, desktop menu hidden, no horizontal overflow; panel opens, link click navigates and closes, Esc and overlay close; footer stacks.
- Split by user's design: `Header` → `Logo`, `HeaderMenu`, `HeaderActions`. `HeaderActions` (new) owns the auth buttons, renders them in `.header-actions-desktop` and passes the same JSX as `children` to `HeaderMobileMenu` (burger + panel, imports `HeaderMenu`). Desktop vs mobile switch is CSS at 1024px (`.header-actions-desktop` / `.header-mobile-menu`). Re-checked in the browser.
- Footer bottom row: `column-reverse` at ≤767px (legal links above copyright).
- Footer bottom row was 83px tall: browser default `ul` margin (16px top/bottom) collapsed through `.legal-pages-menu` into the flex `.column`. Added `ul, ol { margin: 0; }` to `zeroing.scss` — row now 50.6px (24px padding + content); all lists have 0 margin; Elements lists still spaced by wrapper `gap`.
- Login: `.forgot-link` (right-aligned, 14px, accent) after the password field; `.auth-switch` under the form (top border, secondary text, accent link) on Login, Register and Forgot — styles in each page's `.scss`. Checked in the browser.

### 2026-11-09
- Elements page: new last section `section-modal` ("Open test modal" button in `.modal-wrapper`, styles like other sections).
- P1: `Modal` rewritten — `isopen` class (visibility + opacity/translate transition like the mobile menu), `.modal-overlay` (click closes), `.modal-dialog` (520px, `--radius-lg`, `--shadow-lg`, 24px padding ≤767px), `.modal-close` (lucide `X`), Esc + body scroll lock in `useEffect`, z-index 110 (above `VerificationBanner` 100).
- `CookiesPopup` used `Modal` as a non-blocking bottom-left banner — by user's decision it now renders its own `div.cookies-popup` (position/z-index moved from `Modal.scss` to `CookiesPopup.scss`); behaviour unchanged.
- Browser (temp server 5179): modal hidden by default, opens on the button, closes on Esc / overlay / X, click inside keeps it open, body scroll locked while open; cookie banner shows bottom-left as before (consent restored after the test).
- New `ui/Banner` (non-blocking floating block): props `isOpen`, `className`, `children`, optional `onClose` (renders the X button), `position` = `top|bottom` + `-` + `left|center|right` (default `bottom-left`); 10px offsets, full width with 10px sides at ≤767px; no overlay / scroll lock / Esc. Not used for `VerificationBanner` (in-flow strip) or future toasts (stacking, auto-dismiss — separate component).
- P1: `ResetPassword` — `isValidLink` (`token` present and `userId` digits only, `/^\d+$/`); otherwise "Invalid reset link" + link to `/forgot` instead of the form.
- `CookiesPopup` moved onto `<Banner position='bottom-left' onClose={closePopup} className='cookies-popup'>`; its own close button and container styles removed, `CookiesPopup.scss` keeps only `max-width: 680px` and content styles.
- Browser (temp server 5179): all 6 positions placed correctly; 390px — banner full width, no horizontal overflow; X hides without storing consent, popup shown again after reload (consent restored after the test).

- `CookiesPopup` restyle + responsive: icon 32px in accent color (was 60px black), text 14px secondary (links inherit size), Deny / Manage → `variant='secondary'`, `max-width: 640px`; options block separated by a top border, "Save my choice" fit-content. ≤767px: padding 20px, Accept + Deny in one row (equal width), Manage full width below, "Save my choice" full width; removed the non-standard 860px breakpoint. Browser: 900px and 390px, closed and with Manage open, no horizontal overflow (consent restored after the test).
- Elements: horizontal scroll at ≤~520px — `.buttons-wrapper` (3 buttons in a row, ~503px) had no wrap; added `flex-wrap: wrap; gap: 12px 20px`. Swiper slides outside the viewport are clipped by Swiper, not a cause.

- `className` fallback `${className ?? ''}` in `CheckBox`, `Input`, `TextArea`, `Select`, `DatePicker`, `Slider` (same as `Modal` / `Banner`) — no more `undefined` class; `Button` unchanged (default `className='button'`).
- Tried moving `.auth-switch` into a `components/AuthSwitch` component — reverted by user's decision (used rarely, not worth a component); markup and styles stay in Login / Register / Forgot.
- Browser (temp server 5179): no `undefined` classes on /login, /register, /forgot, /elements.

- P2: `[key: string]: any` removed — `Input` / `CheckBox` extend `Omit<ComponentProps<'input'>, 'type'>`, `TextArea` extends `ComponentProps<'textarea'>`, `Select` extends `Omit<ComponentProps<'select'>, 'children'>` (own `type` union, `label`, `errorMessage`, `items`, `resize` kept; duplicated `disabled` / `className` / `id` / `placeholder` / `value` / `onChange` removed). `CheckBox` unused `message` prop removed. `DatePicker`: no index signature and no `{...props}` spread (nobody passed extra props). `ComponentProps` includes `ref` in React 19 → `register()` works. Browser: Register validation errors, Elements checkbox / select / datepicker / textarea OK.

- P2: `Button` typed as polymorphic: `ButtonProps<T extends ElementType = 'button'>` = own props (`children`, `as`, `className`, `variant`) & `Omit<ComponentProps<T>, 'as' | 'children' | 'className'>`. `to`, `type`, `disabled`, `onClick` come from the element's own props (`<Link>` requires `to`, plain button rejects `to`); default `type='submit'` only for `<button>`, overridable. `variant` stays `string` — `VerificationBanner` uses its own `verify` / `sent` variants. Checked with a temp type-test file (valid usages pass, `<Button to>`, `<Button as={Link}>` without `to`, unknown prop fail) and in the browser (header Sign Up → `<a href="/register">`, form submit `type="submit"`, cookie buttons `type="button"`, disabled works).
- Found: `VerificationForm` `variant='checkout'` has no styles — added to P2, not changed.

### Before 2026-10-16 (from git, branch `dev`)
- `8713b75` Added error output to forgot form
- `0f479fa` Added full auth functionality
- `56b9469` Added verification
- `1660750` Added reset password functionality
- `9a9caf4` Added verification banner and profile component
