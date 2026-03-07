'use client';

import { useState } from 'react';
import { useProducts, useCart } from '@/application/hooks';
import { ProductCard } from '@/presentation/components/molecules/ProductCard';
import { Spinner } from '@/presentation/components/atoms/Spinner';
import styles from './ProductGrid.module.css';

export function ProductGrid() {
  const { products, loading, error, reload } = useProducts();
  const { addToCart } = useCart();

  const [query,            setQuery]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className={styles.errorBox}>
        <p className={styles.error}>Error loading products</p>
        <button className={styles.retry} onClick={reload}>Retry</button>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .filter((p) => selectedCategory === 'All' || p.category === selectedCategory);

  return (
    <div>
      <div className={styles.filters}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

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
