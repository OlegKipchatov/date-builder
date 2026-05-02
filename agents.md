<!-- intent-skills:start -->
## Skill Loading

Before substantial work:
- Skill check: run `npx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Migration Context (Durable)

### Original brief
- Migrate existing Next.js app to TanStack Start incrementally, preserving UX, auth, routing, and data-fetching behavior.
- Do not mutate legacy app in place.

### Commands run
- `npx @tanstack/cli@latest create my-tanstack-app --agent --add-ons neon,drizzle,sentry,better-auth,tanstack-query`
- `npm install --legacy-peer-deps` (required due scaffolded peer conflict)
- `npx @tanstack/intent@latest install`
- `npx @tanstack/intent@latest list`
- `npx @tanstack/intent@latest load @tanstack/start-client-core#start-core`
- `npx @tanstack/intent@latest load @tanstack/router-core#router-core`
- `git clone https://github.com/OlegKipchatov/date-builder legacy-source`

### Primary migration reference
- https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js
- Apply steps in order; map Next app router/page structure into TanStack file routes and server functions.

### Chosen stack/integrations
- TanStack Start
- TanStack Router
- TanStack Query
- TanStack Intent
- TanStack CLI
- Add-ons requested by scaffold: Neon, Drizzle, Sentry, Better Auth

### Current migration status
- Fresh TanStack scaffold created in `my-tanstack-app`.
- Legacy Next.js source cloned into `legacy-source` and treated as read-only reference.
- First incremental migration slice completed:
  - Home route (`/`) UX migrated.
  - Date diff feature logic + UI migrated.
  - Next URL/search syncing adapted to TanStack Router search/navigate.
  - HeroUI component usage preserved for form controls.

### Environment variables
- `.env.local` is used by `dotenv -e .env.local` in npm scripts.
- Required/expected vars depend on enabled integrations:
  - `DATABASE_URL` (Neon/Postgres for Drizzle)
  - Better Auth secrets and provider vars (exact names depend on auth strategy in `src/lib/auth.ts`)
  - Sentry DSN and runtime vars (per `@sentry/tanstackstart-react` setup)
- Keep server-only secrets unprefixed; expose only intentional client vars with `VITE_` prefix.

### Deployment notes
- Build/start scripts:
  - `npm run build` -> `vite build && cp instrument.server.mjs .output/server`
  - `npm run start` -> Node entry from `.output/server/index.mjs`
- Verify platform compatibility for Node runtime and Sentry server instrumentation.
- Re-validate Neon + Drizzle connectivity in deployed environment.

### Key architecture decisions
- Legacy app remains isolated in `legacy-source`; no legacy `.git` copied.
- Migration proceeds route-by-route and feature-by-feature into fresh TanStack structure.
- Search param state is validated at route boundary and synced via TanStack navigation.
- Preserve existing UX copy and HeroUI-based interaction patterns during migration.

### Known gotchas
- Scaffold dependency conflict observed:
  - `vite-plugin-neon-new@0.8.0` peers on Vite `^6 || ^7` while scaffold resolved Vite `^8`.
  - Temporary unblock: install with `--legacy-peer-deps`.
  - Follow-up needed: align plugin/Vite versions to remove peer mismatch risk.
- TanStack Start code is isomorphic by default; server-only logic must use proper server boundaries.

### Next steps
- Migrate remaining legacy structure and tests into TanStack layout (if additional routes/features are added).
- Port auth behavior from legacy flow into Better Auth integration route guards/server middleware as needed.
- Reconcile data fetching patterns with TanStack Query loaders/server functions where applicable.
- Add regression tests around migrated date-diff behavior and URL state sync.
- Resolve Vite/Neon plugin peer mismatch cleanly (version pin or integration update).
