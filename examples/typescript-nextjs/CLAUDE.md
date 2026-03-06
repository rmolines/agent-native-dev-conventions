# CLAUDE.md — typescript-nextjs-example

<!-- Convention I: only what grep and glob cannot find. No narrative overview. -->

## Hot files

<!-- Convention II: central, volatile, or cross-cutting files declared explicitly -->

- `src/lib/db/schema.ts` — central: changing this requires a Drizzle migration;
  imported by 15+ files; run `pnpm db:generate` after any edit
- `src/middleware/auth.ts` — cross-cutting: all protected routes depend on this;
  read `.claude/docs/auth-flow.md` before editing
- `src/components/Layout.tsx` — volatile: changes with every design iteration;
  do not leave half-done between sessions

## Rules

<!-- Convention III: atomic, checkable invariants -->

- All database access goes through `src/lib/db/` — never import `drizzle` directly
  from page or API files
- Auth session reads use `getServerSession()` from `src/lib/auth/session-service.ts`
  — never access `next-auth` directly in routes
- New API routes require a Zod schema in the same file before any `req.body` access
- Environment variables are accessed only via `src/lib/env.ts` — never `process.env`
  directly in application code

## Deep context (read when needed)

<!-- Convention V: detailed docs in cold memory, referenced by path -->

- Data model: `.claude/docs/data-model.md`
- Auth flow: `.claude/docs/auth-flow.md`
- API conventions: `.claude/docs/api-conventions.md`

## Domain rules (loaded per task)

<!-- Convention IV: spec separated from rationale -->

- API: `.claude/rules/api.md`
- Auth: `.claude/rules/auth.md`
- Database: `.claude/rules/database.md`
