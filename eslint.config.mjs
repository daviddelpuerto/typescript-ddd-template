import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['**/*.{ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  { files: ['**/*.{ts,mts,cts}'], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  eslintPluginPrettier,
]);