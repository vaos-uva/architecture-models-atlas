<!-- ident: docs.project.next-tasks
category: project-record
purpose: plan
role: documentation
semantic: next-step
universe: kniga -->

# Next tasks

This queue follows [`docs/agent/task-methodology.md`](../agent/task-methodology.md). Foundation tasks must reach their gates before broad visual or content expansion.

The comprehensive sprint plan is [`multilingual-refactoring-sprint-roadmap.md`](multilingual-refactoring-sprint-roadmap.md). It is the source for work-package ownership, dependency order, evidence, and release gates.

## Immediate foundation queue

- [x] Define the foundation-first agent task methodology.
- [x] Define the OZCO multilingual normal form contract.
- [x] Add deterministic validation and normalization helpers.
- [x] Add architecture-owned term instances and a reversible legacy adapter.
- [ ] Compare canonical terms against all existing concept and registry records.
- [ ] Reorganize source/model/view files by ownership with no-data-loss evidence.
- [x] Build locale-aware KNIGA projections for glossary and registry names.
- [x] Define explicit translated, English-fallback, and unavailable UI states.
- [ ] Extend locale projections to descriptions, navigation, and source labels.
- [ ] Add export schema/version metadata and round-trip tests.

## Later product slices

- [ ] Migrate the glossary view.
- [ ] Migrate registry and comparison views.
- [ ] Add Russian/English navigation and section copy.
- [ ] Add onboarding guidance for first-time users.
- [ ] Assess accessibility and mobile polish.
- [ ] Review launch readiness and release evidence.

## Purpose

This file keeps the next work explicit without allowing implementation to outrun definitions and contracts. Update status only with evidence from the named validation gate.
