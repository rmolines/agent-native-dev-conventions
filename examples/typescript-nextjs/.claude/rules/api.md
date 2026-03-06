# Rule: API

<!-- Convention III: atomic invariants -->
<!-- Convention IV: spec only — rationale in .claude/docs/decisions/ -->

- Every route handler validates `req.body` with a Zod schema before use — no untyped
  access to request body
- API errors return `{ error: string, code: string }` — never raw Error objects or
  stack traces
- Authenticated routes call `requireSession()` from `src/lib/auth/session-service.ts`
  as the first line — no inline session checks
- Pagination uses `{ page: number, limit: number }` query params — max `limit` is 100,
  enforced in `src/lib/pagination.ts`
- All API routes live under `src/app/api/` and follow the Next.js App Router convention:
  `src/app/api/<resource>/route.ts`
