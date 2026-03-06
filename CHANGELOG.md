# Changelog

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
