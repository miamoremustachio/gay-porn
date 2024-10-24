import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginImport from 'eslint-plugin-import';

const compat = new FlatCompat({
  baseDirectory: import.meta.url,
});

export default [
  {
    ignores: ['**/eslint.config**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    plugins: {
      import: eslintPluginImport,
    },
  },
  ...compat.extends('airbnb-base'),
  {
    rules: {
      'linebreak-style': ['error', 'windows'],
      'no-trailing-spaces': ['error', { "skipBlankLines": true }],
      'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
      'arrow-parens': ['error', 'as-needed'],
    },
  }
];
