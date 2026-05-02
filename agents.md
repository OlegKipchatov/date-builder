<!-- intent-skills:start -->
## Skill Loading

Before substantial work:
- Skill check: run `npx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Testing requirements

- Add unit tests for all new business logic in `src/entities/*/model`, `src/features/*/model`, and shared helpers in `src/shared/lib`.
- Add functional tests for user-visible flows (for example: calculations, history save/clear, and state restoration).
- Add behavioral tests for interaction details (button actions, callbacks, empty/loading states, and component reactions to props/state).
- Keep Supabase integration out of scope for mandatory coverage unless explicitly requested.

## Migration Context (Durable)

### Original brief
- Migrate existing Next.js app to TanStack Start incrementally, preserving UX, auth, routing, and data-fetching behavior.
- Do not mutate legacy app in place.

### Commands run
- `npx @tanstack/cli@latest create my-tanstack-app --agent --add-ons neon,drizzle,sentry,better-auth,tanstack-query`
- `npm install --legacy-peer-deps` (temporary bootstrap workaround, later removed)
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
- Scaffold dependency conflict was resolved by removing `vite-plugin-neon-new` (peer range incompatible with Vite 8).
- Neon support remains via `@neondatabase/serverless` and Drizzle (`DATABASE_URL`).
- TanStack Start code is isomorphic by default; server-only logic must use proper server boundaries.

### Next steps
- Migrate remaining legacy structure and tests into TanStack layout (if additional routes/features are added).
- Port auth behavior from legacy flow into Better Auth integration route guards/server middleware as needed.
- Reconcile data fetching patterns with TanStack Query loaders/server functions where applicable.
- Add regression tests around migrated date-diff behavior and URL state sync.
- Keep validating Neon + Drizzle workflows without the removed Vite plugin path.
