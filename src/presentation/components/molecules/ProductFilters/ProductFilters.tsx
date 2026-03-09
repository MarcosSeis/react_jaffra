import { SearchInput } from '@/presentation/components/atoms/SearchInput';
import { Select } from '@/presentation/components/atoms/Select';
import styles from './ProductFilters.module.css';

interface ProductFiltersProps {
  query: string;
  onQueryChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export function ProductFilters({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ProductFiltersProps) {
  return (
    <div className={styles.filters}>
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder="Search products..."
      />
      <Select
        value={selectedCategory}
        options={categories}
        onChange={onCategoryChange}
      />
    </div>
  );
}
