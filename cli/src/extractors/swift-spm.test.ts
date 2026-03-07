import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { tmpdir } from 'node:os';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { detectSwiftSpm, extractSwiftSpm } from './swift-spm.js';

function makeTmpDir(): string {
  const dir = join(tmpdir(), `swift-spm-test-${Date.now()}`);
  mkdirSync(dir, { recursive: true });
  return dir;
}

describe('detectSwiftSpm', () => {
  it('returns true when Package.swift exists', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'Package.swift'), '');
    assert.equal(detectSwiftSpm(dir), true);
    rmSync(dir, { recursive: true });
  });

  it('returns false when Package.swift is absent', () => {
    const dir = makeTmpDir();
    assert.equal(detectSwiftSpm(dir), false);
    rmSync(dir, { recursive: true });
  });
});

describe('extractSwiftSpm', () => {
  it('returns null when Package.swift is absent', () => {
    const dir = makeTmpDir();
    assert.equal(extractSwiftSpm(dir), null);
    rmSync(dir, { recursive: true });
  });

  it('extracts package name and targets', () => {
    const dir = makeTmpDir();
    const packageSwift = `
// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "MyApp",
    targets: [
        .executableTarget(name: "MyApp", dependencies: []),
        .target(name: "MyLib", dependencies: []),
        .testTarget(name: "MyAppTests", dependencies: ["MyApp"]),
        .plugin(name: "MyPlugin", capability: .buildTool()),
    ]
)
`;
    writeFileSync(join(dir, 'Package.swift'), packageSwift);
    const result = extractSwiftSpm(dir);
    assert.ok(result);
    assert.equal(result.type, 'swift-spm');
    assert.equal(result.packageName, 'MyApp');
    assert.deepEqual(result.targets, [
      { name: 'MyApp', type: 'executable' },
      { name: 'MyLib', type: 'library' },
      { name: 'MyAppTests', type: 'test' },
      { name: 'MyPlugin', type: 'plugin' },
    ]);
    rmSync(dir, { recursive: true });
  });

  it('returns unknown package name when name field is missing', () => {
    const dir = makeTmpDir();
    writeFileSync(join(dir, 'Package.swift'), 'let package = Package(targets: [])');
    const result = extractSwiftSpm(dir);
    assert.ok(result);
    assert.equal(result.packageName, 'unknown');
    assert.deepEqual(result.targets, []);
    rmSync(dir, { recursive: true });
  });
});
