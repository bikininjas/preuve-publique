import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'next-env.d.ts',
    // Staging is fetched raw material, not source code.
    'ingestion/.staging/**',
  ]),
]);
