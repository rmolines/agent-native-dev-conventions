# HANDOVER.md — Session history

Newest entries at the top.

---

## 2026-03-06 — github-pages-setup

### O que foi feito

- Criado `_config.yml` com just-the-docs via `remote_theme`, excludes para `.claude/` dos exemplos
- Criado `.github/workflows/pages.yml` — Jekyll build + deploy automático em push para main
- Criado `index.md` com redirect Liquid: root → `/spec/v0.1/`
- Adicionado front matter Jekyll a `spec/v0.1.md` (`nav_order: 1`) e `examples/README.md` (`nav_order: 2`)
- Corrigido `.markdownlint.yaml`: `MD025 front_matter_title: ""` para suportar `title:` em front matter + `# heading` no corpo
- Passo manual executado pelo usuário: Settings → Pages → Source: GitHub Actions
- PRs: #5 (feature principal), #6 (tentativa enablement automático), #7 (revert para passo manual)

### Decisões tomadas

- `just-the-docs` via `remote_theme` (sem Gemfile) — zero dependências locais para o build
- `enablement: true` no `configure-pages` não funciona com `GITHUB_TOKEN` padrão (`Resource not accessible by integration`) — requer permissões de admin que o token não tem; revertido para passo manual
- `MD025 front_matter_title: ""` é necessário quando arquivos Jekyll têm `title:` no front matter E `# heading` no corpo — sem essa config, markdownlint conta os dois como dois h1

### Próximos passos

- `versioning-beta` — próxima feature do sprint M1 (deps: `github-pages-setup` ✅, `manifesto-exemplos` ✅)
- Iniciar com: `/start-feature versioning-beta`

### Arquivos-chave modificados

- `_config.yml` — novo: Jekyll config com just-the-docs
- `.github/workflows/pages.yml` — novo: build + deploy workflow
- `index.md` — novo: redirect root → /spec/v0.1/
- `spec/v0.1.md` — front matter Jekyll adicionado
- `examples/README.md` — front matter Jekyll adicionado
- `.markdownlint.yaml` — MD025 configurado para suportar front matter title

---

## 2026-03-06 — manifesto-exemplos (examples/)

**What was done:**

- Created `examples/` with two mock reference projects — Swift/SPM and TypeScript/Next.js
- Each project demonstrates all 7 conventions with annotated CLAUDE.md, atomic rule files,
  cold-memory docs with `<!-- refers-to: ... -->` annotations, and source stubs with
  convention-over-description naming
- Added link to `examples/` in the "Adopting these conventions" section of `spec/v0.1.md`
- Shipped via PR #4, merged to main, CI passed

**Key decisions:**

- Mock projects (not compilable) — the value is in the structure and annotations, not
  runnable code; reduces maintenance burden and keeps the repo focused on conventions
- Two stacks chosen (Swift/SPM and TypeScript/Next.js) to match the inline snippets
  already in `spec/v0.1.md` — consistent mental model for readers
- `<!-- refers-to: path -->` annotation introduced in `.claude/docs/data-model.md` files
  as a concrete demonstration of Convention VII (Document Decay by Reference)
- Source stubs (`.swift`, `.ts`) include inline comments mapping each code decision to
  its convention — makes the conventions actionable at code level, not just in CLAUDE.md

**Files created:**

- `examples/README.md` — índice + convention index table
- `examples/swift-spm/CLAUDE.md` — Conv I–V
- `examples/swift-spm/.claude/rules/auth.md` — Conv III–IV
- `examples/swift-spm/.claude/rules/data.md` — Conv III–IV
- `examples/swift-spm/.claude/docs/data-model.md` — Conv V, VII
- `examples/swift-spm/Sources/App/Services/UserAuthService.swift` — Conv VI–VII
- `examples/typescript-nextjs/CLAUDE.md` — Conv I–V
- `examples/typescript-nextjs/.claude/rules/api.md` — Conv III–IV
- `examples/typescript-nextjs/.claude/docs/data-model.md` — Conv V, VII
- `examples/typescript-nextjs/src/lib/auth/session-service.ts` — Conv VI–VII
- `examples/typescript-nextjs/src/app/api/users/route.ts` — Conv III, VI

**Files modified:**

- `spec/v0.1.md` — link para `examples/` na seção "Adopting"

**Next features (from sprint.md):**

- `github-pages-setup` — GitHub Pages + publicação automática

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
