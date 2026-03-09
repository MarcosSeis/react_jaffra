import type { Config } from 'jest';

const config: Config = {
  // Use ts-jest preset as the base
  preset: 'ts-jest',

  // Domain layer has no browser / React dependency
  testEnvironment: 'node',

  // Only look for tests inside src/
  roots: ['<rootDir>/src'],

  // Match colocated test files
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],

  // Ignore Next.js build output and node_modules
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],

  // Map @/ and all architecture aliases to their src/ equivalents
  moduleNameMapper: {
    '^@/(.*)$':              '<rootDir>/src/$1',
    '^@domain/(.*)$':        '<rootDir>/src/domain/$1',
    '^@application/(.*)$':   '<rootDir>/src/application/$1',
    '^@infrastructure/(.*)$':'<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$':  '<rootDir>/src/presentation/$1',
    '^@shared/(.*)$':        '<rootDir>/src/shared/$1',
    '^@features/(.*)$':      '<rootDir>/src/features/$1',
    '^@lib/(.*)$':           '<rootDir>/src/lib/$1',
    '^@config/(.*)$':        '<rootDir>/src/config/$1',
    '^@store/(.*)$':         '<rootDir>/src/store/$1',
  },

  // Override TypeScript compilation for Jest.
  // The root tsconfig uses moduleResolution: "bundler" (Next.js optimised).
  // Jest requires CommonJS-compatible module resolution.
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'CommonJS',
          moduleResolution: 'node',
        },
      },
    ],
  },
};

export default config;
