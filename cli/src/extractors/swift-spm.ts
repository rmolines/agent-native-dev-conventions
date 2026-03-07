import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface SwiftTarget {
  name: string;
  type: 'executable' | 'library' | 'test' | 'plugin' | 'unknown';
}

export interface SwiftSpmInfo {
  type: 'swift-spm';
  packageName: string;
  targets: SwiftTarget[];
}

function readFileSafe(path: string): string {
  if (!existsSync(path)) return '';
  return readFileSync(path, 'utf-8');
}

export function detectSwiftSpm(projectRoot: string): boolean {
  return existsSync(join(projectRoot, 'Package.swift'));
}

export function extractSwiftSpm(projectRoot: string): SwiftSpmInfo | null {
  const packageSwiftPath = join(projectRoot, 'Package.swift');
  if (!existsSync(packageSwiftPath)) return null;

  const content = readFileSafe(packageSwiftPath);
  const packageName = parsePackageName(content);
  const targets = parseTargets(content);

  return { type: 'swift-spm', packageName, targets };
}

function parsePackageName(content: string): string {
  const match = content.match(/name\s*:\s*"([^"]+)"/);
  return match ? match[1] : 'unknown';
}

function parseTargets(content: string): SwiftTarget[] {
  const targets: SwiftTarget[] = [];

  // Match .target(...), .executableTarget(...), .testTarget(...), .plugin(...)
  const targetPattern =
    /\.(executableTarget|testTarget|plugin|target)\s*\(\s*name\s*:\s*"([^"]+)"/g;

  let m: RegExpExecArray | null;
  while ((m = targetPattern.exec(content)) !== null) {
    const kind = m[1];
    const name = m[2];
    let type: SwiftTarget['type'] = 'unknown';
    if (kind === 'executableTarget') type = 'executable';
    else if (kind === 'testTarget') type = 'test';
    else if (kind === 'plugin') type = 'plugin';
    else if (kind === 'target') type = 'library';
    targets.push({ name, type });
  }

  return targets;
}
