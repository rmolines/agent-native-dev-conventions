# CLAUDE.md — agent-native-dev-conventions

## Visão geral

Framework de convenções para estruturar projetos de software de forma agent-navigable.
O repositório serve dois propósitos: (1) hospedar o manifesto/spec e (2) ser ele mesmo
um exemplo de como aplicar as convenções.

## Stack

- Documentação em Markdown (spec/, examples/)
- CLI em TypeScript/Node.js (M2 — ainda não implementado)
- GitHub Pages para publicação do manifesto

## Feature workflow

1. `/start-feature <nome>` — intake + hot files → worktree → plano
2. Implementar no worktree em `.claude/worktrees/<nome>`
3. `/ship-feature` — testes + PR
4. `/close-feature` — cleanup + LEARNINGS.md

## Artefatos de planejamento

Os artefatos de discovery e roadmap estão em:

```text
.claude/feature-plans/agent-native-dev-conventions/
├── explore.md    — mapa do espaço de problema
├── discovery.md  — o que construir, para quem, por que agora
└── roadmap.md    — milestones e features priorizados
```

## Próximo passo

```text
/start-milestone M1
```

M1 entrega o manifesto v0.1 publicado com URL canônica e aberto para feedback.
