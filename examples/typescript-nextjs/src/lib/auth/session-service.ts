// Convention VI: name encodes role — session-service.ts manages session access.
// No ambiguity. Contrast with: utils.ts, helpers.ts, common.ts.

// Convention VII: documentation in .claude/docs/auth-flow.md refers to this file.
// If this file changes substantially, review auth-flow.md for staleness.
// See: .claude/docs/auth-flow.md

import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import type { Session } from 'next-auth'

/**
 * Returns the current session or null. Use in Server Components and route handlers.
 *
 * Rule: all session reads go through this function — never call next-auth directly.
 * See: .claude/rules/auth.md
 */
export async function getSession(): Promise<Session | null> {
  // TODO: implement
  throw new Error('not implemented — this is a mock project')
}

/**
 * Returns the current session or redirects to /login.
 * Use at the top of authenticated route handlers and Server Components.
 *
 * Rule: authenticated routes call this as their first line.
 * See: .claude/rules/api.md
 */
export async function requireSession(): Promise<Session> {
  // TODO: implement
  throw new Error('not implemented — this is a mock project')
}
