import { useState, useEffect, useCallback } from 'react';

import type { CartEntity } from '@domain/entities';
import { createCartService } from '@application/services';

// ── Module-level singleton ────────────────────────────────────────────────────

const cartService = createCartService();

// ── Shared subscriber registry ────────────────────────────────────────────────
// All mounted useCart instances register their reload fn here.
// After any mutation, every instance reloads so state stays in sync
// across components (e.g. Header counter + CartList + ProductGrid).

const subscribers = new Set<() => void>();

function notifyAll() {
  subscribers.forEach((fn) => fn());
}

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

  // Register / unregister this instance in the shared subscriber set
  useEffect(() => {
    subscribers.add(reload);
    reload();
    return () => { subscribers.delete(reload); };
  }, [reload]);

  const addToCart = useCallback(async (productId: number, quantity: number) => {
    setError(null);
    try {
      await cartService.addToCart(productId, quantity);
      notifyAll();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  const removeFromCart = useCallback(async (productId: number) => {
    setError(null);
    try {
      await cartService.removeFromCart(productId);
      notifyAll();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    setError(null);
    try {
      await cartService.updateQuantity(productId, quantity);
      notifyAll();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  const clearCart = useCallback(async () => {
    setError(null);
    try {
      await cartService.clearCart();
      notifyAll();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  return { cart, loading, error, addToCart, removeFromCart, updateQuantity, clearCart, reload };
}
