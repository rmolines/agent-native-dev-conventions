import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface TypeScriptNextjsInfo {
  type: 'typescript-nextjs';
  framework: string;
  scripts: Record<string, string>;
  keyDeps: string[];
}

const FRAMEWORK_MARKERS: Array<{ dep: string; label: string }> = [
  { dep: 'next', label: 'Next.js' },
  { dep: 'react', label: 'React' },
  { dep: 'vue', label: 'Vue' },
  { dep: 'nuxt', label: 'Nuxt' },
  { dep: '@sveltejs/kit', label: 'SvelteKit' },
  { dep: 'svelte', label: 'Svelte' },
  { dep: 'remix', label: 'Remix' },
  { dep: 'astro', label: 'Astro' },
  { dep: 'express', label: 'Express' },
  { dep: 'fastify', label: 'Fastify' },
];

const RELEVANT_SCRIPTS = ['build', 'dev', 'start', 'test', 'lint', 'typecheck', 'check'];

function readFileSafe(path: string): string {
  if (!existsSync(path)) return '';
  return readFileSync(path, 'utf-8');
}

export function detectTypeScriptNextjs(projectRoot: string): boolean {
  return existsSync(join(projectRoot, 'tsconfig.json'));
}

export function extractTypeScriptNextjs(projectRoot: string): TypeScriptNextjsInfo | null {
  if (!existsSync(join(projectRoot, 'tsconfig.json'))) return null;

  const packageJsonPath = join(projectRoot, 'package.json');
  const raw = readFileSafe(packageJsonPath);
  if (!raw) return { type: 'typescript-nextjs', framework: 'TypeScript', scripts: {}, keyDeps: [] };

  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return { type: 'typescript-nextjs', framework: 'TypeScript', scripts: {}, keyDeps: [] };
  }

  const allDeps = {
    ...((pkg.dependencies as Record<string, string>) ?? {}),
    ...((pkg.devDependencies as Record<string, string>) ?? {}),
  };

  const framework = detectFramework(allDeps);
  const scripts = filterScripts((pkg.scripts as Record<string, string>) ?? {});
  const keyDeps = detectKeyDeps(allDeps);

  return { type: 'typescript-nextjs', framework, scripts, keyDeps };
}

function detectFramework(deps: Record<string, string>): string {
  for (const { dep, label } of FRAMEWORK_MARKERS) {
    if (dep in deps) return label;
  }
  return 'TypeScript';
}

function filterScripts(scripts: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of RELEVANT_SCRIPTS) {
    if (key in scripts) result[key] = scripts[key];
  }
  return result;
}

function detectKeyDeps(deps: Record<string, string>): string[] {
  const interesting = [
    'typescript',
    'prisma',
    '@prisma/client',
    'drizzle-orm',
    'zod',
    'trpc',
    '@trpc/server',
    'tailwindcss',
    'vitest',
    'jest',
    '@testing-library/react',
    'playwright',
  ];
  return interesting.filter((d) => d in deps);
}
