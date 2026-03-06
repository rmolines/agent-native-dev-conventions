# LEARNINGS.md — Technical learnings

Gotchas, limitations, and non-obvious behaviors discovered while working on this project.

---

## GitHub Actions

### `bootstrap.yml`: `run_number == 1` guard

`github.run_number` starts at 1 for the first run of any workflow in a repo. Using this as a
guard ensures branch protection is only applied once. **Do not re-run this workflow manually** —
it will attempt to apply protection again (which is usually fine but clutters logs).

### `template-sync.yml`: must guard with `!is_template`

Without the `!github.event.repository.is_template` guard, the sync workflow would run on the
template repo itself and open PRs against its own `main`. The guard makes it a no-op on the
template and active only on forks.

### Action SHA pinning

Always pin to full commit SHA, not tag:
```yaml
# Good
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
# Bad (tag can be hijacked)
uses: actions/checkout@v4
```

---

## Claude Code hooks (CVE-2025-59536)

Hooks in `.claude/settings.json` execute shell commands **without user confirmation**.
This was documented in CVE-2025-59536. Mitigation: keep hook logic in external scripts
(`.claude/hooks/`) so they're visible, auditable, and can be reviewed in PRs.

---

## markdownlint

- Use `npx --yes markdownlint-cli2` to avoid requiring global install
- `MD013` (line length) needs `tables: false` and `code_blocks: false` to avoid false positives
- `MD024` (duplicate headings) should be disabled for `HANDOVER.md` — entries often have similar structure
- `MD041` (first heading must be h1) breaks templates with frontmatter or `<!-- TODO -->` comments
- `MD036` (no emphasis as heading): italic text on its own line (`_v0.1-beta_`) is flagged as
  attempted heading. Use plain text or a different construct (e.g., `Status: v0.1-beta`)
- `MD040` (fenced code language required): bare ``` blocks listing file paths need a language
  tag — use `text` when no specific language applies

---

## GitHub Pages: `configure-pages enablement: true` requer permissões de admin

O parâmetro `enablement: true` da action `actions/configure-pages` tenta criar o Pages site
via API, mas o `GITHUB_TOKEN` padrão não tem permissões suficientes para isso (`Resource not
accessible by integration`). A ativação do GitHub Pages precisa ser feita manualmente em
Settings → Pages → Source: GitHub Actions — ou via Personal Access Token com permissão de admin.

---

## markdownlint MD025 com Jekyll front matter

Quando um arquivo Markdown tem `title:` no front matter YAML E um `# heading` no corpo,
markdownlint (v0.40+) conta ambos como h1 e dispara MD025 "Multiple top-level headings".
Fix: `MD025: front_matter_title: ""` no `.markdownlint.yaml` desabilita a detecção do
title do front matter no cômputo de h1.

---

## Git preflight: false positive quando ambos os lados adicionam o mesmo arquivo novo

O script `comm -12` de preflight detecta overlap quando a branch e `origin/main` adicionam
o mesmo arquivo a partir de `/dev/null` com conteúdo idêntico. Não é conflito real — o
`git rebase` faz skip do commit automaticamente ("skipped previously applied commit").
Seguro prosseguir sem intervenção manual quando os diffs dos dois lados forem byte-a-byte idênticos.
