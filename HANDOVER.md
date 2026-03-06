# HANDOVER.md — Session history

Newest entries at the top.

---

## 2026-03-06 — readme-problema (README.md)

**What was done:**

- Rewrote `README.md` as problem-first: leads with concrete friction devs feel,
  articulates why AGENTS.md/CLAUDE.md don't solve it, then briefly presents the framework
- Removed the "What this is" section that mixed problem and solution at equal weight
- Shipped via PR #3, merged to main, CI passed

**Key decisions:**

- Opening with a narrative scenario (agent reads wrong files, ruins refactor) instead of
  abstract problem statement — makes the friction visceral before naming it
- "The map doesn't exist yet" framing for AGENTS.md critique — acknowledges the pattern
  exists while naming the missing optimization
- Solution section kept deliberately brief (3 bullets + link) — README job is recognition,
  not explanation

**Files modified:**

- `README.md` — full rewrite (problem-first)

**Next features (from sprint.md):**

- `manifesto-exemplos` — detailed examples in `examples/swift-spm/` and
  `examples/typescript-nextjs/`

---

## 2026-03-06 — manifesto-principios (spec/v0.1.md)

**What was done:**

- Created `spec/v0.1.md` — the agent-native dev conventions manifesto v0.1-beta
- 7 numbered, prescriptive principles for agent-navigable projects
- Each principle includes: rule, code examples (Swift/TypeScript), anti-pattern, rationale
- Shipped via PR #2, merged to main, CI passed

**Key decisions:**

- 7 principles derived from explore.md + discovery.md + three arxiv papers (2601.20404,
  2602.20478, 2602.20048) rather than invented from scratch — grounded in evidence
- Inline examples in spec (not a separate `examples/` dir) — examples/ are scoped to the
  `manifesto-exemplos` feature
- Used `Status: v0.1-beta — open for feedback` instead of italic emphasis to comply with
  MD036 (markdownlint: no emphasis as heading)
- `text` language tag for bare file-path code blocks to satisfy MD040

**Files created:**

- `spec/v0.1.md` — 371 lines, 7 principles

**Next features (from sprint.md):**

- `readme-problema` — README focused on the problem (independent, no deps)
- `manifesto-exemplos` — detailed examples in `examples/swift-spm/` and
  `examples/typescript-nextjs/` (depends on `manifesto-principios`)

---

## 2026-02-27 — Bootstrap via /start-project

**What was done:**

- Executed Fase 3 (Bootstrap) of `/start-project` for the `claude-kickstart` template repository
- Created GitHub repo `rmolines/claude-kickstart` (public)
- Wrote all project files: CLAUDE.md, Makefile, CI workflows, skills, hooks, rules, memory files

**Architectural decisions:**

- GitHub Template Repository format (not CLI) — zero friction
- Hooks in `.claude/hooks/` external scripts (not inline `settings.json`) — auditable, CVE-2025-59536 compliant
- Static CI only (lint + JSON + structure) — no runtime to test
- `bootstrap.yml` with `run_number == 1` guard — auto-applies branch protection on first fork push

**Files created:**

- `CLAUDE.md`, `README.md`, `LEARNINGS.md`, `HANDOVER.md`, `Makefile`
- `.claude/settings.json`, `.claude/settings.md`
- `.claude/hooks/pre-tool-use.sh`
- `.claude/scripts/validate-structure.sh`
- `.claude/rules/git-workflow.md`, `coding-style.md`, `security.md`
- `.claude/commands/start-feature.md`, `ship-feature.md`, `close-feature.md`, `handover.md`, `sync-skills.md`
- `.claude/commands/SYNC_VERSION`
- `.github/workflows/ci.yml`, `bootstrap.yml`, `template-sync.yml`
- `.github/dependabot.yml`, `CODEOWNERS`, `SECURITY.md`
- `memory/MEMORY.md`

**Open threads:**

- Demo GIF/video for README (identified as high-risk if not done before launch)
- CONTRIBUTING.md for community contributors
- Mark repo as Template in GitHub Settings (done via API in bootstrap sequence)
