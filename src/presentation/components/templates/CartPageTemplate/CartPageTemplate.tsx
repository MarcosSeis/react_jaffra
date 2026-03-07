import { CartList } from '@/presentation/components/organisms/CartList';
import styles from './CartPageTemplate.module.css';

export function CartPageTemplate() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Your Cart</h1>
        <CartList />
      </div>
    </main>
  );
}
