# Frontend (src/frontend)

React + TypeScript + Vite + Tailwind CSS v4 console for the Phantom Rizzlers
submission. Component-driven, token-based design system, demo mode until the
API is connected.

```bash
npm install
npm run dev         # local dev server
npm run build       # production build to dist/
npm run typecheck   # strict TS check
```

Copy `.env.example` to `.env.local`. With no `VITE_API_URL` set, the app runs
in demo mode: it renders mock data and labels every screen with a "Demo data"
chip and banner, so mock numbers are never mistaken for real ones.

---

## Directory structure

```
src/frontend/
├── index.html                  # fonts, theme-color, dark class default
├── public/favicon.svg          # flat brand mark (no gradients)
└── src/
    ├── main.tsx                # entry
    ├── App.tsx                 # tiny re-export of the router host
    ├── routes/
    │   └── router.tsx          # route table: layout route + child pages
    ├── layouts/
    │   ├── AppLayout.tsx       # master shell: sidebar / topbar / content
    │   └── DocumentLayout.tsx  # readable container for policy pages
    ├── components/
    │   ├── ui/                 # design-system primitives (Button, Card,
    │   │                       # Badge + severityTone(), Input, Spinner,
    │   │                       # Skeleton, EmptyState, icons)
    │   └── composites/         # App-level pieces (Sidebar, Topbar,
    │                           # ThemeToggle, PageHeader, StatCard,
    │                           # RouteFallback, DemoModeBanner, ErrorNotice)
    ├── features/
    │   ├── dashboard/           # Overview: DashboardPage + AnomalyList
    │   └── anomalies/           # Anomaly feed: AnomaliesPage (search,
    │                            # severity filter) + AnomalyRow (expandable
    │                            # detail record)
    ├── pages/                  # single-file routes: legal pages, 404,
    │                           # RoutePlaceholder stubs for unfinished routes
    ├── hooks/                  # useApi, useTheme, useLocalStorage,
    │                           # useDebouncedValue, useMediaQuery
    ├── services/
    │   ├── api/                # client.ts (fetch wrapper), endpoints.ts
    │   ├── anomalyService.ts   # domain service (the only import for data)
    │   └── mock/mockData.ts    # labeled demo data for demo mode
    ├── styles/
    │   ├── index.css           # entry stylesheet
    │   ├── tokens.css          # design tokens (below)
    │   └── base.css            # element defaults / focus / selection
    ├── types/                  # shared domain + API types
    └── utils/                  # cn() class joiner, formatters
```

Conventions:

- Pages import data through `services/*`, never `fetch` directly; UI only
  imports from `components/ui` and `components/composites`.
- New feature = new folder in `features/<name>/`; promote a component to
  `composites/` when a second feature needs it.
- `@/` is an alias for `src/` (configured in `vite.config.ts`).

---

## Design system

All tokens live in `src/styles/tokens.css` (Tailwind v4 `@theme`, so no
`tailwind.config.js`). Semantic tokens swap at runtime for theming.

### Color

| Token (utility prefix) | Role |
|---|---|
| `brand` (indigo) | Primary actions, focus rings, active nav |
| `accent` (cyan) | Data highlights, secondary brand color |
| `success` / `warning` / `danger` / `info` | Status: emerald / amber / rose / sky |
| `neutral` (slate) | Raw scale when needed |

Theme-aware semantic tokens (same utilities, follow light/dark):

| Utility | Token | Dark value | Light value |
|---|---|---|---|
| `bg-canvas` | page background | `#0b1222` | `neutral-50` |
| `bg-surface` | cards, sidebar, topbar | `#101a2d` | `#ffffff` |
| `bg-raised` | inputs, wells, hover fills | `#16233b` | `neutral-100` |
| `text-foreground` | primary text | `neutral-100` | `neutral-900` |
| `text-muted` | secondary text | `neutral-400` | `neutral-500` |
| `border-subtle` | dividers | `#1e2b47` | `neutral-200` |
| `border-strong` | inputs, dashed borders | `#2b3a5c` | `neutral-300` |

Rules baked into the code and enforced by review: no gradients anywhere
(brand mark is flat `bg-brand-600`), no pill shapes (badges and buttons are
rounded at 4-10px), dark-first (`index.html` ships `class="dark"`).

### Typography

- **Inter** for all UI text (`font-sans`), weights 400/500/600/700.
- **JetBrains Mono** for pipelines, scores, and timestamps (`font-mono`),
  with `tabular-nums` so columns line up.
- One optical size token: `text-display` (28px/36px, -2% tracking) used for
  page `h1`; everything else uses the default scale (`text-sm`, `text-xs`).

### Spacing, radius, elevation, motion

- Spacing: Tailwind default 4px scale; sections separated by `space-y-8`,
  card padding `p-5`, card grid gaps `gap-4`.
- Radius: `rounded-card` (16px) for cards/panels, `rounded-lg` (8px) for
  buttons/inputs/skeletons, `rounded-md` (6px) for badges.
- Elevation: `shadow-card` (subtle), `shadow-pop` (drawer).
- Motion: `animate-fade-in` (drawer overlay) and `animate-slide-up`
  (sparingly). No scroll-triggered animation anywhere; users with
  `prefers-reduced-motion` get animations disabled globally (base.css).

---

## Loading and error states

- Data fetching: `useApi(fetcher)` handles loading/error/refresh.
- Honesty guardrails live in shared composites: `DemoModeBanner` (renders
  only while no API is configured) and `ErrorNotice` (inline failure with a
  working Retry). Both pages under `features/` use them; new pages must too.
- The dashboard shows a skeleton stat grid and skeleton anomaly rows while
  loading, an inline retry panel on error, and an `EmptyState` (not an
  error) when the feed is genuinely empty.
- The anomaly feed mirrors this: debounced search (`useDebouncedValue`,
  300 ms) and severity chips filter through `anomalyService.listAnomalies`
  (API query params live, client-side filtering in demo mode), with four
  distinct states: loading skeletons, error + Retry, filtered-empty (with a
  working Clear filters action), and truly-empty. The count badge reads
  "n of m shown" whenever filters are active.
- Unfinished routes render `<RoutePlaceholder>` stating exactly what belongs
  there; the 404 page offers a real link back.

---

## Connect the real API (leaving demo mode)

1. Set `VITE_API_URL=http://localhost:8000` (your FastAPI) in `.env.local`.
2. Match paths in `services/api/endpoints.ts` to the backend contract.
3. Replace `withDemoFallback` usage in `services/anomalyService.ts` with
   direct `request()` calls (or keep it until the backend is deployed).
4. Ops: deployment checklist lives in the repo root `docs/launch-checklist.md`
   (custom domain must be live before public launch).
