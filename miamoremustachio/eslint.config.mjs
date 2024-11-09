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
      'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
      'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
      'no-underscore-dangle': [ 'error', { 'allowAfterThis': true }],
      'arrow-parens': ['error', 'as-needed'],
      'linebreak-style': 'off',
      'consistent-return': 'off',
      'no-restricted-syntax': 'off',
      'guard-for-in': 'off',
      'padded-blocks': 'off',
    },
  }
];
