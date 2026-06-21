import { describe, expect, it } from '@jest/globals';
import { getZeroColumnIndex, hasIndependentColumns } from '@/domain/matrix';
import { formatJSON } from '@/shared/format/json';

describe('hasIndependentColumns', () => {
  it('rechaza columnas linealmente dependientes', () => {
    expect(
      hasIndependentColumns([
        [12, -51, 4],
        [6, 167, -68],
        [0, 0, 0],
      ]),
    ).toBe(false);
  });

  it('acepta columnas linealmente independientes', () => {
    expect(
      hasIndependentColumns([
        [12, -51, 4],
        [6, 167, -68],
        [-4, 24, -41],
      ]),
    ).toBe(true);
  });
});

describe('getZeroColumnIndex', () => {
  it('detecta la primera columna vacia', () => {
    expect(
      getZeroColumnIndex([
        [12, -51, 0],
        [6, 167, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]),
    ).toBe(2);
  });

  it('devuelve menos uno cuando no hay columnas vacias', () => {
    expect(
      getZeroColumnIndex([
        [12, -51, 4],
        [6, 167, -68],
        [-4, 24, -41],
      ]),
    ).toBe(-1);
  });
});

describe('formatJSON', () => {
  it('formatea valores con indentacion', () => {
    expect(formatJSON([[1]])).toBe('[\n  [\n    1\n  ]\n]');
  });
});
