import type { Matrix } from './matrix.types';

export function validateMatrix(matrix: unknown): asserts matrix is Matrix {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error('La matriz debe contener al menos una fila');
  }
  if (!Array.isArray(matrix[0]) || matrix[0].length === 0) {
    throw new Error('La matriz debe contener al menos una columna');
  }

  const columns = matrix[0].length;

  for (const row of matrix) {
    if (!Array.isArray(row) || row.length !== columns) {
      throw new Error('La matriz debe ser rectangular: todas las filas deben tener la misma cantidad de columnas');
    }
    for (const value of row) {
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error('Todos los valores deben ser numeros y finitos');
      }
    }
  }
}

export function hasIndependentColumns(matrix: Matrix): boolean {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const orthogonalColumns: number[][] = [];

  for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
    let vector = getColumn(matrix, columnIndex);

    for (const orthogonalColumn of orthogonalColumns) {
      const projection = dot(vector, orthogonalColumn);
      vector = vector.map((value, rowIndex) => value - projection * orthogonalColumn[rowIndex]);
    }

    const norm = Math.sqrt(dot(vector, vector));
    if (norm < 1e-10) {
      return false;
    }

    orthogonalColumns.push(vector.map((value) => value / norm));
  }

  return columns <= rows;
}

export function getZeroColumnIndex(matrix: Matrix): number {
  const columns = matrix[0].length;

  for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
    const isZeroColumn = getColumn(matrix, columnIndex).every((value) => Math.abs(value) < 1e-10);

    if (isZeroColumn) {
      return columnIndex;
    }
  }

  return -1;
}

function getColumn(matrix: Matrix, columnIndex: number): number[] {
  return matrix.map((row) => row[columnIndex]);
}

function dot(a: number[], b: number[]): number {
  return a.reduce((total, value, index) => total + value * b[index], 0);
}
