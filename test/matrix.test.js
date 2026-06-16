import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatJSON, parseMatrix } from '../src/matrix.js';

describe('parseMatrix', () => {
  it('parses a rectangular JSON matrix', () => {
    assert.deepEqual(parseMatrix('[[1,2],[3,4]]'), [
      [1, 2],
      [3, 4],
    ]);
  });

  it('rejects invalid JSON', () => {
    assert.throws(() => parseMatrix('1,2'), /JSON valido/);
  });
});

describe('formatJSON', () => {
  it('formats values with indentation', () => {
    assert.equal(formatJSON([[1]]), '[\n  [\n    1\n  ]\n]');
  });
});
