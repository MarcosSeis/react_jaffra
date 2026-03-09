import { ErrorMessage } from '@/presentation/components/atoms/ErrorMessage';
import { Button } from '@/presentation/components/atoms/Button';
import styles from './ErrorState.module.css';

type Props = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className={styles.errorBox}>
      <ErrorMessage message={message} />
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}
