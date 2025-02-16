import { expect, test } from 'vitest';
import { u } from 'unist-builder';
import { unistToString } from '../src/index.js';

test('Literal node with value serializes with value', () => {
  const tree = u('n', 'a');
  const result = unistToString(tree, { n: (v) => `[n]${v}[/n]` });
  expect(result).toBe('[n]a[/n]');
});

test('Literal node without value serializes with no value', () => {
  const tree = u('n');
  const result = unistToString(tree, { n: (v) => `[n]${v}[/n]` });
  expect(result).toBe('[n][/n]');
});

test('Parent node with no child serializes with no value', () => {
  const tree = u('n', []);
  const result = unistToString(tree, { n: (v) => `[n]${v}[/n]` });
  expect(result).toBe('[n][/n]');
});

test('Parent node with one literal child serializes with child value', () => {
  const tree = u('n', [u('m', 'a')]);
  const result = unistToString(tree, {
    n: (v) => `[n]${v}[/n]`,
    m: (v) => `[m]${v}[/m]`,
  });
  expect(result).toBe('[n][m]a[/m][/n]');
});
