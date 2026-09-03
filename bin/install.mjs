#!/usr/bin/env node

import { mkdirSync, cpSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const targetDir = join(homedir(), ".claude", "skills", "judgment-guard");

mkdirSync(targetDir, { recursive: true });

cpSync(join(packageRoot, "SKILL.md"), join(targetDir, "SKILL.md"));
cpSync(join(packageRoot, "rubric.md"), join(targetDir, "rubric.md"));
cpSync(join(packageRoot, "templates"), join(targetDir, "templates"), { recursive: true });
cpSync(join(packageRoot, "examples"), join(targetDir, "examples"), { recursive: true });

console.log(`\n  judgment-guard installed to ${targetDir}\n`);
console.log("  Claude Code will load this skill automatically when you ask");
console.log("  for advice on consequential topics.\n");
console.log("  You can also invoke it directly with /judgment-guard\n");
