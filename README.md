# Phantom Rizzlers: Anomaly Console (IBM Bob AI Hackathon)

A team entry in the **AI track** of the IBM Bob AI Hackathon. This repository is my fork of the team repo; the part of the project that lives here, and that I built, is the **web console for browsing detected anomalies**.

[![Frontend CI](https://github.com/mani17S/bob-ai-hackathon-Phantom-Rizzlers/actions/workflows/frontend.yml/badge.svg)](https://github.com/mani17S/bob-ai-hackathon-Phantom-Rizzlers/actions/workflows/frontend.yml)

## My contribution: the frontend (`src/frontend`)

A React + TypeScript + Vite + Tailwind CSS v4 console with a token-based design system.

| Area | What's in it |
|---|---|
| **Dashboard** | Overview with stat cards and a recent-anomalies list |
| **Anomaly feed** | Search, severity filter, expandable detail rows |
| **Design system** | UI primitives (Button, Card, Badge, Input, Skeleton, Spinner, EmptyState) and app composites (Sidebar, Topbar, ThemeToggle, PageHeader, StatCard), driven by CSS design tokens; light/dark theme |
| **Data layer** | Typed service layer (`services/`), a `useApi` hook with loading, error and stale-response handling, and a fetch client with timeouts |
| **Demo mode** | With no `VITE_API_URL`, the app serves mock data and labels **every screen** with a "Demo data" banner and chip, so mock numbers are never mistaken for real ones |

Design choices worth noting: pages never call `fetch` directly (they go through `services/*`), features are self-contained folders, and `@/` path aliases keep imports clean. Full structure and the design-token reference are in [`src/frontend/README.md`](src/frontend/README.md).

### Run it

```bash
cd src/frontend
npm ci
npm run dev          # http://localhost:5173, runs in demo mode with mock data
npm run typecheck    # strict TypeScript
npm run build        # production build
```

Typecheck and production build are verified in CI on every push (see badge).

## Status and scope (honest summary)

- This fork contains the **frontend** only. It runs on **mock data**; it is not connected to a live backend or model here.
- The hackathon's submission template files (`docs/`, `submission.yaml`, `demo/`) in this repo are **still the unfilled templates**; they are not a finished write-up of the team's full solution.
- No automated UI tests yet. Next steps would be component tests (Vitest + Testing Library) and wiring `VITE_API_URL` to the team's API.

## Repository layout

```
src/frontend/    React + TypeScript console (this is the work in this repo)
docs/            hackathon template docs (not yet filled in)
submission.yaml  hackathon metadata template
```

Original repository: [NotRealShanks/bob-ai-hackathon-Phantom-Rizzlers](https://github.com/NotRealShanks/bob-ai-hackathon-Phantom-Rizzlers).
