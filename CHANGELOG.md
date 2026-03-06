# Changelog

## [feat] v0.1-beta release: issue templates + GitHub Release — 2026-03-06

**Tipo:** feat
**Tags:** release, feedback, issue-templates, contributing
**PR:** [#8](https://github.com/rmolines/agent-native-dev-conventions/pull/8) · **Complexidade:** simples

### O que mudou

O v0.1-beta está agora formalizado como GitHub Release com URL canônica, e o repositório tem estrutura para receber feedback externo organizado via issue templates.

### Detalhes técnicos

- `.github/ISSUE_TEMPLATE/config.yml` — desabilita issues em branco, força uso dos templates
- `.github/ISSUE_TEMPLATE/principle-feedback.md` — template para feedback sobre princípio específico
- `.github/ISSUE_TEMPLATE/missing-convention.md` — template para sugerir anti-padrão ou convenção ausente
- `CONTRIBUTING.md` — como dar feedback, como abrir issue, o que não é escopo
- GitHub Release `v0.1-beta` criada com release notes apontando para `https://rmolines.github.io/agent-native-dev-conventions/spec/v0.1/`

### Impacto

- **Breaking:** Não

### Arquivos-chave

- `.github/ISSUE_TEMPLATE/` — templates de issue
- `CONTRIBUTING.md` — guia de contribuição
- `github.com/rmolines/agent-native-dev-conventions/releases/tag/v0.1-beta` — release pública

---

## [feat] GitHub Pages with just-the-docs — 2026-03-06

**Tipo:** feat
**Tags:** github-pages, jekyll, documentation, deployment
**PR:** [#5](https://github.com/rmolines/agent-native-dev-conventions/pull/5) · **Complexidade:** baixa

### O que mudou

O manifesto `spec/v0.1.md` agora é publicado automaticamente em
`https://rmolines.github.io/agent-native-dev-conventions/spec/v0.1/`
com sidebar de navegação via just-the-docs. A raiz redireciona para o spec.

### Detalhes técnicos

- `.github/workflows/pages.yml` — Jekyll build + deploy automático em push para main
- `_config.yml` — just-the-docs via `remote_theme`, excludes para dirs de exemplos
- `index.md` — redirect Liquid: root → `/spec/v0.1/`
- `spec/v0.1.md`, `examples/README.md` — front matter Jekyll (`nav_order`)
- `.markdownlint.yaml` — `MD025 front_matter_title: ""` para suportar front matter title + `# heading` simultâneos

### Impacto

- **Breaking:** Não

### Arquivos-chave

- `_config.yml` — Jekyll config com just-the-docs
- `.github/workflows/pages.yml` — build + deploy workflow

---

## [feat] Examples: Swift/SPM and TypeScript/Next.js reference projects — 2026-03-06

**Tipo:** feat
**Tags:** examples, documentation, conventions, swift, typescript
**PR:** [#4](https://github.com/rmolines/agent-native-dev-conventions/pull/4) · **Complexidade:** média

### O que mudou

Adicionado `examples/` com dois projetos-mock demonstrando todas as 7 convenções aplicadas —
um em Swift/SPM e outro em TypeScript/Next.js. Cada projeto inclui CLAUDE.md curado,
regras atômicas em `.claude/rules/`, documentação cold-memory com anotações `refers-to`,
e stubs de código com nomes convention-over-description.

### Detalhes técnicos

- `examples/README.md` — índice + tabela de convenções por stack
- `examples/swift-spm/` — CLAUDE.md (Conv I–II), rules (Conv III–IV), docs (Conv V, VII),
  `UserAuthService.swift` (Conv VI–VII)
- `examples/typescript-nextjs/` — estrutura equivalente para TypeScript/Next.js
- `spec/v0.1.md` — link para `examples/` adicionado na seção "Adopting these conventions"

### Impacto

- **Breaking:** Não

### Arquivos-chave

- `examples/README.md` — ponto de entrada dos exemplos
- `examples/swift-spm/CLAUDE.md` — CLAUDE.md de referência para Swift
- `examples/typescript-nextjs/CLAUDE.md` — CLAUDE.md de referência para TypeScript/Next.js

---

## [improvement] README rewrite: problem-first — 2026-03-06

**Tipo:** improvement
**Tags:** readme, documentation, onboarding
**PR:** [#3](https://github.com/rmolines/agent-native-dev-conventions/pull/3) · **Complexidade:** simples

### O que mudou

README.md reescrito para liderar com a fricção concreta que devs sentem ao usar agentes
em projetos não estruturados, antes de apresentar qualquer solução.

### Detalhes técnicos

- `README.md` — removida seção "What this is" que misturava problema/solução; novo README
  abre com cenário narrativo (agente navega às cegas), articula por que AGENTS.md não basta,
  e apresenta o framework brevemente com link para `spec/v0.1.md`

### Impacto

- **Breaking:** Não

### Arquivos-chave

- `README.md` — reescrita completa

---

## [feat] Manifesto v0.1 — 7 agent-native conventions — 2026-03-06

**Tipo:** feat
**Tags:** spec, manifesto, documentation
**PR:** [#2](https://github.com/rmolines/agent-native-dev-conventions/pull/2) · **Complexidade:** média

### O que mudou

Cria `spec/v0.1.md` com 7 princípios numerados e prescritivos para estruturar projetos
de forma agent-navigable — o "12factor.net para AI coding com Claude Code".

### Detalhes técnicos

- `spec/v0.1.md` — 371 linhas; cada princípio inclui regra, exemplos (Swift + TypeScript),
  anti-padrão e rationale baseado em pesquisa (arxiv 2601.20404, 2602.20478, 2602.20048)
- Princípios: Curated Context · Hot Files · Atomic Rules · Spec/Rationale Separation ·
  Cold Memory · Convention Naming · Document Decay by Reference

### Impacto

- **Breaking:** Não

### Arquivos-chave

- `spec/v0.1.md` — manifesto criado

---
