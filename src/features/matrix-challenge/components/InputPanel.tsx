import type { Matrix } from '@/domain/matrix';
import styles from '../matrixChallenge.module.css';
import type { StatusState } from '../matrixChallenge.types';
import { MatrixGrid } from './MatrixGrid';

type InputPanelProps = {
  isBusy: boolean;
  matrix: Matrix;
  onCellChange: (rowIndex: number, columnIndex: number, value: string) => void;
  onColumnCountChange: (value: string) => void;
  onLoadSample: () => void;
  onProcessMatrix: () => void;
  onRowCountChange: (value: string) => void;
  qrWarning: string;
  status: StatusState;
};

export function InputPanel({
  isBusy,
  matrix,
  onCellChange,
  onColumnCountChange,
  onLoadSample,
  onProcessMatrix,
  onRowCountChange,
  qrWarning,
  status,
}: InputPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.inputPanel}`}>
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Matriz de entrada</p>
          <h2 className={styles.sectionTitle}>Datos de la matriz</h2>
        </div>
        <button
          className={styles.iconButton}
          type="button"
          title="Cargar ejemplo"
          data-testid="sample-button"
          onClick={onLoadSample}
          disabled={isBusy}
        >
          R
        </button>
      </div>

      <div className={styles.matrixControls} aria-label="Tamano de matriz">
        <label className={styles.fieldLabel}>
          Filas
          <input
            className={styles.matrixControlInput}
            type="number"
            min="1"
            max="8"
            value={matrix.length}
            data-testid="row-count"
            onChange={(event) => onRowCountChange(event.target.value)}
          />
        </label>
        <label className={styles.fieldLabel}>
          Columnas
          <input
            className={styles.matrixControlInput}
            type="number"
            min="1"
            max="8"
            value={matrix[0].length}
            data-testid="column-count"
            onChange={(event) => onColumnCountChange(event.target.value)}
          />
        </label>
      </div>

      <MatrixGrid matrix={matrix} onCellChange={onCellChange} />

      {qrWarning ? (
        <p className={styles.warningMessage} data-testid="qr-warning">
          {qrWarning}
        </p>
      ) : null}

      <button
        className={styles.primaryAction}
        type="button"
        data-testid="process-button"
        onClick={onProcessMatrix}
        disabled={isBusy || Boolean(qrWarning)}
      >
        Procesar matriz
      </button>

      <p className={styles.status} data-state={status.state} data-testid="status">
        {status.message}
      </p>
    </div>
  );
}
