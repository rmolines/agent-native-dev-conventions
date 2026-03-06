# Rule: Auth

<!-- Convention III: each rule encodes exactly one verifiable invariant -->
<!-- Convention IV: this is spec — rationale lives in .claude/docs/decisions/2024-09-auth-keychain.md -->

- Auth tokens live in Keychain via `KeychainHelper.swift` — never `UserDefaults`
- Session expiry triggers re-auth via `AuthCoordinator.reauth()` — never redirect manually
- OAuth callbacks are handled exclusively in `OAuthCallbackHandler.swift`
- `UserAuthService.authenticate(email:password:)` is the single entry point for all
  credential-based login — do not call the network layer directly from ViewModels
- Logout must call `UserAuthService.logout()` — this clears Keychain, session, and cache
