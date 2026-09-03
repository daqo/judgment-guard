---
name: judgment-guard
description: Use this skill when the user asks for advice, recommendations, comparisons, prioritization, or decision support on consequential topics where evidence quality, recency, or uncertainty may affect the answer.
metadata:
  version: "1.5.0"
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
Write the answer you would normally give, from what you already know. Do not show it. Treat it as a hypothesis: it tells you what to go and check, and it is not evidence.
- **Produces:** the draft, with its 1–4 load-bearing claims marked (the ones where the conclusion changes if the claim is false).
- **Checkpoint:** the draft actually answers the question the user asked.

### Step 2 — Evidence sweep
Search for everything that bears on the load-bearing claims before judging any of it. Follow `evidence-protocol.md`. In short:
- for each load-bearing claim, run a **confirming**, a **disconfirming**, and — if the claim involves a price, rate, law, version, ranking, or availability — a **recency** query
- fill the **source-type coverage matrix**: every row filled, "searched — nothing found," or N/A with a reason
- trace each fact to its **origin**; syndicated copies count once
- record each retrieved fact in the **evidence ledger** with type, origin, date, and which claim it confirms, disconfirms, or qualifies
- stop at **saturation** (three queries with nothing new and no blank matrix rows), or at budget — and say which
- if no search tool is available, say so, tag everything as prior, and cap Evidence strength at medium

- **Produces:** the evidence ledger and coverage note.
- **Checkpoint:** every load-bearing claim has a disconfirming query logged. No matrix row is blank. Every ledger entry has an origin and a date.

### Step 3 — Claim map
Split every claim in the draft into exactly one of three buckets:
- **Supported facts** — has at least one ledger entry from Step 2 (or was supplied by the user), and is current. Cite the origin inline.
- **Reasonable inferences** — follow from the facts plus a premise. Prior knowledge that retrieval did not confirm goes here.
- **Speculation / missing evidence** — no direct support, support that may be stale, or a matrix row that came back empty.

Where the prior and retrieved evidence disagree, retrieved-and-current wins for anything time-sensitive; note the update.

Then show the sweep. Under **Evidence sweep**, one entry per load-bearing claim with a **Queries** line (the exact search strings run, in the order run), a **For** line and an **Against** line, each naming its origins. Weak counter-evidence is listed with its weight, not dropped. If nothing was found against a claim, say so ("none found") — the Queries line shows what was tried. End with the coverage note from Step 2.
- **Produces:** the claim map.
- **Checkpoint:** every claim in the draft appears in the map exactly once. Nothing sits in *Supported facts* without a ledger entry or user-supplied source. Every load-bearing claim has a Queries line, a For line, and an Against line.

### Step 4 — Hidden assumptions
For each reasonable inference, write what must be true for it to hold. Flag any assumption the user is unlikely to have considered.
- **Produces:** the assumption list.
- **Checkpoint:** every inference has at least one stated assumption, or is explicitly marked "no load-bearing assumption."

### Step 5 — Rate the seven dimensions
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

### Step 6 — Intervene
Evidence strength selects the tier. Evidence strength cannot be **high** if any matrix row is blank or a load-bearing claim was never tested with a disconfirming query. Apply the whole tier, not the convenient parts.

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
- **Checkpoint:** the tier applied matches the evidence-strength rating in Step 5.

### Step 7 — Exit check
Do not return until every line passes. If one fails, go back to the named step.

- [ ] Every load-bearing claim has a confirming and a disconfirming query in the ledger. *(Step 2)*
- [ ] No source-type matrix row is blank; each is filled, "nothing found," or N/A with a reason. *(Step 2)*
- [ ] Sources counted as agreeing have distinct origins. *(Step 2)*
- [ ] Every entry in *Supported facts* has a ledger entry or user-supplied source, cited inline. *(Step 3)*
- [ ] Every load-bearing claim appears in the Evidence sweep block with its Queries, a For line, and an Against line. The Queries line includes at least one disconfirming query. *(Step 3)*
- [ ] Every claim in the calibrated answer appears in the claim map. *(Step 3)*
- [ ] Every "should," "best," ranking, or definitive verb in the calibrated answer rests on a supported fact — not an inference or speculation. *(Step 6)*
- [ ] Every hedge in the calibrated answer maps to an inference or speculation row. No caveat is unearned. *(Step 6)*
- [ ] Every inference has a stated assumption or an explicit "none load-bearing." *(Step 4)*
- [ ] Every audit rating has a reason that cites the claim map. *(Step 5)*
- [ ] If two or more sources or data points were synthesized, false consensus is rated and any disagreement is visible in the calibrated answer. *(Step 5)*
- [ ] Each verification check names what, where/how, and what result would change the conclusion. None says only "consult a professional." *(Step 6)*
- [ ] Any fact that could have changed since training (price, rate, law, version, ranking) has a recency query in the ledger or is listed as a check. *(Step 2)*
- [ ] The output contains exactly the five sections below, in order, and nothing else.

## Scope rules
- Calibrate the draft. Do not answer a different or broader question.
- Change confidence, framing, coverage, and assumptions. Do not change the conclusion unless the evidence forces it — and if it does, say so explicitly in the calibrated answer.
- Add alternatives only to restore coverage. Do not advocate for them.
- Do not add caveats the claim map does not justify.
- The calibrated answer should be no longer than the draft unless restoring alternative coverage requires it.
- Search exhaustively on the claims the answer rests on, not on the topic in general. The sweep scales with load-bearing claims, not with how interesting the subject is.
- No preamble, no commentary on the method, no sections beyond the five.

## Anti-rationalization
| If you catch yourself thinking… | Then… |
|---|---|
| "The user wants a quick answer; the audit is friction." | The audit is the answer's warranty. Make it short, not absent. The calibrated answer can be two sentences; the five sections stay. |
| "This isn't consequential enough to bother." | If it touches money, health, career, legal, safety, or an irreversible choice, it is. Decide before drafting — not after the draft turns out to be shaky. |
| "I know this domain well; I don't need to search." | Then you can predict the disconfirming query. Run it. If it returns nothing new, that is evidence — and it took one query. |
| "The top results are representative." | Top results are ranked for popularity, not evidence type. Ten results of one kind fill one matrix row, not ten. |
| "One authoritative source is enough." | One source cannot show disagreement. Find the second, or record that you searched and it does not exist. |
| "More searching won't change the answer." | You cannot know that before searching. Run the disconfirming and recency queries; if nothing new comes back, you have hit saturation, and you can say so. |
| "No results means there's no evidence against it." | It means the query missed or the evidence is not indexed. Log it as a gap, not as support. |
| "The counter-evidence is too weak to be worth showing." | Show it with its weight. A visible weak Against is how the reader knows you looked; an empty one looks like you didn't. |
| "Listing the queries clutters the report." | One line per claim. The queries are the only part of the sweep the reader can independently re-run; without them "none found" is unfalsifiable. |
| "I'm confident, so the claim map is a formality." | Confidence is the thing under audit. The claim map is how you find out whether it is earned. |
| "I'll hedge everything to be safe." | Over-hedging is a calibration failure, not a safe default. It buries the claims the evidence supports and trains the user to ignore every caveat. |
| "The sources basically agree." | "Basically" is where false consensus hides. Trace them to their origins; if they share one, they are one source. Otherwise name the disagreement. |
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
Supported facts (with origin cited inline) / Reasonable inferences / Speculation or missing evidence, then **Evidence sweep** (per load-bearing claim: the queries run, then For and Against with origins), then **Coverage** (searched, nothing found, N/A, independent origins, why the sweep stopped).
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
- `evidence-protocol.md` — query plan, source-type coverage matrix, independence test, ledger format, stopping rule, no-search-tool fallback, and the reader-facing Evidence sweep and Coverage formats. Use during Steps 2–3.
- `rubric.md` — level definitions for each dimension. Use when a rating is borderline.
- `templates/report_template.md` — blank output skeleton.
- `examples/worked-example.md` — one complete Tier B report. Use when unsure what a finished report looks like.
