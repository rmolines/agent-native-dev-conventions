import { Command } from 'commander';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildAgentIndex, formatAgentIndex } from '../extractor.js';

export const generateCommand = new Command('generate')
  .description('Generate .agent-index.md from project conventions')
  .option('-o, --output <path>', 'output file path', '.agent-index.md')
  .option('-p, --project-root <path>', 'project root directory', '.')
  .action((options: { output: string; projectRoot: string }) => {
    const projectRoot = resolve(options.projectRoot);
    const outputPath = resolve(options.output);

    const index = buildAgentIndex(projectRoot);
    const content = formatAgentIndex(index);

    writeFileSync(outputPath, content, 'utf-8');

    console.log(`Generated ${outputPath}`);
    console.log(`  stack:      ${index.stack.length} item(s)`);
    console.log(`  hot files:  ${index.hotFiles.length} item(s)`);
    console.log(`  invariants: ${index.invariants.length} item(s)`);
  });
