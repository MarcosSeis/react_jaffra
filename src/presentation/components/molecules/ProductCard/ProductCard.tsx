'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/presentation/components/atoms/Card';
import { Button } from '@/presentation/components/atoms/Button';
import { Price } from '@/presentation/components/atoms/Price';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  onAddToCart?: (productId: number) => void;
}

export function ProductCard({ id, title, price, imageUrl, rating, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    onAddToCart?.(id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <Card>
      <Link href={`/product/${id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={styles.image}
          />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <Price amount={price} />
          <p className={styles.rating}>★ {rating.toFixed(1)}</p>
        </div>
      </Link>
      <div className={styles.actions}>
        <Button onClick={handleAddToCart} disabled={added}>
          {added ? 'Added ✓' : 'Add to Cart'}
        </Button>
        <Link href={`/product/${id}`}>
          <Button variant="secondary">View Details</Button>
        </Link>
      </div>
    </Card>
  );
}
