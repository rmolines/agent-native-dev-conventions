# Rule: Data

<!-- Convention III: atomic invariants -->
<!-- Convention IV: spec only — rationale in .claude/docs/decisions/ -->

- Schema changes to `Sources/App/Models/User.swift` require a migration file in
  `db/migrations/` named `YYYY-MM-DD-description.sql`
- SwiftData queries must go through repository classes in `Sources/App/Repositories/`
  — never query `ModelContext` directly from a ViewModel or View
- Soft-delete only: set `deletedAt: Date?` — never hard-delete user records
- All `Codable` models live in `Sources/App/Models/` — no anonymous structs in network
  response handlers
