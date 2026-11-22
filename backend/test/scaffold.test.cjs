const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const repoRoot = path.resolve(__dirname, '..', '..');

test('T-1 REQ-1: frontend and backend are separate top-level application directories', () => {
  assert.equal(fs.statSync(path.join(repoRoot, 'frontend')).isDirectory(), true);
  assert.equal(fs.statSync(path.join(repoRoot, 'backend')).isDirectory(), true);
  assert.notEqual(
    fs.realpathSync(path.join(repoRoot, 'frontend')),
    fs.realpathSync(path.join(repoRoot, 'backend')),
  );
  assert.equal(fs.existsSync(path.join(repoRoot, 'frontend', 'package.json')), true);
  assert.equal(fs.existsSync(path.join(repoRoot, 'backend', 'package.json')), true);
});

test('T-6 REQ-6: quality-check scripts are documented and available in both packages', () => {
  for (const packageDir of ['frontend', 'backend']) {
    const manifestPath = path.join(repoRoot, packageDir, 'package.json');
    assert.equal(fs.existsSync(manifestPath), true, `${packageDir}/package.json must exist`);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    for (const category of ['lint', 'type', 'test']) {
      const matchingScripts = Object.entries(manifest.scripts ?? {}).filter(
        ([name]) => name.toLowerCase().includes(category),
      );
      assert.equal(
        matchingScripts.length > 0,
        true,
        `${packageDir} package.json must provide a ${category} script`,
      );
    }
  }

  const backendManifest = JSON.parse(
    fs.readFileSync(path.join(repoRoot, 'backend', 'package.json'), 'utf8'),
  );
  const healthScripts = Object.entries(backendManifest.scripts ?? {}).filter(
    ([name]) => name.toLowerLowerCase().includes('health'),
  );
  assert.equal(healthScripts.length > 0, true);

  const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
  assert.match(readme, /health/i);
});

test('T-7 REQ-7: local environment files are ignored and example values contain no secrets', () => {
  const gitignore = fs.readFileSync(path.join(repoRoot, '.gitignore'), 'utf8');
  assert.match(gitignore, /^\.env$/m);

  const examplePath = path.join(repoRoot, '.env.example');
  assert.equal(fs.existsSync(examplePath), true);

  const example = fs.readFileSync(examplePath, 'utf8');
  assert.doesNotMatch(example, /(sk-[A-Za-z0-9]|AKIA[A-Z0-9]{16}|password\s*=.+[^<])/i);
  assert.doesNotMatch(example, /<[^>]+>/);
});
