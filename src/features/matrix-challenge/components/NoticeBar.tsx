import styles from '../matrixChallenge.module.css';

export function NoticeBar() {
  return (
    <div className={styles.noticeBar}>
      <span className={styles.noticeIcon} aria-hidden="true">QR</span>
      Procesa tu matriz en segundos
    </div>
  );
}
