import { ProductGrid } from '@/presentation/components/organisms/ProductGrid';
import styles from './ProductsPageTemplate.module.css';

export function ProductsPageTemplate() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Products</h1>
        <ProductGrid />
      </div>
    </main>
  );
}
