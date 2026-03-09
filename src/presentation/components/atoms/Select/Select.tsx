import styles from './Select.module.css';

interface SelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function Select({ value, options, onChange }: SelectProps) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}
