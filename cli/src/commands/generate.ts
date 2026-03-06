import { Command } from 'commander';

export const generateCommand = new Command('generate')
  .description('Generate .agent-index.md from project conventions')
  .option('-o, --output <path>', 'output file path', '.agent-index.md')
  .option('-p, --project-root <path>', 'project root directory', '.')
  .action((options: { output: string; projectRoot: string }) => {
    console.log(`agent-index generate`);
    console.log(`  output:       ${options.output}`);
    console.log(`  project-root: ${options.projectRoot}`);
    console.log('');
    console.log('(stub — extractor not yet implemented)');
  });
