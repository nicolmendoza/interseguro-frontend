import styles from '../matrixChallenge.module.css';

export function NoticeBar() {
  return (
    <div className={styles.noticeBar}>
      <span className={styles.noticeIcon} aria-hidden="true">R</span>
      Procesa tu matriz en segundos
    </div>
  );
}
