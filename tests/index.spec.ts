import { expect, test } from 'vitest';
import { u } from 'unist-builder';
import { unistToString } from '../src/index.js';

test('sample', () => {
  const tree = u('root');
  const result = unistToString(tree, { o: 'option' });
  expect(result).toBe('root option');
});
