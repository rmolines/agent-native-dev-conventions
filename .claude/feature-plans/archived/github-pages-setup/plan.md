# Plan: github-pages-setup

## Problema

`spec/v0.1.md` só existe no GitHub raw. Precisamos de uma URL canônica publicada
onde o manifesto seja renderizado com navegação adequada para um spec.

## Deliverables

### Deliverable 1 — GitHub Pages publicado com just-the-docs

**O que faz:** workflow de CI/CD que builda Jekyll e publica em GitHub Pages.
Root redireciona para `/spec/v0.1/`. Navigation sidebar com just-the-docs.

**Critério de done:** `https://rmolines.github.io/agent-native-dev-conventions/spec/v0.1/`
retorna a spec renderizada (após habilitar Pages nas Settings do repo).

## Arquivos a modificar

- `spec/v0.1.md` — adicionar front matter Jekyll (title, nav_order, permalink)
- `examples/README.md` — adicionar front matter (title, nav_order, permalink)

## Arquivos a criar

- `_config.yml` — just-the-docs via remote_theme
- `.github/workflows/pages.yml` — build + deploy Jekyll para GitHub Pages
- `index.md` — redirect root → /spec/v0.1/

## Checklist de infraestrutura

- [ ] Novo Secret: não
- [ ] Script de setup: não
- [ ] CI/CD: novo workflow pages.yml
- [ ] Config principal: _config.yml (novo)
- [ ] Novas dependências: não (remote_theme via GitHub Actions)

## Passo manual pós-PR

Após merge do PR: Settings → Pages → Source: **GitHub Actions**

## Rollback

```bash
git revert HEAD  # reverte o commit do PR
# Settings → Pages → desabilitar
```
