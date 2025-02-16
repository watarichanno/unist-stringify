import { expect, test } from 'vitest';
import { u } from 'unist-builder';
import { unistToString } from '../src/index.js';

test('Literal node with value serializes with value', () => {
  const tree = u('l', 'a');
  const options = { l: (v) => `[l]${v}[/l]` };
  const result = unistToString(tree, options);
  expect(result).toBe('[l]a[/l]');
});

test('Literal node without value serializes with no value', () => {
  const tree = u('l');
  const options = { l: (v) => `[l]${v}[/l]` };
  const result = unistToString(tree, options);
  expect(result).toBe('[l][/l]');
});

test('Parent node with no child serializes with no value', () => {
  const tree = u('p', []);
  const options = { p: (v) => `[p]${v}[/p]` };
  const result = unistToString(tree, options);
  expect(result).toBe('[p][/p]');
});

test('Parent node with 2 literal childs serializes with 2 child values', () => {
  const tree = u('p', [u('l1', 'a'), u('l2', 'b')]);
  const options = {
    p: (v) => `[p]${v}[/p]`,
    l1: (v) => `[l1]${v}[/l1]`,
    l2: (v) => `[l2]${v}[/l2]`,
  };
  const result = unistToString(tree, options);
  expect(result).toBe('[p][l1]a[/l1][l2]b[/l2][/p]');
});

test('Parent node with 1 parent child serializes with parent child value', () => {
  const tree = u('p1', [u('p2', [u('l', 'a')])]);
  const options = {
    p1: (v) => `[p1]${v}[/p1]`,
    p2: (v) => `[p2]${v}[/p2]`,
  };
  const result = unistToString(tree, options);
  expect(result).toBe('[p1][p2][l]a[/l][/p2][/p1]');
});
