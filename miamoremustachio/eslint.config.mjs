import { FlatCompat } from '@eslint/eslintrc'; 
import eslintPluginImport from 'eslint-plugin-import';

const compat = new FlatCompat({
  baseDirectory: import.meta.url, // Required to resolve relative paths correctly
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
  // Use FlatCompat to extend Airbnb config
  ...compat.extends('airbnb-base'),
  {
    rules: {
      // Define any custom rules if necessary
      'linebreak-style': ['error', 'windows'],  
    },
  }
];