'use client';

import { useProducts, useCart } from '@/application/hooks';
import { ProductCard } from '@/presentation/components/molecules/ProductCard';
import { Spinner } from '@/presentation/components/atoms/Spinner';
import styles from './ProductGrid.module.css';

export function ProductGrid() {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <Spinner />;
  if (error)   return <p className={styles.error}>{error.message}</p>;

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
          rating={product.rating}
          onAddToCart={(productId) => addToCart(productId, 1)}
        />
      ))}
    </div>
  );
}
