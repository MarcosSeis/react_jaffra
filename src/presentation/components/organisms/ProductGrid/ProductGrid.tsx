'use client';

import { useState } from 'react';
import { useProducts, useCart } from '@/application/hooks';
import { ProductCard, ProductCardSkeleton } from '@/presentation/components/molecules/ProductCard';
import { ProductFilters } from '@/presentation/components/molecules/ProductFilters';
import { ErrorState } from '@/presentation/components/molecules/ErrorState';
import styles from './ProductGrid.module.css';

export function ProductGrid() {
  const { products, loading, error, reload } = useProducts();
  const { addToCart } = useCart();

  const [query,            setQuery]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message="Error loading products" onRetry={reload} />;
  }

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .filter((p) => selectedCategory === 'All' || p.category === selectedCategory);

  return (
    <div>
      <ProductFilters
        query={query}
        onQueryChange={setQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {filteredProducts.length === 0
        ? <p className={styles.empty}>No products found.</p>
        : (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                category={product.category}
                rating={product.rating}
                onAddToCart={(productId) => addToCart(productId, 1)}
              />
            ))}
          </div>
        )
      }
    </div>
  );
}
