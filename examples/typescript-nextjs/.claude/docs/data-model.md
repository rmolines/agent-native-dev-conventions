# Data model

<!-- refers-to: src/lib/db/schema.ts -->
<!-- Convention VII: if schema.ts changes substantially, this doc may be stale -->
<!-- Convention V: schema detail lives here, not in CLAUDE.md -->

## User

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `email` | `text` | Unique, not null |
| `displayName` | `text` | 2–50 chars |
| `createdAt` | `timestamp` | Default `now()`, never updated |
| `updatedAt` | `timestamp` | Updated via Drizzle `$onUpdate` |
| `deletedAt` | `timestamp \| null` | Soft-delete; null = active |

## Post

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key |
| `authorId` | `uuid` | FK → `User.id`, cascade delete |
| `title` | `text` | 1–200 chars |
| `body` | `text` | Markdown; rendered client-side |
| `publishedAt` | `timestamp \| null` | Null = draft |

## Relationships

```text
User ──< Post
User ──< Comment >── Post
```

## Drizzle usage

Always import the schema from `src/lib/db/schema.ts`:

```ts
import { users, posts } from '@/lib/db/schema'
```

Never construct raw SQL — use Drizzle query builder or `db.execute` for complex queries.
