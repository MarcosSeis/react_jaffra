import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 32 }: SpinnerProps) {
  return (
    <div className={styles.wrapper}>
      <span
        className={styles.spinner}
        style={{ width: size, height: size }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
