'use client';

import Link from 'next/link';
import { useCart } from '@/application/hooks';
import styles from './Header.module.css';

export function Header() {
  const { cart } = useCart();
  const count = cart?.itemCount ?? 0;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Store</h1>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Products</Link>
          <Link href="/cart" className={styles.link}>
            Cart {count > 0 && `(${count})`}
          </Link>
        </nav>
      </div>
    </header>
  );
}
