'use client';

import Image from 'next/image';
import { Card } from '@/presentation/components/atoms/Card';
import { Button } from '@/presentation/components/atoms/Button';
import { Price } from '@/presentation/components/atoms/Price';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  onAddToCart?: (productId: number) => void;
  onViewDetail?: (productId: number) => void;
}

export function ProductCard({ id, title, price, imageUrl, category, rating, onAddToCart, onViewDetail }: ProductCardProps) {
  return (
    <Card>
      <div className={styles.imageWrapper}>
        <span className={styles.categoryBadge}>{category}</span>
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
      <div className={styles.actions}>
        <Button onClick={() => onAddToCart?.(id)}>
          Add to Cart
        </Button>
        <Button variant="secondary" onClick={() => onViewDetail?.(id)}>
          View Details
        </Button>
      </div>
    </Card>
  );
}
