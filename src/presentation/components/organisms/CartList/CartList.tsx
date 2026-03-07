'use client';

import { useCart } from '@/application/hooks';
import { CartItem } from '@/presentation/components/molecules/CartItem';
import { Spinner } from '@/presentation/components/atoms/Spinner';
import styles from './CartList.module.css';

export function CartList() {
  const { cart, loading, error, updateQuantity, removeFromCart } = useCart();

  if (loading) return <Spinner />;
  if (error)   return <p className={styles.error}>{error.message}</p>;
  if (!cart || cart.items.length === 0) return <p className={styles.empty}>Cart is empty</p>;

  return (
    <div className={styles.list}>
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          productId={item.product.id}
          title={item.product.title}
          price={item.product.price}
          quantity={item.quantity}
          imageUrl={item.product.imageUrl}
          onIncrease={(productId) => updateQuantity(productId, item.quantity + 1)}
          onDecrease={(productId) => updateQuantity(productId, item.quantity - 1)}
          onRemove={(productId) => removeFromCart(productId)}
        />
      ))}
    </div>
  );
}
