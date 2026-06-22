import type { MatrixResult } from '../matrixChallenge.types';
import styles from '../matrixChallenge.module.css';
import { ResultPanel } from './ResultPanel';

type ResultsPanelProps = {
  result: MatrixResult;
};

export function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <div className={`${styles.panel} ${styles.resultPanel}`} id="resultados">
      <div className={`${styles.panelHeader} ${styles.panelHeaderCompact} ${styles.panelResultHeader}`}>
        <div>
          <p className={styles.eyebrow}>Resultados</p>
        </div>
      </div>

      <div className={styles.resultGrid}>
        <ResultPanel title="Q - Go API" testId="q-output" value={result.q} />
        <ResultPanel title="R - Go API" testId="r-output" value={result.r} />
        <ResultPanel title="Estadisticas - Node API" testId="stats-output" value={result.stats} />
        <ResultPanel title="Rotación - Go API" testId="rotated-output" value={result.rotated} />
      </div>
    </div>
  );
}
