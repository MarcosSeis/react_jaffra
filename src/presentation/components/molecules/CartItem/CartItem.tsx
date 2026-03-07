import Image from 'next/image';
import { Card } from '@/presentation/components/atoms/Card';
import { Button } from '@/presentation/components/atoms/Button';
import { Price } from '@/presentation/components/atoms/Price';
import styles from './CartItem.module.css';

interface CartItemProps {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onIncrease?: (productId: number) => void;
  onDecrease?: (productId: number) => void;
  onRemove?: (productId: number) => void;
}

export function CartItem({
  productId,
  title,
  price,
  quantity,
  imageUrl,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <Card>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="80px"
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <h4 className={styles.title}>{title}</h4>
          <Price amount={price} />
          <div className={styles.controls}>
            <Button onClick={() => onDecrease?.(productId)}>−</Button>
            <span className={styles.quantity}>{quantity}</span>
            <Button onClick={() => onIncrease?.(productId)}>+</Button>
          </div>
        </div>
        <Button onClick={() => onRemove?.(productId)}>Remove</Button>
      </div>
    </Card>
  );
}
