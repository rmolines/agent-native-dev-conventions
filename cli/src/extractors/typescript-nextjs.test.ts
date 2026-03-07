import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { tmpdir } from 'node:os';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { detectTypeScriptNextjs, extractTypeScriptNextjs } from './typescript-nextjs.js';

function makeTmpDir(): string {
  const dir = join(tmpdir(), `ts-nextjs-test-${Date.now()}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

describe('detectTypeScriptNextjs', () => {
  it('returns true when tsconfig.json exists', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'tsconfig.json'), '{}');
    assert.equal(detectTypeScriptNextjs(dir), true);
    rmSync(dir, { recursive: true });
  });

  it('returns false when tsconfig.json is absent', () => {
    const dir = makeTmpDir();
    assert.equal(detectTypeScriptNextjs(dir), false);
    rmSync(dir, { recursive: true });
  });
});

describe('extractTypeScriptNextjs', () => {
  it('returns null when tsconfig.json is absent', () => {
    const dir = makeTmpDir();
    assert.equal(extractTypeScriptNextjs(dir), null);
    rmSync(dir, { recursive: true });
  });

  it('detects Next.js framework and relevant scripts', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'tsconfig.json'), '{}');
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({
        scripts: { build: 'next build', dev: 'next dev', test: 'vitest', lint: 'eslint .' },
        dependencies: { next: '14.0.0', react: '18.0.0', zod: '3.0.0' },
        devDependencies: { typescript: '5.0.0', vitest: '1.0.0' },
      }),
    );
    const result = extractTypeScriptNextjs(dir);
    assert.ok(result);
    assert.equal(result.type, 'typescript-nextjs');
    assert.equal(result.framework, 'Next.js');
    assert.deepEqual(result.scripts, {
      build: 'next build',
      dev: 'next dev',
      test: 'vitest',
      lint: 'eslint .',
    });
    assert.ok(result.keyDeps.includes('typescript'));
    assert.ok(result.keyDeps.includes('zod'));
    assert.ok(result.keyDeps.includes('vitest'));
    rmSync(dir, { recursive: true });
  });

  it('falls back to TypeScript framework when no marker found', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'tsconfig.json'), '{}');
    writeFileSync(
      join(dir, 'package.json'),
      JSON.stringify({
        scripts: { build: 'tsc', test: 'node --test' },
        dependencies: { typescript: '5.0.0' },
      }),
    );
    const result = extractTypeScriptNextjs(dir);
    assert.ok(result);
    assert.equal(result.framework, 'TypeScript');
    rmSync(dir, { recursive: true });
  });

  it('handles missing package.json gracefully', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'tsconfig.json'), '{}');
    const result = extractTypeScriptNextjs(dir);
    assert.ok(result);
    assert.equal(result.framework, 'TypeScript');
    assert.deepEqual(result.scripts, {});
    assert.deepEqual(result.keyDeps, []);
    rmSync(dir, { recursive: true });
  });

  it('handles malformed package.json gracefully', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'tsconfig.json'), '{}');
    writeFileSync(join(dir, 'package.json'), 'not-json');
    const result = extractTypeScriptNextjs(dir);
    assert.ok(result);
    assert.equal(result.framework, 'TypeScript');
    rmSync(dir, { recursive: true });
  });
});
