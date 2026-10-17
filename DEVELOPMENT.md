# DEVELOPMENT

How the project is built: stack, architecture, structure, API, environment, gotchas.
Changes only when the architecture changes. Current tasks and log — in [PLAN.md](PLAN.md).

---

## 1. Purpose

React frontend boilerplate for websites with authentication. Backend is a separate **NestJS** project (default `http://localhost:3000`).
Done: site skeleton (header, footer, hero, breadcrumbs), UI kit, full auth flow (login, registration, password recovery, email verification).

## 2. Stack

| Area | Technology |
|---|---|
| Build | Vite 8 + `@vitejs/plugin-react-swc` |
| UI | React 19, TypeScript ~6.0 |
| Routing | react-router-dom 7 (`BrowserRouter`, declarative `<Routes>`) |
| HTTP | axios (single instance with interceptors) |
| Forms | react-hook-form + zod (`@hookform/resolvers/zod`) |
| Styles | SCSS (sass), CSS variables, style file next to its component |
| Sliders | swiper |
| Dates | react-datepicker |
| Icons | lucide-react |
| Server state | `@tanstack/react-query` — **installed but not wired up** |
| Lint | ESLint 10 + typescript-eslint + react-hooks + react-refresh |

No tests.

## 3. Commands

```bash
npm run setup     # interactively create .env (VITE_API_URL)
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run lint      # eslint .
npm run preview   # preview production build
```

## 4. Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_URL` | Backend base URL (NestJS) | `http://localhost:3000` |

- `.env` is in `.gitignore`, template — `.env.example`.
- Created by `scripts/setup.cjs`.
- The `localhost:3000` fallback is also hardcoded in `src/api/axios.ts`.

## 5. File structure

```
src/
├── main.tsx                 # entry: StrictMode → AuthProvider → CookieConsentProvider → App; global styles
├── App.tsx                  # BrowserRouter, all routes, global components
├── api/
│   ├── axios.ts             # axios instance + interceptors (Bearer, refresh on 401)
│   └── auth/
│       ├── auth.api.ts      # authApi — all auth endpoints
│       └── auth.types.ts    # request/response types
├── context/
│   ├── AuthContext.tsx           # AuthProvider + useAuth()
│   └── CookieConsentContext.tsx  # CookieConsentProvider + useCookieConsent()
├── schemas/                 # zod form schemas + inferred types (*FormData)
├── data/                    # static data: constants.ts (SORT_OPTIONS, COUNTRIES, COOKIE_CATEGORIES), accordionData.ts
├── assets/
│   ├── img/                 # logo, icons, demo backgrounds
│   └── styles/              # main.scss (variables, utilities), zeroing.scss (reset)
├── components/
│   ├── Header/              # Header, Logo, HeaderMenu, HeaderProfile (DropDown guest/profile)
│   ├── Footer/              # Footer, FooterList
│   ├── Hero/                # HeroHome (Swiper slider), HeroPage (page title)
│   ├── Breadcrumbs/
│   ├── Routing/AuthRoute.tsx
│   ├── Verification/        # VerificationBanner (global), VerificationForm
│   ├── CookiesPopup/        # global cookie consent popup (Accept / Deny / Manage) + CookiesOptions panel
│   ├── ScrollToTop/         # global "back to top" button
│   ├── ErrorMessage/        # error text under a field
│   └── ui/                  # UI kit: Button, Input, TextArea, Select, CheckBox, DatePicker,
│                            #         DropDown, Accordion, Modal, Slider, InputMasked
└── pages/
    ├── HomePage/  AboutPage/  ServicesPage/  ContactPage/  PolicyPages/  ElementsPage/  NotFoundPage/
    └── Auth/  Login/  Register/  Forgot/  ResetPassword/  VerifyEmail/
```

`src/App.css` and `src/index.css` are Vite template leftovers, not imported anywhere.

## 6. Conventions

- Each component/page is a folder `Name/Name.tsx` + `Name.scss`; styles are imported inside the component.
- Components use `export default function`.
- Relative imports (no aliases).
- Page template: `<HeroPage title background />` → `<Breadcrumbs items />` → `<section><div className="container"><div className="section-inner">…`.
- Forms: `useForm({ resolver: zodResolver(schema) })`; field errors via the UI component's `errorMessage` prop; server error via local `serverError` + `<p className="error-message">`.
- UI fields (`Input`, `TextArea`, `Select`, `CheckBox`) spread `...props` onto the native element — compatible with `{...register('field')}`.
- Links in lists (`FooterList`, `Breadcrumbs`, `DropDown`): `to` — internal `<Link>`, `link` — external `<a href>`, neither — plain text.
- Schema + type: `export const xSchema = z.object(...)`, `export type XFormData = z.infer<typeof xSchema>`.
- Global state = React context, one file per context: `context/XContext.tsx` with types, `createContext`, `XProvider` and `useX()` (throws outside the provider). This triggers the `react-refresh/only-export-components` lint error — accepted.

## 7. Routing

All routes are in `src/App.tsx`. `Header`, `Footer`, `VerificationBanner`, `CookiesPopup`, `ScrollToTop` sit outside `<Routes>` and are visible on every page.

| Group | Path | Component | Access |
|---|---|---|---|
| Guest | `/login` | Login | `<AuthRoute />` — authenticated → `/` |
| Guest | `/register` | Register | same |
| Guest | `/forgot` | Forgot | same |
| Guest | `/reset-password?token&userId` | ResetPassword | same |
| Protected | `/verify-email[?token&userId]` | VerifyEmail | `<AuthRoute requireAuth />` — guest → `/login` (with `state.from`) |
| Public | `/` | Home | — |
| Public | `/about-us` | About | — |
| Public | `/services` | Services | — |
| Public | `/contacts` | Contact | — |
| Legal | `/privacy-policy`, `/cookies-policy`, `/terms-and-conditions` | Policy (single component) | — |
| Utility | `/elements` | Elements (UI kit showcase) | — |
| 404 | `*` (any unmatched path) | NotFound | — |

`AuthRoute` returns `null` while `isLoading`; supports both `children` and `<Outlet />`.

## 8. Authentication

### Tokens
- **Access token** — returned in the body `{ accessToken }`, stored in `localStorage['accessToken']`, added by the request interceptor as `Authorization: Bearer …`.
- **Refresh token** — httpOnly cookie set by the backend; axios sends cookies (`withCredentials: true`).

### Response interceptor (`src/api/axios.ts`)
1. On `401` (if the request hasn't been retried and isn't `/auth/refresh`) → sets `_retry = true`, calls `POST /auth/refresh`.
2. Success → stores the new token, retries the original request.
3. Failure → removes the token; if the current path is not in the public list (`/login`, `/register`, `/forgot`, `/reset-password`, `/verify-email`) → `window.location.href = '/login'` (full reload).

### AuthContext (`src/context/AuthContext.tsx`)
- On start: `GET /auth/me` → `user` or `null`, then `isLoading = false`.
- `login(token)` — stores the token, fetches `me`.
- `logout()` — `POST /auth/logout`, clears state and token (in `finally`).
- `refreshUser()` — re-fetches `me` (after verification).
- `useAuth()` throws outside the provider.

### Flows
- **Register** → logs in immediately → `/`. 409 = email taken.
- **Login** → `/`. 401 = invalid credentials.
- **Forgot** → `POST /auth/forgot-password` → "if this email exists…" message.
- **Reset** → email link `/reset-password?token=…&userId=…` → new password → `/login` after 3 s. 401 = link expired.
- **Email verification** (user without `verifiedAt`):
  - `VerificationBanner` (global) — button to send the email.
  - `/verify-email?token&userId` — auto-verify by link, then `/` after 3 s.
  - `/verify-email` without params — send code and enter 6 characters (letters/digits, autofocus, paste, Backspace), resend with a 59 s cooldown.

## 9. API (NestJS backend)

Base URL — `VITE_API_URL`. Wrapper — `authApi` in `src/api/auth/auth.api.ts`, types — `auth.types.ts`.

| Method | Path | Body | Response | Function |
|---|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | `{ accessToken }` | `authApi.register` |
| POST | `/auth/login` | `{ email, password }` | `{ accessToken }` | `authApi.login` |
| POST | `/auth/logout` | — | — | `authApi.logout` |
| POST | `/auth/refresh` | — (cookie) | `{ accessToken }` | `authApi.refresh` / interceptor |
| GET | `/auth/me` | — | `MeResponse` | `authApi.me` |
| POST | `/auth/send-verification` | — | — | `authApi.sendVerification` |
| POST | `/auth/verify-email` | `{ userId, tokenOrCode }` | — | `authApi.verifyEmail` |
| POST | `/auth/forgot-password` | `{ email }` | — | `authApi.forgotPassword` |
| POST | `/auth/reset-password` | `{ userId, token, newPassword }` | — | `authApi.resetPassword` |

`MeResponse`: `id, name, email, userRole, firstName, lastName, userPicture, verifiedAt, createdAt, updatedAt` (nullable: `firstName`, `lastName`, `userPicture`, `verifiedAt`).

Error codes the UI relies on: `401` (login, reset, refresh), `409` (register).

New API modules follow the same pattern: `src/api/<domain>/<domain>.api.ts` + `<domain>.types.ts`, using the shared `api` instance.

## 10. Cookie consent

GDPR/PECR-style consent. Nothing optional (analytics, marketing) may load until the visitor allows it.

- `src/context/CookieConsentContext.tsx` — `CookieConsentProvider` + `useCookieConsent()`.
- Stored in `localStorage['cookie_consent']` = `{ analytics, marketing, at }` (`at` — timestamp of the decision). Read once on start; if `localStorage` is unavailable the choice lives only in state and the popup shows again after reload.
- `localStorage` (not a cookie) is intentional: SPA without SSR, the server never needs the choice. Switch to a cookie only if the choice must be shared across subdomains or read by the server.
- Validity: 12 months (`CONSENT_LIFETIME`). An expired or malformed value is removed and the popup is shown again.
- Context values:
  - `consent` — `Consent | null` (`null` = no decision yet);
  - `saveConsent(choice)` — stores the choice and closes the popup;
  - `isOpen`, `isManageOpen` — popup and options panel visibility;
  - `openSettings()` — opens the popup with the options panel (footer "Cookie Settings"; changing the decision must be as easy as making it);
  - `closePopup()`, `toggleManage()`.
- Adding an optional service (Google Analytics, Meta Pixel, chat widget, etc.):
  1. Wrap it in its own component (e.g. `components/Analytics/Analytics.tsx`) that reads `useCookieConsent()`.
  2. Load the script only when `consent?.analytics` (or `marketing`) is `true`; render nothing otherwise.
  3. On withdrawal (the flag turns `false` after being `true`) stop the service and delete the cookies it set (e.g. `_ga*` for GA), otherwise the consent is not really withdrawn.
  4. Mention the service and its cookies in the Cookies Policy.
- Categories — `COOKIE_CATEGORIES` in `src/data/constants.ts`; adding one also requires a field in `ConsentChoice`. Essential cookies are always on and are not stored.
- `CookiesOptions` mounts only while the panel is open, so its checkboxes are prefilled from `consent` every time it opens.
- Popup buttons: **Accept** — all on, **Deny** — all off (refusal is stored), **Manage** — per-category checkboxes + "Save my choice", **close icon** — only hides the popup, nothing is stored, shown again after reload (deliberate decision).
- No cross-tab sync.

## 11. Styles

- Global variables in `:root` (`main.scss`): `--color-background*`, `--color-main-1..4`, `--color-text`, `--color-link`, `--color-label`, `--color-error`, `--font-main`/`--font-title` (Rubik, Google Fonts).
- `.container` — `max-width: 1340px`, 10px side padding below 1360px.
- Spacing utilities: `mt-120`, `mt-60`, `mb-120`, `pt-120`, etc. (halved at ≤1360px).
- Breakpoints — nested `@media (max-width: …)` inside the rules.
- `Button` variants add a `btn-<variant>` class, but there are no styles for them yet.

## 12. Gotchas

- `npm run build` runs `tsc -b` with strict `noUnusedLocals/Parameters` — any unused import breaks the build.
- Public routes are hardcoded as a separate list in the interceptor — update `axios.ts` when adding guest pages.
- Redirect on failed refresh uses `window.location`, not the router (full reload).
- `AuthRoute` renders nothing while `me` is loading — protected pages appear with a delay.
- `accessToken` in context state is `null` after reload (source of truth is `localStorage`).
- `Modal` ignores `isOpen`/`onClose` props — visibility is set by a CSS class from outside (`CookiesPopup` passes `isopen`).
- React Query is installed but has no provider — add `QueryClientProvider` in `main.tsx` before using it.
- After renaming/moving/deleting files restart `npm run dev`: the running server can keep a stale module graph and the page stays blank with no console error (a fresh server works).
- The 404 page is client-side only: the server returns `index.html` with status 200 for any URL (soft 404). A real 404 status needs hosting config (nginx etc.).
- Git: working branch `dev`, main — `master`.
