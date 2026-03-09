import { Card } from '@/presentation/components/atoms/Card';
import { Skeleton } from '@/presentation/components/atoms/Skeleton';
import styles from './ProductCard.module.css';

export function ProductCardSkeleton() {
  return (
    <Card>
      <Skeleton height={200} />
      <div className={styles.body}>
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={36} />
      </div>
    </Card>
  );
}
