# Judgment Guard

A Claude skill that calibrates trust in AI-generated advice — ensuring confidence matches evidence, no more, no less.

## Structure

```
SKILL.md                      # Skill definition — triggers, non-negotiables, seven-step workflow, intervention tiers, exit check, scope rules, anti-rationalization table, output format
evidence-protocol.md          # Recall protocol for Step 2 — query plan, coverage matrix, independence test, ledger, stopping rule (loaded on demand)
rubric.md                     # Level definitions for the seven dimensions + borderline guidance and recall gate (loaded on demand from Step 5)
templates/
  report_template.md          # Blank output template (Decision audit, Claim map, Hidden assumptions, Calibrated answer, What to verify)
examples/
  worked-example.md           # One complete Tier B report (loaded on demand)
package.json                  # npm package config — enables `npx @fydel-ai/judgment-guard`
bin/
  install.mjs                 # CLI installer — copies skill files to ~/.claude/skills/judgment-guard/
```

## How it works

1. Triggered when the user asks for advice on a consequential topic
2. Runs a seven-step workflow, each step with a checkpoint: draft (hypothesis from prior knowledge) → evidence sweep (confirming/disconfirming/recency queries per load-bearing claim, source-type coverage matrix, evidence ledger) → claim map → hidden assumptions → rate seven dimensions (evidence strength, assumption visibility, confidence calibration, action pressure, alternative coverage, epistemic authority, false consensus) → intervene by tier → exit check
3. Evidence strength selects the tier: high → Tier A (direct, confident); medium → Tier B (multiple interpretations); low → Tier C (no recommendation, verification steps only)
4. Outputs a structured report: decision audit, claim map, hidden assumptions, calibrated answer, and verification steps

## Design principles

The skill follows the five principles from [Agent Skills](https://addyosmani.com/blog/agent-skills/). Keep them intact when editing:

- **Process over prose** — `SKILL.md` is a numbered workflow with a produced artifact and checkpoint per step. Don't replace steps with explanatory paragraphs.
- **Anti-rationalization table** — each row pairs an excuse for skipping the work with a rebuttal. Add rows when a new failure mode shows up; don't delete rows without a replacement.
- **Verification as exit criterion** — Step 7 must pass before output. Every supported fact has a ledger entry; every audit rating cites the claim map; every verification step names what/how/what-would-change.
- **Progressive disclosure** — `SKILL.md` stays lean and points to `evidence-protocol.md`, `rubric.md`, the template, and the example. The search protocol lives in `evidence-protocol.md` and level definitions in `rubric.md`; don't duplicate either in `SKILL.md`.
- **Scope discipline** — the skill calibrates the draft; it does not re-answer. The evidence sweep is exhaustive on the load-bearing claims, not on the topic. The Scope rules section enforces both.

### Recall vs precision
Step 2 (evidence sweep) optimises for **recall**: find every kind of evidence that bears on the load-bearing claims, including evidence against them. Step 3 (claim map) optimises for **precision**: decide what each piece supports. Keep these separate — an agent that filters while gathering discards the disconfirming evidence first. The source-type coverage matrix exists because result *count* is not coverage; ten results of one type fill one row.

## Editing guidelines

- `SKILL.md` frontmatter (`name`, `description`) must remain valid YAML. Keep the `description` concrete and evaluable from the user's question alone — abstract phrasing broke auto-invocation once already (see PR #5)
- The five output sections in `SKILL.md`, `templates/report_template.md`, and `examples/worked-example.md` must stay in sync. The coverage note lives inside the Claim map section, not as a sixth section
- Source-type rows in `evidence-protocol.md` and the coverage note in the template should match
- Rubric levels (high/medium/low) in `rubric.md` should match the scales used in the decision audit
- False consensus uses `none detected / possible / present` scale across all files
- Any new top-level file or directory the skill references must be added to `bin/install.mjs` and the `files` array in `package.json`
