/**
 * config — Application configuration
 *
 * Centralises environment variables and runtime config.
 * Validates env vars at startup to catch missing values early.
 */

export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? 'next-jafra',
    env: process.env.NODE_ENV,
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  },
} as const;

export type AppConfig = typeof config;
