# Judgment Guard

A Claude skill that calibrates trust in AI-generated advice — ensuring confidence matches evidence, no more, no less.

## Structure

```
SKILL.md                      # Skill definition — triggers, non-negotiables, six-step workflow, intervention tiers, exit check, scope rules, anti-rationalization table, output format
rubric.md                     # Level definitions for the seven dimensions + borderline guidance (loaded on demand from Step 4)
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
2. Runs a six-step workflow, each step with a checkpoint: draft → claim map → hidden assumptions → rate seven dimensions (evidence strength, assumption visibility, confidence calibration, action pressure, alternative coverage, epistemic authority, false consensus) → intervene by tier → exit check
3. Evidence strength selects the tier: high → Tier A (direct, confident); medium → Tier B (multiple interpretations); low → Tier C (no recommendation, verification steps only)
4. Outputs a structured report: decision audit, claim map, hidden assumptions, calibrated answer, and verification steps

## Design principles

The skill follows the five principles from [Agent Skills](https://addyosmani.com/blog/agent-skills/). Keep them intact when editing:

- **Process over prose** — `SKILL.md` is a numbered workflow with a produced artifact and checkpoint per step. Don't replace steps with explanatory paragraphs.
- **Anti-rationalization table** — each row pairs an excuse for skipping the work with a rebuttal. Add rows when a new failure mode shows up; don't delete rows without a replacement.
- **Verification as exit criterion** — Step 6 must pass before output. Every audit rating cites the claim map; every verification step names what/how/what-would-change.
- **Progressive disclosure** — `SKILL.md` stays lean and points to `rubric.md`, the template, and the example. Level definitions live in `rubric.md` only; don't duplicate them in `SKILL.md`.
- **Scope discipline** — the skill calibrates the draft; it does not re-answer. The Scope rules section enforces this.

## Editing guidelines

- `SKILL.md` frontmatter (`name`, `description`) must remain valid YAML. Keep the `description` concrete and evaluable from the user's question alone — abstract phrasing broke auto-invocation once already (see PR #5)
- The five output sections in `SKILL.md`, `templates/report_template.md`, and `examples/worked-example.md` must stay in sync
- Rubric levels (high/medium/low) in `rubric.md` should match the scales used in the decision audit
- False consensus uses `none detected / possible / present` scale across all files
- Any new top-level file or directory the skill references must be added to `bin/install.mjs` and the `files` array in `package.json`
