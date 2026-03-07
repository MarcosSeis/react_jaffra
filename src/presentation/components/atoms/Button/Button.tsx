import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, disabled = false, type = 'button', variant = 'primary' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${variant === 'secondary' ? styles.secondary : ''}`}
    >
      {children}
    </button>
  );
}
