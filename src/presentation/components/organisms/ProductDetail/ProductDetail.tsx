'use client';

import Image from 'next/image';
import { useProduct, useCart } from '@/application/hooks';
import { Card } from '@/presentation/components/atoms/Card';
import { Button } from '@/presentation/components/atoms/Button';
import { Price } from '@/presentation/components/atoms/Price';
import { Spinner } from '@/presentation/components/atoms/Spinner';
import styles from './ProductDetail.module.css';

interface ProductDetailProps {
  id: number;
}

export function ProductDetail({ id }: ProductDetailProps) {
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();

  if (loading) return <Spinner />;
  if (error)   return <p className={styles.error}>{error.message}</p>;
  if (!product) return null;

  return (
    <Card>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <p className={styles.category}>{product.category}</p>
          <h2 className={styles.title}>{product.title}</h2>
          <Price amount={product.price} />
          <p className={styles.description}>{product.description}</p>
          <Button onClick={() => addToCart(product.id, 1)}>Add to Cart</Button>
        </div>
      </div>
    </Card>
  );
}
