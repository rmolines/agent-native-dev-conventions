// Convention VI: path encodes resource — api/users/route.ts handles the users resource.
// Next.js App Router convention: src/app/api/<resource>/route.ts

import { z } from 'zod'
import { requireSession } from '@/lib/auth/session-service'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { parsePagination } from '@/lib/pagination'
import type { NextRequest } from 'next/server'

// Convention III: Zod schema declared before any req.body access
const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export async function GET(req: NextRequest) {
  // Convention III: requireSession() as the first line in authenticated routes
  const session = await requireSession()

  const query = listQuerySchema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams)
  )
  if (!query.success) {
    // Convention III: errors return { error, code } — never raw Error objects
    return Response.json({ error: 'Invalid query params', code: 'INVALID_PARAMS' }, { status: 400 })
  }

  // TODO: implement — this is a mock project
  throw new Error('not implemented')
}
