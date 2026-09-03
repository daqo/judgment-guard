# Evidence Protocol
Reference for Step 2 of `SKILL.md` (Evidence sweep). Load only during that step.

The goal of the sweep is **recall**: make sure every kind of evidence that bears on the load-bearing claims has been looked for. Filtering for quality happens later, in the claim map. Do not discard evidence while gathering it.

## 1. Log the prior first
Before searching, list what the draft already asserts and where each assertion comes from. Everything at this point is tagged **prior (training data, unverified)**. The prior is a hypothesis list, not evidence. It tells you what to search for; it does not count as a source.

## 2. Identify load-bearing claims
A claim is load-bearing if the conclusion changes when the claim is false. Usually 1–4 per answer. Only load-bearing claims get the full query plan; supporting detail gets a single confirming query or none.

## 3. Query plan — per load-bearing claim
Run each of these. Skip one only if you can say why it does not apply.

| Query | Purpose | Pattern |
|---|---|---|
| Confirming | Find the best support for the claim as stated | natural phrasing of the claim |
| Disconfirming | Find the best case against it | "X fails", "X risks", "criticism of X", "X doesn't work when", "alternatives to X" |
| Recency | Catch changes since the training cutoff | claim + current year; "X update", "X changes", "latest X" — required whenever the claim involves a price, rate, law, regulation, version, ranking, or availability |
| Perspective | Surface how a different stakeholder frames it | rephrase from the opposing party's side (buyer vs seller, patient vs clinician, incumbent vs challenger, regulator vs regulated) |

Run confirming and disconfirming queries as a pair. A confirming search on its own is confirmation bias with a tool.

## 4. Source-type coverage matrix
Different evidence types surface different facts. Before stopping, every row must be **filled**, **marked "searched — nothing found"**, or **marked "N/A"** with a reason. Adapt the rows to the domain; the ones below cover most consequential topics.

| Type | What it uniquely provides | Filled / Nothing found / N/A |
|---|---|---|
| Primary data / statistics | The actual numbers rather than someone's summary of them | |
| Peer-reviewed research / systematic reviews | Effect sizes, methodology, subgroup results, replication status | |
| Official / regulatory / standards bodies | What is currently permitted, required, or recommended | |
| First-party (vendor, manufacturer, issuer, employer) | Specs, terms, prices — authoritative on facts, self-interested on judgments | |
| Expert practitioner commentary | Where the theory breaks in practice | |
| User / community reports (forums, issue trackers, reviews) | Failure modes and edge cases nobody publishes formally | |
| Recent news | Changes since the training cutoff | |

Rules:
- A blank cell is a finding. "No peer-reviewed evidence exists" belongs in the claim map under *Speculation / missing evidence*.
- Top search results are ranked for popularity, not for evidence type. Ten results of the same type do not fill ten cells.
- "N/A" needs a reason ("no regulator governs this"). "Didn't look" is not N/A.

## 5. Independence test
Two sources are independent only if they do not share an upstream. Before counting agreement:
- Trace each fact to its origin (the study, the filing, the announcement, the dataset).
- Syndicated copies, rewrites, and citations of the same origin count as **one** source.
- Record the origin, not the URL that surfaced it.

Most false consensus is a failure of this test, not of judgment.

## 6. Evidence ledger
Record every retrieved fact as one line:

`[type] origin — date — what it says — confirms / disconfirms / qualifies claim N`

The ledger feeds the claim map. A claim may enter *Supported facts* only if it has at least one ledger entry. Prior-only knowledge that retrieval did not confirm stays in *Reasonable inferences*, or *Speculation* if it is time-sensitive.

## 7. Reconcile prior vs retrieved
- Where they agree: promote the claim, cite the ledger entry.
- Where they disagree: retrieved-and-current wins for anything time-sensitive. Note the update in the claim map ("prior said X; current source says Y").
- Where retrieval found nothing: the prior stays a prior. Absence of evidence is not evidence of absence, and it is not confirmation either.

## 8. Stopping rule
Stop when **both** hold:
- every matrix row is filled, marked "nothing found," or marked N/A with a reason; and
- the last three queries surfaced no new claim and no new source type (saturation).

Budget: roughly 3–4 queries per load-bearing claim, about a dozen total, unless the user has asked for deeper research. Scale to the claims the answer actually rests on, not to the topic in general. If the budget runs out before saturation, say so in the claim map's coverage note.

## 9. No search tool available
If the session has no web search or fetch tool:
- state this in the claim map's coverage note
- tag every claim as prior; nothing enters *Supported facts* except what the user supplied
- cap Evidence strength at **medium**
- move every unfilled matrix row into *What to verify before acting*

## 10. What the reader sees
Two summaries of the ledger go into the claim map. The full ledger (per-result rows) stays internal.

**Evidence sweep** — one entry per load-bearing claim: the exact queries run, then For and Against with origins named:

```
**Evidence sweep**
1. <load-bearing claim>
   Queries: "<confirming query>" · "<disconfirming query>" · "<recency query>"
   For: <finding> — <origin>, <origin>
   Against: <finding> — <origin>   |   none found
```

Write queries verbatim as run, in order, separated by ` · `. List weak counter-evidence with its weight rather than dropping it. The reader should be able to see, for each claim, what was asked, that the counter-case was looked for, and what turned up.

**Coverage** — one short block at the end of the claim map:

```
**Coverage**
- Searched: <matrix rows filled>
- Nothing found: <rows searched with no result>
- Not applicable: <rows> — <reason>
- Independent origins: <count>
- Stopped because: saturation / budget / no search tool
```
