# Plan: readme-problema

## Problema

O README atual mistura problema e solução em peso igual. O objetivo desta feature é
reescrevê-lo para ser problema-first: o dev lê e reconhece a fricção que sente antes
de ver qualquer solução. O ângulo central: "por que AGENTS.md não basta?"

## Deliverables

### Deliverable 1 — README problema-first

**O que faz:** Reescreve README.md para liderar com a dor concreta, articular por que
AGENTS.md/CLAUDE.md não resolvem, e só então apresentar a solução brevemente.

**Critério de done:** Dev lê e reconhece "isso nomeia exatamente a fricção que eu sinto"
antes de ver qualquer menção a CLI ou princípios numerados.

## Arquivos a modificar

- `README.md` — reescrita completa (problema-first)

## Passos de execução

1. Reescrever README.md com estrutura:
   - Gancho com dor concreta (agente faz grep em arquivos errados, estraga refactor)
   - Por que AGENTS.md/CLAUDE.md não bastam (padrão copiado do README humano)
   - Solução brevemente + link spec/v0.1.md
   - Status + chamada para feedback

## Checklist de infraestrutura

- [ ] Novo Secret: não
- [ ] Script de setup: não
- [ ] CI/CD: não muda
- [ ] Config principal: não muda
- [ ] Novas dependências: não

## Rollback

```bash
git checkout README.md
```
