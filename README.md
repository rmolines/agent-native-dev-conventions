# agent-native-dev-conventions

You open Claude Code on a project. The agent starts reading files.

It reads the wrong ones. It greps for things you already know are in one place.
It asks you which file to edit. It makes a change that breaks three things downstream
because it didn't know those three things existed.

A human who'd worked on the project for a week wouldn't make those mistakes.
Not because they're smarter — because they have a map.

---

## The map doesn't exist yet

`AGENTS.md` and `CLAUDE.md` (2024–2025) were the first formats with AI as the
primary reader. Over 60,000 repositories adopted them.

But they're still written as dense READMEs — the same format humans have written
for humans since the 1990s. Linear prose. Narrative overviews. Architecture summaries
written by someone who already knows the architecture.

An agent doesn't read. It samples. It retrieves. It loses context between messages.
The conventions that serve human cognition — spatial memory, hierarchical folder
browsing, progressive disclosure — don't serve agent cognition. And no mainstream
engineering convention addresses this.

The pattern exists. The optimization doesn't.

---

## What "agent-native" means

A project is agent-native when its structure gives an agent the right map upfront —
without extensive grepping, without reading irrelevant files, without repeated
clarifying questions.

This means: declaring which files are architecturally central (not just listing them).
Writing rules that encode one checkable invariant, not narrative guidance.
Separating what the agent needs every session from what it needs once.
Naming files so their role is self-evident without reading them.

None of this requires new tooling. It requires conventions that were designed for
agent cognition instead of copied from human documentation habits.

---

## This framework

A numbered, prescriptive spec — the "12factor.net for AI coding with Claude Code":

- **[spec/v0.1.md](spec/v0.1.md)** — 7 conventions with concrete examples and anti-patterns

Work in progress. `v0.1-beta` — open for issues and discussion.

---

## Status

Built in the open, iterated on real projects. See the
[roadmap](.claude/feature-plans/agent-native-dev-conventions/roadmap.md) for what's
next (CLI, dogfooding, empirical validation).

If you've felt this friction — an agent that navigates blind in a project you know
well — open an issue. That's the feedback that matters most right now.
