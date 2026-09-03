#!/usr/bin/env node
// Installs the judgment-guard skill into one or more agents' skill directories.
//
//   npx @fydel-ai/judgment-guard@latest                      → Claude Code, user scope (default)
//   npx @fydel-ai/judgment-guard@latest --agent codex        → one agent
//   npx @fydel-ai/judgment-guard@latest --agent gemini --agent cursor
//   npx @fydel-ai/judgment-guard@latest --agent all
//   npx @fydel-ai/judgment-guard@latest --project            → ./.claude/skills (commit to share with a team)
//   npx @fydel-ai/judgment-guard@latest --dir ~/some/skills  → any directory
//
// Paths come from each agent's own docs (see README). Several agents share
// `.agents/skills/` for project scope; duplicates are collapsed.

import { mkdirSync, cpSync, existsSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const AGENTS = {
  claude:   { label: "Claude Code",    user: "~/.claude/skills",          project: ".claude/skills" },
  codex:    { label: "Codex",          user: "~/.codex/skills",           project: ".agents/skills" },
  gemini:   { label: "Gemini CLI",     user: "~/.gemini/skills",          project: ".agents/skills" },
  opencode: { label: "OpenCode",       user: "~/.config/opencode/skills", project: ".opencode/skills" },
  cursor:   { label: "Cursor",         user: "~/.cursor/skills",          project: ".agents/skills" },
  copilot:  { label: "GitHub Copilot", user: "~/.copilot/skills",         project: ".agents/skills" },
  agents:   { label: "shared .agents", user: "~/.agents/skills",          project: ".agents/skills" },
};

const SKILL = "judgment-guard";
const FILES = ["SKILL.md", "rubric.md", "evidence-protocol.md", "templates", "examples"];
const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

// --- args ---
const args = process.argv.slice(2);
const agents = [];
const dirs = [];
let project = false;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--agent" || a === "-a") agents.push(args[++i]);
  else if (a.startsWith("--agent=")) agents.push(a.slice(8));
  else if (a === "--dir" || a === "-d") dirs.push(args[++i]);
  else if (a.startsWith("--dir=")) dirs.push(a.slice(6));
  else if (a === "--project" || a === "-p") project = true;
  else if (a === "--help" || a === "-h") { help(); process.exit(0); }
  else { console.error(`Unknown option: ${a}\n`); help(); process.exit(1); }
}
if (agents.includes("all")) agents.splice(0, agents.length, ...Object.keys(AGENTS));
for (const a of agents) if (!AGENTS[a]) { console.error(`Unknown agent '${a}'. Choose from: ${Object.keys(AGENTS).join(", ")}, all`); process.exit(1); }
if (agents.length === 0 && dirs.length === 0) agents.push("claude");

// --- resolve targets (deduped) ---
const expand = (p) => resolve(p.startsWith("~/") ? join(homedir(), p.slice(2)) : p);
const targets = new Map(); // dir → labels
for (const a of agents) {
  const base = expand(AGENTS[a][project ? "project" : "user"]);
  const dir = join(base, SKILL);
  targets.set(dir, [...(targets.get(dir) ?? []), AGENTS[a].label]);
}
for (const d of dirs) targets.set(join(expand(d), SKILL), [...(targets.get(join(expand(d), SKILL)) ?? []), "custom"]);

// --- install ---
const readVersion = (skillMd) =>
  existsSync(skillMd) ? /^\s+version:\s*"?([^"\n]+)"?/m.exec(readFileSync(skillMd, "utf8"))?.[1] : undefined;
const next = readVersion(join(packageRoot, "SKILL.md"));

console.log();
for (const [dir, labels] of targets) {
  const hadPrevious = existsSync(join(dir, "SKILL.md"));
  const previous = readVersion(join(dir, "SKILL.md"));
  mkdirSync(dir, { recursive: true });
  for (const f of FILES) cpSync(join(packageRoot, f), join(dir, f), { recursive: true });
  const action = !hadPrevious ? "installed"
    : previous === undefined ? "updated (previous install was unversioned)"
    : previous === next ? "reinstalled"
    : `updated from ${previous}`;
  console.log(`  ${SKILL} ${next} ${action}`);
  console.log(`    ${labels.join(", ")} → ${dir}`);
}
console.log();
console.log("  Your agent will load this skill automatically when you ask for advice");
console.log("  on consequential topics. Start a new session if it doesn't appear.");
console.log(`  In Claude Code you can also invoke it directly with /${SKILL}\n`);

function help() {
  console.log(`Usage: npx @fydel-ai/judgment-guard@latest [options]

  --agent, -a <name>   Target agent (repeatable). Default: claude
                       ${Object.keys(AGENTS).join(", ")}, all
  --project, -p        Install to the current project instead of your home directory
  --dir, -d <path>     Install into <path>/${SKILL} (repeatable)
  --help, -h           Show this help

Paths:`);
  for (const [k, v] of Object.entries(AGENTS))
    console.log(`  ${k.padEnd(9)} ${v.label.padEnd(15)} user: ${v.user.padEnd(28)} project: ${v.project}`);
}
