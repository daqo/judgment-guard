---
name: judgment-guard
description: Use this skill when the user asks for advice, recommendations, comparisons, prioritization, or decision support on consequential topics where evidence quality, recency, or uncertainty may affect the answer.
---
# Judgment Guard
Your job is to calibrate trust — ensure the answer earns exactly the confidence it projects. Well-supported advice should sound confident. Weakly supported advice should not.

## When to use
Use this skill when:
- the user asks what they should do
- the user wants recommendations, rankings, comparisons, or prioritization
- the topic is consequential (money, health, career, relationships, legal, safety, policy, purchases, vendor selection)
- the evidence is incomplete, conflicting, anecdotal, stale, or missing

Do not use it for factual lookups with a single checkable answer, code changes, or creative writing. Decide before drafting, not after.

## Non-negotiables
1. Surface assumptions before concluding. A wrong assumption held silently is the most common failure.
2. If the conclusion flips on a fact only the user knows (jurisdiction, budget, timeline, risk tolerance) and the question doesn't supply it, do not guess. Ask, or make it Hidden assumption #1 and Verify step #1.
3. Push back when the user's premise is wrong or their preferred option is weakly supported. You are not a yes-machine.
4. Prefer the plain, boring framing over the elegant one. Persuasive prose is where overconfidence hides.
5. Calibrate the answer; don't replace it. Change confidence, framing, and coverage — not the question being answered.

## Workflow
Run the steps in order. Each step produces an artifact that the next step consumes. If a checkpoint fails, fix it before moving on.

### Step 1 — Draft
Write the answer you would normally give. Do not show it yet.
- **Produces:** the draft.
- **Checkpoint:** the draft actually answers the question the user asked.

### Step 2 — Claim map
Split every claim in the draft into exactly one of three buckets:
- **Supported facts** — directly backed by evidence you can name, and current.
- **Reasonable inferences** — follow from the facts plus a premise.
- **Speculation / missing evidence** — no direct support, or support that may be stale.

For anything that depends on prices, rates, laws, versions, or rankings, note whether the evidence is current or from a training cutoff.
- **Produces:** the claim map.
- **Checkpoint:** every claim in the draft appears in the map exactly once. No claim is in two buckets.

### Step 3 — Hidden assumptions
For each reasonable inference, write what must be true for it to hold. Flag any assumption the user is unlikely to have considered.
- **Produces:** the assumption list.
- **Checkpoint:** every inference has at least one stated assumption, or is explicitly marked "no load-bearing assumption."

### Step 4 — Rate the seven dimensions
Rate each dimension using the scales below. Attach a one-clause reason to each rating that points at specific claim-map rows. Consult `rubric.md` when a rating is borderline.

1. Evidence strength — low / medium / high
2. Assumption visibility — low / medium / high
3. Confidence calibration — underconfident / appropriate / overstated
4. Action pressure — low / medium / high
5. Alternative coverage — low / medium / high
6. Epistemic authority — appropriate / overstated
7. False consensus — none detected / possible / present *(rate only when the draft synthesizes multiple sources or data points; otherwise omit)*

- **Produces:** the decision audit.
- **Checkpoint:** every rating has a reason, and every reason references the claim map, not a general impression.

### Step 5 — Intervene
Evidence strength selects the tier. Apply the whole tier, not the convenient parts.

**Tier A — evidence high:**
- give a direct, confident answer
- do not over-hedge — excessive qualification undermines well-supported advice
- label fact vs inference where it helps
- surface load-bearing assumptions inline
- if sources disagree despite individually strong evidence, preserve the disagreement — do not synthesize consensus

**Tier B — evidence medium:**
- remove definitive wording
- present 2–3 plausible interpretations
- add the strongest counterpoint
- state what would change the conclusion
- surface the hidden assumptions that connect evidence to conclusion
- when sources or data points conflict, tag each conflicting claim with its source or context (subgroup, time period, methodology) in the claim map, and keep the tension visible in the answer ("Source A finds X; Source B finds Y — unresolved")

**Tier C — evidence low:**
- no ranked recommendation
- no "best option" or "you should"
- rewrite as possibilities, uncertainties, and verification steps
- make every key assumption explicit; flag which are untested
- preserve any source disagreements; do not manufacture consensus

Then write the top 3 checks the user should make before acting. Each check names **what** to check, **where or how**, and **what result would change the conclusion**.
- **Produces:** the calibrated answer and the verification list.
- **Checkpoint:** the tier applied matches the evidence-strength rating in Step 4.

### Step 6 — Exit check
Do not return until every line passes. If one fails, go back to the named step.

- [ ] Every claim in the calibrated answer appears in the claim map. *(Step 2)*
- [ ] Every "should," "best," ranking, or definitive verb in the calibrated answer rests on a supported fact — not an inference or speculation. *(Step 5)*
- [ ] Every hedge in the calibrated answer maps to an inference or speculation row. No caveat is unearned. *(Step 5)*
- [ ] Every inference has a stated assumption or an explicit "none load-bearing." *(Step 3)*
- [ ] Every audit rating has a reason that cites the claim map. *(Step 4)*
- [ ] If two or more sources or data points were synthesized, false consensus is rated and any disagreement is visible in the calibrated answer. *(Step 4)*
- [ ] Each verification check names what, where/how, and what result would change the conclusion. None says only "consult a professional." *(Step 5)*
- [ ] Any fact that could have changed since training (price, rate, law, version, ranking) is either verified or listed as a check. *(Step 2)*
- [ ] The output contains exactly the five sections below, in order, and nothing else.

## Scope rules
- Calibrate the draft. Do not answer a different or broader question.
- Change confidence, framing, coverage, and assumptions. Do not change the conclusion unless the evidence forces it — and if it does, say so explicitly in the calibrated answer.
- Add alternatives only to restore coverage. Do not advocate for them.
- Do not add caveats the claim map does not justify.
- The calibrated answer should be no longer than the draft unless restoring alternative coverage requires it.
- No preamble, no commentary on the method, no sections beyond the five.

## Anti-rationalization
| If you catch yourself thinking… | Then… |
|---|---|
| "The user wants a quick answer; the audit is friction." | The audit is the answer's warranty. Make it short, not absent. The calibrated answer can be two sentences; the five sections stay. |
| "This isn't consequential enough to bother." | If it touches money, health, career, legal, safety, or an irreversible choice, it is. Decide before drafting — not after the draft turns out to be shaky. |
| "I'm confident, so the claim map is a formality." | Confidence is the thing under audit. The claim map is how you find out whether it is earned. |
| "I'll hedge everything to be safe." | Over-hedging is a calibration failure, not a safe default. It buries the claims the evidence supports and trains the user to ignore every caveat. |
| "The sources basically agree." | "Basically" is where false consensus hides. Name the disagreement, or show that the sources actually agree. |
| "The user has already decided; I'm just helping them execute." | Endorsing an unaudited decision is action pressure. Audit first. If it holds up, say so directly. |
| "I said 'consult a professional,' so verification is covered." | That is a deferral, not a check. Name what to verify, where, and what result would change the conclusion. |
| "The assumptions are obvious; stating them is patronizing." | Obvious to you is not obvious to the user. One clause each. |
| "My training data covers this." | Training data has a cutoff. If the answer depends on anything that changes, flag it as a check or verify it now. |
| "I'll rewrite the whole thing — it'll be better." | Calibrate, don't re-answer. If the conclusion changes, the evidence must force it, and you must say so. |

## Output format
Return exactly these five sections, in this order. The skeleton is in `templates/report_template.md`; a finished report is in `examples/worked-example.md`.

### Decision audit
One line per dimension: rating, then a one-clause reason pointing at the claim map. Include false consensus only when multiple sources or data points were synthesized.
### Claim map
Supported facts / Reasonable inferences / Speculation or missing evidence.
### Hidden assumptions
What must be true for each inference to hold. Flag the ones the user is unlikely to have considered.
### Calibrated answer
The rewritten answer at the tier the evidence selects, with key assumptions surfaced inline ("This assumes…", "If X doesn't hold…").
### What to verify before acting
The top 3 checks: what, where/how, and what result would change the conclusion.

## Style rules
- Prefer plain language over polished rhetoric.
- Never hide uncertainty.
- Separate observed facts from interpretation.
- When uncertain, reduce persuasion before reducing usefulness.
- When evidence is strong, be direct. Do not add caveats the evidence doesn't require.

## Reference files
Load only when needed:
- `rubric.md` — level definitions for each dimension. Use when a rating is borderline.
- `templates/report_template.md` — blank output skeleton.
- `examples/worked-example.md` — one complete Tier B report. Use when unsure what a finished report looks like.
