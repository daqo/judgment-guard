# Judgment Guard

An [Agent Skill](https://agentskills.io) that calibrates trust in AI-generated advice — confidence matches evidence, no more, no less.

Ask your agent for advice on money, health, career, legal, safety, or a big purchase, and this skill makes it gather the evidence, audit its own draft, and answer at the confidence the evidence actually supports. Works in Claude Code, Codex, Gemini CLI, Cursor, OpenCode, GitHub Copilot, OpenClaw, and any agent that reads `SKILL.md`.

## Install

**Claude Code**

```bash
npx @fydel-ai/judgment-guard@latest
```

**Other agents** — pick one or more, or `all`:

```bash
npx @fydel-ai/judgment-guard@latest --agent codex
npx @fydel-ai/judgment-guard@latest --agent gemini --agent cursor
npx @fydel-ai/judgment-guard@latest --agent all
```

| `--agent` | Installs to |
|---|---|
| `claude` (default) | `~/.claude/skills/` — also read by OpenCode |
| `codex` | `~/.codex/skills/` |
| `gemini` | `~/.gemini/skills/` |
| `opencode` | `~/.config/opencode/skills/` |
| `cursor` | `~/.cursor/skills/` |
| `copilot` | `~/.copilot/skills/` |
| `openclaw` | `~/.openclaw/skills/` — or natively: `openclaw skills install git:fydel-ai/judgment-guard@main` |
| `agents` | `~/.agents/skills/` — shared path read by Gemini, OpenCode, OpenClaw, Cline, Zed, Warp, and others |

**Share with a team** — add `--project` to install into the current repo (`.claude/skills/` or `.agents/skills/`) and commit it. Teammates get it when they pull.

**Any of 70+ agents** via the [skills CLI](https://github.com/vercel-labs/skills), which symlinks one copy into every agent it detects:

```bash
npx skills add fydel-ai/judgment-guard
```

**Manual** — `git clone https://github.com/fydel-ai/judgment-guard.git` into any skills directory above. The folder must be named `judgment-guard`.

Requires Node.js 18+. Start a new agent session after installing.

## Update

Nothing updates automatically. Re-run the same install command; it overwrites the old files and reports the version change:

```
judgment-guard 1.4.0 updated from 1.3.0
```

If `npx` keeps giving you an old version, clear its cache first:

```bash
rm -rf ~/.npm/_npx && npx @fydel-ai/judgment-guard@latest
```

For `git clone` installs, `git pull`. For `npx skills add` installs, `npx skills update`. To see what's installed:

```bash
grep -A1 '^metadata:' ~/.claude/skills/judgment-guard/SKILL.md
```

## How it works

Every advice answer goes through seven steps, each with a checkpoint:

1. **Draft** from prior knowledge, marking the load-bearing claims — a hypothesis, not an answer
2. **Evidence sweep** — search for and against each load-bearing claim across primary data, research, official sources, first-party, practitioner, and community evidence; stop at saturation
3. **Claim map** — supported facts (with sources), reasonable inferences, speculation, then the evidence sweep laid out per claim: the **queries** run, what was found **for** it, what was found **against** it, and what was searched but not found
4. **Hidden assumptions** — what must be true for each inference to hold
5. **Rate** seven dimensions: evidence strength, assumption visibility, confidence calibration, action pressure, alternative coverage, epistemic authority, false consensus
6. **Intervene** at the tier the evidence selects — direct answer, hedged options, or verification steps only
7. **Exit check** — every definitive claim rests on a supported fact, every hedge is earned, every verification step says what to check and what would change the conclusion

Output is five sections: decision audit, claim map, hidden assumptions, calibrated answer, and what to verify before acting. See a complete example in [`examples/worked-example.md`](examples/worked-example.md).

The skill needs a web search tool for the evidence sweep. Without one it says so, treats everything as unverified, and caps confidence at medium.

## Learn more

| File | What's in it |
|---|---|
| [`SKILL.md`](SKILL.md) | The workflow, intervention tiers, scope rules, anti-rationalization table, exit check |
| [`evidence-protocol.md`](evidence-protocol.md) | How the evidence sweep works — query plan, coverage matrix, stopping rule |
| [`rubric.md`](rubric.md) | How each dimension is rated |
| [`examples/worked-example.md`](examples/worked-example.md) | A full report, start to finish |

Design follows the principles in Addy Osmani's [Agent Skills](https://addyosmani.com/blog/agent-skills/): process over prose, anti-rationalization, verification as the exit criterion, progressive disclosure, scope discipline.

## Contributing

`npm test` validates `SKILL.md` against the Agent Skills spec and checks the version is in sync. See [`CLAUDE.md`](CLAUDE.md) for editing rules.

## License

[MIT](LICENSE)
