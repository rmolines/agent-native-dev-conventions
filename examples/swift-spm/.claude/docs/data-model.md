# Data model

<!-- refers-to: Sources/App/Models/User.swift -->
<!-- Convention VII: refers-to annotation — if User.swift changes substantially, this doc may be stale -->
<!-- Convention V: detailed schema lives here, not in CLAUDE.md -->

## User

| Field | Type | Notes |
|---|---|---|
| `id` | `UUID` | Primary key, generated on insert |
| `email` | `String` | Unique, lowercased before storage |
| `displayName` | `String` | 2–50 chars, user-settable |
| `createdAt` | `Date` | Set on insert, never updated |
| `updatedAt` | `Date` | Updated on every save |
| `deletedAt` | `Date?` | Soft-delete marker; nil = active |
| `roles` | `[Role]` | Many-to-many via `UserRole` join table |

## Role

| Field | Type | Notes |
|---|---|---|
| `id` | `UUID` | Primary key |
| `name` | `String` | One of: `admin`, `member`, `viewer` |
| `permissions` | `[Permission]` | Loaded lazily — do not access outside `RoleRepository` |

## Relationships

```text
User ──< UserRole >── Role
User ──< Order
Order ──< OrderItem >── Product
```
