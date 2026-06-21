import { useState } from 'react';
import { analyzeMatrixUseCase } from '@/application/analyzeMatrixUseCase';
import { ensureAuthTokenUseCase } from '@/application/ensureAuthTokenUseCase';
import { getZeroColumnIndex, hasIndependentColumns, Matrix, validateMatrix } from '@/domain/matrix';
import { sampleMatrix } from '@/infrastructure/http/matrixApiClient';
import { emptyResult, initialStatus } from './matrixChallenge.constants';
import { clamp, cloneMatrix } from './matrixChallenge.helpers';
import type { MatrixResult, StatusState } from './matrixChallenge.types';

export function useMatrixChallenge() {
  const [matrix, setMatrix] = useState<Matrix>(cloneMatrix(sampleMatrix));
  const [result, setResult] = useState<MatrixResult>(emptyResult);
  const [status, setStatus] = useState<StatusState>(initialStatus);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const qrWarning =
    matrix[0].length > matrix.length
      ? 'Para calcular QR con este algoritmo, la cantidad de filas debe ser mayor o igual a la cantidad de columnas.'
      : getColumnWarning(matrix);

  async function processMatrix() {
    if (qrWarning) {
      setStatus({ message: qrWarning, state: 'error' });
      return;
    }

    try {
      setIsBusy(true);
      const validated = cloneMatrix(matrix);
      validateMatrix(validated);
      await ensureAuthTokenUseCase();
      setResult(await analyzeMatrixUseCase(validated));
      setStatus({ message: 'Matriz procesada.', state: 'ok' });
    } catch (error) {
      setStatus({ message: error instanceof Error ? error.message : 'Error inesperado.', state: 'error' });
    } finally {
      setIsBusy(false);
    }
  }

  function loadSample() {
    setMatrix(cloneMatrix(sampleMatrix));
    setStatus({ message: 'Ejemplo cargado.', state: 'ok' });
  }

  function resizeRows(value: string) {
    const rows = clamp(Number(value), 1, 8);
    setMatrix((current) =>
      Array.from({ length: rows }, (item, rowIndex) =>
        Array.from({ length: current[0].length }, (item, columnIndex) => current[rowIndex]?.[columnIndex] ?? 0),
      ),
    );
  }

  function resizeColumns(value: string) {
    const columns = clamp(Number(value), 1, 8);
    setMatrix((current) =>
      current.map((row) => Array.from({ length: columns }, (item, columnIndex) => row[columnIndex] ?? 0)),
    );
  }

  function updateCell(rowIndex: number, columnIndex: number, value: string) {
    setMatrix((current) =>
      current.map((row, currentRowIndex) =>
        row.map((cell, currentColumnIndex) =>
          currentRowIndex === rowIndex && currentColumnIndex === columnIndex ? Number(value) : cell,
        ),
      ),
    );
  }

  return {
    isBusy,
    loadSample,
    matrix,
    processMatrix,
    qrWarning,
    resizeColumns,
    resizeRows,
    result,
    status,
    updateCell,
  };
}

function getColumnWarning(matrix: Matrix): string {
  try {
    validateMatrix(matrix);
  } catch {
    return '';
  }

  const zeroColumnIndex = getZeroColumnIndex(matrix);
  if (zeroColumnIndex >= 0) {
    return `No se puede calcular QR porque la columna ${zeroColumnIndex + 1} esta vacia. Ingresa al menos un valor distinto de cero en esa columna.`;
  }

  return hasIndependentColumns(matrix)
    ? ''
    : 'No se puede calcular QR con estos valores. Cambia algunos numeros para que cada columna tenga datos distintos y aporte informacion nueva.';
}
