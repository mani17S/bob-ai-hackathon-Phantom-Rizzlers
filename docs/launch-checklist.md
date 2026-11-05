# Pre-Launch Checklist

This checklist is part of the release gate for any public or judge-facing
deployment of the replica console (team Phantom Rizzlers). Every item must be
checked off before the deployment is announced. Rule applied by the team:
**we do not launch until connected to a custom domain.**

## Domain (required)

- [ ] Register a free-for-development domain (examples: `is-a.dev`, a free
      Freenom replacement, or any free tier from a registrar) or use a domain
      we own.
- [ ] Point DNS at the hosting platform (ALIAS/CNAME apex, CNAME for
      `www`).
- [ ] Verify HTTPS works on the final URL: browser padlock, no mixed content.
- [ ] Update `demo/live-demo-url.txt` and the root `README.md` demo table
      with the final URL only after the domain resolves.

## Repository + routes

- [ ] `CNAME` file (GitHub Pages) or platform domain setting matches the
      custom domain.
- [ ] `vite.config.ts` `base` set correctly for the hosting path if not
      served from root.
- [ ] SPA fallback configured so `/privacy`, `/terms`, and direct links work
      after a refresh (GitHub Pages: copy `index.html` to `404.html`, or use
      a platform that rewrites routes).

## Branding hygiene

- [ ] Favicon live at `/favicon.svg` (flat brand mark, no gradients).
- [ ] No "Made with AI" badges, watermarks, or platform widgets present.
- [ ] No emoji used as UI icons (icons are the SVG set in
      `src/frontend/src/components/ui/icons.tsx`).
- [ ] No purple gradients, pill-shaped buttons, cursor gimmicks, or
      scroll-triggered animations in any screen.

## Honesty guardrails

- [ ] If the API is not connected, the demo-data chip and banner are visible
      in the topbar/overview. Mock values shown without that label is a
      release blocker.
- [ ] No fake reviews, testimonials, customer counters, or invented usage
      metrics anywhere in the UI.
- [ ] All feature placeholders continue to say "Scaffolded, not wired up
      yet" truthfully.
- [ ] Hero/page copy states what the screen shows; no vague slogans.

## Legal

- [ ] `/privacy` (Privacy Policy) reachable from the sidebar and footer.
- [ ] `/terms` (Terms of Service) reachable from the sidebar and footer.
- [ ] Both pages carry a current "Last updated" date and the team contact
      email.

## Build sanity

- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes; `dist/` served and smoke-tested on the domain.
