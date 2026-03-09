import { useState, useEffect, useCallback } from 'react';

import type { ProductEntity } from '@domain/entities';
import { createProductService } from '@application/services';

// ── Module-level singleton ────────────────────────────────────────────────────

const productService = createProductService();

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useProduct(id: number) {
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { product, loading, error };
}
