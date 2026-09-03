#!/usr/bin/env node
// Validates SKILL.md against the Agent Skills spec (ported from the reference
// validator at github.com/agentskills/agentskills/tree/main/skills-ref) and
// checks that metadata.version matches package.json.
//
//   node bin/check.mjs         validate; exit 1 on any error
//   node bin/check.mjs --fix   also rewrite metadata.version from package.json

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillPath = join(root, "SKILL.md");
const fix = process.argv.includes("--fix");

const ALLOWED_FIELDS = new Set(["name", "description", "license", "allowed-tools", "metadata", "compatibility"]);
const errors = [];

// Minimal frontmatter parser: flat `key: value` lines plus one level of
// indented `  key: value` under a map key. Enough for spec-conformant SKILL.md.
function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) throw new Error("SKILL.md must start with YAML frontmatter (---)");
  const end = text.indexOf("\n---", 4);
  if (end === -1) throw new Error("SKILL.md frontmatter not properly closed with ---");
  const fm = {};
  let current = null;
  for (const raw of text.slice(4, end).split("\n")) {
    if (!raw.trim()) continue;
    const nested = /^\s+([^:]+):\s*(.*)$/.exec(raw);
    const top = /^([^\s:][^:]*):\s*(.*)$/.exec(raw);
    if (nested && current) {
      fm[current][nested[1].trim()] = unquote(nested[2]);
    } else if (top) {
      const [, key, value] = top;
      if (value === "") { fm[key] = {}; current = key; }
      else { fm[key] = unquote(value); current = null; }
    } else {
      throw new Error(`Unparseable frontmatter line: ${raw}`);
    }
  }
  return fm;
}
const unquote = (s) => s.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");

const skill = readFileSync(skillPath, "utf8");
let fm;
try { fm = parseFrontmatter(skill); } catch (e) { fail(e.message); }

// --- Spec checks (mirror skills-ref validator.py) ---
const extra = Object.keys(fm).filter((k) => !ALLOWED_FIELDS.has(k));
if (extra.length) errors.push(`Unexpected fields in frontmatter: ${extra.join(", ")}. Only ${[...ALLOWED_FIELDS].sort().join(", ")} are allowed.`);

if (!fm.name) errors.push("Missing required field in frontmatter: name");
else {
  const n = fm.name;
  if (n.length > 64) errors.push(`Skill name exceeds 64 characters (${n.length})`);
  if (n !== n.toLowerCase()) errors.push("Skill name must be lowercase");
  if (n.startsWith("-") || n.endsWith("-")) errors.push("Skill name cannot start or end with a hyphen");
  if (n.includes("--")) errors.push("Skill name cannot contain consecutive hyphens");
  if (!/^[\p{L}\p{N}-]+$/u.test(n)) errors.push("Skill name may only contain letters, digits, and hyphens");
  // The spec requires the directory name to match. The installer guarantees it;
  // a git checkout may be anywhere, so only warn here.
  if (basename(root) !== n) console.warn(`warning: directory '${basename(root)}' does not match skill name '${n}'; install path must be .../${n}/`);
}

if (!fm.description) errors.push("Missing required field in frontmatter: description");
else if (fm.description.length > 1024) errors.push(`Description exceeds 1024 characters (${fm.description.length})`);

if (fm.compatibility !== undefined && (typeof fm.compatibility !== "string" || fm.compatibility.length > 500))
  errors.push("compatibility must be a string of at most 500 characters");

if (fm.metadata !== undefined) {
  if (typeof fm.metadata !== "object") errors.push("metadata must be a map");
  else for (const [k, v] of Object.entries(fm.metadata)) {
    if (typeof v !== "string") errors.push(`metadata.${k} must be a string`);
    if (ALLOWED_FIELDS.has(k)) errors.push(`metadata key '${k}' shadows a frontmatter field name`);
  }
}

// --- Version sync ---
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const skillVersion = fm.metadata?.version;
if (skillVersion !== pkg.version) {
  if (fix) {
    const updated = skill.replace(/^(\s+version:\s*)"[^"]*"/m, `$1"${pkg.version}"`);
    if (updated === skill) errors.push("Could not find metadata.version to rewrite");
    else { writeFileSync(skillPath, updated); console.log(`SKILL.md metadata.version → "${pkg.version}"`); }
  } else {
    errors.push(`metadata.version in SKILL.md ("${skillVersion}") does not match package.json ("${pkg.version}"). Run: npm test -- --fix`);
  }
}

if (errors.length) fail(errors.join("\n"));
console.log(`SKILL.md ok — ${fm.name} ${pkg.version}`);

function fail(msg) { console.error(msg); process.exit(1); }
