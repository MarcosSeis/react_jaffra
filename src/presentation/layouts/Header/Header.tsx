import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Store</h1>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Products</Link>
          <Link href="/cart" className={styles.link}>Cart</Link>
        </nav>
      </div>
    </header>
  );
}
