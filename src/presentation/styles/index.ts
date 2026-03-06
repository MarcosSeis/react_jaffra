/**
 * Presentation — Styles
 *
 * Design tokens, theme configuration and shared style utilities.
 * Examples: color palettes, spacing scale, typography, breakpoints.
 */

export const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#ff4081',
    background: '#ffffff',
    surface: '#f5f5f5',
    error: '#d32f2f',
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

export type Theme = typeof theme;
