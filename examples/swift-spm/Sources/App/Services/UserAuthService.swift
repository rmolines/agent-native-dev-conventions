// Convention VI: name encodes role — UserAuthService handles user authentication.
// No ambiguity. No need for a CLAUDE.md entry to explain what this file does.

// Convention VII: documentation below references this file explicitly.
// If this file changes substantially, the auth-flow.md doc should be reviewed.
// See: .claude/docs/auth-flow.md

import Foundation

/// Single entry point for all credential-based authentication.
///
/// Rules enforced here (see .claude/rules/auth.md):
/// - Tokens stored via KeychainHelper, never UserDefaults
/// - Session expiry handled by AuthCoordinator.reauth()
actor UserAuthService {

    // MARK: - Dependencies

    private let apiClient: APIClient
    private let keychain: KeychainHelper
    private let sessionStore: SessionStore

    // MARK: - Auth

    /// Authenticates with email/password. Stores token in Keychain on success.
    func authenticate(email: String, password: String) async throws -> User {
        // TODO: implement
        fatalError("not implemented — this is a mock project")
    }

    /// Clears Keychain token, session state, and cache. Safe to call when already logged out.
    func logout() async {
        // TODO: implement
        fatalError("not implemented — this is a mock project")
    }
}
