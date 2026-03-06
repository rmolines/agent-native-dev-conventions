---
title: Examples
nav_order: 2
permalink: /examples/
---

# Examples

Reference project structures demonstrating the
[Agent-Native Dev Conventions](../spec/v0.1.md).

Each example is a mock project — real file structure and content, not compilable code.
Use them as templates when adopting the conventions in your own project.

## Projects

| Stack | Path | Conventions demonstrated |
|---|---|---|
| Swift / SPM | [`swift-spm/`](swift-spm/) | I, II, III, IV, V, VI, VII |
| TypeScript / Next.js | [`typescript-nextjs/`](typescript-nextjs/) | I, II, III, IV, V, VI, VII |

## How to use

1. Copy the `CLAUDE.md` from the relevant example into your project root.
2. Replace placeholder values (marked with `<!-- TODO: ... -->`) with your actual hot files, rules, and docs.
3. Add `.claude/rules/` files for each domain with atomic rules (Convention III).
4. Move deep documentation into `.claude/docs/` and reference it by path (Convention V).

## Convention index

| Convention | Where to find it |
|---|---|
| I — Curated context | `*/CLAUDE.md` — lean, no narrative |
| II — Hot files declared | `*/CLAUDE.md` → `## Hot files` section |
| III — Atomic rules | `*/.claude/rules/*.md` |
| IV — Spec vs rationale | `*/.claude/rules/` (spec) vs `*/.claude/docs/decisions/` (rationale) |
| V — Cold memory | `*/.claude/docs/` referenced from `CLAUDE.md` |
| VI — Naming | `*/Sources/` and `*/src/` directory structures |
| VII — Document decay | `<!-- refers-to: ... -->` annotations in `.claude/docs/` |
