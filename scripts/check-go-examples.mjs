// Extracts every lesson's Go `code` sample from src/data/chapters.ts into its own
// package under a temp module, then runs `go vet ./...` (which also type-checks/compiles).
// Usage: node --experimental-strip-types scripts/check-go-examples.mjs
import { chaptersData } from '../src/data/chapters.ts';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'go-examples-'));
fs.writeFileSync(path.join(dir, 'go.mod'), 'module examples\n\ngo 1.23\n');
const keys = Object.keys(chaptersData);
for (const key of keys) {
  fs.mkdirSync(path.join(dir, key));
  fs.writeFileSync(path.join(dir, key, 'main.go'), chaptersData[key].code);
}
try {
  execFileSync('go', ['vet', './...'], { cwd: dir, stdio: 'inherit' });
  console.log(`go vet passed for ${keys.length} lesson examples`);
} catch {
  console.error('go vet failed; see errors above (directory name = chapter key)');
  process.exit(1);
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
}
