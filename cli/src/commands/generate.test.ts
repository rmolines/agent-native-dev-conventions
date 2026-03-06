import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { generateCommand } from './generate.js';

test('generateCommand is named "generate"', () => {
  assert.equal(generateCommand.name(), 'generate');
});

test('generateCommand has --output option', () => {
  const hasOutput = generateCommand.options.some((o) => o.long === '--output');
  assert.ok(hasOutput, 'expected --output option to exist');
});

test('generateCommand has --project-root option', () => {
  const hasProjectRoot = generateCommand.options.some((o) => o.long === '--project-root');
  assert.ok(hasProjectRoot, 'expected --project-root option to exist');
});

test('generateCommand default output is .agent-index.md', () => {
  const outputOpt = generateCommand.options.find((o) => o.long === '--output');
  assert.equal(outputOpt?.defaultValue, '.agent-index.md');
});
