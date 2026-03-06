# CLAUDE.md — swift-spm-example

<!-- Convention I: only what grep and glob cannot find. No narrative overview. -->

## Hot files

<!-- Convention II: central, volatile, or cross-cutting files declared explicitly -->

- `Sources/App/Services/UserAuthService.swift` — central auth actor; all user session
  state flows through here; changes require updating `Tests/AuthServiceTests.swift`
- `Sources/App/Models/User.swift` — schema source of truth; changes here break
  `db/migrations/` — always add a migration when editing this file
- `Sources/App/Coordinators/AppCoordinator.swift` — all screen registrations live here;
  new screens must be added to the coordinator before they can be navigated to

## Rules

<!-- Convention III: atomic, checkable invariants — not narrative guidance -->

- Never store tokens in `UserDefaults` — use `KeychainHelper.swift`
- All network requests go through `Sources/App/Network/APIClient.swift` — never call
  `URLSession` directly
- New screens must be registered in `AppCoordinator.swift` before use
- Feature flags live in `Sources/App/Config/FeatureFlags.swift` — never hardcode
  `if user.isPremium` outside that file

## Deep context (read when needed)

<!-- Convention V: detailed docs live in cold memory, referenced by path -->

- Data model: `.claude/docs/data-model.md`
- Auth flow: `.claude/docs/auth-flow.md`
- Architecture overview: `.claude/docs/architecture.md`

## Domain rules (loaded per task)

<!-- Convention IV: spec separated from rationale; load only what's relevant -->

- Auth: `.claude/rules/auth.md`
- Data: `.claude/rules/data.md`
- Networking: `.claude/rules/networking.md`
