import { useState, useEffect, useCallback } from 'react';

import type { CartEntity } from '@domain/entities';
import { createCartService } from '@application/services';

// ── Module-level singleton ────────────────────────────────────────────────────

const cartService = createCartService();

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useCart() {
  const [cart,    setCart]    = useState<CartEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<Error | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const addToCart = useCallback(async (productId: number, quantity: number) => {
    setError(null);
    try {
      await cartService.addToCart(productId, quantity);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [reload]);

  const removeFromCart = useCallback(async (productId: number) => {
    setError(null);
    try {
      await cartService.removeFromCart(productId);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [reload]);

  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    setError(null);
    try {
      await cartService.updateQuantity(productId, quantity);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [reload]);

  const clearCart = useCallback(async () => {
    setError(null);
    try {
      await cartService.clearCart();
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [reload]);

  return { cart, loading, error, addToCart, removeFromCart, updateQuantity, clearCart, reload };
}
