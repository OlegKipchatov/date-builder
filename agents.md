# Agent rules for UI components

- In this repository, UI in pages, widgets, features, entities, and shared/ui must use HeroUI components from `@heroui/react`.
- Do not introduce plain HTML form controls (`button`, `input`, `select`, `textarea`) when an equivalent HeroUI component exists.
- If a direct HeroUI component is not available, create and reuse a wrapper in `src/shared/ui`.

## Testing requirements

- Add unit tests for all new business logic in `src/entities/*/model`, `src/features/*/model`, and shared helpers in `src/shared/lib`.
- Add functional tests for user-visible flows (for example: calculations, history save/clear, and state restoration).
- Add behavioral tests for interaction details (button actions, callbacks, empty/loading states, and component reactions to props/state).
- Keep Supabase integration out of scope for mandatory coverage unless explicitly requested.
