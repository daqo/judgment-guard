#!/usr/bin/env node

import { mkdirSync, cpSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const targetDir = join(homedir(), ".claude", "skills", "judgment-guard");

const readVersion = (skillMd) =>
  existsSync(skillMd) ? /^\s+version:\s*"?([^"\n]+)"?/m.exec(readFileSync(skillMd, "utf8"))?.[1] : undefined;

const hadPrevious = existsSync(join(targetDir, "SKILL.md"));
const previous = readVersion(join(targetDir, "SKILL.md"));
const next = readVersion(join(packageRoot, "SKILL.md"));

mkdirSync(targetDir, { recursive: true });

cpSync(join(packageRoot, "SKILL.md"), join(targetDir, "SKILL.md"));
cpSync(join(packageRoot, "rubric.md"), join(targetDir, "rubric.md"));
cpSync(join(packageRoot, "evidence-protocol.md"), join(targetDir, "evidence-protocol.md"));
cpSync(join(packageRoot, "templates"), join(targetDir, "templates"), { recursive: true });
cpSync(join(packageRoot, "examples"), join(targetDir, "examples"), { recursive: true });

const action = !hadPrevious ? "installed"
  : previous === undefined ? "updated (previous install was unversioned)"
  : previous === next ? "reinstalled"
  : `updated from ${previous}`;

console.log(`\n  judgment-guard ${next} ${action} at ${targetDir}\n`);
console.log("  Claude Code will load this skill automatically when you ask");
console.log("  for advice on consequential topics.\n");
console.log("  You can also invoke it directly with /judgment-guard\n");
