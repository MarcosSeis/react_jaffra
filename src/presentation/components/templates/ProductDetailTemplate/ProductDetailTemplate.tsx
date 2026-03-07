import Link from 'next/link';
import { ProductDetail } from '@/presentation/components/organisms/ProductDetail';
import styles from './ProductDetailTemplate.module.css';

interface ProductDetailTemplateProps {
  id: number;
}

export function ProductDetailTemplate({ id }: ProductDetailTemplateProps) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>← Back to Products</Link>
        <ProductDetail id={id} />
      </div>
    </main>
  );
}
