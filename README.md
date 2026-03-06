# agent-native-dev-conventions

> The missing layer between AGENTS.md and agent performance.

Conventions for structuring software projects so AI agents can navigate them effectively from the first message — without extensive grepping, without reading irrelevant files, without losing context.

## The problem

Software engineering conventions were designed for human cognition: spatial memory, hierarchical folder browsing, linear documentation reading. When a Claude Code agent opens a Swift project with 40 files or a Next.js app with 30 pages, it navigates blind. It greps, reads irrelevant files, loses context, and makes mistakes a familiar human developer wouldn't make.

The problem isn't that agents are bad at navigating — it's that projects weren't structured to be agent-navigable. No mainstream engineering convention addresses this.

AGENTS.md and CLAUDE.md (2024–2025) were the first formats with AI as primary reader. 60k+ repos adopted AGENTS.md. But they're still written as dense READMEs by humans for humans. The pattern exists; the optimization doesn't.

## What this is

A numbered, prescriptive framework — the "12factor.net for AI coding with Claude Code" — with:

- Concrete principles with examples and anti-patterns
- A CLI tool (`agent-index`) that generates a structured project index automatically
- Validation in a real project (Claude Terminal) before any public claims

Work in progress. See [roadmap](.claude/feature-plans/agent-native-dev-conventions/roadmap.md).

## Status

`v0.1-beta` — framework in development. Issues and discussion welcome.
