import { formatJSON } from '@/shared/format/json';
import styles from '../matrixChallenge.module.css';

type ResultPanelProps = {
  title: string;
  testId: string;
  value: unknown;
};

export function ResultPanel({ title, testId, value }: ResultPanelProps) {
  return (
    <article className={styles.resultCard}>
      <h3 className={styles.resultTitle}>{title}</h3>
      <pre className={styles.resultOutput} data-testid={testId}>{formatJSON(value)}</pre>
    </article>
  );
}
