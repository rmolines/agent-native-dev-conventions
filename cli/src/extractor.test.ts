import { test, describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { extractStack, extractHotFiles, extractInvariants, buildAgentIndex, formatAgentIndex } from './extractor.js';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

// --- extractStack ---

describe('extractStack', () => {
  test('returns items under ## Stack section', () => {
    const md = `# Project\n\n## Stack\n\n- TypeScript/Node.js\n- PostgreSQL\n\n## Other\n\n- ignored\n`;
    assert.deepEqual(extractStack(md), ['TypeScript/Node.js', 'PostgreSQL']);
  });

  test('returns empty array when no Stack section', () => {
    assert.deepEqual(extractStack('# Project\n\n## Setup\n\n- stuff\n'), []);
  });

  test('stops at next heading', () => {
    const md = `## Stack\n\n- Item A\n\n## Next\n\n- Item B\n`;
    assert.deepEqual(extractStack(md), ['Item A']);
  });

  test('returns empty array for empty string', () => {
    assert.deepEqual(extractStack(''), []);
  });
});

// --- extractHotFiles ---

describe('extractHotFiles', () => {
  test('extracts backtick file paths', () => {
    const sources = [{ content: 'Edit `src/index.ts` to add the feature', label: 'CLAUDE.md' }];
    const result = extractHotFiles(sources);
    assert.equal(result.length, 1);
    assert.equal(result[0].path, 'src/index.ts');
  });

  test('deduplicates across sources', () => {
    const sources = [
      { content: 'See `src/index.ts` for entry', label: 'a.md' },
      { content: 'Edit `src/index.ts` carefully', label: 'b.md' },
    ];
    const result = extractHotFiles(sources);
    assert.equal(result.length, 1);
  });

  test('caps at 15 items', () => {
    const paths = Array.from({ length: 20 }, (_, i) => `\`src/file${i}.ts\``).join(' ');
    const sources = [{ content: paths, label: 'CLAUDE.md' }];
    const result = extractHotFiles(sources);
    assert.ok(result.length <= 15);
  });

  test('returns empty array for no matches', () => {
    const sources = [{ content: 'no file paths here', label: 'CLAUDE.md' }];
    assert.deepEqual(extractHotFiles(sources), []);
  });
});

// --- extractInvariants ---

describe('extractInvariants', () => {
  test('extracts lines with imperative keywords from rules/', () => {
    const dir = mkdtempSync(join(tmpdir(), 'agent-index-test-'));
    writeFileSync(join(dir, 'style.md'), '# Style\n\n- Never use tabs in source files\n- Always add newlines at end of file\n');
    const result = extractInvariants(dir);
    assert.ok(result.some((r) => r.text.includes('Never use tabs in source files')));
    assert.ok(result.some((r) => r.text.includes('Always add newlines at end of file')));
    assert.ok(result.every((r) => r.source === 'style'));
  });

  test('returns empty array when rules dir does not exist', () => {
    assert.deepEqual(extractInvariants('/tmp/nonexistent-rules-dir-xyz'), []);
  });

  test('skips short lines', () => {
    const dir = mkdtempSync(join(tmpdir(), 'agent-index-test-'));
    writeFileSync(join(dir, 'a.md'), 'Never ok\nNever do this because it breaks everything\n');
    const result = extractInvariants(dir);
    // "Never ok" is < 15 chars, should be skipped
    assert.ok(!result.some((r) => r.text === 'Never ok'));
    assert.ok(result.some((r) => r.text.includes('Never do this')));
  });

  test('caps at 20 items', () => {
    const dir = mkdtempSync(join(tmpdir(), 'agent-index-test-'));
    const lines = Array.from({ length: 25 }, (_, i) => `- Never do action number ${i} in production`).join('\n');
    writeFileSync(join(dir, 'rules.md'), lines);
    const result = extractInvariants(dir);
    assert.ok(result.length <= 20);
  });
});

// --- buildAgentIndex ---

describe('buildAgentIndex', () => {
  test('returns empty index for empty project dir', () => {
    const dir = mkdtempSync(join(tmpdir(), 'agent-index-test-'));
    const index = buildAgentIndex(dir);
    assert.deepEqual(index.stack, []);
    assert.deepEqual(index.hotFiles, []);
    assert.deepEqual(index.invariants, []);
  });

  test('reads CLAUDE.md and rules/ from project root', () => {
    const dir = mkdtempSync(join(tmpdir(), 'agent-index-test-'));
    writeFileSync(join(dir, 'CLAUDE.md'), '## Stack\n\n- Node.js\n\nSee `src/main.ts`\n');
    const rulesDir = join(dir, '.claude', 'rules');
    mkdirSync(rulesDir, { recursive: true });
    writeFileSync(join(rulesDir, 'style.md'), '- Never commit secrets directly to the repo\n');

    const index = buildAgentIndex(dir);
    assert.deepEqual(index.stack, ['Node.js']);
    assert.ok(index.hotFiles.some((f) => f.path === 'src/main.ts'));
    assert.ok(index.invariants.some((i) => i.text.includes('Never commit secrets')));
  });
});

// --- formatAgentIndex ---

describe('formatAgentIndex', () => {
  test('includes all sections when populated', () => {
    const index = {
      stack: ['Node.js'],
      hotFiles: [{ path: 'src/index.ts', context: 'entry point' }],
      invariants: [{ text: 'Never commit secrets', source: 'security' }],
    };
    const output = formatAgentIndex(index);
    assert.ok(output.includes('## Stack'));
    assert.ok(output.includes('## Hot Files'));
    assert.ok(output.includes('## Invariants'));
    assert.ok(output.includes('`src/index.ts`'));
    assert.ok(output.includes('Never commit secrets'));
  });

  test('omits empty sections', () => {
    const index = { stack: [], hotFiles: [], invariants: [] };
    const output = formatAgentIndex(index);
    assert.ok(!output.includes('## Stack'));
    assert.ok(!output.includes('## Hot Files'));
    assert.ok(!output.includes('## Invariants'));
  });

  test('starts with # Agent Index heading', () => {
    const output = formatAgentIndex({ stack: [], hotFiles: [], invariants: [] });
    assert.ok(output.startsWith('# Agent Index'));
  });
});
