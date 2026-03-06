# Plan: versioning-beta

## Problema
O v0.1-beta existe em código e GitHub Pages, mas não está formalizado como GitHub Release com URL de referência, nem tem estrutura para receber feedback externo de forma organizada. Modelar Conventional Commits: spec-first com URL canônica, aberto a feedback público.

## Assunções
- [assumed][verified] GitHub Pages está publicado em `https://rmolines.github.io/agent-native-dev-conventions/spec/v0.1/`
- [assumed][background] Não existem issue templates em `.github/ISSUE_TEMPLATE/`

## Deliverables

### Deliverable 1 — Issue templates + CONTRIBUTING.md
**O que faz:** Cria estrutura para receber feedback externo organizado
**Critério de done:** 2 issue templates visíveis ao abrir "New Issue" no GitHub + CONTRIBUTING.md linkável

### Deliverable 2 — GitHub Release v0.1-beta
**O que faz:** Formaliza o v0.1-beta como release pública com release notes apontando para Pages URL
**Critério de done:** Release publicada em github.com/rmolines/agent-native-dev-conventions/releases/tag/v0.1-beta

## Arquivos a criar
- `.github/ISSUE_TEMPLATE/principle-feedback.md` — feedback sobre um princípio específico
- `.github/ISSUE_TEMPLATE/missing-convention.md` — anti-padrão ou convenção não coberta
- `.github/ISSUE_TEMPLATE/config.yml` — desabilita issues em branco, guia para templates
- `CONTRIBUTING.md` — como dar feedback, como abrir issue
- GitHub Release via API (sem arquivo no repo)

## Passos de execução
1. Criar `.github/ISSUE_TEMPLATE/config.yml` [Deliverable 1]
2. Criar `.github/ISSUE_TEMPLATE/principle-feedback.md` [Deliverable 1]
3. Criar `.github/ISSUE_TEMPLATE/missing-convention.md` [Deliverable 1]
4. Criar `CONTRIBUTING.md` [Deliverable 1]
5. Commitar Deliverable 1
6. Criar GitHub Release `v0.1-beta` via MCP [Deliverable 2]

## Checklist de infraestrutura
- [ ] Novo Secret: não
- [ ] Script de setup: não
- [ ] CI/CD: não muda
- [ ] Config principal: não muda
- [ ] Novas dependências: não

## Rollback
- Deletar release pelo GitHub UI
- `git rm -r .github/ISSUE_TEMPLATE/ CONTRIBUTING.md && git commit`
