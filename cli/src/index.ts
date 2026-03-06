#!/usr/bin/env node
import { Command } from 'commander';
import { generateCommand } from './commands/generate.js';

const program = new Command();

program
  .name('agent-index')
  .description(
    'Generate agent-navigable context index for projects following agent-native conventions'
  )
  .version('0.1.0');

program.addCommand(generateCommand);

program.parse();
