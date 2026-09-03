# Judgment Guard

A Claude Code skill that calibrates trust in AI-generated advice — ensuring confidence matches evidence, no more, no less.

When you ask Claude for advice, recommendations, comparisons, or prioritization on consequential topics — money, health, career, legal, safety, purchases — this skill checks whether evidence quality, recency, or uncertainty should change the confidence of the answer, then rewrites it to match.

## What it does

Runs a six-step workflow on every advice answer, with a checkpoint at each step:

1. **Draft** the answer as normal (not shown)
2. **Claim map** — sort every claim into supported fact, reasonable inference, or speculation; flag anything that may be stale
3. **Hidden assumptions** — for each inference, state what must be true for it to hold
4. **Rate seven dimensions** — evidence strength, assumption visibility, confidence calibration, action pressure, alternative coverage, epistemic authority, false consensus. Each rating carries a reason that points at the claim map
5. **Intervene** by tier, selected by evidence strength:
   - **Tier A — strong evidence** — direct, confident answer with assumptions surfaced inline
   - **Tier B — mixed evidence** — multiple interpretations, counterpoints, and what would change the conclusion
   - **Tier C — weak evidence** — no ranked recommendations, only possibilities and verification steps
6. **Exit check** — a checklist that must pass before the answer is returned: every definitive claim rests on a supported fact, every hedge is earned, every verification step says what to check, how, and what result would change the conclusion

The output is a structured report: decision audit, claim map, hidden assumptions, calibrated answer, and verification checklist.

The skill also carries scope rules (calibrate the answer, don't replace it) and an anti-rationalization table — pre-written rebuttals to the excuses an agent uses to skip the work ("the user wants a quick answer," "I'll hedge everything to be safe," "the sources basically agree"). The design follows the principles in Addy Osmani's [Agent Skills](https://addyosmani.com/blog/agent-skills/): process over prose, anti-rationalization tables, verification as the exit criterion, progressive disclosure, and scope discipline.

## Install

**Requirements:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and Node.js 18+

### Quick install (recommended)

> Install judgment-guard: run `npx @fydel-ai/judgment-guard`

### Manual install

Clone the repo into your user skills directory:

> Install judgment-guard: run `git clone https://github.com/fydel-ai/judgment-guard.git ~/.claude/skills/judgment-guard`

Either method creates:

> `~/.claude/skills/judgment-guard/SKILL.md`

### Project install

To share the skill with teammates in a repo, copy it into the project skills directory:

> Add judgment-guard to this project: run `cp -Rf ~/.claude/skills/judgment-guard .claude/skills/judgment-guard && rm -rf .claude/skills/judgment-guard/.git`

Committed to a repository, this gives teammates:

> `.claude/skills/judgment-guard/SKILL.md`

### Usage

Claude Code can load the skill automatically when the prompt calls for advice on consequential topics, or you can invoke it directly with `/judgment-guard`.

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Skill definition — triggers, non-negotiables, six-step workflow with checkpoints, intervention tiers, exit check, scope rules, anti-rationalization table, output format |
| `rubric.md` | Level definitions for all seven dimensions, plus guidance for borderline ratings. Loaded on demand |
| `templates/report_template.md` | Blank template for the five output sections |
| `examples/worked-example.md` | One complete Tier B report, loaded on demand when the agent needs to see a finished output |

## Example output

```
### Decision audit
- Evidence strength: medium — because …
- Assumption visibility: low — because …
- Confidence calibration: overstated — because …
- Action pressure: high — because …
- Alternative coverage: low — because …
- Epistemic authority: appropriate — because …
- False consensus: none detected — because …

### Claim map
**Supported facts**
- ...

**Reasonable inferences**
- ...

**Speculation / missing evidence**
- ...

### Hidden assumptions
**What must be true for the inferences above to hold**
- ...

**Assumptions the user may not have considered**
- ...

### Calibrated answer
(rewritten response with confidence matched to evidence)

### What to verify before acting
1. What to check — where/how — what result would change the conclusion
2. ...
3. ...
```

See [`examples/worked-example.md`](examples/worked-example.md) for a complete report.

## License

[MIT](LICENSE)
