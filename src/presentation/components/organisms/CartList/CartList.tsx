'use client';

import { useState } from 'react';
import { useCart } from '@/application/hooks';
import { CartItem } from '@/presentation/components/molecules/CartItem';
import { Modal } from '@/presentation/components/molecules/Modal';
import { Button } from '@/presentation/components/atoms/Button';
import { Price } from '@/presentation/components/atoms/Price';
import { Spinner } from '@/presentation/components/atoms/Spinner';
import styles from './CartList.module.css';

export function CartList() {
  const { cart, loading, error, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);

  if (loading) return <Spinner />;
  if (error)   return <p className={styles.error}>{error.message}</p>;
  if (!cart || cart.items.length === 0) return <p className={styles.empty}>{purchased ? 'Purchase completed' : 'Cart is empty'}</p>;

  async function handleConfirm() {
    await clearCart();
    setCheckoutOpen(false);
    setPurchased(true);
  }

  return (
    <>
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
        <div className={styles.footer}>
          <Button onClick={() => setCheckoutOpen(true)}>Checkout</Button>
        </div>
      </div>

      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setCheckoutOpen(false)}
        title="Order Summary"
      >
        <div className={styles.summary}>
          <p className={styles.summaryRow}>
            <span>Total items:</span>
            <span>{cart.itemCount}</span>
          </p>
          <p className={styles.summaryRow}>
            <span>Total price:</span>
            <Price amount={cart.total} />
          </p>
        </div>
        <div className={styles.modalActions}>
          <Button onClick={handleConfirm}>Confirm Purchase</Button>
          <Button onClick={() => setCheckoutOpen(false)}>Cancel</Button>
        </div>
      </Modal>
    </>
  );
}
