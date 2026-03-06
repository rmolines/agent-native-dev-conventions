import { test, describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { generateCommand } from './generate.js';

describe('generateCommand', () => {
  test('is named "generate"', () => {
    assert.equal(generateCommand.name(), 'generate');
  });

  test('has --output option', () => {
    const hasOutput = generateCommand.options.some((o) => o.long === '--output');
    assert.ok(hasOutput, 'expected --output option to exist');
  });

  test('has --project-root option', () => {
    const hasProjectRoot = generateCommand.options.some((o) => o.long === '--project-root');
    assert.ok(hasProjectRoot, 'expected --project-root option to exist');
  });

  test('default output is .agent-index.md', () => {
    const outputOpt = generateCommand.options.find((o) => o.long === '--output');
    assert.equal(outputOpt?.defaultValue, '.agent-index.md');
  });

  test('default project-root is .', () => {
    const rootOpt = generateCommand.options.find((o) => o.long === '--project-root');
    assert.equal(rootOpt?.defaultValue, '.');
  });
});
