import type { CSSProperties } from 'react';
import type { Matrix } from '@/domain/matrix';
import styles from '../matrixChallenge.module.css';

type MatrixGridProps = {
  matrix: Matrix;
  onCellChange: (rowIndex: number, columnIndex: number, value: string) => void;
};

export function MatrixGrid({ matrix, onCellChange }: MatrixGridProps) {
  const gridStyle = { '--columns': matrix[0].length } as CSSProperties;

  return (
    <div className={styles.matrixGrid} style={gridStyle} data-testid="matrix-grid">
      {matrix.map((row, rowIndex) => (
        <div className={styles.matrixRow} key={rowIndex}>
          {row.map((value, columnIndex) => (
            <input
              className={styles.matrixCell}
              key={`${rowIndex}-${columnIndex}`}
              type="number"
              step="any"
              value={value}
              aria-label={`Fila ${rowIndex + 1}, columna ${columnIndex + 1}`}
              data-testid={`matrix-cell-${rowIndex}-${columnIndex}`}
              onChange={(event) => onCellChange(rowIndex, columnIndex, event.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
