/**
 * Presentation — Design Tokens
 *
 * Central color system and shared design values.
 * Use these tokens in CSS Modules via direct values or as reference.
 */

export const colors = {
  background:   '#ffffff',
  surface:      '#f8f9fa',
  primary:      '#2563eb',
  primaryHover: '#1d4ed8',
  textPrimary:  '#111827',
  textSecondary:'#4b5563',
  textMuted:    '#6b7280',
  border:       '#e5e7eb',
  danger:       '#dc2626',
} as const;

export const theme = {
  colors: {
    ...colors,
    // legacy aliases kept for compatibility
    secondary:  '#3b82f6',
    error:      colors.danger,
    text: {
      primary:   colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  spacing: {
    xs:  '4px',
    sm:  '8px',
    md:  '16px',
    lg:  '24px',
    xl:  '32px',
    xxl: '48px',
  },
  breakpoints: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
  },
} as const;

export type Theme = typeof theme;
