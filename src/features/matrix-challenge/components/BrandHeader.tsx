import Image from 'next/image';
import styles from '../matrixChallenge.module.css';

export function BrandHeader() {
  return (
    <header className={styles.brandHeader}>
      <div className={styles.brandInner}>
        <div className={styles.brandMark} aria-hidden="true" />
        <div className={styles.brandCopy}>
          <Image src="/interseguro-logo.svg" width={200} height={40} alt="Interseguro Logo" className={styles.brandLogo} />
          {/* <strong className={styles.brandName}>Interseguro</strong> */}
          <span className={styles.brandSubtitle}>Reto técnico</span>
        </div>
      </div>
    </header>
  );
}
