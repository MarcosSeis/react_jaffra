import { useState, useEffect, useCallback } from 'react';

import type { ProductEntity } from '@domain/entities';
import { createProductService } from '@application/services';

// ── Module-level singleton ────────────────────────────────────────────────────

const productService = createProductService();

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useProducts() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products, loading, error, reload: fetch };
}
