import styles from './Price.module.css';

interface PriceProps {
  amount: number;
  currency?: string;
}

export function Price({ amount, currency = 'USD' }: PriceProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);

  return <span className={styles.price}>{formatted}</span>;
}
