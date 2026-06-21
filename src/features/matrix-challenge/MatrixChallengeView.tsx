'use client';

import { BrandHeader } from './components/BrandHeader';
import { InputPanel } from './components/InputPanel';
import { NoticeBar } from './components/NoticeBar';
import { ResultsPanel } from './components/ResultsPanel';
import styles from './matrixChallenge.module.css';
import { useMatrixChallenge } from './useMatrixChallenge';

export function MatrixChallengeView() {
  const {
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
  } = useMatrixChallenge();

  return (
    <>
      <BrandHeader />
      <NoticeBar />

      <main className={styles.shell}>
        <div className={styles.pageTitle}>
          <p className={styles.pageTitleText}>Completa tu matriz para calcular la factorización QR</p>
        </div>

        <section className={styles.workspace}>
          <InputPanel
            isBusy={isBusy}
            matrix={matrix}
            onCellChange={updateCell}
            onColumnCountChange={resizeColumns}
            onLoadSample={loadSample}
            onProcessMatrix={processMatrix}
            onRowCountChange={resizeRows}
            qrWarning={qrWarning}
            status={status}
          />

          <ResultsPanel result={result} />
        </section>
      </main>

      <footer className={styles.footer}>
        Copyright 2026 Interseguro. Todos los derechos reservados
      </footer>
    </>
  );
}
